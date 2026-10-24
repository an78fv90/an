import { notFound } from "next/navigation";
import { pages } from "@/lib/pages";
export const generateStaticParams = () => Object.keys(pages).map(slug => ({ slug }));
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = pages[(await params).slug]; if (!p) notFound();
  return (<main><section className="bg-mulberry px-6 pb-24 pt-40 text-plaster md:px-16">
    <h1 className="font-display text-6xl md:text-8xl">{p.title}</h1><p className="mt-6 max-w-xl text-xl text-plaster/80">{p.lead}</p></section>
    <section className="mx-auto max-w-4xl px-6 py-20"><ul className="space-y-4">{p.points.map(x => <li key={x} className="border-b border-ink/15 pb-4 font-display text-2xl">{x}</li>)}</ul>
    </section></main>);
}
