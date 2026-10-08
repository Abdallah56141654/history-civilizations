import Link from "next/link";
import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Source } from "@/lib/types";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";

export function DetailShell({ dict, crumbs, title, meta, fallback, draft, children }: {
  dict: Dictionary; crumbs: Crumb[]; title: string; meta?: string; fallback: boolean; draft: boolean; children: ReactNode;
}) {
  return (
    <article>
      <Breadcrumbs label={dict.breadcrumb.label} items={crumbs} />
      <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{title}</h1>
      {meta && <p className="mt-2 font-display text-lg text-ochre">{meta}</p>}
      {fallback && (
        <p role="note" className="mt-5 rounded-md border border-line bg-surface p-3 text-sm">{dict.civ.notTranslated}</p>
      )}
      <div className="mt-6">{children}</div>
      {draft && <p role="note" className="mt-10 rounded-md border border-line bg-surface p-3 text-sm text-muted">{dict.civ.reviewDraft}</p>}
    </article>
  );
}

export function Lead({ text, fallback }: { text: string; fallback: boolean }) {
  return (
    <p className="prose-text font-display text-xl leading-relaxed" lang={fallback ? "en" : undefined} dir={fallback ? "ltr" : undefined}>
      {text}
    </p>
  );
}

export function Facts({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="mt-6 grid max-w-xl grid-cols-[auto_1fr] gap-x-6 gap-y-2 rounded-md border border-line bg-surface p-4 text-sm">
      {rows.map((r) => (
        <div key={r.label} className="contents">
          <dt className="text-muted">{r.label}</dt>
          <dd className="font-medium">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function LinkGroup({ title, items }: { title: string; items: { key: string; href: string; label: string; hint?: string }[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-10" aria-label={title}>
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <ul className="mt-3 flex flex-wrap gap-3">
        {items.map((i) => (
          <li key={i.key}>
            <Link href={i.href} className="inline-block rounded-md border border-control bg-surface px-4 py-2 hover:border-lapis">
              {i.hint && <span className="me-2 font-display text-sm text-ochre">{i.hint}</span>}
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SourcesBlock({ dict, sources }: { dict: Dictionary; sources: Source[] }) {
  if (sources.length === 0) return null;
  return (
    <section className="mt-10" aria-labelledby="sources-h">
      <h2 id="sources-h" className="font-display text-2xl font-bold">{dict.rel.sources}</h2>
      <p className="mt-2 max-w-[68ch] text-sm text-muted">{dict.lbl.sourcesNote}</p>
      <ul className="mt-3 max-w-[68ch] list-disc space-y-1 ps-5 text-sm" dir="ltr" lang="en">
        {sources.map((s) => (
          <li key={s.id}>{s.citation}</li>
        ))}
      </ul>
    </section>
  );
}
