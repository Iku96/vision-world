import type { SiteSettings } from './types';

export const siteSettings: SiteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  companyName: 'Vision World',
  tagline: {
    en: 'Bridging Tanzania and Korea',
  },
  description: {
    en: 'Vision World is an international trading and investment company in Tanzania. We source trucks, vehicles and goods from Korea and beyond, and make them available in Tanzania.',
  },
  logo: {
    src: '/logo.png',
    alt: { en: 'Vision World' },
  },
  contact: {
    whatsappNumber: '+255XXXXXXXXX',
    whatsappMessage: {
      en: 'Hello Vision World, I would like a quote.',
    },
    phone: '[PHONE NUMBER]',
    email: '[EMAIL ADDRESS]',
    address: { en: '[OFFICE ADDRESS], Tanzania' },
    hours: { en: '[OPENING HOURS]' },
  },
  social: [],
  seo: {
    titleTemplate: '%s | Vision World',
    // Placeholder OG image until real brand imagery is ready.
    ogImage: {
      src: '/og-default.png',
      alt: { en: 'Vision World' },
      width: 1200,
      height: 630,
    },
  },
  noindex: true,
};
