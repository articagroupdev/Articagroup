'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ES from 'country-flag-icons/react/3x2/ES';
import US from 'country-flag-icons/react/3x2/US';
import { useLanguage } from '../contexts/LanguageContext';
import './HeroScrollEffect.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function HeroScrollEffect() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { language, setLanguage, t, isReady } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // Función para navegar desde el menú móvil
  const handleMobileNavigation = (href: string) => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    router.push(href);
  };
  
  // URL de Cloudinary para el video de fondo
  const videoSrc = 'https://res.cloudinary.com/dobuhpxof/video/upload/v1768399825/fondo-video_wnjx85.mp4';
  
  // Refs para la animaci?n de scroll
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContentWrapperRef = useRef<HTMLDivElement>(null);
  const heroTextContentRef = useRef<HTMLDivElement>(null);
  const targetSlotRef = useRef<HTMLDivElement>(null);
  const targetSlotContentRef = useRef<HTMLDivElement>(null);
  
  // Refs existentes del Hero
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLUListElement>(null);
  const navButtonsRef = useRef<HTMLDivElement>(null);
  const heroTopTextRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroButtonRef = useRef<HTMLAnchorElement>(null);
  const heroPortfolioButtonRef = useRef<HTMLAnchorElement>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Limpiar ScrollTrigger al cambiar de página
  useEffect(() => {
    // Deshabilitar restauración de scroll del navegador
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Solo limpiar ScrollTriggers del hero, no todos
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === heroSectionRef.current) {
        trigger.kill();
      }
    });
    
    // Scroll al inicio cuando el componente se monta
    window.scrollTo(0, 0);
    
    // Pequeño delay para asegurar que el DOM esté listo antes del refresh
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 50);
    
    return () => {
      clearTimeout(refreshTimer);
      // Solo limpiar ScrollTriggers del hero al desmontar
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === heroSectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [pathname]);

  // Animaci?n inicial del Hero
  useEffect(() => {
    if (!isReady) return;
    
    const ctx = gsap.context(() => {
      // Animaci?n de la navegaci?n
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

      // Animaci?n del contenido del Hero
      if (heroTextContentRef.current) {
        gsap.set([heroTopTextRef.current, heroTitleRef.current, heroSubtitleRef.current, heroButtonRef.current, heroPortfolioButtonRef.current], {
          opacity: 0,
          y: 30,
          visibility: 'visible',
        });

        gsap.to([heroTopTextRef.current, heroTitleRef.current, heroSubtitleRef.current, heroButtonRef.current, heroPortfolioButtonRef.current], {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.1,
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, [isReady]);

  // Animaci?n del ScrollTrigger - El efecto principal
  useEffect(() => {
    if (!isReady || typeof window === 'undefined') return;
    
    // Limpiar cualquier ScrollTrigger existente antes de crear nuevos
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    // Resetear scroll al inicio cuando se monta el componente
    window.scrollTo(0, 0);
    
    // Deshabilitar la restauración de scroll del navegador
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    const heroContent = heroContentWrapperRef.current;
    const heroText = heroTextContentRef.current;
    const targetSlot = targetSlotRef.current;
    const targetContent = targetSlotContentRef.current;
    
    if (!heroContent || !heroText || !targetSlot || !targetContent) return;

    // Resetear estilos inline antes de iniciar la animación
    gsap.set(heroContent, {
      clearProps: 'all'
    });
    gsap.set(heroText, {
      clearProps: 'all'
    });
    gsap.set(targetContent, {
      clearProps: 'all'
    });
    
    // Refrescar ScrollTrigger después de limpiar
    ScrollTrigger.refresh(true);

    let tl: gsap.core.Timeline | null = null;
    let resizeTimer: NodeJS.Timeout;
    let handleResize: (() => void) | null = null;
    let isMounted = true;

    // Pequeño delay para asegurar que el DOM esté listo
    const timer = setTimeout(() => {
      // Verificar que el componente siga montado
      if (!isMounted) return;
      // Verificar que targetSlot no sea null antes de usarlo
      if (!targetSlot) return;
      
      // Crear una referencia local no-null para TypeScript
      const slot = targetSlot;
      
      // Funci?n para calcular la distancia del pin
      function calculatePinDistance() {
        const viewportHeight = window.innerHeight;
        const targetRect = slot.getBoundingClientRect();
        const targetTopRelativeToPage = window.scrollY + targetRect.top;
        const targetHeight = targetRect.height;
        
        const targetCenterInViewport = (viewportHeight / 2) - (targetHeight / 2);
        const distanceToTravel = targetTopRelativeToPage - targetCenterInViewport;
        
        return distanceToTravel;
      }
      
      // Funci?n para calcular la transformaci?n final
      function calculateFinalTransform() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        const targetRect = slot.getBoundingClientRect();
        const targetHeight = targetRect.height;
        const targetWidth = targetRect.width;
        
        const pinDistance = calculatePinDistance();
        
        const targetFinalTop = targetRect.top - pinDistance;
        const targetFinalLeft = targetRect.left;
        
        const scaleX = targetWidth / viewportWidth;
        const scaleY = targetHeight / viewportHeight;
        const scale = Math.min(scaleX, scaleY);
        
        const viewportCenterX = viewportWidth / 2;
        const viewportCenterY = viewportHeight / 2;
        
        const targetFinalCenterX = targetFinalLeft + (targetWidth / 2);
        const targetFinalCenterY = targetFinalTop + (targetHeight / 2);
        
        const translateX = targetFinalCenterX - viewportCenterX;
        const translateY = targetFinalCenterY - viewportCenterY;
        
        // Border radius responsive
        const borderRadius = viewportWidth <= 768 ? '12px' : '16px';
        
        return { scale, translateX, translateY, borderRadius };
      }
      
      let pinDistance = calculatePinDistance();
      const finalTransform = calculateFinalTransform();
      
      // En móvil, reducir la distancia de pin para que la animación sea más rápida
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        pinDistance = pinDistance * 0.5; // 50% de la distancia original en móvil
      }
      
      // Timeline principal
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: `+=${pinDistance}`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          markers: false,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Controlar SOLO la visibilidad de la navegación
            if (navRef.current) {
              if (self.progress > 0.05 && self.progress < 0.95) {
                // Durante la animación: ocultar
                gsap.to(navRef.current, { opacity: 0, duration: 0.2 });
              } else {
                // Antes o después de la animación: mostrar
                gsap.to(navRef.current, { opacity: 1, duration: 0.3 });
              }
            }
          }
        }
      });
      
      // 1. Fade out del texto del hero
      tl.to(heroText, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.in',
        force3D: true,
      }, 0);
      
      // 2. Transformaci?n del hero hacia el slot objetivo
      tl.to(heroContent, {
        scale: finalTransform.scale,
        x: finalTransform.translateX,
        y: finalTransform.translateY,
        borderRadius: finalTransform.borderRadius,
        duration: 1,
        ease: 'power2.inOut',
        force3D: true,
      }, 0.15);
      
      // 3. Fade in del contenido del target slot
      tl.to(targetContent, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        force3D: true,
      }, 0.8);
      
      // Recalcular en resize
      handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 250);
      };
      
      window.addEventListener('resize', handleResize);
    }, 100);
    
    // Cleanup function
    return () => {
      isMounted = false;
      clearTimeout(timer);
      
      if (handleResize) {
        window.removeEventListener('resize', handleResize);
      }
      
      if (tl) {
        tl.kill();
      }
      
      // Limpiar todos los ScrollTriggers
      ScrollTrigger.getAll().forEach(st => st.kill());
      
      // Limpiar memoria de scroll para evitar saltos
      ScrollTrigger.clearScrollMemory();
      
      // Resetear estilos inline al desmontar
      if (heroContent) {
        gsap.set(heroContent, { clearProps: 'all' });
      }
      if (heroText) {
        gsap.set(heroText, { clearProps: 'all' });
      }
      if (targetContent) {
        gsap.set(targetContent, { clearProps: 'all' });
      }
      if (navRef.current) {
        gsap.set(navRef.current, { clearProps: 'opacity' });
      }
    };
  }, [isReady]);

  // Animaci?n del mega men?
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
    }
  }, [isServicesOpen]);

  // Efecto de scroll en la navegaci?n
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const isMobile = window.innerWidth < 1024;
    
    // Verificar estado inicial del scroll
    const checkInitialScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        setIsScrolled(true);
        if (navRef.current) {
          gsap.set(navRef.current, {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          });
        }
      } else {
        setIsScrolled(false);
        if (navRef.current) {
          gsap.set(navRef.current, {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          });
        }
      }
    };
    
    if (isMobile) {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
          setIsScrolled(true);
          if (navRef.current) {
            gsap.to(navRef.current, {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              duration: 0.3,
            });
          }
        } else {
          setIsScrolled(false);
          if (navRef.current) {
            gsap.to(navRef.current, {
              backgroundColor: 'transparent',
              boxShadow: 'none',
              duration: 0.3,
            });
          }
        }
      };

      checkInitialScroll();
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      // Listener de scroll adicional como respaldo
      const handleScrollDesktop = () => {
        const scrollY = window.scrollY;
        if (scrollY > 80) {
          setIsScrolled(true);
          if (navRef.current) {
            gsap.to(navRef.current, {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              duration: 0.3,
            });
          }
        } else {
          setIsScrolled(false);
          if (navRef.current) {
            gsap.to(navRef.current, {
              backgroundColor: 'transparent',
              boxShadow: 'none',
              duration: 0.3,
            });
          }
        }
      };

      // Verificar estado inicial
      checkInitialScroll();
      
      // Agregar listener de scroll
      window.addEventListener('scroll', handleScrollDesktop, { passive: true });

      // Delay para asegurar que el ScrollTrigger del hero esté listo
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', handleScrollDesktop);
      };
    }
  }, []);

  // Prevenir scroll del body cuando el men? est? abierto
  useEffect(() => {
    if (isMenuOpen) {
      // Guardar la posición actual del scroll
      const scrollY = window.scrollY;
      
      // Bloquear scroll del body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Prevenir scroll en el html también
      document.documentElement.style.overflow = 'hidden';
      
      // Prevenir eventos de touch que puedan causar scroll
      const preventScroll = (e: TouchEvent) => {
        // Solo prevenir si el touch no es dentro del menú móvil
        const target = e.target as HTMLElement;
        const mobileMenu = mobileMenuRef.current;
        
        if (mobileMenu && !mobileMenu.contains(target)) {
          e.preventDefault();
        }
      };
      
      // Agregar listener para prevenir scroll en el body
      document.addEventListener('touchmove', preventScroll, { passive: false });
      
      return () => {
        // Restaurar scroll del body
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        
        // Remover listener
        document.removeEventListener('touchmove', preventScroll);
        
        // Restaurar la posición del scroll
        window.scrollTo(0, scrollY);
      };
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [isMenuOpen]);

  // Establecer fondo blanco del body y html
  useEffect(() => {
    // Guardar los colores originales
    const originalBodyBg = document.body.style.backgroundColor;
    const originalHtmlBg = document.documentElement.style.backgroundColor;
    
    // Establecer fondo blanco
    document.body.style.backgroundColor = '#ffffff';
    document.documentElement.style.backgroundColor = '#ffffff';
    
    return () => {
      // Restaurar los colores originales al desmontar
      document.body.style.backgroundColor = originalBodyBg;
      document.documentElement.style.backgroundColor = originalHtmlBg;
    };
  }, []);

  // Cargar video
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const loadVideo = async () => {
        try {
          // Resetear el error antes de intentar cargar
          setVideoError(false);
          video.load();
          
          await new Promise((resolve, reject) => {
            const onLoadedMetadata = () => {
              video.removeEventListener('loadedmetadata', onLoadedMetadata);
              video.removeEventListener('error', onError);
              setVideoError(false);
              resolve(true);
            };
            const onError = () => {
              video.removeEventListener('loadedmetadata', onLoadedMetadata);
              video.removeEventListener('error', onError);
              setVideoError(true);
              reject(new Error('Video load error'));
            };
            
            if (video.readyState >= 1) {
              setVideoError(false);
              resolve(true);
            } else {
              video.addEventListener('loadedmetadata', onLoadedMetadata);
              video.addEventListener('error', onError);
              
              setTimeout(() => {
                video.removeEventListener('loadedmetadata', onLoadedMetadata);
                video.removeEventListener('error', onError);
                if (video.readyState < 1) {
                  setVideoError(true);
                  reject(new Error('Video load timeout'));
                }
              }, 5000);
            }
          });
          
          const playPromise = video.play();
          if (playPromise !== undefined) {
            await playPromise;
            setVideoError(false);
          }
        } catch (error) {
          console.error('Error loading/playing video:', error);
          setVideoError(true);
        }
      };
      
      loadVideo();
    }
  }, []);

  return (
    <>
      {/* Navegación - Completamente independiente */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[9999] px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-2 sm:py-3 md:py-4 transition-all duration-300 bg-transparent lg:bg-transparent shadow-none lg:shadow-none"
        style={{ overflow: 'visible' }}
      >
              <div className="max-w-7xl mx-auto w-full flex items-center justify-between" style={{ overflow: 'visible' }}>
                {/* Logo y Links de navegaci?n - Izquierda */}
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

                  {/* Links de navegaci?n */}
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
                        {t('nav.inicio')}
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
                        {t('nav.sobreNosotros')}
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
                        {t('nav.servicios')}
                        <svg 
                          className={`ml-1 w-3 h-3 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Mega Menu - COPIA COMPLETA DEL ORIGINAL */}
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
                                <h3 className="font-bold text-sm mb-0.5" style={{ textShadow: 'none', color: '#272F66', fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold', lineHeight: '1.3', wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                                  {t('services.desarrolloWeb')}
                                </h3>
                                <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none', lineHeight: '1.4', wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                                  {t('services.desarrolloWebDesc')}
                                </p>
                              </Link>

                              <Link href="/services/diseno-grafico" className="block transition-all duration-200 hover:translate-x-1 shadow-none" style={{ boxShadow: 'none', textDecoration: 'none', textShadow: 'none' }}>
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                                  <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                  </svg>
                                </div>
                                <h3 className="font-bold text-sm mb-0.5" style={{ textShadow: 'none', color: '#272F66', fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold', lineHeight: '1.3', wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                                  {t('services.disenoGrafico')}
                                </h3>
                                <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none', lineHeight: '1.4', wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                                  {t('services.disenoGraficoDesc')}
                                </p>
                              </Link>

                              <Link href="/services/posicionamiento-comunicacion" className="block transition-all duration-200 hover:translate-x-1 shadow-none" style={{ boxShadow: 'none', textDecoration: 'none', textShadow: 'none' }}>
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                                  <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                  </svg>
                                </div>
                                <h3 className="font-bold text-sm mb-0.5" style={{ textShadow: 'none', color: '#272F66', fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold', lineHeight: '1.3', wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                                  {t('services.posicionamientoComunicacion')}
                                </h3>
                                <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none', lineHeight: '1.4', wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                                  {t('services.posicionamientoComunicacionDesc')}
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
                                <h3 className="font-bold text-sm mb-0.5" style={{ textShadow: 'none', color: '#272F66', fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold', lineHeight: '1.3', wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                                  {t('services.edicionVideos')}
                                </h3>
                                <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none', lineHeight: '1.4', wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                                  {t('services.edicionVideosDesc')}
                                </p>
                              </Link>

                              <Link href="/services/publicidad-online" className="block transition-all duration-200 hover:translate-x-1 shadow-none" style={{ boxShadow: 'none', textDecoration: 'none', textShadow: 'none' }}>
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                                  <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                  </svg>
                                </div>
                                <h3 className="font-bold text-sm mb-0.5" style={{ textShadow: 'none', color: '#272F66', fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold', lineHeight: '1.3', wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                                  {t('services.publicidadOnline')}
                                </h3>
                                <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none', lineHeight: '1.4', wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                                  {t('services.publicidadOnlineDesc')}
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
                                <h3 className="font-bold text-sm mb-0.5" style={{ textShadow: 'none', color: '#272F66', fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold', lineHeight: '1.3', wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                                  {t('services.creacionContenido')}
                                </h3>
                                <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none', lineHeight: '1.4', wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                                  {t('services.creacionContenidoDesc')}
                                </p>
                              </Link>

                              <Link href="/services/campanas-ads" className="block transition-all duration-200 hover:translate-x-1 shadow-none" style={{ boxShadow: 'none', textDecoration: 'none', textShadow: 'none' }}>
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                                  <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                  </svg>
                                </div>
                                <h3 className="font-bold text-sm mb-0.5" style={{ textShadow: 'none', color: '#272F66', fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold', lineHeight: '1.3', wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                                  {t('services.campanasAds')}
                                </h3>
                                <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none', lineHeight: '1.4', wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                                  {t('services.campanasAdsDesc')}
                                </p>
                              </Link>

                              <Link href="/services/community-management" className="block transition-all duration-200 hover:translate-x-1 shadow-none" style={{ boxShadow: 'none', textDecoration: 'none', textShadow: 'none' }}>
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#13B9D5] mb-2 shadow-none" style={{ boxShadow: 'none' }}>
                                  <svg className="w-5 h-5 text-[#13B9D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                </div>
                                <h3 className="font-bold text-sm mb-0.5" style={{ textShadow: 'none', color: '#272F66', fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold', lineHeight: '1.3', wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                                  {t('services.communityManagement')}
                                </h3>
                                <p className="text-xs text-gray-500 leading-tight" style={{ textShadow: 'none', lineHeight: '1.4', wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                                  {t('services.communityManagementDesc')}
                                </p>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                    <li>
                      <Link
                        href="/portfolio"
                        className="font-bold transition-colors duration-200 text-xs xl:text-sm hover:text-[#13B9D5]"
                        style={{
                          color: isScrolled ? '#272F66' : '#ffffff',
                          textShadow: 'none',
                        }}
                      >
                        {t('nav.portafolio')}
                      </Link>
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
                        {t('nav.contacto')}
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Botones de navegaci?n - Derecha */}
                <div ref={navButtonsRef} className="flex items-center gap-2 xl:gap-3 flex-shrink-0">
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

                  <Link 
                    href="/contact"
                    className={`hidden lg:block px-4 xl:px-6 py-2.5 xl:py-3 rounded-full font-medium transition-all duration-300 text-xs xl:text-sm shadow-sm hover:shadow-md ${
                      isScrolled 
                        ? 'text-white bg-[#272F66] hover:bg-[#1e2547]' 
                        : 'text-[#272F66] bg-white hover:bg-gray-100'
                    }`}
                    style={{
                      color: isScrolled ? '#ffffff' : '#272F66',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '200px',
                    }}
                  >
                    {t('nav.queremosImpulsarte')}
                  </Link>

                  {/* Bot?n m?vil */}
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden p-2.5 hover:bg-gray-100 rounded-lg transition-all duration-200 font-bold group"
                    style={{
                      color: '#272F66',
                      textShadow: 'none',
                    }}
                    aria-label="Toggle menu"
                  >
                    <div className="relative w-6 h-5 flex flex-col justify-center items-center">
                      <span 
                        className={`absolute w-6 h-0.5 rounded-full transition-all duration-300 ${
                          isScrolled ? 'bg-[#272F66]' : 'bg-white group-hover:bg-[#272F66]'
                        } ${isMenuOpen ? 'rotate-45 top-2.5' : 'top-0'}`}
                      />
                      <span 
                        className={`absolute w-6 h-0.5 rounded-full transition-all duration-300 ${
                          isScrolled ? 'bg-[#272F66]' : 'bg-white group-hover:bg-[#272F66]'
                        } ${isMenuOpen ? 'opacity-0' : 'opacity-100 top-2'}`}
                      />
                      <span 
                        className={`absolute w-6 h-0.5 rounded-full transition-all duration-300 ${
                          isScrolled ? 'bg-[#272F66]' : 'bg-white group-hover:bg-[#272F66]'
                        } ${isMenuOpen ? '-rotate-45 top-2.5' : 'top-4'}`}
                      />
                    </div>
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
                onTouchMove={(e) => {
                  // Prevenir scroll cuando se toca el overlay
                  e.preventDefault();
                }}
                style={{
                  zIndex: 99998,
                  touchAction: 'none',
                }}
              />

              {/* Men? lateral m?vil - COPIA COMPLETA */}
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
                  overflowY: 'auto',
                  overscrollBehavior: 'contain',
                  WebkitOverflowScrolling: 'touch',
                }}
                onTouchMove={(e) => {
                  // Permitir scroll dentro del menú
                  e.stopPropagation();
                }}
              >
                {/* MEN? M?VIL COMPLETO - COPIADO DEL ORIGINAL */}
                <div 
                  className="flex flex-col bg-white" 
                  style={{ 
                    backgroundColor: '#ffffff', 
                    height: '100%', 
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                  }}
                >
                  {/* Header del men? */}
                  <div 
                    className="flex items-center justify-between px-6 py-5 bg-white border-b border-gray-200" 
                    style={{ 
                      backgroundColor: '#ffffff',
                      flexShrink: 0,
                    }}
                  >
                    <img 
                      src="/img/logo-artica-2.avif" 
                      alt="ARTICA" 
                      className="h-8 sm:h-10 w-auto"
                    />
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Cerrar men?"
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

                  {/* Contenido del men? */}
                  <div 
                    className="flex-1 overflow-y-auto bg-white px-5 py-6" 
                    style={{ 
                      backgroundColor: '#ffffff',
                      overflowY: 'auto',
                      overscrollBehavior: 'contain',
                      WebkitOverflowScrolling: 'touch',
                      flex: 1,
                      minHeight: 0,
                    }}
                    onTouchMove={(e) => {
                      // Permitir scroll dentro del contenedor
                      e.stopPropagation();
                    }}
                    onWheel={(e) => {
                      // Permitir scroll con rueda del mouse
                      e.stopPropagation();
                    }}
                  >
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
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                          }}
                        >
                          {t('nav.inicio')}
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
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                          }}
                        >
                          {t('nav.sobreNosotros')}
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
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                          }}
                        >
                          <span>{t('nav.servicios')}</span>
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
                          <ul className="mt-2 ml-2 space-y-1 border-l-2 border-[#13B9D5]/30 pl-4" style={{ position: 'relative', zIndex: 10 }}>
                            <li>
                              <button 
                                onClick={() => handleMobileNavigation('/services/desarrollo-web')} 
                                className="block w-full text-left py-3 px-2 hover:text-[#13B9D5] hover:bg-[#13B9D5]/5 rounded-lg transition-colors font-medium cursor-pointer" 
                                style={{ fontSize: '14px', color: '#1a1a2e', lineHeight: '1.4', wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}
                              >
                                {t('services.desarrolloWeb')}
                              </button>
                            </li>
                            <li>
                              <button 
                                onClick={() => handleMobileNavigation('/services/diseno-grafico')} 
                                className="block w-full text-left py-3 px-2 hover:text-[#13B9D5] hover:bg-[#13B9D5]/5 rounded-lg transition-colors font-medium cursor-pointer" 
                                style={{ fontSize: '14px', color: '#1a1a2e', lineHeight: '1.4', wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}
                              >
                                {t('services.disenoGrafico')}
                              </button>
                            </li>
                            <li>
                              <button 
                                onClick={() => handleMobileNavigation('/services/posicionamiento-comunicacion')} 
                                className="block w-full text-left py-3 px-2 hover:text-[#13B9D5] hover:bg-[#13B9D5]/5 rounded-lg transition-colors font-medium cursor-pointer" 
                                style={{ fontSize: '14px', color: '#1a1a2e', lineHeight: '1.4', wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}
                              >
                                {t('services.posicionamientoComunicacion')}
                              </button>
                            </li>
                            <li>
                              <button 
                                onClick={() => handleMobileNavigation('/services/edicion-videos')} 
                                className="block w-full text-left py-3 px-2 hover:text-[#13B9D5] hover:bg-[#13B9D5]/5 rounded-lg transition-colors font-medium cursor-pointer" 
                                style={{ fontSize: '14px', color: '#1a1a2e', lineHeight: '1.4', wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}
                              >
                                {t('services.edicionVideos')}
                              </button>
                            </li>
                            <li>
                              <button 
                                onClick={() => handleMobileNavigation('/services/publicidad-online')} 
                                className="block w-full text-left py-3 px-2 hover:text-[#13B9D5] hover:bg-[#13B9D5]/5 rounded-lg transition-colors font-medium cursor-pointer" 
                                style={{ fontSize: '14px', color: '#1a1a2e', lineHeight: '1.4', wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}
                              >
                                {t('services.publicidadOnline')}
                              </button>
                            </li>
                            <li>
                              <button 
                                onClick={() => handleMobileNavigation('/services/creacion-contenido')} 
                                className="block w-full text-left py-3 px-2 hover:text-[#13B9D5] hover:bg-[#13B9D5]/5 rounded-lg transition-colors font-medium cursor-pointer" 
                                style={{ fontSize: '14px', color: '#1a1a2e', lineHeight: '1.4', wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}
                              >
                                {t('services.creacionContenido')}
                              </button>
                            </li>
                            <li>
                              <button 
                                onClick={() => handleMobileNavigation('/services/campanas-ads')} 
                                className="block w-full text-left py-3 px-2 hover:text-[#13B9D5] hover:bg-[#13B9D5]/5 rounded-lg transition-colors font-medium cursor-pointer" 
                                style={{ fontSize: '14px', color: '#1a1a2e', lineHeight: '1.4', wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}
                              >
                                {t('services.campanasAds')}
                              </button>
                            </li>
                            <li>
                              <button 
                                onClick={() => handleMobileNavigation('/services/community-management')} 
                                className="block w-full text-left py-3 px-2 hover:text-[#13B9D5] hover:bg-[#13B9D5]/5 rounded-lg transition-colors font-medium cursor-pointer" 
                                style={{ fontSize: '14px', color: '#1a1a2e', lineHeight: '1.4', wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}
                              >
                                {t('services.communityManagement')}
                              </button>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li>
                        <Link
                          href="/portfolio"
                          onClick={() => setIsMenuOpen(false)}
                          className="block font-bold py-4 px-5 rounded-xl transition-all duration-200 bg-gray-50 hover:bg-[#13B9D5]/10 hover:text-[#13B9D5]"
                          style={{
                            fontFamily: 'var(--font-poppins), sans-serif',
                            fontSize: '16px',
                            color: '#1a1a2e',
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                          }}
                        >
                          {t('nav.portafolio')}
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
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                          }}
                        >
                          {t('nav.contacto')}
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Footer del men? */}
                  <div 
                    className="p-6 bg-white border-t-2 border-gray-100 space-y-5" 
                    style={{ 
                      backgroundColor: '#ffffff',
                      flexShrink: 0,
                    }}
                  >
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
                      href="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-6 py-4 text-white bg-gradient-to-r from-[#272F66] to-[#1a2050] rounded-full font-bold hover:from-[#1e2547] hover:to-[#272F66] transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                      style={{
                        fontFamily: 'var(--font-roboto), sans-serif',
                        fontSize: '16px',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                      }}
                    >
                      {t('nav.queremosImpulsarte')}
                    </Link>
                  </div>
                </div>
              </div>
            </nav>

      {/* Wrapper para el scroll effect */}
      <div className="scroll-effect-wrapper">
        <div className="scroll-effect-container">
          {/* Sección Hero */}
          <section
            ref={heroSectionRef}
            id="first"
            className="scroll-effect-hero"
          >
            <div
              ref={heroContentWrapperRef}
              className="scroll-effect-hero-content"
            >
              {/* Imagen de fondo como fallback - Solo se muestra cuando hay error */}
              {videoError && (
                <div 
                  className="scroll-effect-hero-bg"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(/img/fondo-hero1.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 0,
                  }}
                />
              )}
              
              {/* Video de fondo */}
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="scroll-effect-hero-bg-video"
                style={{
                  display: videoError ? 'none' : 'block',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: videoError ? -1 : 0,
                  transform: 'translate3d(0, 0, 0)',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
                onError={() => {
                  console.error('Error loading video');
                  setVideoError(true);
                }}
                onCanPlay={() => {
                  // Asegurarse de que el error se resetee si el video puede reproducirse
                  if (videoError) {
                    setVideoError(false);
                  }
                }}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>

              {/* Overlay oscuro */}
              <div className="scroll-effect-hero-overlay" />

            {/* Contenido del Hero */}
            <div
              ref={heroTextContentRef}
              className="scroll-effect-hero-text"
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
                  opacity: 0,
                  visibility: 'visible',
                }}
              >
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
                  {t('hero.badge')}
                </p>
              </div>

              {/* T?tulo principal */}
              <h1 
                ref={heroTitleRef}
                className="mb-2 sm:mb-3 md:mb-4 lg:mb-6 uppercase text-center"
                style={{ 
                  fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif',
                  fontSize: 'clamp(28px, 5vw, 64px)',
                  fontWeight: 'normal',
                  letterSpacing: '0.01em',
                  lineHeight: '1.1',
                  color: '#ffffff',
                  opacity: 0,
                  visibility: 'visible',
                  whiteSpace: 'normal',
                  wordBreak: 'normal',
                }}
              >
                {t('hero.title')}
              </h1>

              {/* Subt?tulo */}
              <p 
                ref={heroSubtitleRef}
                className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 max-w-2xl mx-auto"
                style={{ 
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: 'clamp(14px, 2vw, 18px)',
                  fontWeight: 400,
                  lineHeight: '1.5',
                  color: '#ffffff',
                  opacity: 0,
                  visibility: 'visible',
                }}
              >
                {t('hero.subtitle')}
              </p>

              {/* Botones CTA */}
              <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4">
                <a
                  ref={heroButtonRef}
                  href="/contact"
                  className="inline-flex items-center justify-center transition-all duration-300"
                  style={{ 
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: 'clamp(12px, 1vw, 16px)',
                    fontWeight: 600,
                    color: '#ffffff',
                    textDecoration: 'none',
                    opacity: 0,
                    visibility: 'visible',
                    backgroundColor: '#272F66',
                    padding: 'clamp(10px, 1.2vw, 14px) clamp(20px, 2.5vw, 32px)',
                    borderRadius: '9999px',
                    boxShadow: '0 2px 8px rgba(39, 47, 102, 0.2)',
                    minWidth: 'auto',
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
                  {t('nav.actuaYCrece')}
                </a>

                <Link
                  ref={heroPortfolioButtonRef}
                  href="/portfolio"
                  className="inline-flex items-center justify-center transition-all duration-300"
                  style={{ 
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: 'clamp(12px, 1vw, 16px)',
                    fontWeight: 600,
                    color: '#ffffff',
                    textDecoration: 'none',
                    opacity: 0,
                    visibility: 'visible',
                    backgroundColor: '#ff9001',
                    border: '2px solid #ff9001',
                    padding: 'clamp(10px, 1.2vw, 14px) clamp(20px, 2.5vw, 32px)',
                    borderRadius: '9999px',
                    boxShadow: '0 2px 8px rgba(255, 144, 1, 0.2)',
                    minWidth: 'auto',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e67e00';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 144, 1, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ff9001';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 144, 1, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Portafolio
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Slot invisible para la animación */}
        <div style={{ 
          position: 'relative',
          height: '1px',
          overflow: 'visible'
        }}>
          {/* Slot objetivo para la animación */}
          <div
            ref={targetSlotRef}
            style={{
              position: 'absolute',
              top: '50vh',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(750px, 85vw)',
              height: 'min(420px, 45vh)',
              opacity: 0,
              pointerEvents: 'none'
            }}
          >
            <div ref={targetSlotContentRef}></div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
