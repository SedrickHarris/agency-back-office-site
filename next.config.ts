import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: all pages are generated at build time, no server runtime.
  // Approved in docs/decisions-change-log.md (2026-10-25).
  output: "export",

  // Matches the trailing-slash URL patterns in docs/url-routing-strategy.md.
  trailingSlash: true,

  // Static export has no runtime image optimizer. Use pre-optimized assets.
  images: { unoptimized: true },

  // No redirects, rewrites, or headers here: they are unsupported in a static
  // export. Use public/_redirects and public/_headers instead.
};

export default nextConfig;
