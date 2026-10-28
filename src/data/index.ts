// Data access layer. Components import from here, never from the raw files,
// so these getters can become Sanity queries later.

import { siteSettings } from './siteSettings';
import { navigation } from './navigation';
import { ui } from './ui';
import type { Locale } from '../i18n/config';
import { t } from '../i18n/utils';

export const getSiteSettings = () => siteSettings;
export const getNavigation = () => navigation;
export const getUi = () => ui;

/** wa.me click-to-chat link. Falls back to the share picker while the number is a placeholder. */
export function getWhatsappUrl(locale: Locale, message?: string): string {
  const { whatsappNumber, whatsappMessage } = siteSettings.contact;
  const digits = whatsappNumber.replace(/\D/g, '');
  const text = encodeURIComponent(message ?? t(whatsappMessage, locale));
  return `https://wa.me/${digits}?text=${text}`;
}
