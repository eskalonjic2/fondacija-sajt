import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hyuxoqveygyjyztxeebc.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;