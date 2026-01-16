'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Navbar from '../components/Navbar';
import styles from './portfolio.module.css';
import { MdPlayArrow, MdClose, MdEmail, MdCode, MdBrush } from 'react-icons/md';
import { SiAdobe, SiAdobeaftereffects, SiAdobepremierepro } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

interface VideoInfo {
  image: string;
  videoLink?: string;
  title?: string;
  videoTitle?: string;
  client?: string;
  tools?: string;
  description?: string;
}

interface PortfolioSection {
  id: string;
  heading: string;
  backgroundImage: string;
  galleryImages?: string[];
  videos?: VideoInfo[];
}

const portfolioSections: PortfolioSection[] = [
  {
    id: 'first',
    heading: 'Ediciones',
    backgroundImage: '/img/Portafolio/fondo-edicion.avif',
    galleryImages: [
      '/img/Portafolio/videos/554937645_827209430252257_209248943060033629_n.avif',
      '/img/Portafolio/videos/590417600_1190962469666812_302998795666163362_n.avif',
      '/img/Portafolio/videos/videoframe_5450-scaled.avif',
      '/img/Portafolio/videos/videoframe_10849.avif',
      '/img/Portafolio/videos/videoframe_26173.avif',
      '/img/Portafolio/videos/videoframe_54502-scaled.avif',
      '/img/Portafolio/videos/525987874_724416670415618_4017155133578734076_n.avif',
    ],
    videos: [
      {
        image: '/img/Portafolio/videos/554937645_827209430252257_209248943060033629_n.avif',
        videoLink: '#',
        title: '',
        videoTitle: '',
        client: '',
        tools: '',
        description: '',
      },
      {
        image: '/img/Portafolio/videos/590417600_1190962469666812_302998795666163362_n.avif',
        videoLink: 'https://res.cloudinary.com/dobuhpxof/video/upload/v1768418761/A%C3%BAn_no_conoc%C3%ADas_el_por_qu%C3%A9_de_nuestro_%C3%A9xito_en_el_mercado_digital_En_ARTICA_Group_manejamo_nkjfwd.mp4',
        title: 'este es el video 2',
        videoTitle: 'Construcción de Marcas Digitales',
        client: 'Artica Group',
        tools: 'Adobe Suite, Premiere Pro, After Effects',
        description: 'Esta pieza audiovisual corporativa y promocional fue desarrollada por Artica Group con el objetivo de establecer a la agencia como un socio estratégico clave en el ámbito digital. La propuesta de valor integral se articula en estrategia, creatividad y resultados tangibles para la construcción de marcas. El contenido detalla la especialización en creación de contenido personalizado y la activación de campañas publicitarias segmentadas (Facebook, Instagram, Google). Se enfatiza que el enfoque estratégico prioritario es la conversión de leads, garantizando un posicionamiento de marca efectivo y el crecimiento real de los clientes.',
      },
      {
        image: '/img/Portafolio/videos/videoframe_5450-scaled.avif',
        videoLink: '#',
        title: '',
        videoTitle: '',
        client: '',
        tools: '',
        description: '',
      },
      {
        image: '/img/Portafolio/videos/videoframe_10849.avif',
        videoLink: '#',
        title: '',
        videoTitle: '',
        client: '',
        tools: '',
        description: '',
      },
      {
        image: '/img/Portafolio/videos/videoframe_26173.avif',
        videoLink: '#',
        title: '',
        videoTitle: '',
        client: '',
        tools: '',
        description: '',
      },
      {
        image: '/img/Portafolio/videos/videoframe_54502-scaled.avif',
        videoLink: '#',
        title: '',
        videoTitle: '',
        client: '',
        tools: '',
        description: '',
      },
      {
        image: '/img/Portafolio/videos/525987874_724416670415618_4017155133578734076_n.avif',
        videoLink: '#',
        title: '',
        videoTitle: '',
        client: '',
        tools: '',
        description: '',
      },
    ],
  },
  {
    id: 'second',
    heading: 'Diseño',
    backgroundImage: '/img/Portafolio/fondo-diseño.avif',
    galleryImages: [
      '/img/Portafolio/diseño grafico/DEST-WALLPANEL-EXT-HOME-DECOR.avif',
      '/img/Portafolio/diseño grafico/FLYER-PROYECTOS-DG-CONCEPT.avif',
      '/img/Portafolio/diseño grafico/HISTORIA-ADS-VENEZUELA-HN.avif',
      '/img/Portafolio/diseño grafico/PORTADA-KITCHEN-MIAMI-OUTDOORS.avif',
      '/img/Portafolio/diseño grafico/PORTADA-NIGHT-FANA-MILLING-CENTER.avif',
      '/img/Portafolio/diseño grafico/POST-LINKEDIN-RSG.avif',
      '/img/Portafolio/diseño grafico/THANKSGIVING-JET-AIR-4.avif',
    ],
  },
  {
    id: 'third',
    heading: 'Email',
    backgroundImage: '/img/Portafolio/fondo-email.avif',
    galleryImages: [
      '/img/Portafolio/email marketing/EMAIL-CORTE-Y-CANTEO-DG-CONCEPT-1.avif',
      '/img/Portafolio/email marketing/EMAIL-PICK-UP-HN.avif',
      '/img/Portafolio/email marketing/EMAIL-SEASON-RSG.avif',
      '/img/Portafolio/email marketing/THANKSGIVING.avif',
    ],
  },
  {
    id: 'fourth',
    heading: 'Web',
    backgroundImage: '/img/Portafolio/fondo-web.avif',
    galleryImages: [
      '/img/Portafolio/diseño web/1.png',
      '/img/Portafolio/diseño web/2.png',
      '/img/Portafolio/diseño web/3.png',
      '/img/Portafolio/diseño web/4.png',
      '/img/Portafolio/diseño web/5.png',
      '/img/Portafolio/diseño web/6.png',
    ],
  },
];

export default function PortfolioPage() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingsRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const outerWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const splitHeadingsRef = useRef<SplitType[]>([]);
  const currentIndexRef = useRef(-1);
  const animatingRef = useRef(false);
  
  // Refs para el carousel
  const galleryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRefs = useRef<(HTMLUListElement | null)[]>([]);
  const dragProxyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const nextButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
  // Refs para la sección de información del video
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);
  const transitionRef = useRef<SVGPathElement | null>(null);
  const videoInfoRef = useRef<HTMLDivElement | null>(null);
  const transitionWrapperRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let Observer: any = null;
    let observerInstance: any = null;

    const initObserver = async () => {
      try {
        // Importación dinámica para evitar problemas de case-sensitivity
        // @ts-ignore - Observer tiene problemas de case-sensitivity en TypeScript
        const ObserverModule = await import('gsap/Observer');
        Observer = ObserverModule.Observer || ObserverModule.default;
        
        if (Observer) {
          gsap.registerPlugin(Observer);
        }

        const sections = sectionsRef.current.filter(Boolean);
        const images = imagesRef.current.filter(Boolean);
        const headings = headingsRef.current.filter(Boolean);
        const outerWrappers = outerWrappersRef.current.filter(Boolean);
        const innerWrappers = innerWrappersRef.current.filter(Boolean);

        if (sections.length === 0 || !Observer) return;

        // Inicializar SplitType para cada heading (solo si existe)
        splitHeadingsRef.current = headings
          .filter((heading): heading is HTMLHeadingElement => heading !== null)
          .map((heading) => {
            try {
              return new SplitType(heading, {
                types: 'chars,words,lines',
                lineClass: 'clip-text',
              });
            } catch (error) {
              console.warn('Error creating SplitType:', error);
              return null;
            }
          })
          .filter((split): split is SplitType => split !== null);

        const wrap = (index: number) => {
          return ((index % sections.length) + sections.length) % sections.length;
        };

        // Configurar estados iniciales
        // La primera sección debe estar visible desde el inicio
        // Usar set inmediato y también estilos inline para asegurar visibilidad
        if (sections[0]) {
          gsap.set(sections[0], { autoAlpha: 1, zIndex: 1, visibility: 'visible', opacity: 1 });
          (sections[0] as HTMLElement).style.visibility = 'visible';
          (sections[0] as HTMLElement).style.opacity = '1';
          (sections[0] as HTMLElement).style.zIndex = '1';
        }
        if (outerWrappers[0]) {
          gsap.set(outerWrappers[0], { yPercent: 0 });
        }
        if (innerWrappers[0]) {
          gsap.set(innerWrappers[0], { yPercent: 0 });
        }
        if (images[0]) {
          gsap.set(images[0], { yPercent: 0 });
        }
        
        // Las demás secciones empiezan ocultas
        for (let i = 1; i < sections.length; i++) {
          gsap.set(sections[i], { autoAlpha: 0, zIndex: 0, visibility: 'hidden', opacity: 0 });
          if (outerWrappers[i]) {
            gsap.set(outerWrappers[i], { yPercent: 100 });
          }
          if (innerWrappers[i]) {
            gsap.set(innerWrappers[i], { yPercent: -100 });
          }
        }
        
        // Establecer el índice actual antes de crear el Observer
        currentIndexRef.current = 0;

        function gotoSection(index: number, direction: number) {
          index = wrap(index);
          animatingRef.current = true;

          const fromTop = direction === -1;
          const dFactor = fromTop ? -1 : 1;

          const tl = gsap.timeline({
            defaults: { duration: 1.25, ease: 'power1.inOut' },
            onComplete: () => {
              animatingRef.current = false;
            },
          });

          if (currentIndexRef.current >= 0 && currentIndexRef.current !== index) {
            gsap.set(sections[currentIndexRef.current], { zIndex: 0 });
            tl.to(images[currentIndexRef.current], { yPercent: -15 * dFactor })
              .set(sections[currentIndexRef.current], { autoAlpha: 0, visibility: 'hidden' });
          }

          gsap.set(sections[index], { autoAlpha: 1, zIndex: 1, visibility: 'visible' });

          tl.fromTo(
            [outerWrappers[index], innerWrappers[index]],
            {
              yPercent: (i: number) => (i ? -100 * dFactor : 100 * dFactor),
            },
            {
              yPercent: 0,
            },
            0
          )
            .fromTo(
              images[index],
              { yPercent: 15 * dFactor },
              { yPercent: 0 },
              0
            )
            // Solo animar el texto si existe el heading y tiene chars
            if (splitHeadingsRef.current[index] && splitHeadingsRef.current[index].chars) {
              tl.fromTo(
                splitHeadingsRef.current[index].chars,
                {
                  autoAlpha: 0,
                  yPercent: 150 * dFactor,
                },
                {
                  autoAlpha: 1,
                  yPercent: 0,
                  duration: 1,
                  ease: 'power2',
                  stagger: {
                    each: 0.02,
                    from: 'random',
                  },
                },
                0.2
              );
            }

          currentIndexRef.current = index;
        }

        observerInstance = Observer.create({
          type: 'wheel,touch,pointer',
          wheelSpeed: -1,
          onDown: () => {
            if (!animatingRef.current) {
              gotoSection(currentIndexRef.current - 1, -1);
            }
          },
          onUp: () => {
            if (!animatingRef.current) {
              gotoSection(currentIndexRef.current + 1, 1);
            }
          },
          tolerance: 10,
          preventDefault: true,
        });

        // Función para esperar a que las imágenes se carguen antes de animar
        const waitForImagesAndAnimate = () => {
          const gallery = galleryRefs.current[0];
          if (!gallery) {
            setTimeout(waitForImagesAndAnimate, 200);
            return;
          }

          // Buscar todas las imágenes en el carousel (incluyendo las duplicadas)
          const allImages = gallery.querySelectorAll('li');
          
          if (allImages.length === 0) {
            setTimeout(waitForImagesAndAnimate, 200);
            return;
          }

          // Verificar que las imágenes de fondo estén cargadas
          let loadedCount = 0;
          const totalImages = allImages.length;
          let hasStarted = false;

          const checkImageLoaded = (element: HTMLElement) => {
            // Para imágenes de fondo, verificar que el estilo backgroundImage esté aplicado
            const bgImage = window.getComputedStyle(element).backgroundImage;
            if (bgImage && bgImage !== 'none') {
              // Crear una imagen para verificar que esté cargada
              const img = new Image();
              const urlMatch = bgImage.match(/url\(["']?([^"']+)["']?\)/);
              if (urlMatch && urlMatch[1]) {
                img.src = urlMatch[1];
                if (img.complete) {
                  loadedCount++;
                } else {
                  img.onload = () => {
                    loadedCount++;
                    if (loadedCount === totalImages && !hasStarted) {
                      startAnimations();
                    }
                  };
                  img.onerror = () => {
                    loadedCount++;
                    if (loadedCount === totalImages && !hasStarted) {
                      startAnimations();
                    }
                  };
                }
              } else {
                loadedCount++;
              }
            } else {
              loadedCount++;
            }

            if (loadedCount === totalImages && !hasStarted) {
              startAnimations();
            }
          };

          const startAnimations = () => {
            if (hasStarted) return;
            hasStarted = true;

            // Usar requestAnimationFrame para asegurar que el layout esté calculado
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                const entranceTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
                
                // Animar el título
                if (splitHeadingsRef.current[0] && splitHeadingsRef.current[0].chars) {
                  gsap.set(splitHeadingsRef.current[0].chars, {
                    autoAlpha: 0,
                    yPercent: 150,
                  });
                  
                  entranceTimeline.to(splitHeadingsRef.current[0].chars, {
                    autoAlpha: 1,
                    yPercent: 0,
                    duration: 1.2,
                    stagger: {
                      each: 0.02,
                      from: 'random',
                    },
                  }, 0);
                }
                
                // Animar el carousel (si existe)
                if (galleryRefs.current[0]) {
                  gsap.set(galleryRefs.current[0], {
                    opacity: 0,
                    y: 50,
                    scale: 0.95,
                  });
                  
                  entranceTimeline.to(galleryRefs.current[0], {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                  }, 0.3);
                }
                
                // Animar los botones de navegación del carousel
                if (prevButtonRefs.current[0] && nextButtonRefs.current[0]) {
                  gsap.set([prevButtonRefs.current[0], nextButtonRefs.current[0]], {
                    opacity: 0,
                    y: 30,
                  });
                  
                  entranceTimeline.to([prevButtonRefs.current[0], nextButtonRefs.current[0]], {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                  }, 0.6);
                }
              });
            });
          };

          // Verificar cada elemento del carousel
          allImages.forEach((li) => {
            checkImageLoaded(li as HTMLElement);
          });

          // Fallback: si después de 3 segundos no se han cargado todas, inicializar de todos modos
          setTimeout(() => {
            if (!hasStarted) {
              startAnimations();
            }
          }, 3000);
        };

        // Inicializar después de un pequeño delay para que el DOM esté listo
        setTimeout(() => {
          waitForImagesAndAnimate();
        }, 100);
      } catch (error) {
        console.warn('Observer plugin not available:', error);
      }
    };

    initObserver();

    return () => {
      if (observerInstance) {
        observerInstance.kill();
      }
      splitHeadingsRef.current.forEach((split) => {
        if (split && split.revert) {
          split.revert();
        }
      });
    };
  }, []);

  // Inicializar el carousel de la primera sección
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Inicializar carousels para todas las secciones que tengan galleryImages
    const sectionsWithGallery = portfolioSections
      .map((section, idx) => ({ section, idx }))
      .filter(({ section }) => section.galleryImages && section.galleryImages.length > 0);

    if (sectionsWithGallery.length === 0) return;

    const initCarousel = async (sectionIndex: number) => {
      try {
        // Importación dinámica de Draggable
        // @ts-ignore - Draggable tiene problemas de case-sensitivity en TypeScript
        const DraggableModule = await import('gsap/Draggable');
        const Draggable = DraggableModule.Draggable || DraggableModule.default;
        
        if (Draggable) {
          gsap.registerPlugin(Draggable);
        }

        const gallery = galleryRefs.current[sectionIndex];
        const cards = cardsRefs.current[sectionIndex];
        if (!gallery || !cards) return;

        let iteration = 0;

        // Obtener todas las imágenes del carousel
        const cardElements = Array.from(cards.querySelectorAll('li')) as HTMLElement[];

        // Configurar estado inicial
        gsap.set(cardElements, { xPercent: 400, opacity: 0, scale: 0 });

        const spacing = 0.1;
        const snapTime = gsap.utils.snap(spacing);

        // Función de animación para cada elemento
        const animateFunc = (element: HTMLElement) => {
          const tl = gsap.timeline();
          tl.fromTo(
            element,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              zIndex: 100,
              duration: 0.5,
              yoyo: true,
              repeat: 1,
              ease: 'power1.in',
              immediateRender: false,
            }
          ).fromTo(
            element,
            { xPercent: 400 },
            { xPercent: -400, duration: 1, ease: 'none', immediateRender: false },
            0
          );
          return tl;
        };

        // Construir el loop sin fin
        const buildSeamlessLoop = (
          items: HTMLElement[],
          spacing: number,
          animateFunc: (item: HTMLElement) => gsap.core.Timeline
        ) => {
          const overlap = Math.ceil(1 / spacing);
          const startTime = items.length * spacing + 0.5;
          const loopTime = (items.length + overlap) * spacing + 1;
          const rawSequence = gsap.timeline({ paused: true });
          const seamlessLoop = gsap.timeline({
            paused: true,
            repeat: -1,
            onRepeat() {
              if (this._time === this._dur) {
                this._tTime += this._dur - 0.01;
              }
            },
          });

          const l = items.length + overlap * 2;
          let time, i, index;

          for (i = 0; i < l; i++) {
            index = i % items.length;
            time = i * spacing;
            rawSequence.add(animateFunc(items[index]), time);
            if (i <= items.length) {
              seamlessLoop.add('label' + i, time);
            }
          }

          rawSequence.time(startTime);
          seamlessLoop
            .to(rawSequence, {
              time: loopTime,
              duration: loopTime - startTime,
              ease: 'none',
            })
            .fromTo(
              rawSequence,
              { time: overlap * spacing + 1 },
              {
                time: startTime,
                duration: startTime - (overlap * spacing + 1),
                immediateRender: false,
                ease: 'none',
              }
            );
          return seamlessLoop;
        };

        const seamlessLoop = buildSeamlessLoop(cardElements, spacing, animateFunc);
        const playhead = { offset: 0 };
        const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

        const scrub = gsap.to(playhead, {
          offset: 0,
          onUpdate() {
            seamlessLoop.time(wrapTime(playhead.offset));
          },
          duration: 0.5,
          ease: 'power3',
          paused: true,
        });

        const progressToScroll = (progress: number) =>
          gsap.utils.clamp(1, trigger.end - 1, gsap.utils.wrap(0, 1, progress) * trigger.end);

        const wrap = (iterationDelta: number, scrollTo: number) => {
          iteration += iterationDelta;
          // No usar trigger.scroll() para evitar afectar el scroll global
          // En su lugar, actualizar directamente el progress
          const newProgress = scrollTo / trigger.end;
          currentProgress = gsap.utils.wrap(0, 1, newProgress);
          scrub.vars.offset = (iteration + currentProgress) * seamlessLoop.duration();
          scrub.invalidate().restart();
        };

        // Crear un contenedor de scroll virtual para el carousel
        // Esto evita que el scroll afecte la navbar
        const scrollContainer = document.createElement('div');
        scrollContainer.style.cssText = 'position: absolute; width: 1px; height: 3000px; top: 0; left: 0; pointer-events: none; opacity: 0; z-index: -1;';
        document.body.appendChild(scrollContainer);

        let currentProgress = 0;

        const trigger = ScrollTrigger.create({
          trigger: scrollContainer,
          start: 0,
          end: 3000,
          onUpdate(self) {
            const scroll = self.scroll();
            if (scroll > self.end - 1) {
              wrap(1, 2);
            } else if (scroll < 1 && self.direction < 0) {
              wrap(-1, self.end - 2);
            } else {
              currentProgress = self.progress;
              scrub.vars.offset = (iteration + currentProgress) * seamlessLoop.duration();
              scrub.invalidate().restart();
            }
          },
        });

        const scrollToOffset = (offset: number) => {
          const snappedTime = snapTime(offset);
          const progress = (snappedTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration();
          const scroll = progressToScroll(progress);
          if (progress >= 1 || progress < 0) {
            return wrap(Math.floor(progress), scroll);
          }
          // Actualizar directamente el progress sin usar trigger.scroll para evitar afectar el scroll global
          currentProgress = gsap.utils.wrap(0, 1, progress);
          scrub.vars.offset = (iteration + currentProgress) * seamlessLoop.duration();
          scrub.invalidate().restart();
        };

        // Event listeners para los botones
        ScrollTrigger.addEventListener('scrollEnd', () => scrollToOffset(scrub.vars.offset));

        // Funciones para los botones
        const handleNext = () => {
          scrollToOffset(scrub.vars.offset + spacing);
        };

        const handlePrev = () => {
          scrollToOffset(scrub.vars.offset - spacing);
        };

        if (nextButtonRefs.current[sectionIndex]) {
          nextButtonRefs.current[sectionIndex]!.addEventListener('click', handleNext);
        }

        if (prevButtonRefs.current[sectionIndex]) {
          prevButtonRefs.current[sectionIndex]!.addEventListener('click', handlePrev);
        }

        // Funcionalidad de arrastre
        let draggableInstance: any = null;
        if (Draggable && dragProxyRefs.current[sectionIndex] && cards) {
          const dragProxy = dragProxyRefs.current[sectionIndex]!;
          draggableInstance = Draggable.create(dragProxy, {
            type: 'x',
            trigger: cards,
            onPress() {
              // @ts-ignore
              this.startOffset = scrub.vars.offset;
            },
            onDrag() {
              // @ts-ignore
              scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
              scrub.invalidate().restart();
            },
            onDragEnd() {
              scrollToOffset(scrub.vars.offset);
            },
          });
        }

        return () => {
          // Cleanup: matar todas las animaciones y event listeners
          if (trigger) trigger.kill();
          if (scrollContainer && scrollContainer.parentNode) {
            scrollContainer.parentNode.removeChild(scrollContainer);
          }
          seamlessLoop.kill();
          scrub.kill();
          if (draggableInstance && draggableInstance[0]) {
            draggableInstance[0].kill();
          }
          if (nextButtonRefs.current[sectionIndex]) {
            nextButtonRefs.current[sectionIndex]!.removeEventListener('click', handleNext);
          }
          if (prevButtonRefs.current[sectionIndex]) {
            prevButtonRefs.current[sectionIndex]!.removeEventListener('click', handlePrev);
          }
        };
      } catch (error) {
        console.warn('Error initializing carousel:', error);
      }
    };

    // Inicializar carousel para cada sección con galleryImages
    // Usar setTimeout para asegurar que las refs estén disponibles
    const initCarousels = () => {
      sectionsWithGallery.forEach(({ idx }) => {
        // Verificar que las refs estén disponibles antes de inicializar
        if (galleryRefs.current[idx] && cardsRefs.current[idx]) {
          initCarousel(idx);
        } else {
          // Si no están disponibles, intentar de nuevo después de un breve delay
          setTimeout(() => {
            if (galleryRefs.current[idx] && cardsRefs.current[idx]) {
              initCarousel(idx);
            }
          }, 100);
        }
      });
    };

    // Esperar a que el DOM esté completamente renderizado
    setTimeout(initCarousels, 200);
  }, []);

  return (
    <div className={styles.portfolioContainer}>
      <Navbar />
      {portfolioSections.map((section, index) => (
        <section
          key={section.id}
          ref={(el) => {
            if (el) sectionsRef.current[index] = el;
          }}
          className={`${styles.section} ${styles[section.id]} ${index === 0 ? styles.first : ''}`}
        >
          <div
            ref={(el) => {
              if (el) outerWrappersRef.current[index] = el;
            }}
            className={styles.outer}
          >
            <div
              ref={(el) => {
                if (el) innerWrappersRef.current[index] = el;
              }}
              className={styles.inner}
            >
              <div
                ref={(el) => {
                  if (el) imagesRef.current[index] = el;
                }}
                className={`${styles.bg} ${index === 0 ? styles.one : ''}`}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%), url(${section.backgroundImage})`,
                }}
              >
                <div className={styles.contentWrapper}>
                  <div className={styles.headingWrapper}>
                    <div className={styles.headingIcon}>
                      {index === 0 && <MdPlayArrow />}
                      {index === 1 && <MdBrush />}
                      {index === 2 && <MdEmail />}
                      {index === 3 && <MdCode />}
                    </div>
                    <h2
                      ref={(el) => {
                        if (el) {
                          headingsRef.current[index] = el;
                          if (index === 0) titleRef.current = el;
                        }
                      }}
                      className={styles.sectionHeading}
                    >
                      {section.heading}
                    </h2>
                  </div>
                  
                  {section.galleryImages && section.galleryImages.length > 0 && (
                    <div
                      ref={(el) => {
                        if (el) {
                          galleryRefs.current[index] = el;
                          if (index === 0) carouselRef.current = el;
                        }
                      }}
                      className={styles.gallery}
                    >
                      <ul
                        ref={(el) => {
                          if (el) cardsRefs.current[index] = el;
                        }}
                        className={styles.cards}
                      >
                        {[...section.galleryImages, ...section.galleryImages].map((image, imgIndex) => {
                          // Calcular el índice real de la imagen (sin duplicación)
                          const realImageIndex = imgIndex % section.galleryImages!.length;
                          // Obtener el video correspondiente usando el índice real de la imagen
                          const video = section.videos?.[realImageIndex];
                          // Codificar la URL para manejar espacios en los nombres de carpetas
                          const encodedImage = encodeURI(image);
                          return (
                            <li
                              key={imgIndex}
                              style={{
                                backgroundImage: `url(${encodedImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                              }}
                              className={styles.cardItem}
                            >
                              {section.galleryImages && section.galleryImages.length > 0 && (
                                <button
                                  className={styles.videoInfoButton}
                                  onClick={() => {
                                    if (index === 0 && video) {
                                      console.log('Video clicked:', realImageIndex, video);
                                      setSelectedVideoIndex(realImageIndex);
                                    } else {
                                      // Para otras secciones, puedes agregar funcionalidad aquí
                                      console.log('Image clicked:', realImageIndex, section.id);
                                    }
                                  }}
                                  aria-label={
                                    index === 0 ? "Ver información del video" : 
                                    index === 1 ? "Ver diseño gráfico" :
                                    index === 2 ? "Ver email marketing" :
                                    "Ver desarrollo web"
                                  }
                                >
                                  {index === 0 && <MdPlayArrow className={styles.playIcon} />}
                                  {index === 1 && <MdBrush className={styles.playIcon} />}
                                  {index === 2 && <MdEmail className={styles.playIcon} />}
                                  {index === 3 && <MdCode className={styles.playIcon} />}
                                </button>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                      {section.galleryImages && section.galleryImages.length > 0 && (
                        <>
                          <div 
                            ref={(el) => {
                              if (index === 0) buttonsRef.current = el;
                            }}
                            className={styles.actions}
                          >
                            <button
                              ref={(el) => {
                                if (el) prevButtonRefs.current[index] = el;
                              }}
                              className={styles.prev}
                            >
                              Prev
                            </button>
                            <button
                              ref={(el) => {
                                if (el) nextButtonRefs.current[index] = el;
                              }}
                              className={styles.next}
                            >
                              Next
                            </button>
                          </div>
                          <div 
                            ref={(el) => {
                              if (el) dragProxyRefs.current[index] = el;
                            }} 
                            className={styles.dragProxy} 
                          />
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
      
      {/* Sección de información del video con transición */}
      {selectedVideoIndex !== null && 
       portfolioSections[0].videos && 
       portfolioSections[0].videos[selectedVideoIndex] && (
        <VideoInfoSection
          video={portfolioSections[0].videos[selectedVideoIndex]}
          onClose={() => setSelectedVideoIndex(null)}
          transitionRef={transitionRef}
          videoInfoRef={videoInfoRef}
          transitionWrapperRef={transitionWrapperRef}
        />
      )}
    </div>
  );
}

// Componente para la sección de información del video
function VideoInfoSection({
  video,
  onClose,
  transitionRef,
  videoInfoRef,
  transitionWrapperRef,
}: {
  video: VideoInfo;
  onClose: () => void;
  transitionRef: React.RefObject<SVGPathElement | null>;
  videoInfoRef: React.RefObject<HTMLDivElement | null>;
  transitionWrapperRef: React.RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    if (!transitionRef.current) return;

    const path = transitionRef.current;
    const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
    const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

    // Usar animación de path en lugar de MorphSVG (que requiere plugin premium)
    const tl = gsap.timeline();
    
    // Animar el path manualmente
    tl.to(path, {
      attr: { d: start },
      ease: "power2.in",
      duration: 0.6,
    })
    .to(path, {
      attr: { d: end },
      ease: "power2.out",
      duration: 0.6,
    });

    // Mostrar el contenido después de la animación
    if (videoInfoRef.current) {
      // Asegurar que el contenido sea visible desde el inicio
      // Usar translateY en lugar de y para no interferir con el transform de centrado
      gsap.set(videoInfoRef.current, { 
        opacity: 0, 
        display: 'block', 
        visibility: 'visible',
        transform: 'translate(-50%, calc(-50% + 50px))' // Mantener centrado horizontal y agregar offset vertical inicial
      });
      gsap.to(videoInfoRef.current, {
        opacity: 1,
        transform: 'translate(-50%, -50%)', // Centrado perfecto
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
      });
    }

    return () => {
      tl.kill();
    };
  }, [transitionRef, videoInfoRef]);

  const handleClose = () => {
    if (!transitionRef.current || !videoInfoRef.current) return;

    const path = transitionRef.current;
    const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";

    const tl = gsap.timeline({
      onComplete: onClose,
    });

    // Ocultar contenido primero
    if (videoInfoRef.current) {
      gsap.to(videoInfoRef.current, {
        opacity: 0,
        transform: 'translate(-50%, calc(-50% + 50px))', // Mantener centrado horizontal
        duration: 0.4,
        ease: "power3.in",
      });
    }

    // Revertir la animación del path
    tl.to(path, {
      attr: { d: start },
      ease: "power2.in",
      duration: 0.6,
    })
    .to(path, {
      attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
      ease: "power2.out",
      duration: 0.6,
    });
  };

  return (
    <div className={styles.videoInfoOverlay} ref={transitionWrapperRef}>
      <div className={styles.transitionWrapper}>
        <svg
          className={styles.transition}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMin slice"
        >
          <defs>
            <linearGradient
              id="grad"
              x1={0}
              y1={0}
              x2={99}
              y2={99}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="rgb(39, 47, 102)" />
              <stop offset="1" stopColor="rgb(30, 37, 80)" />
            </linearGradient>
          </defs>
          <path
            ref={transitionRef}
            className={styles.path}
            stroke="url(#grad)"
            fill="url(#grad)"
            strokeWidth="2px"
            vectorEffect="non-scaling-stroke"
            d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
          />
        </svg>
      </div>
      
      <div ref={videoInfoRef} className={styles.videoInfoContent}>
        <button className={styles.closeButton} onClick={handleClose} aria-label="Cerrar">
          <MdClose />
        </button>
        
        <div className={styles.videoInfoInner}>
          <div className={styles.videoInfoGrid}>
            {/* Columna izquierda: Reproductor de video */}
            <div className={styles.videoPlayerColumn}>
              {video.videoLink && video.videoLink !== '#' ? (
                <div className={styles.videoPlayer}>
                  <video
                    controls
                    className={styles.videoElement}
                    src={video.videoLink}
                    preload="metadata"
                    playsInline
                    crossOrigin="anonymous"
                  >
                    Tu navegador no soporta la reproducción de video.
                  </video>
                </div>
              ) : (
                <div className={styles.videoPlayer}>
                  <p style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
                    Video no disponible
                  </p>
                </div>
              )}
            </div>
            
            {/* Columna derecha: Descripción */}
            <div className={styles.videoDescriptionColumn}>
              {video.title && (
                <p className={styles.videoTitleSmall}>{video.title}</p>
              )}
              
              <h3 className={styles.videoTitle}>Video</h3>
              
              {video.videoTitle && (
                <h2 className={styles.videoMainTitle}>{video.videoTitle}</h2>
              )}
              
              {video.client && (
                <p className={styles.videoClient}>{video.client}</p>
              )}
              
              {video.tools && (
                <div className={styles.videoTools}>
                  <h4 className={styles.videoToolsTitle}>Herramientas Utilizadas</h4>
                  <div className={styles.videoToolsList}>
                    {video.tools.split(',').map((tool, index) => {
                      const toolName = tool.trim();
                      let IconComponent = null;
                      
                      if (toolName.toLowerCase().includes('adobe suite') || toolName.toLowerCase().includes('adobe')) {
                        IconComponent = SiAdobe;
                      } else if (toolName.toLowerCase().includes('premiere')) {
                        IconComponent = SiAdobepremierepro;
                      } else if (toolName.toLowerCase().includes('after effects')) {
                        IconComponent = SiAdobeaftereffects;
                      }
                      
                      return (
                        <div key={index} className={styles.videoToolItem}>
                          {IconComponent && <IconComponent className={styles.videoToolIcon} />}
                          <span>{toolName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {video.description && (
                <div className={styles.videoDescription}>
                  <p>{video.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
