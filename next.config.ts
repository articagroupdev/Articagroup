import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
};

export default nextConfig;
