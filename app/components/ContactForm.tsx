'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MdEmail, MdPhone, MdArrowForward } from 'react-icons/md';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const leftSectionRef = useRef<HTMLDivElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    source: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Form submitted:', formData);
  };

  useEffect(() => {
    if (!sectionRef.current || !leftSectionRef.current || !rightSectionRef.current) return;

    const ctx = gsap.context(() => {
      // Verificar si el elemento ya está en el viewport
      const checkVisibility = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top < windowHeight * 0.85;
      };

      // Animación de la sección izquierda
      const leftSection = leftSectionRef.current!;
      const isLeftVisible = checkVisibility(leftSection);
      if (isLeftVisible) {
        // Si ya es visible, mostrarlo inmediatamente
        gsap.set(leftSection, { opacity: 1, x: 0 });
      } else {
        gsap.set(leftSection, { opacity: 0, x: -50 });
        gsap.to(leftSection, {
          opacity: 1,
          x: 0,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftSection,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1.5,
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Animación de la sección derecha (formulario)
      const rightSection = rightSectionRef.current!;
      const isRightVisible = checkVisibility(rightSection);
      if (isRightVisible) {
        // Si ya es visible, mostrarlo inmediatamente
        gsap.set(rightSection, { opacity: 1, x: 0 });
      } else {
        gsap.set(rightSection, { opacity: 0, x: 50 });
        gsap.to(rightSection, {
          opacity: 1,
          x: 0,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rightSection,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1.5,
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50 min-h-screen flex items-center justify-center z-0 m-0 p-0 py-12 md:py-16 lg:py-20"
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-8 lg:py-16 relative z-10">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Section - Information */}
            <div ref={leftSectionRef} className="bg-white p-6 sm:p-8 md:p-8 lg:p-12 flex flex-col justify-center">
              <p className="font-sans text-xs sm:text-sm text-gray-500 uppercase tracking-wider mb-4">
                {t('contact.form.estamosAqui')}
              </p>
              
              <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-[#272F66] mb-3 sm:mb-4 md:mb-5 lg:mb-6 leading-tight" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
                {t('contact.form.hablemos')}
              </h2>
              
              <p className="text-sm sm:text-base md:text-sm lg:text-base text-gray-600 mb-4 sm:mb-5 md:mb-6 lg:mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                {t('contact.form.escribenos')}
              </p>
              
              <p className="text-sm sm:text-base md:text-sm lg:text-base text-gray-600 font-semibold mb-6 sm:mb-7 md:mb-8 lg:mb-10" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                {t('contact.form.primerPaso')}
              </p>

              {/* Contact Info */}
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ff9001]/10 flex items-center justify-center flex-shrink-0">
                    <MdEmail className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff9001]" />
                  </div>
                  <div>
                    <p className="font-sans text-xs sm:text-sm text-gray-600 mb-1" style={{ color: '#4B5563' }}>{t('contact.form.eMail')}</p>
                    <a 
                      href="mailto:info@articagroup.us" 
                      className="font-sans text-sm sm:text-base font-medium transition-colors"
                      style={{ color: '#4B5563', textDecoration: 'none' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ff9001'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#4B5563'}
                    >
                      info@articagroup.us
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ff9001]/10 flex items-center justify-center flex-shrink-0">
                    <MdPhone className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff9001]" />
                  </div>
                  <div>
                    <p className="font-sans text-xs sm:text-sm text-gray-600 mb-1" style={{ color: '#4B5563' }}>{t('contact.form.telefonoLabel')}</p>
                    <a 
                      href="tel:+13056195878" 
                      className="font-sans text-sm sm:text-base font-medium transition-colors"
                      style={{ color: '#4B5563', textDecoration: 'none' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ff9001'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#4B5563'}
                    >
                      +1 (305) 619-5878
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Form */}
            <div ref={rightSectionRef} className="bg-white p-6 sm:p-8 md:p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-4 lg:space-y-5">
                {/* Nombre y Email en fila */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-4 lg:gap-5">
                  {/* Nombre y apellido */}
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block font-sans text-xs sm:text-sm font-medium text-[#272F66] mb-1.5 sm:mb-2"
                    >
                      {t('contact.form.nombre')} <span className="text-[#ff9001]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.form.nombre')}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-[#272F66] focus:ring-2 focus:ring-[#272F66]/20 outline-none transition-all font-sans text-sm sm:text-base text-[#272F66] placeholder-gray-400"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block font-sans text-xs sm:text-sm font-medium text-[#272F66] mb-1.5 sm:mb-2"
                    >
                      {t('contact.form.email')} <span className="text-[#ff9001]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-[#272F66] focus:ring-2 focus:ring-[#272F66]/20 outline-none transition-all font-sans text-sm sm:text-base text-[#272F66] placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Empresa y Teléfono en fila */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-4 lg:gap-5">
                  {/* Empresa */}
                  <div>
                    <label 
                      htmlFor="company" 
                      className="block font-sans text-xs sm:text-sm font-medium text-[#272F66] mb-1.5 sm:mb-2"
                    >
                      {t('contact.form.empresa')}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t('contact.form.empresa')}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-[#272F66] focus:ring-2 focus:ring-[#272F66]/20 outline-none transition-all font-sans text-sm sm:text-base text-[#272F66] placeholder-gray-400"
                    />
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label 
                      htmlFor="phone" 
                      className="block font-sans text-xs sm:text-sm font-medium text-[#272F66] mb-1.5 sm:mb-2"
                    >
                      {t('contact.form.telefono')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (234) 567-890"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-[#272F66] focus:ring-2 focus:ring-[#272F66]/20 outline-none transition-all font-sans text-sm sm:text-base text-[#272F66] placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* ¿Cómo nos conociste? */}
                <div>
                  <label 
                    htmlFor="source" 
                    className="block font-sans text-xs sm:text-sm font-medium text-[#272F66] mb-1.5 sm:mb-2"
                  >
                    {t('contact.form.comoNosConociste')}
                  </label>
                  <input
                    type="text"
                    id="source"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    placeholder={t('contact.form.comoNosConociste')}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-[#272F66] focus:ring-2 focus:ring-[#272F66]/20 outline-none transition-all font-sans text-sm sm:text-base text-[#272F66] placeholder-gray-400"
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label 
                    htmlFor="message" 
                    className="block font-sans text-xs sm:text-sm font-medium text-[#272F66] mb-1.5 sm:mb-2"
                  >
                    {t('contact.form.mensaje')} <span className="text-[#ff9001]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.mensaje')}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-[#272F66] focus:ring-2 focus:ring-[#272F66]/20 outline-none transition-all font-sans text-sm sm:text-base text-[#272F66] placeholder-gray-400 resize-y"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#272F66] hover:bg-[#1a2144] text-white font-sans font-semibold text-sm sm:text-base px-6 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl"
                >
                  <span>{t('contact.form.enviar')}</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-all">
                    <MdArrowForward className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
