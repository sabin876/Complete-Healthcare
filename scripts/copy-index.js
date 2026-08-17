import fs from 'node:fs';
import path from 'node:path';

const clientPath = path.resolve('dist/client');
const serverPath = path.resolve('dist/server');
const destPath = path.resolve('dist');

if (fs.existsSync(clientPath)) {
  fs.cpSync(clientPath, destPath, { recursive: true });
}

if (fs.existsSync(serverPath)) {
  fs.cpSync(serverPath, destPath, { recursive: true });
}

// Clean up client and server folders
if (fs.existsSync(clientPath)) {
  fs.rmSync(clientPath, { recursive: true, force: true });
}
if (fs.existsSync(serverPath)) {
  fs.rmSync(serverPath, { recursive: true, force: true });
}

console.log('Successfully combined client and server builds into a single dist/ folder!');
