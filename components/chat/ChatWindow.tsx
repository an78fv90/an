"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";

type ChatMessage = { id: string; sender: "CUSTOMER" | "ADMIN"; body: string; createdAt: string };
type Conversation = { id: string; messages: ChatMessage[] };

export default function ChatWindow({ admin, conversationId }: { admin: boolean; conversationId?: string }) {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const query = admin && conversationId ? `?conversationId=${encodeURIComponent(conversationId)}` : "";
    const response = await fetch(`/api/chat${query}`, { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not load messages.");
    if (admin) setConversation(data.conversation ?? null);
    else setConversation(data.conversation ?? null);
    setError("");
  }, [admin, conversationId]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        await refresh();
      } catch (e) {
        if (active) setError(e instanceof Error ? e.message : "Could not load messages.");
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    const timer = window.setInterval(() => { void load(); }, 3000);
    return () => { active = false; window.clearInterval(timer); };
  }, [refresh]);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = body.trim();
    if (!message || busy) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: message, ...(admin ? { conversationId } : {}) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Message could not be sent.");
      setBody("");
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Message could not be sent.");
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <p className="py-8" role="status">Loading conversation…</p>;
  return (<section className="flex min-h-[24rem] flex-col rounded-3xl border border-ink/15 bg-white/60 p-4 md:p-6">
    <div className="mb-4 flex-1 space-y-3 overflow-y-auto" aria-live="polite" aria-label="Chat messages">
      {conversation?.messages.map(message => <article key={message.id} className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.sender === (admin ? "ADMIN" : "CUSTOMER") ? "ml-auto bg-ink text-plaster" : "bg-mist"}`}>
        <p className="whitespace-pre-wrap break-words">{message.body}</p>
        <time className="mt-1 block text-right text-xs opacity-70" dateTime={message.createdAt}>{new Date(message.createdAt).toLocaleString()}</time>
      </article>)}
      {!conversation?.messages.length && <p className="py-8 text-center text-sm text-ink/60">{admin ? "No messages in this conversation yet." : "Send a message to start chatting with the studio."}</p>}
    </div>
    {error && <p role="alert" className="mb-3 text-sm text-red-700">{error}</p>}
    <form onSubmit={send} className="flex gap-2 border-t border-ink/10 pt-4">
      <label className="sr-only" htmlFor="chat-message">Message</label>
      <textarea id="chat-message" value={body} onChange={event => setBody(event.target.value)} maxLength={2000} rows={2} required placeholder="Write a message…" className="min-w-0 flex-1 resize-y rounded-xl border border-ink/20 p-3" />
      <button disabled={busy || !body.trim()} className="self-end rounded-full bg-ink px-5 py-3 text-plaster disabled:opacity-50">{busy ? "Sending…" : "Send"}</button>
    </form>
    <p className="mt-2 text-xs text-ink/50">Messages refresh automatically every few seconds.</p>
  </section>);
}
