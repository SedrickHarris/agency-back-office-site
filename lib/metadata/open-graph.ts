import type { Metadata } from "next";
import { homeMeta } from "@/data/home";

export const OG_IMAGE = {
  url: "/brand/og-home.png",
  width: 1200,
  height: 630,
  alt: "Agency Back Office - Practical Agency Training",
};

// Resolved against metadataBase (lib/site.ts) when the site URL is set.
export function homeOpenGraph(): Metadata["openGraph"] {
  return {
    title: homeMeta.title,
    description: homeMeta.description,
    url: "/",
    siteName: "Agency Back Office",
    type: "website",
    images: [OG_IMAGE],
  };
}
