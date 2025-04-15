import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en', 'es', 'ar'], // Ajoute les langues supportées
    backend: {
      loadPath: '/src/lang/{{lng}}.json',
    },
    detection: {
      order: ['querystring', 'navigator', 'htmlTag'],
      caches: [],
    },
    interpolation: {
      escapeValue: false,
    },
    debug: true,
  });

i18n.on('loaded', (loaded) => {
  console.log('i18next resources loaded:', loaded);
});

i18n.on('failedLoading', (lng, ns, msg) => {
  console.error('i18next failed loading:', lng, ns, msg);
});

export default i18n;