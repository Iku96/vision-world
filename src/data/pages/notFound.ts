import type { NotFoundPage } from '../types';

export const notFoundPage: NotFoundPage = {
  _id: 'notFoundPage',
  _type: 'notFoundPage',
  seo: {
    title: { en: 'Page not found' },
    description: { en: 'The page you are looking for does not exist or has moved.' },
  },
  header: {
    eyebrow: { en: 'Error 404' },
    heading: { en: 'This page took a different route' },
    intro: { en: 'The page you are looking for does not exist or has moved. These links will get you back on track.' },
  },
  links: [
    { label: { en: 'Home' }, href: '' },
    { label: { en: 'What we trade' }, href: 'what-we-trade' },
    { label: { en: 'Stock' }, href: 'stock' },
    { label: { en: 'Contact us' }, href: 'contact' },
  ],
};
