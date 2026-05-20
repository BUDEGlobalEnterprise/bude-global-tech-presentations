import type { NextConfig } from "next";

// Static export is only applied for production builds (GH Pages). In dev,
// running without `output: export` avoids the dynamic-route validation
// quirks that don't reflect actual deployed behavior.
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  ...(isProd ? { output: "export" as const, trailingSlash: true } : {}),
  images: { unoptimized: true },
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
