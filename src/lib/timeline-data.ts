import type { Lang } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { articlesAbout, civilizations, civsOf, events, loc, peopleOf, places, placesOf } from "./content";
import { formatDate, formatPeriod } from "./site";

export interface Ref { slug: string; name: string }
export interface TLEvent {
  id: string; slug: string; title: string; year: number; dateText: string;
  summary: string; fb: boolean; civIds: string[];
  civs: Ref[]; people: Ref[]; places: Ref[]; articles: Ref[];
}
export interface TLCiv { id: string; slug: string; name: string; start: number; end: number; period: string }

export function timelineData(lang: Lang, dict: Dictionary): { events: TLEvent[]; civs: TLCiv[] } {
  return {
    events: [...events].sort((a, b) => a.year - b.year).map((e) => {
      const s = loc(e.summary, lang);
      return {
        id: e.id, slug: e.slug, title: e.names[lang], year: e.year, dateText: formatDate(e.year, e.approx, lang, dict.era), summary: s.text, fb: s.fb, civIds: e.civIds,
        civs: civsOf(e.civIds).map((c) => ({ slug: c.slug, name: c.names[lang] })),
        people: peopleOf(e.personIds).map((p) => ({ slug: p.slug, name: p.names[lang] })),
        places: placesOf(e.placeIds).map((p) => ({ slug: p.slug, name: p.names[lang] })),
        articles: articlesAbout.event(e.id).map((a) => ({ slug: a.slug, name: loc(a.title, lang).text })),
      };
    }),
    civs: civilizations.map((c) => ({ id: c.id, slug: c.slug, name: c.names[lang], start: c.startYear, end: c.endYear, period: formatPeriod(c.startYear, c.endYear, lang, dict.era) })),
  };
}

export interface MapPlace { id: string; slug: string; name: string; lat: number; lng: number; summary: string; fb: boolean; civIds: string[]; civNames: string[] }

export function mapData(lang: Lang) {
  return {
    places: places.map((p): MapPlace => {
      const s = loc(p.summary, lang);
      return { id: p.id, slug: p.slug, name: p.names[lang], lat: p.lat, lng: p.lng, summary: s.text, fb: s.fb, civIds: p.civIds, civNames: civsOf(p.civIds).map((c) => c.names[lang]) };
    }),
    civs: civilizations.map((c) => ({ id: c.id, name: c.names[lang] })),
  };
}
