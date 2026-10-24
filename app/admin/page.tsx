import Link from "next/link";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
export default async function Admin() {
  const [customers, orders, bookings, pending, rev] = await Promise.all([db.user.count({ where: { role: "CUSTOMER" } }), db.order.count(), db.booking.count({ where: { status: "PENDING" } }), db.order.count({ where: { status: { notIn: ["DELIVERED", "CANCELLED"] } } }), db.payment.aggregate({ where: { status: "PAID" }, _sum: { amount: true } })]);
  const stats = [["Revenue (₹)", rev._sum.amount ?? 0], ["Orders", orders], ["Bookings to confirm", bookings], ["Customers", customers], ["Orders in progress", pending]];
  return (<main className="mx-auto max-w-5xl px-6 pb-20 pt-36"><h1 className="mb-8 font-display text-5xl">Studio admin</h1>
    <div className="grid gap-4 md:grid-cols-5">{stats.map(([k, v]) => <div key={k} className="rounded-2xl bg-mulberry p-5 text-plaster"><p className="text-sm">{k}</p><p className="font-display text-4xl">{Number(v).toLocaleString("en-IN")}</p></div>)}</div>
    <nav className="mt-8 flex flex-wrap gap-5 underline">{["orders", "bookings", "payments", "customers", "products", "packages", "gallery", "chat"].map(x => <Link key={x} href={`/admin/${x}`}>{x}</Link>)}</nav></main>);
}
