'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// @ts-ignore - Draggable puede tener problemas de case-sensitivity en diferentes sistemas
import { Draggable } from 'gsap/Draggable';
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

gsap.registerPlugin(ScrollTrigger);
// @ts-ignore
if (typeof Draggable !== 'undefined') {
  // @ts-ignore
  gsap.registerPlugin(Draggable);
}

export default function GlassmorphismCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggableInstance = useRef<Draggable | null>(null);
  const animationInstance = useRef<gsap.core.Tween | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  const cards = [
    {
      id: 1,
      title: 'Creación de Contenido',
      subtitle: 'Capturamos la esencia de tu marca con visuales que conectan y emocionan, dejando una huella memorable en tus clientes.',
      icon: MdCreate,
    },
    {
      id: 2,
      title: 'Campañas de Ads',
      subtitle: 'Diseñamos anuncios impactantes para alcanzar a tu audiencia ideal, maximizando tu inversión y obteniendo resultados medibles.',
      icon: MdCampaign,
    },
    {
      id: 3,
      title: 'Community Management',
      subtitle: 'Gestionamos tus redes sociales de manera estratégica, construyendo una comunidad activa y respondiendo a tus clientes con voz propia.',
      icon: MdPeople,
    },
    {
      id: 4,
      title: 'Desarrollo Web',
      subtitle: 'Creamos sitios web modernos, intuitivos y completamente optimizados que funcionan como el centro digital perfecto para tu negocio.',
      icon: MdCode,
    },
    {
      id: 5,
      title: 'Edición de Videos',
      subtitle: 'Convertimos tus grabaciones originales en piezas audiovisuales dinámicas y cautivadoras, listas para atraer y retener a tu audiencia.',
      icon: MdVideoLibrary,
    },
    {
      id: 6,
      title: 'Diseño Gráfico',
      subtitle: 'Transformamos tus ideas en elementos visuales profesionales y atractivos, abarcando desde logotipos hasta material corporativo.',
      icon: MdPalette,
    },
    {
      id: 7,
      title: 'Estrategia Posicionamiento',
      subtitle: 'Definimos el camino para que tu marca destaque, se posicione en la mente de tus clientes y comunique su valor único.',
      icon: MdTrendingUp,
    },
    {
      id: 8,
      title: 'Publicidad Online',
      subtitle: 'Implementamos soluciones de marketing digital estratégicas enfocadas en resultados, llevando tu marca directamente a nuevos clientes.',
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

    // Crear Draggable sin límites estrictos para scroll infinito
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
      snap: {
        x: function(endValue) {
          // Permitir movimiento libre sin snaps
          return endValue;
        }
      },
      onPress: function() {
        // Pausar animación
        if (animationInstance.current) {
          animationInstance.current.pause();
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
    })[0];

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
  }, []);

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
          ¿Qué podemos hacer por ti?
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
