import type { Metadata } from "next";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { loc, technologies } from "@/lib/content";
import { alternatesFor } from "@/lib/site";
import ListPage from "@/components/ListPage";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang as Lang);
  return { title: d.tech.title, description: d.tech.intro, alternates: alternatesFor(lang as Lang, "/technology") };
}

export default async function TechnologyPage({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const lang = raw;
  const dict = getDictionary(lang);
  const items = technologies.map((t) => { const s = loc(t.summary, lang); return { key: t.id, href: `/${lang}/technology/${t.slug}/`, title: t.names[lang], summary: s.text, summaryFallback: s.fb, tag: dict.tech.categories[t.category] }; });
  return <ListPage lang={lang} dict={dict} title={dict.tech.title} intro={dict.tech.intro} items={items} />;
}
