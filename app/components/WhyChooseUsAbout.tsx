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
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUsAbout() {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: MdTrendingUp,
      title: t('whyChooseUs.features.estrategias.title'),
      description: t('whyChooseUs.features.estrategias.description'),
    },
    {
      icon: MdPalette,
      title: t('whyChooseUs.features.expertos.title'),
      description: t('whyChooseUs.features.expertos.description'),
    },
    {
      icon: MdCheckCircle,
      title: t('whyChooseUs.features.compromiso.title'),
      description: t('whyChooseUs.features.compromiso.description'),
    },
    {
      icon: MdAutoAwesome,
      title: t('whyChooseUs.features.creatividad.title'),
      description: t('whyChooseUs.features.creatividad.description'),
    },
  ];
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
  }, [t]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div ref={badgeRef} className={styles.headerBadge}>
            <div className={styles.badgeIcon}>
              <MdCheckCircle />
            </div>
            <span className={styles.badgeText}>{t('whyChooseUs.badge')}</span>
          </div>
          <h2 ref={titleRef} className={styles.subtitle}>
            {t('whyChooseUs.title')}
          </h2>
          <p ref={descriptionRef} className={styles.description}>
            {t('whyChooseUs.description')}
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
