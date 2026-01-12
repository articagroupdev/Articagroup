'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animación del título
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 40 });
        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 100%',
            end: 'top 70%',
            scrub: 1.5,
          },
        });
      }

      // Animación del contenedor de texto
      if (textContainerRef.current) {
        gsap.set(textContainerRef.current, { opacity: 0, y: 30 });
        gsap.to(textContainerRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: 'top 100%',
            end: 'top 70%',
            scrub: 1.5,
          },
        });
      }

      // Animación de la imagen
      if (imageRef.current) {
        gsap.set(imageRef.current, { opacity: 0, scale: 0.9, x: 30 });
        gsap.to(imageRef.current, {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 100%',
            end: 'top 60%',
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-white to-gray-50 py-20 sm:py-24 md:py-28 lg:py-36 overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#272F66]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff9001]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center">
          {/* Contenido de texto - Izquierda */}
          <div className="order-2 lg:order-1">
            {/* Título */}
            <h2
              ref={titleRef}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#272F66] mb-4 sm:mb-6 leading-tight tracking-tight"
              style={{
                fontFamily: 'var(--font-roboto), sans-serif',
                opacity: 0,
                transform: 'translateY(40px)',
              }}
            >
              Conoce a Artica Group
            </h2>

            {/* Texto descriptivo */}
            <div 
              ref={textContainerRef}
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
              }}
            >
              <p
                className="text-sm sm:text-base md:text-lg text-[#272F66]/75 leading-relaxed mb-4"
                style={{
                  fontFamily: 'var(--font-roboto), sans-serif',
                  lineHeight: '1.7',
                }}
              >
                En Artica Group, somos más que una agencia de marketing digital: somos tus socios estratégicos en el competitivo mundo online. Con una profunda pasión por la innovación y un enfoque centrado en resultados tangibles, impulsamos el crecimiento de marcas como la tuya a través de estrategias digitales personalizadas y efectivas.
              </p>
              <p
                className="text-sm sm:text-base md:text-lg text-[#272F66]/75 leading-relaxed"
                style={{
                  fontFamily: 'var(--font-roboto), sans-serif',
                  lineHeight: '1.7',
                }}
              >
                Entendemos que cada negocio es único, y por eso dedicamos nuestra experiencia y creatividad a construir soluciones que superen tus expectativas y alcancen tus objetivos.
              </p>
            </div>
          </div>

          {/* Imagen - Derecha */}
          <div
            ref={imageRef}
            className="order-1 lg:order-2 relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] group"
            style={{
              opacity: 0,
              transform: 'scale(0.9) translateX(30px)',
            }}
          >
            {/* Contenedor de imagen con efectos */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:shadow-3xl group-hover:scale-[1.02]">
              <Image
                src="/img/artica.png"
                alt="Artica Group"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
              {/* Overlay con gradiente */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#272F66]/10 via-transparent to-[#ff9001]/10 pointer-events-none" />
              
              {/* Borde decorativo */}
              <div className="absolute inset-0 rounded-3xl border-2 border-white/20 pointer-events-none" />
            </div>
            
            {/* Elemento decorativo flotante */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#ff9001] to-[#272F66] rounded-2xl opacity-10 blur-2xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
