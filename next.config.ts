import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server in .next/standalone, used by the Dockerfile
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
