"use client";
import Link from "next/link";
import { useCart } from "@/components/commerce/CartProvider";
export default function Cart() {
  const { lines, remove } = useCart();
  if (!lines.length) return <main className="px-6 pt-44 text-center"><h1 className="font-display text-5xl">Your cart is waiting</h1><p className="mt-3">Nothing here yet. Start with a collection.</p><Link href="/collections" className="mt-6 inline-block rounded-full bg-ink px-7 py-3 text-plaster">Explore collections</Link></main>;
  return (<main className="mx-auto max-w-3xl px-6 pb-20 pt-40"><h1 className="font-display text-5xl">Cart</h1>
    {lines.map(l => <div key={l.slug} className="flex items-center justify-between border-b border-ink/10 py-4"><span>{l.name} × {l.qty}</span><button onClick={() => remove(l.slug)} className="ml-3 underline">Remove</button></div>)}
    <Link href="/checkout" className="mt-8 inline-block rounded-full bg-ink px-7 py-3 text-plaster">Checkout</Link></main>);
}
