// Production-safe seed: catalog data only. No demo users, orders or reviews.
import { PrismaClient, Category } from "@prisma/client";
import { catalog } from "../lib/catalog";
import { packages } from "../lib/packages";
const db = new PrismaClient();
const C: Record<string, Category> = { baby: "BABY", couples: "COUPLES", family: "FAMILY", pets: "PETS" };
async function main() {
  for (const p of catalog) await db.product.upsert({ where: { slug: p.slug }, update: {}, create: { ...p, category: C[p.category], imageUrl: "" } });
  if (!(await db.package.count())) await db.package.createMany({ data: packages });
  await db.coupon.createMany({ data: [{ code: "WELCOME10", percentOff: 10 }], skipDuplicates: true });
}
main().finally(() => db.$disconnect());
