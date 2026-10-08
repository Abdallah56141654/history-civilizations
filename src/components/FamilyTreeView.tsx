import Link from "next/link";
import type { Lang } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { FamilyTree } from "@/lib/types";
import { personById } from "@/lib/content";
import { formatDate, formatLife } from "@/lib/site";

const COL_W = 170;
const ROW_H = 130;
const NODE_W = 150;
const NODE_H = 66;
const PAD_X = 20;
const PAD_Y = 90; // headroom for union arcs

/** Static, data-driven family tree: HTML nodes over an SVG of connecting lines. No client JS. */
export default function FamilyTreeView({ lang, tree, dict }: { lang: Lang; tree: FamilyTree; dict: Pick<Dictionary, "tree" | "era" | "lbl"> }) {
  const byId = new Map(tree.nodes.map((n) => [n.id, n]));
  const cx = (col: number) => PAD_X + col * COL_W + NODE_W / 2;
  const top = (gen: number) => PAD_Y + gen * ROW_H;
  const maxCol = Math.max(...tree.nodes.map((n) => n.col));
  const maxGen = Math.max(...tree.nodes.map((n) => n.gen));
  const width = PAD_X * 2 + maxCol * COL_W + NODE_W;
  const height = PAD_Y + maxGen * ROW_H + NODE_H + 20;

  const dates = (n: FamilyTree["nodes"][number]) => {
    if (n.birth !== undefined && n.death !== undefined) return formatLife(n.birth, n.death, n.approx, lang, dict.era, dict.lbl.unknown);
    if (n.death !== undefined) return `${dict.lbl.died}: ${formatDate(n.death, n.approx, lang, dict.era)}`;
    if (n.birth !== undefined) return `${dict.lbl.born}: ${formatDate(n.birth, n.approx, lang, dict.era)}`;
    return "";
  };

  const textOf = (kind: "parent" | "spouse" | "partner", a: string, b: string) =>
    dict.tree.rel[kind].replace("{a}", byId.get(a)!.names[lang]).replace("{b}", byId.get(b)!.names[lang]);

  return (
    <div>
      <div className="overflow-x-auto rounded-md border border-line bg-surface">
        <div dir="ltr" className="relative" style={{ width, height }}>
          <svg width={width} height={height} className="absolute inset-0" aria-hidden="true">
            {tree.parents.map(([p, c]) => {
              const a = byId.get(p)!, b = byId.get(c)!;
              const x1 = cx(a.col), y1 = top(a.gen) + NODE_H, x2 = cx(b.col), y2 = top(b.gen);
              const my = (y1 + y2) / 2;
              return <path key={p + c} d={`M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`} className="fill-none stroke-muted" strokeWidth="1.5" />;
            })}
            {tree.unions.map((u) => {
              const a = byId.get(u.a)!, b = byId.get(u.b)!;
              const x1 = cx(a.col), x2 = cx(b.col), y = top(a.gen);
              const lift = 16 + Math.abs(a.col - b.col) * 12;
              return <path key={u.a + u.b} d={`M${x1},${y} Q${(x1 + x2) / 2},${y - lift * 2} ${x2},${y}`} className="fill-none stroke-ochre" strokeWidth="2" strokeDasharray={u.kind === "partner" ? "6 5" : undefined} />;
            })}
          </svg>
          {tree.nodes.map((n) => {
            const person = n.personId ? personById(n.personId) : undefined;
            const body = (
              <>
                <span dir="auto" className="block text-sm font-medium leading-tight">{n.names[lang]}</span>
                {dates(n) && <span className="mt-1 block text-xs text-muted">{dates(n)}</span>}
              </>
            );
            const box = "absolute flex flex-col justify-center rounded-md border bg-bg px-2 text-center";
            const style = { left: PAD_X + n.col * COL_W, top: top(n.gen), width: NODE_W, height: NODE_H };
            return person ? (
              <Link key={n.id} href={`/${lang}/people/${person.slug}/`} className={`${box} border-lapis hover:bg-surface`} style={style}>{body}</Link>
            ) : (
              <div key={n.id} className={`${box} border-line`} style={style}>{body}</div>
            );
          })}
        </div>
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
        <li><span aria-hidden="true" className="me-2 inline-block h-0.5 w-6 bg-muted align-middle" />{dict.tree.legend.parent}</li>
        <li><span aria-hidden="true" className="me-2 inline-block h-0.5 w-6 bg-ochre align-middle" />{dict.tree.legend.spouse}</li>
        <li><span aria-hidden="true" className="me-2 inline-block w-6 border-t-2 border-dashed border-ochre align-middle" />{dict.tree.legend.partner}</li>
      </ul>

      <h2 className="mt-8 font-display text-2xl font-bold">{dict.tree.relationships}</h2>
      <ul className="mt-2 max-w-[68ch] list-disc space-y-1 ps-5 text-sm">
        {tree.parents.map(([p, c]) => <li key={p + c}>{textOf("parent", p, c)}</li>)}
        {tree.unions.map((u) => <li key={u.a + u.b}>{textOf(u.kind, u.a, u.b)}</li>)}
      </ul>
    </div>
  );
}
