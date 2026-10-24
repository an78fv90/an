import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/catalog";
import BookNowLink from "@/components/BookNowLink";
export const metadata = { title: "Collections" };
export default function C() {
  return (<main className="mx-auto max-w-6xl px-6 pb-20 pt-40"><h1 className="font-display text-6xl">Collections</h1>
    <p className="mt-3 max-w-xl text-plaster/75">Choose a casting style and book your keepsake directly with our studio.</p>
    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{categories.map(c => <article key={c.slug} className="glass group overflow-hidden rounded-3xl shadow-lg transition duration-300 hover:-translate-y-1 hover:border-bronze/70 hover:shadow-2xl">
      <Link href={`/collections/${c.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-mist/20"><Image src={c.imageUrl} alt={c.label} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /></div>
        <div className="p-5 pb-0"><h2 className="font-display text-3xl">{c.label}</h2><p className="mt-2 text-sm text-plaster/75">{c.blurb}</p><span className="mt-3 inline-block text-sm text-bronze">View collection →</span></div>
      </Link>
      <div className="px-5 pb-5 pt-4"><BookNowLink className="inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3 font-medium text-ink shadow-md transition hover:scale-[1.02] hover:shadow-lg" /></div>
    </article>)}</div></main>);
}
