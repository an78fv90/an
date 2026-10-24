"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import BookNowLink from "@/components/BookNowLink";
import { site } from "@/lib/site";
import { categories } from "@/lib/catalog";
export default function Home() {
  return (<main>
    <section className="px-3 pb-8 pt-24 md:px-10">
      <div className="ornate mx-auto grid min-h-[84vh] max-w-6xl items-center gap-4 p-6 pt-14 md:grid-cols-[1.1fr_1fr] md:p-14">
        <div>
          <p className="font-display text-xl italic text-bronze md:text-2xl">{site.tagline}</p><div className="divider my-5"><span aria-hidden>◆</span></div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="font-display text-5xl leading-[1.02] md:text-7xl">Some moments deserve to last forever.</motion.h1>
          <p className="mt-6 max-w-md text-lg text-plaster/80">Transform the smallest details of your most meaningful moments into something you can hold forever.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Magnetic><BookNowLink className="inline-block rounded-full bg-ink px-8 py-4 font-medium" /></Magnetic>
            <Magnetic><Link href="/collections" className="glass inline-block rounded-full px-8 py-4">Explore Collections</Link></Magnetic></div></div>
        <div className="flex h-[46vh] items-center justify-center md:h-[66vh]"><Image src="/baby-hand-foot-casting.png" alt="Baby hand and foot casts displayed on a wooden keepsake base" width={367} height={309} priority className="h-full w-full rounded-3xl object-contain" /></div></div>
      <p className="mx-auto mt-6 max-w-6xl text-center text-sm tracking-wide text-bronze">100% Safe &amp; Skin Friendly &nbsp;|&nbsp; Free Home Visit: {site.areas.filter(Boolean).join(" · ")}</p></section>
    <section className="mx-auto max-w-6xl px-6 py-20"><h2 className="font-display text-4xl md:text-5xl">Our services</h2><div className="divider my-5"><span aria-hidden>◆</span></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{site.services.map(([l, h]) => <motion.div key={l} whileHover={{ y: -6 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <Link href={h} className="glass block rounded-2xl p-6 text-center font-display text-2xl">{l}</Link></motion.div>)}</div></section>
    <section className="mx-auto max-w-6xl px-6 py-10"><h2 className="font-display text-4xl md:text-5xl">Collections</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{categories.map(c => <motion.article key={c.slug} whileHover={{ y: -6 }} className="glass group overflow-hidden rounded-3xl shadow-lg transition duration-300 hover:border-bronze/70 hover:shadow-2xl">
        <Link href={`/collections/${c.slug}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden bg-mist/20"><Image src={c.imageUrl} alt={c.label} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /></div>
          <div className="p-5 pb-0"><h3 className="font-display text-2xl">{c.label}</h3><p className="mt-2 text-sm text-plaster/75">{c.blurb}</p><span className="mt-3 inline-block text-sm text-bronze">View collection →</span></div>
        </Link>
        <div className="px-5 pb-5 pt-4"><BookNowLink className="inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3 font-medium text-ink shadow-md transition hover:scale-[1.02] hover:shadow-lg" /></div>
      </motion.article>)}</div></section>
  </main>);
}
