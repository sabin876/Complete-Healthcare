import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { matchRouteAndLoadSEO } from '../src/utils/ssrSEO.js';

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

  const serialized = initialData ? JSON.stringify(initialData).replace(/</g, '\\u003c') : 'null';
  const hydrationScript = `<script>window.__INITIAL_DATA__ = ${serialized};</script>`;

  // Clean existing metadata tags from template to prevent duplicates
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

async function runTests() {
  console.log('=== Starting Comprehensive SSR & SEO Metadata Tests ===\n');

  let passed = 0;
  let failed = 0;

  const testRoutes = [
    {
      path: '/',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/',
      titleKeyword: 'CORX Healthcare',
    },
    {
      path: '/about-us',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/about-us',
      titleKeyword: 'About Us',
    },
    {
      path: '/contact-us',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/contact-us',
      titleKeyword: 'Book an Appointment',
    },
    {
      path: '/team',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/team',
      titleKeyword: 'Our Medical Team',
    },
    {
      path: '/career',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/career',
      titleKeyword: 'Careers',
    },
    {
      path: '/privacy-policy',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/privacy-policy',
      titleKeyword: 'Privacy Policy',
    },
    {
      path: '/sitemap',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/sitemap',
      titleKeyword: 'Sitemap',
    },
    {
      path: '/social-media',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/social-media',
      titleKeyword: 'Social Media',
    },
    {
      path: '/services',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/services',
      titleKeyword: 'Home Healthcare Services',
    },
    {
      path: '/lab-test-at-home',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/lab-test-at-home',
      titleKeyword: 'Dubai',
    },
    {
      path: '/doctor-on-call',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/doctor-on-call',
      titleKeyword: 'Dubai',
    },
    {
      path: '/blog',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/blog',
      titleKeyword: 'Blog',
    },
    {
      path: '/blog/advantages-of-stem-cells-regenerative-medicine',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/blog/advantages-of-stem-cells-regenerative-medicine',
      titleKeyword: 'Stem Cells',
    },
    {
      path: '/unknown-route-test-404',
      expectedStatus: 404,
      expectedCanonical: 'https://corx.ae/404',
      titleKeyword: '404',
    },
  ];

  const htmlTemplate = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CORX Healthcare: Home Health Care Services in Dubai *24/7</title>
    <meta name="description" content="Old desc" />
  </head>
  <body>
    <div id="root"><!--ssr-outlet--></div>
  </body>
</html>`;

  for (const t of testRoutes) {
    const routeRes = await matchRouteAndLoadSEO(t.path, 'http://localhost:8000');
    
    // Check status
    if (routeRes.statusCode === t.expectedStatus) {
      console.log(`[PASS] ${t.path} -> StatusCode: ${routeRes.statusCode}`);
      passed++;
    } else {
      console.error(`[FAIL] ${t.path} -> got statusCode ${routeRes.statusCode}, expected ${t.expectedStatus}`);
      failed++;
    }

    // Check canonical
    if (routeRes.seo.canonicalUrl === t.expectedCanonical) {
      console.log(`[PASS] ${t.path} -> Canonical: ${routeRes.seo.canonicalUrl}`);
      passed++;
    } else {
      console.error(`[FAIL] ${t.path} -> got canonical ${routeRes.seo.canonicalUrl}, expected ${t.expectedCanonical}`);
      failed++;
    }

    // Check title keyword
    if (routeRes.seo.title && routeRes.seo.title.includes(t.titleKeyword)) {
      console.log(`[PASS] ${t.path} -> Title: "${routeRes.seo.title}"`);
      passed++;
    } else {
      console.error(`[FAIL] ${t.path} -> Title "${routeRes.seo.title}" does not contain "${t.titleKeyword}"`);
      failed++;
    }

    // Test HTML injection for duplicates
    const finalHtml = injectMetaAndInitialData(htmlTemplate, {
      renderedHtml: `<div>Content for ${t.path}</div>`,
      initialData: routeRes.initialData,
      seo: routeRes.seo,
    });

    const titleMatches = (finalHtml.match(/<title>/gi) || []).length;
    const descMatches = (finalHtml.match(/<meta\s+name=["']description["']/gi) || []).length;
    const canonicalMatches = (finalHtml.match(/<link\s+rel=["']canonical["']/gi) || []).length;
    const ogTitleMatches = (finalHtml.match(/<meta\s+property=["']og:title["']/gi) || []).length;
    const twitterCardMatches = (finalHtml.match(/<meta\s+name=["']twitter:card["']/gi) || []).length;

    if (
      titleMatches === 1 &&
      descMatches === 1 &&
      canonicalMatches === 1 &&
      ogTitleMatches === 1 &&
      twitterCardMatches === 1
    ) {
      console.log(`[PASS] ${t.path} -> No duplicate meta tags (title: 1, desc: 1, canonical: 1, og:title: 1, twitter:card: 1)`);
      passed++;
    } else {
      console.error(`[FAIL] ${t.path} -> Duplicate tags detected in HTML! title: ${titleMatches}, desc: ${descMatches}, canonical: ${canonicalMatches}`);
      failed++;
    }
  }

  console.log(`\n=== Final Test Results: ${passed} passed, ${failed} failed ===`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
