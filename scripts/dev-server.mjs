// Local dev server for the static site. No dependencies, no build step.
//   npm run dev            -> http://localhost:4173
//   npm run dev -- --port 8080
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const argPort = process.argv.indexOf('--port');
const PORT = argPort > -1 ? Number(process.argv[argPort + 1]) : 4173;

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.md': 'text/plain; charset=utf-8',
};

createServer(async (req, res) => {
  try {
    const url = decodeURIComponent(req.url.split('?')[0]);
    // resolve inside ROOT only - refuse path traversal
    let file = path.resolve(ROOT, '.' + url);
    if (!file.startsWith(ROOT)) { res.writeHead(403).end('Forbidden'); return; }
    try {
      if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    } catch {}
    const body = await readFile(file);
    res.writeHead(200, {
      'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream',
      'cache-control': 'no-store',
    }).end(body);
    console.log(`200 ${url}`);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain' }).end('404 Not Found');
    console.log(`404 ${req.url}`);
  }
}).listen(PORT, () => {
  console.log(`Masteko dev server -> http://localhost:${PORT}`);
  console.log('Edit index.html or assets/, then refresh. Ctrl+C to stop.');
});
