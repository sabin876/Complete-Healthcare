import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { matchServiceRoute, loadServiceData } from './src/utils/serviceSSR.js';

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

  // 2. Inject Dynamic SEO Head tags if provided
  let headTags = [];

  if (seo) {
    if (seo.title) {
      const escapedTitle = escapeHtml(seo.title);
      html = html.replace(/<title>.*?<\/title>/i, `<title>${escapedTitle}</title>`);
      html = html.replace(/<meta property="og:title" content=".*?"\s*\/?>/i, `<meta property="og:title" content="${escapedTitle}" />`);
      html = html.replace(/<meta property="twitter:title" content=".*?"\s*\/?>/i, `<meta property="twitter:title" content="${escapedTitle}" />`);
    }

    if (seo.description) {
      const escapedDesc = escapeHtml(seo.description);
      html = html.replace(/<meta name="description" content=".*?"\s*\/?>/i, `<meta name="description" content="${escapedDesc}" />`);
      html = html.replace(/<meta property="og:description" content=".*?"\s*\/?>/i, `<meta property="og:description" content="${escapedDesc}" />`);
      html = html.replace(/<meta property="twitter:description" content=".*?"\s*\/?>/i, `<meta property="twitter:description" content="${escapedDesc}" />`);
    }

    if (seo.canonicalUrl) {
      headTags.push(`<link rel="canonical" href="${escapeHtml(seo.canonicalUrl)}" />`);
      headTags.push(`<meta property="og:url" content="${escapeHtml(seo.canonicalUrl)}" />`);
    }

    if (seo.schema) {
      const schemaJson = JSON.stringify(seo.schema).replace(/</g, '\\u003c');
      headTags.push(`<script type="application/ld+json">${schemaJson}</script>`);
    }
  }

  headTags.push(hydrationScript);

  const headContent = headTags.join('\n    ');
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

      // 1. Route Matching & Data Loading for Service SSR
      const serviceMatch = matchServiceRoute(pathname);
      let initialData = null;
      let seo = null;

      const backendUrl = process.env.VITE_API_BASE_URL || 'http://localhost:8000';

      if (serviceMatch.isService) {
        if (serviceMatch.isOverview) {
          initialData = {
            isOverview: true,
            slug: null,
            serviceData: null,
          };
          seo = {
            title: 'Home Healthcare Services in Dubai | CORx Healthcare',
            description: 'From 24/7 doctor home visits and IV drip therapy to home nursing, physiotherapy, and lab tests — receive hospital-grade medical care directly in your home.',
            canonicalUrl: 'https://corx.ae/services',
          };
        } else if (serviceMatch.slug) {
          const loaded = await loadServiceData(serviceMatch.slug, backendUrl);
          initialData = {
            slug: loaded.slug,
            serviceData: loaded.serviceData,
            isOverview: false,
          };
          seo = loaded.seo;
        }
      }

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

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
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
