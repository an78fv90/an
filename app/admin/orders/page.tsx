import DataTable from "@/components/admin/DataTable";
import StatusSelect from "@/components/admin/StatusSelect";
import { db } from "@/lib/db";
import { ORDER_FLOW } from "@/lib/status";
export const dynamic = "force-dynamic";
export default async function P() {
  const o = await db.order.findMany({ orderBy: { createdAt: "desc" }, include: { user: true, items: { include: { product: true } } } });
  return <main className="mx-auto max-w-5xl px-6 pb-20 pt-36"><DataTable title="Orders" cols={["Order", "Customer", "Items", "Total (₹)", "Status"]} rows={o.map(x => [x.number, x.user.name, x.items.map(i => i.product.name).join(", "), x.total, <StatusSelect key={x.id} kind="order" id={x.id} value={x.status} options={[...ORDER_FLOW, "CANCELLED"]} />])} /></main>;
}
