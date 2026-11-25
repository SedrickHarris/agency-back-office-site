// Checks the built Sessions page (out/training/sessions/index.html).
//  - FAILS (exit 1) on: a missing page, a broken or "#" link, anything but one
//    H1, a skipped heading level, a missing breadcrumb, replay numbering or
//    placeholder annotation text, an em dash, any element that would request
//    youtube.com, youtube-nocookie.com or ytimg.com before a click, a missing
//    poster file, a canonical, JSON-LD or sitemap entry that does not match the
//    site-URL launch gate, or an excluded schema type.
//  - REPORTS links rendered as plain text because their route is not built yet.
// Links to youtube.com watch pages are allowed: a link requests nothing.
// Usage: npm run build && npm run links:sessions
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const outDir = "out";
const pagePath = join(outDir, "training", "sessions", "index.html");
const failures = [];

if (!existsSync(pagePath)) {
  console.error(`${pagePath} not found. Run \`npm run build\` first.`);
  process.exit(1);
}

const html = readFileSync(pagePath, "utf8");
const siteUrlSet = Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim());
const exists = (href) =>
  href === "/" || existsSync(join(outDir, href, "index.html"));
// Markup only: script contents (the page data and JSON-LD) request nothing.
const markup = html.replace(/(<script\b[^>]*>)[\s\S]*?<\/script>/g, "$1</script>");

const linked = new Set();
for (const match of markup.matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)) {
  const href = match[1];
  if (href === "" || href === "#") {
    failures.push(`${href || "(empty)"} placeholder href`);
    continue;
  }
  if (href.startsWith("#") || /^[a-z]+:/i.test(href) || href.startsWith("//")) continue;
  linked.add(href);
  if (!exists(href)) failures.push(`broken link: ${href}`);
}

const unbuilt = new Set();
for (const match of markup.matchAll(/data-unbuilt-href="([^"]+)"/g)) {
  unbuilt.add(match[1]);
}

// Every tag except an <a> can make the browser fetch what it names.
const thirdParty = /youtube(?:-nocookie)?\.com|ytimg\.com|youtu\.be/i;
for (const [tag, name] of markup.matchAll(/<([a-z][a-z0-9-]*)\b[^>]*>/gi)) {
  if (name.toLowerCase() !== "a" && thirdParty.test(tag)) {
    failures.push(`YouTube request before interaction: ${tag.slice(0, 120)}`);
  }
}
for (const [, css] of markup.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
  if (thirdParty.test(css)) failures.push("YouTube URL in inline CSS");
}
if (/<iframe\b/i.test(markup)) failures.push("iframe in the HTML before interaction");

const text = markup
  .replace(/<style[\s\S]*?<\/style>/g, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ");
if (/[—–]/.test(text)) failures.push("em or en dash in page text");
if (/replay\s+(?:#\s*)?\d+\s+of\s+\d+|\b12 replays\b/i.test(text)) {
  failures.push("replay numbering or a replay count claim in page text");
}
if (/to be supplied|thumbnail placeholder|board note/i.test(markup)) {
  failures.push("design annotation or placeholder copy in the page");
}

const levels = [...markup.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
const h1s = levels.filter((level) => level === 1).length;
if (h1s !== 1) failures.push(`expected 1 H1, found ${h1s}`);
levels.forEach((level, i) => {
  if (level > (levels[i - 1] ?? 0) + 1) {
    failures.push(`skipped heading level before an H${level}`);
  }
});
if (!/<h1\b[^>]*>Session replays<\/h1>/.test(markup)) failures.push("unexpected H1 text");

const crumbs = markup.match(/<nav\b[^>]*aria-label="Breadcrumb"[^>]*>([\s\S]*?)<\/nav>/);
const crumbText = crumbs?.[1].replace(/<[^>]+>/g, "").replace(/\s+/g, "");
if (crumbText !== "Home/Training/Sessions") failures.push("breadcrumb missing or wrong");

// Self-hosted posters must exist in the export.
for (const [, src] of markup.matchAll(/<img\b[^>]*?\ssrc="(\/[^"]+)"/g)) {
  if (!existsSync(join(outDir, src))) failures.push(`missing image: ${src}`);
}

const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
const canonical = /<link rel="canonical"/.test(html);
const jsonLd = /<script type="application\/ld\+json"/.test(html);
if (!siteUrlSet) {
  if (!noindex) failures.push("noindex missing while the site URL is unset");
  if (canonical) failures.push("canonical present while the site URL is unset");
  if (jsonLd) failures.push("JSON-LD present while the site URL is unset");
} else {
  if (noindex) failures.push("noindex present with a site URL set");
  if (!canonical) failures.push("canonical missing with a site URL set");
  if (!jsonLd) failures.push("JSON-LD missing with a site URL set");
}

if (/"@type":"(FAQPage|Course|Review|AggregateRating)"|"sameAs"|"interactionStatistic"|"contentUrl"/.test(html)) {
  failures.push("excluded schema type or property in JSON-LD");
}

const sitemapPath = join(outDir, "sitemap.xml");
const inSitemap =
  existsSync(sitemapPath) && /\/training\/sessions\//.test(readFileSync(sitemapPath, "utf8"));
if (inSitemap !== siteUrlSet) {
  failures.push(
    siteUrlSet ? "page missing from the sitemap" : "page in the sitemap while noindex",
  );
}

console.log(`Linked internal routes (${linked.size}):`);
for (const href of [...linked].sort()) console.log(`  ${href}`);
console.log(`\nShown as text until built (${unbuilt.size}):`);
for (const href of [...unbuilt].sort()) console.log(`  ${href}`);

if (failures.length > 0) {
  console.error(`\nSessions page check failed (${failures.length}):`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}
console.log("\nSessions page check passed.");
