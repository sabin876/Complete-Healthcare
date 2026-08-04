import fs from 'node:fs';
import path from 'node:path';

const srcPath = path.resolve('dist/client/index.html');
const destPath = path.resolve('dist/index.html');

if (fs.existsSync(srcPath)) {
  fs.copyFileSync(srcPath, destPath);
  console.log('Copied dist/client/index.html -> dist/index.html for deployment fallback');
}
