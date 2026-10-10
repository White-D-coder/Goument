import path from 'node:path';
import type { NextConfig } from 'next';
const config: NextConfig = {
  async rewrites() {
    const backend = process.env.BACKEND_URL || 'https://backendbtwoc.vercel.app';
    const authBackend = process.env.AUTH_BACKEND_URL || (process.env.NODE_ENV === 'production' ? 'https://backendbtwoc.vercel.app' : 'http://127.0.0.1:5003');
    return [{ source: '/api/v1/auth/:path*', destination: `${authBackend}/api/v1/auth/:path*` }, { source: '/api/v1/:path*', destination: `${backend}/api/v1/:path*` }];
  },
};
export default config;
