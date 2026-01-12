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

    // Esperar a que las imágenes se carguen para obtener el ancho correcto
    const initAnimations = () => {
      // Obtener el ancho de una copia completa (mitad del scrollWidth total)
      const topRowWidth = topRow.scrollWidth / 2;
      const bottomRowWidth = bottomRow.scrollWidth / 2;

      // Animación para la fila superior (hacia la derecha - x negativo)
      const topAnimation = gsap.to(topRow, {
        x: -topRowWidth,
        duration: 30,
        ease: 'none',
        repeat: -1,
      });

      // Animación para la fila inferior (hacia la izquierda)
      // Para que visualmente se mueva hacia la izquierda, empezamos desde una posición negativa
      // y animamos hasta 0. Cuando se reinicia, vuelve a la posición negativa
      // pero la segunda copia de imágenes está en la posición correcta para el bucle infinito
      gsap.set(bottomRow, { x: -bottomRowWidth });
      const bottomAnimation = gsap.to(bottomRow, {
        x: 0,
        duration: 30,
        ease: 'none',
        repeat: -1,
      });

      return () => {
        topAnimation.kill();
        bottomAnimation.kill();
      };
    };

    // Esperar a que las imágenes se carguen
    const images = topRow.querySelectorAll('img');
    if (images.length > 0) {
      let loadedCount = 0;
      const totalImages = images.length;
      
      const checkLoaded = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          // Pequeño delay para asegurar que el layout esté calculado
          setTimeout(initAnimations, 100);
        }
      };

      images.forEach((img) => {
        if ((img as HTMLImageElement).complete) {
          checkLoaded();
        } else {
          img.addEventListener('load', checkLoaded);
          img.addEventListener('error', checkLoaded);
        }
      });
    } else {
      // Si no hay imágenes, inicializar inmediatamente
      setTimeout(initAnimations, 100);
    }

    return () => {
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
