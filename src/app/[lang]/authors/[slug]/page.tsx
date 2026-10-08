import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { articles, loc } from "@/lib/content";
import { authors } from "@/data/authors";
import { detailMetadata } from "@/lib/seo";
import { DetailShell, Lead, LinkGroup } from "@/components/Detail";

type P = { params: Promise<{ lang: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.flatMap((lang) => authors.map((a) => ({ lang, slug: a.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const a = authors.find((x) => x.slug === slug);
  if (!a || !isLang(lang)) return {};
  return detailMetadata({ lang, path: `/authors/${slug}`, title: a.names[lang], description: loc(a.bio, lang).text, draft: false, type: "website" });
}

export default async function AuthorPage({ params }: P) {
  const { lang: raw, slug } = await params;
  const author = authors.find((x) => x.slug === slug);
  if (!isLang(raw) || !author) notFound();
  const lang: Lang = raw;
  const dict = getDictionary(lang);
  const bio = loc(author.bio, lang);
  return (
    <DetailShell
      dict={dict}
      crumbs={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: author.names[lang] }]}
      title={author.names[lang]}
      fallback={bio.fb}
      draft={false}
    >
      <Lead text={bio.text} fallback={bio.fb} />
      <LinkGroup
        title={dict.rel.articles}
        items={articles.filter((a) => a.authorId === author.id).map((a) => ({ key: a.id, href: `/${lang}/articles/${a.slug}/`, label: loc(a.title, lang).text }))}
      />
    </DetailShell>
  );
}
