// Keep in sync with i18n.locales in astro.config.mjs.
export const locales = ['en', 'sw'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// Locales that have built pages. Add 'sw' once Swahili content exists.
export const publishedLocales: readonly Locale[] = ['en'];

export const localeMeta: Record<Locale, { label: string; name: string; htmlLang: string; ogLocale: string }> = {
  en: { label: 'EN', name: 'English', htmlLang: 'en', ogLocale: 'en_TZ' },
  sw: { label: 'SW', name: 'Kiswahili', htmlLang: 'sw', ogLocale: 'sw_TZ' },
};
