import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/mdklwracd5rti/**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.hbs$/,
      loader: 'handlebars-loader',
    });

    return config;
  },
  outputFileTracingIncludes: {
    '/api/*': [path.join(__dirname, 'templates/**/*')],
  },
};

export default nextConfig;
