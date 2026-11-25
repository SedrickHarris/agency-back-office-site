// Relative paths with extensions, so node --test can load this file.
import { replays, type Replay } from "../../data/replays.ts";
import {
  SESSIONS_PATH,
  breadcrumb,
  sessionsMeta,
} from "../../data/sessions.ts";
import { absoluteUrl, isProductionBuild, siteUrl } from "../site.ts";

type Site = {
  isProductionBuild: boolean;
  siteUrl: string;
  absoluteUrl: (path: string) => string;
};

// Sessions page JSON-LD: CollectionPage, BreadcrumbList and VideoObject.
// Returns null unless the site URL is configured, so no placeholder URLs ship.
// A VideoObject needs a poster for its thumbnailUrl, so a replay without one is
// left out. No contentUrl, FAQPage, Course, Review, ratings, sameAs or view
// counts. See docs/schema-entity-strategy.md.
export function sessionsSchemaGraph(
  list: readonly Replay[] = replays,
  site: Site = { isProductionBuild, siteUrl, absoluteUrl },
): Record<string, unknown> | null {
  if (!site.isProductionBuild) return null;

  const pageUrl = site.absoluteUrl(SESSIONS_PATH);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: sessionsMeta.title,
        description: sessionsMeta.description,
        isPartOf: { "@id": `${site.siteUrl}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumb.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: site.absoluteUrl(item.href),
        })),
      },
      ...list.flatMap((replay) =>
        replay.poster
          ? [
              {
                "@type": "VideoObject",
                name: replay.title,
                description: replay.description,
                // A file URL, so no trailing slash is added.
                thumbnailUrl: `${site.siteUrl}${replay.poster.src}`,
                uploadDate: replay.recordedOn,
                duration: replay.duration,
                embedUrl: `https://www.youtube-nocookie.com/embed/${replay.youtubeId}`,
              },
            ]
          : [],
      ),
    ],
  };
}
