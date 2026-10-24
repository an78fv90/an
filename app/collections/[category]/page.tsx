import { notFound } from "next/navigation";
import ProductCard from "@/components/commerce/ProductCard";
import { catalog, categories } from "@/lib/catalog";
import BookNowLink from "@/components/BookNowLink";
export const generateStaticParams = () => categories.map(c => ({ category: c.slug }));
export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const slug = (await params).category, c = categories.find(x => x.slug === slug); if (!c) notFound();
  const items = catalog.filter(p => p.category === slug);
  const ld = { "@context": "https://schema.org", "@graph": items.map(p => ({ "@type": "Product", name: p.name, description: p.description, offers: { "@type": "Offer", priceCurrency: "INR", price: p.priceInr } })) };
  return (<main className="mx-auto max-w-6xl px-6 pb-20 pt-40"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <h1 className="font-display text-6xl">{c.label}</h1><p className="mt-2 text-lg">{c.blurb}</p>
    <div role="img" aria-label={c.label} className="mt-8 flex min-h-64 items-end rounded-3xl bg-cover bg-center p-8 text-white md:min-h-80" style={{ backgroundImage: `linear-gradient(0deg, rgba(26, 18, 20, 0.7), rgba(26, 18, 20, 0.05)), url("${c.imageUrl}")` }}>
      <p className="font-display text-3xl">{c.label}</p>
    </div>
    <BookNowLink className="mt-6 inline-block rounded-full bg-ink px-7 py-3 font-medium text-plaster shadow-md transition hover:bg-bronze hover:text-ink" />
    {items.length > 0
      ? <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map(p => <ProductCard key={p.slug} p={p} />)}</div>
      : <p className="mt-8 rounded-2xl bg-white/60 p-6">Product options for this collection are coming soon. Use the button above to request a casting session.</p>}
  </main>);
}
