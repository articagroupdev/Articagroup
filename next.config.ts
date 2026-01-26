import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
    ],
  },
  // Optimizaciones para el build en producción
  reactStrictMode: true,
  // Configuración para manejar módulos del lado del cliente
  transpilePackages: ['gsap', 'locomotive-scroll'],
  // Configuración para evitar errores de hidratación
  experimental: {
    optimizePackageImports: ['gsap', '@gsap/react', 'react-icons'],
  },
  // Configuración de Turbopack (Next.js 16 usa Turbopack por defecto)
  turbopack: {
    // Configuración vacía para silenciar el warning
    // Las configuraciones de webpack se migran automáticamente
  },
  // Redirects 301 para URLs antiguas de WordPress
  async redirects() {
    return [
      // Redirigir todas las URLs de wp-content (WordPress antiguo) a la home
      {
        source: '/wp-content/:path*',
        destination: '/',
        permanent: true, // 301 redirect
      },
      // Redirigir URLs comunes de WordPress que puedan aparecer en resultados
      {
        source: '/wp-admin/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-includes/:path*',
        destination: '/',
        permanent: true,
      },
      // Si conoces URLs específicas antiguas, puedes agregarlas aquí
      // Ejemplo: si tenías /sobre-nosotros en WordPress y ahora es /about
      // {
      //   source: '/sobre-nosotros',
      //   destination: '/about',
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;
