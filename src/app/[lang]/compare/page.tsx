import type { Metadata } from "next";
import { Suspense } from "react";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { civilizations, loc } from "@/lib/content";
import { COMPARE_DIMS, profiles } from "@/data/profiles";
import { alternatesFor, formatPeriod } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import Compare, { type CompareCiv } from "@/components/Compare";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang as Lang);
  return { title: d.cmp.title, description: d.cmp.intro, alternates: alternatesFor(lang as Lang, "/compare") };
}

export default async function ComparePage({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const lang = raw;
  const dict = getDictionary(lang);

  const civs: CompareCiv[] = civilizations
    .filter((c) => profiles[c.id])
    .map((c) => ({
      slug: c.slug,
      name: c.names[lang],
      period: formatPeriod(c.startYear, c.endYear, lang, dict.era),
      region: dict.regions[c.region],
      rows: Object.fromEntries(COMPARE_DIMS.map((d) => [d, loc(profiles[c.id][d], lang)])),
    }));

  return (
    <>
      <Breadcrumbs label={dict.breadcrumb.label} items={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: dict.cmp.title }]} />
      <h1 className="mt-4 font-display text-4xl font-bold">{dict.cmp.title}</h1>
      <p className="mt-3 max-w-[68ch] text-muted">{dict.cmp.intro}</p>
      <div className="mt-6">
        <Suspense fallback={null}>
          <Compare
            lang={lang}
            dict={dict.cmp}
            civs={civs}
            dims={COMPARE_DIMS}
            pairs={[["ancient-egypt", "roman-empire"], ["ancient-greece", "persian-empire"], ["mesopotamia", "ancient-egypt"], ["roman-empire", "persian-empire"]]}
            fallbackNote={dict.civ.notTranslated}
          />
        </Suspense>
      </div>
    </>
  );
}
