// Generates src/data/geo/globe.json for the hero globe from Natural Earth data (world-atlas).
// Run once after changing the settings below: node scripts/build-globe-data.mjs
//
// Output (kept small because it ships inline with the page):
//   step   dot spacing in degrees
//   land   rows of land dots: [latIndex, start, length, start, length, ...] where
//          lat = -90 + latIndex * step and lon = -180 + i * (step / cos(lat))
//   countries.{kr,tz}.dots     denser dots inside the country, flat [lat, lon, ...]
//   countries.{kr,tz}.outline  simplified mainland outline, flat [lon, lat, ...]

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { feature } from 'topojson-client';
import { geoContains } from 'd3-geo';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'src', 'data', 'geo', 'globe.json');
const STEP = 1.2;
const COUNTRIES = {
  kr: { id: '410', step: 0.35, outlinePoints: 70 },
  tz: { id: '834', step: 0.55, outlinePoints: 90 },
};

const load = async (file) => JSON.parse(await readFile(path.join(ROOT, 'node_modules', 'world-atlas', file), 'utf8'));
const round = (n) => Math.round(n * 10) / 10;

const landTopo = await load('land-50m.json');
const land = feature(landTopo, landTopo.objects.land);
const countriesTopo = await load('countries-50m.json');
const countries = feature(countriesTopo, countriesTopo.objects.countries);

// Land dots as run-length rows.
const rows = [];
let dotCount = 0;
for (let li = Math.ceil((90 - 60) / STEP); -90 + li * STEP <= 80; li++) {
  const lat = -90 + li * STEP;
  const lonStep = STEP / Math.cos((lat * Math.PI) / 180);
  const n = Math.floor(360 / lonStep);
  const row = [li];
  let start = -1;
  for (let i = 0; i <= n; i++) {
    const inside = i < n && geoContains(land, [-180 + i * lonStep, lat]);
    if (inside && start < 0) start = i;
    if (!inside && start >= 0) {
      row.push(start, i - start);
      dotCount += i - start;
      start = -1;
    }
  }
  if (row.length > 1) rows.push(row);
}

// Highlighted countries: dense dots plus the largest polygon as a simplified outline.
const out = { step: STEP, land: rows, countries: {} };
for (const [key, { id, step, outlinePoints }] of Object.entries(COUNTRIES)) {
  const f = countries.features.find((c) => c.id === id);
  const [[minLon, minLat], [maxLon, maxLat]] = bounds(f);
  const dots = [];
  for (let lat = minLat; lat <= maxLat; lat += step) {
    for (let lon = minLon; lon <= maxLon; lon += step) {
      if (geoContains(f, [lon, lat])) dots.push(round(lat), round(lon));
    }
  }
  const polys = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates];
  const ring = polys.map((p) => p[0]).sort((a, b) => b.length - a.length)[0];
  const every = Math.max(1, Math.floor(ring.length / outlinePoints));
  const outline = ring.filter((_, i) => i % every === 0).flatMap(([lon, lat]) => [round(lon), round(lat)]);
  out.countries[key] = { dots, outline };
  console.log(`${key}: ${dots.length / 2} dots, ${outline.length / 2} outline points`);
}

await mkdir(path.dirname(OUT), { recursive: true });
const json = JSON.stringify(out);
await writeFile(OUT, json + '\n');
console.log(`land: ${dotCount} dots in ${rows.length} rows. Wrote ${(json.length / 1024).toFixed(1)} KB to ${path.relative(ROOT, OUT)}`);

function bounds(f) {
  let minLon = 180, minLat = 90, maxLon = -180, maxLat = -90;
  const visit = (c) => {
    if (typeof c[0] === 'number') {
      minLon = Math.min(minLon, c[0]); maxLon = Math.max(maxLon, c[0]);
      minLat = Math.min(minLat, c[1]); maxLat = Math.max(maxLat, c[1]);
    } else c.forEach(visit);
  };
  visit(f.geometry.coordinates);
  return [[minLon, minLat], [maxLon, maxLat]];
}
