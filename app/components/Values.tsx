'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaLightbulb, FaChartLine, FaEye, FaHandshake } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Values() {
  const { t } = useLanguage();
  
  const values = [
    {
      icon: FaLightbulb,
      title: t('about.values.items.innovacion.title'),
      description: t('about.values.items.innovacion.description'),
    },
    {
      icon: FaChartLine,
      title: t('about.values.items.resultados.title'),
      description: t('about.values.items.resultados.description'),
    },
    {
      icon: FaEye,
      title: t('about.values.items.transparencia.title'),
      description: t('about.values.items.transparencia.description'),
    },
    {
      icon: FaHandshake,
      title: t('about.values.items.colaboracion.title'),
      description: t('about.values.items.colaboracion.description'),
    },
  ];
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

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

      // Animación de las cards
      const cards = cardsRef.current.filter(Boolean);
      gsap.set(cards, {
        opacity: 0,
        y: 50,
        scale: 0.9,
        x: -20,
      });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        x: 0,
        duration: 1.8,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 100%',
          end: 'top 50%',
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#272F66]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#ff9001]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2
            ref={titleRef}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#272F66] mb-4 sm:mb-6 leading-tight"
            style={{
              fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif',
              fontWeight: 'bold',
              opacity: 0,
              transform: 'translateY(40px)',
            }}
          >
            {t('about.values.title')}
          </h2>
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl text-[#272F66]/70 max-w-3xl mx-auto leading-relaxed"
            style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              opacity: 0,
              transform: 'translateY(30px)',
            }}
          >
            {t('about.values.subtitle')}
          </p>
        </div>

        {/* Grid de valores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="group relative bg-white rounded-2xl p-5 sm:p-6 border-2 border-gray-200 shadow-md hover:border-[#13B9D5] hover:shadow-lg transition-all duration-300 overflow-hidden"
                style={{
                  opacity: 0,
                  transform: 'translateY(50px) scale(0.9) translateX(-20px)',
                }}
              >
                {/* Efecto de fondo en hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#13B9D5]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Contenido centrado */}
                <div className="relative flex flex-col items-center text-center">
                  {/* Icono */}
                  <div className="relative mb-4 sm:mb-5">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#13B9D5] to-[#0FA8C2] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                      <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    {/* Círculo decorativo detrás del icono */}
                    <div className="absolute -top-1 -right-1 w-16 h-16 bg-[#13B9D5]/20 rounded-full blur-lg group-hover:bg-[#13B9D5]/30 transition-all duration-300" />
                  </div>

                  {/* Contenido */}
                  <h3
                    className="text-lg sm:text-xl font-extrabold text-[#272F66] mb-2 sm:mb-3 leading-tight"
                    style={{
                      fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif',
                      fontWeight: 'bold',
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-xs sm:text-sm md:text-base text-[#272F66]/70 leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      lineHeight: '1.6',
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
