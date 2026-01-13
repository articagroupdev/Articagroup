'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  MdArrowDropDown
} from 'react-icons/md';
import {
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline
} from 'react-icons/io5';
import { 
  FaFacebook, 
  FaInstagram, 
  FaTiktok, 
  FaYoutube, 
  FaLinkedin,
  FaWhatsapp
} from 'react-icons/fa';
import Image from 'next/image';

export default function Footer() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();

  return (
    <footer className="relative bg-[#272F66] text-white overflow-hidden z-0">
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/13056195878"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 z-[9998]"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7 text-white" />
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-12 md:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Link href="/">
                <Image
                  src="/img/logo-artica-blanco.png"
                  alt="ARTICA"
                  width={100}
                  height={24}
                  className="h-5 sm:h-6 w-auto max-w-[140px]"
                />
              </Link>
            </div>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              En Artica Group, nos apasiona convertir desafíos en logros.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-5" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              Navegación
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link 
                  href="/" 
                  className={`text-sm sm:text-base transition-colors ${
                    pathname === '/' ? 'text-[#ff9001]' : 'text-gray-300 hover:text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`text-sm sm:text-base transition-colors ${
                    pathname === '/about' ? 'text-[#ff9001]' : 'text-gray-300 hover:text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li className="relative">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors flex items-center gap-1"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Servicios
                  <MdArrowDropDown className={`w-5 h-5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isServicesOpen && (
                  <ul className="mt-2 ml-4 space-y-2">
                    <li>
                      <Link href="/services/creacion-contenido" className="text-sm text-gray-400 hover:text-white transition-colors" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Creación de Contenido
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/campanas-ads" className="text-sm text-gray-400 hover:text-white transition-colors" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Campañas de Ads
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/community-management" className="text-sm text-gray-400 hover:text-white transition-colors" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Community Management
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/desarrollo-web" className="text-sm text-gray-400 hover:text-white transition-colors" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Desarrollo Web
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/diseno-grafico" className="text-sm text-gray-400 hover:text-white transition-colors" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Diseño Gráfico
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/posicionamiento-comunicacion" className="text-sm text-gray-400 hover:text-white transition-colors" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Posicionamiento y Comunicación
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/edicion-videos" className="text-sm text-gray-400 hover:text-white transition-colors" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Edición de Videos
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/publicidad-online" className="text-sm text-gray-400 hover:text-white transition-colors" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        Publicidad Online
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <a 
                  href="#portfolio" 
                  className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Portafolio
                </a>
              </li>
              <li>
                <a 
                  href="#success" 
                  className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Casos de Éxito
                </a>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className={`text-sm sm:text-base transition-colors ${
                    pathname === '/contact' ? 'text-[#ff9001]' : 'text-gray-300 hover:text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-5" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              Legal
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a 
                  href="#legal" 
                  className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Aviso legal
                </a>
              </li>
              <li>
                <a 
                  href="#terms" 
                  className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Condiciones de uso
                </a>
              </li>
              <li>
                <a 
                  href="#privacy" 
                  className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Política de privacidad
                </a>
              </li>
              <li>
                <a 
                  href="#cookies" 
                  className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Política de cookies
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-5" style={{ fontFamily: 'var(--font-kento), "Arial Black", Arial, sans-serif', fontWeight: 'bold' }}>
              Info
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <IoMailOutline className="w-5 h-5 text-[#ff9001] flex-shrink-0 mt-0.5" />
                <a 
                  href="mailto:info@articagroup.us" 
                  className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  info@articagroup.us
                </a>
              </li>
              <li className="flex items-start gap-3">
                <IoCallOutline className="w-5 h-5 text-[#ff9001] flex-shrink-0 mt-0.5" />
                <a 
                  href="tel:+13056195878" 
                  className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  +1 (305) 619-5878
                </a>
              </li>
              <li className="flex items-start gap-3">
                <IoLocationOutline className="w-5 h-5 text-[#ff9001] flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-300" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  7701 NW 46th St Suite 1-A, Miami, FL 33166, Estados Unidos
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10">
          <a
            href="https://www.facebook.com/profile.php?id=100089901333716"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Facebook"
          >
            <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </a>
          <a
            href="https://www.instagram.com/artica_group/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Instagram"
          >
            <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </a>
          <a
            href="https://www.tiktok.com/@articagroup"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="TikTok"
          >
            <FaTiktok className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </a>
          <a
            href="https://www.youtube.com/@grupoartica"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="YouTube"
          >
            <FaYoutube className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </a>
          <a
            href="https://www.linkedin.com/company/artica-group/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </a>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <p className="text-xs sm:text-sm text-gray-400 text-center" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Artica Group LLC © 2026 Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
