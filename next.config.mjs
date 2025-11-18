/** @type {import('next').NextConfig} */
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
   eslint: {
      ignoreDuringBuilds: true,
   },
   webpack: (config, { isServer }) => {
      if (isServer) {
         config.plugins = [
            ...config.plugins,
            new PrismaPlugin({
               // Tell the plugin where your Prisma client actually is
               prismaClientPath: path.resolve(
                  __dirname,
                  "./src/generated/prisma/client"
               ),
            }),
         ];
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
