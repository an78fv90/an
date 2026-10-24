import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sessionUser } from "@/lib/session";
import { BOOKING_STATUS, ORDER_FLOW, PAY_STATUS } from "@/lib/status";
export async function PATCH(req: Request) {
  if ((await sessionUser())?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { kind, id, status } = await req.json();
  if (kind === "order" && [...ORDER_FLOW, "CANCELLED"].includes(status)) await db.order.update({ where: { id }, data: { status } });
  else if (kind === "booking" && (BOOKING_STATUS as readonly string[]).includes(status)) await db.booking.update({ where: { id }, data: { status } });
  else if (kind === "payment" && (PAY_STATUS as readonly string[]).includes(status)) await db.payment.update({ where: { id }, data: { status } });
  else return NextResponse.json({ error: "Invalid" }, { status: 400 });
  return NextResponse.json({ ok: true });
}
