import type { Listing, LocalizedString } from './types';

// Sample listings with placeholders. Replace with real stock; never invent prices or specs.

const photos = (subject: string, views: string[]) =>
  views.map((view) => ({ src: '', alt: { en: `Photo of this ${subject}: ${view}` } }));

const spec = (label: string, value: string): { label: LocalizedString; value: LocalizedString } => ({
  label: { en: label },
  value: { en: value },
});

const vehicleSpecs = [
  spec('Make', '[MAKE]'),
  spec('Model', '[MODEL]'),
  spec('Year', '[YEAR]'),
  spec('Mileage', '[MILEAGE] km'),
  spec('Condition', '[CONDITION]'),
  spec('Location', '[LOCATION]'),
];

const goodsSpecs = [spec('Quantity', '[QUANTITY]'), spec('Condition', '[CONDITION]'), spec('Location', '[LOCATION]')];

const description = { en: '[DESCRIPTION: condition, history and what is included]' };

export const listings: Listing[] = [
  {
    _id: 'listing-scania-tractor-head',
    _type: 'listing',
    slug: { current: 'scania-tractor-head' },
    title: { en: 'Scania tractor head [MODEL, YEAR]' },
    category: { _ref: 'category-trucks' },
    status: 'available',
    price: { type: 'onRequest' },
    summary: description,
    specs: vehicleSpecs,
    images: photos('Scania tractor head', ['front', 'side', 'cab interior']),
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
    summary: description,
    specs: [...vehicleSpecs.slice(0, 5), spec('Expected arrival', '[EXPECTED ARRIVAL]')],
    images: photos('Hyundai truck', ['front', 'side', 'rear']),
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
    summary: description,
    specs: vehicleSpecs,
    images: photos('SUV', ['front', 'side', 'interior']),
    featured: true,
  },
  {
    _id: 'listing-truck-spare-parts',
    _type: 'listing',
    slug: { current: 'truck-spare-parts' },
    title: { en: 'Truck spare parts [PART TYPES]' },
    category: { _ref: 'category-spare-parts' },
    status: 'available',
    price: { type: 'onRequest' },
    summary: description,
    specs: [spec('Fits', '[COMPATIBLE MAKES AND MODELS]'), ...goodsSpecs],
    images: photos('spare parts lot', ['overview', 'close-up', 'part numbers']),
    featured: false,
  },
  {
    _id: 'listing-refrigerators',
    _type: 'listing',
    slug: { current: 'refrigerators' },
    title: { en: 'Refrigerators [BRAND, CAPACITY]' },
    category: { _ref: 'category-electronics' },
    status: 'incoming',
    price: { type: 'onRequest' },
    summary: description,
    specs: [spec('Brand', '[BRAND]'), spec('Capacity', '[CAPACITY]'), ...goodsSpecs, spec('Expected arrival', '[EXPECTED ARRIVAL]')],
    images: photos('refrigerator', ['front', 'open', 'label']),
    featured: false,
  },
  {
    _id: 'listing-kitchenware',
    _type: 'listing',
    slug: { current: 'kitchenware-assortment' },
    title: { en: 'Kitchenware assortment [DETAILS]' },
    category: { _ref: 'category-kitchenware' },
    status: 'available',
    price: { type: 'onRequest' },
    summary: description,
    specs: [spec('Items', '[ITEMS INCLUDED]'), ...goodsSpecs],
    images: photos('kitchenware', ['overview', 'pots', 'utensils']),
    featured: false,
  },
  {
    _id: 'listing-used-clothes',
    _type: 'listing',
    slug: { current: 'used-clothes' },
    title: { en: 'Used clothes [TYPE, GRADE]' },
    category: { _ref: 'category-clothing' },
    status: 'available',
    price: { type: 'onRequest' },
    summary: description,
    specs: [spec('Type', '[TYPE]'), spec('Grade', '[GRADE]'), ...goodsSpecs],
    images: photos('clothing', ['overview', 'sample items', 'labels']),
    featured: false,
  },
  {
    _id: 'listing-safari-bags',
    _type: 'listing',
    slug: { current: 'safari-bags' },
    title: { en: 'Safari bags [STYLE]' },
    category: { _ref: 'category-bags' },
    status: 'available',
    price: { type: 'onRequest' },
    summary: description,
    specs: [spec('Material', '[MATERIAL]'), spec('Size', '[SIZE]'), ...goodsSpecs],
    images: photos('safari bag', ['front', 'inside', 'detail']),
    featured: false,
  },
  {
    _id: 'listing-used-bicycle',
    _type: 'listing',
    slug: { current: 'used-bicycle' },
    title: { en: 'Used bicycle [MAKE, MODEL]' },
    category: { _ref: 'category-bicycles' },
    status: 'sold',
    price: { type: 'onRequest' },
    summary: description,
    specs: [spec('Make', '[MAKE]'), spec('Model', '[MODEL]'), spec('Year', '[YEAR]'), spec('Condition', '[CONDITION]')],
    images: photos('bicycle', ['side', 'front', 'detail']),
    featured: false,
  },
];
