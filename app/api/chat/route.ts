import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const user = await sessionUser();
  if (!user) return NextResponse.json({ error: "Please sign in to use chat." }, { status: 401 });

  if (user.role === "ADMIN") {
    const conversationId = new URL(req.url).searchParams.get("conversationId");
    if (conversationId) {
      const conversation = await db.chatConversation.findUnique({
        where: { id: conversationId },
        include: { user: { select: { name: true, email: true } }, messages: { orderBy: { createdAt: "asc" }, take: 200 } },
      });
      if (!conversation) return NextResponse.json({ error: "Conversation not found." }, { status: 404 });
      return NextResponse.json({ conversation });
    }

    const conversations = await db.chatConversation.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        messages: { orderBy: { createdAt: "desc" }, take: 1 },
      },
    });
    return NextResponse.json({ conversations });
  }

  const conversation = await db.chatConversation.findUnique({
    where: { userId: user.id },
    include: { messages: { orderBy: { createdAt: "asc" }, take: 200 } },
  });
  return NextResponse.json({ conversation });
}

export async function POST(req: Request) {
  const user = await sessionUser();
  if (!user) return NextResponse.json({ error: "Please sign in to use chat." }, { status: 401 });

  let payload: { body?: unknown; conversationId?: unknown };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid message request." }, { status: 400 });
  }

  const body = typeof payload.body === "string" ? payload.body.trim() : "";
  if (!body || body.length > 2000) {
    return NextResponse.json({ error: "Messages must be between 1 and 2,000 characters." }, { status: 400 });
  }

  if (user.role === "ADMIN") {
    const conversationId = typeof payload.conversationId === "string" ? payload.conversationId : "";
    const conversation = await db.chatConversation.findUnique({ where: { id: conversationId }, select: { id: true } });
    if (!conversation) return NextResponse.json({ error: "Choose a valid customer conversation." }, { status: 404 });
    const message = await db.$transaction(async tx => {
      const created = await tx.chatMessage.create({ data: { conversationId, sender: "ADMIN", body } });
      await tx.chatConversation.update({ where: { id: conversationId }, data: { updatedAt: new Date() } });
      return created;
    });
    return NextResponse.json({ message }, { status: 201 });
  }

  const conversation = await db.chatConversation.upsert({
    where: { userId: user.id },
    create: { userId: user.id, messages: { create: { sender: "CUSTOMER", body } } },
    update: { updatedAt: new Date(), messages: { create: { sender: "CUSTOMER", body } } },
    select: { id: true },
  });
  return NextResponse.json({ conversationId: conversation.id }, { status: 201 });
}
