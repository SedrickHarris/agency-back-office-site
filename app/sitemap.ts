import type { MetadataRoute } from "next";
import { CONTACT_PATH } from "@/data/contact";
import { absoluteUrl, isProductionBuild } from "@/lib/site";

export const dynamic = "force-static";

// Lists only canonical, indexable pages. Pages are indexable only once the
// site URL is configured (the launch gate), so the list is empty before then.
// Populate from data/page-registry.ts as more pages are published.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProductionBuild) return [];

  // /contact/ is listed only here, after the launch gate. /api/contact is a
  // non-page endpoint and is never listed.
  return [{ url: absoluteUrl("/") }, { url: absoluteUrl(CONTACT_PATH) }];
}
