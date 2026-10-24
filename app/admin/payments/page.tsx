import DataTable from "@/components/admin/DataTable";
import StatusSelect from "@/components/admin/StatusSelect";
import { db } from "@/lib/db";
import { PAY_STATUS } from "@/lib/status";
export const dynamic = "force-dynamic";
export default async function P() {
  const p = await db.payment.findMany({ orderBy: { createdAt: "desc" }, include: { order: true } });
  return <main className="mx-auto max-w-5xl px-6 pb-20 pt-36"><DataTable title="Payments" cols={["Order", "Provider", "Amount (₹)", "Status"]} rows={p.map(x => [x.order.number, x.provider, x.amount, <StatusSelect key={x.id} kind="payment" id={x.id} value={x.status} options={PAY_STATUS} />])} /></main>;
}
