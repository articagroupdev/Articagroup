'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './LogoCarousel.module.css';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const logos = [
  '/img/logos/Aerocav-Venezuela.png',
  '/img/logos/godecco-1.png',
  '/img/logos/HN-SHIPPING-1024x1024.png',
  '/img/logos/LOGO-ATC-1024x364.avif',
  '/img/logos/LOGO-BACKYARD-1024x356.avif',
  '/img/logos/LOGO-FANAMILLINGCENTER-1024x492.avif',
  '/img/logos/LOGO-HOME-DECOR-1024x1024.png',
  '/img/logos/LOGO-JET-AIR-1024x1024.png',
  '/img/logos/LOGO-MIAMIOUTDOORMASTER.avif',
  '/img/logos/LOGO-VENPRO-5-e1745854016381.png',
  '/img/logos/MANCAVE-LOGO-1024x1024.png',
  '/img/logos/SKYWAY-1024x307.png',
];

export default function LogoCarousel() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  // Duplicar los logos para el efecto infinito
  const duplicatedLogos = [...logos, ...logos];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !isClient) return;

    // Delay para asegurar que el DOM esté completamente listo
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Verificar si el elemento ya está en el viewport antes de ocultar
        const isInViewport = (element: Element) => {
          const rect = element.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        };

        // Animación del título
        if (titleRef.current) {
          // Solo ocultar si NO está en viewport
          if (!isInViewport(titleRef.current)) {
            gsap.set(titleRef.current, { opacity: 0, y: 40 });
            
            ScrollTrigger.create({
              trigger: titleRef.current,
              start: 'top 85%',
              onEnter: () => {
                gsap.to(titleRef.current, {
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
            gsap.set(titleRef.current, { opacity: 1, y: 0 });
          }

          // Fallback: mostrar después de 2 segundos si no se ha activado
          setTimeout(() => {
            if (titleRef.current && window.getComputedStyle(titleRef.current).opacity === '0') {
              gsap.set(titleRef.current, { opacity: 1, y: 0 });
            }
          }, 2000);
        }

        // Animación del carousel
        if (carouselRef.current) {
          // Solo ocultar si NO está en viewport
          if (!isInViewport(carouselRef.current)) {
            gsap.set(carouselRef.current, { opacity: 0, y: 50, scale: 0.95 });
            
            ScrollTrigger.create({
              trigger: carouselRef.current,
              start: 'top 85%',
              onEnter: () => {
                gsap.to(carouselRef.current, {
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
            gsap.set(carouselRef.current, { opacity: 1, y: 0, scale: 1 });
          }

          // Fallback: mostrar después de 2 segundos si no se ha activado
          setTimeout(() => {
            if (carouselRef.current && window.getComputedStyle(carouselRef.current).opacity === '0') {
              gsap.set(carouselRef.current, { opacity: 1, y: 0, scale: 1 });
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

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <h2 
          ref={titleRef}
          className={styles.title}
        >
          {t('logoCarousel.title')}
        </h2>
        <div 
          ref={carouselRef}
          className={styles.carousel}
        >
          <div className={styles.logosContainer}>
            {duplicatedLogos.map((logo, index) => (
              <div key={index} className={styles.logoItem}>
                <img src={logo} alt="Logo" className={styles.logoImage} />
              </div>
            ))}
          </div>
          <div className={styles.mask} />
        </div>
      </div>
    </section>
  );
}

