import { DEFAULT_LANG, LANGS, LANG_META, type Lang } from "@/i18n/config";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** Absolute URL for a localized path, e.g. absoluteUrl("ar", "/civilizations/maya") */
export function absoluteUrl(lang: Lang, path = ""): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return `${SITE_URL}/${lang}${clean}/`;
}

/** canonical + hreflang alternates for Next metadata */
export function alternatesFor(lang: Lang, path = "") {
  const languages: Record<string, string> = {};
  for (const l of LANGS) languages[LANG_META[l].hreflang] = absoluteUrl(l, path);
  languages["x-default"] = absoluteUrl(DEFAULT_LANG, path);
  return { canonical: absoluteUrl(lang, path), languages };
}

export function formatYear(year: number, lang: Lang, era: { bce: string; ce: string; circa: string }): string {
  const abs = Math.abs(year);
  if (lang === "zh") return year < 0 ? `${era.bce}${abs}年` : `${era.ce}${abs}年`;
  return year < 0 ? `${abs} ${era.bce}` : `${abs} ${era.ce}`;
}

export function formatPeriod(start: number, end: number, lang: Lang, era: { bce: string; ce: string; circa: string }): string {
  const sep = lang === "zh" ? "–" : " – ";
  return `${era.circa}${lang === "zh" ? "" : " "}${formatYear(start, lang, era)}${sep}${formatYear(end, lang, era)}`;
}

/** Year with optional "c." prefix for approximate dates. */
export function formatDate(year: number, approx: boolean | undefined, lang: Lang, era: { bce: string; ce: string; circa: string }): string {
  const y = formatYear(year, lang, era);
  return approx ? `${era.circa}${lang === "zh" ? "" : " "}${y}` : y;
}

export function formatLife(birth: number | null, death: number, approx: boolean | undefined, lang: Lang, era: { bce: string; ce: string; circa: string }, unknown: string): string {
  const b = birth === null ? unknown : formatDate(birth, approx, lang, era);
  return `${b} – ${formatDate(death, approx, lang, era)}`;
}
