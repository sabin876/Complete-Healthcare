async function testEndpoints() {
  console.log('=== TESTING ROBOTS & SITEMAP ON FRONTEND (http://127.0.0.1:5173) ===\n');

  // 1. Test /robots.txt
  try {
    const res = await fetch('http://127.0.0.1:5173/robots.txt');
    const text = await res.text();
    const contentType = res.headers.get('content-type');
    console.log(`[1] /robots.txt`);
    console.log(`Status: ${res.status}`);
    console.log(`Content-Type: ${contentType}`);
    console.log(`Content Length: ${text.length} chars`);
    console.log('Content Preview:\n-----------------');
    console.log(text.trim());
    console.log('-----------------\n');
  } catch (e) {
    console.error('[1] /robots.txt failed:', e.message);
  }

  // 2. Test /sitemap.xml
  try {
    const res = await fetch('http://127.0.0.1:5173/sitemap.xml');
    const xml = await res.text();
    const contentType = res.headers.get('content-type');
    console.log(`[2] /sitemap.xml`);
    console.log(`Status: ${res.status}`);
    console.log(`Content-Type: ${contentType}`);
    console.log(`Content Length: ${xml.length} chars`);
    
    // Count <url> entries
    const urlMatches = xml.match(/<url>/g);
    const urlCount = urlMatches ? urlMatches.length : 0;
    console.log(`Total <url> tags found: ${urlCount}`);
    
    // Check if styled with XSL
    console.log(`Includes XSL stylesheet link: ${xml.includes('sitemap.xsl')}`);
    
    console.log('First 400 chars of XML:\n-----------------');
    console.log(xml.slice(0, 400));
    console.log('...\n-----------------\n');
  } catch (e) {
    console.error('[2] /sitemap.xml failed:', e.message);
  }

  // 3. Test /sitemap.xsl
  try {
    const res = await fetch('http://127.0.0.1:5173/sitemap.xsl');
    const xsl = await res.text();
    const contentType = res.headers.get('content-type');
    console.log(`[3] /sitemap.xsl`);
    console.log(`Status: ${res.status}`);
    console.log(`Content-Type: ${contentType}`);
    console.log(`Content Length: ${xsl.length} chars\n`);
  } catch (e) {
    console.error('[3] /sitemap.xsl failed:', e.message);
  }

  // 4. Test HTML /sitemap page
  try {
    const res = await fetch('http://127.0.0.1:5173/sitemap');
    const html = await res.text();
    const contentType = res.headers.get('content-type');
    console.log(`[4] /sitemap (HTML Page)`);
    console.log(`Status: ${res.status}`);
    console.log(`Content-Type: ${contentType}`);
    console.log(`Content Length: ${html.length} chars`);
    
    // Check for SSR content
    const hasSsrOutlet = html.includes('<!--ssr-outlet-->');
    console.log(`Is Server-Side Rendered: ${!hasSsrOutlet}`);
    
    // Check for dynamic services and blogs in the HTML
    const hasServicesSection = html.includes('Our Medical Services') || html.includes('Services');
    const hasBlogsSection = html.includes('Articles &amp; Guides') || html.includes('Articles & Guides');
    console.log(`Contains Services Listing: ${hasServicesSection}`);
    console.log(`Contains Blog Articles Listing: ${hasBlogsSection}`);
    
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    console.log(`Page Title: ${titleMatch ? titleMatch[1] : 'NONE'}\n`);
  } catch (e) {
    console.error('[4] /sitemap HTML failed:', e.message);
  }
}

testEndpoints();
