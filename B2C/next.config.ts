import type { NextConfig } from 'next';
const config: NextConfig = {
  agentRules: false,
  experimental: { agentUpgrade: 'security' },
  outputFileTracingRoot: process.cwd(),
  // Keep recently visited routes warm while browsing in local webpack development.
  onDemandEntries: { maxInactiveAge: 5 * 60 * 1000, pagesBufferLength: 8 },
  async headers() {
    return [
      { source: '/:path*', headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
      ] },
      ...['/images/footer-wallpaper.webp', '/images/footer-wallpaper-light.webp', '/images/brand/faq-gift.webp', '/images/brand/gg-logo.webp', '/images/patterns/diwali-mandala-light.webp'].map(source => ({
        source, headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }]
      })),
      ...['/images/brand/home-festive-07b791112d.webp', '/images/brand/home-lavender-48bcce0407.webp'].map(source => ({
        source, headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
      }))
    ];
  },
  async rewrites() {
    const backend = process.env.BACKEND_URL || 'https://backendbtwoc.vercel.app';
    const authBackend = process.env.AUTH_BACKEND_URL || (process.env.NODE_ENV === 'production' ? 'https://backendbtwoc.vercel.app' : 'http://127.0.0.1:5003');
    return [{ source: '/api/v1/auth/:path*', destination: `${authBackend}/api/v1/auth/:path*` }, { source: '/api/v1/:path*', destination: `${backend}/api/v1/:path*` }];
  },
};
export default config;
