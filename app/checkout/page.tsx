"use client";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/commerce/CartProvider";
declare global { interface Window { Razorpay?: new (o: unknown) => { open: () => void } } }
export default function Checkout() {
  const { lines, clear } = useCart(), router = useRouter(), [coupon, setCoupon] = useState(""), [err, setErr] = useState(""), [busy, setBusy] = useState(false);
  async function pay() {
    setBusy(true); setErr("");
    const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lines, coupon }) }); const d = await r.json(); setBusy(false);
    if (r.status === 401) return router.push("/login"); if (!r.ok) return setErr(d.error);
    const done = () => { clear(); router.push(`/order-confirmation?id=${d.number}`); };
    if (d.mode === "manual" || !window.Razorpay) return done();
    new window.Razorpay({ key: d.keyId, amount: d.total * 100, currency: "INR", name: "ANSH EVER", order_id: d.razorpayOrderId,
      handler: async (x: { razorpay_payment_id: string; razorpay_signature: string }) => { await fetch("/api/payments/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId: d.razorpayOrderId, paymentId: x.razorpay_payment_id, signature: x.razorpay_signature }) }); done(); } }).open();
  }
  return (<main className="mx-auto max-w-xl px-6 pb-20 pt-40"><Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" /><h1 className="font-display text-5xl">Checkout</h1>
    <p className="mt-4">Discounts, taxes, and delivery are added at payment.</p>
    <label className="mt-6 block">Coupon<input value={coupon} onChange={e => setCoupon(e.target.value)} className="mt-1 w-full rounded-xl border border-ink/20 p-3" /></label>
    {err && <p role="alert" className="mt-4 text-red-700">{err}</p>}
    <button disabled={busy || !lines.length} onClick={pay} className="mt-6 w-full rounded-full bg-ink py-3 text-plaster disabled:opacity-40">{busy ? "Processing…" : "Place order"}</button></main>);
}
