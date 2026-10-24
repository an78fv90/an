"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
type Item = { id: string; title: string; category: string; imageUrl: string };
export default function GalleryManager({ items }: { items: Item[] }) {
  const router = useRouter(); const [msg, setMsg] = useState(""), [busy, setBusy] = useState(false);
  async function upload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setMsg("");
    const r = await fetch("/api/admin/gallery", { method: "POST", body: new FormData(e.currentTarget) }); const d = await r.json(); setBusy(false);
    if (!r.ok) return setMsg(d.error); setMsg("Photo published."); (e.target as HTMLFormElement).reset(); router.refresh();
  }
  async function del(id: string) { if (!confirm("Delete this photo?")) return; await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" }); router.refresh(); }
  return (<div><form onSubmit={upload} className="grid gap-4 rounded-3xl bg-white/60 p-6 md:grid-cols-2">
    <label>Photo<input name="file" type="file" accept="image/*" required className="mt-1 block w-full" /></label>
    <label>Title<input name="title" required maxLength={80} className="mt-1 w-full rounded-xl border border-ink/20 p-3" /></label>
    <label>Category<select name="category" required className="mt-1 w-full rounded-xl border border-ink/20 p-3"><option value="BABY">Baby</option><option value="COUPLES">Couples</option><option value="FAMILY">Family</option><option value="PETS">Pets</option></select></label>
    <label>Customer story (optional)<input name="story" maxLength={600} className="mt-1 w-full rounded-xl border border-ink/20 p-3" /></label>
    <label className="flex items-center gap-2"><input name="featured" type="checkbox" /> Feature on home page</label>
    <button disabled={busy} className="rounded-full bg-ink py-3 text-plaster disabled:opacity-40">{busy ? "Uploading…" : "Publish photo"}</button>
    {msg && <p role="status" className="md:col-span-2">{msg}</p>}</form>
    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">{items.map(i => <figure key={i.id}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={i.imageUrl} alt={i.title} loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />
      <figcaption className="mt-1 flex justify-between text-sm"><span>{i.title}</span><button onClick={() => del(i.id)} className="underline">Delete</button></figcaption></figure>)}</div>
    {!items.length && <p className="mt-6">No photos yet. Upload your first finished piece above.</p>}</div>);
}
