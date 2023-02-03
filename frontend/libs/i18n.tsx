import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTraslation from '../locales/translation.json';

const resources = {
  en: {
    translation: enTraslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  load: 'languageOnly',
  fallbackLng: false,
  lng: 'en',
});

export default i18n;
