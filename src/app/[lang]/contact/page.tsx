import type { Metadata } from "next";
import { isLang, type Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { alternatesFor } from "@/lib/site";
import { CONTACT_EMAIL } from "@/lib/legal";
import Breadcrumbs from "@/components/Breadcrumbs";

type P = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang as Lang);
  return { title: d.legalNav.contact, description: d.legal.contactIntro, alternates: alternatesFor(lang as Lang, "/contact") };
}

export default async function ContactPage({ params }: P) {
  const { lang: raw } = await params;
  if (!isLang(raw)) return null;
  const lang = raw;
  const dict = getDictionary(lang);
  return (
    <>
      <Breadcrumbs label={dict.breadcrumb.label} items={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: dict.legalNav.contact }]} />
      <h1 className="mt-4 font-display text-4xl font-bold">{dict.legalNav.contact}</h1>
      <p className="prose-text mt-4 text-lg">{dict.legal.contactIntro}</p>
      <p className="mt-6">
        {CONTACT_EMAIL ? (
          <>{dict.legal.emailLabel}: <a href={`mailto:${CONTACT_EMAIL}`} className="text-lapis underline underline-offset-4">{CONTACT_EMAIL}</a></>
        ) : (
          <span role="note" className="rounded-md border border-line bg-surface p-3 text-sm">{dict.legal.noEmail}</span>
        )}
      </p>
    </>
  );
}
