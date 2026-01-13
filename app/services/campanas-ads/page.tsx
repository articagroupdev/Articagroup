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

export default function CampanasAdsPage() {
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
                Campañas de Ads
              </h1>

              <p
                ref={subtitleRef}
                className="text-xl sm:text-2xl text-[#272F66]/80 max-w-3xl leading-relaxed text-left mb-4"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                Maximiza tu alcance e impulsa tus resultados.
              </p>

              <p
                className="text-lg sm:text-xl text-[#272F66]/70 max-w-3xl leading-relaxed text-left"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                Llegamos a tu cliente ideal en el momento preciso con anuncios estratégicos y optimizados para la conversión.
              </p>
            </div>

            {/* Right Column - Animation */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
                <DotLottieReact
                  src="https://lottie.host/a0d44c5e-6126-41a6-a4c8-c008326b6176/OrsgYNnpCk.lottie"
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
              Diseñamos, lanzamos y optimizamos campañas publicitarias enfocadas 100% en la conversión, asegurando el máximo Retorno de la Inversión (ROI). Llegamos a tu cliente ideal en el momento preciso con anuncios estratégicos y optimizados para cada plataforma, maximizando tu alcance e impulsando tus resultados.
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
              Descubre cómo nuestras campañas de ads pueden transformar tu presencia digital y generar resultados tangibles para tu negocio.
            </p>
          </div>

          {/* Cards de beneficios - 3 cards en lugar de 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Beneficio 1 - Card destacada con fondo de color */}
            <div className="group relative bg-gradient-to-br from-[#ff9001] to-[#e67e00] rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                  Resultados Inmediatos y Medibles
                </h3>
                <p className="text-white/90 leading-relaxed text-sm" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Las campañas de anuncios ofrecen una visibilidad instantánea y te permiten medir con exactitud el retorno de la inversión (ROI) de cada peso invertido, optimizando el presupuesto en tiempo real.
                </p>
              </div>
            </div>

            {/* Beneficio 2 - Card con fondo blanco */}
            <div className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-[#ff9001] to-[#e67e00] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-bold text-[#272F66] mb-3" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                  Segmentación Hiper-Efectiva
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Llegamos exclusivamente a las personas con mayor probabilidad de comprar tus productos o servicios, basándonos en sus intereses, demografía y comportamiento, evitando el gasto innecesario.
                </p>
              </div>
            </div>

            {/* Beneficio 3 - Card con fondo blanco */}
            <div className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-[#ff9001] to-[#e67e00] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-bold text-[#272F66] mb-3" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                  Crecimiento Escalable del Negocio
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Una vez que encontramos las campañas que funcionan, podemos escalar rápidamente tu inversión para aumentar significativamente el volumen de clientes potenciales o ventas de tu negocio.
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
                Nuestro Proceso de Campañas de Ads
              </h2>
              
              {/* Subtítulo */}
              <p className="text-lg text-gray-600 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Diseñamos, lanzamos y optimizamos campañas publicitarias enfocadas 100% en la conversión, asegurando el máximo Retorno de la Inversión (ROI).
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
                    src="/img/servicios/ads.jpg"
                    alt="Campañas de Ads"
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#272F66] mb-2" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                    Configuración Estratégica y Segmentación
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Definimos los objetivos claros de la campaña (Leads, Ventas, Tráfico) y construimos el funnel publicitario. Configuramos la segmentación precisa de la audiencia y la instalación correcta de píxeles y eventos de conversión.
                  </p>
                </div>
              </div>

              {/* Paso 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#13B9D5] to-[#0FA8C2] flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#272F66] mb-2" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                    Producción de Creativos de Alto Rendimiento
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Nuestro equipo creativo diseña y produce los anuncios (imágenes, videos, copies) optimizados para cada plataforma. Aplicamos técnicas probadas para captar la atención y motivar la acción inmediata en el público objetivo.
                  </p>
                </div>
              </div>

              {/* Paso 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#13B9D5] to-[#0FA8C2] flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#272F66] mb-2" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                    Lanzamiento, Pruebas A/B y Optimización Diaria
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Activamos la campaña con presupuestos de prueba, realizando tests A/B constantes sobre audiencias y creativos. Monitoreamos métricas clave (CTR, CPA) para optimizar diariamente el gasto y eliminar rápidamente lo que no funciona.
                  </p>
                </div>
              </div>

              {/* Paso 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#13B9D5] to-[#0FA8C2] flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#272F66] mb-2" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                    Escalabilidad y Reporte de ROI
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Una vez identificados los anuncios ganadores, procedemos a la escalabilidad de las campañas para maximizar resultados. Entregamos informes transparentes que detallan el rendimiento de la inversión (ROI) y las estrategias para el próximo ciclo.
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
              Preguntas frecuentes sobre Campañas de Ads
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
                    ¿En qué plataformas implementan las campañas de ads?
                  </h3>
                </div>
              </button>
              <div className="faq-content" style={{ height: 0, overflow: 'hidden' }}>
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-20">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed text-base" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Trabajamos con las principales plataformas de publicidad digital, incluyendo Google Ads (búsqueda, display, YouTube), Meta Ads (Facebook e Instagram), TikTok Ads y LinkedIn Ads, seleccionando las que mejor se ajustan a tu público objetivo.
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
                    ¿Qué necesito para empezar una campaña de ads?
                  </h3>
                </div>
              </button>
              <div className="faq-content" style={{ height: 0, overflow: 'hidden' }}>
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-20">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed text-base" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Necesitas un objetivo claro (¿más ventas, leads o tráfico?), un presupuesto definido para la inversión publicitaria y la certeza de que tu sitio web o página de destino (landing page) está optimizada para recibir el tráfico que generaremos.
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
