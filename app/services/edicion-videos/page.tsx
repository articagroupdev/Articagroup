'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Navbar from '../../components/Navbar';
import ContactForm from '../../components/ContactForm';
import Footer from '../../components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function EdicionVideosPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const consistSectionRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const faqItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del hero
      if (titleRef.current && subtitleRef.current) {
        gsap.set([titleRef.current, subtitleRef.current], {
          opacity: 0,
          y: 50,
        });

        gsap.to([titleRef.current, subtitleRef.current], {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.2,
        });
      }

      // Animaciones con ScrollTrigger
      const sections = [
        { ref: consistSectionRef, start: 'top 85%' },
        { ref: benefitsRef, start: 'top 80%' },
        { ref: processRef, start: 'top 75%' },
        { ref: faqRef, start: 'top 80%' },
      ];

      sections.forEach(({ ref, start }) => {
        if (ref.current) {
          const children = ref.current.children;
          gsap.set(children, { opacity: 0, y: 60 });

          gsap.to(children, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: ref.current,
              start,
              end: 'top 50%',
              scrub: 1.5,
            },
          });
        }
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const toggleFaq = (index: number) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  useEffect(() => {
    faqItemsRef.current.forEach((item, index) => {
      if (item) {
        const content = item.querySelector('.faq-content') as HTMLElement;
        const arrow = item.querySelector('.faq-arrow') as HTMLElement;
        
        if (content && arrow) {
          if (openFaq === index) {
            gsap.to(content, {
              height: 'auto',
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
            });
            gsap.to(arrow, {
              rotation: 180,
              duration: 0.3,
              ease: 'power2.out',
            });
          } else {
            gsap.to(content, {
              height: 0,
              opacity: 0,
              duration: 0.4,
              ease: 'power2.out',
            });
            gsap.to(arrow, {
              rotation: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          }
        }
      }
    });
  }, [openFaq]);

  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(/img/fondo-1.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0
          }}
        ></div>
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-white/60" style={{ zIndex: 1 }}></div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[#13B9D5]/20 rounded-full border border-[#13B9D5]/30">
                <div className="w-2 h-2 rounded-full bg-[#13B9D5] animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-[#13B9D5] uppercase tracking-wider">
                  Servicio
                </span>
              </div>

              <h1
                ref={titleRef}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#272F66] mb-6 leading-tight text-left"
                style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'normal' }}
              >
                Edición de Videos
              </h1>

              <p
                ref={subtitleRef}
                className="text-xl sm:text-2xl text-[#272F66]/80 max-w-3xl leading-relaxed text-left mb-4"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                El video es el rey. Haz que tu contenido brille.
              </p>

              <p
                className="text-lg sm:text-xl text-[#272F66]/70 max-w-3xl leading-relaxed text-left"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                Transformamos tu material grabado en piezas profesionales, cautivadoras y que generan impacto.
              </p>
            </div>

            {/* Right Column - Animation */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
                <DotLottieReact
                  src="https://lottie.host/0b0f35de-ad72-41de-a314-7700a33cc16a/biPDeqenCL.lottie"
                  loop
                  autoplay
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿En qué consiste? Section */}
      <section
        ref={consistSectionRef}
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(/img/fondo-0.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0
          }}
        ></div>
        {/* Semi-transparent dark overlay */}
        <div className="absolute inset-0 bg-black/60" style={{ zIndex: 1 }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              ¿En qué consiste?
            </h2>
            <p className="text-lg sm:text-xl text-white leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Nuestro equipo convierte tus grabaciones en videos de alta calidad que conectan con la personalidad de tu negocio. Desde el montaje y corrección de color hasta el diseño sonoro y la inclusión de motion graphics, adaptamos cada detalle a la plataforma y objetivo final.
            </p>
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section
        ref={benefitsRef}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header centrado */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#272F66] mb-6 leading-tight" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              Estos son los beneficios para tu empresa
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Descubre cómo nuestro servicio de edición de videos puede transformar tu presencia digital y generar resultados tangibles para tu negocio.
            </p>
          </div>

          {/* Cards de beneficios - 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Beneficio 1 - Card destacada con fondo de color */}
            <div className="group relative bg-gradient-to-br from-[#ff9001] to-[#e67e00] rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                  Aumento del Engagement y Retención
                </h3>
                <p className="text-white/90 leading-relaxed text-sm" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Los videos con un acabado pulcro y dinámico retienen la atención de la audiencia por más tiempo, aumentando las interacciones y garantizando que tu mensaje sea visto por completo.
                </p>
              </div>
            </div>

            {/* Beneficio 2 - Card con fondo blanco */}
            <div className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-[#ff9001] to-[#e67e00] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-bold text-[#272F66] mb-3" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                  Percepción de Profesionalidad y Marca Sólida
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Una edición impecable y consistente eleva la imagen de tu marca, estableciéndote como un referente serio y de alta calidad en tu sector.
                </p>
              </div>
            </div>

            {/* Beneficio 3 - Card con fondo blanco */}
            <div className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-[#ff9001] to-[#e67e00] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-bold text-[#272F66] mb-3" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                  Optimización para Cada Plataforma
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Adaptamos el formato (vertical, horizontal, cuadrado) y la duración para que tu video rinda al máximo en YouTube, Instagram, TikTok o cualquier canal, asegurando el mejor retorno.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso Section */}
      <section
        ref={processRef}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Grid: Título, Subtítulo, Imagen (Izquierda) y Pasos (Derecha) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Columna Izquierda: Título, Subtítulo e Imagen */}
            <div className="flex flex-col">
              {/* Título */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#272F66] mb-4 uppercase" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                Nuestro Proceso de Edición de Videos
              </h2>
              
              {/* Subtítulo */}
              <p className="text-lg text-gray-600 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Transformamos tus grabaciones en historias cautivadoras, optimizadas para conectar y retener la atención de tu audiencia digital.
              </p>

              {/* Imagen horizontal (ancha y baja) que se alinea con el final del último paso */}
              <div className="relative w-full" style={{ height: '400px' }}>
                <div 
                  className="relative w-full h-full overflow-hidden"
                  style={{
                    borderRadius: '24px 24px 0 24px',
                  }}
                >
                  <Image
                    src="/img/servicios/edicion.jpg"
                    alt="Edición de Videos"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                </div>
              </div>
            </div>

            {/* Columna Derecha: Pasos del Proceso */}
            <div className="space-y-8">
              {/* Paso 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#13B9D5] to-[#0FA8C2] flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#272F66] mb-2" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                    Comprensión del Objetivo y Guionización
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Analizamos el material grabado y definimos el objetivo principal del video (conversión, engagement, branding). Desarrollamos la estructura narrativa y el guion de edición para maximizar la efectividad en la plataforma de destino.
                  </p>
                </div>
              </div>

              {/* Paso 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#13B9D5] to-[#0FA8C2] flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#272F66] mb-2" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                    Edición, Ritmo y Estructura Narrativa
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Nuestro equipo da vida a la historia. Cortamos, ensamblamos y ajustamos el ritmo, seleccionando las mejores tomas. Integramos narración, música libre de derechos y efectos de sonido para mantener a la audiencia enganchada.
                  </p>
                </div>
              </div>

              {/* Paso 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#13B9D5] to-[#0FA8C2] flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#272F66] mb-2" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                    Postproducción y Diseño Gráfico en Movimiento
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Añadimos valor con corrección de color profesional, gráficos en movimiento, textos animados y subtítulos dinámicos. Esto asegura que el video no solo se vea impecable, sino que también cumpla con los estándares estéticos de tu marca.
                  </p>
                </div>
              </div>

              {/* Paso 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#13B9D5] to-[#0FA8C2] flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#272F66] mb-2" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                    Optimización para Plataformas y Entrega Final
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    El video se exporta y optimiza en el formato y duración ideales para cada plataforma (Instagram Reels, YouTube, TikTok, Campañas de Pago). Entregamos el material listo para ser publicado, garantizando la máxima calidad en cualquier dispositivo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={faqRef}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#272F66] mb-4" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              Preguntas frecuentes sobre Edición de Videos
            </h2>
          </div>

          <div className="space-y-5">
            {/* FAQ 1 */}
            <div
              ref={(el) => { faqItemsRef.current[0] = el; }}
              className="group bg-white rounded-xl border border-gray-200 hover:border-[#ff9001] transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(0)}
                className="w-full p-6 sm:p-8 text-left flex items-start gap-4 hover:bg-gray-50/50 transition-colors duration-200"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff9001] to-[#e67e00] flex items-center justify-center">
                    <svg
                      className="faq-arrow w-5 h-5 text-white transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-[#272F66] mb-0 group-hover:text-[#ff9001] transition-colors duration-200" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                    ¿Qué tipos de videos pueden editar?
                  </h3>
                </div>
              </button>
              <div className="faq-content" style={{ height: 0, overflow: 'hidden' }}>
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-20">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed text-base" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Editamos una amplia gama de formatos, incluyendo videos para redes sociales (Reels, Shorts), tutoriales, entrevistas, videos corporativos, y anuncios. Nos adaptamos a las especificaciones de plataformas como Instagram, TikTok y YouTube.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div
              ref={(el) => { faqItemsRef.current[1] = el; }}
              className="group bg-white rounded-xl border border-gray-200 hover:border-[#ff9001] transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(1)}
                className="w-full p-6 sm:p-8 text-left flex items-start gap-4 hover:bg-gray-50/50 transition-colors duration-200"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff9001] to-[#e67e00] flex items-center justify-center">
                    <svg
                      className="faq-arrow w-5 h-5 text-white transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-[#272F66] mb-0 group-hover:text-[#ff9001] transition-colors duration-200" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                    ¿Qué incluye el servicio de edición?
                  </h3>
                </div>
              </button>
              <div className="faq-content" style={{ height: 0, overflow: 'hidden' }}>
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-20">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed text-base" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      El servicio incluye montaje creativo, corrección de color profesional, limpieza y diseño sonoro, optimización de velocidad (cámara lenta o rápida) y la integración de motion graphics y subtítulos si son necesarios.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <ContactForm />
      
      <Footer />
    </main>
  );
}
