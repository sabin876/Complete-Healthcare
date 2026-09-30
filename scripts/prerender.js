import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { matchRouteAndLoadSEO, safeFetchJson, slugifyText } from '../src/utils/ssrSEO.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

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
  let html = htmlTemplate.includes('<!--ssr-outlet-->')
    ? htmlTemplate.replace('<!--ssr-outlet-->', renderedHtml || '')
    : htmlTemplate.replace('<div id="root"></div>', `<div id="root">${renderedHtml || ''}</div>`);

  // 1. Inject serialized initialData for React client hydration
  const serialized = initialData ? JSON.stringify(initialData).replace(/</g, '\\u003c') : 'null';
  const hydrationScript = `<script>window.__INITIAL_DATA__ = ${serialized};</script>`;

  // 2. Clean existing metadata tags from template to prevent duplicates
  html = html
    .replace(/^[ \t]*<title\b[^>]*>[\s\S]*?<\/title>[ \t]*(?:\r?\n)?/gim, '')
    .replace(/^[ \t]*<meta\b[^>]*?\b(?:name|property)\s*=\s*["']?(?:description|og:[^"'\s>]+|twitter:[^"'\s>]+|robots)["']?[^>]*\/?>[ \t]*(?:\r?\n)?/gim, '')
    .replace(/^[ \t]*<link\b[^>]*?\brel\s*=\s*["']?canonical["']?[^>]*\/?>[ \t]*(?:\r?\n)?/gim, '')
    .replace(/^[ \t]*<script\b[^>]*?\btype\s*=\s*["']?application\/ld\+json["']?[^>]*>[\s\S]*?<\/script>[ \t]*(?:\r?\n)?/gim, '');

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
    const schemaContent = typeof seo.schema === 'string' ? seo.schema : JSON.stringify(seo.schema);
    const schemaJson = schemaContent.replace(/</g, '\\u003c');
    headTags.push(`<script type="application/ld+json" data-seo="true">${schemaJson}</script>`);
  }

  headTags.push(hydrationScript);

  const headContent = headTags.filter(Boolean).join('\n    ');
  if (/<meta\b[^>]*?\bname=["']viewport["'][^>]*\/?>/i.test(html)) {
    html = html.replace(/(<meta\b[^>]*?\bname=["']viewport["'][^>]*\/?>)/i, `$1\n    ${headContent}`);
  } else if (html.includes('</head>')) {
    html = html.replace('</head>', `    ${headContent}\n  </head>`);
  } else if (html.includes('</body>')) {
    html = html.replace('</body>', `    ${headContent}\n  </body>`);
  }

  return html;
}

async function getRoutesToPrerender(backendUrl) {
  const routes = new Set([
    '/',
    '/about-us',
    '/contact-us',
    '/book-an-appointment',
    '/team',
    '/career',
    '/privacy-policy',
    '/sitemap',
    '/social-media',
    '/services',
    // Core Services
    '/lab-test-at-home',
    '/doctor-on-call',
    '/home-nursing',
    '/elderly-home-care',
    '/iv-therapy',
    '/physiotherapy-at-home-in-dubai',
    // Blog list
    '/blog',
    // Static Fallback Blog Details
    '/blog/advantages-of-stem-cells-regenerative-medicine',
    '/blog/what-is-physiotherapy-comprehensive-guide',
    '/blog/burnout-in-working-professionals-signs-solutions',
    '/blog/doctor-at-home-vs-hospital-visit',
    '/blog/managing-chronic-conditions-with-home-healthcare',
  ]);

  // Attempt to discover dynamic services and blogs from API if backend is available
  try {
    const servicesData = await safeFetchJson(`${backendUrl}/api/services/`, 2000);
    const services = Array.isArray(servicesData) ? servicesData : (servicesData?.results || []);
    for (const s of services) {
      if (s.slug) {
        routes.add(`/${s.slug}`);
        routes.add(`/services/${s.slug}`);
      }
      if (s.custom_url_path) {
        routes.add(`/${s.custom_url_path.replace(/^\//, '')}`);
      }
    }
  } catch (e) {
    console.log('[prerender] Backend services not reachable; using static routes list.');
  }

  try {
    const blogsData = await safeFetchJson(`${backendUrl}/api/blogs/`, 2000);
    const blogs = Array.isArray(blogsData) ? blogsData : (blogsData?.results || []);
    for (const b of blogs) {
      const slug = b.slug || slugifyText(b.title);
      if (slug) {
        routes.add(`/blog/${slug}`);
      }
    }
  } catch (e) {
    console.log('[prerender] Backend blogs not reachable; using static blogs list.');
  }

  return Array.from(routes);
}

async function prerender() {
  console.log('🚀 Starting Pre-rendering (SSG) for production deployment...');

  const templatePath = path.resolve(distDir, 'index.html');
  const rawTemplate = await fs.readFile(templatePath, 'utf-8');

  const entryServerPath = path.resolve(distDir, 'entry-server.js');
  const entryServerUrl = pathToFileURL(entryServerPath).href;
  const { render } = await import(entryServerUrl);

  const backendUrl = process.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
  const routes = await getRoutesToPrerender(backendUrl);

  console.log(`Found ${routes.length} routes to pre-render with full SSR & SEO.`);

  let renderedCount = 0;
  for (const route of routes) {
    try {
      const { initialData, seo } = await matchRouteAndLoadSEO(route, backendUrl);
      const rendered = await render(route, initialData);

      const html = injectMetaAndInitialData(rawTemplate, {
        renderedHtml: rendered.html,
        initialData,
        seo,
      });

      let targetFile;
      if (route === '/') {
        targetFile = path.resolve(distDir, 'index.html');
      } else {
        const routeFolder = path.resolve(distDir, route.replace(/^\/+/, ''));
        await fs.mkdir(routeFolder, { recursive: true });
        targetFile = path.resolve(routeFolder, 'index.html');
      }

      await fs.writeFile(targetFile, html, 'utf-8');
      renderedCount++;
      console.log(`  ✓ Pre-rendered: ${route} -> ${path.relative(distDir, targetFile)}`);
    } catch (err) {
      console.error(`  ✗ Error pre-rendering ${route}:`, err.message);
    }
  }

  // Pre-render 404 page
  try {
    const { initialData, seo } = await matchRouteAndLoadSEO('/404', backendUrl);
    const rendered = await render('/404', initialData);
    const html404 = injectMetaAndInitialData(rawTemplate, {
      renderedHtml: rendered.html,
      initialData,
      seo,
    });
    await fs.writeFile(path.resolve(distDir, '404.html'), html404, 'utf-8');
    console.log(`  ✓ Pre-rendered: 404.html`);
  } catch (err) {
    console.error('  ✗ Error pre-rendering 404.html:', err.message);
  }

  console.log(`\n🎉 Pre-rendering complete! ${renderedCount} pages successfully generated in dist/.`);
}

prerender().catch(err => {
  console.error('Fatal pre-rendering error:', err);
  process.exit(1);
});
