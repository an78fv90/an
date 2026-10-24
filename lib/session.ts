import { auth } from "@/auth";
export async function sessionUser() {
  const u = (await auth())?.user as { id?: string; role?: string; name?: string | null } | undefined;
  return u?.id ? { id: u.id, role: u.role, name: u.name ?? "" } : null;
}
