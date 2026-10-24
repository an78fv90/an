import { categories } from "@/lib/catalog";
export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return ["", "/collections", "/gallery", "/about", "/contact", ...categories.map(c => `/collections/${c.slug}`)].map(p => ({ url: base + p }));
}
