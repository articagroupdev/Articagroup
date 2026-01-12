'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LocomotiveScrollSectionProps {
  hero?: React.ReactNode;
  sections?: Array<{
    bgColor?: string;
    textColor?: string;
    content?: React.ReactNode;
  }>;
  horizontalSection?: {
    title?: string;
    images?: string[];
  };
}

export default function LocomotiveScrollSection({
  hero,
  sections = [
    {
      bgColor: '#bcb8ad',
      textColor: '#032f35',
      content: (
        <>
          <h1 data-scroll data-scroll-speed="1">
            <span>Horizontal</span> <span>scroll</span> <span>section</span>
          </h1>
          <p data-scroll data-scroll-speed="2" data-scroll-delay="0.2">
            with GSAP ScrollTrigger & Locomotive Scroll
          </p>
        </>
      ),
    },
  ],
  horizontalSection = {
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    images: [
      'https://images.pexels.com/photos/5207262/pexels-photo-5207262.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900',
      'https://images.pexels.com/photos/3371358/pexels-photo-3371358.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900',
      'https://images.pexels.com/photos/3618545/pexels-photo-3618545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900',
    ],
  },
}: LocomotiveScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollRef = useRef<any>(null);
  const sectionPinRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isClient) return;

    let scroll: any = null;
    let handleResize: (() => void) | null = null;

    // Importación dinámica de Locomotive Scroll
    import('locomotive-scroll').then((LocomotiveScrollModule) => {
      const LocomotiveScroll = LocomotiveScrollModule.default;
      const pageContainer = containerRef.current;

      if (!pageContainer) return;

      // Inicializar Locomotive Scroll exactamente como en el código original
      scroll = new LocomotiveScroll({
        el: pageContainer,
        smooth: true,
      });

      locomotiveScrollRef.current = scroll;

      // Actualizar ScrollTrigger cuando Locomotive Scroll se actualice
      scroll.on('scroll', ScrollTrigger.update);

      // Configurar scrollerProxy exactamente como en el código original
      ScrollTrigger.scrollerProxy(pageContainer, {
        scrollTop(value) {
          return arguments.length
            ? scroll.scrollTo(value, 0, 0)
            : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: pageContainer.style.transform ? 'transform' : 'fixed',
      });

      // Inicializar scroll horizontal después de que la página esté cargada
      const initHorizontalScroll = () => {
        const pinWrap = document.querySelector('.pin-wrap') as HTMLElement;
        if (!pinWrap || !sectionPinRef.current) return;

        const pinWrapWidth = pinWrap.offsetWidth;
        const horizontalScrollLength = pinWrapWidth - window.innerWidth;

        // Scroll horizontal exactamente como en el código original
        gsap.to('.pin-wrap', {
          scrollTrigger: {
            scroller: pageContainer, // Usar el contenedor de Locomotive Scroll
            scrub: true,
            trigger: sectionPinRef.current,
            pin: true,
            start: 'top top',
            end: pinWrapWidth,
          },
          x: -horizontalScrollLength,
          ease: 'none',
        });

        ScrollTrigger.addEventListener('refresh', () => scroll.update());
        ScrollTrigger.refresh();
      };

      // Esperar a que la página esté completamente cargada
      if (document.readyState === 'complete') {
        setTimeout(initHorizontalScroll, 100);
      } else {
        window.addEventListener('load', () => {
          setTimeout(initHorizontalScroll, 100);
        }, { once: true });
      }
    });

    // Refrescar cuando cambie el tamaño de la ventana
    handleResize = () => {
      ScrollTrigger.refresh();
      if (scroll) {
        scroll.update();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (handleResize) {
        window.removeEventListener('resize', handleResize);
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (scroll) {
        scroll.destroy();
      }
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div 
      ref={containerRef} 
      className="locomotive-container container" 
      data-scroll-container
      style={{
        position: 'relative',
        zIndex: 1,
      }}
    >
      {hero && (
        <div data-scroll-section style={{ position: 'relative' }}>
          {hero}
        </div>
      )}
      {sections.map((section, index) => (
        <section
          key={index}
          data-scroll-section
          data-bgcolor={section.bgColor}
          data-textcolor={section.textColor}
          style={{
            backgroundColor: section.bgColor || '#bcb8ad',
            color: section.textColor || '#032f35',
            minHeight: '100vh',
            width: '100%',
            position: 'relative',
            padding: 0,
          }}
        >
          {section.content}
        </section>
      ))}

      <section
        ref={sectionPinRef}
        id="sectionPin"
        data-scroll-section
        style={{
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          left: 0,
          background: '#111',
          color: '#b9b3a9',
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
            padding: '50px 10vw',
            willChange: 'transform',
          }}
        >
          {horizontalSection.title && (
            <h2
              style={{
                fontSize: '2rem',
                maxWidth: '400px',
                minWidth: '60vw',
                padding: '0 5vw',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              {horizontalSection.title}
            </h2>
          )}
          {horizontalSection.images?.map((img, index) => (
            <div key={index} style={{ minWidth: '60vw', padding: '0 5vw' }}>
              <img
                src={img}
                alt={`Image ${index + 1}`}
                style={{
                  height: '80vh',
                  width: 'auto',
                  objectFit: 'cover',
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <section
        data-scroll-section
        data-bgcolor="#e3857a"
        data-textcolor="#f1dba7"
        style={{
          backgroundColor: '#e3857a',
          color: '#f1dba7',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '5rem 2rem',
        }}
      >
        <img
          src="https://images.pexels.com/photos/4791474/pexels-photo-4791474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt=""
          style={{ maxWidth: '500px', width: '100%', marginBottom: '2rem' }}
        />
        <h2 data-scroll data-scroll-speed="1" className="credit">
          <a href="https://madebybeings.com" target="_blank" rel="noopener noreferrer">
            Made by Beings
          </a>
        </h2>
      </section>
    </div>
  );
}

