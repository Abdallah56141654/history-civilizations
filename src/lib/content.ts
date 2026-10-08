import type { Lang } from "@/i18n/config";
import type { Article, Civilization, HistoricalEvent, Localized, Person, Place, Source } from "./types";
import { civilizations } from "@/data/civilizations";
import { people } from "@/data/people";
import { events } from "@/data/events";
import { places } from "@/data/places";
import { articles } from "@/data/articles";
import { sources } from "@/data/sources";
import { mysteries } from "@/data/mysteries";
import { artifacts } from "@/data/artifacts";
import { technologies } from "@/data/technologies";
import { trees } from "@/data/trees";

export { civilizations, people, events, places, articles, mysteries, artifacts, technologies, trees };

/** Localized text with English fallback. `fb` is true when the requested language is missing. */
export function loc(m: Localized | undefined, lang: Lang): { text: string; fb: boolean } {
  const own = m?.[lang];
  if (own) return { text: own, fb: false };
  return { text: m?.en ?? "", fb: lang !== "en" };
}

export const civById = (id: string) => civilizations.find((c) => c.id === id);
export const personById = (id: string) => people.find((p) => p.id === id);
export const eventById = (id: string) => events.find((e) => e.id === id);
export const placeById = (id: string) => places.find((p) => p.id === id);
export const sourcesFor = (ids: string[]): Source[] => ids.map((id) => sources.find((s) => s.id === id)).filter((s): s is Source => Boolean(s));

export const getPerson = (slug: string) => people.find((p) => p.slug === slug);
export const getEvent = (slug: string) => events.find((e) => e.slug === slug);
export const getPlace = (slug: string) => places.find((p) => p.slug === slug);
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

const defined = <T,>(x: T | undefined): x is T => x !== undefined;
export const civsOf = (ids: string[]): Civilization[] => ids.map(civById).filter(defined);
export const peopleOf = (ids: string[]): Person[] => ids.map(personById).filter(defined);
export const eventsOf = (ids: string[]): HistoricalEvent[] => ids.map(eventById).filter(defined);
export const placesOf = (ids: string[]): Place[] => ids.map(placeById).filter(defined);

export const forCiv = {
  people: (civId: string) => people.filter((p) => p.civIds.includes(civId)),
  events: (civId: string) => events.filter((e) => e.civIds.includes(civId)).sort((a, b) => a.year - b.year),
  places: (civId: string) => places.filter((p) => p.civIds.includes(civId)),
  articles: (civId: string) => articles.filter((a) => a.civIds.includes(civId)),
  mysteries: (civId: string) => mysteries.filter((m) => m.civIds.includes(civId)),
  artifacts: (civId: string) => artifacts.filter((a) => a.civIds.includes(civId)),
  technologies: (civId: string) => technologies.filter((t) => t.civIds.includes(civId)),
  trees: (civId: string) => trees.filter((t) => t.civIds.includes(civId)),
};

/** Paragraph lists with English fallback (mystery sections, tree notes). */
export function paras(m: Partial<Record<Lang, string[]>> | undefined, lang: Lang): { items: string[]; fb: boolean } {
  const own = m?.[lang];
  if (own && own.length) return { items: own, fb: false };
  return { items: m?.en ?? [], fb: lang !== "en" };
}

export const articlesAbout = {
  person: (id: string) => articles.filter((a) => a.personIds.includes(id)),
  event: (id: string) => articles.filter((a) => a.eventIds.includes(id)),
  place: (id: string) => articles.filter((a) => a.placeIds.includes(id)),
};
export const eventsAboutPerson = (id: string) => events.filter((e) => e.personIds.includes(id)).sort((a, b) => a.year - b.year);
export const eventsAtPlace = (id: string) => events.filter((e) => e.placeIds.includes(id)).sort((a, b) => a.year - b.year);

export const readingMinutes = (a: Article, lang: Lang) => {
  const words = (a.body[lang] ?? a.body.en ?? []).join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};
