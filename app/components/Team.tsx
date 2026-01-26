'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const { t } = useLanguage();
  
  const teamMembers = [
    {
      name: t('about.team.members.rodrigo.name'),
      role: t('about.team.members.rodrigo.role'),
      description: t('about.team.members.rodrigo.description'),
      image: '/img/PERSON1.jpg',
    },
    {
      name: t('about.team.members.michelle.name'),
      role: t('about.team.members.michelle.role'),
      description: t('about.team.members.michelle.description'),
      image: '/img/PERSON2.jpg',
    },
    {
      name: t('about.team.members.cesar.name'),
      role: t('about.team.members.cesar.role'),
      description: t('about.team.members.cesar.description'),
      image: '/img/PERSON3.jpg',
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
        y: 60,
        scale: 0.9,
      });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.8,
        stagger: 0.35,
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
      className="relative w-full bg-gray-100 py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#ff9001]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#272F66]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-12 text-center md:text-left">
          <h2
            ref={titleRef}
            className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#272F66] mb-3 sm:mb-4 leading-tight"
            style={{
              fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif',
              fontWeight: 'bold',
              opacity: 0,
              transform: 'translateY(40px)',
            }}
          >
            {t('about.team.title')}
          </h2>
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl text-[#272F66]/70 max-w-3xl mx-auto md:mx-0 leading-relaxed"
            style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              opacity: 0,
              transform: 'translateY(30px)',
            }}
          >
            {t('about.team.subtitle')}
          </p>
        </div>

        {/* Grid de miembros del equipo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{
                opacity: 0,
                transform: 'translateY(60px) scale(0.9)',
              }}
            >
              {/* Imagen con badge de rol */}
              <div className="relative w-full h-[240px] sm:h-[280px] md:h-[300px] overflow-hidden bg-gray-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Badge de rol */}
                <div className="absolute top-3 left-3 bg-gradient-to-br from-[#ff9001] to-[#e67e00] px-4 py-1.5 rounded-lg shadow-lg z-10 whitespace-nowrap">
                  <span className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wide">
                    {member.role}
                  </span>
                </div>

                {/* Overlay sutil en hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Contenido */}
              <div className="p-4 sm:p-5 md:p-6 text-center md:text-left">
                <h3
                  className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#272F66] mb-2 sm:mb-3 leading-tight"
                  style={{
                    fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif',
                    fontWeight: 'bold',
                  }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-xs sm:text-sm md:text-base text-[#272F66]/70 leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    lineHeight: '1.6',
                  }}
                >
                  {member.description}
                </p>
              </div>

              {/* Línea decorativa inferior */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff9001] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
