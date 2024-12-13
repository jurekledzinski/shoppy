import type { NextConfig } from 'next';

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
};

export default nextConfig;
