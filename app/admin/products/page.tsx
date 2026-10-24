import DataTable from "@/components/admin/DataTable";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
export default async function P() {
  const p = await db.product.findMany({ orderBy: { name: "asc" } });
  return <main className="mx-auto max-w-5xl px-6 pb-20 pt-36"><DataTable title="Products" cols={["Name", "Category", "Price (₹)", "Days", "Active"]} rows={p.map(x => [x.name, x.category, x.priceInr, x.productionDays, x.active ? "Yes" : "No"])} /></main>;
}
