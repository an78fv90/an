import OwnerInbox from "@/components/chat/OwnerInbox";

export const dynamic = "force-dynamic";
export const metadata = { title: "Customer chat" };

export default function AdminChatPage() {
  return (<main className="mx-auto max-w-6xl px-6 pb-20 pt-36">
    <h1 className="mb-2 font-display text-5xl">Customer chat</h1>
    <p className="mb-8 text-ink/70">Reply to customer messages. New messages appear automatically.</p>
    <OwnerInbox />
  </main>);
}
