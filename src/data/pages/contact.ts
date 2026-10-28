import type { ContactPage } from '../types';

export const contactPage: ContactPage = {
  _id: 'contactPage',
  _type: 'contactPage',
  seo: {
    title: { en: 'Contact and request a quote' },
    description: {
      en: 'Request a quote from Vision World. Chat on WhatsApp or send us the details of what you need. Noble Centre, Makumbusho, Dar es Salaam.',
    },
  },
  header: {
    eyebrow: { en: 'Contact' },
    heading: { en: 'Request a quote' },
    intro: { en: 'Tell us what you need. The fastest way to reach us is WhatsApp.' },
  },
  whatsapp: {
    title: { en: 'Chat with us on WhatsApp' },
    text: { en: 'Send a message with what you are looking for and we will reply with options.' },
  },
  detailsHeading: { en: 'Contact details' },
  mapTitle: { en: 'Map showing Noble Centre, Makumbusho, Dar es Salaam' },
  form: {
    heading: { en: 'Send us your request' },
    intro: { en: 'Prefer email? Fill in the form and we will get back to you.' },
    name: { en: 'Your name' },
    phone: { en: 'Phone number' },
    email: { en: 'Email' },
    need: { en: 'What do you need?' },
    needHint: { en: 'For example: Scania tractor head, 2 refrigerators, brake discs' },
    category: { en: 'Category' },
    categoryPlaceholder: { en: 'Choose a category' },
    categoryOther: { en: 'Something else' },
    message: { en: 'Message' },
    required: { en: 'required' },
    optional: { en: 'optional' },
    submit: { en: 'Send request' },
    demoMessage: {
      en: 'This is a preview site, so the form is not connected yet and your request was not sent. Please contact us on WhatsApp instead.',
    },
  },
};
