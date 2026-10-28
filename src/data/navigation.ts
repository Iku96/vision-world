import type { Navigation } from './types';

const home = { label: { en: 'Home' }, href: '' };
const about = { label: { en: 'About' }, href: 'about' };
const whatWeTrade = { label: { en: 'What We Trade' }, href: 'what-we-trade' };
const stock = { label: { en: 'Stock' }, href: 'stock' };
const howWeWork = { label: { en: 'How We Work' }, href: 'how-we-work' };
const visionGroup = { label: { en: 'Vision Group' }, href: 'vision-group' };
const contact = { label: { en: 'Contact' }, href: 'contact' };

export const navigation: Navigation = {
  _id: 'navigation',
  _type: 'navigation',
  main: [home, about, whatWeTrade, stock, howWeWork, visionGroup, contact],
  footer: [about, whatWeTrade, stock, howWeWork, visionGroup, contact],
};
