import { signIn } from "@/auth";
import Link from "next/link";
export const metadata = { title: "Owner sign in", robots: { index: false } };
export default function Owner() {
  return (<main className="mx-auto max-w-md px-6 pb-20 pt-40">
    <h1 className="font-display text-5xl">Studio admin</h1>
    <p className="mt-3 text-ink/70">Sign in with the owner Google account.</p>
    <form className="mt-8" action={async () => { "use server"; await signIn("google", { redirectTo: "/admin" }); }}>
      <button className="w-full rounded-full bg-ink py-3 text-plaster">Sign in with Google</button></form>
    <p className="mt-6 text-sm"><Link href="/login" className="underline">Back to customer sign in</Link></p>
  </main>);
}
