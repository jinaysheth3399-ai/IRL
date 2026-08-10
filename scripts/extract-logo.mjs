// Extracts the real IRL brand mark from IRL-Logo-selection.png: keys out its flat
// near-black background to transparency and crops two lockups (mark-only, full).
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = path.join(process.cwd(), 'IRL-Logo-selection.png');
const OUT = path.join(process.cwd(), 'public', 'brand');
const BG = [12, 12, 20];
const LOW = 10;
const HIGH = 38;

await mkdir(OUT, { recursive: true });

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

for (let i = 0; i < data.length; i += channels) {
  const dr = data[i] - BG[0];
  const dg = data[i + 1] - BG[1];
  const db = data[i + 2] - BG[2];
  const dist = Math.sqrt(dr * dr + dg * dg + db * db);
  const t = Math.max(0, Math.min(1, (dist - LOW) / (HIGH - LOW)));
  data[i + 3] = Math.round(data[i + 3] * t);
}

const keyed = sharp(data, { raw: { width, height, channels } });

const crops = [
  { name: 'irl-mark', box: { left: 107, top: 68, width: 554 - 107 + 10, height: 261 - 68 + 10 } },
  { name: 'irl-lockup', box: { left: 93, top: 64, width: 585 - 93 + 14, height: 420 - 64 + 14 } },
];

for (const { name, box } of crops) {
  const left = Math.max(0, box.left);
  const top = Math.max(0, box.top);
  const w = Math.min(width - left, box.width);
  const h = Math.min(height - top, box.height);
  await keyed.clone().extract({ left, top, width: w, height: h }).png().toFile(path.join(OUT, `${name}.png`));
  console.log(`wrote ${name}.png ${w}x${h}`);
}
