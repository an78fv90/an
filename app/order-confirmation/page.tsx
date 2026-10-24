import { notFound, redirect } from "next/navigation";
import OrderTracker from "@/components/commerce/OrderTracker";
import { db } from "@/lib/db";
import { sessionUser } from "@/lib/session";
import { stageIndex } from "@/lib/status";
import { inr } from "@/lib/data";
export default async function Page({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const u = await sessionUser(); if (!u) redirect("/login");
  const o = await db.order.findFirst({ where: { number: (await searchParams).id ?? "", userId: u.id }, include: { items: { include: { product: true } }, payment: true } }); if (!o) notFound();
  return (<main className="mx-auto max-w-xl px-6 pb-20 pt-40" role="status"><h1 className="font-display text-5xl">Thank you</h1>
    <p className="mt-3">Order {o.number} · {inr(o.total)} · payment {o.payment?.status.toLowerCase()}{o.payment?.provider === "manual" ? " (the studio will confirm payment with you)" : ""}.</p>
    <ul className="mt-4">{o.items.map(i => <li key={i.id}>{i.product.name} × {i.qty}</li>)}</ul><div className="mt-8"><OrderTracker current={stageIndex(o.status)} /></div></main>);
}
