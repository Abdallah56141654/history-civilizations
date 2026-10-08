import type { Metadata } from "next";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { articles, loc, readingMinutes } from "@/lib/content";
import { alternatesFor } from "@/lib/site";
import ListPage from "@/components/ListPage";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang as Lang);
  return { title: d.pages.articles.title, description: d.pages.articles.intro, alternates: alternatesFor(lang as Lang, "/articles") };
}

export default async function ArticlesPage({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const lang = raw;
  const dict = getDictionary(lang);
  const items = articles.map((a) => {
    const t = loc(a.title, lang);
    const ex = loc(a.excerpt, lang);
    return { key: a.id, href: `/${lang}/articles/${a.slug}/`, title: t.text, summary: ex.text, summaryFallback: ex.fb, tag: dict.lbl.readingTime.replace("{n}", String(readingMinutes(a, lang))) };
  });
  return <ListPage lang={lang} dict={dict} title={dict.pages.articles.title} intro={dict.pages.articles.intro} items={items} />;
}
