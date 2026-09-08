import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { matchRouteAndLoadSEO } from './src/utils/ssrSEO.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function injectMetaAndInitialData(htmlTemplate, { renderedHtml, initialData, seo }) {
  let html = htmlTemplate.replace('<!--ssr-outlet-->', renderedHtml || '');

  // 1. Inject serialized initialData for React client hydration
  const serialized = initialData ? JSON.stringify(initialData).replace(/</g, '\\u003c') : 'null';
  const hydrationScript = `<script>window.__INITIAL_DATA__ = ${serialized};</script>`;

  // 2. Clean existing metadata tags from template to prevent duplicates
  html = html
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\s+name=["']description["'][\s\S]*?>/gi, '')
    .replace(/<meta\s+property=["']og:title["'][\s\S]*?>/gi, '')
    .replace(/<meta\s+property=["']og:description["'][\s\S]*?>/gi, '')
    .replace(/<meta\s+property=["']og:url["'][\s\S]*?>/gi, '')
    .replace(/<meta\s+property=["']og:image["'][\s\S]*?>/gi, '')
    .replace(/<meta\s+property=["']og:type["'][\s\S]*?>/gi, '')
    .replace(/<meta\s+property=["']og:site_name["'][\s\S]*?>/gi, '')
    .replace(/<meta\s+(?:name|property)=["']twitter:title["'][\s\S]*?>/gi, '')
    .replace(/<meta\s+(?:name|property)=["']twitter:description["'][\s\S]*?>/gi, '')
    .replace(/<meta\s+(?:name|property)=["']twitter:image["'][\s\S]*?>/gi, '')
    .replace(/<meta\s+(?:name|property)=["']twitter:card["'][\s\S]*?>/gi, '')
    .replace(/<meta\s+name=["']robots["'][\s\S]*?>/gi, '')
    .replace(/<link\s+rel=["']canonical["'][\s\S]*?>/gi, '')
    .replace(/<script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, '');

  const activeTitle = seo?.title || 'CORX Healthcare: Home Health Care Services in Dubai *24/7';
  const activeDesc = seo?.description || 'Get premium home health care services in Dubai with Corx Healthcare. Book expert doctors and nurses for physiotherapy, IV therapy, lab tests & elder care, available 24/7.';
  const activeOgTitle = seo?.ogTitle || activeTitle;
  const activeOgDesc = seo?.ogDescription || activeDesc;
  const activeOgImage = seo?.ogImage || 'https://corx.ae/og-image.jpg';
  const activeOgType = seo?.ogType || 'website';
  const activeCanonical = seo?.canonicalUrl || 'https://corx.ae/';

  const headTags = [
    `<title>${escapeHtml(activeTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(activeDesc)}" />`,
    `<link rel="canonical" href="${escapeHtml(activeCanonical)}" />`,
    seo?.robots ? `<meta name="robots" content="${escapeHtml(seo.robots)}" />` : '',
    `<meta property="og:title" content="${escapeHtml(activeOgTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(activeOgDesc)}" />`,
    `<meta property="og:url" content="${escapeHtml(activeCanonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(activeOgImage)}" />`,
    `<meta property="og:type" content="${escapeHtml(activeOgType)}" />`,
    `<meta property="og:site_name" content="CORx Healthcare" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(activeOgTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(activeOgDesc)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(activeOgImage)}" />`,
  ];

  if (seo?.schema) {
    const schemaJson = JSON.stringify(seo.schema).replace(/</g, '\\u003c');
    headTags.push(`<script type="application/ld+json">${schemaJson}</script>`);
  }

  headTags.push(hydrationScript);

  const headContent = headTags.filter(Boolean).join('\n    ');
  if (html.includes('</head>')) {
    html = html.replace('</head>', `    ${headContent}\n  </head>`);
  } else if (html.includes('</body>')) {
    html = html.replace('</body>', `    ${headContent}\n  </body>`);
  }

  return html;
}

async function createServer() {
  // Simple helper to load .env variables manually in Node
  try {
    const envPath = path.resolve(__dirname, '.env');
    const content = await fs.readFile(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value.trim();
      }
    }
  } catch (e) {
    // ignore
  }

  const app = express();

  // Dynamic SEO routes fetched live from Django Backend
  app.get('/robots.txt', async (req, res) => {
    try {
      const backendUrl = process.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${backendUrl}/api/robots.txt`);
      if (response.ok) {
        const text = await response.text();
        res.type('text/plain').send(text);
      } else {
        res.type('text/plain').send("User-agent: *\nDisallow: /admin/\nAllow: /");
      }
    } catch (e) {
      console.error('Error fetching robots.txt from backend:', e);
      res.type('text/plain').send("User-agent: *\nDisallow: /admin/\nAllow: /");
    }
  });

  app.get('/sitemap.xml', async (req, res) => {
    try {
      const backendUrl = process.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${backendUrl}/api/sitemap.xml`);
      if (response.ok) {
        const xml = await response.text();
        res.type('application/xml').send(xml);
      } else {
        res.sendFile(path.resolve(__dirname, 'public/sitemap.xml'));
      }
    } catch (e) {
      console.error('Error fetching sitemap.xml from backend:', e);
      res.sendFile(path.resolve(__dirname, 'public/sitemap.xml'));
    }
  });

  let vite;
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base,
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist'), { index: false }));
  }

  app.use('*', async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const parsedUrl = new URL(url, `http://${req.headers.host || 'localhost'}`);
      const pathname = parsedUrl.pathname;

      const backendUrl = process.env.VITE_API_BASE_URL || 'http://localhost:8000';

      // 1. Comprehensive Route Matching & Data Loading for SSR & SEO
      const { statusCode, initialData, seo } = await matchRouteAndLoadSEO(pathname, backendUrl);

      // 2. Render HTML template & React component tree
      let template;
      let render;

      if (!isProduction) {
        template = await fs.readFile(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
      } else {
        template = await fs.readFile(path.resolve(__dirname, 'dist/index.html'), 'utf-8');
        const entryServerUrl = (await import('node:url')).pathToFileURL(path.resolve(__dirname, 'dist/entry-server.js')).href;
        render = (await import(entryServerUrl)).render;
      }

      const rendered = await render(url, initialData);

      // 3. Inject pre-rendered SSR HTML, meta tags, and __INITIAL_DATA__
      const html = injectMetaAndInitialData(template, {
        renderedHtml: rendered.html,
        initialData,
        seo,
      });

      res.status(statusCode || 200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (e) {
      if (vite) {
        vite.ssrFixStacktrace(e);
      }
      console.error(e);
      next(e);
    }
  });

  return { app };
}

createServer().then(({ app }) => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
