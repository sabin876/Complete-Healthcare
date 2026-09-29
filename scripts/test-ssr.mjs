const urls = [
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
  '/social-media',
  '/portal',
  '/non-existent-page'
];

async function run() {
  console.log('Testing SSR on all routes:');
  for (const u of urls) {
    try {
      const res = await fetch('http://127.0.0.1:5173' + u);
      const html = await res.text();
      const hasOutlet = html.includes('<!--ssr-outlet-->');
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      const title = titleMatch ? titleMatch[1] : 'NONE';
      const rootLength = html.indexOf('</div>\n    <script') - html.indexOf('<div id="root">');
      console.log(`[${u}] Status: ${res.status} | TotalLen: ${html.length} | SSR Rendered: ${!hasOutlet} | RootInnerLen: ${rootLength} | Title: ${title}`);
    } catch (e) {
      console.log(`[${u}] Error: ${e.message}`);
    }
  }
}
run();
