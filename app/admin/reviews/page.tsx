import DataTable from "@/components/admin/DataTable";
export const metadata = { title: "Admin · Reviews" };
export default function P() { return <main className="mx-auto max-w-5xl px-6 pb-20 pt-36"><DataTable title="Reviews" cols={["Name", "Category", "Rating", "Published"]} rows={[["Aanya S.", "Baby", 5, "Yes"], ["Rohan S.", "Couples", 4, "Yes"], ["Simran S.", "Family", 5, "Yes"], ["Kabir S.", "Pets", 4, "No"]]} /></main>; }
