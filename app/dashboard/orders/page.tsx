import OrderTracker from "@/components/commerce/OrderTracker";
import EmptyState from "@/components/ui/EmptyState";
import { db } from "@/lib/db";
import { sessionUser } from "@/lib/session";
import { stageIndex } from "@/lib/status";
import { inr } from "@/lib/data";
export default async function P() {
  const u = (await sessionUser())!; const orders = await db.order.findMany({ where: { userId: u.id }, orderBy: { createdAt: "desc" }, include: { items: { include: { product: true } } } });
  return (<main className="mx-auto max-w-3xl px-6 pb-20 pt-36"><h1 className="mb-6 font-display text-5xl">Orders</h1>
    {orders.length ? orders.map(o => <article key={o.id} className="mb-6 rounded-3xl bg-white/60 p-6"><h2 className="font-display text-2xl">{o.number} · {inr(o.total)}</h2><p className="mb-4 text-sm">{o.items.map(i => `${i.product.name} × ${i.qty}`).join(", ")}</p><OrderTracker current={stageIndex(o.status)} /></article>)
      : <EmptyState title="No orders yet" text="Your keepsakes will be tracked here." href="/collections" cta="Explore collections" />}</main>);
}
