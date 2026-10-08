import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { articlesAbout, civsOf, loc, mysteries, paras, peopleOf, placesOf, sourcesFor } from "@/lib/content";
import { getMystery } from "@/data/mysteries";
import { absoluteUrl } from "@/lib/site";
import { JsonLd, breadcrumbLd, detailMetadata } from "@/lib/seo";
import type { MysterySection } from "@/lib/types";
import { DetailShell, Lead, LinkGroup, SourcesBlock } from "@/components/Detail";

type P = { params: Promise<{ lang: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.flatMap((lang) => mysteries.map((m) => ({ lang, slug: m.slug })));
}
const ORDER: MysterySection[] = ["know", "evidence", "unknown", "theories", "arguments", "uncertainty"];

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const m = getMystery(slug);
  if (!m || !isLang(lang)) return {};
  return detailMetadata({ lang, path: `/mysteries/${slug}`, title: m.names[lang], description: loc(m.summary, lang).text, draft: m.status === "draft" });
}

export default async function MysteryPage({ params }: P) {
  const { lang: raw, slug } = await params;
  const m = getMystery(slug);
  if (!isLang(raw) || !m) notFound();
  const lang: Lang = raw;
  const dict = getDictionary(lang);
  const s = loc(m.summary, lang);
  const sections = ORDER.map((k) => ({ key: k, ...paras(m.sections[k], lang) }));
  const anyFb = s.fb || sections.some((x) => x.fb);

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: dict.breadcrumb.home, url: absoluteUrl(lang) }, { name: dict.mys.title, url: absoluteUrl(lang, "/mysteries") }, { name: m.names[lang] }])} />
      <DetailShell
        dict={dict}
        crumbs={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: dict.mys.title, href: `/${lang}/mysteries/` }, { label: m.names[lang] }]}
        title={m.names[lang]}
        fallback={anyFb}
        draft={m.status === "draft"}
      >
        <Lead text={s.text} fallback={s.fb} />
        <p className="mt-3 max-w-[68ch] text-sm text-muted">{dict.mys.note}</p>
        {sections.map((sec) => (
          <section key={sec.key} className="mt-8" aria-labelledby={`sec-${sec.key}`}>
            <h2 id={`sec-${sec.key}`} className="font-display text-2xl font-bold">{dict.mys.sections[sec.key]}</h2>
            <div className="prose-text mt-2 space-y-3 text-lg" lang={sec.fb ? "en" : undefined} dir={sec.fb ? "ltr" : undefined}>
              {sec.items.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>
        ))}
        <LinkGroup title={dict.rel.civilizations} items={civsOf(m.civIds).map((c) => ({ key: c.id, href: `/${lang}/civilizations/${c.slug}/`, label: c.names[lang] }))} />
        <LinkGroup title={dict.rel.people} items={peopleOf(m.personIds).map((p) => ({ key: p.id, href: `/${lang}/people/${p.slug}/`, label: p.names[lang] }))} />
        <LinkGroup title={dict.rel.places} items={placesOf(m.placeIds).map((p) => ({ key: p.id, href: `/${lang}/places/${p.slug}/`, label: p.names[lang] }))} />
        <SourcesBlock dict={dict} sources={sourcesFor(m.sourceIds)} />
      </DetailShell>
    </>
  );
}
