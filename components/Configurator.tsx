"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { castTypes, frames, materials, sizes } from "@/lib/data";
const Scene = dynamic(() => import("./KeepsakeScene"), { ssr: false,
  loading: () => <div className="h-full animate-pulse rounded-3xl bg-white/10" aria-busy="true" /> });
type Opt = { id: string; label: string };
function Group({ title, items, value, set }: { title: string; items: Opt[]; value: string; set: (v: string) => void }) {
  return (
    <fieldset className="mb-6"><legend className="mb-2 font-display text-xl">{title}</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup">
        {items.map(o => (
          <button key={o.id} role="radio" aria-checked={value === o.id} onClick={() => set(o.id)}
            className={`rounded-full px-4 py-2 text-sm transition ${value === o.id ? "bg-bronze text-ink" : "glass hover:bg-white/20"}`}>{o.label}</button>))}
      </div></fieldset>);
}
export default function Configurator() {
  const [cast, setCast] = useState("baby"), [frame, setFrame] = useState("velvet"),
    [mat, setMat] = useState("ivory"), [size, setSize] = useState("m"), [text, setText] = useState("");
  const f = frames.find(x => x.id === frame)!, m = materials.find(x => x.id === mat)!, s = sizes.find(x => x.id === size)!;
  return (
    <div className="grid min-h-[80vh] gap-8 rounded-[2rem] bg-mulberry p-6 text-plaster md:grid-cols-2 md:p-10">
      <div className="h-[380px] md:h-auto"><Scene frame={f.color} material={m.color} scale={0.8 + s.mult * 0.2} /></div>
      <div>
        <Group title="Cast type" items={castTypes} value={cast} set={setCast} />
        <Group title="Frame" items={frames} value={frame} set={setFrame} />
        <Group title="Material" items={materials} value={mat} set={setMat} />
        <Group title="Size" items={sizes} value={size} set={setSize} />
        <label className="mb-6 block"><span className="font-display text-xl">Engraving</span>
          <input value={text} maxLength={32} onChange={e => setText(e.target.value)} placeholder="Aarav · 14 March 2026"
            className="glass mt-2 w-full rounded-xl px-4 py-3 placeholder:text-plaster/50" /></label>
      </div>
    </div>);
}
