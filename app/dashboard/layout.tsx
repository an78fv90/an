import { redirect } from "next/navigation";
import { auth } from "@/auth";
export default async function L({ children }: { children: React.ReactNode }) { if (!(await auth())) redirect("/login"); return children; }
