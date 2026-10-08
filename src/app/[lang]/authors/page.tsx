import type { Metadata } from "next";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { authors } from "@/data/authors";
import { loc } from "@/lib/content";
import { alternatesFor } from "@/lib/site";
import ListPage from "@/components/ListPage";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang as Lang);
  return { title: d.legalNav.authors, description: d.legal.authorsIntro, alternates: alternatesFor(lang as Lang, "/authors") };
}

export default async function AuthorsPage({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const lang = raw;
  const dict = getDictionary(lang);
  const items = authors.map((a) => { const b = loc(a.bio, lang); return { key: a.id, href: `/${lang}/authors/${a.slug}/`, title: a.names[lang], summary: b.text, summaryFallback: b.fb }; });
  return <ListPage lang={lang} dict={dict} title={dict.legalNav.authors} intro={dict.legal.authorsIntro} items={items} />;
}
