import type { Metadata } from "next";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { events, loc } from "@/lib/content";
import { alternatesFor, formatDate } from "@/lib/site";
import ListPage from "@/components/ListPage";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang as Lang);
  return { title: d.pages.events.title, description: d.pages.events.intro, alternates: alternatesFor(lang as Lang, "/events") };
}

export default async function EventsPage({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const lang = raw;
  const dict = getDictionary(lang);
  const items = [...events].sort((a, b) => a.year - b.year).map((e) => {
    const s = loc(e.summary, lang);
    return { key: e.id, href: `/${lang}/events/${e.slug}/`, title: e.names[lang], meta: formatDate(e.year, e.approx, lang, dict.era), summary: s.text, summaryFallback: s.fb };
  });
  return <ListPage lang={lang} dict={dict} title={dict.pages.events.title} intro={dict.pages.events.intro} items={items} />;
}
