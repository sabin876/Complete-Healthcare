async function run() {
  const res = await fetch('http://localhost:5173/doctor-on-call');
  const html = await res.text();
  const counts = {
    title: (html.match(/<title\b[^>]*>[\s\S]*?<\/title>/gi) || []).length,
    canonical: (html.match(/<link\b[^>]*?\brel=["']canonical["'][^>]*\/?>/gi) || []).length,
    meta_desc: (html.match(/<meta\b[^>]*?\bname=["']description["'][^>]*\/?>/gi) || []).length,
    og_title: (html.match(/<meta\b[^>]*?\bproperty=["']og:title["'][^>]*\/?>/gi) || []).length,
    og_desc: (html.match(/<meta\b[^>]*?\bproperty=["']og:description["'][^>]*\/?>/gi) || []).length,
    og_url: (html.match(/<meta\b[^>]*?\bproperty=["']og:url["'][^>]*\/?>/gi) || []).length,
    og_image: (html.match(/<meta\b[^>]*?\bproperty=["']og:image["'][^>]*\/?>/gi) || []).length,
    og_type: (html.match(/<meta\b[^>]*?\bproperty=["']og:type["'][^>]*\/?>/gi) || []).length,
    og_site_name: (html.match(/<meta\b[^>]*?\bproperty=["']og:site_name["'][^>]*\/?>/gi) || []).length,
    twitter_card: (html.match(/<meta\b[^>]*?\bname=["']twitter:card["'][^>]*\/?>/gi) || []).length,
    twitter_title: (html.match(/<meta\b[^>]*?\bname=["']twitter:title["'][^>]*\/?>/gi) || []).length,
    twitter_desc: (html.match(/<meta\b[^>]*?\bname=["']twitter:description["'][^>]*\/?>/gi) || []).length,
    twitter_image: (html.match(/<meta\b[^>]*?\bname=["']twitter:image["'][^>]*\/?>/gi) || []).length,
  };

  console.log('--- DOCTOR ON CALL VERIFICATION ---');
  for (const [key, val] of Object.entries(counts)) {
    console.log(`  ${key.padEnd(16)}: ${val} ${val === 1 ? '✅ (EXACTLY 1)' : '❌ DUPLICATE OR MISSING'}`);
  }

  const allExact1 = Object.values(counts).every(v => v === 1);
  if (allExact1) {
    console.log('\n🎉 SUCCESS: Every single SEO, canonical, meta, and OG tag is present exactly once with ZERO duplicates!');
  } else {
    console.error('\n❌ ERROR: Duplicate or missing tags found!');
    process.exit(1);
  }
}
run();
