import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://articagroup.com';

export const metadata: Metadata = {
  title: 'Contacto - Artica Group | Hablemos de tu Proyecto',
  description: 'Contacta con Artica Group. Estamos aquí para ayudarte a convertir tus ideas en resultados reales. Escríbenos y empecemos a crear juntos la estrategia que tu marca necesita.',
  keywords: [
    'contacto',
    'contactar Artica',
    'solicitar presupuesto',
    'consulta agencia digital',
    'formulario contacto',
  ],
  openGraph: {
    title: 'Contacto - Artica Group',
    description: 'Contacta con Artica Group. Estamos aquí para ayudarte a convertir tus ideas en resultados reales.',
    url: `${baseUrl}/contact`,
    type: 'website',
    images: [
      {
        url: `${baseUrl}/img/logo-mini-azul.png`,
        width: 1200,
        height: 630,
        alt: 'Contacto - Artica Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto - Artica Group',
    description: 'Contacta con Artica Group. Estamos aquí para ayudarte.',
  },
  alternates: {
    canonical: `${baseUrl}/contact`,
    languages: {
      'es': `${baseUrl}/contact`,
      'en': `${baseUrl}/en/contact`,
    },
  },
};
