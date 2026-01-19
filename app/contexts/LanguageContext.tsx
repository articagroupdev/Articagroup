'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isReady, setIsReady] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Cargar traducciones
  useEffect(() => {
    // Solo marcar como no listo en la carga inicial
    if (isInitialLoad) {
      setIsReady(false);
    }
    
    import(`../translations/${language}.json`)
      .then((mod) => {
        setTranslations(mod.default);
        setIsReady(true);
        if (isInitialLoad) {
          setIsInitialLoad(false);
        }
      })
      .catch((err) => {
        console.error('Error loading translations:', err);
        setIsReady(true); // Marcar como listo incluso si hay error para evitar bloqueo infinito
        if (isInitialLoad) {
          setIsInitialLoad(false);
        }
      });
  }, [language]);

  // Función para obtener traducciones
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Retornar la clave si no se encuentra la traducción
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  // Guardar preferencia en localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  // Cargar idioma guardado o detectar idioma del navegador al iniciar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Primero verificar si hay un idioma guardado en localStorage
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
        setLanguageState(savedLanguage);
        return;
      }

      // Si no hay idioma guardado, detectar el idioma del navegador
      const browserLanguage = navigator.language || navigator.languages?.[0] || 'es';
      
      // Convertir el código de idioma del navegador a nuestro formato
      // Ejemplos: 'en-US' -> 'en', 'es-ES' -> 'es', 'en' -> 'en'
      const languageCode = browserLanguage.toLowerCase().split('-')[0];
      
      // Establecer el idioma si es soportado, sino usar español por defecto
      const detectedLanguage: Language = (languageCode === 'en' || languageCode === 'es') 
        ? languageCode 
        : 'es';
      
      setLanguageState(detectedLanguage);
      // Guardar la detección automática en localStorage
      localStorage.setItem('language', detectedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isReady }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
