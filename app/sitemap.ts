import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://articagroup.com';
  
  // Rutas principales
  const routes = [
    {
      path: '',
      priority: 1.0,
      changeFrequency: 'daily' as const,
    },
    {
      path: '/about',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/contact',
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/portfolio',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/services/desarrollo-web',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/services/diseno-grafico',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/services/posicionamiento-comunicacion',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/services/edicion-videos',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/services/creacion-contenido',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/services/campanas-ads',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/services/publicidad-online',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/services/community-management',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/legal/aviso-legal',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
    {
      path: '/legal/condiciones-uso',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
    {
      path: '/legal/politica-privacidad',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
    {
      path: '/legal/politica-cookies',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
  ];

  // Generar entradas del sitemap
  const sitemapEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return sitemapEntries;
}
