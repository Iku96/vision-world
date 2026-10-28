import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

/**
 * Read the pixel size of a file in /public at build time, or undefined if it is missing.
 * Resolved from the project root because import.meta.url moves when Astro bundles pages.
 */
export async function getPublicImageSize(src: string): Promise<{ width: number; height: number } | undefined> {
  if (!src.startsWith('/')) return undefined;
  const file = path.join(process.cwd(), 'public', src);
  if (!existsSync(file)) return undefined;
  const { width, height } = await sharp(file).metadata();
  return width && height ? { width, height } : undefined;
}
