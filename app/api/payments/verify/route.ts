import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { db } from "@/lib/db";
import { sessionUser } from "@/lib/session";
export async function POST(req: Request) {
  const u = await sessionUser(); const secret = process.env.RAZORPAY_KEY_SECRET; if (!u || !secret) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { orderId, paymentId, signature } = await req.json();
  const expected = createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  const a = Buffer.from(expected), b = Buffer.from(String(signature));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  const pay = await db.payment.findFirst({ where: { providerOrderId: orderId, order: { userId: u.id } } }); if (!pay) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await db.payment.update({ where: { id: pay.id }, data: { status: "PAID", providerPaymentId: paymentId } }); return NextResponse.json({ ok: true });
}
