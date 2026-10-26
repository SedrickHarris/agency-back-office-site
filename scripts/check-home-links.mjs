// Checks every internal link on the built home page (out/index.html).
//  - FAILS (exit 1) if an <a href> points to a route that was not exported,
//    or if any href is "#" or empty.
//  - REPORTS links rendered as plain text because their route is not built yet
//    (elements marked data-unbuilt-href). These are the TODO list.
// Usage: npm run build && npm run links:home
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const outDir = "out";
const indexPath = join(outDir, "index.html");

if (!existsSync(indexPath)) {
  console.error("out/index.html not found. Run `npm run build` first.");
  process.exit(1);
}

const html = readFileSync(indexPath, "utf8");
const exists = (href) =>
  href === "/" || existsSync(join(outDir, href, "index.html"));

const linked = new Set();
const broken = [];
for (const match of html.matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)) {
  const href = match[1];
  if (href === "" || href === "#") {
    broken.push(`${href || "(empty)"} (placeholder href)`);
    continue;
  }
  if (href.startsWith("#") || /^[a-z]+:/i.test(href) || href.startsWith("//")) continue;
  linked.add(href);
  if (!exists(href)) broken.push(href);
}

const unbuilt = new Set();
for (const match of html.matchAll(/data-unbuilt-href="([^"]+)"/g)) {
  unbuilt.add(match[1]);
}

console.log(`Linked internal routes (${linked.size}):`);
for (const href of [...linked].sort()) console.log(`  ${href}`);
console.log(`\nShown as text until built (${unbuilt.size}):`);
for (const href of [...unbuilt].sort()) console.log(`  ${href}`);

if (broken.length > 0) {
  console.error(`\nBroken links (${broken.length}):`);
  for (const href of broken) console.error(`  ${href}`);
  process.exit(1);
}
