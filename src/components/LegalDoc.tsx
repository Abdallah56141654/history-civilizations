import type { Lang } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { legal, LEGAL_UPDATED, type LegalPage } from "@/data/legal";
import { CONTACT_EMAIL, OPERATOR_ADDRESS, OPERATOR_NAME, operatorConfigured } from "@/lib/legal";
import Breadcrumbs from "./Breadcrumbs";

export default function LegalDoc({ lang, dict, page, title }: { lang: Lang; dict: Dictionary; page: LegalPage; title: string }) {
  const own = legal[page][lang];
  const sections = own ?? legal[page].en ?? [];
  const fb = !own && lang !== "en";
  const sub = (t: string) =>
    t.replaceAll("{operator}", OPERATOR_NAME || dict.legal.notConfigured).replaceAll("{email}", CONTACT_EMAIL || dict.legal.notConfigured);

  return (
    <>
      <Breadcrumbs label={dict.breadcrumb.label} items={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: title }]} />
      <h1 className="mt-4 font-display text-4xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-muted">{dict.legal.lastUpdated}: <time dateTime={LEGAL_UPDATED}>{LEGAL_UPDATED}</time></p>
      {!operatorConfigured && <p role="note" className="mt-4 rounded-md border border-line bg-surface p-3 text-sm">{dict.legal.template}</p>}
      {fb && <p role="note" className="mt-4 rounded-md border border-line bg-surface p-3 text-sm">{dict.civ.notTranslated}</p>}
      <div className="prose-text mt-6" lang={fb ? "en" : undefined} dir={fb ? "ltr" : undefined}>
        {sections.map((s) => (
          <section key={s.heading} className="mb-6">
            <h2 className="font-display text-2xl font-bold">{s.heading}</h2>
            <div className="mt-2 space-y-3">{s.body.map((p, i) => <p key={i}>{sub(p)}</p>)}</div>
          </section>
        ))}
        {page === "privacy" && OPERATOR_ADDRESS && <p className="text-sm text-muted">{OPERATOR_ADDRESS}</p>}
      </div>
    </>
  );
}
