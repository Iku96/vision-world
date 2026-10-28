import type { HowWeWorkPage } from '../types';

export const howWeWorkPage: HowWeWorkPage = {
  _id: 'howWeWorkPage',
  _type: 'howWeWorkPage',
  seo: {
    title: { en: 'How we work' },
    description: {
      en: 'How buying through Vision World works, from sourcing in Korea to handover in Tanzania, plus answers to common questions.',
    },
  },
  header: {
    eyebrow: { en: 'How we work' },
    heading: { en: 'From Korea to your hands in Tanzania' },
    intro: { en: 'A clear process in four steps, with updates along the way.' },
  },
  faq: {
    heading: { en: 'Questions buyers ask' },
    intro: { en: 'If your question is not here, ask us on WhatsApp.' },
    items: [
      {
        question: { en: 'How do I pay?' },
        answer: {
          en: 'Payment terms are agreed for each order before anything is sourced. [CONFIRM: accepted payment methods, deposit and balance terms]',
        },
      },
      {
        question: { en: 'Can I inspect before handover?' },
        answer: {
          en: 'Inspection before handover is part of how we work, so you can check the vehicle or goods against what was agreed. [CONFIRM: where inspection happens and how it fits with payment]',
        },
      },
      {
        question: { en: 'How long does it take?' },
        answer: {
          en: 'It depends on what you need, where it is sourced and shipping schedules. We give you an estimate when we share options. [CONFIRM: typical timelines for vehicles and for goods]',
        },
      },
      {
        question: { en: 'What documents will I receive?' },
        answer: {
          en: 'We tell you which documents come with your purchase before you commit. [CONFIRM: documents provided, for example invoice, export papers, import and registration documents]',
        },
      },
      {
        question: { en: 'Is everything on the Stock page available?' },
        answer: {
          en: 'Listings marked Available are ready now, Incoming are on the way, and Sold show the kind of items we source. Ask on WhatsApp to confirm before you visit.',
        },
      },
      {
        question: { en: 'Can you find something that is not listed?' },
        answer: {
          en: 'Yes. Tell us what you need, with as much detail as you can, and we will look for it in Korea and beyond.',
        },
      },
      {
        question: { en: 'Do you work with businesses and individuals?' },
        answer: { en: '[CONFIRM: whether you sell to individuals, businesses or both, and any minimum order sizes]' },
      },
      {
        question: { en: 'Where are you based?' },
        answer: {
          en: 'Our office is on the 4th floor of Noble Center, Makumbusho, Dar es Salaam. See the Contact page for the map.',
        },
      },
    ],
  },
};
