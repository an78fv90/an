import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { isOwnerEmail } from "@/lib/owners";
export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" }, pages: { signIn: "/login" },
  providers: [Google, Credentials({ async authorize(c) {
    const u = await db.user.findUnique({ where: { email: String(c?.email ?? "").toLowerCase() } });
    if (!u?.passwordHash || !(await bcrypt.compare(String(c?.password ?? ""), u.passwordHash))) return null;
    return { id: u.id, name: u.name, email: u.email } as never;
  } })],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== "google") return true;
      const email = profile?.email?.toLowerCase();
      if (!email || !profile?.email_verified) return false;
      const owner = isOwnerEmail(email); // owner role is set only via a verified Google login
      await db.user.upsert({ where: { email }, update: owner ? { role: "ADMIN", passwordHash: null } : {},
        create: { email, name: profile.name ?? email, image: (profile.picture as string | undefined) ?? null, role: owner ? "ADMIN" : "CUSTOMER" } });
      return true;
    },
    async jwt({ token, user }) {
      if (user) { const u = await db.user.findUnique({ where: { email: (token.email ?? "").toLowerCase() } }); if (u) { token.sub = u.id; token.role = u.role; } }
      return token;
    },
    session({ session, token }) { Object.assign(session.user, { id: token.sub, role: token.role }); return session; },
  },
});
