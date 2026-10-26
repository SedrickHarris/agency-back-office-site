import type { MetadataRoute } from "next";
import { absoluteUrl, isProductionBuild } from "@/lib/site";

export const dynamic = "force-static";

// TODO: replace with the full crawler policy in docs/aeo-ai-search-strategy.md
// (per-user-agent rules, training-crawler paths, reserved member prefix).
export default function robots(): MetadataRoute.Robots {
  // Non-production builds (local, preview) disallow all crawling.
  if (!isProductionBuild) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml").replace(/\/$/, ""),
  };
}
