'use client';

import ContactHero from '../components/ContactHero';
import ContactIntro from '../components/ContactIntro';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <main className="relative" style={{ background: 'white' }}>
      {/* Hero de Contacto */}
      <ContactHero />
      
      {/* Sección Introductoria */}
      <ContactIntro />
      
      {/* Formulario de Contacto */}
      <ContactForm />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
