import type { HomePage } from '../types';

export const homePage: HomePage = {
  _id: 'homePage',
  _type: 'homePage',
  hero: {
    eyebrow: { en: 'International trading and investment' },
    heading: { en: 'From Korea to Tanzania.' },
    subheading: {
      en: 'Trucks, vehicles and quality goods, sourced in Korea and beyond and available in Tanzania.',
    },
    // Pixabay placeholder until a real photo of the Vision World yard is available.
    image: {
      src: '/src/assets/images/yard/truck-depot-2.webp',
      alt: { en: 'Trucks parked in rows at a depot, seen from above' },
    },
    secondaryCta: { label: { en: 'View stock' }, href: 'stock' },
    sourcingLabel: { en: 'Now sourcing' },
    from: { label: { en: 'Korea' }, lat: 37.5, lon: 127 },
    to: { label: { en: 'Tanzania' }, lat: -6.4, lon: 35 },
  },
  trade: {
    eyebrow: { en: 'What we trade' },
    heading: { en: 'From tractor heads to kitchenware' },
    intro: { en: 'We source a wide range of goods, mainly from South Korea. If you do not see what you need, ask us.' },
    link: { label: { en: 'See everything we trade' }, href: 'what-we-trade' },
  },
  stock: {
    eyebrow: { en: 'Stock' },
    heading: { en: 'Available and incoming' },
    intro: { en: 'A selection from our current stock. Ask on WhatsApp for prices and details.' },
    link: { label: { en: 'View all stock' }, href: 'stock' },
  },
  howWeWork: {
    eyebrow: { en: 'How we work' },
    heading: { en: 'From Korea to your hands in Tanzania' },
    intro: { en: 'A clear process, with updates at every step.' },
    link: { label: { en: 'How we work in detail' }, href: 'how-we-work' },
  },
  about: {
    eyebrow: { en: 'About us' },
    heading: { en: 'The bridge between Tanzania and Korea' },
    text: {
      en: 'Vision World is led by Joseph Makina. [CEO STORY IN ONE OR TWO SENTENCES].',
    },
    quote: { en: '[CEO QUOTE]' },
    image: { src: '', alt: { en: 'Portrait of Joseph Makina' } },
    link: { label: { en: 'Read our story' }, href: 'about' },
  },
  group: {
    eyebrow: { en: 'Vision Group' },
    heading: { en: 'More from Vision, coming soon' },
    intro: { en: 'We are building new divisions to serve Tanzania and the wider region.' },
    link: { label: { en: 'Learn about Vision Group' }, href: 'vision-group' },
  },
};
