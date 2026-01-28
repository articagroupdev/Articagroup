/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', 
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.pexels.com', pathname: '/**' },
    ],
  },
  transpilePackages: ['gsap', 'locomotive-scroll'],
  experimental: {
    optimizePackageImports: ['gsap', '@gsap/react', 'react-icons'],
  },
  async redirects() {
    return [
      { source: '/wp-content/:path*', destination: '/', permanent: true },
      { source: '/wp-admin/:path*', destination: '/', permanent: true },
      { source: '/wp-includes/:path*', destination: '/', permanent: true },
    ];
  },
};

module.exports = nextConfig;