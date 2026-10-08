// Single source of truth for supported languages.
// To add a language: add it here, add src/i18n/dictionaries/<code>.json, register it in get-dictionary.ts.
export const LANGS = ["en", "ar", "de", "fr", "es", "it", "zh"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

export const LANG_META: Record<Lang, { label: string; dir: "ltr" | "rtl"; hreflang: string; htmlLang: string }> = {
  en: { label: "English", dir: "ltr", hreflang: "en", htmlLang: "en" },
  ar: { label: "العربية", dir: "rtl", hreflang: "ar", htmlLang: "ar" },
  de: { label: "Deutsch", dir: "ltr", hreflang: "de", htmlLang: "de" },
  fr: { label: "Français", dir: "ltr", hreflang: "fr", htmlLang: "fr" },
  es: { label: "Español", dir: "ltr", hreflang: "es", htmlLang: "es" },
  it: { label: "Italiano", dir: "ltr", hreflang: "it", htmlLang: "it" },
  zh: { label: "中文", dir: "ltr", hreflang: "zh-Hans", htmlLang: "zh-Hans" },
};

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

/** Map a browser language tag (e.g. "de-AT", "zh-CN") to a supported language. */
export function matchLang(tag: string | undefined | null): Lang | null {
  if (!tag) return null;
  const base = tag.toLowerCase().split("-")[0];
  return isLang(base) ? base : null;
}
