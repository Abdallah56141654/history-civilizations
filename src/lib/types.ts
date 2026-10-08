import type { Lang } from "@/i18n/config";

export type RegionKey = "africa" | "middleEast" | "europe" | "asia" | "americas";
export type ReviewStatus = "draft" | "reviewed";
export type Localized = Partial<Record<Lang, string>>; // English is the fallback
export type Names = Record<Lang, string>;
export type EntityType = "civilization" | "person" | "event" | "place" | "article" | "mystery" | "artifact" | "technology";

export interface ImageRecord {
  url: string;
  alt: Localized;
  source: string;
  creator: string;
  license: string;
  licenseUrl: string;
  attribution: string;
}

interface Base {
  id: string;
  slug: string; // same in every language
  status: ReviewStatus;
  sourceIds: string[];
  image?: ImageRecord;
}

export interface Civilization extends Base {
  region: RegionKey;
  startYear: number; // negative = BCE
  endYear: number;
  names: Names;
  summary: Localized;
  keywords: string[];
}

export interface Person extends Base {
  civIds: string[];
  names: Names;
  role: "ruler" | "statesman";
  birthYear: number | null;
  deathYear: number;
  approx?: boolean;
  summary: Localized;
  keywords: string[];
}

export interface HistoricalEvent extends Base {
  civIds: string[];
  personIds: string[];
  placeIds: string[];
  year: number;
  approx?: boolean;
  /** [month, day] only when the day is documented. Ancient dates are Julian. Powers "On This Day". */
  monthDay?: [number, number];
  names: Names;
  summary: Localized;
  keywords: string[];
}

export interface Place extends Base {
  civIds: string[];
  lat: number;
  lng: number;
  names: Names;
  summary: Localized;
  keywords: string[];
}

export interface Source {
  id: string;
  citation: string; // bibliographic reference, language independent
}

export interface Author {
  id: string;
  slug: string;
  names: Names;
  bio: Localized;
}

export interface Article extends Base {
  civIds: string[];
  personIds: string[];
  eventIds: string[];
  placeIds: string[];
  authorId: string;
  updatedAt: string; // ISO date
  title: Localized;
  excerpt: Localized;
  body: Partial<Record<Lang, string[]>>; // paragraphs
  keywords: string[];
}

/** One entry of the per-language search index (served as /<lang>/search-index.json). */
export interface SearchDoc {
  id: string;
  type: EntityType;
  path: string; // e.g. /people/cleopatra-vii
  names: Names; // every language, so "كليوباترا" finds "Cleopatra" and vice versa
  keywords: string[];
  title: string; // in the page language (English fallback)
  summary: string;
  summaryFb: boolean;
  meta: string; // dates, preformatted
  civIds: string[];
  start: number;
  end: number;
  regions: string[];
}

export interface QuizQuestion {
  id: string;
  text: Localized;
  options: Partial<Record<Lang, string[]>>; // same order in every language
  correct: number; // index into options
  explanation: Localized;
}

export interface Quiz {
  id: string;
  slug: string;
  civId: string;
  status: ReviewStatus;
  title: Localized;
  intro: Localized;
  questions: QuizQuestion[];
}

export type CompareDim = "geography" | "government" | "religion" | "writing" | "architecture" | "economy";

export type MysterySection = "know" | "evidence" | "unknown" | "theories" | "arguments" | "uncertainty";

export interface Mystery extends Base {
  civIds: string[];
  placeIds: string[];
  personIds: string[];
  names: Names;
  summary: Localized;
  keywords: string[];
  /** Paragraphs per section. English is the fallback. */
  sections: Record<MysterySection, Partial<Record<Lang, string[]>>>;
}

export interface Artifact extends Base {
  civIds: string[];
  placeIds: string[];
  heldAt: string; // institution and city, language independent
  names: Names;
  summary: Localized;
  keywords: string[];
}

export type TechCategory = "construction" | "water" | "writing";

export interface Technology extends Base {
  civIds: string[];
  category: TechCategory;
  names: Names;
  summary: Localized;
  keywords: string[];
}

export interface TreeNode {
  id: string;
  gen: number; // row
  col: number; // horizontal position (may be fractional)
  names: Names;
  birth?: number;
  death?: number;
  approx?: boolean;
  personId?: string; // links to a person page when one exists
}

export interface FamilyTree extends Base {
  civIds: string[];
  title: Localized;
  intro: Localized;
  nodes: TreeNode[];
  parents: [string, string][]; // [parentNodeId, childNodeId]
  unions: { a: string; b: string; kind: "spouse" | "partner" }[];
  notes: Partial<Record<Lang, string[]>>;
}
