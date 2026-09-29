const testRoutes = [
  '/',
  '/about-us',
  '/services',
  '/lab-test-at-home',
  '/home-nursing',
  '/elderly-home-care',
  '/iv-therapy',
  '/doctor-on-call',
  '/physiotherapy-at-home-in-dubai',
  '/blog',
  '/blog/what-is-physiotherapy-comprehensive-guide',
  '/team',
  '/contact-us',
  '/career',
  '/privacy-policy',
  '/sitemap',
  '/social-media'
];

async function verifyAllPages() {
  console.log('=== AUDITING SEO TAGS & CONTENT FOR DUPLICATES ON ALL PAGES ===\n');

  let allPassed = true;

  for (const route of testRoutes) {
    try {
      const res = await fetch('http://127.0.0.1:5173' + route);
      const html = await res.text();

      // Counts
      const titleMatches = html.match(/<title\b[^>]*>[\s\S]*?<\/title>/gi) || [];
      const canonicalMatches = html.match(/<link\b[^>]*?\brel\s*=\s*["']?canonical["']?[^>]*\/?>/gi) || [];
      const metaDescMatches = html.match(/<meta\b[^>]*?\b(?:name|property)\s*=\s*["']?description["']?[^>]*\/?>/gi) || [];
      const ogTitleMatches = html.match(/<meta\b[^>]*?\bproperty\s*=\s*["']?og:title["']?[^>]*\/?>/gi) || [];
      const ogDescMatches = html.match(/<meta\b[^>]*?\bproperty\s*=\s*["']?og:description["']?[^>]*\/?>/gi) || [];
      const ogUrlMatches = html.match(/<meta\b[^>]*?\bproperty\s*=\s*["']?og:url["']?[^>]*\/?>/gi) || [];
      const ogImageMatches = html.match(/<meta\b[^>]*?\bproperty\s*=\s*["']?og:image["']?[^>]*\/?>/gi) || [];
      const twitterCardMatches = html.match(/<meta\b[^>]*?\bname\s*=\s*["']?twitter:card["']?[^>]*\/?>/gi) || [];
      const schemaMatches = html.match(/<script\b[^>]*?\btype\s*=\s*["']?application\/ld\+json["']?[^>]*>[\s\S]*?<\/script>/gi) || [];

      // Check root content length
      const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/div>\s*<script/);
      const rootContentLength = rootMatch ? rootMatch[1].trim().length : 0;
      const isSsrRendered = rootContentLength > 100 && !html.includes('<!--ssr-outlet-->');

      // Canonical value
      const canonicalVal = canonicalMatches[0] ? (canonicalMatches[0].match(/href=["'](.*?)["']/) || [])[1] : 'MISSING';
      const metaDescVal = metaDescMatches[0] ? (metaDescMatches[0].match(/content=["'](.*?)["']/) || [])[1] : 'MISSING';
      const titleVal = titleMatches[0] ? titleMatches[0].replace(/<\/?title>/gi, '').trim() : 'MISSING';

      // Check duplicate status
      const hasDuplicate = 
        titleMatches.length > 1 ||
        canonicalMatches.length > 1 ||
        metaDescMatches.length > 1 ||
        ogTitleMatches.length > 1 ||
        ogDescMatches.length > 1 ||
        ogUrlMatches.length > 1 ||
        ogImageMatches.length > 1 ||
        twitterCardMatches.length > 1 ||
        schemaMatches.length > 1;

      const hasRequired = 
        titleMatches.length === 1 &&
        canonicalMatches.length === 1 &&
        metaDescMatches.length === 1 &&
        ogTitleMatches.length === 1 &&
        ogDescMatches.length === 1 &&
        ogImageMatches.length === 1;

      const passed = !hasDuplicate && hasRequired && isSsrRendered;
      if (!passed) allPassed = false;

      console.log(`Route: ${route}`);
      console.log(`  ✓ Status: ${res.status}`);
      console.log(`  ✓ Title: (${titleMatches.length}) "${titleVal}"`);
      console.log(`  ✓ Canonical: (${canonicalMatches.length}) ${canonicalVal}`);
      console.log(`  ✓ Meta Desc: (${metaDescMatches.length}) "${metaDescVal.slice(0, 60)}..."`);
      console.log(`  ✓ og:title (${ogTitleMatches.length}) | og:desc (${ogDescMatches.length}) | og:url (${ogUrlMatches.length}) | og:img (${ogImageMatches.length})`);
      console.log(`  ✓ twitter:card (${twitterCardMatches.length}) | schema (${schemaMatches.length})`);
      console.log(`  ✓ SSR Root HTML Size: ${rootContentLength} chars | SSR Success: ${isSsrRendered}`);
      console.log(`  ✓ Duplicates Detected: ${hasDuplicate ? '❌ YES (FAILED)' : '✅ NONE'}`);
      console.log(`  ✓ Overall Page Audit: ${passed ? '✅ PASSED' : '❌ FAILED'}\n`);

    } catch (e) {
      console.error(`Route ${route} ERROR:`, e.message);
      allPassed = false;
    }
  }

  console.log(`=== AUDIT SUMMARY: ${allPassed ? 'ALL PAGES PASSED (NO DUPLICATES, FULL SEO & CONTENT)' : 'SOME PAGES FAILED'} ===`);
}

verifyAllPages();
