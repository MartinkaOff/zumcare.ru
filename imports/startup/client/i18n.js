import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from '../../../public/locales/en/translationEN.json';
import translationKZ from '../../../public/locales/kz/translationKZ.json';
import translationRU from '../../../public/locales/ru/translationRU.json';

const i18nOptions = {
  fallbackLng: 'ru',
  // debug: true,
  supportedLngs: ['ru', 'kz', 'en'],

  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: translationEN,
    },
    kz: {
      translation: translationKZ,
    },
    ru: {
      translation: translationRU,
    },
  },
};

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init(i18nOptions);

export default i18n;
