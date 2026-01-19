'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function PageTransition() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Detectar cambios de ruta
  useEffect(() => {
    setIsLoading(false);
    setIsExiting(false);
  }, [pathname, searchParams]);

  // Interceptar clics en enlaces
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        
        if (href && href.startsWith('/') && !href.startsWith('//') && href !== pathname) {
          setIsLoading(true);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  // Animación de salida
  useEffect(() => {
    if (!isLoading) {
      setIsExiting(true);
      const timer = setTimeout(() => setIsExiting(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isLoading && !isExiting) return null;

  return (
    <div 
      className={`fixed inset-0 z-[99999] flex items-center justify-center transition-opacity duration-300 ${
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
