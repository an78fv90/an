import { redirect } from "next/navigation";
import { auth } from "@/auth";
export default async function L({ children }: { children: React.ReactNode }) {
  const s = await auth(); if (!s) redirect("/owner-login");
  if ((s.user as { role?: string }).role !== "ADMIN") redirect("/dashboard"); return children;
}
