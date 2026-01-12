'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface AboutHeroProps {
  images?: string[];
}

export default function AboutHero({ images = [] }: AboutHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animación del título
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Animación del texto
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Animación de las imágenes
      if (imagesRef.current) {
        const imageElements = imagesRef.current.querySelectorAll('img');
        gsap.fromTo(
          imageElements,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.4,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imagesRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [images]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* Sección superior con fondo amarillo */}
      <div className="relative bg-[#ff9001] pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24">
        {/* Elementos decorativos pequeños */}
        <div className="absolute top-8 right-8 sm:top-12 sm:right-12 md:top-16 md:right-16 flex items-center gap-2 sm:gap-3 z-10">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#272F66] rounded-full"></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#272F66] rounded-full"></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#272F66] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
          {/* Contenido principal */}
          <div className="text-center">
            {/* Título */}
            <h1
              ref={titleRef}
              className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#272F66] mb-4 sm:mb-6 leading-tight"
            >
              Modelo Artica
            </h1>

            {/* Texto descriptivo */}
            <p
              ref={textRef}
              className="font-sans text-base sm:text-lg md:text-xl text-[#272F66]/90 max-w-3xl mx-auto leading-relaxed"
            >
              Conócenos y Descubre cómo podemos impulsar el crecimiento de tu marca.
            </p>
          </div>
        </div>

        {/* Curva separadora SVG */}
        <div className="absolute bottom-0 left-0 right-0 w-full" style={{ height: '60px' }}>
          <svg
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            className="w-full h-full"
            style={{ display: 'block' }}
          >
            <path
              d="M0,60 Q720,0 1440,60 L1440,60 L0,60 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </div>

      {/* Sección inferior con fondo blanco y las imágenes */}
      <div className="relative bg-white pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Galería de 4 imágenes */}
          {images.length > 0 ? (
            <div
              ref={imagesRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-full aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
                >
                  <Image
                    src={image}
                    alt={`Imagen ${index + 1} - Modelo Artica`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={index < 2}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              ref={imagesRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
            >
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="relative w-full aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center"
                >
                  <p className="text-gray-400 font-sans text-sm">Imagen {index + 1}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
