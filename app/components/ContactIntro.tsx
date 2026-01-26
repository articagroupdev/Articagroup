'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function ContactIntro() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const text1Ref = useRef<HTMLParagraphElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animación del icono
      if (iconRef.current) {
        gsap.set(iconRef.current, {
          opacity: 0,
          scale: 0.5,
          rotation: -180,
        });

        gsap.to(iconRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: iconRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1.5,
          },
        });

        // Animación continua de pulso suave
        gsap.to(iconRef.current.querySelector('.icon-pulse'), {
          scale: 1.1,
          opacity: 0.6,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
        });
      }

      // Animación del título
      if (titleRef.current) {
        gsap.set(titleRef.current, {
          opacity: 0,
          y: 40,
        });

        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1.5,
          },
        });
      }

      // Animación del primer párrafo
      if (text1Ref.current) {
        gsap.set(text1Ref.current, {
          opacity: 0,
          y: 30,
        });

        gsap.to(text1Ref.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: text1Ref.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1.5,
          },
        });
      }

      // Animación del segundo párrafo
      if (text2Ref.current) {
        gsap.set(text2Ref.current, {
          opacity: 0,
          y: 30,
        });

        gsap.to(text2Ref.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: text2Ref.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-[#13B9D5]/5 via-white to-white py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#ff9001]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#13B9D5]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <div className="text-center">
          {/* Icono destacado */}
          <div
            ref={iconRef}
            className="relative inline-flex items-center justify-center mb-8 sm:mb-10 md:mb-12"
            style={{
              opacity: 0,
              transform: 'scale(0.5) rotate(-180deg)',
            }}
          >
            {/* Círculo de pulso animado */}
            <div className="absolute inset-0 icon-pulse">
              <div className="w-full h-full rounded-full bg-[#ff9001]/20 blur-xl" />
            </div>
            
            {/* Círculo de fondo con gradiente */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#ff9001] to-[#ff9001]/80 shadow-lg shadow-[#ff9001]/30 flex items-center justify-center">
              {/* Icono de flecha hacia abajo */}
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>

          <h2
            ref={titleRef}
            className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#272F66] mb-6 sm:mb-8 leading-tight tracking-tight"
            style={{
              fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif',
              fontWeight: 'bold',
              opacity: 0,
              transform: 'translateY(40px)',
            }}
          >
            {t('contact.intro.title')}
          </h2>
          
          <p
            ref={text1Ref}
            className="text-base sm:text-lg md:text-xl text-[#272F66]/80 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto"
            style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              opacity: 0,
              transform: 'translateY(30px)',
            }}
          >
            {t('contact.intro.text1')}
          </p>
          
          <p
            ref={text2Ref}
            className="text-lg sm:text-xl md:text-2xl font-bold text-[#ff9001] leading-relaxed"
            style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              opacity: 0,
              transform: 'translateY(30px)',
            }}
          >
            {t('contact.intro.text2')}
          </p>
        </div>
      </div>
    </section>
  );
}
