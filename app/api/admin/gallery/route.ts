import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { auth } from "@/auth";
import { db } from "@/lib/db";
const CATS = ["BABY", "COUPLES", "FAMILY", "PETS"] as const;
const isAdmin = async () => ((await auth())?.user as { role?: string } | undefined)?.role === "ADMIN";
export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const fd = await req.formData(), file = fd.get("file"), cat = String(fd.get("category"));
  if (!(file instanceof File) || !file.type.startsWith("image/") || file.size > 8_000_000) return NextResponse.json({ error: "Choose an image under 8 MB." }, { status: 400 });
  if (!CATS.includes(cat as (typeof CATS)[number])) return NextResponse.json({ error: "Choose a category." }, { status: 400 });
  const { CLOUDINARY_CLOUD_NAME: cloud, CLOUDINARY_API_KEY: key, CLOUDINARY_API_SECRET: secret } = process.env;
  if (!cloud || !key || !secret) return NextResponse.json({ error: "Cloudinary is not configured." }, { status: 503 });
  const ts = String(Math.floor(Date.now() / 1000)), folder = "ansh-ever";
  const body = new FormData();
  body.set("file", file); body.set("api_key", key); body.set("timestamp", ts); body.set("folder", folder);
  body.set("signature", createHash("sha1").update(`folder=${folder}&timestamp=${ts}${secret}`).digest("hex"));
  const r = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: "POST", body });
  if (!r.ok) return NextResponse.json({ error: "Upload failed." }, { status: 502 });
  const { secure_url } = await r.json();
  const item = await db.galleryItem.create({ data: { title: String(fd.get("title") || "Untitled").slice(0, 80), category: cat as (typeof CATS)[number], imageUrl: secure_url, story: String(fd.get("story") || "").slice(0, 600) || null, featured: fd.get("featured") === "on" } });
  return NextResponse.json(item);
}
export async function DELETE(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const id = new URL(req.url).searchParams.get("id"); if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await db.galleryItem.delete({ where: { id } }); return NextResponse.json({ ok: true });
}
