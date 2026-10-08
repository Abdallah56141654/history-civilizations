import type { Metadata } from "next";
import Link from "next/link";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { articles, artifacts, civilizations, events, loc, mysteries, people, places, technologies, trees } from "@/lib/content";
import { sources } from "@/data/sources";
import { alternatesFor } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang as Lang);
  return { title: d.legalNav.sources, description: d.legal.sourcesIntro.slice(0, 160), alternates: alternatesFor(lang as Lang, "/sources") };
}

export default async function SourcesPage({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const lang = raw;
  const dict = getDictionary(lang);

  // sourceId -> pages that cite it (built from the data, so it can never drift)
  const cited = new Map<string, { href: string; label: string }[]>();
  const add = (ids: string[], href: string, label: string) => { for (const id of ids) cited.set(id, [...(cited.get(id) ?? []), { href, label }]); };
  for (const c of civilizations) add(c.sourceIds, `/${lang}/civilizations/${c.slug}/`, c.names[lang]);
  for (const p of people) add(p.sourceIds, `/${lang}/people/${p.slug}/`, p.names[lang]);
  for (const e of events) add(e.sourceIds, `/${lang}/events/${e.slug}/`, e.names[lang]);
  for (const p of places) add(p.sourceIds, `/${lang}/places/${p.slug}/`, p.names[lang]);
  for (const a of articles) add(a.sourceIds, `/${lang}/articles/${a.slug}/`, loc(a.title, lang).text);
  for (const m of mysteries) add(m.sourceIds, `/${lang}/mysteries/${m.slug}/`, m.names[lang]);
  for (const a of artifacts) add(a.sourceIds, `/${lang}/artifacts/${a.slug}/`, a.names[lang]);
  for (const t of technologies) add(t.sourceIds, `/${lang}/technology/${t.slug}/`, t.names[lang]);
  for (const t of trees) add(t.sourceIds, `/${lang}/family-trees/${t.slug}/`, loc(t.title, lang).text);

  return (
    <>
      <Breadcrumbs label={dict.breadcrumb.label} items={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: dict.legalNav.sources }]} />
      <h1 className="mt-4 font-display text-4xl font-bold">{dict.legalNav.sources}</h1>
      <p className="prose-text mt-3 text-muted">{dict.legal.sourcesIntro}</p>
      <ul className="mt-8 space-y-5">
        {sources.map((s) => (
          <li key={s.id} className="max-w-[72ch]">
            <p dir="ltr" lang="en" className="font-medium">{s.citation}</p>
            <p className="mt-1 text-sm text-muted">
              {dict.legal.citedOn}:{" "}
              {(cited.get(s.id) ?? []).map((c, i) => (
                <span key={c.href}>{i > 0 && " · "}<Link href={c.href} className="text-lapis underline underline-offset-4">{c.label}</Link></span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
