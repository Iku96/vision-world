import type { BuyerJourneyStep } from './types';

// The buyer journey Vision World supports. Shipping and clearing are future
// divisions, so these steps must not claim we run them ourselves.
export const buyerJourney: BuyerJourneyStep[] = [
  {
    _id: 'journey-sourcing',
    _type: 'buyerJourneyStep',
    order: 1,
    icon: 'search',
    title: { en: 'Sourcing in Korea' },
    description: {
      en: 'Tell us what you need. We look for it in South Korea and beyond, and share photos and details before you decide.',
    },
  },
  {
    _id: 'journey-import',
    _type: 'buyerJourneyStep',
    order: 2,
    icon: 'ship',
    title: { en: 'Import' },
    description: {
      en: 'Your goods make the journey to Tanzania. We keep you informed at every stage.',
    },
  },
  {
    _id: 'journey-inspection',
    _type: 'buyerJourneyStep',
    order: 3,
    icon: 'inspect',
    title: { en: 'Inspection' },
    description: {
      en: 'See the vehicle or goods in Tanzania and check them before handover.',
    },
  },
  {
    _id: 'journey-handover',
    _type: 'buyerJourneyStep',
    order: 4,
    icon: 'key',
    title: { en: 'Handover' },
    description: {
      en: 'Take delivery in Tanzania. We stay in touch for any questions afterwards.',
    },
  },
];
