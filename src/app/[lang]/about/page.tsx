import type { Metadata } from "next";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { alternatesFor } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang as Lang);
  return { title: dict.about.title, description: dict.about.body1, alternates: alternatesFor(lang as Lang, "/about") };
}

export default async function About({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const lang = raw;
  const dict = getDictionary(lang);
  return (
    <>
      <Breadcrumbs label={dict.breadcrumb.label} items={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: dict.about.title }]} />
      <h1 className="mt-4 font-display text-4xl font-bold">{dict.about.title}</h1>
      <div className="prose-text mt-6 space-y-4 text-lg">
        <p>{dict.about.body1}</p>
        <p>{dict.about.body2}</p>
        <p>{dict.about.body3}</p>
      </div>
    </>
  );
}
