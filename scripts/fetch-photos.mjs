// Downloads destination photography into public/photos.
// Placeholder imagery: the owner replaces these with real guest photos over time.
// Re-run with: node scripts/fetch-photos.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'public', 'photos');

// Per slug: unsplash photo id candidates (tried in order), then a Commons search query fallback.
const WANT = {
  hero: { unsplash: ['1506905925346-21bda4d32df4', '1469854523086-cc02fe5d8800'], commons: 'Himalaya mountain road valley' },
  kashmir: { unsplash: ['1566837945700-30057527ade0', '1595815771614-ade9d652a65d'], commons: 'Dal Lake shikara Srinagar' },
  ladakh: { unsplash: ['1581793745862-99fde7fa73d2', '1589556264800-08ae9e129a8c'], commons: 'Pangong Tso lake Ladakh' },
  kerala: { unsplash: ['1602216056096-3b40cc0c9944', '1593693397690-362cb9666fc2'], commons: 'Kerala backwaters houseboat Alleppey' },
  andaman: { unsplash: ['1544550581-5f7ceaf7f992', '1559494007-9f5847c49d94'], commons: 'Radhanagar Beach Havelock Andaman' },
  himachal: { unsplash: ['1626621341517-bbf3d9990a23', '1581791538302-03553b56490d'], commons: 'Manali Himachal mountains snow' },
  'sikkim-darjeeling': { unsplash: ['1544233726-9f1d2b27be8b', '1622308644420-b20142dc993c'], commons: 'Darjeeling tea garden Kanchenjunga' },
  meghalaya: { unsplash: ['1571401835393-8c5f35328320', '1595872018818-97555653a011'], commons: 'living root bridge Meghalaya' },
  'south-india': { unsplash: ['1600100397608-f010f4e3d373', '1582510003544-4d00b7f74220'], commons: 'Meenakshi Temple Madurai gopuram' },
  dubai: { unsplash: ['1512453979798-5ea266f8880c', '1518684079-3c830dcef090'], commons: 'Dubai skyline Burj Khalifa' },
  bali: { unsplash: ['1537996194471-e657df975ab4', '1555400038-63f5ba517a47'], commons: 'Bali rice terraces Tegallalang' },
  thailand: { unsplash: ['1552465011-b4e21bf6e79a', '1528181304800-259b08848526'], commons: 'Krabi longtail boat Thailand' },
  vietnam: { unsplash: ['1528127269322-539801943592', '1583417319070-4a69db38a482'], commons: 'Ha Long Bay Vietnam' },
  'sri-lanka': { unsplash: ['1546708973-b339540b5162', '1566296314736-6eaac1ca0cb9'], commons: 'Nine Arch Bridge Ella Sri Lanka' },
  philippines: { unsplash: ['1518509562904-e7ef99cdcc86', '1551966775-a4ddc8df052b'], commons: 'El Nido Palawan lagoon' },
  cambodia: { unsplash: ['1563492065599-3520f775eeed', '1508009603885-50cf7c579365'], commons: 'Angkor Wat sunrise Cambodia' },
  'south-africa': { unsplash: ['1516426122078-c23e76319801', '1580060839134-75a5edca2e99'], commons: 'Table Mountain Cape Town' },
};

const credits = {};

async function tryFetch(url) {
  try {
    const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'AnubhavHolidays-site-builder/1.0 (photo placeholder fetch)' } });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 30000) return null; // too small to be a usable photo
    const jpeg = buf[0] === 0xff && buf[1] === 0xd8;
    const png = buf[0] === 0x89 && buf[1] === 0x50;
    const webp = buf.length > 12 && buf.toString('ascii', 8, 12) === 'WEBP';
    if (!jpeg && !png && !webp) return null;
    return { buf, ext: jpeg ? 'jpg' : png ? 'png' : 'webp' };
  } catch {
    return null;
  }
}

async function commonsSearch(query) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srnamespace=6&srlimit=8&srsearch=${encodeURIComponent(query + ' filetype:bitmap')}`;
  try {
    const res = await fetch(api, { headers: { 'User-Agent': 'AnubhavHolidays-site-builder/1.0' } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.query?.search ?? [])
      .map((s) => s.title)
      .filter((t) => /\.(jpe?g)$/i.test(t));
  } catch {
    return [];
  }
}

async function grab(slug, spec) {
  for (const id of spec.unsplash) {
    const url = `https://images.unsplash.com/photo-${id}?w=1600&q=68&auto=format&fit=crop`;
    const got = await tryFetch(url);
    if (got) {
      await writeFile(path.join(OUT, `${slug}.${got.ext}`), got.buf);
      credits[slug] = { source: 'Unsplash', url: `https://unsplash.com/photos/${id}` };
      return `${slug}.${got.ext}`;
    }
  }
  const titles = await commonsSearch(spec.commons);
  for (const title of titles) {
    const name = title.replace(/^File:/, '');
    const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}?width=1600`;
    const got = await tryFetch(url);
    if (got) {
      await writeFile(path.join(OUT, `${slug}.${got.ext}`), got.buf);
      credits[slug] = { source: 'Wikimedia Commons', url: `https://commons.wikimedia.org/wiki/${encodeURIComponent(title)}` };
      return `${slug}.${got.ext}`;
    }
  }
  return null;
}

await mkdir(OUT, { recursive: true });
const results = {};
for (const [slug, spec] of Object.entries(WANT)) {
  const file = await grab(slug, spec);
  results[slug] = file;
  console.log(file ? `OK   ${slug} -> ${file} (${credits[slug].source})` : `FAIL ${slug}`);
}
await writeFile(path.join(OUT, 'credits.json'), JSON.stringify(credits, null, 2));
const failed = Object.entries(results).filter(([, v]) => !v).map(([k]) => k);
if (failed.length) {
  console.log('MISSING: ' + failed.join(', '));
  process.exitCode = 1;
}
