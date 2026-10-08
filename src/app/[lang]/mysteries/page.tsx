import type { Metadata } from "next";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { loc, mysteries } from "@/lib/content";
import { alternatesFor } from "@/lib/site";
import ListPage from "@/components/ListPage";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang as Lang);
  return { title: d.mys.title, description: d.mys.intro, alternates: alternatesFor(lang as Lang, "/mysteries") };
}

export default async function MysteriesPage({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const lang = raw;
  const dict = getDictionary(lang);
  const items = mysteries.map((m) => {
    const s = loc(m.summary, lang);
    return { key: m.id, href: `/${lang}/mysteries/${m.slug}/`, title: m.names[lang], summary: s.text, summaryFallback: s.fb };
  });
  return <ListPage lang={lang} dict={dict} title={dict.mys.title} intro={`${dict.mys.intro} ${dict.mys.note}`} items={items} />;
}
