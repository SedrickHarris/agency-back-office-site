import { CONTACT_PATH, breadcrumb, contactMeta } from "@/data/contact";
import { absoluteUrl, isProductionBuild, siteUrl } from "@/lib/site";

// Contact page JSON-LD: ContactPage and BreadcrumbList only.
// Returns null unless the site URL is configured, so no placeholder URLs ship.
// No contactPoint (no public contact method exists), LocalBusiness, FAQPage,
// Review, AggregateRating, or sameAs. See docs/schema-entity-strategy.md.
export function contactSchemaGraph(): Record<string, unknown> | null {
  if (!isProductionBuild) return null;

  const pageUrl = absoluteUrl(CONTACT_PATH);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: contactMeta.title,
        description: contactMeta.description,
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumb.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: absoluteUrl(item.href),
        })),
      },
    ],
  };
}
