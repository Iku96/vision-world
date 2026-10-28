import type { LocalizedString } from './types';

// Interface copy shared across pages (buttons, menus, labels).
export const ui = {
  skipToContent: { en: 'Skip to content' },
  menuOpen: { en: 'Menu' },
  menuClose: { en: 'Close menu' },
  mainNav: { en: 'Main' },
  footerNav: { en: 'Footer' },
  homeLink: { en: 'Vision World home' },
  whatsappCta: { en: 'Chat on WhatsApp' },
  whatsappShort: { en: 'WhatsApp' },
  quoteCta: { en: 'Request a quote' },
  language: { en: 'Language' },
  languageComingSoon: { en: 'coming soon' },
  footerPages: { en: 'Pages' },
  footerContact: { en: 'Contact' },
  footerGroup: { en: 'Vision Group' },
  footerGroupText: { en: 'New divisions are on the way, from logistics to consulting.' },
  footerGroupLink: { en: 'See what is coming' },
  rights: { en: 'All rights reserved.' },
  placeholder: { en: 'Placeholder' },
} satisfies Record<string, LocalizedString>;
