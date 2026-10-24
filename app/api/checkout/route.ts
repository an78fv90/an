import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sessionUser } from "@/lib/session";
export async function POST(req: Request) {
  const u = await sessionUser(); if (!u) return NextResponse.json({ error: "Please sign in to check out." }, { status: 401 });
  const { lines, coupon } = (await req.json()) as { lines: { slug: string; qty: number }[]; coupon?: string };
  if (!Array.isArray(lines) || !lines.length || lines.some(l => !Number.isInteger(l.qty) || l.qty < 1 || l.qty > 10)) return NextResponse.json({ error: "Your cart is empty or invalid." }, { status: 400 });
  const prods = await db.product.findMany({ where: { slug: { in: lines.map(l => l.slug) }, active: true } });
  if (prods.length !== new Set(lines.map(l => l.slug)).size) return NextResponse.json({ error: "An item is no longer available." }, { status: 400 });
  const subtotal = lines.reduce((s, l) => s + prods.find(p => p.slug === l.slug)!.priceInr * l.qty, 0);
  const cp = coupon ? await db.coupon.findFirst({ where: { code: coupon.toUpperCase(), active: true } }) : null;
  const discount = cp ? Math.round((subtotal * cp.percentOff) / 100) : 0, tax = Math.round((subtotal - discount) * 0.18), delivery = subtotal > 5000 ? 0 : 199, total = subtotal - discount + tax + delivery;
  const number = `AE-${Date.now().toString().slice(-7)}`; const { RAZORPAY_KEY_ID: id, RAZORPAY_KEY_SECRET: secret } = process.env;
  let rzpId: string | undefined;
  if (id && secret) {
    const r = await fetch("https://api.razorpay.com/v1/orders", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64") }, body: JSON.stringify({ amount: total * 100, currency: "INR", receipt: number }) });
    if (!r.ok) return NextResponse.json({ error: "Payment provider unavailable." }, { status: 502 }); rzpId = (await r.json()).id;
  }
  await db.order.create({ data: { number, userId: u.id, subtotal, discount, tax, delivery, total, couponId: cp?.id, items: { create: lines.map(l => ({ productId: prods.find(p => p.slug === l.slug)!.id, qty: l.qty, unitPrice: prods.find(p => p.slug === l.slug)!.priceInr })) }, payment: { create: { provider: rzpId ? "razorpay" : "manual", providerOrderId: rzpId, amount: total } } } });
  return NextResponse.json({ mode: rzpId ? "razorpay" : "manual", number, total, keyId: id, razorpayOrderId: rzpId });
}
