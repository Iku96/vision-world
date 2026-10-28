import type { AboutPage } from '../types';

export const aboutPage: AboutPage = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  seo: {
    title: { en: 'About us' },
    description: {
      en: 'Vision World is an international trading and investment company in Tanzania, building a bridge between Tanzania and Korea.',
    },
  },
  header: {
    eyebrow: { en: 'About us' },
    heading: { en: 'The bridge between Tanzania and Korea' },
    intro: { en: 'Vision World is an international trading and investment company based in Tanzania.' },
  },
  story: {
    heading: { en: 'Our story' },
    paragraphs: [
      {
        en: 'Vision World started with a simple idea: the world is full of ideas and opportunities, and Tanzania should have access to the best of them.',
      },
      {
        en: 'We source trucks, vehicles and quality goods, mainly from South Korea and from other markets where it makes sense. By connecting the two countries, we help businesses and families in Tanzania get what they need, with clear information at every step.',
      },
      { en: '[COMPANY HISTORY: when and why Vision World started, and key milestones]' },
    ],
  },
  mission: {
    title: { en: 'Our mission' },
    text: { en: 'To take ideas and opportunities from around the world and turn them into something useful for Tanzania.' },
  },
  vision: {
    title: { en: 'Our vision' },
    text: {
      en: "To use our international exposure to support Tanzania's development in infrastructure and technology, and to turn good ideas into reality.",
    },
  },
  ceo: {
    eyebrow: { en: 'Leadership' },
    heading: { en: 'Meet our CEO' },
    story: { en: '[CEO STORY: background, experience in Korea and Tanzania, and the reason for leading Vision World]' },
    quote: { en: '[CEO QUOTE]' },
    image: { src: '', alt: { en: 'Portrait of Joseph Makina' } },
  },
  values: {
    heading: { en: 'What we stand for' },
    intro: { en: 'The principles behind every order we handle.' },
    items: [
      { title: { en: 'Honest dealing' }, text: { en: 'Clear information, realistic expectations and no surprises.' } },
      { title: { en: 'Quality first' }, text: { en: 'We look for goods that are worth buying and built to last.' } },
      {
        title: { en: 'Long-term relationships' },
        text: { en: 'We want customers to come back, so we treat every order that way.' },
      },
      { title: { en: 'Built for Tanzania' }, text: { en: 'Everything we do starts with what is useful for Tanzania.' } },
    ],
  },
};
