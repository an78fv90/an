"use client";
import { useState } from "react";
import type { CatalogItem } from "@/lib/catalog";
import BookNowLink from "@/components/BookNowLink";
export default function ProductCard({ p }: { p: CatalogItem }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (<article className="flex flex-col rounded-3xl border border-ink/10 bg-white/60 p-5 transition hover:-translate-y-1 hover:shadow-xl">
    <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-mist/60 to-bronze/40" role="img" aria-label={`${p.name} keepsake preview`}>
      {!imageFailed && <img src={p.imageUrl} alt="" aria-hidden="true" className="h-full w-full object-cover" onError={() => setImageFailed(true)} />}
    </div>
    <h3 className="font-display text-2xl">{p.name}</h3><p className="mt-1 text-sm">{p.description}</p>
    <p className="mt-2 text-xs">{p.size} · ready in about {p.productionDays} days</p><p className="mt-1 text-xs">Customize: {p.options.join(", ")}</p>
    <div className="mt-3 flex flex-wrap gap-2 text-sm">
      <BookNowLink className="rounded-full border border-ink px-4 py-2" /></div></article>);
}
