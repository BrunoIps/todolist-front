import { FallbackLng } from './../../node_modules/i18next/typescript/options.d';
import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptbr from './ptbr.json';

const resources: Resource = {
  ptbr: {
    translation: ptbr,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ptbr',
  fallbackLng: 'ptbr',
  interpolation: {
    escapeValue: false,
  },
  keySeparator: '.',
  compatibilityJSON: 'v3',
});

export default { i18n };
