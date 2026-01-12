'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AnimatedSection from './AnimatedSection';

export default function SectionsContainer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let sections: NodeListOf<HTMLElement> | null = null;
    let images: NodeListOf<HTMLElement> | null = null;
    let headings: NodeListOf<HTMLElement> | null = null;
    let outerWrappers: NodeListOf<HTMLElement> | null = null;
    let innerWrappers: NodeListOf<HTMLElement> | null = null;
    let currentIndex = -1;
    let animating = false;

    const wrap = (index: number, max: number) => (index + max) % max;

      const initAnimation = () => {
        // Buscar todas las secciones en el documento, incluyendo el Hero
        // Excluir la sección horizontal del sistema de animación
        sections = document.querySelectorAll('.section:not(.horizontal-scroll-section)') as NodeListOf<HTMLElement>;
        images = document.querySelectorAll('.background') as NodeListOf<HTMLElement>;
        headings = document.querySelectorAll('.section-title') as NodeListOf<HTMLElement>;
        outerWrappers = document.querySelectorAll('.section:not(.horizontal-scroll-section) .wrapper-outer') as NodeListOf<HTMLElement>;
        innerWrappers = document.querySelectorAll('.section:not(.horizontal-scroll-section) .wrapper-inner') as NodeListOf<HTMLElement>;

        if (sections.length === 0) return;

      // Configurar estados iniciales - Hero visible, otras secciones ocultas
      // Solo aplicar yPercent a las secciones que no sean el Hero
      for (let i = 0; i < outerWrappers.length; i++) {
        if (i > 0) {
          // Solo las secciones después del Hero
          gsap.set(outerWrappers[i], { yPercent: 100 });
          gsap.set(innerWrappers[i], { yPercent: -100 });
        }
      }
      
      // Asegurar que el Hero (primera sección) esté visible y con z-index alto
      if (sections.length > 0) {
        gsap.set(sections[0], { 
          autoAlpha: 1, 
          zIndex: 10,
          visibility: 'visible'
        });
        // Asegurar que los wrappers del Hero estén en posición normal
        if (outerWrappers[0]) gsap.set(outerWrappers[0], { yPercent: 0 });
        if (innerWrappers[0]) gsap.set(innerWrappers[0], { yPercent: 0 });
      }
      
        // Ocultar todas las demás secciones
        for (let i = 1; i < sections.length; i++) {
          gsap.set(sections[i], { 
            autoAlpha: 0, 
            zIndex: 0,
            visibility: 'hidden'
          });
        }

      function gotoSection(index: number, direction: number) {
        if (!sections) return;

        // No usar wrap, limitar a los índices válidos
        if (index < 0) index = 0;
        if (index >= sections.length) index = sections.length - 1;

        // Para secciones normales, usar la animación estándar
        if (!images || !headings || !outerWrappers || !innerWrappers) return;
        animating = true;

        const fromTop = direction === -1;
        const dFactor = fromTop ? -1 : 1;
        const tl = gsap.timeline({
          defaults: { duration: 1.25, ease: 'power1.inOut' },
          onComplete: () => {
            animating = false;
          },
        });

        if (currentIndex >= 0 && sections[currentIndex]) {
          const currentSection = sections[currentIndex];
          const currentImage = images[currentIndex];
          if (currentImage) {
            gsap.set(sections[currentIndex], { zIndex: currentIndex === 0 ? 0 : 0 });
            tl.to(currentImage, { yPercent: -15 * dFactor }).set(currentSection, {
              autoAlpha: 0,
              visibility: 'hidden',
            });
          }
        }

        gsap.set(sections[index], { 
          autoAlpha: 1, 
          zIndex: index === 0 ? 10 : 1,
          visibility: 'visible'
        });
        
        const targetOuterWrapper = outerWrappers[index];
        const targetInnerWrapper = innerWrappers[index];
        const targetImage = images[index];
        const targetHeading = headings[index];
        
        if (targetOuterWrapper && targetInnerWrapper) {
          tl.fromTo(
            [targetOuterWrapper, targetInnerWrapper],
            { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
            { yPercent: 0 },
            0
          );
        }
        
        if (targetImage) {
          tl.fromTo(targetImage, { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);
        }
        
        if (targetHeading) {
          tl.fromTo(
            targetHeading,
            { autoAlpha: 0, yPercent: 150 * dFactor },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 1,
              ease: 'power2',
              stagger: { each: 0.02, from: 'random' },
            },
            0.2
          );
        }

        currentIndex = index;
      }

      function navigateSectionById(id: string) {
        if (!sections) return;
        const index = Array.from(sections).findIndex((section) => section.id === id);

        if (index !== -1 && index !== currentIndex) {
          gotoSection(index, index > currentIndex ? 1 : -1);
        }
      }

      let lastTap = 0;
      const handleTouchEnd = (event: TouchEvent) => {
        if (!sections) return;
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        const maxIndex = sections.length - 1;
        if (tapLength < 500 && tapLength > 0 && currentIndex < maxIndex) {
          gotoSection(currentIndex + 1, 1);
          event.preventDefault();
        }
        lastTap = currentTime;
      };

      const handleWheel = (event: WheelEvent) => {
        if (animating || !sections) return;
        
        // Verificar si hay una sección horizontal
        const horizontalSection = document.querySelector('.horizontal-scroll-section') as HTMLElement;
        if (horizontalSection) {
          const horizontalRect = horizontalSection.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const scrollY = window.scrollY || window.pageYOffset;
          
          // Si estamos en la sección horizontal o cerca de ella, permitir scroll normal
          // La sección horizontal está entre el Hero y las secciones animadas
          if (horizontalRect.top <= viewportHeight && horizontalRect.bottom >= 0) {
            // ScrollTrigger manejará el scroll horizontal
            return;
          }
          
          // Si estamos en el Hero (primera sección) y hacemos scroll hacia abajo
          if (currentIndex === 0 && event.deltaY > 0) {
            // Ocultar el Hero y permitir scroll normal para llegar a la sección horizontal
            if (sections[0]) {
              gsap.to(sections[0], {
                autoAlpha: 0,
                zIndex: 0,
                duration: 0.3,
              });
            }
            // Permitir scroll normal - no interceptar
            return;
          }
          
          // Si hacemos scroll hacia arriba desde la sección horizontal o después
          if (event.deltaY < 0) {
            // Si el Hero está oculto y estamos cerca del top, mostrarlo
            if (scrollY < viewportHeight && sections[0]) {
              gsap.set(sections[0], {
                autoAlpha: 1,
                zIndex: 10,
                visibility: 'visible'
              });
              return;
            }
          }
          
          // Si acabamos de salir de la sección horizontal (está arriba del viewport)
          if (horizontalRect.bottom <= 0 && event.deltaY > 0) {
            // El usuario está haciendo scroll hacia abajo después de la sección horizontal
            // Continuar a la siguiente sección animada
            const maxIndex = sections.length - 1;
            if (currentIndex < maxIndex) {
              gotoSection(currentIndex + 1, 1);
            }
            return;
          }
        }
        
        // Comportamiento normal para secciones animadas (solo si no hay sección horizontal o ya pasamos de ella)
        const maxIndex = sections.length - 1;
        if (event.deltaY < 0) {
          // Scroll hacia arriba - solo si no estamos en la primera sección
          if (currentIndex > 0) {
            gotoSection(currentIndex - 1, -1);
          }
        } else if (event.deltaY > 0) {
          // Scroll hacia abajo - solo si no estamos en la última sección
          if (currentIndex < maxIndex) {
            gotoSection(currentIndex + 1, 1);
          }
        }
      };

      document.addEventListener('touchend', handleTouchEnd);
      window.addEventListener('wheel', handleWheel);

      const navLinks = document.querySelectorAll('nav a');
      navLinks.forEach((a) => {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
          if (href) {
            navigateSectionById(href.slice(1));
          }
        });
      });

      // Inicializar en la primera sección (Hero)
      currentIndex = 0;
      if (sections.length > 0) {
        gsap.set(sections[0], { autoAlpha: 1, zIndex: 10, visibility: 'visible' });
      }

      return () => {
        document.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('wheel', handleWheel);
        navLinks.forEach((a) => {
          a.removeEventListener('click', () => {});
        });
      };
    };

    if (document.readyState === 'complete') {
      setTimeout(initAnimation, 100);
    } else {
      window.addEventListener('load', () => setTimeout(initAnimation, 100), { once: true });
      setTimeout(initAnimation, 300);
    }
  }, []);

  return (
    <div ref={containerRef} className="sections-container">
      <AnimatedSection
        id="third"
        title="Flowers of friendship"
        className="third"
        bgUrl="https://images.unsplash.com/photo-1503796964332-e25e282e390f?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg2OTM1NTR8&ixlib=rb-4.0.3&q=85"
      />
      <AnimatedSection
        id="fourth"
        title="Waves in the Ocean"
        className="fourth"
        bgUrl="https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg2OTM1OTh8&ixlib=rb-4.0.3&q=85"
      />
      <AnimatedSection
        id="fifth"
        title="New York City"
        className="fifth"
        bgUrl="https://images.unsplash.com/photo-1584351583369-6baf055b51a7?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg2OTM4MTB8&ixlib=rb-4.0.3&q=85"
      />
    </div>
  );
}

