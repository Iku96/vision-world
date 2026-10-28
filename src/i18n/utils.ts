import { getRelativeLocaleUrl } from 'astro:i18n';
import { defaultLocale, locales, publishedLocales, type Locale } from './config';
import type { LocalizedString } from '../data/types';

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

/** Resolve the current locale from Astro.currentLocale. */
export function getLocale(currentLocale: string | undefined): Locale {
  return isLocale(currentLocale) ? currentLocale : defaultLocale;
}

export function isPublished(locale: Locale): boolean {
  return publishedLocales.includes(locale);
}

/** Read a localized field, falling back to the default locale. */
export function t(value: LocalizedString, locale: Locale): string {
  return value[locale] ?? value.en;
}

/** Turn a locale-agnostic path ('', 'about', 'stock#incoming') into a URL for the given locale. */
export function localizePath(path: string, locale: Locale): string {
  const [pathname, hash] = path.split('#');
  const url = getRelativeLocaleUrl(locale, pathname.replace(/^\/+|\/+$/g, ''));
  return hash ? `${url}#${hash}` : url;
}

/** Strip any locale prefix from a URL pathname, giving the locale-agnostic path. */
export function stripLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (isLocale(segments[0]) && segments[0] !== defaultLocale) segments.shift();
  return segments.join('/');
}
