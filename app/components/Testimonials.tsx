'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MdFormatQuote } from 'react-icons/md';
import { FaPlay } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  company: string;
  text: string;
  author: string;
  companyImage?: string;
  companyBanner?: string; // Imagen horizontal para la card
  videoUrl?: string; // URL del video de Vimeo
}

export default function Testimonials() {
  const { t } = useLanguage();
  
  const testimonials: Testimonial[] = [
    {
      company: t('testimonials.items.airAccessories.company'),
      text: t('testimonials.items.airAccessories.text'),
      author: t('testimonials.items.airAccessories.author'),
      videoUrl: 'https://vimeo.com/1078490981',
    },
    {
      company: t('testimonials.items.jetAir.company'),
      text: t('testimonials.items.jetAir.text'),
      author: t('testimonials.items.jetAir.author'),
      videoUrl: 'https://vimeo.com/1078490532',
    },
    {
      company: t('testimonials.items.lajaAviation.company'),
      text: t('testimonials.items.lajaAviation.text'),
      author: t('testimonials.items.lajaAviation.author'),
      videoUrl: 'https://vimeo.com/1078490855',
    },
  ];
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [paddingStyles, setPaddingStyles] = useState({
    section: { paddingTop: '3rem', paddingBottom: '3rem' },
    container: { paddingTop: '2.5rem', paddingBottom: '2.5rem' },
  });

  useEffect(() => {
    // Calcular padding responsive
    const updatePadding = () => {
      const width = window.innerWidth;
      setPaddingStyles({
        section: {
          paddingTop: width >= 1024 ? '2em' : width >= 768 ? '2em' : '3rem',
          paddingBottom: width >= 1024 ? '2em' : width >= 768 ? '2em' : '3rem',
        },
        container: {
          paddingTop: width >= 1024 ? '4rem' : width >= 768 ? '3.5rem' : '2.5rem',
          paddingBottom: width >= 1024 ? '4rem' : width >= 768 ? '3.5rem' : '2.5rem',
        },
      });
    };

    updatePadding();
    window.addEventListener('resize', updatePadding);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      const headerRef = sectionRef.current?.querySelector('div.text-center');

      // Animación del header
      if (headerRef) {
        gsap.set(headerRef, { opacity: 0, y: 40 });
        gsap.to(headerRef, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef,
            start: 'top 100%',
            end: 'top 70%',
            scrub: 1.5,
          },
        });
      }

      // Animación de las cards
      gsap.set(cards, {
        opacity: 0,
        y: 60,
        scale: 0.95,
      });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
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

    return () => {
      ctx.revert();
      window.removeEventListener('resize', updatePadding);
    };
  }, [t]);

  return (
    <section 
      ref={sectionRef} 
      className="testimonials-section relative overflow-hidden bg-gradient-to-br from-[#13B9D5] via-[#0FA8C2] to-[#0D97B0] min-h-screen md:min-h-screen flex items-center justify-center z-0 m-0"
      style={{
        ...paddingStyles.section,
        paddingLeft: '0',
        paddingRight: '0',
        position: 'relative',
        height: 'auto',
        top: 'auto',
        visibility: 'visible',
      } as React.CSSProperties}
    >
      <div 
        className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-6 lg:px-8 relative z-10 flex flex-col md:justify-center lg:justify-center md:h-full"
        style={paddingStyles.container as React.CSSProperties}
      >
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-8 lg:mb-12 max-w-4xl mx-auto relative z-10 flex-shrink-0">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-5 md:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            <div className="w-4 h-4 sm:w-5 sm:h-5 text-white flex items-center justify-center flex-shrink-" >
              <MdFormatQuote />
            </div>
            <span className="font-sans text-[10px] sm:text-xs md:text-sm font-semibold text-white uppercase tracking-wider whitespace-nowrap">
              {t('testimonials.badge')}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold text-white m-0 tracking-tight leading-[1.2] drop-shadow-sm px-2 sm:px-0" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
            {t('testimonials.title')}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-4 lg:gap-6 w-full md:flex-1 lg:flex-none md:content-center lg:content-start">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="bg-white rounded-2xl sm:rounded-[20px] overflow-hidden border border-black/12 flex flex-col transition-all duration-300 ease-out md:max-h-[600px] lg:max-h-none shadow-[0_1px_0_rgba(0,0,0,0.02),0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_1px_0_rgba(0,0,0,0.02),0_15px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 w-full"
            >
              {/* Video de Vimeo */}
              {testimonial.videoUrl && (() => {
                const VideoPlayer = () => {
                  const [isPlaying, setIsPlaying] = useState(false);
                  const videoId = testimonial.videoUrl?.match(/\/(\d+)/)?.[1];
                  const thumbnailUrl = videoId ? `https://vumbnail.com/${videoId}.jpg` : '';
                  const embedUrl = videoId ? `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&autoplay=1&muted=0` : '';
                  
                  const handlePlay = () => {
                    setIsPlaying(true);
                  };
                  
                  if (!videoId) return null;
                  
                  return (
                    <div className="relative w-full h-48 sm:h-56 md:h-56 lg:h-72 bg-black border-b border-black/8 flex-shrink-0 overflow-hidden rounded-t-2xl sm:rounded-t-[20px]">
                      {!isPlaying ? (
                        <>
                          <img
                            src={thumbnailUrl}
                            alt={`Video thumbnail - ${testimonial.company}`}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                          <button
                            onClick={handlePlay}
                            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group cursor-pointer"
                            aria-label={`Reproducir video - ${testimonial.company}`}
                          >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <FaPlay className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#272F66] ml-1" />
                            </div>
                          </button>
                        </>
                      ) : (
                        <iframe
                          src={embedUrl}
                          className="absolute top-0 left-0 w-full h-full"
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                          title={`Video testimonial - ${testimonial.company}`}
                        />
                      )}
                    </div>
                  );
                };
                
                return <VideoPlayer />;
              })()}

              {/* Card Content */}
              <div className="flex flex-col flex-1 relative p-4 sm:p-5 md:p-5 lg:p-6">
                {/* Quote Icon */}
                <div className="absolute top-3 sm:top-4 md:top-4 lg:top-6 right-3 sm:right-4 md:right-4 lg:right-6 text-gray-200 text-2xl sm:text-3xl md:text-3xl lg:text-5xl opacity-20 z-0 leading-none font-serif font-light pointer-events-none">
                  <MdFormatQuote />
                </div>

                {/* Testimonial Text */}
                <div className="flex flex-col flex-1 relative z-10">
                  <p className="text-[13px] sm:text-sm md:text-sm lg:text-[15px] font-normal text-[#272F66]/85 leading-relaxed mb-4 sm:mb-5 md:mb-4 lg:mb-6 pr-5 sm:pr-6 md:pr-6 lg:pr-8" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    {testimonial.text}
                  </p>

                  {/* Author Info */}
                  <div className="pt-3 sm:pt-4 md:pt-3 lg:pt-4 border-t border-black/8 mt-auto flex-shrink-0">
                    <div className="flex flex-col gap-0.5 sm:gap-1">
                      <div className="font-sans text-[13px] sm:text-sm md:text-sm lg:text-[15px] font-bold text-[#272F66] leading-snug break-words">
                        {testimonial.company}
                      </div>
                      <div className="font-sans text-[11px] sm:text-xs md:text-xs lg:text-sm font-normal text-[#272F66]/60 leading-snug">
                        – {testimonial.author}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

