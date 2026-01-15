'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../legal.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function AvisoLegalPage() {
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
          Aviso Legal
        </h1>

        <div ref={contentRef} className={styles.content}>
          <section>
            <h2>Aviso Legal – Artica Group LLC</h2>
            <p>
              Artica Group LLC es el titular y proveedor de servicios de la sociedad de la información de este sitio web.
            </p>
          </section>

          <section>
            <h2>Datos de la Empresa:</h2>
            <ul>
              <li><strong>Nombre de la Empresa:</strong> Artica Group LLC</li>
              <li><strong>Dirección:</strong> 3550 NW 85TH CT #100 APT 447 MIAMI, FL 33122, Estados Unidos</li>
            </ul>
            
            <h3>Información de Registro:</h3>
            <ul>
              <li><strong>Document Number:</strong> L22000322400</li>
              <li><strong>FEI/EIN Number:</strong> 88-3388560</li>
              <li><strong>Date Filed:</strong> 07/20/2022</li>
              <li><strong>Effective Date:</strong> 07/15/2022</li>
              <li><strong>State:</strong> FL</li>
              <li><strong>Status:</strong> ACTIVE</li>
            </ul>
          </section>

          <section>
            <p>
              El acceso al sitio web de Artica Group LLC es gratuito, a menos que se indique lo contrario en las condiciones particulares de servicios específicos, donde se detallarán los precios, impuestos aplicables y gastos de envío, si los hubiere.
            </p>
            <p>
              Este aviso legal se complementa con nuestra Política de Privacidad, nuestras Condiciones Generales de Uso y, en su caso, con las condiciones particulares de cada servicio ofrecido en este sitio web.
            </p>
          </section>

          <section>
            <h2>Contacto:</h2>
            <p>
              Para contactar con Artica Group LLC, puede dirigirse a través de la siguiente dirección de correo electrónico:{' '}
              <a href="mailto:info@articagroup.us">info@articagroup.us</a>
              {' '}o al siguiente número de teléfono:{' '}
              <a href="tel:+13058493637">+1 (305) 849-3637</a>
              , en horario de atención: Lunes a Domingo de 9 AM a 5 PM (EST).
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
