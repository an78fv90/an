import Link from "next/link";
import Image from "next/image";
export const metadata = { title: "Gallery" };
const items = [
  { title: "Elderly + Baby Casting", category: "ELDERLY_BABY", imageUrl: "/gallery/elderly-baby.png", story: "Two generations, together in one keepsake." },
  { title: "Couple Hand Casting", category: "COUPLES", imageUrl: "/gallery/couples.png", story: "Two hands, one promise." },
  { title: "Elderly Ashirwad Casting", category: "ELDERLY", imageUrl: "/gallery/elderly.png", story: "A lifetime of love, held in your hands." },
  { title: "Kids Casting", category: "KIDS", imageUrl: "/gallery/kids.png", story: "A little moment from every growing year." },
];
const tabs = [["", "All"], ["ELDERLY_BABY", "Elderly + Baby"], ["COUPLES", "Couple"], ["ELDERLY", "Elderly"], ["KIDS", "Kids"]];
export default async function Gallery({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
  const { cat = "" } = await searchParams;
  const visibleItems = items.filter(item => !cat || item.category === cat);
  return (<main className="mx-auto max-w-6xl px-6 pb-20 pt-40"><h1 className="font-display text-6xl">Gallery</h1>
    <nav aria-label="Filter" className="my-6 flex flex-wrap gap-2">{tabs.map(([k, l]) => <Link key={k} href={k ? `/gallery?cat=${k}` : "/gallery"} className={`rounded-full px-4 py-2 text-sm ${cat === k ? "bg-ink text-plaster" : "border border-ink/30"}`}>{l}</Link>)}</nav>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{visibleItems.map(i => <figure key={i.category} className="glass group overflow-hidden rounded-3xl shadow-lg transition duration-300 hover:-translate-y-1 hover:border-bronze/70 hover:shadow-2xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-mist/20"><Image src={i.imageUrl} alt={i.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /></div>
      <figcaption className="p-5"><h2 className="font-display text-2xl">{i.title}</h2><p className="mt-1 text-sm text-plaster/75">{i.story}</p></figcaption></figure>)}</div></main>);
}
