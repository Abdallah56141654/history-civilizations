import type { Metadata } from "next";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { artifacts, loc, places } from "@/lib/content";
import { alternatesFor } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CardGrid } from "@/components/ListCard";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang as Lang);
  return { title: d.arch.title, description: d.arch.intro, alternates: alternatesFor(lang as Lang, "/archaeology") };
}

export default async function ArchaeologyPage({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const lang = raw;
  const dict = getDictionary(lang);
  const sites = places.map((p) => { const s = loc(p.summary, lang); return { key: p.id, href: `/${lang}/places/${p.slug}/`, title: p.names[lang], summary: s.text, summaryFallback: s.fb, tag: `${p.lat.toFixed(2)}°, ${p.lng.toFixed(2)}°` }; });
  const objects = artifacts.map((a) => { const s = loc(a.summary, lang); return { key: a.id, href: `/${lang}/artifacts/${a.slug}/`, title: a.names[lang], summary: s.text, summaryFallback: s.fb, tag: `${dict.arch.heldAt}: ${a.heldAt}` }; });
  return (
    <>
      <Breadcrumbs label={dict.breadcrumb.label} items={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: dict.arch.title }]} />
      <h1 className="mt-4 font-display text-4xl font-bold">{dict.arch.title}</h1>
      <p className="mt-3 max-w-[68ch] text-muted">{dict.arch.intro}</p>
      <h2 className="mt-10 font-display text-2xl font-bold">{dict.arch.artifacts}</h2>
      <div className="mt-4"><CardGrid items={objects} /></div>
      <h2 className="mt-12 font-display text-2xl font-bold">{dict.arch.sites}</h2>
      <div className="mt-4"><CardGrid items={sites} /></div>
    </>
  );
}
