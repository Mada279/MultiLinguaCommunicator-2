import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { getTranslation, type Language } from '@/lib/i18n';

interface I18nContextType {
  language: Language;
  dir: 'ltr' | 'rtl';
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const defaultContext: I18nContextType = {
  language: 'en',
  dir: 'ltr',
  setLanguage: () => {},
  t: (key) => key,
};

const I18nContext = createContext<I18nContextType>(defaultContext);

export const useI18n = () => useContext(I18nContext);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    // Set language based on stored preference or browser language
    const storedLanguage = localStorage.getItem('language') as Language | null;
    
    if (storedLanguage && ['en', 'ar', 'hi'].includes(storedLanguage)) {
      setLanguage(storedLanguage);
    } else {
      // Try to get browser language
      const browserLang = navigator.language.substring(0, 2);
      if (browserLang === 'ar') {
        setLanguage('ar');
      } else if (browserLang === 'hi') {
        setLanguage('hi');
      } else {
        setLanguage('en');
      }
    }
  }, []);

  useEffect(() => {
    // Update document direction when language changes
    setDir(language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
    
    // Store language preference
    localStorage.setItem('language', language);
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const t = (key: string, params?: Record<string, string | number>) => {
    return getTranslation(key, language, params);
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        dir,
        setLanguage: handleSetLanguage,
        t,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};
