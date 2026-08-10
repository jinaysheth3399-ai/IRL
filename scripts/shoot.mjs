// Serves the static export in ./out and captures desktop + mobile screenshots
// of key pages into .impeccable/shots/. Uses the system Edge via playwright-core.
import http from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const OUT = path.join(process.cwd(), 'out');
const SHOTS = path.join(process.cwd(), '.impeccable', 'shots');

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.txt': 'text/plain',
};

const server = http.createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(OUT, p);
    if (p.endsWith('/')) file = path.join(file, 'index.html');
    if (!existsSync(file)) {
      const asHtml = path.join(OUT, p, 'index.html');
      if (existsSync(asHtml)) file = asHtml;
      else {
        res.writeHead(404).end('not found: ' + p);
        return;
      }
    }
    const data = await readFile(file);
    res.writeHead(200, { 'content-type': types[path.extname(file)] ?? 'application/octet-stream' });
    res.end(data);
  } catch (e) {
    res.writeHead(500).end(String(e));
  }
});

const pages = (process.env.SHOOT_PAGES
  ? process.env.SHOOT_PAGES.split(',').map((r) => [r.replaceAll('/', '') || 'home', r])
  : [
      ['home', '/'],
      ['trip-kashmir', '/trips/kashmir/'],
      ['trip-south-africa', '/trips/south-africa/'],
      ['india-trips', '/india-trips/'],
      ['plan-my-trip', '/plan-my-trip/'],
      ['how-it-works', '/how-it-works/'],
      ['about', '/about/'],
      ['reviews', '/reviews/'],
      ['faq', '/faq/'],
      ['contact', '/contact/'],
    ]).map((p) => (Array.isArray(p) ? p : [p, p]));

await mkdir(SHOTS, { recursive: true });
const PORT = await new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(0, '127.0.0.1', () => resolve(server.address().port));
});
console.log('serving out/ on ' + PORT);

const browser = await chromium.launch({ channel: 'msedge', headless: true });

for (const [device, viewport] of [
  ['desktop', { width: 1440, height: 900 }],
  ['mobile', { width: 390, height: 844 }],
]) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  // Skip the once-per-session intro logo animation so captures show the page, not the loader.
  await ctx.addInitScript(() => sessionStorage.setItem('irl-loader-seen', '1'));
  const page = await ctx.newPage();
  for (const [name, route] of pages) {
    await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'load', timeout: 20000 });
    // Force lazy images eager and wait for decode, capped so a stuck image never hangs the run.
    await page.evaluate(async () => {
      document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
        img.loading = 'eager';
      });
      const done = Promise.all(Array.from(document.images).map((img) => img.decode().catch(() => {})));
      await Promise.race([done, new Promise((r) => setTimeout(r, 6000))]);
    });
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(SHOTS, `${name}-${device}-fold.png`) });
    await page.screenshot({ path: path.join(SHOTS, `${name}-${device}-full.png`), fullPage: true });
    console.log(`shot ${name} ${device}`);
  }
  await ctx.close();
}

await browser.close();
server.close();
console.log('done -> ' + SHOTS);
