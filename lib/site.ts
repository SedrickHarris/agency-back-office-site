// Single source for the site URL. Never hardcode the production domain elsewhere.
// NEXT_PUBLIC_SITE_URL is set only for production builds (see .env.example).
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

// TODO: the production domain is not decided. This fallback is only for local
// development and preview builds, and must never be indexed.
const FALLBACK_SITE_URL = "http://localhost:3000";

export const siteUrl = (configuredUrl || FALLBACK_SITE_URL).replace(/\/+$/, "");

// True only when a production URL has been configured for this build.
// Non-production builds (local, preview) must not be crawled or indexed.
export const isProductionBuild = Boolean(configuredUrl);

// Builds an absolute canonical URL with a trailing slash (trailingSlash: true).
export function absoluteUrl(path: string): string {
  const normalized = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}/`;
  return `${siteUrl}${normalized}`;
}
