"use client";
import { useMemo, useState } from "react";
type Cell = string | number | React.ReactElement;
export default function DataTable({ title, cols, rows, pageSize = 5 }: { title: string; cols: string[]; rows: Cell[][]; pageSize?: number }) {
  const [q, setQ] = useState(""), [sort, setSort] = useState<{ i: number; dir: 1 | -1 } | null>(null), [page, setPage] = useState(0);
  const data = useMemo(() => {
    let r = rows.filter(x => x.map(c => (typeof c === "object" ? "" : String(c))).join(" ").toLowerCase().includes(q.toLowerCase()));
    if (sort) r = [...r].sort((a, b) => (String(a[sort.i]) > String(b[sort.i]) ? 1 : -1) * sort.dir);
    return r;
  }, [rows, q, sort]);
  const pages = Math.max(1, Math.ceil(data.length / pageSize)), cur = Math.min(page, pages - 1);
  return (<section><h1 className="mb-6 font-display text-5xl">{title}</h1>
    <input aria-label={`Search ${title}`} value={q} onChange={e => { setQ(e.target.value); setPage(0); }} placeholder="Search" className="mb-4 w-full max-w-sm rounded-xl border border-ink/20 p-3" />
    <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr>{cols.map((c, i) => <th key={c} className="border-b border-ink/20 py-2 pr-4"><button onClick={() => setSort({ i, dir: sort?.i === i && sort.dir === 1 ? -1 : 1 })}>{c}{sort?.i === i ? (sort.dir === 1 ? " ↑" : " ↓") : ""}</button></th>)}</tr></thead>
      <tbody>{data.slice(cur * pageSize, cur * pageSize + pageSize).map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className="border-b border-ink/10 py-3 pr-4">{c}</td>)}</tr>)}</tbody></table></div>
    {!data.length && <p className="py-8">No matches. Clear the search to see everything.</p>}
    <div className="mt-4 flex items-center gap-4"><button disabled={cur === 0} onClick={() => setPage(cur - 1)} className="disabled:opacity-30">Previous</button><span>Page {cur + 1} of {pages}</span><button disabled={cur >= pages - 1} onClick={() => setPage(cur + 1)} className="disabled:opacity-30">Next</button></div></section>);
}
