// Re-fetches specific destination photos from Wikimedia Commons after visual QA rejected the first picks.
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'public', 'photos');
const UA = { 'User-Agent': 'IRL-site-builder/1.0 (photo placeholder fetch)' };

const WANT = {
  'sri-lanka': ['Sigiriya', 'Nine Arch Bridge', 'Sri Lanka train tea'],
  cambodia: ['Angkor Wat', 'Angkor', 'Bayon temple'],
};

async function tryFetch(url) {
  try {
    const res = await fetch(url, { redirect: 'follow', headers: UA });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 40000) return null;
    const jpeg = buf[0] === 0xff && buf[1] === 0xd8;
    if (!jpeg) return null;
    return buf;
  } catch {
    return null;
  }
}

async function commonsSearch(query) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srnamespace=6&srlimit=10&srsearch=${encodeURIComponent(query + ' filetype:bitmap')}`;
  try {
    const res = await fetch(api, { headers: UA });
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.query?.search ?? []).map((s) => s.title).filter((t) => /\.(jpe?g)$/i.test(t));
  } catch {
    return [];
  }
}

await mkdir(OUT, { recursive: true });
const creditsPath = path.join(OUT, 'credits.json');
const credits = JSON.parse(await readFile(creditsPath, 'utf8').catch(() => '{}'));

for (const [slug, queries] of Object.entries(WANT)) {
  let done = false;
  for (const q of queries) {
    if (done) break;
    const titles = await commonsSearch(q);
    for (const title of titles.slice(0, 3)) {
      const name = title.replace(/^File:/, '');
      const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}?width=1600`;
      const buf = await tryFetch(url);
      if (buf) {
        await writeFile(path.join(OUT, `${slug}.jpg`), buf);
        credits[slug] = { source: 'Wikimedia Commons', url: `https://commons.wikimedia.org/wiki/${encodeURIComponent(title)}` };
        console.log(`OK   ${slug} <- ${title} (query: ${q})`);
        done = true;
        break;
      }
    }
  }
  if (!done) console.log(`FAIL ${slug}`);
}
await writeFile(creditsPath, JSON.stringify(credits, null, 2));
