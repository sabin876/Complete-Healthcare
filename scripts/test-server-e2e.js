import http from 'node:http';

async function testServer() {
  console.log('Testing live server endpoints...');

  const endpoints = [
    {
      url: 'http://localhost:5173/lab-test-at-home',
      expectedTitle: 'Lab Test at Home Services',
      expectedInitialSlug: 'lab-test-at-home'
    },
    {
      url: 'http://localhost:5173/services/iv-therapy',
      expectedTitle: 'IV Drip Therapy',
      expectedInitialSlug: 'iv-therapy'
    },
    {
      url: 'http://localhost:5173/doctor-on-call',
      expectedTitle: 'Doctor On Call Services',
      expectedInitialSlug: 'doctor-on-call'
    }
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetch(ep.url);
      const html = await res.text();

      const hasTitle = html.includes(ep.expectedTitle);
      const hasInitialData = html.includes('window.__INITIAL_DATA__') && html.includes(ep.expectedInitialSlug);
      const hasSsrOutletReplaced = !html.includes('<!--ssr-outlet-->');
      const hasMetaDesc = html.includes('<meta name="description"');

      console.log(`Endpoint: ${ep.url}`);
      console.log(`  - Status 200: ${res.status === 200 ? 'PASS' : 'FAIL'}`);
      console.log(`  - Has Service Title: ${hasTitle ? 'PASS' : 'FAIL'}`);
      console.log(`  - Has window.__INITIAL_DATA__: ${hasInitialData ? 'PASS' : 'FAIL'}`);
      console.log(`  - SSR Outlet Replaced: ${hasSsrOutletReplaced ? 'PASS' : 'FAIL'}`);
      console.log(`  - Has Meta Description: ${hasMetaDesc ? 'PASS' : 'FAIL'}`);

      if (res.status !== 200 || !hasTitle || !hasInitialData || !hasSsrOutletReplaced) {
        console.error('Test failed for', ep.url);
        process.exit(1);
      }
    } catch (e) {
      console.error('Connection error for', ep.url, e.message);
      process.exit(1);
    }
  }

  console.log('\nAll SSR E2E Endpoints Verified Successfully!');
}

testServer();
