import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Roboto, Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Suspense } from "react";
import PageTransition from "./components/PageTransition";
import StructuredDataClient from "./components/StructuredDataClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://articagroup.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Artica Group - Agencia Digital | Marketing, Desarrollo Web y Producción Audiovisual",
    template: "%s | Artica Group",
  },
  description: "Agencia digital especializada en marketing digital, desarrollo web, diseño gráfico, producción audiovisual y estrategias de comunicación. Transformamos ideas en éxitos empresariales.",
  keywords: [
    "agencia digital",
    "marketing digital",
    "desarrollo web",
    "diseño gráfico",
    "producción audiovisual",
    "publicidad online",
    "community management",
    "posicionamiento web",
    "SEO",
    "campañas publicitarias",
  ],
  authors: [{ name: "Artica Group" }],
  creator: "Artica Group",
  publisher: "Artica Group",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/img/icon.avif',
    shortcut: '/img/icon.avif',
    apple: '/img/icon.avif',
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: baseUrl,
    siteName: "Artica Group",
    title: "Artica Group - Agencia Digital | Marketing, Desarrollo Web y Producción Audiovisual",
    description: "Agencia digital especializada en marketing digital, desarrollo web, diseño gráfico, producción audiovisual y estrategias de comunicación.",
    images: [
      {
        url: `${baseUrl}/img/logo-mini-azul.png`,
        width: 1200,
        height: 630,
        alt: "Artica Group - Agencia Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artica Group - Agencia Digital",
    description: "Transformamos ideas en éxitos empresariales a través de medios digitales",
    images: [`${baseUrl}/img/logo-mini-blanco.png`],
    creator: "@articagroup",
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      'es': baseUrl,
      'en': `${baseUrl}/en`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Agregar aquí los códigos de verificación cuando los tengas
    // google: 'tu-codigo-google',
    // yandex: 'tu-codigo-yandex',
    // bing: 'tu-codigo-bing',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${roboto.variable} ${openSans.variable} ${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <StructuredDataClient />
          <Suspense fallback={null}>
            <PageTransition />
          </Suspense>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
