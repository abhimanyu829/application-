import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  turbopack: {
    root: process.cwd(),
  },
  // Allow access to remote image placeholder and backend uploads.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      // Production VPS — team member avatar uploads
      {
        protocol: 'https',
        hostname: 'abhibhidevelopers.online',
        port: '',
        pathname: '/uploads/**',
      },
      // Development — local backend
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5000',
        pathname: '/uploads/**',
      },
    ],
  },
  output: 'standalone',
  transpilePackages: ['motion'],
  // ensure Next infers the correct root when multiple lockfiles exist
  outputFileTracingRoot: process.cwd(),
  webpack: (config, context) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    if (context.dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
