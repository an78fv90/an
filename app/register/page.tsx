import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { isOwnerEmail } from "@/lib/owners";
export default function Register() {
  return (<main className="mx-auto max-w-md px-6 pb-20 pt-40"><h1 className="font-display text-5xl">Create your account</h1>
    <form className="mt-8 space-y-4" action={async (fd: FormData) => { "use server";
      const email = String(fd.get("email")).toLowerCase(), password = String(fd.get("password"));
      if (isOwnerEmail(email)) throw new Error("This email must sign in with Google.");
      if (password.length < 8) throw new Error("Password must be at least 8 characters.");
      await db.user.create({ data: { name: String(fd.get("name")), email, passwordHash: await bcrypt.hash(password, 10) } });
      await signIn("credentials", { email, password, redirectTo: "/dashboard" }); }}>
      {[["name", "Full name", "text"], ["email", "Email", "email"], ["password", "Password (8+ characters)", "password"]].map(([n, l, t]) =>
        <label key={n} className="block">{l}<input name={n} type={t} required minLength={t === "password" ? 8 : undefined} className="mt-1 w-full rounded-xl border border-ink/20 p-3" /></label>)}
      <button className="w-full rounded-full bg-ink py-3 text-plaster">Create account</button></form></main>);
}
