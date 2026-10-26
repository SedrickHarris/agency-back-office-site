import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Lists only canonical, indexable pages. The home stub is noindex, so the list
// is empty for now. Populate from data/page-registry.ts using absoluteUrl()
// from lib/site.ts when real pages are published.
export default function sitemap(): MetadataRoute.Sitemap {
  return [];
}
