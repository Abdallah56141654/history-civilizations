// Content quality gate. Run: npm run validate (Node >= 22.6). Runs automatically before `npm run build`.
// Errors stop the build. Warnings are editorial reminders.
import { civilizations } from "../src/data/civilizations.ts";
import { people } from "../src/data/people.ts";
import { events } from "../src/data/events.ts";
import { places } from "../src/data/places.ts";
import { articles } from "../src/data/articles.ts";
import { mysteries } from "../src/data/mysteries.ts";
import { artifacts } from "../src/data/artifacts.ts";
import { technologies } from "../src/data/technologies.ts";
import { trees } from "../src/data/trees.ts";
import { quizzes } from "../src/data/quizzes.ts";
import { authors } from "../src/data/authors.ts";
import { sources } from "../src/data/sources.ts";
import { profiles } from "../src/data/profiles.ts";

const LANGS = ["en", "ar", "de", "fr", "es", "it", "zh"];
const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const collections = { civilizations, people, events, places, articles, mysteries, artifacts, technologies, trees, quizzes, authors };
const allIds = new Map(); // id -> collection

for (const [name, list] of Object.entries(collections)) {
  const slugs = new Set();
  for (const r of list) {
    if (allIds.has(r.id)) err(`duplicate id "${r.id}" (${name} and ${allIds.get(r.id)})`);
    allIds.set(r.id, name);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(r.slug ?? "")) err(`${r.id}: invalid slug "${r.slug}"`);
    if (slugs.has(r.slug)) err(`${name}: duplicate slug "${r.slug}"`);
    slugs.add(r.slug);
  }
}
const sourceIds = new Set(sources.map((s) => s.id));
for (const s of sources) {
  if (!/\b(1[5-9]|20)\d\d\b/.test(s.citation) && !/\b[1-9]\d{0,2}\s?(BCE|CE)\b/.test(s.citation)) warn(`${s.id}: citation has no year`);
}

const idsOf = (name) => new Set(collections[name].map((r) => r.id));
const civIds = idsOf("civilizations"), personIds = idsOf("people"), eventIds = idsOf("events"), placeIds = idsOf("places");
const checkRefs = (r, field, valid) => {
  for (const id of r[field] ?? []) if (!valid.has(id)) err(`${r.id}: ${field} references unknown id "${id}"`);
};

const checkNames = (r, names, label = "names") => {
  for (const l of LANGS) if (!names?.[l] || !names[l].trim()) err(`${r.id}: ${label}.${l} is missing`);
};

const coverage = {}; // language -> {have, total}
const note = (l, has) => { coverage[l] ??= { have: 0, total: 0 }; coverage[l].total++; if (has) coverage[l].have++; };

const checkSummary = (r, field = "summary") => {
  if (!r[field]?.en?.trim()) err(`${r.id}: ${field}.en is missing (English is the fallback)`);
  for (const l of LANGS) note(l, Boolean(r[field]?.[l]?.trim()));
};

const checkStatus = (r) => {
  const n = (r.sourceIds ?? []).length;
  if (!["draft", "reviewed"].includes(r.status)) err(`${r.id}: status must be "draft" or "reviewed"`);
  if (r.status === "reviewed" && n === 0) err(`${r.id}: marked reviewed but has no sources`);
  if (r.status === "draft" && n === 0) warn(`${r.id}: draft without sources yet`);
  for (const sid of r.sourceIds ?? []) if (!sourceIds.has(sid)) err(`${r.id}: unknown source "${sid}"`);
  if (r.image) for (const k of ["url", "source", "creator", "license", "licenseUrl", "attribution"]) if (!r.image[k]) err(`${r.id}: image.${k} is missing (licence data is mandatory)`);
};

for (const c of civilizations) {
  checkNames(c, c.names); checkSummary(c); checkStatus(c);
  if (c.startYear > c.endYear) err(`${c.id}: startYear is after endYear`);
  if (!profiles[c.id]) warn(`${c.id}: no comparison profile in profiles.ts`);
}
for (const p of people) {
  checkNames(p, p.names); checkSummary(p); checkStatus(p); checkRefs(p, "civIds", civIds);
  if (p.birthYear !== null && p.birthYear > p.deathYear) err(`${p.id}: born after death`);
}
for (const e of events) {
  checkNames(e, e.names); checkSummary(e); checkStatus(e);
  checkRefs(e, "civIds", civIds); checkRefs(e, "personIds", personIds); checkRefs(e, "placeIds", placeIds);
  if (e.monthDay) {
    const [m, d] = e.monthDay;
    const max = new Date(Date.UTC(2024, m, 0)).getUTCDate();
    if (!(m >= 1 && m <= 12 && d >= 1 && d <= max)) err(`${e.id}: invalid monthDay [${m}, ${d}]`);
  }
}
for (const p of places) {
  checkNames(p, p.names); checkSummary(p); checkStatus(p); checkRefs(p, "civIds", civIds);
  if (!(p.lat >= -90 && p.lat <= 90 && p.lng >= -180 && p.lng <= 180)) err(`${p.id}: coordinates out of range`);
}
const authorIds = idsOf("authors");
for (const a of authors) checkNames(a, a.names);
for (const a of articles) {
  checkStatus(a); checkRefs(a, "civIds", civIds); checkRefs(a, "personIds", personIds); checkRefs(a, "eventIds", eventIds); checkRefs(a, "placeIds", placeIds);
  if (!authorIds.has(a.authorId)) err(`${a.id}: unknown author "${a.authorId}"`);
  if (!a.title?.en || !a.excerpt?.en || !(a.body?.en?.length)) err(`${a.id}: needs title, excerpt and body in English`);
  for (const l of LANGS) note(l, Boolean(a.body?.[l]?.length));
}
for (const m of mysteries) {
  checkNames(m, m.names); checkSummary(m); checkStatus(m); checkRefs(m, "civIds", civIds); checkRefs(m, "personIds", personIds); checkRefs(m, "placeIds", placeIds);
  for (const k of ["know", "evidence", "unknown", "theories", "arguments", "uncertainty"]) if (!m.sections?.[k]?.en?.length) err(`${m.id}: section "${k}" is missing in English`);
}
for (const a of artifacts) { checkNames(a, a.names); checkSummary(a); checkStatus(a); checkRefs(a, "civIds", civIds); checkRefs(a, "placeIds", placeIds); if (!a.heldAt) err(`${a.id}: heldAt is missing`); }
for (const t of technologies) { checkNames(t, t.names); checkSummary(t); checkStatus(t); checkRefs(t, "civIds", civIds); }
for (const t of trees) {
  checkStatus(t); checkRefs(t, "civIds", civIds);
  const nodeIds = new Set();
  for (const n of t.nodes) {
    if (nodeIds.has(n.id)) err(`${t.id}: duplicate node "${n.id}"`);
    nodeIds.add(n.id);
    checkNames({ id: `${t.id}/${n.id}` }, n.names);
    if (n.personId && !personIds.has(n.personId)) err(`${t.id}/${n.id}: unknown personId`);
  }
  for (const [a, b] of t.parents) for (const x of [a, b]) if (!nodeIds.has(x)) err(`${t.id}: parent link uses unknown node "${x}"`);
  for (const u of t.unions) for (const x of [u.a, u.b]) if (!nodeIds.has(x)) err(`${t.id}: union uses unknown node "${x}"`);
}
for (const q of quizzes) {
  checkStatus(q); if (!civIds.has(q.civId)) err(`${q.id}: unknown civId`);
  for (const x of q.questions) {
    const id = `${q.id}/${x.id}`;
    if (!x.text?.en || !x.options?.en || !x.explanation?.en) err(`${id}: English text, options and explanation are required`);
    const n = x.options?.en?.length ?? 0;
    if (n < 2) err(`${id}: needs at least 2 options`);
    if (!(Number.isInteger(x.correct) && x.correct >= 0 && x.correct < n)) err(`${id}: "correct" is out of range`);
    for (const l of LANGS) {
      const parts = [x.text?.[l], x.options?.[l], x.explanation?.[l]].filter(Boolean).length;
      if (parts !== 0 && parts !== 3) err(`${id}: language "${l}" is partial (text, options and explanation must all exist)`);
      if (x.options?.[l] && x.options[l].length !== n) err(`${id}: "${l}" has ${x.options[l].length} options, English has ${n}`);
    }
  }
}
for (const id of Object.keys(profiles)) if (!civIds.has(id)) err(`profiles.ts: unknown civilization "${id}"`);

// ---- report ----
const tot = Object.values(collections).reduce((n, l) => n + l.length, 0);
console.log(`Checked ${tot} records in ${Object.keys(collections).length} collections, ${sources.length} sources.\n`);
console.log("Translation coverage (summaries, article bodies):");
for (const l of LANGS) { const c = coverage[l]; console.log(`  ${l}: ${c.have}/${c.total} (${Math.round((c.have / c.total) * 100)}%)`); }
const drafts = Object.values(collections).flat().filter((r) => r.status === "draft").length;
console.log(`\nStatus: ${drafts} draft, ${tot - drafts - authors.length} reviewed (authors have no status).`);
if (warnings.length) { console.log(`\n${warnings.length} warning(s):`); for (const w of warnings) console.log("  - " + w); }
if (errors.length) { console.error(`\n${errors.length} ERROR(S):`); for (const e of errors) console.error("  x " + e); process.exit(1); }
console.log("\nContent is valid.");
