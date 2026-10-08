import type { MetadataRoute } from "next";
import { LANGS, LANG_META } from "@/i18n/config";
import { civilizations, people, events, places, articles, mysteries, artifacts, technologies, trees } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const reviewed = (type: string, list: { slug: string; status: string }[]) => list.filter((x) => x.status === "reviewed").map((x) => `/${type}/${x.slug}`);
  // Draft detail pages are noindex and intentionally left out until reviewed.
  const paths = [
    "", "/civilizations", "/people", "/events", "/places", "/articles", "/timeline", "/map", "/quizzes", "/compare", "/on-this-day", "/mysteries", "/archaeology", "/technology", "/family-trees", "/about", "/contact", "/authors", "/sources", "/privacy", "/terms", "/disclaimer", "/cookies",
    ...reviewed("civilizations", civilizations), ...reviewed("people", people), ...reviewed("events", events),
    ...reviewed("places", places), ...reviewed("articles", articles), ...reviewed("mysteries", mysteries),
    ...reviewed("artifacts", artifacts), ...reviewed("technology", technologies), ...reviewed("family-trees", trees),
  ];
  return LANGS.flatMap((lang) =>
    paths.map((p) => ({
      url: absoluteUrl(lang, p),
      lastModified: new Date(),
      alternates: { languages: Object.fromEntries(LANGS.map((l) => [LANG_META[l].hreflang, absoluteUrl(l, p)])) },
    })),
  );
}
