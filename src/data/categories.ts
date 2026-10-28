import type { Category } from './types';

// Images are Pixabay placeholders until real Vision World photos are available.
export const categories: Category[] = [
  {
    _id: 'category-trucks',
    _type: 'category',
    slug: { current: 'trucks' },
    order: 1,
    title: { en: 'Trucks' },
    description: { en: 'Scania tractor heads, plus Samsung and Hyundai trucks.' },
    body: [
      { en: 'Trucks are at the heart of what we do. We source tractor heads and trucks from South Korea for haulage, construction and business use in Tanzania.' },
      { en: 'Tell us the make, model, year range and budget you have in mind. We look for options that match and share photos and details before you decide.' },
    ],
    examples: [
      { en: 'Scania tractor heads' },
      { en: 'Samsung trucks' },
      { en: 'Hyundai trucks' },
      { en: '[OTHER TRUCK MAKES OR TYPES]' },
    ],
    image: { src: '/src/assets/images/trucks/truck-fleet-2.webp', alt: { en: 'Row of parked trucks' } },
  },
  {
    _id: 'category-suvs',
    _type: 'category',
    slug: { current: 'suvs' },
    order: 2,
    title: { en: 'SUVs' },
    description: { en: 'SUVs and other vehicles for family and business use.' },
    body: [
      { en: 'Korea has a large market for well-kept used SUVs. We source SUVs for families, businesses and organisations in Tanzania.' },
      { en: 'Share the size, budget and use you have in mind, and we will come back with options.' },
    ],
    examples: [
      { en: 'SUVs for family use' },
      { en: 'SUVs for business and fleet use' },
      { en: '[MAKES AND MODELS YOU USUALLY SOURCE]' },
    ],
    image: { src: '/src/assets/images/vehicles/suv-car-1.webp', alt: { en: 'Grey SUV parked by the coast, side view' } },
  },
  {
    _id: 'category-spare-parts',
    _type: 'category',
    slug: { current: 'spare-parts' },
    order: 3,
    title: { en: 'Spare parts' },
    description: { en: 'Parts for trucks and vehicles.' },
    body: [
      { en: 'Keeping trucks and vehicles on the road needs the right parts. We source spare parts for trucks and vehicles from Korea and beyond.' },
      { en: 'Send us the part number, or a photo of the part and the vehicle details, and we will check what we can find.' },
    ],
    examples: [
      { en: 'Truck parts' },
      { en: 'Vehicle parts' },
      { en: '[PART TYPES YOU USUALLY STOCK]' },
    ],
    image: { src: '/src/assets/images/spare-parts/brake-disc-1.webp', alt: { en: 'Brake disc on a vehicle' } },
  },
  {
    _id: 'category-electronics',
    _type: 'category',
    slug: { current: 'electronics' },
    order: 4,
    title: { en: 'Electronics' },
    description: { en: 'Refrigerators, radios and other electronics.' },
    body: [
      { en: 'We source household and business electronics, including refrigerators and radios.' },
      { en: 'Let us know the type, size and quantity you need.' },
    ],
    examples: [
      { en: 'Refrigerators' },
      { en: 'Radios' },
      { en: '[OTHER ELECTRONICS]' },
    ],
    image: { src: '/src/assets/images/electronics/radio-1.webp', alt: { en: 'Red portable radio' } },
  },
  {
    _id: 'category-kitchenware',
    _type: 'category',
    slug: { current: 'kitchenware' },
    order: 5,
    title: { en: 'Kitchenware' },
    description: { en: 'Pots, pans and kitchen essentials.' },
    body: [
      { en: 'Good kitchenware lasts for years. We source pots, pans and kitchen essentials for homes and businesses.' },
      { en: 'Tell us what you are looking for and the quantity, whether for your home, a shop or a restaurant.' },
    ],
    examples: [
      { en: 'Pots and pans' },
      { en: 'Kitchen utensils' },
      { en: '[OTHER KITCHENWARE]' },
    ],
    image: { src: '/src/assets/images/kitchenware/cooking-pots-3.webp', alt: { en: 'Cooking pot with fresh vegetables' } },
  },
  {
    _id: 'category-clothing',
    _type: 'category',
    slug: { current: 'used-clothes' },
    order: 6,
    title: { en: 'Used clothes' },
    description: { en: 'Quality second-hand clothing.' },
    body: [
      { en: 'We source quality second-hand clothing for resale and personal use.' },
      { en: 'Ask us about the types of clothing and quantities available.' },
    ],
    examples: [
      { en: 'Quality second-hand clothing' },
      { en: '[BALE SIZES AND GRADES, IF APPLICABLE]' },
    ],
    image: { src: '/src/assets/images/clothing/second-hand-clothes-2.webp', alt: { en: 'Rack of colourful shirts' } },
  },
  {
    _id: 'category-bags',
    _type: 'category',
    slug: { current: 'safari-bags' },
    order: 7,
    title: { en: 'Safari bags' },
    description: { en: 'Durable bags for travel and safari.' },
    body: [
      { en: 'Durable bags built for travel and safari, suitable for personal use, tour operators and shops.' },
      { en: 'Tell us the style and quantity you need.' },
    ],
    examples: [
      { en: 'Safari bags' },
      { en: 'Travel bags' },
      { en: '[OTHER BAG TYPES]' },
    ],
    image: { src: '/src/assets/images/bags/leather-duffel-bag-1.webp', alt: { en: 'Brown leather travel bag' } },
  },
  {
    _id: 'category-bicycles',
    _type: 'category',
    slug: { current: 'bicycles' },
    order: 8,
    title: { en: 'Rare used bicycles' },
    description: { en: 'Hard-to-find used bicycles.' },
    body: [
      { en: 'Some bicycles are hard to find in Tanzania. We source rare used bicycles for riders and collectors.' },
      { en: 'Tell us what you are looking for and we will check what is available.' },
    ],
    examples: [
      { en: 'Rare used bicycles' },
      { en: '[TYPES OR MAKES YOU USUALLY SOURCE]' },
    ],
    image: { src: '/src/assets/images/bicycles/vintage-bicycle-3.webp', alt: { en: 'Vintage bicycle outside a shop' } },
  },
];
