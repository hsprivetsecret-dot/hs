import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: process.env.GITHUB_ACTIONS === "true" ? "/hs" : "",
  images: { unoptimized: true },
};

export default nextConfig;
