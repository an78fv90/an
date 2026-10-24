import GalleryManager from "@/components/admin/GalleryManager";
import { db } from "@/lib/db";
export default async function P() {
  const items = await db.galleryItem.findMany({ orderBy: { id: "desc" } });
  return <main className="mx-auto max-w-5xl px-6 pb-20 pt-36"><h1 className="mb-6 font-display text-5xl">Gallery</h1><GalleryManager items={items} /></main>;
}
