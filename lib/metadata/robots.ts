import type { Metadata } from "next";
import { isProductionBuild } from "@/lib/site";

// Page-level robots meta. Flips with the launch gate: pages are noindex until
// NEXT_PUBLIC_SITE_URL is set, so robots.txt and page metadata release together.
export function pageRobots(): Metadata["robots"] {
  return isProductionBuild
    ? { index: true, follow: true }
    : { index: false, follow: false };
}
