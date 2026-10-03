import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    qualities: [75, 80, 90],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Signal',
            value: 'ai-train=no, search=yes, ai-input=yes',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/collections',
        has: [
          {
            type: 'query',
            key: 'category',
            value: '(?<category>[a-zA-Z0-9-]+)',
          },
        ],
        destination: '/collections/:category',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/b2c',
        destination: 'http://localhost:3001/b2c',
      },
      {
        source: '/b2c/:path*',
        destination: 'http://localhost:3001/b2c/:path*',
      },
      {
        source: '/dealer-partner-gifting',
        destination: '/occasions/dealer-partner-gifting',
      },
      {
        source: '/api/v1/:path*',
        destination: 'http://localhost:5001/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
