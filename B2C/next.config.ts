import path from 'node:path';
import type { NextConfig } from 'next';
const config: NextConfig = {
  outputFileTracingRoot: path.resolve(__dirname),
  async rewrites() {
    const backend = process.env.BACKEND_URL || 'http://127.0.0.1:5002';
    return [{ source: '/api/v1/auth/:path*', destination: `${process.env.AUTH_BACKEND_URL || 'http://127.0.0.1:5003'}/api/v1/auth/:path*` }, { source: '/api/v1/:path*', destination: `${backend}/api/v1/:path*` }];
  },
};
export default config;
