import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import en_GB from './locales/en_GB.json';
import ua_UA from './locales/ua_UA.json';
import be_TA from './locales/be_TA.json';

const resources = {
  en: en_GB,
  ua: ua_UA,
  be: be_TA,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',

    keySeparator: '.',
    nsSeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
