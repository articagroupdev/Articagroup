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
  swcMinify: true,
  // Configuración para manejar módulos del lado del cliente
  transpilePackages: ['gsap', 'locomotive-scroll'],
  // Configuración para evitar errores de hidratación
  experimental: {
    optimizePackageImports: ['gsap', '@gsap/react', 'react-icons'],
  },
  // Configuración de webpack para manejar mejor las dependencias
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
