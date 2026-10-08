import type { Metadata } from "next";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { loc, people } from "@/lib/content";
import { alternatesFor, formatLife } from "@/lib/site";
import ListPage from "@/components/ListPage";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang as Lang);
  return { title: d.pages.people.title, description: d.pages.people.intro, alternates: alternatesFor(lang as Lang, "/people") };
}

export default async function PeoplePage({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const lang = raw;
  const dict = getDictionary(lang);
  const items = people.map((p) => {
    const s = loc(p.summary, lang);
    return { key: p.id, href: `/${lang}/people/${p.slug}/`, title: p.names[lang], meta: formatLife(p.birthYear, p.deathYear, p.approx, lang, dict.era, dict.lbl.unknown), summary: s.text, summaryFallback: s.fb, tag: dict.roles[p.role] };
  });
  return <ListPage lang={lang} dict={dict} title={dict.pages.people.title} intro={dict.pages.people.intro} items={items} />;
}
