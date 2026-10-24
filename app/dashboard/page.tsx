import Link from "next/link";
import { redirect } from "next/navigation";
import OrderTracker from "@/components/commerce/OrderTracker";
import EmptyState from "@/components/ui/EmptyState";
import { db } from "@/lib/db";
import { sessionUser } from "@/lib/session";
import { fmt, stageIndex } from "@/lib/status";
export default async function Dash() {
  const u = await sessionUser();
  if (!u) redirect("/login");
  const now = new Date();
  const [orders, bookings, memories] = await Promise.all([db.order.findMany({ where: { userId: u.id }, orderBy: { createdAt: "desc" } }), db.booking.findMany({ where: { userId: u.id, status: { not: "CANCELLED" } }, include: { package: true }, orderBy: { slot: "asc" } }), db.memory.count({ where: { userId: u.id } })]);
  const active = orders.filter(o => !["DELIVERED", "CANCELLED"].includes(o.status)), next = bookings.find(b => b.slot > now);
  const stats = [["Active orders", active.length], ["Upcoming sessions", bookings.filter(b => b.slot > now).length], ["Memories", memories], ["Completed", orders.filter(o => o.status === "DELIVERED").length]];
  return (<main className="mx-auto max-w-5xl px-6 pb-20 pt-36"><h1 className="font-display text-5xl">Welcome, {u.name.split(" ")[0] || "friend"}</h1>
    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">{stats.map(([k, v]) => <div key={k} className="rounded-2xl bg-mulberry p-5 text-plaster"><p className="text-sm">{k}</p><p className="font-display text-4xl">{v}</p></div>)}</div>
    <div className="mt-8 grid gap-6 md:grid-cols-2"><section className="rounded-3xl bg-white/60 p-6"><h2 className="mb-3 font-display text-2xl">Upcoming booking</h2>
      {next ? <p>{next.package.name} · {fmt(next.slot)} · {next.homeVisit ? "Home visit" : "Studio"} · {next.status.toLowerCase()}</p> : <EmptyState title="No upcoming bookings" text="Send a request to arrange your casting." href="/booking" cta="Book now" />}</section>
      <section className="rounded-3xl bg-white/60 p-6"><h2 className="mb-3 font-display text-2xl">Current order</h2>
      {active[0] ? <><p className="mb-3">{active[0].number}</p><OrderTracker current={stageIndex(active[0].status)} /></> : <EmptyState title="No active orders" text="Your next keepsake will appear here." href="/collections" cta="Explore collections" />}</section></div>
    <nav className="mt-8 flex gap-5 underline"><Link href="/dashboard/orders">Orders</Link><Link href="/dashboard/bookings">Bookings</Link><Link href="/dashboard/profile">Profile</Link></nav></main>);
}
