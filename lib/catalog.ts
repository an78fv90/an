export type Cat = "baby" | "couples";
export type CatalogItem = { slug: string; name: string; category: Cat; description: string; priceInr: number; size: string; productionDays: number; options: string[]; imageUrl: string };
const mk = (category: Cat, rows: [string, string, number, string, number][]): CatalogItem[] =>
  rows.map(([name, description, priceInr, size, productionDays]) => {
    const slug = name.toLowerCase().replace(/[^a-z]+/g, "-");
    return { slug, name, category, description, priceInr, size, productionDays, options: ["Engraving", "Frame", "Background", "LED lighting", "QR Memory Vault"], imageUrl: `/products/${slug}.jpg` };
  });
export const catalog: CatalogItem[] = [
  ...mk("baby", [["Little Beginning", "One tiny hand, cast the week it fits in yours.", 4200, "8×10 in", 14], ["Tiny Forever", "Both hands and feet in a single shadow box.", 6800, "12×16 in", 18], ["Growing Memories", "Three sessions across the first year, framed as a set.", 11500, "3 × 8×10 in", 40]]),
  ...mk("couples", [["Together", "Two clasped hands in matte bronze.", 5600, "10×12 in", 16], ["Forever Us", "Interlaced fingers with rings preserved.", 7400, "12×16 in", 18], ["Our Story", "Hands plus a dated timeline engraving.", 9200, "14×18 in", 21]]),
];
export const categories: { slug: string; label: string; blurb: string; imageUrl: string }[] = [
  { slug: "baby", label: "Baby Hand & Foot Casting", blurb: "The smallest details, held.", imageUrl: "/baby-hand-foot-casting.png" },
  { slug: "kids", label: "Kids Casting", blurb: "A little moment from every growing year.", imageUrl: "/collections/kids.png" },
  { slug: "couples", label: "Couple Hand Casting", blurb: "Two hands, one promise.", imageUrl: "/collections/couples.png" },
  { slug: "elderly", label: "Elderly Casting", blurb: "A lifetime of love, held in your hands.", imageUrl: "/collections/elderly.png" },
  { slug: "elderly-baby", label: "Elderly + Baby Casting", blurb: "Two generations, together in one keepsake.", imageUrl: "/collections/elderly-baby.png" },
];
export const coupons: Record<string, number> = { WELCOME10: 10, EVER15: 15 };
