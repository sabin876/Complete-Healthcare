import fs from 'node:fs';

const filePath = 'dist/index.html';
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(
    /<title\b[^>]*>[\s\S]*?<meta property=["']og:site_name["'][^>]*\/?>/i,
    '<title>CORx Healthcare</title>'
  );
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('dist/index.html updated successfully.');
}
