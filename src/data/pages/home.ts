import type { HomePage } from '../types';

export const homePage: HomePage = {
  _id: 'homePage',
  _type: 'homePage',
  hero: {
    routeFrom: { en: 'South Korea' },
    routeTo: { en: 'Tanzania' },
    heading: { en: 'Trucks, vehicles and goods from Korea and beyond, available in Tanzania.' },
    text: {
      en: 'Vision World takes ideas and opportunities from around the world and turns them into something useful for Tanzania.',
    },
    // Pixabay placeholder until a real Vision World photo is available.
    image: { src: '/src/assets/images/trucks/scania-truck-2.webp', alt: { en: 'Tractor head parked at sunrise' } },
    secondaryCta: { label: { en: 'View stock' }, href: 'stock' },
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
      en: 'Vision World is led by [CEO NAME]. [CEO STORY IN ONE OR TWO SENTENCES].',
    },
    quote: { en: '[CEO QUOTE]' },
    quoteName: '[CEO NAME]',
    quoteRole: { en: 'CEO' },
    image: { src: '', alt: { en: 'Portrait of [CEO NAME]' } },
    link: { label: { en: 'Read our story' }, href: 'about' },
  },
  group: {
    eyebrow: { en: 'Vision Group' },
    heading: { en: 'More from Vision, coming soon' },
    intro: { en: 'We are building new divisions to serve Tanzania and the wider region.' },
    link: { label: { en: 'Learn about Vision Group' }, href: 'vision-group' },
  },
  cta: {
    heading: { en: 'Tell us what you need' },
    text: { en: 'Send us a message on WhatsApp or request a quote. We will get back to you with options.' },
    quoteLink: { label: { en: 'Request a quote' }, href: 'contact' },
  },
};
