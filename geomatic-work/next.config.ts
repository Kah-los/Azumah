import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  experimental: { optimizePackageImports: ["framer-motion", "lucide-react"] },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default config;
