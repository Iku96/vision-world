// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Temporary domain until launch.
  site: 'https://vision-world.vercel.app',

  i18n: {
    locales: ['en', 'sw'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Archivo',
      cssVariable: '--font-archivo',
      weights: [700, 800],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-TZ', sw: 'sw-TZ' },
      },
    }),
  ],
});
