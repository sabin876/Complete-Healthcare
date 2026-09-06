import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { matchServiceRoute, loadServiceData } from '../src/utils/serviceSSR.js';

async function runTests() {
  console.log('--- Starting SSR Unit & Integration Tests ---');

  const testRoutes = [
    { path: '/services', expectedService: true, expectedOverview: true, expectedSlug: null },
    { path: '/services/iv-therapy', expectedService: true, expectedOverview: false, expectedSlug: 'iv-therapy' },
    { path: '/services/nursing/home-nursing', expectedService: true, expectedOverview: false, expectedSlug: 'home-nursing' },
    { path: '/lab-test-at-home', expectedService: true, expectedOverview: false, expectedSlug: 'lab-test-at-home' },
    { path: '/elderly-home-care', expectedService: true, expectedOverview: false, expectedSlug: 'elderly-home-care' },
    { path: '/doctor-on-call', expectedService: true, expectedOverview: false, expectedSlug: 'doctor-on-call' },
    { path: '/sports-injury-rehab', expectedService: true, expectedOverview: false, expectedSlug: 'sports-injury-rehab' },
    { path: '/about-us', expectedService: false, expectedOverview: false, expectedSlug: null },
    { path: '/contact-us', expectedService: false, expectedOverview: false, expectedSlug: null },
  ];

  let passed = 0;
  let failed = 0;

  for (const t of testRoutes) {
    const result = matchServiceRoute(t.path);
    const ok = result.isService === t.expectedService &&
               result.isOverview === t.expectedOverview &&
               result.slug === t.expectedSlug;

    if (ok) {
      console.log(`[PASS] matchServiceRoute('${t.path}') -> isService: ${result.isService}, slug: ${result.slug}`);
      passed++;
    } else {
      console.error(`[FAIL] matchServiceRoute('${t.path}') -> got`, result, 'expected', t);
      failed++;
    }
  }

  console.log('\n--- Testing loadServiceData & SSR Rendering ---');
  const distServerPath = path.resolve('dist/entry-server.js');
  let render = null;

  if (fs.existsSync(distServerPath)) {
    const moduleUrl = pathToFileURL(distServerPath).href;
    const serverModule = await import(moduleUrl);
    render = serverModule.render;
  }

  const slugsToRender = ['iv-therapy', 'lab-test-at-home', 'doctor-on-call', 'elderly-home-care'];

  for (const slug of slugsToRender) {
    const loaded = await loadServiceData(slug, 'http://localhost:8000');
    if (!loaded.serviceData || !loaded.serviceData.title) {
      console.error(`[FAIL] loadServiceData('${slug}') returned missing data`);
      failed++;
      continue;
    }
    console.log(`[PASS] loadServiceData('${slug}') loaded: "${loaded.serviceData.title}"`);

    if (render) {
      const initialData = {
        slug: loaded.slug,
        serviceData: loaded.serviceData,
        isOverview: false,
      };

      const rendered = await render(`/${slug}`, initialData);
      if (rendered.html && rendered.html.length > 500 && rendered.html.includes(loaded.serviceData.title)) {
        console.log(`[PASS] render('/${slug}') generated ${rendered.html.length} bytes of SSR HTML containing "${loaded.serviceData.title}"`);
        passed++;
      } else {
        console.error(`[FAIL] render('/${slug}') HTML output verification failed. HTML length: ${rendered.html ? rendered.html.length : 0}`);
        failed++;
      }
    }
  }

  console.log(`\n=== Test Summary: ${passed} passed, ${failed} failed ===`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(e => {
  console.error('Fatal test error:', e);
  process.exit(1);
});
