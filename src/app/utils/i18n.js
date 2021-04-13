import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import resources from '../locales';

// prettier-ignore
export default (instance) => {
  instance
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      resources,
      debug: process.env.NODE_ENV !== 'production',
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
    });
};
