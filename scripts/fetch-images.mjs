// Downloads placeholder photos from Pixabay into public/images/{category}/
// as WebP files under 200KB, and records attribution in public/images/credits.json.
//
// Usage: npm run fetch-images   (requires PIXABAY_API_KEY in .env)

import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'images');
const PER_TERM = 3;
const MAX_BYTES = 200 * 1024;
const MAX_WIDTH = 1600;

const CATEGORIES = {
  trucks: ['scania truck', 'cargo truck'],
  vehicles: ['suv', 'used cars'],
  'spare-parts': ['truck parts', 'auto parts'],
  electronics: ['electronics store', 'refrigerator'],
  shipping: ['container ship port', 'shipping containers'],
  general: ['business handshake', 'warehouse'],
};

if (existsSync(path.join(ROOT, '.env'))) process.loadEnvFile(path.join(ROOT, '.env'));
const API_KEY = process.env.PIXABAY_API_KEY;
if (!API_KEY) {
  console.error('Missing PIXABAY_API_KEY in .env');
  process.exit(1);
}

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

async function search(term) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: term,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: '20', // fetch extra so duplicates across terms can be skipped
  });
  const res = await fetch(`https://pixabay.com/api/?${params}`);
  if (!res.ok) throw new Error(`Pixabay search "${term}" failed: ${res.status} ${await res.text()}`);
  return (await res.json()).hits;
}

// Re-encode at decreasing quality, then decreasing width, until under MAX_BYTES.
async function toWebp(input) {
  let width = MAX_WIDTH;
  while (width >= 640) {
    for (let quality = 80; quality >= 50; quality -= 10) {
      const buf = await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality })
        .toBuffer();
      if (buf.length <= MAX_BYTES) return buf;
    }
    width = Math.round(width * 0.8);
  }
  throw new Error('Could not compress image under 200KB');
}

const credits = [];
const seen = new Set();

for (const [category, terms] of Object.entries(CATEGORIES)) {
  const dir = path.join(OUT_DIR, category);
  await mkdir(dir, { recursive: true });

  for (const term of terms) {
    const hits = (await search(term)).filter((h) => !seen.has(h.id));
    if (hits.length < PER_TERM) console.warn(`Only ${hits.length} new results for "${term}"`);

    for (const [i, hit] of hits.slice(0, PER_TERM).entries()) {
      seen.add(hit.id);
      const file = `${slugify(term)}-${i + 1}.webp`;
      const res = await fetch(hit.largeImageURL);
      if (!res.ok) {
        console.warn(`Skipping ${hit.id}: download failed (${res.status})`);
        continue;
      }
      const webp = await toWebp(Buffer.from(await res.arrayBuffer()));
      await writeFile(path.join(dir, file), webp);

      credits.push({
        file: `/images/${category}/${file}`,
        category,
        searchTerm: term,
        pixabayId: hit.id,
        user: hit.user,
        pageURL: hit.pageURL,
      });
      console.log(`${category}/${file}  ${(webp.length / 1024).toFixed(0)}KB  by ${hit.user}`);
    }
  }
}

await writeFile(path.join(OUT_DIR, 'credits.json'), JSON.stringify(credits, null, 2) + '\n');
console.log(`\nSaved ${credits.length} images and credits.json to public/images/`);
