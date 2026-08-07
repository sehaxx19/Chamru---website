import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Prisma 7 + Turbopack (Next.js 16) fix: without this, the generated Prisma
  // client resolves fine on disk but Turbopack fails to find it at request
  // time ("Cannot find module '.prisma/client/default'"). Keeping these
  // packages external avoids Turbopack trying (and failing) to bundle them.
  serverExternalPackages: [
    "@prisma/client",
    "@prisma/adapter-neon",
    "@neondatabase/serverless",
  ],
  turbopack: {
    resolveAlias: {
      ".prisma/client/default": "./node_modules/.prisma/client/default.js",
    },
  },
};

export default nextConfig;
