import type { Metadata } from "next";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { alternatesFor } from "@/lib/site";
import { timelineData } from "@/lib/timeline-data";
import Breadcrumbs from "@/components/Breadcrumbs";
import Timeline from "@/components/Timeline";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang as Lang);
  return { title: d.tl.title, description: d.tl.intro, alternates: alternatesFor(lang as Lang, "/timeline") };
}

export default async function TimelinePage({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const lang = raw;
  const dict = getDictionary(lang);
  const { events, civs } = timelineData(lang, dict);
  return (
    <>
      <Breadcrumbs label={dict.breadcrumb.label} items={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: dict.tl.title }]} />
      <h1 className="mt-4 font-display text-4xl font-bold">{dict.tl.title}</h1>
      <p className="mt-3 max-w-[68ch] text-muted">{dict.tl.intro}</p>
      <div className="mt-6">
        <Timeline lang={lang} dict={{ tl: dict.tl, periods: dict.periods, era: dict.era, lbl: dict.lbl, rel: dict.rel }} events={events} civs={civs} />
      </div>
    </>
  );
}
