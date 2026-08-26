import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

async function createServer() {
  // Simple helper to load .env variables manually in Node
  try {
    const envPath = path.resolve(__dirname, '.env');
    const content = await fs.readFile(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value.trim();
      }
    }
  } catch (e) {
    // ignore
  }

  const app = express();

  // Dynamic SEO routes fetched live from Django Backend
  app.get('/robots.txt', async (req, res) => {
    try {
      const backendUrl = process.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${backendUrl}/api/robots.txt`);
      if (response.ok) {
        const text = await response.text();
        res.type('text/plain').send(text);
      } else {
        res.type('text/plain').send("User-agent: *\nDisallow: /admin/\nAllow: /");
      }
    } catch (e) {
      console.error('Error fetching robots.txt from backend:', e);
      res.type('text/plain').send("User-agent: *\nDisallow: /admin/\nAllow: /");
    }
  });

  app.get('/sitemap.xml', async (req, res) => {
    try {
      const backendUrl = process.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${backendUrl}/api/sitemap.xml`);
      if (response.ok) {
        const xml = await response.text();
        res.type('application/xml').send(xml);
      } else {
        res.sendFile(path.resolve(__dirname, 'public/sitemap.xml'));
      }
    } catch (e) {
      console.error('Error fetching sitemap.xml from backend:', e);
      res.sendFile(path.resolve(__dirname, 'public/sitemap.xml'));
    }
  });

  let vite;
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base,
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist'), { index: false }));
  }

  app.use('*', async (req, res, next) => {
    try {
      const url = req.originalUrl;

      let template;
      let render;

      if (!isProduction) {
        template = await fs.readFile(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
      } else {
        template = await fs.readFile(path.resolve(__dirname, 'dist/index.html'), 'utf-8');
        render = (await import('./dist/entry-server.js')).render;
      }

      const rendered = await render(url);
      const html = template.replace(`<!--ssr-outlet-->`, rendered.html || '');

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (e) {
      if (vite) {
        vite.ssrFixStacktrace(e);
      }
      console.error(e);
      next(e);
    }
  });

  return { app };
}

createServer().then(({ app }) => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
