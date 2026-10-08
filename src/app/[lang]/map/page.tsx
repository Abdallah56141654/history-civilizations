import type { Metadata } from "next";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { alternatesFor } from "@/lib/site";
import { mapData } from "@/lib/timeline-data";
import Breadcrumbs from "@/components/Breadcrumbs";
import HistoryMap from "@/components/HistoryMap";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang as Lang);
  return { title: d.map.title, description: d.map.intro, alternates: alternatesFor(lang as Lang, "/map") };
}

export default async function MapPage({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const lang = raw;
  const dict = getDictionary(lang);
  const { places, civs } = mapData(lang);
  return (
    <>
      <Breadcrumbs label={dict.breadcrumb.label} items={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: dict.map.title }]} />
      <h1 className="mt-4 font-display text-4xl font-bold">{dict.map.title}</h1>
      <p className="mt-3 max-w-[68ch] text-muted">{dict.map.intro}</p>
      <div className="mt-6">
        <HistoryMap lang={lang} dict={{ map: dict.map, rel: dict.rel }} places={places} civs={civs} />
      </div>
    </>
  );
}
