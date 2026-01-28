'use client';

import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';

interface InfiniteImageLoopProps {
  images: string[];
}

export default function InfiniteImageLoop({ images }: InfiniteImageLoopProps) {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  // Memoizar la división de imágenes para evitar recálculos
  const { topImages, bottomImages, topImagesDuplicated, bottomImagesDuplicated } = useMemo(() => {
    const top = images.slice(0, Math.ceil(images.length / 2));
    const bottom = images.slice(Math.ceil(images.length / 2));
    // Solo duplicar una vez para el bucle infinito
    return {
      topImages: top,
      bottomImages: bottom,
      topImagesDuplicated: [...top, ...top],
      bottomImagesDuplicated: [...bottom, ...bottom],
    };
  }, [images]);

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

      // Optimizar con aceleración de hardware
      gsap.set([topRow, bottomRow], {
        force3D: true,
        backfaceVisibility: 'hidden',
        willChange: 'transform',
      });

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

      // Animación optimizada para la fila superior (hacia la derecha - x negativo)
      topAnimation = gsap.to(topRow, {
        x: -topRowWidth,
        duration: 30,
        ease: 'none',
        repeat: -1,
        force3D: true,
        immediateRender: false,
      });

      // Animación optimizada para la fila inferior (hacia la izquierda)
      gsap.set(bottomRow, { 
        x: -bottomRowWidth,
        force3D: true,
      });
      bottomAnimation = gsap.to(bottomRow, {
        x: 0,
        duration: 30,
        ease: 'none',
        repeat: -1,
        force3D: true,
        immediateRender: false,
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
        // Iniciar animación cuando al menos el 50% de las imágenes estén cargadas
        // Esto mejora el tiempo de inicio percibido
        if ((loadedCount >= Math.ceil(totalImages * 0.5) || loadedCount === totalImages) && !hasStarted) {
          hasStarted = true;
          // Usar un solo requestAnimationFrame para mejor rendimiento
          requestAnimationFrame(() => {
            initAnimations();
          });
        }
      };

      // Verificar todas las imágenes
      allImages.forEach((img) => {
        const imageElement = img as HTMLImageElement;
        // Verificar si la imagen ya está cargada
        if (imageElement.complete && imageElement.naturalHeight > 0) {
          checkLoaded();
        } else {
          // Agregar listeners para cuando se carguen
          imageElement.addEventListener('load', checkLoaded, { once: true });
          imageElement.addEventListener('error', checkLoaded, { once: true });
        }
      });

      // Fallback: si después de 1 segundo no se han cargado suficientes, inicializar de todos modos
      setTimeout(() => {
        if (!hasStarted) {
          hasStarted = true;
          requestAnimationFrame(() => {
            initAnimations();
          });
        }
      }, 1000);
    };

    // Inicializar después de que el componente esté montado
    // Optimizado para iniciar más rápido
    const initialize = () => {
      if (document.readyState === 'complete') {
        // Usar un solo requestAnimationFrame para mejor rendimiento
        requestAnimationFrame(() => {
          checkImagesLoaded();
        });
      } else {
        window.addEventListener('load', () => {
          requestAnimationFrame(() => {
            checkImagesLoaded();
          });
        }, { once: true });
        // También intentar después de un delay más corto
        setTimeout(() => {
          if (document.readyState === 'complete') {
            requestAnimationFrame(() => {
              checkImagesLoaded();
            });
          }
        }, 300);
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
          style={{ 
            width: 'fit-content',
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
          }}
        >
          {topImagesDuplicated.map((image, index) => (
            <div
              key={`top-${index}`}
              className="relative flex-shrink-0 w-64 md:w-80 lg:w-96 h-48 md:h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg"
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
              }}
            >
              <img
                src={image}
                alt={`Gallery image ${(index % topImages.length) + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden',
                }}
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
          style={{ 
            width: 'fit-content',
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
          }}
        >
          {bottomImagesDuplicated.map((image, index) => (
            <div
              key={`bottom-${index}`}
              className="relative flex-shrink-0 w-64 md:w-80 lg:w-96 h-48 md:h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg"
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
              }}
            >
              <img
                src={image}
                alt={`Gallery image ${topImages.length + (index % bottomImages.length) + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
