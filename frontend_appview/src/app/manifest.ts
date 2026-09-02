import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Gourmet Gifts',
    short_name: 'The Gourmet Gifts',
    description: 'B2B Corporate Gifting, curated around your brand.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF8F5',
    theme_color: '#FAF8F5',
    icons: [
      {
        src: '/LOGOs.png',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/LOGOs.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
