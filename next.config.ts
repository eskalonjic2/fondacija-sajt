import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hyuxoqveygyjyztxeebc.supabase.co', // Tvoj postojeći Supabase
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io', // NOVI: ImageKit
        port: '',
        pathname: '/**', // Dodao sam i ovo da bude sigurno za sve putanje
      },
    ],
  },
};

export default nextConfig;