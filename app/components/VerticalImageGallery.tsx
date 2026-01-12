'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './VerticalImageGallery.module.css';

gsap.registerPlugin(ScrollTrigger);

interface MediaItem {
  src: string;
  alt: string;
  title: string;
  gridArea: string;
  alignRight?: boolean;
}

const defaultImages: MediaItem[] = [
  {
    src: 'https://images.pexels.com/photos/3618545/pexels-photo-3618545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900',
    alt: 'SportsWare',
    title: 'SportsWare',
    gridArea: 'cat-sport',
    alignRight: true,
  },
  {
    src: 'https://images.pexels.com/photos/5207262/pexels-photo-5207262.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900',
    alt: 'Graphic Tees',
    title: 'Graphic Tees',
    gridArea: 'cat-tees',
  },
  {
    src: 'https://images.pexels.com/photos/3371358/pexels-photo-3371358.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900',
    alt: 'Ladies Hoodies',
    title: 'Ladies Hoodies',
    gridArea: 'cat-hoodies',
  },
  {
    src: 'https://images.pexels.com/photos/3618545/pexels-photo-3618545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900',
    alt: 'Ladies Shirts',
    title: 'Ladies Shirts',
    gridArea: 'cat-ladies-shirts',
  },
  {
    src: 'https://images.pexels.com/photos/5207262/pexels-photo-5207262.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900',
    alt: 'Youth Fashion',
    title: 'Youth Fashion',
    gridArea: 'cat-youth',
  },
  {
    src: 'https://images.pexels.com/photos/3371358/pexels-photo-3371358.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900',
    alt: 'Kids Fashion',
    title: 'Kids Fashion',
    gridArea: 'cat-kids',
  },
  {
    src: 'https://images.pexels.com/photos/4791474/pexels-photo-4791474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900',
    alt: 'Perfume & Cologne',
    title: 'Perfume & Cologne',
    gridArea: 'cat-cologne',
    alignRight: true,
  },
  {
    src: 'https://images.pexels.com/photos/3618545/pexels-photo-3618545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900',
    alt: 'Mens Shirts',
    title: 'Mens Shirts',
    gridArea: 'cat-mens-shirts',
  },
  {
    src: 'https://images.pexels.com/photos/4791474/pexels-photo-4791474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900',
    alt: 'Ladies Intimates',
    title: 'Ladies Intimates',
    gridArea: 'cat-intimate',
  },
];

interface VerticalImageGalleryProps {
  images?: MediaItem[];
}

export default function VerticalImageGallery({
  images = defaultImages,
}: VerticalImageGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animación de entrada de todas las imágenes
      if (wrapperRef.current) {
        const items = wrapperRef.current.querySelectorAll('a');
        
        gsap.fromTo(
          items,
          { opacity: 0, scale: 0.95, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [images]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.wrapper} ref={wrapperRef}>
        {images.map((item, index) => (
          <a
            key={index}
            href="#"
            style={{ '--grid-area': item.gridArea } as React.CSSProperties}
            className={styles.galleryLink}
          >
            <img src={item.src} alt={item.alt} className={styles.media} />
          </a>
        ))}
        <a
          href="#"
          style={{ '--grid-area': 'banner' } as React.CSSProperties}
          className={styles.galleryLink}
        >
          <img 
            src="https://images.pexels.com/photos/3618545/pexels-photo-3618545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900" 
            alt="Banner" 
            className={styles.media} 
          />
        </a>
      </div>
    </section>
  );
}
