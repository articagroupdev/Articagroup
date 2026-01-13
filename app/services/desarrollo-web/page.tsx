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

export default function DesarrolloWebPage() {
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
                Desarrollo Web
              </h1>

              <p
                ref={subtitleRef}
                className="text-xl sm:text-2xl text-[#272F66]/80 max-w-3xl leading-relaxed text-left mb-4"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                La presencia digital que impulsa tu marca.
              </p>

              <p
                className="text-lg sm:text-xl text-[#272F66]/70 max-w-3xl leading-relaxed text-left"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                Creamos sitios y aplicaciones web modernas, seguras y optimizadas que conectan con tu audiencia y potencian tu negocio.
              </p>
            </div>

            {/* Right Column - Animation */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
                <DotLottieReact
                  src="https://lottie.host/e7dc41f4-1d48-4b96-b236-5683e93ca465/OJ2icj588d.lottie"
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
              Nuestro equipo de desarrollo se enfoca en construir plataformas digitales que no solo sean funcionales, sino también estratégicas y escalables. Desde páginas corporativas hasta complejas soluciones digitales (e-commerce, SaaS, portales interactivos), trabajamos con CMS y tecnologías de vanguardia como React, Astro y Next.js, garantizando velocidad, seguridad y una experiencia de usuario impecable.
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
              Descubre cómo nuestro servicio de desarrollo web puede transformar tu presencia digital y generar resultados tangibles para tu negocio.
            </p>
          </div>

          {/* Cards de beneficios - 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Beneficio 1 - Card destacada con fondo de color */}
            <div className="group relative bg-gradient-to-br from-[#ff9001] to-[#e67e00] rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                  Presencia Digital Profesional
                </h3>
                <p className="text-white/90 leading-relaxed text-sm" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Sitios web modernos y responsivos que transmiten confianza y credibilidad.
                </p>
              </div>
            </div>

            {/* Beneficio 2 - Card con fondo blanco */}
            <div className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-[#ff9001] to-[#e67e00] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-bold text-[#272F66] mb-3" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                  Mayor Visibilidad Online
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Implementamos buenas prácticas de SEO para que tu sitio destaque en buscadores y atraiga más clientes.
                </p>
              </div>
            </div>

            {/* Beneficio 3 - Card con fondo blanco */}
            <div className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-[#ff9001] to-[#e67e00] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-bold text-[#272F66] mb-3" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                  Escalabilidad y Rendimiento
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Tecnologías como React, Astro y Next.js permiten páginas rápidas, seguras y listas para crecer con tu negocio.
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
                Nuestro Proceso de Desarrollo Web
              </h2>
              
              {/* Subtítulo */}
              <p className="text-lg text-gray-600 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Creamos soluciones digitales que se convierten en un activo clave para tu empresa.
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
                    src="/img/servicios/desarrollo.avif"
                    alt="Desarrollo Web"
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#272F66] mb-2" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                    Análisis y Briefing Técnico
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Iniciamos con una inmersión en tus objetivos, audiencia y necesidades. Definimos la arquitectura y funcionalidades que tu proyecto requiere.
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
                    Diseño UX/UI y Prototipado
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Diseñamos interfaces atractivas y responsivas que aseguran una navegación fluida y coherente con tu identidad de marca.
                  </p>
                </div>
              </div>

              {/* Paso 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#13B9D5] to-[#0FA8C2] flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#272F66] mb-2" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                    Desarrollo Front-End y Back-End
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Construimos la parte visual y la lógica interna de tu sitio, integrando bases de datos, sistemas de pago y funcionalidades avanzadas con tecnologías modernas.
                  </p>
                </div>
              </div>

              {/* Paso 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#13B9D5] to-[#0FA8C2] flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#272F66] mb-2" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                    Optimización y Seguridad
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Realizamos pruebas de rendimiento, optimización SEO y configuramos protocolos de seguridad para garantizar estabilidad y confianza.
                  </p>
                </div>
              </div>

              {/* Paso 5 */}
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
                    Entrega y Mantenimiento
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    Finalizamos con la entrega organizada de tu sitio web y ofrecemos soporte continuo para actualizaciones y mejoras.
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
              Preguntas frecuentes sobre Desarrollo Web
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
                    ¿Qué tipo de sitios pueden desarrollar?
                  </h3>
                </div>
              </button>
              <div className="faq-content" style={{ height: 0, overflow: 'hidden' }}>
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-20">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed text-base" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Desde páginas corporativas y blogs hasta tiendas online, plataformas SaaS y aplicaciones web personalizadas.
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
                    ¿Trabajan con mi sitio web actual?
                  </h3>
                </div>
              </button>
              <div className="faq-content" style={{ height: 0, overflow: 'hidden' }}>
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-20">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed text-base" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      Sí. Podemos optimizar tu página existente o crear una nueva solución desde cero, adaptada a tus objetivos.
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
