// Lists every internal link on the built home page and reports the routes
// that do not exist yet. Informational only: always exits 0.
// Usage: npm run build && npm run links:home
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const outDir = "out";
const indexPath = join(outDir, "index.html");

if (!existsSync(indexPath)) {
  console.error("out/index.html not found. Run `npm run build` first.");
  process.exit(0);
}

const html = readFileSync(indexPath, "utf8");
const hrefs = new Set();
for (const match of html.matchAll(/<a\b[^>]*?\shref="([^"]+)"/g)) {
  const href = match[1];
  if (href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/#")) {
    hrefs.add(href.split("#")[0]);
  }
}

const exists = (href) =>
  href === "/" || existsSync(join(outDir, href, "index.html"));

const found = [];
const missing = [];
for (const href of [...hrefs].sort()) {
  (exists(href) ? found : missing).push(href);
}

console.log(`Internal links on /: ${hrefs.size}`);
console.log(`\nResolved (${found.length}):`);
for (const href of found) console.log(`  ${href}`);
console.log(`\nNot built yet (${missing.length}):`);
for (const href of missing) console.log(`  ${href}`);
