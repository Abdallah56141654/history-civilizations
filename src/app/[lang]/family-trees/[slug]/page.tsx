import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { civsOf, loc, paras, sourcesFor, trees } from "@/lib/content";
import { getTree } from "@/data/trees";
import { absoluteUrl } from "@/lib/site";
import { JsonLd, breadcrumbLd, detailMetadata } from "@/lib/seo";
import { DetailShell, Lead, LinkGroup, SourcesBlock } from "@/components/Detail";
import FamilyTreeView from "@/components/FamilyTreeView";

type P = { params: Promise<{ lang: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.flatMap((lang) => trees.map((t) => ({ lang, slug: t.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const t = getTree(slug);
  if (!t || !isLang(lang)) return {};
  return detailMetadata({ lang, path: `/family-trees/${slug}`, title: loc(t.title, lang).text, description: loc(t.intro, lang).text, draft: t.status === "draft" });
}

export default async function TreePage({ params }: P) {
  const { lang: raw, slug } = await params;
  const t = getTree(slug);
  if (!isLang(raw) || !t) notFound();
  const lang: Lang = raw;
  const dict = getDictionary(lang);
  const title = loc(t.title, lang);
  const intro = loc(t.intro, lang);
  const notes = paras(t.notes, lang);
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: dict.breadcrumb.home, url: absoluteUrl(lang) }, { name: dict.tree.title, url: absoluteUrl(lang, "/family-trees") }, { name: title.text }])} />
      <DetailShell
        dict={dict}
        crumbs={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: dict.tree.title, href: `/${lang}/family-trees/` }, { label: title.text }]}
        title={title.text}
        fallback={title.fb || notes.fb}
        draft={t.status === "draft"}
      >
        <Lead text={intro.text} fallback={intro.fb} />
        <div className="mt-6"><FamilyTreeView lang={lang} tree={t} dict={{ tree: dict.tree, era: dict.era, lbl: dict.lbl }} /></div>
        <div className="prose-text mt-6 space-y-2 text-sm text-muted" lang={notes.fb ? "en" : undefined} dir={notes.fb ? "ltr" : undefined}>
          {notes.items.map((n, i) => <p key={i}>{n}</p>)}
        </div>
        <LinkGroup title={dict.rel.civilizations} items={civsOf(t.civIds).map((c) => ({ key: c.id, href: `/${lang}/civilizations/${c.slug}/`, label: c.names[lang] }))} />
        <SourcesBlock dict={dict} sources={sourcesFor(t.sourceIds)} />
      </DetailShell>
    </>
  );
}
