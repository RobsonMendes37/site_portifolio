import { useContext, createContext, useState, useEffect } from 'react';

// Context para gerenciar idioma
export const LanguageContext = createContext();

// Provider do idioma
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('pt');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'pt';
    setLanguage(savedLanguage);
    setIsLoading(false);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'pt' ? 'en' : 'pt';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook para usar o idioma
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default useLanguage;
