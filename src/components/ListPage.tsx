import type { Dictionary } from "@/i18n/get-dictionary";
import type { Lang } from "@/i18n/config";
import Breadcrumbs from "./Breadcrumbs";
import { CardGrid, type ListItem } from "./ListCard";

export default function ListPage({ lang, dict, title, intro, items }: { lang: Lang; dict: Dictionary; title: string; intro: string; items: ListItem[] }) {
  return (
    <>
      <Breadcrumbs label={dict.breadcrumb.label} items={[{ label: dict.breadcrumb.home, href: `/${lang}/` }, { label: title }]} />
      <h1 className="mt-4 font-display text-4xl font-bold">{title}</h1>
      <p className="mt-3 max-w-[68ch] text-muted">{intro}</p>
      <div className="mt-8">
        <CardGrid items={items} />
      </div>
    </>
  );
}
