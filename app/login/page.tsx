import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
export const metadata = { title: "Sign in" };
export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string; next?: string }> }) {
  const { error, next } = await searchParams;
  const redirectTo = next?.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
  return (<main className="mx-auto max-w-md px-6 pb-20 pt-40">
    <h1 className="font-display text-5xl">Welcome back</h1>
    <p className="mt-3 text-sm text-ink/70">Sign in to see your bookings and orders.</p>
    {error && <p role="alert" className="mt-4 text-red-700">We couldn’t sign you in. Check your email and password, then try again.</p>}
    <form className="mt-8" action={async () => { "use server"; await signIn("google", { redirectTo }); }}>
      <button className="w-full rounded-full border border-ink py-3">Continue with Google</button></form>
    <p className="my-5 text-center text-sm text-ink/50">or use your email</p>
    <form className="space-y-4" action={async (fd: FormData) => { "use server";
      try { await signIn("credentials", { email: fd.get("email"), password: fd.get("password"), redirectTo }); }
      catch (e) { if (e instanceof AuthError) redirect(`/login?error=1&next=${encodeURIComponent(redirectTo)}`); throw e; } }}>
      <label className="block">Email<input name="email" type="email" required autoComplete="email" className="mt-1 w-full rounded-xl border border-ink/20 p-3" /></label>
      <label className="block">Password<input name="password" type="password" required autoComplete="current-password" className="mt-1 w-full rounded-xl border border-ink/20 p-3" /></label>
      <button className="w-full rounded-full bg-ink py-3 text-plaster">Sign in</button></form>
    <p className="mt-5 text-sm">New here? <Link href="/register" className="underline">Create an account</Link></p>
  </main>);
}
