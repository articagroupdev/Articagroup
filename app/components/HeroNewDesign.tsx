'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ES from 'country-flag-icons/react/3x2/ES';
import US from 'country-flag-icons/react/3x2/US';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const pathname = usePathname();
  const menuRef = useRef<HTMLUListElement>(null);
  const responsiveMenuRef = useRef<HTMLUListElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const heroTextTitleRef = useRef<HTMLUListElement>(null);
  const heroTaglineRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Animación del menú desktop
    if (menuRef.current) {
      const menuLinks = menuRef.current.querySelectorAll('.link');
      gsap.from(menuLinks, {
        opacity: 0,
        y: '100%',
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      });
    }

    // Animación del texto hero
    if (heroTextTitleRef.current && heroTaglineRef.current) {
      const heroTextSpans = heroTextTitleRef.current.querySelectorAll('span');
      const taglineSpans = heroTaglineRef.current.querySelectorAll('span');

      const heroTL = gsap.timeline();
      
      heroTL.from(heroTextSpans, {
        duration: 1.2,
        opacity: 0,
        ease: 'power4.out',
        y: '100%',
        stagger: 0.1,
      });

      heroTL.from(taglineSpans, {
        duration: 1.2,
        ease: 'power4.out',
        y: '100%',
        stagger: 0.1,
      }, '-=0.5');
    }

    // Animación del video con scroll
    if (videoRef.current && videoContainerRef.current) {
      gsap.to(videoRef.current, {
        width: '100%',
        scrollTrigger: {
          trigger: videoContainerRef.current,
          start: 'top 100%',
          end: 'top 0%',
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    // Animación del menú responsive
    if (responsiveMenuRef.current && menuBtnRef.current) {
      const responsiveLinks = responsiveMenuRef.current.querySelectorAll('.link');
      const tl = gsap.timeline({ paused: true });

      tl.to(responsiveMenuRef.current, {
        ease: 'circ.inOut',
        duration: 1.4,
        right: '0%',
      });

      tl.from(responsiveLinks, {
        y: '120%',
        stagger: 0.1,
        duration: 0.8,
      }, '-=0.5');

      if (isMenuOpen) {
        tl.play();
      } else {
        tl.reverse();
      }
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative w-full bg-black overflow-x-hidden">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between relative z-50">
        {/* Logo */}
        <div className="logo">
          <Link href="/">
            <Image
              src="/img/logo-artica-2.avif"
              alt="ARTICA"
              width={50}
              height={50}
              className="w-12 h-auto"
            />
          </Link>
        </div>

        {/* Menú Desktop */}
        <ul
          ref={menuRef}
          className="hidden lg:flex flex-row gap-5 items-center justify-end w-full px-5 list-none"
        >
          <li className="overflow-hidden">
            <Link
              href="/"
              className={`link block font-roboto text-xl font-normal no-underline transition-colors ${
                pathname === '/' ? 'text-[#ff9001]' : 'text-[#e7cfb1] hover:text-[#ff9001]'
              }`}
            >
              Inicio
            </Link>
          </li>
          <li className="overflow-hidden">
            <Link
              href="/about"
              className={`link block font-roboto text-xl font-normal no-underline transition-colors ${
                pathname === '/about' ? 'text-[#ff9001]' : 'text-[#e7cfb1] hover:text-[#ff9001]'
              }`}
            >
              Sobre Nosotros
            </Link>
          </li>
          <li className="overflow-hidden">
            <Link
              href="#services"
              className="link block font-roboto text-xl font-normal no-underline text-[#e7cfb1] hover:text-[#ff9001] transition-colors"
            >
              Servicios
            </Link>
          </li>
          <li className="overflow-hidden">
            <Link
              href="#portfolio"
              className="link block font-roboto text-xl font-normal no-underline text-[#e7cfb1] hover:text-[#ff9001] transition-colors"
            >
              Portafolio
            </Link>
          </li>
          <li className="overflow-hidden">
            <Link
              href="#contact"
              className="link block font-roboto text-xl font-normal no-underline text-[#e7cfb1] hover:text-[#ff9001] transition-colors"
            >
              Contacto
            </Link>
          </li>
          <li className="overflow-hidden">
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="flex items-center justify-center w-7 h-7 transition-all duration-300 hover:scale-110 overflow-hidden rounded"
              aria-label="Cambiar idioma"
            >
              {language === 'es' ? (
                <ES className="w-full h-full object-cover" />
              ) : (
                <US className="w-full h-full object-cover" />
              )}
            </button>
          </li>
        </ul>

        {/* Botón Hamburger */}
        <button
          ref={menuBtnRef}
          onClick={toggleMenu}
          className={`lg:hidden hamburger hamburger--squeeze p-0 ${
            isMenuOpen ? 'is-active' : ''
          }`}
          type="button"
          aria-label="Toggle menu"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>

        {/* Menú Responsive */}
        <ul
          ref={responsiveMenuRef}
          className={`lg:hidden fixed top-full right-0 w-full h-screen bg-black p-6 z-[99] list-none ${
            isMenuOpen ? '' : '-right-full'
          }`}
          style={{ transition: 'right 0.3s ease' }}
        >
          <li className="overflow-y-hidden my-3">
            <Link
              href="/"
              className="link uppercase block no-underline text-[#e7cfb1] text-[clamp(20px,12.5vw,50px)] font-open-sans"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
          </li>
          <li className="overflow-y-hidden my-3">
            <Link
              href="/about"
              className="link uppercase block no-underline text-[#e7cfb1] text-[clamp(20px,12.5vw,50px)] font-open-sans"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Nosotros
            </Link>
          </li>
          <li className="overflow-y-hidden my-3">
            <Link
              href="#services"
              className="link uppercase block no-underline text-[#e7cfb1] text-[clamp(20px,12.5vw,50px)] font-open-sans"
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios
            </Link>
          </li>
          <li className="overflow-y-hidden my-3">
            <Link
              href="#portfolio"
              className="link uppercase block no-underline text-[#e7cfb1] text-[clamp(20px,12.5vw,50px)] font-open-sans"
              onClick={() => setIsMenuOpen(false)}
            >
              Portafolio
            </Link>
          </li>
          <li className="overflow-y-hidden my-3">
            <Link
              href="#contact"
              className="link uppercase block no-underline text-[#e7cfb1] text-[clamp(20px,12.5vw,50px)] font-open-sans"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
          </li>
          <li className="overflow-y-hidden my-3 flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="flex items-center justify-center w-7 h-7 transition-all duration-300 hover:scale-110 overflow-hidden rounded"
              aria-label="Cambiar idioma"
            >
              {language === 'es' ? (
                <ES className="w-full h-full object-cover" />
              ) : (
                <US className="w-full h-full object-cover" />
              )}
            </button>
          </li>
        </ul>
      </header>

      {/* Hero Text Container */}
      <main>
        <div className="w-full min-h-[65vh] flex flex-col items-center justify-center font-arial text-white z-10">
          <ul
            ref={heroTextTitleRef}
            className="list-none text-center flex flex-row justify-center"
          >
            {['C', 'o', 'n', 'v', 'e', 'r', 't', 'i', 'm', 'o', 's', ' ', 'C', 'l', 'i', 'c', 's'].map((letter, index) => (
              <li
                key={index}
                className="text-[36vw] font-black px-0.5 -tracking-[6px] text-[#ff9001] overflow-y-hidden"
              >
                <span className="block font-roboto">{letter}</span>
              </li>
            ))}
          </ul>
          <h3
            ref={heroTaglineRef}
            className="font-roboto text-[clamp(24px,3vw,36px)] font-normal text-center text-[#ff9001] overflow-y-hidden mt-4"
          >
            <span>
              <span className="block">Clics en Clientes</span>
              <span className="block mt-2">
                <span className="block">WE THINK ELASTIC</span>
              </span>
            </span>
          </h3>
        </div>
      </main>

      {/* Video Container */}
      <section
        ref={videoContainerRef}
        className="mt-6 w-full min-h-[67vh] bg-black flex justify-center"
      >
        <video
          ref={videoRef}
          src="https://wethinkelastic.com/assets/videos/video-start.mp4"
          muted
          autoPlay
          loop
          playsInline
          className="w-1/2 h-auto"
        />
      </section>

      <style jsx>{`
        .hamburger {
          display: inline-block;
        }

        .hamburger-box {
          width: 30px;
          height: 24px;
          display: inline-block;
          position: relative;
        }

        .hamburger-inner {
          display: block;
          top: 50%;
          margin-top: -1px;
        }

        .hamburger-inner,
        .hamburger-inner::after {
          width: 30px;
          height: 2px;
          background-color: #e7cfb1 !important;
          border-radius: 0 !important;
          position: absolute;
          transition-property: transform;
          transition-duration: 0.5s !important;
          transition-timing-function: ease-in-out !important;
        }

        .hamburger-inner::before {
          display: none;
        }

        .hamburger-inner::after {
          content: '';
          bottom: -8px;
        }

        .hamburger--squeeze .hamburger-inner {
          transition-duration: 0.075s;
          transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
        }

        .hamburger--squeeze.is-active .hamburger-inner {
          transition-duration: 0.075s;
          transition-delay: 0.12s;
          transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
          transform: rotate(45deg);
        }

        .hamburger--squeeze.is-active .hamburger-inner::after {
          bottom: 0;
          transition: bottom 0.075s 0.12s ease, transform 0.075s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
          transform: rotate(-90deg);
        }

        @media screen and (max-width: 1024px) {
          .hamburger {
            display: inline-block;
          }
        }

        @media screen and (max-width: 720px) {
          .hero_text_container {
            min-height: 60vh;
          }

          #video_container {
            margin-top: 12px;
            width: 100vw;
          }
        }
      `}</style>
    </div>
  );
}
