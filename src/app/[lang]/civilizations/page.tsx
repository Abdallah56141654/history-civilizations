import type { Metadata } from "next";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { civilizations, regionKeys } from "@/data/civilizations";
import { absoluteUrl, alternatesFor, formatPeriod } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import CivilizationsBrowser from "@/components/CivilizationsBrowser";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang as Lang);
  return { title: dict.civ.title, description: dict.civ.intro, alternates: alternatesFor(lang as Lang, "/civilizations") };
}

export default async function CivilizationsPage({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const lang = raw;
  const dict = getDictionary(lang);

  const items = civilizations.map((c) => ({
    slug: c.slug,
    name: c.names[lang],
    period: formatPeriod(c.startYear, c.endYear, lang, dict.era),
    region: dict.regions[c.region],
    regionKey: c.region,
    summary: c.summary[lang] ?? c.summary.en ?? "",
  }));
  const usedRegions = regionKeys.filter((r) => civilizations.some((c) => c.region === r)).map((r) => ({ key: r as string, label: dict.regions[r] }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.breadcrumb.home, item: absoluteUrl(lang) },
      { "@type": "ListItem", position: 2, name: dict.civ.title },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs label={dict.breadcrumb.label} items={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: dict.civ.title }]} />
      <h1 className="mt-4 font-display text-4xl font-bold">{dict.civ.title}</h1>
      <p className="mt-3 max-w-[68ch] text-muted">{dict.civ.intro}</p>
      <div className="mt-8">
        <CivilizationsBrowser lang={lang} items={items} regions={usedRegions} allLabel={dict.civ.allRegions} countTemplate={dict.civ.count} />
      </div>
    </>
  );
}
