'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './LogoCarousel.module.css';

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
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Duplicar los logos para el efecto infinito
  const duplicatedLogos = [...logos, ...logos];

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

      // Animación del carousel
      if (carouselRef.current) {
        gsap.set(carouselRef.current, { opacity: 0, y: 50, scale: 0.95 });
        gsap.to(carouselRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 100%',
            end: 'top 60%',
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <h2 
          ref={titleRef}
          className={styles.title}
          style={{ opacity: 0, transform: 'translateY(40px)' }}
        >
          Marcas que ya confían en nosotros
        </h2>
        <div 
          ref={carouselRef}
          className={styles.carousel}
          style={{ opacity: 0, transform: 'translateY(50px) scale(0.95)' }}
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

