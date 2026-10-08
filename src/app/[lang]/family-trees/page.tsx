import type { Metadata } from "next";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { loc, trees } from "@/lib/content";
import { alternatesFor } from "@/lib/site";
import ListPage from "@/components/ListPage";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang as Lang);
  return { title: d.tree.title, description: d.tree.intro, alternates: alternatesFor(lang as Lang, "/family-trees") };
}

export default async function FamilyTreesPage({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const lang = raw;
  const dict = getDictionary(lang);
  const items = trees.map((t) => { const i = loc(t.intro, lang); return { key: t.id, href: `/${lang}/family-trees/${t.slug}/`, title: loc(t.title, lang).text, summary: i.text, summaryFallback: i.fb }; });
  return <ListPage lang={lang} dict={dict} title={dict.tree.title} intro={dict.tree.intro} items={items} />;
}
