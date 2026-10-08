import type { Metadata } from "next";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { loc, places } from "@/lib/content";
import { alternatesFor } from "@/lib/site";
import ListPage from "@/components/ListPage";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang as Lang);
  return { title: d.pages.places.title, description: d.pages.places.intro, alternates: alternatesFor(lang as Lang, "/places") };
}

export default async function PlacesPage({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const lang = raw;
  const dict = getDictionary(lang);
  const items = places.map((p) => {
    const s = loc(p.summary, lang);
    return { key: p.id, href: `/${lang}/places/${p.slug}/`, title: p.names[lang], summary: s.text, summaryFallback: s.fb, tag: `${p.lat.toFixed(2)}°, ${p.lng.toFixed(2)}°` };
  });
  return <ListPage lang={lang} dict={dict} title={dict.pages.places.title} intro={dict.pages.places.intro} items={items} />;
}
