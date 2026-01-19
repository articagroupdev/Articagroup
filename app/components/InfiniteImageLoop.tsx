'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

interface InfiniteImageLoopProps {
  images: string[];
}

export default function InfiniteImageLoop({ images }: InfiniteImageLoopProps) {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  // Dividir las imágenes en dos filas
  const topImages = images.slice(0, Math.ceil(images.length / 2));
  const bottomImages = images.slice(Math.ceil(images.length / 2));

  // Duplicar las imágenes para el bucle infinito
  const topImagesDuplicated = [...topImages, ...topImages];
  const bottomImagesDuplicated = [...bottomImages, ...bottomImages];

  useEffect(() => {
    if (!topRowRef.current || !bottomRowRef.current) return;

    const topRow = topRowRef.current;
    const bottomRow = bottomRowRef.current;

    let topAnimation: gsap.core.Tween | null = null;
    let bottomAnimation: gsap.core.Tween | null = null;
    let retryCount = 0;
    const maxRetries = 5;

    // Esperar a que las imágenes se carguen para obtener el ancho correcto
    const initAnimations = () => {
      // Limpiar animaciones anteriores si existen
      if (topAnimation) topAnimation.kill();
      if (bottomAnimation) bottomAnimation.kill();

      // Forzar un reflow para calcular correctamente el ancho
      void topRow.offsetWidth;
      void bottomRow.offsetWidth;

      // Obtener el ancho de una copia completa (mitad del scrollWidth total)
      let topRowWidth = topRow.scrollWidth / 2;
      let bottomRowWidth = bottomRow.scrollWidth / 2;

      // Verificar que los anchos sean válidos
      if (topRowWidth <= 0 || bottomRowWidth <= 0) {
        retryCount++;
        if (retryCount < maxRetries) {
          setTimeout(initAnimations, 300);
          return;
        }
        // Si alcanzamos el máximo de reintentos, usar valores por defecto
        topRowWidth = topRowWidth || 1500;
        bottomRowWidth = bottomRowWidth || 1500;
      }

      // Animación para la fila superior (hacia la derecha - x negativo)
      topAnimation = gsap.to(topRow, {
        x: -topRowWidth,
        duration: 30,
        ease: 'none',
        repeat: -1,
      });

      // Animación para la fila inferior (hacia la izquierda)
      gsap.set(bottomRow, { x: -bottomRowWidth });
      bottomAnimation = gsap.to(bottomRow, {
        x: 0,
        duration: 30,
        ease: 'none',
        repeat: -1,
      });
    };

    // Función para verificar si las imágenes están cargadas
    const checkImagesLoaded = () => {
      const allImages = [
        ...topRow.querySelectorAll('img'),
        ...bottomRow.querySelectorAll('img'),
      ];

      if (allImages.length === 0) {
        // Si no hay imágenes, intentar de nuevo después de un delay
        setTimeout(checkImagesLoaded, 200);
        return;
      }

      let loadedCount = 0;
      const totalImages = allImages.length;
      let hasStarted = false;
      
      const checkLoaded = () => {
        loadedCount++;
        if (loadedCount === totalImages && !hasStarted) {
          hasStarted = true;
          // Usar múltiples requestAnimationFrame para asegurar que el layout esté calculado
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              // Forzar un reflow adicional
              void topRow.offsetWidth;
              void bottomRow.offsetWidth;
              initAnimations();
            });
          });
        }
      };

      // Verificar todas las imágenes
      allImages.forEach((img) => {
        const imageElement = img as HTMLImageElement;
        // Para Next.js Image, verificar tanto complete como naturalHeight
        if (imageElement.complete && imageElement.naturalHeight > 0) {
          checkLoaded();
        } else {
          // Agregar listeners para cuando se carguen
          imageElement.addEventListener('load', checkLoaded, { once: true });
          imageElement.addEventListener('error', checkLoaded, { once: true });
        }
      });

      // Fallback: si después de 2 segundos no se han cargado todas, inicializar de todos modos
      setTimeout(() => {
        if (!hasStarted && loadedCount < totalImages) {
          hasStarted = true;
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              void topRow.offsetWidth;
              void bottomRow.offsetWidth;
              initAnimations();
            });
          });
        }
      }, 2000);
    };

    // Inicializar después de que el componente esté montado
    // Esperar a que el DOM esté completamente listo
    const initialize = () => {
      if (document.readyState === 'complete') {
        // Esperar un frame adicional para que Next.js Image termine de renderizar
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            checkImagesLoaded();
          });
        });
      } else {
        window.addEventListener('load', () => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              checkImagesLoaded();
            });
          });
        }, { once: true });
        // También intentar después de un delay por si acaso
        setTimeout(() => {
          if (document.readyState === 'complete') {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        checkImagesLoaded();
      });
    });
          }
        }, 500);
      }
    };

    initialize();

    return () => {
      if (topAnimation) topAnimation.kill();
      if (bottomAnimation) bottomAnimation.kill();
      gsap.killTweensOf([topRow, bottomRow]);
    };
  }, [images]);

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden bg-white">
      {/* Contenedor para la fila superior */}
      <div className="relative mb-4 md:mb-6 overflow-hidden">
        {/* Fila superior - se mueve hacia la derecha */}
        <div 
          ref={topRowRef}
          className="flex gap-4 md:gap-6"
          style={{ width: 'fit-content' }}
        >
          {topImagesDuplicated.map((image, index) => (
            <div
              key={`top-${index}`}
              className="relative flex-shrink-0 w-64 md:w-80 lg:w-96 h-48 md:h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={image}
                alt={`Gallery image ${(index % topImages.length) + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Contenedor para la fila inferior */}
      <div className="relative overflow-hidden">
        {/* Fila inferior - se mueve hacia la izquierda */}
        <div 
          ref={bottomRowRef}
          className="flex gap-4 md:gap-6"
          style={{ width: 'fit-content' }}
        >
          {bottomImagesDuplicated.map((image, index) => (
            <div
              key={`bottom-${index}`}
              className="relative flex-shrink-0 w-64 md:w-80 lg:w-96 h-48 md:h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={image}
                alt={`Gallery image ${topImages.length + (index % bottomImages.length) + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
