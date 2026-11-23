import type { NextConfig } from "next";

const config: NextConfig = {
  // Allows QA to build/serve from an isolated directory without disturbing a
  // running `next dev` that shares the default `.next` folder.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default config;
