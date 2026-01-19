'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollSectionProps {
  id?: string;
  images?: string[];
  title?: string;
  introTitle?: string;
  introSubtitle?: string;
  introBgColor?: string;
  introTextColor?: string;
  showIntro?: boolean;
}

export default function HorizontalScrollSection({
  id = 'sectionPin',
  images = [
    '/img/496154304_17989870127802845_6685861079558030072_n.webp',
    '/img/501718820_17992820474802845_1403293369934589556_n.webp',
    '/img/527968796_18000270005802845_7302255861170608236_n.webp',
  ],
  title = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  introTitle = 'Horizontal scroll section',
  introSubtitle = 'with GSAP ScrollTrigger & Locomotive Scroll',
  introBgColor = '#bcb8ad',
  introTextColor = '#032f35',
  showIntro = true,
}: HorizontalScrollSectionProps) {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const introSectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Texto a resaltar según el idioma
  const highlightText = language === 'es' ? 'crecer tu negocio' : 'grow your business';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!sectionRef.current || !pinWrapRef.current) return;

    let scrollTriggerInstance: ScrollTrigger | null = null;
    let handleResize: (() => void) | null = null;
    let timer: NodeJS.Timeout;

    const ctx = gsap.context(() => {
      const initHorizontalScroll = () => {
        const pinWrap = pinWrapRef.current;
        const section = sectionRef.current;
        
        if (!pinWrap || !section) return;

        // Forzar un reflow para calcular correctamente el ancho
        void pinWrap.offsetWidth;
        
        // Calcular el ancho total sumando el ancho de cada elemento hijo
        const children = Array.from(pinWrap.children) as HTMLElement[];
        let totalWidth = 0;
        
        children.forEach((child) => {
          const rect = child.getBoundingClientRect();
          const styles = window.getComputedStyle(child);
          const marginLeft = parseFloat(styles.marginLeft) || 0;
          const marginRight = parseFloat(styles.marginRight) || 0;
          totalWidth += rect.width + marginLeft + marginRight;
        });
        
        // También incluir el padding del contenedor
        const pinWrapStyles = window.getComputedStyle(pinWrap);
        const paddingLeft = parseFloat(pinWrapStyles.paddingLeft) || 0;
        const paddingRight = parseFloat(pinWrapStyles.paddingRight) || 0;
        totalWidth += paddingLeft + paddingRight;
        
        // Usar el mayor entre scrollWidth y el cálculo manual
        const pinWrapWidth = Math.max(pinWrap.scrollWidth, totalWidth);
        const viewportWidth = window.innerWidth;
        const horizontalScrollLength = Math.max(0, pinWrapWidth - viewportWidth);

        // Solo crear el ScrollTrigger si hay contenido para desplazar
        if (horizontalScrollLength > 0 && pinWrapWidth > viewportWidth) {
          // Limpiar cualquier ScrollTrigger existente para esta sección
          ScrollTrigger.getAll().forEach((trigger) => {
            if (trigger.vars.trigger === section) {
              trigger.kill();
            }
          });

          // Configurar el scroll horizontal con optimización de hardware
          gsap.set(pinWrap, {
            force3D: true,
            z: 0.01,
          });

          const animation = gsap.to(pinWrap, {
            x: -horizontalScrollLength,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 0.5,
              start: 'top top',
              end: () => `+=${pinWrapWidth}`,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              markers: false,
            },
          });

          scrollTriggerInstance = animation.scrollTrigger || null;
        }
      };

      // Esperar a que las imágenes se carguen y el DOM esté listo
      const setupScroll = () => {
        if (!pinWrapRef.current || !sectionRef.current) return;

        // Esperar a que las imágenes se carguen
        const imageElements = pinWrapRef.current.querySelectorAll('img');
        const imagePromises = Array.from(imageElements).map((img) => {
          return new Promise((resolve) => {
            if (img.complete) {
              resolve(true);
            } else {
              img.onload = () => resolve(true);
              img.onerror = () => resolve(true);
            }
          });
        });

        Promise.all(imagePromises).then(() => {
          // Usar un solo requestAnimationFrame
          requestAnimationFrame(() => {
            initHorizontalScroll();
            ScrollTrigger.refresh();
          });
        });
      };

      // Delay para asegurar que el componente anterior termine su animación
      timer = setTimeout(() => {
        setupScroll();
      }, 300);

      // Refrescar ScrollTrigger cuando cambie el tamaño de la ventana
      let resizeTimeout: NodeJS.Timeout;
      handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          if (pinWrapRef.current && sectionRef.current) {
            initHorizontalScroll();
            ScrollTrigger.refresh();
          }
        }, 250);
      };
      window.addEventListener('resize', handleResize);

      // Animación del título - mejorada con scrub
      if (titleRef.current) {
        gsap.set(titleRef.current, {
          opacity: 0,
          y: 50,
          x: -30,
          force3D: true,
        });

        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 1.5,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 100%',
            end: 'top 70%',
            scrub: 0.5,
          },
        });
      }
    }, sectionRef);

    return () => {
      clearTimeout(timer);
      if (handleResize) {
        window.removeEventListener('resize', handleResize);
      }
      ctx.revert();
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [images, title]);

  return (
    <>
      {showIntro && (
        <section
          ref={introSectionRef}
          className="intro-section"
          style={{
            minHeight: '100vh',
            width: '100%',
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gridGap: '2rem',
            padding: '50px 10vw',
            margin: 'auto',
            placeItems: 'center',
            backgroundColor: introBgColor,
            color: introTextColor,
          }}
        >
          <div>
            <h1
              data-scroll=""
              data-scroll-speed="1"
              style={{
                fontSize: '5rem',
                lineHeight: 1,
                fontWeight: 800,
                marginBottom: '1rem',
                position: 'absolute',
                top: '10vw',
                left: '10vw',
                zIndex: 4,
                overflowWrap: 'break-word',
                hyphens: 'auto',
              }}
            >
              {introTitle.split(' ').map((word, index) => (
                <span key={index} style={{ display: 'block' }}>
                  {word}
                </span>
              ))}
            </h1>
            <p
              data-scroll=""
              data-scroll-speed="2"
              data-scroll-delay="0.2"
              style={{
                position: 'absolute',
                bottom: '10vw',
                right: '10vw',
                width: '200px',
                lineHeight: 1.5,
              }}
            >
              {introSubtitle}
            </p>
          </div>
        </section>
      )}

      <section
        ref={sectionRef}
        id={id}
        className="horizontal-scroll-section"
        style={{
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          left: 0,
          background: '#272F66',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        <div
            ref={pinWrapRef}
            className="pin-wrap"
            style={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: 'clamp(30px, 50px, 50px) clamp(20px, 10vw, 10vw)',
              width: 'max-content',
              flexShrink: 0,
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden',
            }}
          >
          {title && (
            <h2
              ref={titleRef}
              className="horizontal-scroll-title"
              style={{
                fontSize: 'clamp(1.3rem, 3.5vw, 3rem)',
                maxWidth: '650px',
                minWidth: 'clamp(250px, 90vw, 60vw)',
                padding: '0 clamp(16px, 4vw, 5vw)',
                fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif',
                fontWeight: 'bold',
                lineHeight: '1.3',
                flexShrink: 0,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                transform: 'translate3d(0, 0, 0)',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
              }}
            >
              {title.split(new RegExp(`(${highlightText})`, 'i')).map((part, index) => {
                if (part.toLowerCase() === highlightText.toLowerCase()) {
                  return (
                    <span
                      key={index}
                      style={{
                        backgroundColor: '#ff9001',
                        color: '#ffffff',
                        padding: '0.15em 0.4em',
                        borderRadius: '8px',
                        display: 'inline-block',
                        marginLeft: '0.2em',
                        boxShadow: '0 2px 8px rgba(255, 144, 1, 0.3)',
                      }}
                    >
                      {part}
                    </span>
                  );
                }
                return <span key={index}>{part}</span>;
              })}
            </h2>
          )}
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Image ${index + 1}`}
              style={{
                height: 'clamp(400px, 80vh, 80vh)',
                width: 'auto',
                objectFit: 'cover',
                minWidth: 'clamp(280px, 60vw, 60vw)',
                padding: '0 clamp(20px, 5vw, 5vw)',
                flexShrink: 0,
                borderRadius: 'clamp(20px, 30px, 30px)',
                transform: 'translate3d(0, 0, 0)',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}
