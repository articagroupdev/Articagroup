'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ES from 'country-flag-icons/react/3x2/ES';
import US from 'country-flag-icons/react/3x2/US';

gsap.registerPlugin(ScrollTrigger);

export default function AboutHeroNew() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLUListElement>(null);
  const navButtonsRef = useRef<HTMLDivElement>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const heroTextTitleRef = useRef<HTMLHeadingElement>(null);
  const heroTaglineRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLElement>(null);

  // Resetear el menú cuando cambia la ruta
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  // Cerrar el menú de servicios al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        servicesMenuRef.current &&
        !servicesMenuRef.current.contains(target) &&
        !target.closest('li.relative') &&
        !target.closest('button')
      ) {
        setIsServicesOpen(false);
      }
    };

    if (isServicesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isServicesOpen]);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de la navegación
      if (navRef.current) {
        gsap.set([logoRef.current, navLinksRef.current, navButtonsRef.current], {
          opacity: 1,
          y: 0,
        });

        // Solo aplicar en desktop (lg y superior)
        if (window.innerWidth >= 1024) {
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
      }

      // Animación del texto hero
      if (heroTextTitleRef.current && heroTaglineRef.current) {
        gsap.set([heroTextTitleRef.current, heroTaglineRef.current], {
          opacity: 0,
          y: 30,
        });

        const heroTL = gsap.timeline({
          defaults: { ease: 'power2.out' },
          scrollTrigger: {
            trigger: heroTextTitleRef.current,
            start: 'top 100%',
            end: 'top 60%',
            scrub: 1.5,
          },
        });
        
        heroTL.to(heroTextTitleRef.current, {
          duration: 1.5,
          opacity: 1,
          y: 0,
        });

        heroTL.to(heroTaglineRef.current, {
          duration: 1.5,
          opacity: 1,
          y: 0,
        }, '-=0.8');
      }

      // Animación del video con scroll
      if (videoRef.current && videoContainerRef.current) {
        gsap.set(videoRef.current, { width: '50%' });
        gsap.to(videoRef.current, {
          width: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: videoContainerRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
          },
        });
      }
    }, navRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative w-full bg-white overflow-x-hidden" style={{ minHeight: '100vh' }}>
      {/* Navegación */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[9999] px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 transition-all duration-300 bg-white lg:bg-transparent shadow-sm lg:shadow-none"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div ref={logoRef} className="flex items-center">
            <Link href="/" className="flex items-center">
              <img 
                src="/img/logo-artica-2.avif" 
                alt="ARTICA" 
                className="h-8 sm:h-10 md:h-12 w-auto"
              />
            </Link>
          </div>

          {/* Links de navegación */}
          <ul
            ref={navLinksRef}
            className="hidden lg:flex items-center space-x-4 xl:space-x-5"
          >
            <li>
              <Link
                href="/"
                className={`font-bold transition-colors duration-200 text-xs xl:text-sm hover:text-[#13B9D5] ${
                  pathname === '/' ? 'text-[#13B9D5]' : ''
                }`}
                style={{
                  color: pathname === '/' ? '#13B9D5' : '#272F66',
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
                  color: pathname === '/about' ? '#13B9D5' : '#272F66',
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
                className="font-bold transition-colors duration-200 inline-flex items-center text-xs xl:text-sm cursor-pointer hover:text-[#13B9D5]"
                style={{
                  color: isServicesOpen ? '#13B9D5' : '#272F66',
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
                  className="absolute top-full left-1/2 mt-6 w-[95vw] max-w-[1200px] bg-white rounded-2xl border border-gray-200 p-5 md:p-6 shadow-none"
                  style={{
                    zIndex: 10000,
                    boxShadow: 'none',
                  }}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <div className="grid grid-cols-3 gap-x-6 gap-y-3">
                    {/* Columna 1 */}
                    <div className="space-y-3">
                      <a href="#servicio-web" className="block shadow-none" style={{ boxShadow: 'none', textDecoration: 'none', textShadow: 'none' }}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                          <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-black text-sm mb-0.5" style={{ textShadow: 'none' }}>
                          Desarrollo Web
                        </h3>
                        <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none' }}>
                          Sitios web modernos y funcionales
                        </p>
                      </a>

                      <a href="#servicio-diseno" className="block transition-all duration-200 hover:translate-x-1 shadow-none" style={{ boxShadow: 'none' }}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                          <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-black text-sm mb-0.5" style={{ textShadow: 'none' }}>
                          Diseño Gráfico
                        </h3>
                        <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none' }}>
                          Identidad visual y diseño creativo
                        </p>
                      </a>

                      <a href="#servicio-estrategia" className="block transition-all duration-200 hover:translate-x-1 shadow-none" style={{ boxShadow: 'none' }}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                          <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-black text-sm mb-0.5" style={{ textShadow: 'none' }}>
                          Estrategia Posicionamiento y Comunicación
                        </h3>
                        <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none' }}>
                          Estrategias integrales de marca y comunicación
                        </p>
                      </a>
                    </div>

                    {/* Columna 2 */}
                    <div className="space-y-3">
                      <a href="#servicio-video" className="block transition-all duration-200 hover:translate-x-1 shadow-none" style={{ boxShadow: 'none' }}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                          <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-black text-sm mb-0.5" style={{ textShadow: 'none' }}>
                          Edición de Videos
                        </h3>
                        <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none' }}>
                          Producción y edición profesional de video
                        </p>
                      </a>

                      <a href="#servicio-publicidad" className="block transition-all duration-200 hover:translate-x-1 shadow-none" style={{ boxShadow: 'none' }}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                          <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-black text-sm mb-0.5" style={{ textShadow: 'none' }}>
                          Publicidad Online
                        </h3>
                        <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none' }}>
                          Campañas publicitarias digitales efectivas
                        </p>
                      </a>
                    </div>

                    {/* Columna 3 */}
                    <div className="space-y-3">
                      <Link href="/services/creacion-contenido" className="block shadow-none" style={{ boxShadow: 'none', textDecoration: 'none', textShadow: 'none' }}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                          <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-black text-sm mb-0.5" style={{ textShadow: 'none' }}>
                          Creación de Contenido
                        </h3>
                        <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none' }}>
                          Contenido visual atractivo para tu marca
                        </p>
                      </Link>

                      <a href="#servicio-ads" className="block transition-all duration-200 hover:translate-x-1 shadow-none" style={{ boxShadow: 'none' }}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                          <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-black text-sm mb-0.5" style={{ textShadow: 'none' }}>
                          Campañas de Ads
                        </h3>
                        <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none' }}>
                          Publicidad efectiva en redes sociales
                        </p>
                      </a>

                      <a href="#servicio-community" className="block transition-all duration-200 hover:translate-x-1 shadow-none" style={{ boxShadow: 'none' }}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                          <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-black text-sm mb-0.5" style={{ textShadow: 'none' }}>
                          Community Management
                        </h3>
                        <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none' }}>
                          Gestión profesional de comunidades online
                        </p>
                      </a>
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
                  color: '#272F66',
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
                  color: pathname === '/contact' ? '#13B9D5' : '#272F66',
                  textShadow: 'none',
                }}
              >
                Contacto
              </Link>
            </li>
          </ul>

          {/* Botones de navegación */}
          <div ref={navButtonsRef} className="flex items-center space-x-3 xl:space-x-4">
            {/* Selector de idioma */}
            <button
              onClick={() => {
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

            <button className="hidden lg:block px-6 xl:px-7 py-2.5 xl:py-3 text-white bg-[#272F66] rounded-full font-medium hover:bg-[#1e2547] transition-all duration-300 text-xs xl:text-sm shadow-sm hover:shadow-md">
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
                src="/img/logo-artica-2.avif" 
                alt="ARTICA" 
                className="h-8 sm:h-10 w-auto"
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
                      fontFamily: 'var(--font-roboto), sans-serif',
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
                      fontFamily: 'var(--font-roboto), sans-serif',
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
                      fontFamily: 'var(--font-roboto), sans-serif',
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
                        <a href="#servicio-web" onClick={() => setIsMenuOpen(false)} className="block py-2.5 hover:text-[#13B9D5] transition-colors font-medium" style={{ fontSize: '14px', color: '#1a1a2e' }}>
                          Desarrollo Web
                        </a>
                      </li>
                      <li>
                        <a href="#servicio-diseno" onClick={() => setIsMenuOpen(false)} className="block py-2.5 hover:text-[#13B9D5] transition-colors font-medium" style={{ fontSize: '14px', color: '#1a1a2e' }}>
                          Diseño Gráfico
                        </a>
                      </li>
                      <li>
                        <a href="#servicio-estrategia" onClick={() => setIsMenuOpen(false)} className="block py-2.5 hover:text-[#13B9D5] transition-colors font-medium" style={{ fontSize: '14px', color: '#1a1a2e' }}>
                          Estrategia
                        </a>
                      </li>
                      <li>
                        <a href="#servicio-video" onClick={() => setIsMenuOpen(false)} className="block py-2.5 hover:text-[#13B9D5] transition-colors font-medium" style={{ fontSize: '14px', color: '#1a1a2e' }}>
                          Edición de Videos
                        </a>
                      </li>
                      <li>
                        <a href="#servicio-publicidad" onClick={() => setIsMenuOpen(false)} className="block py-2.5 hover:text-[#13B9D5] transition-colors font-medium" style={{ fontSize: '14px', color: '#1a1a2e' }}>
                          Publicidad Online
                        </a>
                      </li>
                      <li>
                        <Link href="/services/creacion-contenido" onClick={() => setIsMenuOpen(false)} className="block py-2.5 hover:text-[#13B9D5] transition-colors font-medium" style={{ fontSize: '14px', color: '#1a1a2e' }}>
                          Creación de Contenido
                        </Link>
                      </li>
                      <li>
                        <a href="#servicio-ads" onClick={() => setIsMenuOpen(false)} className="block py-2.5 hover:text-[#13B9D5] transition-colors font-medium" style={{ fontSize: '14px', color: '#1a1a2e' }}>
                          Campañas de Ads
                        </a>
                      </li>
                      <li>
                        <a href="#servicio-community" onClick={() => setIsMenuOpen(false)} className="block py-2.5 hover:text-[#13B9D5] transition-colors font-medium" style={{ fontSize: '14px', color: '#1a1a2e' }}>
                          Community Management
                        </a>
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
                      fontFamily: 'var(--font-roboto), sans-serif',
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
                      fontFamily: 'var(--font-roboto), sans-serif',
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

      {/* Hero Text Container */}
      <main 
        className="w-full h-screen flex flex-col items-center justify-center z-10 relative overflow-hidden" 
        style={{ 
          minHeight: '100vh', 
          pointerEvents: 'auto',
          backgroundImage: 'url(/img/fondo-3.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#212121'
        }}
      >
        <div className="w-full flex flex-col items-center justify-center px-4 max-w-4xl mx-auto" style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}>
          {/* Badge superior */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-[#ff9001]/10 rounded-full border border-[#ff9001]/20"
            style={{
              pointerEvents: 'auto',
              position: 'relative',
              zIndex: 10
            }}
          >
            <div className="w-2 h-2 rounded-full bg-[#ff9001] animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-[#ff9001] uppercase tracking-wider">
              Sobre Nosotros
            </span>
          </div>

          <h1
            ref={heroTextTitleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#272F66] mb-6 sm:mb-8 leading-tight tracking-tight text-center"
            style={{ 
              fontFamily: 'var(--font-roboto), sans-serif',
              fontWeight: 900,
              color: '#272F66',
              pointerEvents: 'auto',
              position: 'relative',
              zIndex: 10,
              userSelect: 'text',
              WebkitUserSelect: 'text',
              MozUserSelect: 'text',
              msUserSelect: 'text',
              opacity: 0,
              transform: 'translateY(30px)'
            }}
          >
            Modelo Artica
          </h1>
          <p
            ref={heroTaglineRef}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#272F66] font-light max-w-3xl mx-auto leading-relaxed text-center"
            style={{ 
              fontFamily: 'var(--font-roboto), sans-serif',
              color: '#272F66',
              pointerEvents: 'auto',
              position: 'relative',
              zIndex: 10,
              opacity: 0,
              transform: 'translateY(30px)',
              userSelect: 'text',
              WebkitUserSelect: 'text',
              MozUserSelect: 'text',
              msUserSelect: 'text'
            }}
          >
            Conócenos y Descubre cómo podemos impulsar el crecimiento de tu marca
          </p>
        </div>
        
        {/* Degradado suave en la parte inferior para eliminar la línea divisoria */}
        <div 
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: 'clamp(80px, 15vh, 150px)',
            background: 'linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 30%, rgba(255, 255, 255, 0.4) 60%, rgba(255, 255, 255, 0) 100%)',
            pointerEvents: 'none',
            zIndex: 5,
          }}
        />
      </main>

      {/* Video Container - Fuera del hero, después de la pantalla completa */}
      <section
        ref={videoContainerRef}
        className="w-full min-h-[67vh] bg-white flex justify-center items-center overflow-hidden relative"
        id="video_container"
      >
        <video
          ref={videoRef}
          src="/img/video-nosotros.mp4"
          muted
          autoPlay
          loop
          playsInline
          className="h-auto max-w-full"
          style={{ 
            width: '50%',
            minWidth: '50%',
            maxWidth: '100%'
          }}
        />
      </section>

      <style jsx>{`
        @media screen and (max-width: 720px) {
          #video_container {
            min-height: 50vh;
          }
          
          #video_container video {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
