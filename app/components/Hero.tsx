'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ES from 'country-flag-icons/react/3x2/ES';
import US from 'country-flag-icons/react/3x2/US';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  heroRef?: React.RefObject<HTMLDivElement>;
}

export default function Hero({ heroRef: externalHeroRef }: HeroProps = {} as HeroProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const internalHeroRef = useRef<HTMLDivElement>(null);
  const heroRef = externalHeroRef || internalHeroRef;
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLUListElement>(null);
  const navButtonsRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroTopTextRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroButtonRef = useRef<HTMLAnchorElement>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

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


      // Animación del contenido del Hero
      if (heroContentRef.current) {
        // Asegurar que los elementos sean visibles inicialmente
        gsap.set([heroTopTextRef.current, heroTitleRef.current, heroSubtitleRef.current, heroButtonRef.current], {
          opacity: 1,
          y: 0,
          visibility: 'visible',
        });

      }
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Animación del mega menú
  useEffect(() => {
    if (isServicesOpen && servicesMenuRef.current) {
      gsap.fromTo(servicesMenuRef.current,
        {
          opacity: 0,
          y: -10,
          scale: 0.95,
          xPercent: -50,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          xPercent: -50,
          duration: 0.3,
          ease: 'power2.out',
        }
      );
    } else if (!isServicesOpen && servicesMenuRef.current) {
      gsap.to(servicesMenuRef.current, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        xPercent: -50,
        duration: 0.2,
        ease: 'power2.in',
      });
    }
  }, [isServicesOpen]);

  // Efecto de scroll en la navegación - separado para mejor control
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Solo aplicar en desktop (lg y superior)
    if (window.innerWidth >= 1024 && navRef.current) {
      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: document.body,
        start: 'top -80',
        end: 'top -40',
        scrub: true,
        onEnter: () => {
          setIsScrolled(true);
          if (navRef.current) {
            gsap.to(navRef.current, {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              duration: 0.3,
            });
          }
        },
        onLeaveBack: () => {
          setIsScrolled(false);
          if (navRef.current) {
            gsap.to(navRef.current, {
              backgroundColor: 'transparent',
              boxShadow: 'none',
              duration: 0.3,
            });
          }
        },
      });

      return () => {
        scrollTriggerInstance.kill();
      };
    }
  }, []);

  // Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);


  return (
    <section
      id="first"
      ref={heroRef}
      className="section first relative min-h-screen flex flex-col"
      style={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        visibility: 'visible',
        zIndex: 10,
        pointerEvents: 'auto',
        backgroundColor: '#212121',
      }}
    >
      {/* Imagen de fondo como fallback */}
      <div 
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: 'url(/img/fondo-hero1.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-[0.5]"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0.5,
        }}
        onError={(e) => {
          console.error('Error loading video:', e);
          // Ocultar video si hay error
          const video = e.currentTarget;
          video.style.display = 'none';
        }}
        onLoadStart={() => {
          console.log('Video loading started');
        }}
        onCanPlay={() => {
          console.log('Video can play');
        }}
      >
        <source src="/img/fondo-video.mp4" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>

      {/* Overlay oscuro para mejorar legibilidad del contenido */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
        }}
      />

      {/* Navegación */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[9999] px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-2 sm:py-3 md:py-4 transition-all duration-300 bg-white lg:bg-transparent shadow-sm lg:shadow-none"
        style={{ overflow: 'visible' }}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between" style={{ overflow: 'visible' }}>
          {/* Logo y Links de navegación - Izquierda */}
          <div className="flex items-center gap-6 xl:gap-8" style={{ overflow: 'visible' }}>
            {/* Logo */}
            <div ref={logoRef} className="flex items-center">
              <Link href="/" className="flex items-center">
                <img 
                  src={isScrolled ? "/img/logo-artica-2.avif" : "/img/logo-artica-blanco.png"} 
                  alt="ARTICA" 
                  className="h-8 sm:h-10 md:h-10 w-auto"
                />
              </Link>
            </div>

            {/* Links de navegación */}
            <ul
              ref={navLinksRef}
              className="hidden lg:flex items-center space-x-4 xl:space-x-5 relative"
              style={{ overflow: 'visible' }}
            >
            <li>
              <Link
                href="/"
                className={`font-bold transition-colors duration-200 text-xs xl:text-sm hover:text-[#13B9D5] ${
                  pathname === '/' ? 'text-[#13B9D5]' : ''
                }`}
                style={{
                  color: pathname === '/' ? '#13B9D5' : (isScrolled ? '#272F66' : '#ffffff'),
                  textShadow: 'none',
                }}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`font-bold transition-colors duration-200 text-xs xl:text-sm hover:text-[#13B9D5] ${
                  pathname === '/about' ? 'text-[#13B9D5]' : ''
                }`}
                style={{
                  color: pathname === '/about' ? '#13B9D5' : (isScrolled ? '#272F66' : '#ffffff'),
                  textShadow: 'none',
                }}
              >
                Sobre Nosotros
              </Link>
            </li>
            <li 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => {
                setTimeout(() => {
                  if (!servicesMenuRef.current?.matches(':hover')) {
                    setIsServicesOpen(false);
                  }
                }, 100);
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsServicesOpen(!isServicesOpen);
                }}
                className="font-bold transition-colors duration-200 inline-flex items-center text-xs xl:text-sm cursor-pointer"
                style={{
                  color: isServicesOpen ? '#13B9D5' : (isScrolled ? '#272F66' : '#ffffff'),
                  textShadow: 'none',
                }}
              >
                Servicios
                <svg 
                  className={`ml-1 w-3 h-3 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Mega Menu */}
              {isServicesOpen && (
                <div
                  ref={servicesMenuRef}
                  className="absolute top-full mt-6 w-[95vw] max-w-[1200px] bg-white rounded-2xl border border-gray-200 p-5 md:p-6 shadow-lg"
                  style={{
                    zIndex: 10000,
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                    left: '300%',
                  }}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <div className="grid grid-cols-3 gap-x-6 gap-y-3">
                    {/* Columna 1 */}
                    <div className="space-y-3" style={{ width: '100%', minWidth: 0 }}>
                      <Link href="/services/desarrollo-web" className="block shadow-none" style={{ boxShadow: 'none', textDecoration: 'none', textShadow: 'none' }}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                          <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-sm mb-0.5" style={{ textShadow: 'none', color: '#272F66', fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                          Desarrollo Web
                        </h3>
                        <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none' }}>
                          Sitios web modernos y funcionales
                        </p>
                      </Link>

                      <Link href="/services/diseno-grafico" className="block transition-all duration-200 hover:translate-x-1 shadow-none" style={{ boxShadow: 'none', textDecoration: 'none', textShadow: 'none' }}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                          <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-sm mb-0.5" style={{ textShadow: 'none', color: '#272F66', fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                          Diseño Gráfico
                        </h3>
                        <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none' }}>
                          Identidad visual y diseño creativo
                        </p>
                      </Link>

                      <Link href="/services/posicionamiento-comunicacion" className="block transition-all duration-200 hover:translate-x-1 shadow-none" style={{ boxShadow: 'none', textDecoration: 'none', textShadow: 'none' }}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                          <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-sm mb-0.5" style={{ textShadow: 'none', color: '#272F66', fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                          Estrategia Posicionamiento y Comunicación
                        </h3>
                        <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none' }}>
                          Estrategias integrales de marca y comunicación
                        </p>
                      </Link>
                    </div>

                    {/* Columna 2 */}
                    <div className="space-y-3" style={{ minWidth: 0 }}>
                      <Link href="/services/edicion-videos" className="block transition-all duration-200 hover:translate-x-1 shadow-none" style={{ boxShadow: 'none', textDecoration: 'none', textShadow: 'none' }}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                          <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-sm mb-0.5" style={{ textShadow: 'none', color: '#272F66', fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                          Edición de Videos
                        </h3>
                        <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none' }}>
                          Producción y edición profesional de video
                        </p>
                      </Link>

                      <Link href="/services/publicidad-online" className="block transition-all duration-200 hover:translate-x-1 shadow-none" style={{ boxShadow: 'none', textDecoration: 'none', textShadow: 'none' }}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                          <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-sm mb-0.5" style={{ textShadow: 'none', color: '#272F66', fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                          Publicidad Online
                        </h3>
                        <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none' }}>
                          Campañas publicitarias digitales efectivas
                        </p>
                      </Link>
                    </div>

                    {/* Columna 3 */}
                    <div className="space-y-3" style={{ minWidth: 0 }}>
                      <Link href="/services/creacion-contenido" className="block shadow-none" style={{ boxShadow: 'none', textDecoration: 'none', textShadow: 'none' }}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                          <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-sm mb-0.5" style={{ textShadow: 'none', color: '#272F66', fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                          Creación de Contenido
                        </h3>
                        <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none' }}>
                          Contenido visual atractivo para tu marca
                        </p>
                      </Link>

                      <Link href="/services/campanas-ads" className="block transition-all duration-200 hover:translate-x-1 shadow-none" style={{ boxShadow: 'none', textDecoration: 'none', textShadow: 'none' }}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                          <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-sm mb-0.5" style={{ textShadow: 'none', color: '#272F66', fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                          Campañas de Ads
                        </h3>
                        <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none' }}>
                          Publicidad efectiva en redes sociales
                        </p>
                      </Link>

                      <Link href="/services/community-management" className="block transition-all duration-200 hover:translate-x-1 shadow-none" style={{ boxShadow: 'none', textDecoration: 'none', textShadow: 'none' }}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                          <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-sm mb-0.5" style={{ textShadow: 'none', color: '#272F66', fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                          Community Management
                        </h3>
                        <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none' }}>
                          Gestión profesional de comunidades online
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li>
              <a
                href="#fourth"
                className="font-bold transition-colors duration-200 text-xs xl:text-sm hover:text-[#13B9D5]"
                style={{
                  color: isScrolled ? '#272F66' : '#ffffff',
                  textShadow: 'none',
                }}
              >
                Portafolio
              </a>
            </li>
            <li>
              <Link
                href="/contact"
                className={`font-bold transition-colors duration-200 text-xs xl:text-sm hover:text-[#13B9D5] ${
                  pathname === '/contact' ? 'text-[#13B9D5]' : ''
                }`}
                style={{
                  color: pathname === '/contact' ? '#13B9D5' : (isScrolled ? '#272F66' : '#ffffff'),
                  textShadow: 'none',
                }}
              >
                Contacto
              </Link>
            </li>
          </ul>
          </div>

          {/* Botones de navegación - Derecha */}
          <div ref={navButtonsRef} className="flex items-center gap-2 xl:gap-3 flex-shrink-0">
            {/* Selector de idioma */}
            <button
              onClick={() => {
                // TODO: Implementar cambio de idioma
                setLanguage(language === 'es' ? 'en' : 'es');
              }}
              className="hidden lg:flex items-center justify-center w-7 h-7 xl:w-8 xl:h-8 transition-all duration-300 hover:scale-110 overflow-hidden rounded"
              aria-label="Cambiar idioma"
              title={language === 'es' ? 'Change to English' : 'Cambiar a Español'}
            >
              {language === 'es' ? (
                <ES className="w-full h-full object-cover" />
              ) : (
                <US className="w-full h-full object-cover" />
              )}
            </button>

            <button className={`hidden lg:block px-6 xl:px-7 py-2.5 xl:py-3 rounded-full font-medium transition-all duration-300 text-xs xl:text-sm shadow-sm hover:shadow-md ${
              isScrolled 
                ? 'text-white bg-[#272F66] hover:bg-[#1e2547]' 
                : 'text-[#272F66] bg-white hover:bg-gray-100'
            }`}>
              Queremos Impulsarte
            </button>

            {/* Botón móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:text-[#1e2547] transition-colors font-bold"
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

        {/* Overlay oscuro */}
        <div
          ref={overlayRef}
          className={`lg:hidden fixed inset-0 bg-black/50 z-[99998] transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
          style={{
            zIndex: 99998,
          }}
        />

        {/* Menú lateral móvil */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 bg-white z-[99999] shadow-2xl transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            zIndex: 99999,
            boxShadow: '0 0 30px rgba(0, 0, 0, 0.3)',
            backgroundColor: '#ffffff',
            width: 'min(420px, 92vw)',
            height: '100vh',
            minHeight: '100vh',
          }}
        >
          <div className="flex flex-col bg-white" style={{ backgroundColor: '#ffffff', height: '100%', minHeight: '100vh' }}>
            {/* Header del menú - Fondo blanco con logo */}
            <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-gray-200" style={{ backgroundColor: '#ffffff' }}>
              <img 
                src="/img/logo-artica-blanco.png" 
                alt="ARTICA" 
                className="h-8 sm:h-16 w-auto"
              />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Cerrar menú"
              >
                <svg
                  className="w-6 h-6 text-[#272F66]"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido del menú - Fondo blanco */}
            <div className="flex-1 overflow-y-auto bg-white px-5 py-6" style={{ backgroundColor: '#ffffff' }}>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block font-bold py-4 px-5 rounded-xl transition-all duration-200 ${
                      pathname === '/' 
                        ? 'text-white bg-gradient-to-r from-[#13B9D5] to-[#0FA8C2] shadow-lg' 
                        : 'bg-gray-50 hover:bg-[#13B9D5]/10 hover:text-[#13B9D5]'
                    }`}
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '16px',
                      color: pathname === '/' ? '#ffffff' : '#1a1a2e',
                    }}
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block font-bold py-4 px-5 rounded-xl transition-all duration-200 ${
                      pathname === '/about' 
                        ? 'text-white bg-gradient-to-r from-[#13B9D5] to-[#0FA8C2] shadow-lg' 
                        : 'bg-gray-50 hover:bg-[#13B9D5]/10 hover:text-[#13B9D5]'
                    }`}
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '16px',
                      color: pathname === '/about' ? '#ffffff' : '#1a1a2e',
                    }}
                  >
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setIsServicesOpen(!isServicesOpen);
                    }}
                    className="w-full flex items-center justify-between font-bold py-4 px-5 rounded-xl transition-all duration-200 bg-gray-50 hover:bg-[#13B9D5]/10 hover:text-[#13B9D5]"
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '16px',
                      color: '#1a1a2e',
                    }}
                  >
                    <span>Servicios</span>
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isServicesOpen && (
                    <ul className="mt-2 ml-2 space-y-1 border-l-2 border-[#13B9D5]/30 pl-5">
                      <li>
                        <Link href="/services/desarrollo-web" onClick={() => setIsMenuOpen(false)} className="block py-2.5 hover:text-[#13B9D5] transition-colors font-medium" style={{ fontSize: '14px', color: '#1a1a2e' }}>
                          Desarrollo Web
                        </Link>
                      </li>
                      <li>
                        <Link href="/services/diseno-grafico" onClick={() => setIsMenuOpen(false)} className="block py-2.5 hover:text-[#13B9D5] transition-colors font-medium" style={{ fontSize: '14px', color: '#1a1a2e' }}>
                          Diseño Gráfico
                        </Link>
                      </li>
                      <li>
                        <Link href="/services/posicionamiento-comunicacion" onClick={() => setIsMenuOpen(false)} className="block py-2.5 hover:text-[#13B9D5] transition-colors font-medium" style={{ fontSize: '14px', color: '#1a1a2e' }}>
                          Estrategia
                        </Link>
                      </li>
                      <li>
                        <Link href="/services/edicion-videos" onClick={() => setIsMenuOpen(false)} className="block py-2.5 hover:text-[#13B9D5] transition-colors font-medium" style={{ fontSize: '14px', color: '#1a1a2e' }}>
                          Edición de Videos
                        </Link>
                      </li>
                      <li>
                        <Link href="/services/publicidad-online" onClick={() => setIsMenuOpen(false)} className="block py-2.5 hover:text-[#13B9D5] transition-colors font-medium" style={{ fontSize: '14px', color: '#1a1a2e' }}>
                          Publicidad Online
                        </Link>
                      </li>
                      <li>
                        <Link href="/services/creacion-contenido" onClick={() => setIsMenuOpen(false)} className="block py-2.5 hover:text-[#13B9D5] transition-colors font-medium" style={{ fontSize: '14px', color: '#1a1a2e' }}>
                          Creación de Contenido
                        </Link>
                      </li>
                      <li>
                        <Link href="/services/campanas-ads" onClick={() => setIsMenuOpen(false)} className="block py-2.5 hover:text-[#13B9D5] transition-colors font-medium" style={{ fontSize: '14px', color: '#1a1a2e' }}>
                          Campañas de Ads
                        </Link>
                      </li>
                      <li>
                        <Link href="/services/community-management" onClick={() => setIsMenuOpen(false)} className="block py-2.5 hover:text-[#13B9D5] transition-colors font-medium" style={{ fontSize: '14px', color: '#1a1a2e' }}>
                          Community Management
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <Link
                    href="#fourth"
                    onClick={() => setIsMenuOpen(false)}
                    className="block font-bold py-4 px-5 rounded-xl transition-all duration-200 bg-gray-50 hover:bg-[#13B9D5]/10 hover:text-[#13B9D5]"
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '16px',
                      color: '#1a1a2e',
                    }}
                  >
                    Portafolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block font-bold py-4 px-5 rounded-xl transition-all duration-200 ${
                      pathname === '/contact' 
                        ? 'text-white bg-gradient-to-r from-[#13B9D5] to-[#0FA8C2] shadow-lg' 
                        : 'bg-gray-50 hover:bg-[#13B9D5]/10 hover:text-[#13B9D5]'
                    }`}
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '16px',
                      color: pathname === '/contact' ? '#ffffff' : '#1a1a2e',
                    }}
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            {/* Footer del menú - Fondo blanco */}
            <div className="p-6 bg-white border-t-2 border-gray-100 space-y-5" style={{ backgroundColor: '#ffffff' }}>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setLanguage(language === 'es' ? 'en' : 'es');
                  }}
                  className="flex items-center justify-center w-12 h-12 transition-all duration-300 hover:scale-110 overflow-hidden rounded-lg border-2 border-[#272F66]/20 hover:border-[#13B9D5] shadow-sm"
                  aria-label="Cambiar idioma"
                  title={language === 'es' ? 'Change to English' : 'Cambiar a Español'}
                >
                  {language === 'es' ? (
                    <ES className="w-full h-full object-cover" />
                  ) : (
                    <US className="w-full h-full object-cover" />
                  )}
                </button>
              </div>
              <Link
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full px-6 py-4 text-white bg-gradient-to-r from-[#272F66] to-[#1a2050] rounded-full font-bold hover:from-[#1e2547] hover:to-[#272F66] transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                style={{
                  fontFamily: 'var(--font-roboto), sans-serif',
                  fontSize: '16px',
                }}
              >
                Queremos Impulsarte
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div ref={heroContentRef} className="relative z-20 w-full h-full flex items-center justify-center pt-20 sm:pt-24 md:pt-0">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="w-full flex flex-col items-center justify-center">
            {/* Contenedor de texto - Centrado */}
            <div 
              className="w-full max-w-4xl text-center"
            >
          {/* Texto superior - Badge Style */}
          <div 
            ref={heroTopTextRef}
            className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 inline-flex items-center gap-1.5 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-full"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(39, 47, 102, 0.2)',
              boxShadow: '0 2px 8px rgba(39, 47, 102, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)',
              opacity: 1,
              visibility: 'visible',
              pointerEvents: 'auto',
              position: 'relative',
              zIndex: 10
            }}
          >
            {/* Punto azul brillante */}
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#4A90E2',
                boxShadow: '0 0 6px rgba(74, 144, 226, 0.6), 0 0 10px rgba(74, 144, 226, 0.4)',
                flexShrink: 0
              }}
            />
            {/* Texto */}
            <p 
              style={{ 
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: 'clamp(7px, 1vw, 10px)',
                fontWeight: 500,
                letterSpacing: '0.05em',
                color: '#272F66',
                lineHeight: '1.4',
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              Logramos éxitos empresariales a través de medios digitales
            </p>
          </div>

          {/* Título principal */}
          <h1 
            ref={heroTitleRef}
            className="mb-2 sm:mb-3 md:mb-4 lg:mb-6 uppercase text-center"
            style={{ 
              fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif',
              fontSize: 'clamp(32px, 6vw, 76px)',
              fontWeight: 'normal',
              letterSpacing: '0.02em',
              lineHeight: '1.15',
              color: '#ffffff',
              opacity: 1,
              visibility: 'visible',
              pointerEvents: 'auto',
              position: 'relative',
              zIndex: 10,
              userSelect: 'text',
              WebkitUserSelect: 'text',
              MozUserSelect: 'text',
              msUserSelect: 'text',
              textTransform: 'uppercase',
              textAlign: 'center',
              width: '100%'
            }}
          >
            CONVERTIMOS CLICS EN CLIENTES
          </h1>

          {/* Subtítulo */}
          <p 
            ref={heroSubtitleRef}
            className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 max-w-2xl mx-auto"
            style={{ 
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: 'clamp(14px, 2vw, 18px)',
              fontWeight: 400,
              lineHeight: '1.5',
              color: '#ffffff',
              opacity: 1,
              visibility: 'visible',
              pointerEvents: 'auto',
              position: 'relative',
              zIndex: 10,
              userSelect: 'text',
              WebkitUserSelect: 'text',
              MozUserSelect: 'text',
              msUserSelect: 'text',
              textAlign: 'center'
            }}
          >
            Impulsa el crecimiento de tu empresa con nosotros
          </p>

          {/* Botones CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {/* Botón Principal */}
            <a
              ref={heroButtonRef}
              href="#second"
              className="inline-flex items-center justify-center transition-all duration-300"
              style={{ 
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: 'clamp(14px, 1.2vw, 16px)',
                fontWeight: 600,
                color: '#ffffff',
                textDecoration: 'none',
                opacity: 1,
                visibility: 'visible',
                backgroundColor: '#272F66',
                padding: 'clamp(12px, 1.4vw, 14px) clamp(28px, 3.5vw, 32px)',
                borderRadius: '9999px',
                boxShadow: '0 2px 8px rgba(39, 47, 102, 0.2)',
                minWidth: '160px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1e2547';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(39, 47, 102, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#272F66';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(39, 47, 102, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Actúa y Crece
            </a>

            {/* Botón Portafolio */}
            <a
              href="#fourth"
              className="inline-flex items-center justify-center transition-all duration-300"
              style={{ 
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: 'clamp(14px, 1.2vw, 16px)',
                fontWeight: 600,
                color: '#ff9001',
                textDecoration: 'none',
                opacity: 1,
                visibility: 'visible',
                backgroundColor: 'transparent',
                border: '2px solid #ff9001',
                padding: 'clamp(12px, 1.4vw, 14px) clamp(28px, 3.5vw, 32px)',
                borderRadius: '9999px',
                boxShadow: '0 2px 8px rgba(255, 144, 1, 0.2)',
                minWidth: '160px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ff9001';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 144, 1, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#ff9001';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 144, 1, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Portafolio
            </a>
          </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
