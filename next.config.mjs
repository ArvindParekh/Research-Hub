/** @type {import('next').NextConfig} */
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

const nextConfig = {
   eslint: {
      ignoreDuringBuilds: true,
   },
   webpack: (config, { isServer }) => {
      if (isServer) {
         config.plugins = [...config.plugins, new PrismaPlugin()];
      }
      return config;
   },
   experimental: {
      serverActions: {
         bodySizeLimit: "10mb", // Increase body size limit for base64 images
      },
   },
   // Add image domains if using external images
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "**",
         },
      ],
   },
};

export default nextConfig;
