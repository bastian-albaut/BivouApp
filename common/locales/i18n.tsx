import { Platform, NativeModules } from 'react-native'
import i18n, { ModuleType } from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './en.json';
import frCommon from './fr.json';
import enSearchBivouacs from '../../features/searchBivouacs/locales/en.json';
import frSearchBivouacs from '../../features/searchBivouacs/locales/fr.json';
import enUsers from '../../features/users/locales/en.json';
import frUsers from '../../features/users/locales/fr.json';

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
    fallbackLng: 'en',
    resources: {
      en: {
        common: enCommon,
        searchBivouacs: enSearchBivouacs,
        users: enUsers,
      },
      fr: {
        common: frCommon,
        searchBivouacs: frSearchBivouacs,
        users: frUsers,
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
