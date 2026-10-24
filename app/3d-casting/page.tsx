import Link from "next/link";
import { db } from "@/lib/db";
import { packages as fallback, type Pkg } from "@/lib/packages";
import { categories } from "@/lib/catalog";
import BookNowLink from "@/components/BookNowLink";
export const metadata = { title: "3D casting packages", description: "Baby, couple and Ashirwad hand casting packages." };
export const revalidate = 60;
const groups = [["BABY", "Baby"], ["COUPLES", "Couples & parents"]] as const;
const elderly = categories.find(c => c.slug === "elderly");
export default async function Page() {
  let list: Pkg[] = fallback;
  try { const r = await db.package.findMany({ orderBy: { priceInr: "asc" } }); if (r.length) list = r as Pkg[]; } catch {}
  return (<main className="mx-auto max-w-6xl px-6 pb-20 pt-40"><h1 className="font-display text-6xl">3D casting packages</h1>
    <p className="mt-3 max-w-xl text-lg">Choose who we are casting. Every piece is finished by hand and comes with its own private memory page.</p>
    {groups.map(([k, label]) => <section key={k} className="mt-14"><h2 className="mb-5 font-display text-4xl">{label}</h2>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{list.filter(p => p.category === k).map(p =>
        <article key={p.name} className="relative rounded-3xl border border-ink/10 bg-white/60 p-6">
          {p.popular && <span className="absolute right-4 top-4 rounded-full bg-bronze px-3 py-1 text-xs text-ink">Popular</span>}
          <h3 className="font-display text-3xl">{p.name}</h3><p className="mt-1 text-sm">About {p.durationMin} minutes</p>
          <ul className="mt-3 list-disc pl-5 text-sm">{p.features.map(f => <li key={f}>{f}</li>)}</ul>
          <BookNowLink className="mt-4 inline-block rounded-full bg-ink px-5 py-2 text-plaster" /></article>)}</div></section>)}
    {elderly && <section className="mt-14"><h2 className="mb-5 font-display text-4xl">Ashirwad Casting</h2>
      <div className="max-w-2xl">
        <Link href="/collections/elderly" className="flex min-h-64 items-end rounded-3xl bg-cover bg-center p-8 text-plaster" style={{ backgroundImage: `linear-gradient(0deg, rgba(26, 18, 20, 0.8), rgba(26, 18, 20, 0.08)), url("${elderly.imageUrl}")` }}>
          <div><h3 className="font-display text-3xl">{elderly.label}</h3><p className="mt-2">{elderly.blurb}</p><span className="mt-4 inline-block underline">Explore Ashirwad casting</span></div>
        </Link>
        <BookNowLink className="mt-4 inline-block rounded-full bg-ink px-5 py-2 text-plaster" />
      </div>
    </section>}
    <aside className="mt-14 rounded-3xl bg-mist/40 p-6 text-sm"><h2 className="font-display text-2xl">Good to know</h2>
      <p className="mt-2">Home visits and studio rules, and the age cut-off for baby pricing, are set by the studio. Check them with us when you book.</p></aside></main>);
}
