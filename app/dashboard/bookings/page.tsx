import EmptyState from "@/components/ui/EmptyState";
import { db } from "@/lib/db";
import { sessionUser } from "@/lib/session";
import { fmt } from "@/lib/status";
export default async function P() {
  const u = (await sessionUser())!; const rows = await db.booking.findMany({ where: { userId: u.id }, include: { package: true }, orderBy: { slot: "desc" } });
  return (<main className="mx-auto max-w-3xl px-6 pb-20 pt-36"><h1 className="mb-6 font-display text-5xl">Bookings</h1>
    {rows.length ? rows.map(b => <div key={b.id} className="mb-3 rounded-2xl bg-white/60 p-5">{b.package.name} · {fmt(b.slot)} · {b.homeVisit ? "Home visit" : "Studio"} · <strong>{b.status.toLowerCase()}</strong></div>)
      : <EmptyState title="No upcoming bookings" text="Send a request to arrange your casting." href="/booking" cta="Book now" />}</main>);
}
