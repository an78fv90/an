import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sessionUser } from "@/lib/session";

const TIMES = ["10:00", "12:00", "15:00", "17:00", "19:00"] as const;
const slotOf = (date: string, time: string) => new Date(`${date}T${time}:00+05:30`);
export async function GET(req: Request) {
  const date = new URL(req.url).searchParams.get("date") ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return NextResponse.json({ taken: [] });
  const rows = await db.booking.findMany({ where: { status: { not: "CANCELLED" }, slot: { gte: slotOf(date, "00:00"), lte: slotOf(date, "23:59") } } });
  return NextResponse.json({ taken: rows.map(r => new Date(r.slot.getTime() + 19_800_000).toISOString().slice(11, 16)) });
}
export async function POST(req: Request) {
  const u = await sessionUser(); if (!u) return NextResponse.json({ error: "Please sign in to book." }, { status: 401 });
  const b = await req.json(); const date = String(b.date), time = String(b.time), phone = String(b.phone ?? "").replace(/\s/g, "");
  const validTime = time as (typeof TIMES)[number];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !TIMES.includes(validTime)) return NextResponse.json({ error: "Choose a valid date and time." }, { status: 400 });
  if (!/^\+?\d{10,13}$/.test(phone)) return NextResponse.json({ error: "Enter a valid phone number." }, { status: 400 });
  const slot = slotOf(date, validTime); if (slot.getTime() < Date.now() + 3_600_000) return NextResponse.json({ error: "Please choose a future time." }, { status: 400 });
  const pkg = await db.package.findFirst({ where: { name: String(b.packageName) } }); if (!pkg) return NextResponse.json({ error: "Package not found." }, { status: 400 });
  if (await db.booking.count({ where: { slot, status: { not: "CANCELLED" } } })) return NextResponse.json({ error: "That time was just taken. Pick another." }, { status: 409 });
  const booking = await db.booking.create({ data: { userId: u.id, packageId: pkg.id, slot, homeVisit: b.homeVisit === true, notes: String(b.notes ?? "").slice(0, 500) || null, status: "PENDING" } });
  await db.user.update({ where: { id: u.id }, data: { phone } });
  return NextResponse.json({ id: booking.id });
}
