import type { SiteSettings } from './types';

export const siteSettings: SiteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  companyName: 'Vision World',
  ceo: {
    name: 'Joseph Makina',
    role: { en: 'CEO' },
  },
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
    whatsappNumber: '+255 680 418 090',
    whatsappMessage: {
      en: 'Hello Vision World, I would like a quote.',
    },
    phone: '+255 680 418 090',
    email: 'info@vision-world.com',
    address: { en: '4th Floor, Noble Center, Makumbusho, Dar es Salaam, Tanzania' },
    mapQuery: 'Noble Center, Makumbusho, Dar es Salaam, Tanzania',
    hours: { en: 'Monday to Friday, 9am to 5pm' },
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
  previewBanner: true,
  cta: {
    heading: { en: 'Tell us what you need' },
    text: { en: 'Send us a message on WhatsApp or request a quote. We will get back to you with options.' },
    quoteLink: { label: { en: 'Request a quote' }, href: 'contact' },
  },
};
