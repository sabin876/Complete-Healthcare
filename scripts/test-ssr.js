import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { matchRouteAndLoadSEO } from '../src/utils/ssrSEO.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

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
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b[^>]*?\b(?:name|property)=["'](?:description|og:[^"']+|twitter:[^"']+|robots)["'][^>]*\/?>/gi, '')
    .replace(/<link\b[^>]*?\brel=["']canonical["'][^>]*\/?>/gi, '')
    .replace(/<script\b[^>]*?\btype=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');

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

  const template = await fs.readFile(path.resolve(rootDir, 'dist/index.html'), 'utf-8');
  const entryServerUrl = pathToFileURL(path.resolve(rootDir, 'dist/entry-server.js')).href;
  const { render } = await import(entryServerUrl);

  let passed = 0;
  let failed = 0;

  const testRoutes = [
    {
      path: '/',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/',
      titleKeyword: 'CORX Healthcare',
      contentCheck: 'Without Leaving Your Home',
    },
    {
      path: '/about-us',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/about-us',
      titleKeyword: 'About Us',
      contentCheck: 'About Us',
    },
    {
      path: '/contact-us',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/contact-us',
      titleKeyword: 'Book an Appointment',
      contentCheck: 'GET IN TOUCH',
    },
    {
      path: '/book-an-appointment',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/book-an-appointment',
      titleKeyword: 'Book an Appointment',
      contentCheck: 'GET IN TOUCH',
    },
    {
      path: '/team',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/team',
      titleKeyword: 'Our Medical Team',
      contentCheck: 'Our Medical Team',
    },
    {
      path: '/career',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/career',
      titleKeyword: 'Careers',
      contentCheck: 'Why Join CORx Healthcare?',
    },
    {
      path: '/privacy-policy',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/privacy-policy',
      titleKeyword: 'Privacy Policy',
      contentCheck: 'Privacy Policy',
    },
    {
      path: '/sitemap',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/sitemap',
      titleKeyword: 'Sitemap',
      contentCheck: 'CORx Site Map',
    },
    {
      path: '/social-media',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/social-media',
      titleKeyword: 'Social Media',
      contentCheck: 'CORx Healthcare Dubai',
    },
    {
      path: '/services',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/services',
      titleKeyword: 'Home Healthcare Services',
      contentCheck: 'Our Home Healthcare Services in Dubai',
    },
    {
      path: '/lab-test-at-home',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/lab-test-at-home',
      titleKeyword: 'Dubai',
      contentCheck: 'Lab Test',
    },
    {
      path: '/doctor-on-call',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/doctor-on-call',
      titleKeyword: 'Dubai',
      contentCheck: 'Doctor',
    },
    {
      path: '/home-nursing',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/home-nursing',
      titleKeyword: 'Dubai',
      contentCheck: 'Nursing',
    },
    {
      path: '/elderly-home-care',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/elderly-home-care',
      titleKeyword: 'Dubai',
      contentCheck: 'Elderly',
    },
    {
      path: '/iv-therapy',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/iv-therapy',
      titleKeyword: 'Dubai',
      contentCheck: 'IV',
    },
    {
      path: '/physiotherapy-at-home-in-dubai',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/physiotherapy-at-home-in-dubai',
      titleKeyword: 'Dubai',
      contentCheck: 'Physiotherapy',
    },
    {
      path: '/blog',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/blog',
      titleKeyword: 'Blog',
      contentCheck: 'Medical Articles',
    },
    {
      path: '/blog/advantages-of-stem-cells-regenerative-medicine',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/blog/advantages-of-stem-cells-regenerative-medicine',
      titleKeyword: 'Stem Cells',
      contentCheck: 'Advantages of Stem Cells: Regenerative Medicine',
    },
    {
      path: '/blog/what-is-physiotherapy-comprehensive-guide',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/blog/what-is-physiotherapy-comprehensive-guide',
      titleKeyword: 'Physiotherapy',
      contentCheck: 'WHAT IS PHYSIOTHERAPY?',
    },
    {
      path: '/blog/burnout-in-working-professionals-signs-solutions',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/blog/burnout-in-working-professionals-signs-solutions',
      titleKeyword: 'Burnout',
      contentCheck: 'Burnout in Working Professionals',
    },
    {
      path: '/blog/doctor-at-home-vs-hospital-visit',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/blog/doctor-at-home-vs-hospital-visit',
      titleKeyword: 'Doctor',
      contentCheck: 'Doctor at Home vs Hospital Visit',
    },
    {
      path: '/blog/managing-chronic-conditions-with-home-healthcare',
      expectedStatus: 200,
      expectedCanonical: 'https://corx.ae/blog/managing-chronic-conditions-with-home-healthcare',
      titleKeyword: 'Chronic',
      contentCheck: 'Managing Chronic Conditions',
    },
    {
      path: '/unknown-route-test-404',
      expectedStatus: 404,
      expectedCanonical: 'https://corx.ae/404',
      titleKeyword: '404',
      contentCheck: 'Page Not Found',
    },
  ];

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

    // 2. Perform Real React SSR render
    const rendered = await render(t.path, routeRes.initialData);

    // Test HTML injection for duplicates
    const finalHtml = injectMetaAndInitialData(template, {
      renderedHtml: rendered.html,
      initialData: routeRes.initialData,
      seo: routeRes.seo,
    });

    // Verify rendered content
    if (finalHtml.includes(t.contentCheck)) {
      console.log(`[PASS] ${t.path} -> SSR content verified: "${t.contentCheck}"`);
      passed++;
    } else {
      console.error(`[FAIL] ${t.path} -> SSR content missing "${t.contentCheck}" in rendered HTML`);
      failed++;
    }

    const titleMatches = (finalHtml.match(/<title\b/gi) || []).length;
    const descMatches = (finalHtml.match(/<meta\b[^>]*?\bname=["']description["']/gi) || []).length;
    const canonicalMatches = (finalHtml.match(/<link\b[^>]*?\brel=["']canonical["']/gi) || []).length;
    const ogTitleMatches = (finalHtml.match(/<meta\b[^>]*?\bproperty=["']og:title["']/gi) || []).length;
    const ogDescMatches = (finalHtml.match(/<meta\b[^>]*?\bproperty=["']og:description["']/gi) || []).length;
    const ogUrlMatches = (finalHtml.match(/<meta\b[^>]*?\bproperty=["']og:url["']/gi) || []).length;
    const ogImageMatches = (finalHtml.match(/<meta\b[^>]*?\bproperty=["']og:image["']/gi) || []).length;
    const ogTypeMatches = (finalHtml.match(/<meta\b[^>]*?\bproperty=["']og:type["']/gi) || []).length;
    const ogSiteMatches = (finalHtml.match(/<meta\b[^>]*?\bproperty=["']og:site_name["']/gi) || []).length;
    const twitterCardMatches = (finalHtml.match(/<meta\b[^>]*?\bname=["']twitter:card["']/gi) || []).length;
    const twitterTitleMatches = (finalHtml.match(/<meta\b[^>]*?\bname=["']twitter:title["']/gi) || []).length;
    const twitterDescMatches = (finalHtml.match(/<meta\b[^>]*?\bname=["']twitter:description["']/gi) || []).length;
    const twitterImageMatches = (finalHtml.match(/<meta\b[^>]*?\bname=["']twitter:image["']/gi) || []).length;

    if (
      titleMatches === 1 &&
      descMatches === 1 &&
      canonicalMatches === 1 &&
      ogTitleMatches === 1 &&
      ogDescMatches === 1 &&
      ogUrlMatches === 1 &&
      ogImageMatches === 1 &&
      ogTypeMatches === 1 &&
      ogSiteMatches === 1 &&
      twitterCardMatches === 1 &&
      twitterTitleMatches === 1 &&
      twitterDescMatches === 1 &&
      twitterImageMatches === 1
    ) {
      console.log(`[PASS] ${t.path} -> ZERO duplicate meta tags (all tags count = 1)`);
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
