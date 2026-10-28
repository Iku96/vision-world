// Data access layer. Components import from here, never from the raw files,
// so these getters can become Sanity queries later.

import { siteSettings } from './siteSettings';
import { navigation } from './navigation';
import { ui } from './ui';
import { buyerJourney } from './buyerJourney';
import { categories } from './categories';
import { listings } from './listings';
import { divisions } from './divisions';
import { homePage } from './pages/home';
import type { Locale } from '../i18n/config';
import { t } from '../i18n/utils';

const byOrder = <T extends { order: number }>(items: T[]) => [...items].sort((a, b) => a.order - b.order);

export const getSiteSettings = () => siteSettings;
export const getNavigation = () => navigation;
export const getUi = () => ui;
export const getHomePage = () => homePage;
export const getBuyerJourney = () => byOrder(buyerJourney);
export const getCategories = () => byOrder(categories);
export const getDivisions = () => byOrder(divisions);
export const getListings = () => listings;
export const getFeaturedListings = (limit = 3) => listings.filter((l) => l.featured).slice(0, limit);

/** wa.me click-to-chat link. Falls back to the share picker while the number is a placeholder (contains X). */
export function getWhatsappUrl(locale: Locale, message?: string): string {
  const { whatsappNumber, whatsappMessage } = siteSettings.contact;
  const digits = /x/i.test(whatsappNumber) ? '' : whatsappNumber.replace(/\D/g, '');
  const text = encodeURIComponent(message ?? t(whatsappMessage, locale));
  return `https://wa.me/${digits}?text=${text}`;
}
