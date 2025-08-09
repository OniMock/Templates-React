import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations as ptBrTranslations, languageConfig as ptBrConfig } from '../locales/ptBr';
import { translations as enTranslations, languageConfig as enConfig } from '../locales/en';
import { translations as esTranslations, languageConfig as esConfig } from '../locales/es';
import { translations as frTranslations, languageConfig as frConfig } from '../locales/fr';
import { translations as deTranslations, languageConfig as deConfig } from '../locales/de';

interface LanguageFile {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  translations: any;
}

interface LanguageContextType {
  currentLanguage: string;
  availableLanguages: LanguageFile[];
  setLanguage: (language: string) => void;
  t: (key: string, variables?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const languageFiles: Record<string, LanguageFile> = {
  'pt-br': {
    ...ptBrConfig,
    translations: ptBrTranslations
  },
  'en': {
    ...enConfig,
    translations: enTranslations
  },
  'es': {
    ...esConfig,
    translations: esTranslations
  },
  'fr': {
    ...frConfig,
    translations: frTranslations
  },
  'de': {
    ...deConfig,
    translations: deTranslations
  }
};

const getAvailableLanguages = (): LanguageFile[] => {
  return Object.values(languageFiles);
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');

  useEffect(() => {
    // Recupera idioma do cookie ou usa o idioma do navegador
    const savedLanguage = document.cookie
      .split('; ')
      .find(row => row.startsWith('language='))
      ?.split('=')[1];

    if (savedLanguage && languageFiles[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Detecta idioma do navegador
      const browserLanguage = navigator.language.toLowerCase();
      if (browserLanguage.startsWith('pt')) {
        setCurrentLanguage('pt-br');
      } else if (browserLanguage.startsWith('es')) {
        setCurrentLanguage('es');
      } else if (browserLanguage.startsWith('fr')) {
        setCurrentLanguage('fr');
      } else if (browserLanguage.startsWith('de')) {
        setCurrentLanguage('de');
      } else {
        setCurrentLanguage('en');
      }
    }
  }, []);

  const setLanguage = (language: string) => {
    if (languageFiles[language]) {
      setCurrentLanguage(language);
      // Salva no cookie
      document.cookie = `language=${language}; path=/; max-age=31536000`; // 1 ano
    }
  };

  const getNestedValue = (obj: any, path: string): string => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : null;
    }, obj);
  };

  const t = (key: string, variables?: Record<string, string>): string => {
    const currentTranslations = languageFiles[currentLanguage]?.translations;
    const fallbackTranslations = languageFiles['en']?.translations;
    
    let translation = getNestedValue(currentTranslations, key);
    
    // Se não encontrar na linguagem atual, tenta no fallback
    if (!translation) {
      translation = getNestedValue(fallbackTranslations, key);
    }
    
    // Se ainda não encontrar, retorna a chave
    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }

    // Substitui variáveis se fornecidas
    if (variables) {
      Object.keys(variables).forEach(variable => {
        translation = translation.replace(`{{${variable}}}`, variables[variable]);
      });
    }

    return translation;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        availableLanguages: getAvailableLanguages(),
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};