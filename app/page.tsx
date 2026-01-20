'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import HeroScrollEffect from './components/HeroScrollEffect';
import GlassmorphismCarousel from './components/GlassmorphismCarousel';
import HorizontalScrollSection from './components/HorizontalScrollSection';
import LogoCarousel from './components/LogoCarousel';
import WhyChooseUs from './components/WhyChooseUs';
import InfiniteImageLoop from './components/InfiniteImageLoop';
import Testimonials from './components/Testimonials';
import Reviews from './components/Reviews';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { useLanguage } from './contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { t, isReady } = useLanguage();
  const titleSectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Animación de entrada del título
  useEffect(() => {
    if (!titleRef.current || !titleSectionRef.current) return;

    const title = titleRef.current;
    const section = titleSectionRef.current;

    // Estado inicial: invisible y desplazado hacia abajo
    gsap.set(title, {
      opacity: 0,
      y: 80,
      scale: 0.95,
    });

    // Crear el ScrollTrigger después de un pequeño delay para evitar conflictos
    const timer = setTimeout(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(title, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
          });
        },
        once: true,
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <main className="relative" style={{ background: '#f8f9fa' }}>
      {/* Usa HeroScrollEffect para el efecto de scroll animado, o Hero para el hero normal */}
      <HeroScrollEffect />
      {/* <Hero /> */}
      
      {/* Título debajo del video */}
      <section 
        ref={titleSectionRef}
        className="hero-video-title-section"
        style={{
          position: 'relative',
          width: '100%',
          textAlign: 'center',
          padding: 'clamp(16px, 3vw, 20px) 16px clamp(30px, 6vw, 60px)',
          background: '#f8f9fa',
          marginTop: 'max(-55vh, -400px)',
          zIndex: 1,
        }}
      >
        <h2
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif',
            fontSize: 'clamp(18px, 5vw, 48px)',
            fontWeight: 'normal',
            color: '#272F66',
            lineHeight: '1.25',
            margin: '0 auto',
            width: 'min(750px, 85vw)',
            maxWidth: '100%',
            padding: '0',
          }}
        >
          {t('hero.videoTitle')}
        </h2>
        
        {/* Icono decorativo debajo del título - Bombilla/Idea */}
        <div 
          style={{
            marginTop: 'clamp(24px, 5vw, 40px)',
            marginBottom: 'clamp(40px, 8vw, 80px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="idea-icon"
          >
            {/* Bombilla */}
            <path 
              d="M9 21h6M12 3a6 6 0 0 0-6 6c0 2.22 1.21 4.16 3 5.19V17a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2.81c1.79-1.03 3-2.97 3-5.19a6 6 0 0 0-6-6z" 
              stroke="#13B9D5" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="bulb"
            />
            {/* Rayos de luz */}
            <line x1="12" y1="1" x2="12" y2="0" stroke="#ff9001" strokeWidth="2" strokeLinecap="round" className="ray ray-1" />
            <line x1="4.22" y1="4.22" x2="3.51" y2="3.51" stroke="#ff9001" strokeWidth="2" strokeLinecap="round" className="ray ray-2" />
            <line x1="1" y1="12" x2="0" y2="12" stroke="#ff9001" strokeWidth="2" strokeLinecap="round" className="ray ray-3" />
            <line x1="19.78" y1="4.22" x2="20.49" y2="3.51" stroke="#ff9001" strokeWidth="2" strokeLinecap="round" className="ray ray-4" />
            <line x1="23" y1="12" x2="24" y2="12" stroke="#ff9001" strokeWidth="2" strokeLinecap="round" className="ray ray-5" />
          </svg>
        </div>
        
        <style jsx>{`
          .idea-icon {
            animation: floatBulb 3s ease-in-out infinite;
          }
          
          .idea-icon :global(.bulb) {
            animation: glowBulb 2s ease-in-out infinite;
          }
          
          .idea-icon :global(.ray) {
            animation: rayPulse 1.5s ease-in-out infinite;
            transform-origin: center;
          }
          
          .idea-icon :global(.ray-1) { animation-delay: 0s; }
          .idea-icon :global(.ray-2) { animation-delay: 0.2s; }
          .idea-icon :global(.ray-3) { animation-delay: 0.4s; }
          .idea-icon :global(.ray-4) { animation-delay: 0.6s; }
          .idea-icon :global(.ray-5) { animation-delay: 0.8s; }
          
          @keyframes floatBulb {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }
          
          @keyframes glowBulb {
            0%, 100% {
              filter: drop-shadow(0 0 4px rgba(19, 185, 213, 0.5));
            }
            50% {
              filter: drop-shadow(0 0 12px rgba(19, 185, 213, 0.9));
            }
          }
          
          @keyframes rayPulse {
            0%, 100% {
              opacity: 0.4;
              transform: scale(0.8);
            }
            50% {
              opacity: 1;
              transform: scale(1.1);
            }
          }
        `}</style>
      </section>
      
      <GlassmorphismCarousel />
      <HorizontalScrollSection
        showIntro={false}
        introTitle="Horizontal scroll section"
        introSubtitle="with GSAP ScrollTrigger & Locomotive Scroll"
        introBgColor="#bcb8ad"
        introTextColor="#032f35"
        title={t('horizontalScroll.title')}
        images={[
          '/img/588068320_18012707783802845_1660549442353988258_n.webp',
          '/img/501718820_17992820474802845_1403293369934589556_n.webp',
          '/img/527968796_18000270005802845_7302255861170608236_n.webp',
        ]}
      />
      <WhyChooseUs />
      <InfiniteImageLoop images={[
        '/img/496154304_17989870127802845_6685861079558030072_n.webp',
        '/img/501718820_17992820474802845_1403293369934589556_n.webp',
        '/img/527968796_18000270005802845_7302255861170608236_n.webp',
        '/img/571672548_18010502681802845_1396551934259386008_n.webp',
        '/img/585052310_18012707795802845_696118439204782446_n.webp',
        '/img/611190510_18017730878802845_5666080552791873873_n.webp',
        '/img/496154304_17989870127802845_6685861079558030072_n.webp',
        '/img/501718820_17992820474802845_1403293369934589556_n.webp',
        '/img/527968796_18000270005802845_7302255861170608236_n.webp',
        '/img/571672548_18010502681802845_1396551934259386008_n.webp',
        '/img/585052310_18012707795802845_696118439204782446_n.webp',
        '/img/611190510_18017730878802845_5666080552791873873_n.webp',
      ]} />
      <Testimonials />
      <Reviews />
      <LogoCarousel />
      <ContactForm />
      <Footer />
    </main>
  );
}
