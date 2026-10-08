import Link from "next/link";

export interface Crumb { label: string; href?: string }

export default function Breadcrumbs({ items, label }: { items: Crumb[]; label: string }) {
  return (
    <nav aria-label={label} className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-x-2">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-x-2">
            {c.href ? <Link href={c.href} className="hover:text-lapis">{c.label}</Link> : <span aria-current="page" className="text-ink">{c.label}</span>}
            {i < items.length - 1 && <span aria-hidden="true" className="rtl:-scale-x-100">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
