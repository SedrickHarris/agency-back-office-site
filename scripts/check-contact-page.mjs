// Checks the built Contact page (out/contact/index.html) and the Function.
//  - FAILS (exit 1) on: a missing page or Function, a broken or "#" link, an
//    email address, phone number or mailto/tel link, an em dash, a missing or
//    duplicate H1, a missing noindex while NEXT_PUBLIC_SITE_URL is unset, a
//    canonical or JSON-LD without a site URL, or /contact or /api/contact in
//    the sitemap.
//  - REPORTS links rendered as plain text because their route is not built yet.
// Usage: npm run build && npm run links:contact
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const outDir = "out";
const pagePath = join(outDir, "contact", "index.html");
const failures = [];

if (!existsSync(pagePath)) {
  console.error("out/contact/index.html not found. Run `npm run build` first.");
  process.exit(1);
}
if (!existsSync(join("functions", "api", "contact.ts"))) {
  failures.push("functions/api/contact.ts is missing");
}

const html = readFileSync(pagePath, "utf8");
const siteUrlSet = Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim());
const exists = (href) =>
  href === "/" || existsSync(join(outDir, href, "index.html"));

const linked = new Set();
for (const match of html.matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)) {
  const href = match[1];
  if (href === "" || href === "#") {
    failures.push(`${href || "(empty)"} placeholder href`);
    continue;
  }
  if (/^(mailto|tel):/i.test(href)) {
    failures.push(`${href} (no public email or phone may be linked)`);
    continue;
  }
  if (href.startsWith("#") || /^[a-z]+:/i.test(href) || href.startsWith("//")) continue;
  linked.add(href);
  if (!exists(href)) failures.push(`broken link: ${href}`);
}

const unbuilt = new Set();
for (const match of html.matchAll(/data-unbuilt-href="([^"]+)"/g)) {
  unbuilt.add(match[1]);
}

// Visible text only, so scripts and styles cannot trigger the text rules.
const text = html
  .replace(/<script[\s\S]*?<\/script>/g, " ")
  .replace(/<style[\s\S]*?<\/style>/g, " ")
  .replace(/<[^>]+>/g, " ");

if (/[—–]/.test(text)) failures.push("em or en dash in page text");
if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text.replace(/name@example\.com/g, ""))) {
  failures.push("email address in page text");
}
if (/\+?\d(?:[ ().-]?\d){9,}/.test(text)) failures.push("phone-number-like text in page");

const h1s = html.match(/<h1\b/g) ?? [];
if (h1s.length !== 1) failures.push(`expected 1 H1, found ${h1s.length}`);

const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
const canonical = /<link rel="canonical"/.test(html);
const jsonLd = /application\/ld\+json/.test(html);
if (!siteUrlSet) {
  if (!noindex) failures.push("noindex missing while the site URL is unset");
  if (canonical) failures.push("canonical present while the site URL is unset");
  if (jsonLd) failures.push("JSON-LD present while the site URL is unset");
} else {
  if (noindex) failures.push("noindex present with a site URL set");
  if (!canonical) failures.push("canonical missing with a site URL set");
  if (!jsonLd) failures.push("JSON-LD missing with a site URL set");
}

if (/"@type":"(ContactPoint|LocalBusiness|FAQPage|Review|AggregateRating)"/.test(html) || /sameAs/.test(html)) {
  failures.push("unsupported schema type in JSON-LD");
}

const sitemapPath = join(outDir, "sitemap.xml");
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, "utf8");
  if (/\/api\/contact/.test(sitemap)) failures.push("/api/contact in sitemap");
  if (!siteUrlSet && /\/contact/.test(sitemap)) failures.push("/contact/ in sitemap while noindex");
}

console.log(`Linked internal routes (${linked.size}):`);
for (const href of [...linked].sort()) console.log(`  ${href}`);
console.log(`\nShown as text until built (${unbuilt.size}):`);
for (const href of [...unbuilt].sort()) console.log(`  ${href}`);

if (failures.length > 0) {
  console.error(`\nContact page check failed (${failures.length}):`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}
console.log("\nContact page check passed.");
