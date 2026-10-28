// Downloads placeholder photos from Pixabay into public/images/{category}/
// as WebP files under 200KB, and records attribution in public/images/credits.json.
//
// Additive: existing files are never overwritten, images already in credits.json
// or listed in scripts/pixabay-exclude.json are skipped, and new credits are merged in.
//
// Usage: npm run fetch-images   (requires PIXABAY_API_KEY in .env)

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'images');
const CREDITS_FILE = path.join(OUT_DIR, 'credits.json');
const EXCLUDE_FILE = path.join(ROOT, 'scripts', 'pixabay-exclude.json');
const PER_TERM = 3;
const MAX_BYTES = 200 * 1024;
const MAX_WIDTH = 1600;

// Search terms per category. Earlier terms are recorded in credits.json.
const CATEGORIES = {
  trucks: ['semi truck', 'tractor unit', 'dump truck', 'truck fleet'],
  vehicles: ['car dealership', 'used car lot'],
  'spare-parts': ['car engine parts', 'brake disc', 'truck engine'],
  electronics: ['fridge appliance', 'home appliances', 'radio'],
  general: ['warehouse shelves', 'logistics warehouse', 'cargo loading'],
  kitchenware: ['cooking pots', 'kitchen utensils'],
  clothing: ['clothes rack', 'second hand clothes'],
  bags: ['travel bag', 'leather duffel bag'],
  bicycles: ['vintage bicycle'],
};

// Pixabay tags that suggest identifiable people or visible brand logos.
const SKIP_TAGS = [
  'people', 'person', 'man', 'woman', 'men', 'women', 'girl', 'boy', 'child', 'kid',
  'face', 'portrait', 'model', 'businessman', 'businesswoman', 'crowd', 'selfie',
  'logo', 'brand', 'apple', 'iphone', 'samsung', 'sony', 'coca-cola', 'nike',
];

if (existsSync(path.join(ROOT, '.env'))) process.loadEnvFile(path.join(ROOT, '.env'));
const API_KEY = process.env.PIXABAY_API_KEY;
if (!API_KEY) {
  console.error('Missing PIXABAY_API_KEY in .env');
  process.exit(1);
}

const readJson = async (file, fallback) => (existsSync(file) ? JSON.parse(await readFile(file, 'utf8')) : fallback);
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

async function search(term) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: term,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: '50', // fetch extra so skipped results can be replaced
  });
  const res = await fetch(`https://pixabay.com/api/?${params}`);
  if (!res.ok) throw new Error(`Pixabay search "${term}" failed: ${res.status} ${await res.text()}`);
  return (await res.json()).hits;
}

function hasSkipTag(hit) {
  const tags = hit.tags.toLowerCase().split(',').map((t) => t.trim());
  return tags.some((t) => SKIP_TAGS.includes(t));
}

/** Next unused file name for a term, so existing files are never overwritten. */
function nextFile(dir, term) {
  for (let n = 1; ; n++) {
    const file = `${slugify(term)}-${n}.webp`;
    if (!existsSync(path.join(dir, file))) return file;
  }
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

// Drop credits for files that no longer exist, then skip anything already used or excluded.
const credits = (await readJson(CREDITS_FILE, [])).filter((c) => existsSync(path.join(ROOT, 'public', c.file)));
const exclude = await readJson(EXCLUDE_FILE, []);
const seen = new Set([...credits.map((c) => c.pixabayId), ...exclude.map((e) => e.pixabayId)]);
let added = 0;

for (const [category, terms] of Object.entries(CATEGORIES)) {
  const dir = path.join(OUT_DIR, category);
  await mkdir(dir, { recursive: true });

  for (const term of terms) {
    const hits = (await search(term)).filter((h) => !seen.has(h.id) && !hasSkipTag(h));
    if (hits.length < PER_TERM) console.warn(`Only ${hits.length} usable results for "${term}"`);

    for (const hit of hits.slice(0, PER_TERM)) {
      seen.add(hit.id);
      const res = await fetch(hit.largeImageURL);
      if (!res.ok) {
        console.warn(`Skipping ${hit.id}: download failed (${res.status})`);
        continue;
      }
      const webp = await toWebp(Buffer.from(await res.arrayBuffer()));
      const file = nextFile(dir, term);
      await writeFile(path.join(dir, file), webp);

      credits.push({
        file: `/images/${category}/${file}`,
        category,
        searchTerm: term,
        pixabayId: hit.id,
        user: hit.user,
        pageURL: hit.pageURL,
      });
      added++;
      console.log(`${category}/${file}  ${(webp.length / 1024).toFixed(0)}KB  by ${hit.user}`);
    }
  }
}

await writeFile(CREDITS_FILE, JSON.stringify(credits, null, 2) + '\n');
console.log(`\nAdded ${added} images. credits.json now lists ${credits.length}.`);
