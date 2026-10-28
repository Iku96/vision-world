// Document shapes mirror the planned Sanity schemas, so swapping the
// data source later only changes the getters in src/data/index.ts.

import type { Locale } from '../i18n/config';
import type { IconName } from '../components/icons';

/** Field-level localized string, as in Sanity's internationalized string type. */
export type LocalizedString = { [K in Locale]?: string } & { en: string };

export interface Slug {
  current: string;
}

export interface ImageRef {
  /** Photos: '/src/assets/images/...' (rendered with <Picture>). Site files like the logo: path under /public. Empty means "use a placeholder". */
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
  ceo: {
    name: string;
    role: LocalizedString;
  };
  description: LocalizedString;
  logo: ImageRef;
  contact: {
    /** International format, e.g. +255712345678. X digits mark a placeholder. */
    whatsappNumber: string;
    whatsappMessage: LocalizedString;
    phone: string;
    email: string;
    address: LocalizedString;
    /** Search text for the Google Maps embed. */
    mapQuery: string;
    hours: LocalizedString;
  };
  /** Closing call to action shown at the end of most pages. */
  cta: {
    heading: LocalizedString;
    text: LocalizedString;
    quoteLink: Link;
  };
  social: { platform: string; url: string }[];
  seo: {
    /** %s is replaced with the page title. */
    titleTemplate: string;
    ogImage: ImageRef;
  };
  /** Demo phase: adds robots noindex to every page. */
  noindex: boolean;
  /** Review phase: shows the "preview site" banner on every page. */
  previewBanner: boolean;
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
  /** Extra detail for the How We Work page. */
  details: LocalizedString[];
  icon: IconName;
}

export interface Category {
  _id: string;
  _type: 'category';
  slug: Slug;
  title: LocalizedString;
  description: LocalizedString;
  /** Longer copy for the category page, one string per paragraph. */
  body: LocalizedString[];
  /** What we can source in this category. */
  examples: LocalizedString[];
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

/** Heading block shared by home page sections. */
export interface SectionCopy {
  eyebrow: LocalizedString;
  heading: LocalizedString;
  intro?: LocalizedString;
  link?: Link;
}

export interface HomePage {
  _id: 'homePage';
  _type: 'homePage';
  hero: {
    eyebrow: LocalizedString;
    heading: LocalizedString;
    subheading: LocalizedString;
    /** Background photo behind the globe. */
    image: ImageRef;
    secondaryCta: Link;
    /** Label before the split-flap category board. */
    sourcingLabel: LocalizedString;
    from: RoutePoint;
    to: RoutePoint;
  };
  trade: SectionCopy;
  stock: SectionCopy;
  howWeWork: SectionCopy;
  about: SectionCopy & {
    text: LocalizedString;
    /** Attributed to siteSettings.ceo. */
    quote: LocalizedString;
    image: ImageRef;
  };
  group: SectionCopy;
}

/** A place on the hero globe. */
export interface RoutePoint {
  label: LocalizedString;
  lat: number;
  lon: number;
}

export interface PageSeo {
  title: LocalizedString;
  description: LocalizedString;
}

export interface PageHeaderCopy {
  eyebrow: LocalizedString;
  heading: LocalizedString;
  intro: LocalizedString;
}

export interface FaqItem {
  question: LocalizedString;
  answer: LocalizedString;
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

export interface TitledText {
  title: LocalizedString;
  text: LocalizedString;
}

export interface AboutPage {
  _id: 'aboutPage';
  _type: 'aboutPage';
  seo: PageSeo;
  header: PageHeaderCopy;
  story: { heading: LocalizedString; paragraphs: LocalizedString[] };
  mission: TitledText;
  vision: TitledText;
  ceo: {
    eyebrow: LocalizedString;
    heading: LocalizedString;
    story: LocalizedString;
    quote: LocalizedString;
    image: ImageRef;
  };
  values: { heading: LocalizedString; intro: LocalizedString; items: TitledText[] };
}

export interface WhatWeTradePage {
  _id: 'whatWeTradePage';
  _type: 'whatWeTradePage';
  seo: PageSeo;
  header: PageHeaderCopy;
  ask: TitledText;
  /** Category pages. {category} is replaced with the category name. */
  category: {
    eyebrow: LocalizedString;
    examplesHeading: LocalizedString;
    listingsHeading: LocalizedString;
    noListings: LocalizedString;
    viewInStock: LocalizedString;
    seoSuffix: LocalizedString;
  };
}

export interface StockPage {
  _id: 'stockPage';
  _type: 'stockPage';
  seo: PageSeo;
  header: PageHeaderCopy;
  note: LocalizedString;
  /** Listing pages. {title} and {status} are replaced. */
  listing: {
    seoDescription: LocalizedString;
    sampleNote: LocalizedString;
    specsHeading: LocalizedString;
    descriptionHeading: LocalizedString;
    relatedHeading: LocalizedString;
  };
}

export interface HowWeWorkPage {
  _id: 'howWeWorkPage';
  _type: 'howWeWorkPage';
  seo: PageSeo;
  header: PageHeaderCopy;
  faq: { heading: LocalizedString; intro: LocalizedString; items: FaqItem[] };
}

export interface VisionGroupPage {
  _id: 'visionGroupPage';
  _type: 'visionGroupPage';
  seo: PageSeo;
  header: PageHeaderCopy;
  intro: { heading: LocalizedString; paragraphs: LocalizedString[] };
  divisionsHeading: LocalizedString;
}

export interface ContactPage {
  _id: 'contactPage';
  _type: 'contactPage';
  seo: PageSeo;
  header: PageHeaderCopy;
  whatsapp: TitledText;
  detailsHeading: LocalizedString;
  mapTitle: LocalizedString;
  form: {
    heading: LocalizedString;
    intro: LocalizedString;
    name: LocalizedString;
    phone: LocalizedString;
    email: LocalizedString;
    need: LocalizedString;
    needHint: LocalizedString;
    category: LocalizedString;
    categoryPlaceholder: LocalizedString;
    categoryOther: LocalizedString;
    message: LocalizedString;
    required: LocalizedString;
    optional: LocalizedString;
    submit: LocalizedString;
    demoMessage: LocalizedString;
  };
}

export interface NotFoundPage {
  _id: 'notFoundPage';
  _type: 'notFoundPage';
  seo: PageSeo;
  header: PageHeaderCopy;
  links: Link[];
}
