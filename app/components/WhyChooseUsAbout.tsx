'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WhyChooseUsAbout.module.css';
import { 
  MdTrendingUp, 
  MdPalette, 
  MdCheckCircle, 
  MdAutoAwesome
} from 'react-icons/md';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: MdTrendingUp,
    title: 'Estrategias personalizadas que funcionan',
    description: 'No creemos en soluciones genéricas. Creamos estrategias digitales a tu medida que se alinean con tus metas y generan resultados medibles.',
  },
  {
    icon: MdPalette,
    title: 'Expertos en branding y marketing digital',
    description: 'Desde darle una identidad única a tu marca hasta ejecutar campañas de marketing digital que atraen a tu público ideal, lo hacemos todo con precisión y creatividad.',
  },
  {
    icon: MdCheckCircle,
    title: 'Compromiso en cada objetivo',
    description: 'Trabajamos contigo en cada paso del camino, transformando objetivos en acciones concretas que aumentan conversiones, engagement y, lo más importante, clientes.',
  },
  {
    icon: MdAutoAwesome,
    title: 'Creatividad que marca la diferencia',
    description: 'Nuestro estudio creativo produce contenido visual que impresiona y conecta con tu audiencia. Cada foto, video y pieza audiovisual cuenta tu historia de manera auténtica.',
  },
];

export default function WhyChooseUsAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animación del badge
      if (badgeRef.current) {
        gsap.set(badgeRef.current, { opacity: 0, y: 30 });
        gsap.to(badgeRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: badgeRef.current,
            start: 'top 100%',
            end: 'top 70%',
            scrub: 1.5,
          },
        });
      }

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

      // Animación de la descripción
      if (descriptionRef.current) {
        gsap.set(descriptionRef.current, { opacity: 0, y: 30 });
        gsap.to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: 'top 100%',
            end: 'top 70%',
            scrub: 1.5,
          },
        });
      }

      // Animación de las cards
      const cards = cardsRef.current.filter(Boolean);
      gsap.set(cards, {
        opacity: 0,
        y: 60,
        scale: 0.9,
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

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div ref={badgeRef} className={styles.headerBadge}>
            <div className={styles.badgeIcon}>
              <MdCheckCircle />
            </div>
            <span className={styles.badgeText}>Descubre más</span>
          </div>
          <h2 ref={titleRef} className={styles.subtitle}>
            ¿Por qué somos tu mejor opción?
          </h2>
          <p ref={descriptionRef} className={styles.description}>
            Porque en Artica Group entendemos lo que necesitas para llevar tu negocio a alcanzar sus objetivos.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className={styles.serviceCard}
              >
                <div className={styles.serviceIcon}>
                  <IconComponent />
                </div>
                <div className={styles.serviceContent}>
                  <h4 className={styles.serviceTitle}>{feature.title}</h4>
                  <p className={styles.serviceDescription}>{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
