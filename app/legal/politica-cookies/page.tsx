'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../legal.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function PoliticaCookiesPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 50 });
        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        });
      }

      if (contentRef.current) {
        const sections = contentRef.current.querySelectorAll('section');
        gsap.set(sections, { opacity: 0, y: 40 });

        gsap.to(sections, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className={styles.legalPage}>
      <Navbar />
      
      <div className={styles.container}>
        <h1
          ref={titleRef}
          className={styles.title}
        >
          Política de Cookies
        </h1>

        <div ref={contentRef} className={styles.content}>
          <section>
            <p style={{ textAlign: 'center' }}>
              Esta página está en construcción. El contenido de la Política de Cookies estará disponible próximamente.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
