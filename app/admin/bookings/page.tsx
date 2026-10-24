import DataTable from "@/components/admin/DataTable";
import StatusSelect from "@/components/admin/StatusSelect";
import { db } from "@/lib/db";
import { BOOKING_STATUS, fmt } from "@/lib/status";
export const dynamic = "force-dynamic";
export default async function P() {
  const b = await db.booking.findMany({ orderBy: { slot: "desc" }, include: { user: true, package: true } });
  return <main className="mx-auto max-w-5xl px-6 pb-20 pt-36"><DataTable title="Bookings" cols={["Customer", "Phone", "Package", "When", "Where", "Status"]} rows={b.map(x => [x.user.name, x.user.phone ?? "", x.package.name, fmt(x.slot), x.homeVisit ? "Home" : "Studio", <StatusSelect key={x.id} kind="booking" id={x.id} value={x.status} options={BOOKING_STATUS} />])} /></main>;
}
