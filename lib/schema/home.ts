import { homeMeta, hero } from "@/data/home";
import { absoluteUrl, isProductionBuild, siteUrl } from "@/lib/site";

const ORGANIZATION_NAME = "Agency Back Office";

// Home page JSON-LD as a single @graph: Organization, WebSite, WebPage.
// Returns null unless the site URL is configured, so no placeholder URLs ship.
// No sameAs, logo, address, LocalBusiness, SearchAction, FAQPage, or Course.
// See docs/schema-entity-strategy.md.
export function homeSchemaGraph(): Record<string, unknown> | null {
  if (!isProductionBuild) return null;

  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;
  const pageUrl = absoluteUrl("/");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: ORGANIZATION_NAME,
        description: hero.definition,
        url: pageUrl,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: ORGANIZATION_NAME,
        url: pageUrl,
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: homeMeta.title,
        description: homeMeta.description,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
      },
    ],
  };
}
