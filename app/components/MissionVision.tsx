'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaBullseye, FaStar } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

      gsap.set(cards, {
        opacity: 0,
        y: 50,
        scale: 0.9,
      });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        stagger: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 100%',
          end: 'top 60%',
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#272F66] py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#ff9001]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#ff9001]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Card Misión */}
          <div
            ref={(el) => {
              if (el) cardsRef.current[0] = el;
            }}
            className="group relative bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            style={{
              opacity: 0,
              transform: 'translateY(50px) scale(0.9)',
            }}
          >
            {/* Efecto de brillo en hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
              {/* Icono - Izquierda */}
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#ff9001] to-[#ff7700] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
                  <FaBullseye className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                {/* Círculo decorativo detrás del icono */}
                <div className="absolute -top-1 -right-1 w-16 h-16 bg-[#ff9001]/20 rounded-full blur-lg group-hover:bg-[#ff9001]/30 transition-all duration-500" />
              </div>

              {/* Contenido - Derecha */}
              <div className="flex-1">
                <h3
                  className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#272F66] mb-2 sm:mb-3 leading-tight"
                  style={{
                    fontFamily: 'var(--font-roboto), sans-serif',
                  }}
                >
                  Nuestra Misión
                </h3>
                <p
                  className="text-xs sm:text-sm md:text-base text-[#272F66]/80 leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-roboto), sans-serif',
                    lineHeight: '1.6',
                  }}
                >
                  Nuestra misión es clara: empoderar a las empresas a prosperar en el entorno digital. Logramos esto diseñando e implementando estrategias de marketing innovadoras, basadas en datos y adaptadas a las necesidades específicas de cada cliente. Nos esforzamos por ser el motor de su crecimiento online, convirtiendo desafíos en oportunidades y objetivos en realidades.
                </p>
              </div>
            </div>

            {/* Línea decorativa inferior */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff9001] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Card Visión */}
          <div
            ref={(el) => {
              if (el) cardsRef.current[1] = el;
            }}
            className="group relative bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            style={{
              opacity: 0,
              transform: 'translateY(50px) scale(0.9)',
            }}
          >
            {/* Efecto de brillo en hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
              {/* Icono - Izquierda */}
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#ff9001] to-[#ff7700] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
                  <FaStar className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                {/* Círculo decorativo detrás del icono */}
                <div className="absolute -top-1 -right-1 w-16 h-16 bg-[#ff9001]/20 rounded-full blur-lg group-hover:bg-[#ff9001]/30 transition-all duration-500" />
              </div>

              {/* Contenido - Derecha */}
              <div className="flex-1">
                <h3
                  className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#272F66] mb-2 sm:mb-3 leading-tight"
                  style={{
                    fontFamily: 'var(--font-roboto), sans-serif',
                  }}
                >
                  Nuestra Visión
                </h3>
                <p
                  className="text-xs sm:text-sm md:text-base text-[#272F66]/80 leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-roboto), sans-serif',
                    lineHeight: '1.6',
                  }}
                >
                  Aspiramos a ser la agencia de marketing digital de referencia, reconocida por nuestra excelencia, la generación constante de resultados sobresalientes y la construcción de relaciones a largo plazo basadas en la confianza y el éxito mutuo. Buscamos liderar la vanguardia de la transformación digital, anticipándonos a las tendencias y ofreciendo soluciones que preparen a nuestros clientes para el futuro.
                </p>
              </div>
            </div>

            {/* Línea decorativa inferior */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff9001] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
