// Routes that have a built page in app/. Links to any other internal route
// render as plain text (see components/ui/SiteLink.tsx) so no link 404s.
// Add a route here in the same change that builds its page.
// scripts/check-home-links.mjs verifies this list against the build output.
export const builtRoutes: ReadonlySet<string> = new Set([
  "/",
  "/about/",
  "/audiences/",
  "/contact/",
  "/get-started/",
  "/resources/",
  "/resources/faq/",
  "/services/",
  "/training/",
  "/training/courses/",
  "/training/live/",
  "/training/sessions/",
  "/training/workshops/",
]);

export function isBuilt(href: string): boolean {
  return builtRoutes.has(href);
}
