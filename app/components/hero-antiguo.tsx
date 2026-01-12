'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  heroRef?: React.RefObject<HTMLDivElement>;
}

export default function Hero({ heroRef: externalHeroRef }: HeroProps = {} as HeroProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const internalHeroRef = useRef<HTMLDivElement>(null);
  const heroRef = externalHeroRef || internalHeroRef;
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLUListElement>(null);
  const navButtonsRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const portfolioButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de la navegación
      if (navRef.current) {
        gsap.set([logoRef.current, navLinksRef.current, navButtonsRef.current], {
          opacity: 0,
          y: -20,
        });

        gsap.to([logoRef.current, navLinksRef.current, navButtonsRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.2,
        });
      }

      // Efecto de scroll en la navegación (intensifica el fondo al hacer scroll)
      if (navRef.current && typeof window !== 'undefined') {
        gsap.to(navRef.current, {
          backgroundColor: 'rgba(255, 255, 255, 1)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          scrollTrigger: {
            trigger: document.body,
            start: 'top -80',
            end: 'top -40',
            scrub: true,
          },
        });
      }

      // TIMELINE PRINCIPAL - Coreografía de entrada estilo Square.com
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Configurar estados iniciales
      if (bannerRef.current) {
        gsap.set(bannerRef.current, {
          opacity: 0,
          y: -20,
        });
      }

      if (taglineRef.current) {
        gsap.set(taglineRef.current, {
          opacity: 0,
          y: 30,
        });
      }

      if (h1Ref.current) {
        gsap.set(h1Ref.current, {
          y: 100,
          opacity: 0,
          skewY: 7,
        });
      }

      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, {
          opacity: 0,
          y: 30,
        });
      }

      if (ctaButtonRef.current) {
        gsap.set(ctaButtonRef.current, {
          opacity: 0,
          y: 30,
        });
      }

      if (portfolioButtonRef.current) {
        gsap.set(portfolioButtonRef.current, {
          opacity: 0,
          y: 30,
        });
      }

      // Banner - Primero
      if (bannerRef.current) {
        tl.to(bannerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Tagline - Segundo
      if (taglineRef.current) {
        tl.to(taglineRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, bannerRef.current ? '-=0.4' : '0');
      }

      // H1 - Revelación orgánica con skewY
      if (h1Ref.current) {
        tl.to(h1Ref.current, {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1.2,
          ease: 'power3.out',
        }, taglineRef.current ? '-=0.4' : '0');
      }

      // Subtítulo - Stagger ligero después del H1
      if (subtitleRef.current) {
        tl.to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          h1Ref.current ? '-=0.6' : '0'
        );
      }

      // CTA Buttons - Stagger después del subtítulo
      if (ctaButtonRef.current && portfolioButtonRef.current) {
        tl.to(
          [ctaButtonRef.current, portfolioButtonRef.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          subtitleRef.current ? '-=0.4' : '0'
        );
      } else if (ctaButtonRef.current) {
        tl.to(
          ctaButtonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          subtitleRef.current ? '-=0.4' : '0'
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="first"
      ref={heroRef}
      className="section first relative min-h-screen flex flex-col overflow-hidden"
      style={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        visibility: 'visible',
        zIndex: 10,
        pointerEvents: 'auto',
      }}
    >
      <div className="wrapper-outer" style={{ width: '100%', height: '100%', overflowY: 'hidden' }}>
        <div className="wrapper-inner" style={{ width: '100%', height: '100%', overflowY: 'hidden' }}>
          {/* Imagen de fondo del hero */}
          <div 
            ref={backgroundRef}
            className="background absolute inset-0 z-0"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              height: '100%',
              width: '100%',
              top: 0,
              backgroundImage: `url(/img/fondo-hero.webp)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
          </div>

          {/* Navegación */}
          <nav
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 transition-all duration-300 bg-transparent"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              {/* Logo */}
              <div ref={logoRef} className="flex items-center">
                <a href="#" className="flex items-center">
                  <img 
                    src="/img/logo-artica-2.avif" 
                    alt="ARTICA" 
                    className="h-8 sm:h-10 md:h-12 w-auto"
                  />
                </a>
              </div>

              {/* Links de navegación */}
              <ul
                ref={navLinksRef}
                className="hidden lg:flex items-center space-x-4 xl:space-x-5"
              >
                <li>
                  <a
                    href="#first"
                    className="text-[#272F66] hover:text-[#1e2547] font-bold transition-colors duration-200 relative group text-xs xl:text-sm"
                    style={{
                      color: '#272F66',
                      textShadow: 'none',
                    }}
                  >
                    Inicio
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#272F66] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="#second"
                    className="text-[#272F66] hover:text-[#1e2547] font-bold transition-colors duration-200 relative group text-xs xl:text-sm"
                    style={{
                      color: '#272F66',
                      textShadow: 'none',
                    }}
                  >
                    Sobre Nosotros
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#272F66] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
                <li className="relative group">
                  <a
                    href="#third"
                    className="text-[#272F66] hover:text-[#1e2547] font-bold transition-colors duration-200 relative inline-flex items-center text-xs xl:text-sm"
                    style={{
                      color: '#272F66',
                      textShadow: 'none',
                    }}
                  >
                    Servicios
                    <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#272F66' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#272F66] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="#fourth"
                    className="text-[#272F66] hover:text-[#1e2547] font-bold transition-colors duration-200 relative group text-xs xl:text-sm"
                    style={{
                      color: '#272F66',
                      textShadow: 'none',
                    }}
                  >
                    Portafolio
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#272F66] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="#fifth"
                    className="text-[#272F66] hover:text-[#1e2547] font-bold transition-colors duration-200 relative group text-xs xl:text-sm"
                    style={{
                      color: '#272F66',
                      textShadow: 'none',
                    }}
                  >
                    Contacto
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#272F66] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              </ul>

              {/* Botones de navegación */}
              <div ref={navButtonsRef} className="flex items-center space-x-3 xl:space-x-4">
                <button className="hidden lg:block px-4 xl:px-5 py-2 xl:py-2.5 text-white bg-[#272F66] border-2 border-[#272F66] rounded-full font-semibold hover:bg-[#1e2547] hover:shadow-lg hover:shadow-[#272F66]/30 hover:scale-105 active:scale-100 transition-all duration-300 text-xs xl:text-sm">
                  Queremos Impulsarte
                </button>

                {/* Botón móvil */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2 text-[#272F66] hover:text-[#1e2547] transition-colors font-bold"
                  style={{
                    color: '#272F66',
                    textShadow: 'none',
                  }}
                  aria-label="Toggle menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isMenuOpen ? (
                      <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Menú móvil */}
            {isMenuOpen && (
              <div className="lg:hidden mt-4 px-4 py-6 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-200/50 relative z-50">
                <ul className="space-y-4">
                  <li>
                    <a href="#first" className="block text-[#272F66] hover:text-[#1e2547] font-semibold py-2 transition-colors">
                      Inicio
                    </a>
                  </li>
                  <li>
                    <a href="#second" className="block text-[#272F66] hover:text-[#1e2547] font-semibold py-2 transition-colors">
                      Sobre Nosotros
                    </a>
                  </li>
                  <li>
                    <a href="#third" className="block text-[#272F66] hover:text-[#1e2547] font-semibold py-2 transition-colors">
                      Servicios
                    </a>
                  </li>
                  <li>
                    <a href="#fourth" className="block text-[#272F66] hover:text-[#1e2547] font-semibold py-2 transition-colors">
                      Portafolio
                    </a>
                  </li>
                  <li>
                    <a href="#fifth" className="block text-[#272F66] hover:text-[#1e2547] font-semibold py-2 transition-colors">
                      Contacto
                    </a>
                  </li>
                  <li className="pt-4 border-t border-gray-200">
                    <button className="w-full px-6 py-3 text-white bg-[#272F66] border-2 border-[#272F66] rounded-full font-semibold hover:bg-[#1e2547] hover:shadow-lg hover:shadow-[#272F66]/30 transition-all duration-300">
                      Queremos Impulsarte
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </nav>

          {/* Contenido Hero */}
          <div ref={containerRef} className="flex-1 flex items-center justify-center relative z-10 min-h-screen pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-28 md:pb-24">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full">
              <div
                ref={heroContentRef}
                className="relative z-10 text-center max-w-4xl mx-auto"
              >
                {/* Banner Informativo */}
                <div
                  ref={bannerRef}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 rounded-full bg-[#272F66]/80 backdrop-blur-sm border border-[#272F66]/30 shadow-lg max-w-[95%] sm:max-w-full"
                >
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#00C7B7] flex-shrink-0"></span>
                  <span className="text-white text-[10px] xs:text-xs sm:text-sm font-medium text-center">
                    <span className="hidden sm:inline">Logramos éxitos empresariales a través de medios digitales</span>
                    <span className="sm:hidden">Éxitos empresariales digitales</span>
                  </span>
                  <svg 
                    className="w-3 h-3 sm:w-4 sm:h-4 text-[#00C7B7] flex-shrink-0 hidden sm:block" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Título Principal */}
                <h1 
                  ref={h1Ref}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#272F66] mb-3 sm:mb-4 md:mb-6 leading-[1.15] tracking-tight px-2 sm:px-0"
                  style={{
                    textShadow: '0 2px 8px rgba(255, 255, 255, 0.8), 0 4px 16px rgba(255, 255, 255, 0.6), 0 0 2px rgba(39, 47, 102, 0.3)',
                    WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.3)',
                  }}
                >
                  Convertimos Clics en Clientes
                </h1>

                {/* Subtítulo */}
                <p
                  ref={subtitleRef}
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-5 sm:mb-6 md:mb-8 max-w-2xl mx-auto font-normal leading-relaxed px-2 sm:px-0"
                  style={{
                    textShadow: '0 1px 4px rgba(255, 255, 255, 0.9), 0 2px 8px rgba(255, 255, 255, 0.7)',
                  }}
                >
                  Impulsa el crecimiento de tu empresa con nosotros
                </p>

                {/* CTA Buttons */}
                <div className="flex justify-center items-center gap-3 sm:gap-4 flex-wrap px-2 sm:px-0">
                  <button
                    ref={ctaButtonRef}
                    className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-white bg-[#272F66] border-2 border-[#272F66] rounded-full font-semibold shadow-lg shadow-[#272F66]/25 hover:bg-[#1e2547] hover:shadow-xl hover:shadow-[#272F66]/40 hover:scale-105 active:scale-100 transition-all duration-300 text-sm sm:text-base md:text-lg w-full sm:w-auto"
                  >
                    Actúa y Crece
                  </button>
                  <button
                    ref={portfolioButtonRef}
                    className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-white bg-[#00C7B7] border-2 border-[#00C7B7] rounded-full font-semibold shadow-lg shadow-[#00C7B7]/25 hover:bg-[#00B3A5] hover:shadow-xl hover:shadow-[#00C7B7]/40 hover:scale-105 active:scale-100 transition-all duration-300 text-sm sm:text-base md:text-lg w-full sm:w-auto"
                  >
                    Portafolio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


