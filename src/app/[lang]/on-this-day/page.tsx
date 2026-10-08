import type { Metadata } from "next";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { events, loc } from "@/lib/content";
import { alternatesFor, formatDate } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import OnThisDay, { type OtdEntry } from "@/components/OnThisDay";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang as Lang);
  return { title: d.otd.title, description: d.otd.intro, alternates: alternatesFor(lang as Lang, "/on-this-day") };
}

export default async function OnThisDayPage({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const lang = raw;
  const dict = getDictionary(lang);
  // Data-driven: only events with a documented day appear. Nothing is generated.
  const entries: OtdEntry[] = events
    .filter((e) => e.monthDay)
    .map((e) => {
      const s = loc(e.summary, lang);
      return { month: e.monthDay![0], day: e.monthDay![1], item: { key: e.id, href: `/${lang}/events/${e.slug}/`, title: e.names[lang], meta: formatDate(e.year, e.approx, lang, dict.era), summary: s.text, summaryFallback: s.fb } };
    });
  return (
    <>
      <Breadcrumbs label={dict.breadcrumb.label} items={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: dict.otd.title }]} />
      <h1 className="mt-4 font-display text-4xl font-bold">{dict.otd.title}</h1>
      <p className="mt-3 max-w-[68ch] text-muted">{dict.otd.intro}</p>
      <div className="mt-6">
        <OnThisDay lang={lang} dict={dict.otd} entries={entries} />
      </div>
    </>
  );
}
