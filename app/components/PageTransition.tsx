'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function PageTransition() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const loadStartTime = useRef<number>(0);
  const minLoadingTime = 1200; // Tiempo mínimo de carga en ms

  // Detectar cambios de ruta - esperar tiempo mínimo antes de ocultar
  useEffect(() => {
    if (isLoading) {
      const elapsed = Date.now() - loadStartTime.current;
      const remaining = Math.max(0, minLoadingTime - elapsed);
      
      // Esperar al menos el tiempo mínimo antes de ocultar
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, remaining);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams, isLoading]);

  // Interceptar clics en enlaces
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        
        if (href && href.startsWith('/') && !href.startsWith('//') && href !== pathname) {
          loadStartTime.current = Date.now();
          setIsLoading(true);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  // Animación de salida
  useEffect(() => {
    if (!isLoading && loadStartTime.current > 0) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setIsExiting(false);
        loadStartTime.current = 0;
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isLoading && !isExiting) return null;

  return (
    <div 
      className={`fixed inset-0 z-[99999] flex items-center justify-center transition-all duration-500 ease-out ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundColor: '#ffffff',
        pointerEvents: isLoading ? 'auto' : 'none',
      }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <img 
          src="/img/logo-mini-azul.png" 
          alt="ARTICA" 
          className="h-12 w-auto"
        />
        
        {/* Spinner simple */}
        <div className="spinner" />
      </div>

      <style jsx>{`
        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #e5e7eb;
          border-top-color: #13B9D5;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
