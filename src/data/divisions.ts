import type { Division } from './types';

export const divisions: Division[] = [
  {
    _id: 'division-beauty',
    _type: 'division',
    slug: { current: 'beauty-cosmetics' },
    name: 'Vision Beauty & Cosmetics',
    description: { en: 'Beauty and cosmetics products for Tanzania.' },
    status: 'comingSoon',
    order: 1,
  },
  {
    _id: 'division-logistics',
    _type: 'division',
    slug: { current: 'logistics' },
    name: 'Vision Logistics',
    description: { en: 'Moving goods between Asia and Tanzania.' },
    status: 'comingSoon',
    order: 2,
  },
  {
    _id: 'division-consulting',
    _type: 'division',
    slug: { current: 'consulting' },
    name: 'Vision Consulting',
    description: { en: 'Advice for businesses trading between Asia and Africa.' },
    status: 'comingSoon',
    order: 3,
  },
  {
    _id: 'division-clearing',
    _type: 'division',
    slug: { current: 'clearing-forwarding' },
    name: 'Vision Clearing & Forwarding',
    description: { en: 'Customs clearing and forwarding in Tanzania.' },
    status: 'comingSoon',
    order: 4,
  },
  {
    _id: 'division-mining',
    _type: 'division',
    slug: { current: 'mining' },
    name: 'Vision Mining',
    description: { en: 'Opportunities in the mining sector.' },
    status: 'comingSoon',
    order: 5,
  },
];
