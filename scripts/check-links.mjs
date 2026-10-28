// Checks every internal link and asset in the built site (dist/).
// Usage: npm run build && npm run check:links
//
// Reports: broken internal links or assets, missing #anchor targets,
// pages nothing links to, and a summary of external links (not fetched).

import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const DIST = path.resolve(import.meta.dirname, '..', 'dist');

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const exists = async (p) => !!(await stat(p).catch(() => null));

/** Map a URL path to the built file that serves it, or null. */
async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath).replace(/\/+$/, '');
  for (const candidate of [path.join(DIST, clean), path.join(DIST, clean, 'index.html'), path.join(DIST, `${clean}.html`)]) {
    if ((await exists(candidate)) && (await stat(candidate)).isFile()) return candidate;
  }
  return null;
}

/** URL path a built HTML file is served at. */
const pageUrl = (file) => {
  const rel = '/' + path.relative(DIST, file).split(path.sep).join('/');
  return rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
};

const pages = await walk(DIST);
const html = new Map(await Promise.all(pages.map(async (f) => [f, await readFile(f, 'utf8')])));
const ids = new Map([...html].map(([f, s]) => [f, new Set([...s.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));

const broken = [];
const external = new Map();
const linkedPages = new Set();
let checked = 0;

for (const [file, source] of html) {
  const from = pageUrl(file);
  const refs = [
    ...[...source.matchAll(/\s(?:href|src)="([^"]*)"/g)].map((m) => m[1]),
    ...[...source.matchAll(/\ssrcset="([^"]*)"/g)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(/\s+/)[0])),
  ];
  for (const raw of refs) {
    const ref = raw.replaceAll('&amp;', '&');
    if (!ref || /^(mailto:|tel:|data:|javascript:)/.test(ref)) continue;
    if (/^https?:\/\//.test(ref)) {
      const host = new URL(ref).host;
      external.set(host, (external.get(host) ?? 0) + 1);
      continue;
    }
    checked++;
    const url = new URL(ref, `https://site${from}`);
    const target = url.pathname === from && !ref.startsWith('/') && ref.startsWith('#') ? file : await resolveFile(url.pathname);
    if (!target) {
      broken.push(`${from} -> ${ref} (no such page or file)`);
      continue;
    }
    if (target.endsWith('.html')) linkedPages.add(target);
    if (url.hash && target.endsWith('.html') && !ids.get(target)?.has(decodeURIComponent(url.hash.slice(1)))) {
      broken.push(`${from} -> ${ref} (missing #${url.hash.slice(1)})`);
    }
  }
}

const orphans = pages.filter((p) => !linkedPages.has(p) && !p.endsWith(`${path.sep}404.html`));

console.log(`Checked ${checked} internal links and assets across ${pages.length} pages.`);
console.log(broken.length ? `\nBROKEN (${broken.length}):\n  ${broken.join('\n  ')}` : 'Broken: none');
console.log(orphans.length ? `\nNot linked from any page:\n  ${orphans.map(pageUrl).join('\n  ')}` : 'Unlinked pages: none');
console.log(`\nExternal links (not fetched): ${[...external].map(([h, n]) => `${h} (${n})`).join(', ') || 'none'}`);
process.exit(broken.length ? 1 : 0);
