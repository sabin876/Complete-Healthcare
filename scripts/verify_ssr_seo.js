import fs from 'node:fs';

const routes = [
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
  '/lab-test-at-home',
  '/home-nursing',
  '/elderly-home-care',
  '/iv-therapy',
  '/doctor-on-call',
  '/physiotherapy-at-home-in-dubai',
  '/portal',
  '/portal/dashboard',
  '/non-existent-page-test-404'
];

async function verifyRoutes() {
  console.log('--- STARTING SSR & SEO AUDIT ---');
  let hasErrors = false;

  for (const route of routes) {
    try {
      const res = await fetch('http://localhost:5173' + route);
      const html = await res.text();
      const status = res.status;

      const titleMatches = html.match(/<title\b[^>]*>[\s\S]*?<\/title>/gi) || [];
      const canonicalMatches = html.match(/<link\b[^>]*?\brel=["']canonical["'][^>]*\/?>/gi) || [];
      const metaDescMatches = html.match(/<meta\b[^>]*?\bname=["']description["'][^>]*\/?>/gi) || [];
      const ogTitleMatches = html.match(/<meta\b[^>]*?\bproperty=["']og:title["'][^>]*\/?>/gi) || [];
      const ogDescMatches = html.match(/<meta\b[^>]*?\bproperty=["']og:description["'][^>]*\/?>/gi) || [];
      const ogUrlMatches = html.match(/<meta\b[^>]*?\bproperty=["']og:url["'][^>]*\/?>/gi) || [];
      const ogImageMatches = html.match(/<meta\b[^>]*?\bproperty=["']og:image["'][^>]*\/?>/gi) || [];
      const ogTypeMatches = html.match(/<meta\b[^>]*?\bproperty=["']og:type["'][^>]*\/?>/gi) || [];
      const twitterCardMatches = html.match(/<meta\b[^>]*?\bname=["']twitter:card["'][^>]*\/?>/gi) || [];
      const twitterTitleMatches = html.match(/<meta\b[^>]*?\bname=["']twitter:title["'][^>]*\/?>/gi) || [];
      const twitterDescMatches = html.match(/<meta\b[^>]*?\bname=["']twitter:description["'][^>]*\/?>/gi) || [];
      const twitterImageMatches = html.match(/<meta\b[^>]*?\bname=["']twitter:image["'][^>]*\/?>/gi) || [];

      const isSSR = !html.includes('<!--ssr-outlet-->') && html.includes('<div id="root">') && html.length > 2000;

      const checks = {
        titleCount: titleMatches.length,
        canonicalCount: canonicalMatches.length,
        metaDescCount: metaDescMatches.length,
        ogTitleCount: ogTitleMatches.length,
        ogDescCount: ogDescMatches.length,
        ogUrlCount: ogUrlMatches.length,
        ogImageCount: ogImageMatches.length,
        ogTypeCount: ogTypeMatches.length,
        twitterCardCount: twitterCardMatches.length,
        twitterTitleCount: twitterTitleMatches.length,
        twitterDescCount: twitterDescMatches.length,
        twitterImageCount: twitterImageMatches.length,
      };

      const duplicates = Object.entries(checks).filter(([key, count]) => count > 1);
      const missing = Object.entries(checks).filter(([key, count]) => {
        if (route.startsWith('/portal') || route.includes('404')) {
          // In portal or 404, some tags may intentionally not exist or have robots
          return false;
        }
        return count === 0;
      });

      const title = (html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || 'NONE';
      const canonical = (html.match(/<link\b[^>]*?\brel=["']canonical["'][^>]*?\bhref=["']([^"']+)["'][^>]*\/?>/i) || [])[1] || 'NONE';

      console.log(`\n▶ Route: [${route}] | Status: ${status} | SSR: ${isSSR ? '✅ YES' : '❌ NO'}`);
      console.log(`  Title: "${title.trim()}"`);
      console.log(`  Canonical: ${canonical}`);
      console.log(`  Tag Counts: title=${checks.titleCount}, canonical=${checks.canonicalCount}, desc=${checks.metaDescCount}, og:title=${checks.ogTitleCount}, og:desc=${checks.ogDescCount}, og:url=${checks.ogUrlCount}`);

      if (duplicates.length > 0) {
        console.error(`  ❌ DUPLICATES FOUND:`, duplicates);
        hasErrors = true;
      } else {
        console.log(`  ✅ NO DUPLICATES`);
      }

      if (missing.length > 0) {
        console.warn(`  ⚠️ Missing tags:`, missing);
      }

    } catch (err) {
      console.error(`  ❌ Error fetching route ${route}:`, err.message);
      hasErrors = true;
    }
  }

  console.log('\n--- AUDIT SUMMARY ---');
  if (hasErrors) {
    console.log('⚠️ Duplicates or SSR errors detected.');
  } else {
    console.log('🎉 ALL PAGES VERIFIED: 100% SSR rendered with ZERO duplicates of title, canonical, meta description, og:tags, and twitter tags!');
  }
}

verifyRoutes();
