import http from 'node:http';

async function fetchHtml(url) {
  const res = await fetch(url);
  const text = await res.text();
  return { status: res.status, html: text };
}

async function audit() {
  console.log('====================================================');
  console.log('   COMPREHENSIVE META TAG, OG TAG & SEO AUDIT');
  console.log('====================================================\n');

  // Fetch all services from Django API
  let serviceSlugs = [];
  try {
    const res = await fetch('http://localhost:8000/api/services/');
    if (res.ok) {
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.results || []);
      serviceSlugs = list.map(s => s.slug).filter(Boolean);
    }
  } catch (e) {
    console.warn('Could not fetch services from API, using default list:', e.message);
  }

  if (serviceSlugs.length === 0) {
    serviceSlugs = [
      'lab-services', 'physiotherapy', 'iv-therapy', 'nursing', 'doctor-on-call', 'elderly-care',
      'palliative-care', 'night-care-nurse', 'injection-at-home', 'wound-care', 'oxygen-therapy',
      'doctor-at-home', 'doctor-at-office', 'doctor-at-hotel', 'frozen-shoulder-physiotherapy-treatment',
      'pediatric-physiotherapy', 'joint-pain-treatment', 'manual-therapy'
    ];
  }

  const staticPages = [
    '/',
    '/about-us',
    '/contact-us',
    '/team',
    '/career',
    '/privacy-policy',
    '/sitemap',
    '/social-media',
    '/blog',
    '/blog/advantages-of-stem-cells-regenerative-medicine',
    '/services',
  ];

  const allRoutes = [
    ...staticPages,
    ...serviceSlugs.map(s => `/${s}`),
    ...serviceSlugs.slice(0, 5).map(s => `/services/${s}`)
  ];

  let passedCount = 0;
  let failCount = 0;
  const issues = [];

  for (const route of allRoutes) {
    const url = `http://localhost:5173${route}`;
    try {
      const { status, html } = await fetchHtml(url);

      const titleMatches = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/gi) || [];
      const titleContent = (html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '';

      const descMatches = html.match(/<meta\b[^>]*?\bname=["']description["'][^>]*?content=["']([^"']*)["'][^>]*\/?>/gi) || [];
      const descContent = (html.match(/<meta\b[^>]*?\bname=["']description["'][^>]*?content=["']([^"']*)["']/i) || [])[1] || '';

      const canonicalMatches = html.match(/<link\b[^>]*?\brel=["']canonical["'][^>]*?href=["']([^"']*)["'][^>]*\/?>/gi) || [];
      const canonicalContent = (html.match(/<link\b[^>]*?\brel=["']canonical["'][^>]*?href=["']([^"']*)["']/i) || [])[1] || '';

      const ogTitleMatches = html.match(/<meta\b[^>]*?\bproperty=["']og:title["'][^>]*?content=["']([^"']*)["'][^>]*\/?>/gi) || [];
      const ogTitleContent = (html.match(/<meta\b[^>]*?\bproperty=["']og:title["'][^>]*?content=["']([^"']*)["']/i) || [])[1] || '';

      const ogDescMatches = html.match(/<meta\b[^>]*?\bproperty=["']og:description["'][^>]*?content=["']([^"']*)["'][^>]*\/?>/gi) || [];
      const ogDescContent = (html.match(/<meta\b[^>]*?\bproperty=["']og:description["'][^>]*?content=["']([^"']*)["']/i) || [])[1] || '';

      const ogUrlMatches = html.match(/<meta\b[^>]*?\bproperty=["']og:url["'][^>]*?content=["']([^"']*)["'][^>]*\/?>/gi) || [];
      const ogUrlContent = (html.match(/<meta\b[^>]*?\bproperty=["']og:url["'][^>]*?content=["']([^"']*)["']/i) || [])[1] || '';

      const ogImageMatches = html.match(/<meta\b[^>]*?\bproperty=["']og:image["'][^>]*?content=["']([^"']*)["'][^>]*\/?>/gi) || [];
      const ogImageContent = (html.match(/<meta\b[^>]*?\bproperty=["']og:image["'][^>]*?content=["']([^"']*)["']/i) || [])[1] || '';

      const ogTypeMatches = html.match(/<meta\b[^>]*?\bproperty=["']og:type["'][^>]*?content=["']([^"']*)["'][^>]*\/?>/gi) || [];

      const twitterCardMatches = html.match(/<meta\b[^>]*?\bname=["']twitter:card["'][^>]*?content=["']([^"']*)["'][^>]*\/?>/gi) || [];
      const twitterTitleMatches = html.match(/<meta\b[^>]*?\bname=["']twitter:title["'][^>]*?content=["']([^"']*)["'][^>]*\/?>/gi) || [];
      const twitterDescMatches = html.match(/<meta\b[^>]*?\bname=["']twitter:description["'][^>]*?content=["']([^"']*)["'][^>]*\/?>/gi) || [];

      const hasSchema = html.includes('application/ld+json');

      const routeIssues = [];

      if (status !== 200) routeIssues.push(`HTTP status ${status}`);
      if (titleMatches.length !== 1 || !titleContent.trim()) routeIssues.push(`Title invalid (count=${titleMatches.length})`);
      if (descMatches.length !== 1 || !descContent.trim()) routeIssues.push(`Description invalid (count=${descMatches.length})`);
      if (canonicalMatches.length !== 1 || !canonicalContent.trim()) routeIssues.push(`Canonical invalid (count=${canonicalMatches.length})`);
      if (ogTitleMatches.length !== 1 || !ogTitleContent.trim()) routeIssues.push(`og:title invalid (count=${ogTitleMatches.length})`);
      if (ogDescMatches.length !== 1 || !ogDescContent.trim()) routeIssues.push(`og:description invalid (count=${ogDescMatches.length})`);
      if (ogUrlMatches.length !== 1 || !ogUrlContent.trim()) routeIssues.push(`og:url invalid (count=${ogUrlMatches.length})`);
      if (ogImageMatches.length !== 1 || !ogImageContent.trim()) routeIssues.push(`og:image invalid (count=${ogImageMatches.length})`);
      if (ogTypeMatches.length !== 1) routeIssues.push(`og:type invalid (count=${ogTypeMatches.length})`);
      if (twitterCardMatches.length !== 1) routeIssues.push(`twitter:card invalid (count=${twitterCardMatches.length})`);
      if (twitterTitleMatches.length !== 1) routeIssues.push(`twitter:title invalid (count=${twitterTitleMatches.length})`);
      if (twitterDescMatches.length !== 1) routeIssues.push(`twitter:description invalid (count=${twitterDescMatches.length})`);

      if (routeIssues.length === 0) {
        passedCount++;
        console.log(`[PASS] ${route.padEnd(42)} | Title: "${titleContent.slice(0, 38)}..." | Meta Desc: "${descContent.slice(0, 42)}..." | Schema: ${hasSchema ? 'YES' : 'NO'}`);
      } else {
        failCount++;
        console.error(`[FAIL] ${route.padEnd(42)} -> Issues: ${routeIssues.join(', ')}`);
        issues.push({ route, routeIssues });
      }
    } catch (err) {
      failCount++;
      console.error(`[ERROR] ${route} -> ${err.message}`);
      issues.push({ route, routeIssues: [err.message] });
    }
  }

  console.log('\n====================================================');
  console.log(`AUDIT FINISHED: ${passedCount} PASSED, ${failCount} FAILED out of ${allRoutes.length} pages.`);
  console.log('====================================================\n');

  if (failCount > 0) {
    console.error('Failed routes details:', JSON.stringify(issues, null, 2));
    process.exit(1);
  } else {
    console.log('ALL ROUTES HAVE VALID, ACCURATE, UN-DUPLICATED META & OG TAGS!');
  }
}

audit();
