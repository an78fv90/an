import DataTable from "@/components/admin/DataTable";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
export default async function P() {
  const p = await db.package.findMany({ orderBy: { priceInr: "asc" } });
  return <main className="mx-auto max-w-5xl px-6 pb-20 pt-36"><DataTable title="Packages" cols={["Name", "Category", "Price (₹)", "Minutes", "Popular"]} rows={p.map(x => [x.name, x.category, x.priceInr, x.durationMin, x.popular ? "Yes" : "No"])} /></main>;
}
