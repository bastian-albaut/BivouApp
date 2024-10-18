import { Platform, NativeModules } from 'react-native'
import i18n, { ModuleType } from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './en.json';
import frCommon from './fr.json';
import enSearchBivouacs from '../../app/searchBivouacs/locales/en.json';
import frSearchBivouacs from '../../app/searchBivouacs/locales/fr.json';
import enReservationBivouacs from '../../app/reservationBivouacs/locales/en.json';
import frReservationBivouacs from '../../app/reservationBivouacs/locales/fr.json';
import enUsers from '../../app/users/locales/en.json';
import frUsers from '../../app/users/locales/fr.json';
import enAddBivouac from '../../app/addBivouac/locales/en.json';
import frAddBivouac from '../../app/addBivouac/locales/fr.json';
import frFavorites from '../../app/favorites/locales/fr.json';
import enFavorites from '../../app/favorites/locales/en.json';
import frMybivouacs from '../../app/myBivouacs/locales/fr.json';
import enMybivouacs from '../../app/myBivouacs/locales/en.json';

const deviceLanguage : String =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

// Language detection logic based on device locale
const languageDetector = {
  init: Function.prototype,
  type: 'languageDetector' as const,
  async: true,
  detect: (callback: (lang: string) => void) => {
    const locales = deviceLanguage.split('-');
    
    // Check locales is not fr or en
    if (locales[0] !== 'fr' && locales[0] !== 'en') {
      locales[0] = 'en'; // Default to 'en' if no locale or unsupported locale
    }

    callback(locales[0]);
  },
  cacheUserLanguage: Function.prototype,
};

// Initialize i18n
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: {
      en: {
        common: enCommon,
        searchBivouacs: enSearchBivouacs,
        reservationBivouacs: enReservationBivouacs,
        users: enUsers,
        addBivouac: enAddBivouac,
        favorites: enFavorites,
        myBivouacs: frMybivouacs,
      },
      fr: {
        common: frCommon,
        searchBivouacs: frSearchBivouacs,
        reservationBivouacs: frReservationBivouacs,
        users: frUsers,
        addBivouac: frAddBivouac,
        favorites: frFavorites,
        myBivouacs: frMybivouacs,
      },
    },
    ns: ['searchBivouacs', 'users'], // Define namespaces
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false, 
    },
  });

export default i18n;
