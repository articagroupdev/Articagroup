import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://articagroup.com';

export const metadata: Metadata = {
  title: 'Portafolio - Artica Group | Casos de Éxito y Proyectos',
  description: 'Explora nuestro portafolio de proyectos exitosos. Diseño web, producción audiovisual, campañas publicitarias y más. Descubre cómo ayudamos a nuestros clientes a alcanzar sus objetivos.',
  keywords: [
    'portafolio',
    'proyectos realizados',
    'casos de éxito',
    'trabajos Artica',
    'proyectos digitales',
    'portfolio agencia digital',
  ],
  openGraph: {
    title: 'Portafolio - Artica Group',
    description: 'Explora nuestro portafolio de proyectos exitosos. Diseño web, producción audiovisual, campañas publicitarias y más.',
    url: `${baseUrl}/portfolio`,
    type: 'website',
    images: [
      {
        url: `${baseUrl}/img/logo-mini-azul.png`,
        width: 1200,
        height: 630,
        alt: 'Portafolio - Artica Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portafolio - Artica Group',
    description: 'Explora nuestro portafolio de proyectos exitosos.',
  },
  alternates: {
    canonical: `${baseUrl}/portfolio`,
    languages: {
      'es': `${baseUrl}/portfolio`,
      'en': `${baseUrl}/en/portfolio`,
    },
  },
};
