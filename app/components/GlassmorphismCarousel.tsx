'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MdCreate, 
  MdCampaign, 
  MdPeople, 
  MdCode, 
  MdVideoLibrary, 
  MdPalette, 
  MdTrendingUp, 
  MdAdsClick 
} from 'react-icons/md';
import styles from './GlassmorphismCarousel.module.css';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function GlassmorphismCarousel() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggableInstance = useRef<any>(null);
  const animationInstance = useRef<gsap.core.Tween | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  const cards = [
    {
      id: 1,
      title: t('glassmorphismCarousel.creacionContenido.title'),
      subtitle: t('glassmorphismCarousel.creacionContenido.subtitle'),
      icon: MdCreate,
    },
    {
      id: 2,
      title: t('glassmorphismCarousel.campanasAds.title'),
      subtitle: t('glassmorphismCarousel.campanasAds.subtitle'),
      icon: MdCampaign,
    },
    {
      id: 3,
      title: t('glassmorphismCarousel.communityManagement.title'),
      subtitle: t('glassmorphismCarousel.communityManagement.subtitle'),
      icon: MdPeople,
    },
    {
      id: 4,
      title: t('glassmorphismCarousel.desarrolloWeb.title'),
      subtitle: t('glassmorphismCarousel.desarrolloWeb.subtitle'),
      icon: MdCode,
    },
    {
      id: 5,
      title: t('glassmorphismCarousel.edicionVideos.title'),
      subtitle: t('glassmorphismCarousel.edicionVideos.subtitle'),
      icon: MdVideoLibrary,
    },
    {
      id: 6,
      title: t('glassmorphismCarousel.disenoGrafico.title'),
      subtitle: t('glassmorphismCarousel.disenoGrafico.subtitle'),
      icon: MdPalette,
    },
    {
      id: 7,
      title: t('glassmorphismCarousel.posicionamiento.title'),
      subtitle: t('glassmorphismCarousel.posicionamiento.subtitle'),
      icon: MdTrendingUp,
    },
    {
      id: 8,
      title: t('glassmorphismCarousel.publicidadOnline.title'),
      subtitle: t('glassmorphismCarousel.publicidadOnline.subtitle'),
      icon: MdAdsClick,
    },
  ];

  // Duplicar las cards para el efecto de scroll infinito
  const duplicatedCards = [...cards, ...cards];

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

      // Animación de las cards (solo las primeras, no las duplicadas)
      const uniqueCards = cardsRef.current.filter(Boolean).slice(0, 8);
      gsap.set(uniqueCards, {
        opacity: 0,
        y: 50,
        scale: 0.95,
      });

      gsap.to(uniqueCards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 100%',
          end: 'top 50%',
          scrub: 1.5,
        },
      });
    }, sectionRef);

    const track = trackRef.current;
    const container = containerRef.current;
    
    if (!track || !container) return;

    // Calcular límites - sin límites para scroll infinito
    const trackWidth = track.scrollWidth / 2;
    const containerWidth = container.offsetWidth;
    // No establecer límites estrictos para permitir scroll infinito
    let currentX = 0;

    // Crear animación continua desde la posición actual
    const createAnimation = (startX: number = 0) => {
      if (animationInstance.current) {
        animationInstance.current.kill();
      }

      // Normalizar la posición para el loop infinito
      const normalizedX = startX % trackWidth;
      const targetX = normalizedX - trackWidth;

      // Calcular la distancia
      const distance = Math.abs(targetX - normalizedX);
      const totalDistance = trackWidth;
      const duration = 60 * (distance / totalDistance); // Duración proporcional

      animationInstance.current = gsap.to(track, {
        x: targetX,
        duration: duration,
        ease: 'none',
        onComplete: () => {
          // Cuando llega al final, resetear al inicio y continuar
          gsap.set(track, { x: normalizedX - trackWidth });
          createAnimation(normalizedX - trackWidth); // Continuar desde la posición normalizada
        },
      });
    };

    // Importación dinámica de Draggable dentro del useEffect para evitar problemas de build
    const initDraggable = async () => {
      try {
        // @ts-ignore
        const DraggableModule = await import('gsap/Draggable');
        const Draggable = DraggableModule.Draggable;
        
        if (Draggable) {
          gsap.registerPlugin(Draggable);
        }

        if (!Draggable) {
          console.warn('Draggable plugin not available, using fallback');
          return;
        }
        
        let isDragging = false;
        let clickTimeout: NodeJS.Timeout | null = null;
        
        draggableInstance.current = Draggable.create(track, {
      type: 'x',
      // Sin bounds para permitir scroll infinito
      inertia: true,
      dragClickables: true,
      cursor: 'grab',
      activeCursor: 'grabbing',
      throwResistance: 1500, // Resistencia más baja para más fluidez
      overshootTolerance: 0, // Sin overshoot para movimiento más directo
      edgeResistance: 0, // Sin resistencia en los bordes
      throwProps: true, // Habilitar propiedades de inercia mejoradas
      liveSnap: false, // Deshabilitar snap en vivo para movimiento más fluido
      minimumMovement: 3, // Mínimo movimiento para considerar como arrastre
      snap: {
        x: function(endValue: number) {
          // Permitir movimiento libre sin snaps
          return endValue;
        }
      },
      onPress: function() {
        isDragging = false;
        // Limpiar timeout anterior
        if (clickTimeout) {
          clearTimeout(clickTimeout);
        }
        // Pausar animación temporalmente
        if (animationInstance.current) {
          animationInstance.current.pause();
        }
        // Si es solo un clic (sin arrastre), reanudar después de un breve delay
        clickTimeout = setTimeout(() => {
          if (!isDragging && animationInstance.current) {
            currentX = gsap.getProperty(track, 'x') as number;
            createAnimation(currentX);
          }
        }, 200);
      },
      onDragStart: function() {
        isDragging = true;
        // Cancelar el timeout de reanudación porque hay arrastre real
        if (clickTimeout) {
          clearTimeout(clickTimeout);
          clickTimeout = null;
        }
      },
      onDrag: function() {
        // Durante el arrastre, mantener pausada y normalizar posición para loop infinito
        if (animationInstance.current) {
          animationInstance.current.pause();
        }
        
        // Usar requestAnimationFrame para normalización más suave
        requestAnimationFrame(() => {
          currentX = gsap.getProperty(track, 'x') as number;
          
          // Normalizar para crear efecto de loop infinito
          if (currentX <= -trackWidth) {
            // Si se arrastra más allá del final, resetear al inicio
            const offset = currentX + trackWidth;
            gsap.to(track, { x: offset, duration: 0.1, ease: 'none' });
          } else if (currentX > 0) {
            // Si se arrastra más allá del inicio, ir al final
            const offset = currentX - trackWidth;
            gsap.to(track, { x: offset, duration: 0.1, ease: 'none' });
          }
        });
      },
      onThrowComplete: function() {
        // Cuando termina la inercia, normalizar la posición
        currentX = gsap.getProperty(track, 'x') as number;
        
        // Normalizar para loop infinito
        if (currentX <= -trackWidth) {
          const offset = currentX + trackWidth;
          gsap.set(track, { x: offset });
          currentX = offset;
        } else if (currentX > 0) {
          const offset = currentX - trackWidth;
          gsap.set(track, { x: offset });
          currentX = offset;
        }
        
        // Reanudar animación desde la posición normalizada
        createAnimation(currentX);
      },
      onDragEnd: function() {
        // Si no hay inercia, normalizar y reanudar
        if (!this.isThrowing) {
          currentX = gsap.getProperty(track, 'x') as number;
          
          // Normalizar para loop infinito
          if (currentX <= -trackWidth) {
            const offset = currentX + trackWidth;
            gsap.set(track, { x: offset });
            currentX = offset;
          } else if (currentX > 0) {
            const offset = currentX - trackWidth;
            gsap.set(track, { x: offset });
            currentX = offset;
          }
          
          // Reanudar animación desde la posición normalizada
          createAnimation(currentX);
        }
      },
      onRelease: function() {
        // Si no hubo arrastre real, reanudar inmediatamente
        if (!isDragging) {
          if (clickTimeout) {
            clearTimeout(clickTimeout);
          }
          currentX = gsap.getProperty(track, 'x') as number;
          createAnimation(currentX);
        }
      },
    })[0];
      } catch (error) {
        console.warn('Error loading Draggable plugin:', error);
        // Continuar sin Draggable, solo con la animación automática
      }
    };

    // Inicializar Draggable
    initDraggable();

    // Iniciar animación desde el inicio
    createAnimation(0);

    return () => {
      if (draggableInstance.current) {
        draggableInstance.current.kill();
      }
      if (animationInstance.current) {
        animationInstance.current.kill();
      }
      ctx.revert();
    };
  }, [t]);

  return (
    <section 
      ref={sectionRef}
      id="second" 
      className={styles.page} 
      style={{ position: 'relative', zIndex: 0 }}
    >
      <div className={styles.pageContent}>
        <h2 
          ref={titleRef}
          className={styles.sectionTitle}
          style={{ opacity: 0, transform: 'translateY(40px)' }}
        >
          {t('glassmorphismCarousel.title')}
        </h2>
        <div ref={containerRef} className={styles.marquee} style={{ position: 'relative', zIndex: 2 }}>
          <div ref={trackRef} className={styles.track}>
            {duplicatedCards.map((card, index) => {
              const IconComponent = card.icon;
              const isUnique = index < cards.length;
              return (
                <article 
                  key={`${card.id}-${index}`} 
                  className={styles.card}
                  ref={isUnique ? (el) => {
                    if (el) cardsRef.current[index] = el;
                  } : undefined}
                  style={isUnique ? {
                    opacity: 0,
                    transform: 'translateY(50px) scale(0.95)',
                  } : undefined}
                >
                  <div className={styles.iconWrapper}>
                    <IconComponent className={styles.icon} />
                  </div>
                  <div className={styles.content}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardSubtitle}>{card.subtitle}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
