'use client';

import Hero from './components/Hero';
import GlassmorphismCarousel from './components/GlassmorphismCarousel';
import HorizontalScrollSection from './components/HorizontalScrollSection';
import LogoCarousel from './components/LogoCarousel';
import WhyChooseUs from './components/WhyChooseUs';
import InfiniteImageLoop from './components/InfiniteImageLoop';
import Testimonials from './components/Testimonials';
import Reviews from './components/Reviews';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { useLanguage } from './contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <main className="relative" style={{ background: 'black' }}>
      <Hero />
      <GlassmorphismCarousel />
      <HorizontalScrollSection
        showIntro={false}
        introTitle="Horizontal scroll section"
        introSubtitle="with GSAP ScrollTrigger & Locomotive Scroll"
        introBgColor="#bcb8ad"
        introTextColor="#032f35"
        title={t('horizontalScroll.title')}
        images={[
          '/img/588068320_18012707783802845_1660549442353988258_n.webp',
          '/img/501718820_17992820474802845_1403293369934589556_n.webp',
          '/img/527968796_18000270005802845_7302255861170608236_n.webp',
        ]}
      />
      <WhyChooseUs />
      <InfiniteImageLoop images={[
        '/img/496154304_17989870127802845_6685861079558030072_n.webp',
        '/img/501718820_17992820474802845_1403293369934589556_n.webp',
        '/img/527968796_18000270005802845_7302255861170608236_n.webp',
        '/img/571672548_18010502681802845_1396551934259386008_n.webp',
        '/img/585052310_18012707795802845_696118439204782446_n.webp',
        '/img/611190510_18017730878802845_5666080552791873873_n.webp',
        '/img/496154304_17989870127802845_6685861079558030072_n.webp',
        '/img/501718820_17992820474802845_1403293369934589556_n.webp',
        '/img/527968796_18000270005802845_7302255861170608236_n.webp',
        '/img/571672548_18010502681802845_1396551934259386008_n.webp',
        '/img/585052310_18012707795802845_696118439204782446_n.webp',
        '/img/611190510_18017730878802845_5666080552791873873_n.webp',
      ]} />
      <Testimonials />
      <Reviews />
      <LogoCarousel />
      <ContactForm />
      <Footer />
    </main>
  );
}
