'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Section() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current && sectionRef.current && typeof window !== 'undefined') {
        const viewportHeight = window.innerHeight;
        // La sección comienza desde abajo y se desliza hacia arriba
        gsap.fromTo(
          contentRef.current,
          {
            y: viewportHeight * 0.3,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-gray-50"
    >
      <div ref={contentRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-8">
          Hardware
        </h2>
        <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Smooth checkout, every time
        </p>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Choose from a range of sleek options for however you do business. All equally easy to use.
        </p>
      </div>
    </div>
  );
}

