import path from 'node:path';
import type { NextConfig } from 'next';
const config: NextConfig = {
  outputFileTracingRoot: path.resolve(__dirname),
  async rewrites() {
    const backend = process.env.BACKEND_URL || 'https://backendbtwoc.vercel.app';
    return [{ source: '/api/v1/auth/:path*', destination: `${process.env.AUTH_BACKEND_URL || 'https://backendbtwoc.vercel.app'}/api/v1/auth/:path*` }, { source: '/api/v1/:path*', destination: `${backend}/api/v1/:path*` }];
  },
};
export default config;
