import type { NextConfig } from "next";

// Static export so the demo can be hosted anywhere (GitHub Pages, Vercel, S3)
// with no backend. Set NEXT_PUBLIC_BASE_PATH when serving from a sub-path,
// e.g. "/trailarc" for GitHub Pages project sites.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
