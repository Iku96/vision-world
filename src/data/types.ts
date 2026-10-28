// Document shapes mirror the planned Sanity schemas, so swapping the
// data source later only changes the getters in src/data/index.ts.

import type { Locale } from '../i18n/config';

/** Field-level localized string, as in Sanity's internationalized string type. */
export type LocalizedString = { [K in Locale]?: string } & { en: string };

export interface Slug {
  current: string;
}

export interface ImageRef {
  /** Path under /public or an imported asset URL. Empty means "use a placeholder". */
  src: string;
  alt: LocalizedString;
  width?: number;
  height?: number;
}

export interface Link {
  label: LocalizedString;
  /** Locale-agnostic internal path ('about') or absolute external URL. */
  href: string;
}

export interface SiteSettings {
  _id: 'siteSettings';
  _type: 'siteSettings';
  companyName: string;
  tagline: LocalizedString;
  description: LocalizedString;
  logo: ImageRef;
  contact: {
    /** International format, digits only once known, e.g. 255712345678. */
    whatsappNumber: string;
    whatsappMessage: LocalizedString;
    phone: string;
    email: string;
    address: LocalizedString;
    hours: LocalizedString;
  };
  social: { platform: string; url: string }[];
  seo: {
    /** %s is replaced with the page title. */
    titleTemplate: string;
    ogImage: ImageRef;
  };
  /** Demo phase: adds robots noindex to every page. */
  noindex: boolean;
}

export interface Navigation {
  _id: 'navigation';
  _type: 'navigation';
  main: Link[];
  footer: Link[];
}

export interface BuyerJourneyStep {
  _id: string;
  _type: 'buyerJourneyStep';
  order: number;
  title: LocalizedString;
  description: LocalizedString;
  icon: string;
}

export interface Category {
  _id: string;
  _type: 'category';
  slug: Slug;
  title: LocalizedString;
  description: LocalizedString;
  image: ImageRef;
  order: number;
}

export type ListingStatus = 'available' | 'sold' | 'incoming';

export type ListingPrice = { type: 'fixed'; amountTZS: number } | { type: 'onRequest' };

export interface Listing {
  _id: string;
  _type: 'listing';
  slug: Slug;
  title: LocalizedString;
  category: { _ref: string };
  status: ListingStatus;
  price: ListingPrice;
  summary: LocalizedString;
  specs: { label: LocalizedString; value: LocalizedString }[];
  images: ImageRef[];
  featured: boolean;
}

export interface Division {
  _id: string;
  _type: 'division';
  slug: Slug;
  name: string;
  description: LocalizedString;
  status: 'comingSoon' | 'active';
  order: number;
}
