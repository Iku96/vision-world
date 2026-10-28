import type { StockPage } from '../types';

export const stockPage: StockPage = {
  _id: 'stockPage',
  _type: 'stockPage',
  seo: {
    title: { en: 'Stock' },
    description: {
      en: 'Trucks, vehicles and goods available now or on the way to Tanzania. Ask Vision World on WhatsApp for prices and details.',
    },
  },
  header: {
    eyebrow: { en: 'Stock' },
    heading: { en: 'Available and incoming' },
    intro: { en: 'Browse what is available now and what is on the way. Ask on WhatsApp for prices and details.' },
  },
  note: { en: 'These are sample listings. Real stock, photos and details will replace them.' },
  listing: {
    seoDescription: { en: '{title}. {status}. Ask Vision World on WhatsApp for price and details.' },
    sampleNote: { en: 'Sample listing. Details and photos are placeholders.' },
    specsHeading: { en: 'Specifications' },
    descriptionHeading: { en: 'Description' },
    relatedHeading: { en: 'More in this category' },
  },
};
