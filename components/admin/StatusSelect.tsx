"use client";
import { useRouter } from "next/navigation";
export default function StatusSelect({ kind, id, value, options }: { kind: string; id: string; value: string; options: readonly string[] }) {
  const router = useRouter();
  return <select aria-label="Status" defaultValue={value} className="rounded-lg border border-ink/20 p-1" onChange={async e => { await fetch("/api/admin/status", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind, id, status: e.target.value }) }); router.refresh(); }}>{options.map(o => <option key={o}>{o}</option>)}</select>;
}
