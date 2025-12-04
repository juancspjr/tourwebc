import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import esTranslations from './translations/es.json';
import enTranslations from './translations/en.json';
import ptTranslations from './translations/pt.json';
import frTranslations from './translations/fr.json';
import itTranslations from './translations/it.json';

const resources = {
  es: { translation: esTranslations },
  en: { translation: enTranslations },
  pt: { translation: ptTranslations },
  fr: { translation: frTranslations },
  it: { translation: itTranslations },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    supportedLngs: ['es', 'en', 'pt', 'fr', 'it'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;
export const supportedLanguages = [
  { code: 'es', name: 'Español', flag: 'ES' },
  { code: 'en', name: 'English', flag: 'US' },
  { code: 'pt', name: 'Português', flag: 'BR' },
  { code: 'fr', name: 'Français', flag: 'FR' },
  { code: 'it', name: 'Italiano', flag: 'IT' },
];
