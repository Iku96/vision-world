import type { Listing } from './types';

// Sample listings with placeholders. Replace with real stock; never invent prices or specs.
export const listings: Listing[] = [
  {
    _id: 'listing-scania-tractor-head',
    _type: 'listing',
    slug: { current: 'scania-tractor-head' },
    title: { en: 'Scania tractor head [MODEL, YEAR]' },
    category: { _ref: 'category-trucks' },
    status: 'available',
    price: { type: 'onRequest' },
    summary: { en: '[SHORT DESCRIPTION]' },
    specs: [
      { label: { en: 'Year' }, value: { en: '[YEAR]' } },
      { label: { en: 'Mileage' }, value: { en: '[MILEAGE] km' } },
    ],
    images: [{ src: '', alt: { en: 'Photo of this Scania tractor head' } }],
    featured: true,
  },
  {
    _id: 'listing-hyundai-truck',
    _type: 'listing',
    slug: { current: 'hyundai-truck' },
    title: { en: 'Hyundai truck [MODEL, YEAR]' },
    category: { _ref: 'category-trucks' },
    status: 'incoming',
    price: { type: 'onRequest' },
    summary: { en: '[SHORT DESCRIPTION]' },
    specs: [
      { label: { en: 'Year' }, value: { en: '[YEAR]' } },
      { label: { en: 'Arrival' }, value: { en: '[EXPECTED ARRIVAL]' } },
    ],
    images: [{ src: '', alt: { en: 'Photo of this Hyundai truck' } }],
    featured: true,
  },
  {
    _id: 'listing-suv',
    _type: 'listing',
    slug: { current: 'suv' },
    title: { en: 'SUV [MAKE, MODEL, YEAR]' },
    category: { _ref: 'category-suvs' },
    status: 'sold',
    price: { type: 'onRequest' },
    summary: { en: '[SHORT DESCRIPTION]' },
    specs: [
      { label: { en: 'Year' }, value: { en: '[YEAR]' } },
      { label: { en: 'Mileage' }, value: { en: '[MILEAGE] km' } },
    ],
    images: [{ src: '', alt: { en: 'Photo of this SUV' } }],
    featured: true,
  },
];
