import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://articagroup.com';

export const metadata: Metadata = {
  title: 'Sobre Nosotros - Artica Group',
  description: 'Conoce a Artica Group, tu agencia digital de confianza. Descubre nuestra misión, visión, valores y el equipo de expertos que impulsa el crecimiento de tu marca.',
  keywords: [
    'sobre nosotros',
    'agencia digital',
    'equipo Artica',
    'misión y visión',
    'valores empresariales',
    'historia Artica Group',
  ],
  openGraph: {
    title: 'Sobre Nosotros - Artica Group',
    description: 'Conoce a Artica Group, tu agencia digital de confianza. Descubre nuestra misión, visión, valores y el equipo de expertos.',
    url: `${baseUrl}/about`,
    type: 'website',
    images: [
      {
        url: `${baseUrl}/img/logo-mini-azul.png`,
        width: 1200,
        height: 630,
        alt: 'Sobre Nosotros - Artica Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Nosotros - Artica Group',
    description: 'Conoce a Artica Group, tu agencia digital de confianza.',
  },
  alternates: {
    canonical: `${baseUrl}/about`,
    languages: {
      'es': `${baseUrl}/about`,
      'en': `${baseUrl}/en/about`,
    },
  },
};
