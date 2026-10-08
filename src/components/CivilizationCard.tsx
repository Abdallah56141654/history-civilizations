import Link from "next/link";
import type { Lang } from "@/i18n/config";

export interface CardData {
  slug: string;
  name: string;
  period: string;
  region: string;
  summary: string;
}

export default function CivilizationCard({ lang, c }: { lang: Lang; c: CardData }) {
  return (
    <article className="flex h-full flex-col rounded-md border border-line bg-surface p-5 hover:border-lapis">
      <p className="font-display text-sm text-ochre">{c.period}</p>
      <h3 className="mt-1 font-display text-xl font-bold leading-snug">
        <Link href={`/${lang}/civilizations/${c.slug}/`} className="after:absolute after:inset-0 relative">
          {c.name}
        </Link>
      </h3>
      <p className="clamp-3 mt-2 text-sm text-muted">{c.summary}</p>
      <p className="mt-auto pt-4 text-xs text-muted">{c.region}</p>
    </article>
  );
}
