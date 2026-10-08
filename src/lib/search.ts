import type { Names } from "./types";
import { LANGS } from "@/i18n/config";

/** Normalize for matching: lowercase, strip accents, Arabic diacritics and letter variants. */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "") // Arabic tashkeel + tatweel
    .replace(/[\u0300-\u036f]/g, "") // Latin accents
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function distance(a: string, b: string): number {
  if (a === b) return 0;
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let last = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, last + (a[i - 1] === b[j - 1] ? 0 : 1));
      last = tmp;
    }
  }
  return prev[b.length];
}

/** Score 0 = no match. Handles substrings, multilingual names, synonyms and one-typo tolerance. */
export function scoreItem(item: { names: Names; keywords: string[] }, rawQuery: string): number {
  const q = normalize(rawQuery);
  if (!q) return 0;
  const names = LANGS.map((l) => normalize(item.names[l]));
  const keys = item.keywords.map(normalize);
  let best = 0;
  for (const n of names) {
    if (n === q) best = Math.max(best, 100);
    else if (n.startsWith(q)) best = Math.max(best, 80);
    else if (n.includes(q)) best = Math.max(best, 60);
  }
  for (const k of keys) {
    if (k === q) best = Math.max(best, 70);
    else if (k.includes(q) || (q.length > 3 && k.length > 3 && q.includes(k))) best = Math.max(best, 40);
  }
  if (best === 0 && q.length >= 5) {
    const tokens = [...names, ...keys].flatMap((s) => s.split(" ")).filter((t) => t.length >= 4);
    if (tokens.some((t) => distance(t, q) <= 1)) best = 20;
  }
  return best;
}

export const PERIODS = [
  { id: "p1", from: -Infinity, to: -1001 },
  { id: "p2", from: -1000, to: 0 },
  { id: "p3", from: 1, to: 500 },
  { id: "p4", from: 501, to: Infinity },
] as const;

export interface Filters {
  type: string; // "" = all
  civ: string;
  period: string;
  region: string;
}
export const NO_FILTERS: Filters = { type: "", civ: "", period: "", region: "" };

type Doc = { type: string; civIds: string[]; start: number; end: number; regions: string[] };

/** Filters other than `skip` (used to compute per-type counts). */
export function passesFilters(d: Doc, f: Filters, skip?: keyof Filters): boolean {
  if (skip !== "type" && f.type && d.type !== f.type) return false;
  if (skip !== "civ" && f.civ && !d.civIds.includes(f.civ)) return false;
  if (skip !== "region" && f.region && !d.regions.includes(f.region)) return false;
  if (skip !== "period" && f.period) {
    const p = PERIODS.find((x) => x.id === f.period);
    if (p && !(d.start <= p.to && d.end >= p.from)) return false;
  }
  return true;
}
