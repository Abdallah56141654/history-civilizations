import type { Lang } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { SearchDoc } from "./types";
import { articles, artifacts, civById, civilizations, events, loc, mysteries, people, places, technologies } from "./content";
import { formatDate, formatLife, formatPeriod } from "./site";

const span = (civIds: string[], fallback: [number, number]): [number, number] => {
  const cs = civIds.map(civById).filter((c) => c !== undefined);
  if (cs.length === 0) return fallback;
  return [Math.min(...cs.map((c) => c.startYear)), Math.max(...cs.map((c) => c.endYear))];
};
const regionsOf = (civIds: string[]) => [...new Set(civIds.map((id) => civById(id)?.region).filter((r): r is NonNullable<typeof r> => Boolean(r)))];

/** Build the search index for one language. Every content type is one block here. */
export function buildSearchDocs(lang: Lang, dict: Dictionary): SearchDoc[] {
  const era = dict.era;
  const withSummary = (m: Parameters<typeof loc>[0]) => {
    const s = loc(m, lang);
    return { summary: s.text, summaryFb: s.fb };
  };
  const enAll = (t: Parameters<typeof loc>[0]) => ({ en: t?.en ?? "", ar: t?.ar ?? t?.en ?? "", de: t?.de ?? t?.en ?? "", fr: t?.fr ?? t?.en ?? "", es: t?.es ?? t?.en ?? "", it: t?.it ?? t?.en ?? "", zh: t?.zh ?? t?.en ?? "" });

  return [
    ...civilizations.map((c): SearchDoc => ({
      id: c.id, type: "civilization", path: `/civilizations/${c.slug}`, names: c.names, keywords: c.keywords, title: c.names[lang],
      ...withSummary(c.summary), meta: formatPeriod(c.startYear, c.endYear, lang, era), civIds: [c.id], start: c.startYear, end: c.endYear, regions: [c.region],
    })),
    ...people.map((p): SearchDoc => ({
      id: p.id, type: "person", path: `/people/${p.slug}`, names: p.names, keywords: p.keywords, title: p.names[lang],
      ...withSummary(p.summary), meta: formatLife(p.birthYear, p.deathYear, p.approx, lang, era, dict.lbl.unknown), civIds: p.civIds,
      start: p.birthYear ?? p.deathYear, end: p.deathYear, regions: regionsOf(p.civIds),
    })),
    ...events.map((e): SearchDoc => ({
      id: e.id, type: "event", path: `/events/${e.slug}`, names: e.names, keywords: e.keywords, title: e.names[lang],
      ...withSummary(e.summary), meta: formatDate(e.year, e.approx, lang, era), civIds: e.civIds, start: e.year, end: e.year, regions: regionsOf(e.civIds),
    })),
    ...places.map((p): SearchDoc => {
      const [start, end] = span(p.civIds, [0, 0]);
      return { id: p.id, type: "place", path: `/places/${p.slug}`, names: p.names, keywords: p.keywords, title: p.names[lang], ...withSummary(p.summary), meta: "", civIds: p.civIds, start, end, regions: regionsOf(p.civIds) };
    }),
    ...mysteries.map((m): SearchDoc => {
      const [start, end] = span(m.civIds, [0, 0]);
      return { id: m.id, type: "mystery", path: `/mysteries/${m.slug}`, names: m.names, keywords: m.keywords, title: m.names[lang], ...withSummary(m.summary), meta: "", civIds: m.civIds, start, end, regions: regionsOf(m.civIds) };
    }),
    ...artifacts.map((a): SearchDoc => {
      const [start, end] = span(a.civIds, [0, 0]);
      return { id: a.id, type: "artifact", path: `/artifacts/${a.slug}`, names: a.names, keywords: a.keywords, title: a.names[lang], ...withSummary(a.summary), meta: a.heldAt, civIds: a.civIds, start, end, regions: regionsOf(a.civIds) };
    }),
    ...technologies.map((t): SearchDoc => {
      const [start, end] = span(t.civIds, [0, 0]);
      return { id: t.id, type: "technology", path: `/technology/${t.slug}`, names: t.names, keywords: t.keywords, title: t.names[lang], ...withSummary(t.summary), meta: dict.tech.categories[t.category], civIds: t.civIds, start, end, regions: regionsOf(t.civIds) };
    }),
    ...articles.map((a): SearchDoc => {
      const [start, end] = span(a.civIds, [0, 0]);
      return { id: a.id, type: "article", path: `/articles/${a.slug}`, names: enAll(a.title), keywords: a.keywords, title: loc(a.title, lang).text, ...withSummary(a.excerpt), meta: "", civIds: a.civIds, start, end, regions: regionsOf(a.civIds) };
    }),
  ];
}

/** Ids shown as "popular searches" before the user types. Edit freely. */
const POPULAR = ["civ-ancient-egypt", "civ-roman-empire", "person-cleopatra-vii", "civ-maya", "person-alexander-the-great"];

export function searchBoxProps(lang: Lang, dict: Dictionary) {
  const names = [...civilizations.map((c) => [c.id, c.names[lang]] as const), ...people.map((p) => [p.id, p.names[lang]] as const)];
  return {
    lang,
    placeholder: dict.hero.placeholder,
    button: dict.search.button,
    popular: POPULAR.map((id) => names.find(([i]) => i === id)?.[1]).filter((x): x is string => Boolean(x)),
    labels: { recent: dict.search.recent, popular: dict.search.popular, clear: dict.search.clear, suggestions: dict.search.suggestions, types: dict.types as Record<string, string> },
  };
}
