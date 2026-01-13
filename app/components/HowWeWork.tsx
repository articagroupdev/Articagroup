'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: 1,
    title: 'Análisis y Diagnóstico',
    description: 'Comenzamos por comprender a fondo tu negocio, tu mercado objetivo y tus objetivos específicos. Realizamos un análisis exhaustivo de tu presencia digital actual y la de tu competencia.',
    hasTopBackground: true,
  },
  {
    number: 2,
    title: 'Desarrollo de Estrategia',
    description: 'Basándonos en el análisis, diseñamos una estrategia de marketing digital a medida, seleccionando los canales y tácticas más adecuados para alcanzar tus metas.',
    hasTopBackground: false,
  },
  {
    number: 3,
    title: 'Implementación y Ejecución',
    description: 'Nuestro equipo de expertos diseñadores, filmmakers, communities, traffickers y más, se encarga de la implementación impecable de la estrategia, creando contenido atractivo, gestionando campañas publicitarias efectivas y optimizando cada detalle.',
    hasTopBackground: false,
  },
  {
    number: 4,
    title: 'Optimización y Crecimiento',
    description: 'Nuestro objetivo es la mejora continua. Utilizamos los insights obtenidos del análisis para optimizar las campañas y asegurar un crecimiento constante y sostenible para tu negocio.',
    hasTopBackground: false,
  },
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

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

      // Animación del subtítulo
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
        gsap.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 100%',
            end: 'top 70%',
            scrub: 1.5,
          },
        });
      }

      // Animación de los pasos
      const stepCards = stepsRef.current.filter(Boolean);
      stepCards.forEach((card, index) => {
        gsap.set(card, {
          opacity: 0,
          y: 50,
          scale: 0.9,
        });

        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.8,
          delay: index * 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 100%',
            end: 'top 60%',
            scrub: 1.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#ff9001]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#272F66]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        {/* Título principal */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2
            ref={titleRef}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#272F66] mb-3 sm:mb-4 leading-tight tracking-tight"
            style={{
              fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif',
              fontWeight: 'bold',
              opacity: 0,
              transform: 'translateY(40px)',
            }}
          >
            Cómo trabajamos en Artica
          </h2>
          <p
            ref={subtitleRef}
            className="text-sm sm:text-base md:text-lg text-[#272F66]/70 max-w-3xl mx-auto leading-relaxed"
            style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              lineHeight: '1.7',
              opacity: 0,
              transform: 'translateY(30px)',
            }}
          >
            En Artica Group, creemos en un enfoque de marketing digital integral y personalizado:
          </p>
        </div>

        {/* Contenedor principal con grid 2x2 */}
        <div className="relative w-full">
          {/* Grid 2x2 de cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {steps.map((step, index) => {
              return (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) stepsRef.current[index] = el;
                  }}
                  className={`group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col ${
                    step.hasTopBackground ? 'bg-[#ff9001]' : 'bg-white'
                  }`}
                  style={{
                    opacity: 0,
                    transform: 'translateY(50px)',
                    minHeight: '200px',
                  }}
                >
                  {/* Header con número - todas las cards */}
                  <div className={`w-full h-16 sm:h-18 ${step.hasTopBackground ? 'bg-[#ff9001]' : 'bg-white'} flex items-center ${step.hasTopBackground ? 'justify-start pl-4 sm:pl-5' : 'justify-start pl-4 sm:pl-5'}`}>
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg ${
                      step.hasTopBackground ? 'bg-white' : 'bg-[#ff9001]'
                    }`}>
                      <span className={`font-bold text-lg sm:text-xl ${
                        step.hasTopBackground ? 'text-[#ff9001]' : 'text-white'
                      }`}>
                        {step.number}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`relative flex-1 flex flex-col p-3 sm:p-4 md:p-5`}>
                    {/* Contenido */}
                    <div className="relative z-10 text-left flex-1 flex flex-col justify-center">
                      <h3
                        className={`text-sm sm:text-base font-extrabold mb-1.5 sm:mb-2 leading-tight ${
                          step.hasTopBackground ? 'text-white' : 'text-[#272F66]'
                        }`}
                        style={{
                          fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif',
                          fontWeight: 'bold',
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed flex-1 ${
                          step.hasTopBackground ? 'text-white/90' : 'text-[#272F66]/70'
                        }`}
                        style={{
                          fontFamily: 'var(--font-poppins), sans-serif',
                          lineHeight: '1.5',
                        }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
