import DataTable from "@/components/admin/DataTable";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
export default async function P() {
  const u = await db.user.findMany({ orderBy: { createdAt: "desc" }, include: { _count: { select: { orders: true } } } });
  return <main className="mx-auto max-w-5xl px-6 pb-20 pt-36"><DataTable title="Customers" cols={["Name", "Email", "Role", "Orders", "Joined"]} rows={u.map(x => [x.name, x.email, x.role, x._count.orders, x.createdAt.toISOString().slice(0, 10)])} /></main>;
}
