// Post-build gate. Run after `npm run build`: npm run check:build
// Verifies the static export in ./out: metadata, hreflang, headings, language attributes, broken internal links, sitemap, robots.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, posix } from "node:path";

const OUT = process.argv[2] || "out";
const BASE = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const LANGS = ["en", "ar", "de", "fr", "es", "it", "zh"];
const errors = [];
const err = (file, m) => errors.push(`${file}: ${m}`);

if (!existsSync(OUT)) { console.error(`No "${OUT}" folder. Run "npm run build" first.`); process.exit(1); }

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    statSync(p).isDirectory() ? walk(p, files) : files.push(p);
  }
  return files;
}
const all = walk(OUT);
const rel = (f) => f.slice(OUT.length).replace(/\\/g, "/");
const fileSet = new Set(all.map(rel));

// does a URL path (without base path) resolve to a file in the export?
function resolves(path) {
  let p = path.split("#")[0].split("?")[0];
  if (!p) return true;
  p = decodeURI(p);
  if (fileSet.has(p)) return true;
  if (p.endsWith("/")) return fileSet.has(p + "index.html");
  return fileSet.has(p + ".html") || fileSet.has(p + "/index.html");
}

const pages = all.filter((f) => f.endsWith(".html") && /\/(en|ar|de|fr|es|it|zh)\//.test(rel(f)) && !rel(f).includes("/_next/"));
let linkCount = 0;

for (const f of pages) {
  const html = readFileSync(f, "utf8");
  const r = rel(f);
  const lang = r.split("/")[1];
  const tag = (re) => html.match(re)?.[1];

  if (!tag(/<title>([^<]+)<\/title>/)) err(r, "missing <title>");
  if (!tag(/<meta name="description" content="([^"]+)"/)) err(r, "missing meta description");
  if (!html.includes('rel="canonical"')) err(r, "missing canonical link");
  const hrefLangs = [...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)"/g)].map((m) => m[1]);
  if (hrefLangs.length < LANGS.length + 1) err(r, `expected ${LANGS.length + 1} hreflang links (7 languages + x-default), found ${hrefLangs.length}`);
  if (!/<html[^>]*\blang="/.test(html)) err(r, "<html> has no lang attribute");
  if (lang === "ar" && !/<html[^>]*\bdir="rtl"/.test(html)) err(r, "Arabic page is not dir=rtl");
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) err(r, `expected exactly one <h1>, found ${h1}`);
  if (/<img\b(?![^>]*\balt=)/.test(html)) err(r, "<img> without alt attribute");

  for (const m of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:|#|javascript:)/.test(href)) continue;
    linkCount++;
    let path = href.startsWith("/") ? href : posix.normalize(posix.join(posix.dirname(r), href));
    if (BASE && path.startsWith(BASE + "/")) path = path.slice(BASE.length);
    if (!resolves(path)) err(r, `broken internal link "${href}"`);
  }
}

for (const lang of LANGS) if (!fileSet.has(`/${lang}/index.html`)) err(`/${lang}/`, "home page missing");
for (const f of ["/sitemap.xml", "/robots.txt"]) if (!fileSet.has(f)) err(f, "missing");
for (const lang of LANGS) if (!fileSet.has(`/${lang}/search-index.json`)) err(`/${lang}/search-index.json`, "missing");

console.log(`Checked ${pages.length} pages, ${linkCount} internal links.`);
if (errors.length) {
  const shown = errors.slice(0, 60);
  console.error(`\n${errors.length} problem(s):`);
  for (const e of shown) console.error("  x " + e);
  if (errors.length > shown.length) console.error(`  ... and ${errors.length - shown.length} more`);
  process.exit(1);
}
console.log("Build output looks good.");
