"use client";

import { useCallback, useEffect, useState } from "react";
import ChatWindow from "@/components/chat/ChatWindow";

type InboxConversation = {
  id: string;
  updatedAt: string;
  user: { name: string; email: string };
  messages: { body: string; sender: "CUSTOMER" | "ADMIN"; createdAt: string }[];
};

export default function OwnerInbox() {
  const [conversations, setConversations] = useState<InboxConversation[]>([]);
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    const response = await fetch("/api/chat", { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not load conversations.");
    setConversations(data.conversations);
    setError("");
  }, []);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        await refresh();
      } catch (e) {
        if (active) setError(e instanceof Error ? e.message : "Could not load conversations.");
      }
    };
    void load();
    const timer = window.setInterval(() => { void load(); }, 3000);
    return () => { active = false; window.clearInterval(timer); };
  }, [refresh]);

  return (<div className="grid gap-6 lg:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.5fr)]">
    <section>
      <h2 className="mb-3 font-display text-2xl">Customer conversations</h2>
      {error && <p role="alert" className="mb-3 text-sm text-red-700">{error}</p>}
      {!conversations.length && <p className="rounded-2xl border border-dashed border-ink/20 p-5 text-sm">No messages yet. Customer conversations will appear here.</p>}
      <ul className="space-y-2">
        {conversations.map(item => <li key={item.id}>
          <button onClick={() => setSelected(item.id)} aria-pressed={selected === item.id} className={`w-full rounded-2xl border p-4 text-left ${selected === item.id ? "border-ink bg-white" : "border-ink/10 bg-white/50"}`}>
            <span className="block font-medium">{item.user.name || item.user.email}</span>
            <span className="block text-xs text-ink/60">{item.user.email}</span>
            <span className="mt-2 block truncate text-sm text-ink/70">{item.messages[0]?.body ?? "No messages"}</span>
            <time className="mt-1 block text-xs text-ink/50" dateTime={item.updatedAt}>{new Date(item.updatedAt).toLocaleString()}</time>
          </button>
        </li>)}
      </ul>
    </section>
    <section>
      <h2 className="mb-3 font-display text-2xl">Chat</h2>
      {selected ? <ChatWindow key={selected} admin conversationId={selected} /> : <p className="rounded-2xl border border-dashed border-ink/20 p-8 text-center text-sm">Select a customer conversation to reply.</p>}
    </section>
  </div>);
}
