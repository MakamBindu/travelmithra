import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('travelmithra_lang') || 'English';
  });

  useEffect(() => {
    localStorage.setItem('travelmithra_lang', language);
  }, [language]);

  const t = (key) => {
    if (!translations[language]) return translations['English'][key] || key;
    return translations[language][key] || translations['English'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
