'use client';

import AboutHeroNew from '../components/AboutHeroNew';
import AboutSection from '../components/AboutSection';
import MissionVision from '../components/MissionVision';
import Values from '../components/Values';
import Team from '../components/Team';
import WhyChooseUsAbout from '../components/WhyChooseUsAbout';
import HowWeWork from '../components/HowWeWork';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <main className="relative" style={{ background: 'white' }}>
      {/* Hero de Sobre Nosotros con nuevo diseño */}
      <AboutHeroNew />
      
      {/* Sección Conoce a Artica Group */}
      <AboutSection />
      
      {/* Sección Misión y Visión */}
      <MissionVision />
      
      {/* Sección Valores Fundamentales */}
      <Values />
      
      {/* Sección Nuestro Equipo */}
      <Team />
      
      {/* Sección ¿Por qué somos tu mejor opción? */}
      <WhyChooseUsAbout />
      
      {/* Sección Cómo trabajamos en Artica */}
      <HowWeWork />
      
      {/* Formulario de Contacto */}
      <ContactForm />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
