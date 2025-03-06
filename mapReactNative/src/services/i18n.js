import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';


import en from './locales/en.json';
import pt from './locales/pt.json';
import it from './locales/it.json'; 
import es from './locales/es.json'; 
import de from './locales/de.json'; 
import fr from './locales/fr.json';


i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      it: { translation: it },  
      es: { translation: es },  
      de: { translation: de },  
      fr: { translation: fr }, 
    },
    lng: 'en', 
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false, 
    },
    
    react: {
      useSuspense: false, 
    },
  });


export const changeLanguage = async (lng) => {
  await i18n.changeLanguage(lng);
  await AsyncStorage.setItem('language', lng); 
};

export default i18n;
