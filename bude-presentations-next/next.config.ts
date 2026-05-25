import type { NextConfig } from "next";

// Static export is only applied for production builds. In dev, running
// without `output: export` avoids dynamic-route validation quirks that don't
// reflect actual deployed behavior.
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  ...(isProd ? { output: "export" as const, trailingSlash: true } : {}),
  images: { unoptimized: true },
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  webpack: (config, { isServer, webpack }) => {
    // The export libraries (pptxgenjs, docx, jspdf) are browser-capable but
    // statically reference Node built-ins for their Node code paths. On the
    // client, strip the `node:` scheme and stub the built-ins to empty so
    // webpack doesn't choke (those code paths never run in the browser).
    if (!isServer) {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/^node:/, (resource: { request: string }) => {
          resource.request = resource.request.replace(/^node:/, "");
        }),
      );
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        stream: false,
        crypto: false,
        zlib: false,
        http: false,
        https: false,
      };
    }
    return config;
  },
};

export default nextConfig;
