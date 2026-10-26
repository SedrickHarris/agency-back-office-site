import type { MetadataRoute } from "next";

// Placeholder: finalize rules and sitemap URL once the production domain is confirmed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*" },
  };
}
