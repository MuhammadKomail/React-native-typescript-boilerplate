// Note: Language translation file...!

// Importing required API's...!
import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';
import arTranslation from './locales/ar.json';
import urTranslation from './locales/ur.json';
import beTranslation from './locales/be.json';
import hiTranslation from './locales/hi.json';
import enTranslation from './locales/en.json';

const resources = {
  en: {translation: enTranslation},
  ar: {translation: arTranslation},
  ur: {translation: urTranslation},
  hi: {translation: hiTranslation},
  bn: {translation: beTranslation},
};

// Determine the language direction
const currentLng = I18nManager.isRTL ? 'ar' : 'en'; // Default to 'ar' if RTL
const isRTL = ['ar', 'ur'].includes(currentLng); // Check if the current language is RTL

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'en',
    resources,
    lng: currentLng,

    keySeparator: false, //we dont use keys in form messages.welcome

    interpolation: {
      escapeValue: false, //react already saves from xss
    },

    compatibilityJSON: 'v4',
  });

// Set the text direction based on the language
if (isRTL) {
  I18nManager.forceRTL(true);
} else {
  I18nManager.forceRTL(false);
}

export default i18next;
