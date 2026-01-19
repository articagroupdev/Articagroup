'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MdStar, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  text: string;
  profileImage?: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Jose Herrera',
    date: 'hace 1 año',
    rating: 5,
    text: 'What a great experience with the exceptional team of Artica! From the day I reached out to the days following project completion, the service was unmatched. The product goes beyond my expectations, I definitely recommend these guys! If you\'re looking to bring your vision to life in the most spectacular way possible, Artica is the team to trust.',
  },
  {
    id: 2,
    name: 'Kevin Fernandez',
    date: 'hace 1 año',
    rating: 5,
    text: 'El equipo de grupo Artica se distingue por su compromiso con la excelencia en cada proyecto. Cada una de las fotografías producidas que me enviaron refleja un alto nivel de atención al detalle. Además, ellos destacan por ofrecer un trato personalizado que añade un valor adicional a su servicio. Muchas gracias!!',
  },
  {
    id: 3,
    name: 'Susana He',
    date: 'hace 1 año',
    rating: 5,
    text: 'Me encanta este equipo, hemos estado trabajando algunos meses y de verdad hemos visto bastante progreso en nuestras redes sociales de Alice Lashes Beauty. El equipo de Artica siempre está al tanto de lo que se necesita generar de contenido, se reúnen con nosotros frecuentemente y de verdad se les nota que les interesa nuestro negocio y crecimiento. Les deseo todo el éxito chicos, son un gran equipo de marketing <3\n\nSi alguien quiere checar, nuestro Instagram es @alicelashesbeauty',
  },
  {
    id: 4,
    name: 'OTRADE LLC',
    date: 'hace 1 año',
    rating: 5,
    text: 'Hemos estado trabajando con Artica desde hace un año. Aparte de que nos generan contenido de calidad, hemos registrado un incremento de clientes en nuestro negocio a través de crecimiento orgánico en redes sociales. El equipo se preocupa por el bienestar y el crecimiento de nuestro negocio ya que si nos va bien, ellos también se benefician, es un ganar-ganar bastante justo. Muchas gracias chic@s <3',
  },
];

export default function Reviews() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const updateNavigation = (index: number) => {
    setCanGoPrev(index > 0);
    setCanGoNext(index < reviews.length - 1);
  };

  const goToSlide = (index: number) => {
    if (!trackRef.current || !containerRef.current) return;
    
    const track = trackRef.current;
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const translateX = -(index * containerWidth);

    gsap.to(track, {
      x: translateX,
      duration: 0.6,
      ease: 'power2.out',
    });

    setCurrentIndex(index);
    updateNavigation(index);
  };

  const goNext = () => {
    if (currentIndex < reviews.length - 1) {
      goToSlide(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  };

  useEffect(() => {
    setIsClient(true);
    updateNavigation(currentIndex);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !isClient) return;

    // Delay para asegurar que el DOM esté completamente listo
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const headerRef = sectionRef.current?.querySelector('div.text-center');
        const carouselRef = sectionRef.current?.querySelector('div.relative.w-full');

        // Verificar si el elemento ya está en el viewport antes de ocultar
        const isInViewport = (element: Element) => {
          const rect = element.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        };

        // Animación del header
        if (headerRef) {
          // Solo ocultar si NO está en viewport
          if (!isInViewport(headerRef)) {
            gsap.set(headerRef, { opacity: 0, y: 40 });
            
            ScrollTrigger.create({
              trigger: headerRef,
              start: 'top 85%',
              onEnter: () => {
                gsap.to(headerRef, {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: 'power2.out',
                });
              },
              once: true,
            });
          } else {
            // Ya está en viewport, mostrar inmediatamente
            gsap.set(headerRef, { opacity: 1, y: 0 });
          }

          // Fallback: mostrar después de 2 segundos si no se ha activado
          setTimeout(() => {
            if (headerRef && window.getComputedStyle(headerRef).opacity === '0') {
              gsap.set(headerRef, { opacity: 1, y: 0 });
            }
          }, 2000);
        }

        // Animación del carousel
        if (carouselRef) {
          // Solo ocultar si NO está en viewport
          if (!isInViewport(carouselRef)) {
            gsap.set(carouselRef, { opacity: 0, y: 50, scale: 0.95 });
            
            ScrollTrigger.create({
              trigger: carouselRef,
              start: 'top 85%',
              onEnter: () => {
                gsap.to(carouselRef, {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 1,
                  ease: 'power2.out',
                });
              },
              once: true,
            });
          } else {
            // Ya está en viewport, mostrar inmediatamente
            gsap.set(carouselRef, { opacity: 1, y: 0, scale: 1 });
          }

          // Fallback: mostrar después de 2 segundos si no se ha activado
          setTimeout(() => {
            if (carouselRef && window.getComputedStyle(carouselRef).opacity === '0') {
              gsap.set(carouselRef, { opacity: 1, y: 0, scale: 1 });
            }
          }, 2000);
        }

        // Refrescar ScrollTrigger después de configurar
        ScrollTrigger.refresh();
      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [isClient]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <MdStar
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden bg-white min-h-[70vh] md:min-h-[80vh] flex items-center justify-center z-0 m-0 p-0 py-10 md:py-12"
    >
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-10 relative z-10 flex flex-col justify-center">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto relative z-10 flex-shrink-0">
          <div className="inline-flex items-center gap-1.5 mb-3 sm:mb-4 px-3 py-1.5 bg-[#ff9001]/20 rounded-full border border-[#ff9001]/30">
            <div className="w-4 h-4 text-[#ff9001] flex items-center justify-center flex-shrink-0">
              <MdStar className="fill-[#ff9001]" />
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-[#ff9001] uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              {t('reviews.badge')}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-[#272F66] m-0 tracking-tight leading-[1.2] px-2 sm:px-0" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
            {t('reviews.title')}
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full">
          <div 
            ref={containerRef}
            className="w-full overflow-hidden relative"
          >
            <div
              ref={trackRef}
              className="flex"
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-xl border border-black/12 flex flex-col shadow-[0_1px_0_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_1px_0_rgba(0,0,0,0.02),0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300 flex-shrink-0 p-4 sm:p-5 md:p-6 w-full"
                >
                  {/* Header del Review */}
                  <div className="flex items-start gap-3 mb-3 sm:mb-4">
                    {/* Profile Image Placeholder */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#13B9D5] to-[#0FA8C2] flex items-center justify-center flex-shrink-0 border-2 border-white shadow-md">
                      <span className="text-sm sm:text-base font-bold text-white uppercase" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        {review.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>

                    {/* Name, Date and Stars */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm sm:text-base font-bold text-[#272F66] truncate" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                          {review.name}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500 mb-1.5" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        {review.date}
                      </p>
                      <div className="flex items-center gap-0.5">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="flex-1 mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm font-normal text-[#272F66]/85 leading-relaxed whitespace-pre-line line-clamp-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      {review.text}
                    </p>
                  </div>

                  {/* Google Badge */}
                  <div className="pt-3 sm:pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      <span className="text-xs font-medium text-gray-600" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Google
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
          <button
            onClick={goPrev}
            disabled={!canGoPrev}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center transition-all duration-200 ${
              canGoPrev
                ? 'hover:bg-[#272F66] hover:border-[#272F66] hover:text-white text-[#272F66] cursor-pointer'
                : 'text-gray-300 cursor-not-allowed opacity-50'
            }`}
            aria-label="Anterior"
          >
            <MdChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex gap-1">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-[#272F66] w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir a reseña ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={!canGoNext}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center transition-all duration-200 ${
              canGoNext
                ? 'hover:bg-[#272F66] hover:border-[#272F66] hover:text-white text-[#272F66] cursor-pointer'
                : 'text-gray-300 cursor-not-allowed opacity-50'
            }`}
            aria-label="Siguiente"
          >
            <MdChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
