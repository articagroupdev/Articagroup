'use client';

import { useLanguage } from '../contexts/LanguageContext';

export default function StructuredData() {
  const { language } = useLanguage();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://articagroup.com';
  
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Artica Group',
    url: baseUrl,
    logo: `${baseUrl}/img/logo-mini-azul.png`,
    description: language === 'es' 
      ? 'Agencia digital especializada en marketing digital, desarrollo web, diseño gráfico, producción audiovisual y estrategias de comunicación.'
      : 'Digital agency specialized in digital marketing, web development, graphic design, audiovisual production and communication strategies.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
    sameAs: [
      // Agregar aquí las redes sociales cuando estén disponibles
      // 'https://www.facebook.com/articagroup',
      // 'https://www.instagram.com/articagroup',
      // 'https://www.linkedin.com/company/articagroup',
      // 'https://twitter.com/articagroup',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English'],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Artica Group',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
