'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedSectionProps {
  id: string;
  title: string;
  className?: string;
  bgUrl: string;
}

export default function AnimatedSection({ id, title, className = '', bgUrl }: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperOuterRef = useRef<HTMLDivElement>(null);
  const wrapperInnerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`section ${className}`}
      style={{
        height: '100%',
        width: '100%',
        top: 0,
        position: 'fixed',
        visibility: 'hidden',
      }}
    >
      <div
        ref={wrapperOuterRef}
        className="wrapper-outer"
        style={{
          width: '100%',
          height: '100%',
          overflowY: 'hidden',
        }}
      >
        <div
          ref={wrapperInnerRef}
          className="wrapper-inner"
          style={{
            width: '100%',
            height: '100%',
            overflowY: 'hidden',
          }}
        >
          <div
            ref={backgroundRef}
            className="background"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              height: '100%',
              width: '100%',
              top: 0,
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%), url(${bgUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <h2
              ref={titleRef}
              className="section-title"
              style={{
                fontSize: 'clamp(1rem, 5vw, 5rem)',
                fontFamily: '"Playfair Display", serif',
                fontWeight: 400,
                textAlign: 'center',
                letterSpacing: '0.5em',
                marginRight: '-0.5em',
                color: 'hsl(0, 0%, 80%)',
                width: '90vw',
                maxWidth: '1200px',
                zIndex: 2,
                willChange: 'transform',
              }}
            >
              {title}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}







