import { redirect } from "next/navigation";
import ChatWindow from "@/components/chat/ChatWindow";
import { sessionUser } from "@/lib/session";

export const metadata = { title: "Chat with the studio" };
export default async function ChatPage() {
  const user = await sessionUser();
  if (!user) redirect("/login?next=%2Fchat");
  if (user.role === "ADMIN") redirect("/admin/chat");
  return (<main className="mx-auto max-w-3xl px-6 pb-20 pt-40">
    <h1 className="font-display text-5xl">Chat with the studio</h1>
    <p className="mb-6 mt-3 text-ink/70">Ask us about products, bookings, custom work, or your order.</p>
    <ChatWindow admin={false} />
  </main>);
}
