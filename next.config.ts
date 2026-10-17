import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: 'export', // Enforces a static export
  images: {
    unoptimized: true, // Required because Next.js image optimization needs a server
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  // basePath: '/your-repo-name', // Uncomment this ONLY if deploying to a project page (username.github.io/repo-name)
};

export default nextConfig;

