import Link from "next/link";

export interface ListItem {
  key: string;
  href: string;
  title: string;
  meta?: string;
  summary?: string;
  tag?: string;
  summaryFallback?: boolean;
}

export default function ListCard({ item }: { item: ListItem }) {
  return (
    <article className="relative flex h-full flex-col rounded-md border border-line bg-surface p-5 hover:border-lapis">
      {item.meta && <p className="font-display text-sm text-ochre">{item.meta}</p>}
      <h3 className="mt-1 font-display text-xl font-bold leading-snug">
        <Link href={item.href} className="after:absolute after:inset-0">{item.title}</Link>
      </h3>
      {item.summary && (
        <p className="clamp-3 mt-2 text-sm text-muted" lang={item.summaryFallback ? "en" : undefined} dir={item.summaryFallback ? "ltr" : undefined}>
          {item.summary}
        </p>
      )}
      {item.tag && <p className="mt-auto pt-4 text-xs text-muted">{item.tag}</p>}
    </article>
  );
}

export function CardGrid({ items }: { items: ListItem[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((i) => (
        <li key={i.key}>
          <ListCard item={i} />
        </li>
      ))}
    </ul>
  );
}
