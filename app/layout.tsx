import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Roboto, Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Suspense } from "react";
import PageTransition from "./components/PageTransition";

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

export const metadata: Metadata = {
  title: "Artica Group",
  description: "Logramos éxitos empresariales a través de medios digitales",
  icons: {
    icon: '/img/icon.avif',
    shortcut: '/img/icon.avif',
    apple: '/img/icon.avif',
  },
  openGraph: {
    title: "Artica Group",
    description: "Logramos éxitos empresariales a través de medios digitales",
    url: "https://articagroup.vercel.app",
    siteName: "Artica Group",
    images: [
      {
        url: "https://articagroup.vercel.app/img/logo-mini-azul.png",
        width: 1200,
        height: 630,
        alt: "Artica Group",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artica Group",
    description: "Logramos éxitos empresariales a través de medios digitales",
    images: ["https://articagroup.vercel.app/img/logo-mini-blanco.png"],
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
          <Suspense fallback={null}>
            <PageTransition />
          </Suspense>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
