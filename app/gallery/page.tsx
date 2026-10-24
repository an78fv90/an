import Image from "next/image";
export const metadata = { title: "Gallery" };
const images = [
  "/gallery/gallery-5.png",
  "/gallery/gallery-7.png",
  "/gallery/gallery-1.png",
  "/gallery/gallery-2.png",
  "/gallery/gallery-3.png",
  "/gallery/gallery-4.png",
  "/gallery/gallery-6.png",
];
export default function Gallery() {
  return (<main className="mx-auto max-w-6xl px-6 pb-20 pt-40"><h1 className="font-display text-6xl">Gallery</h1>
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{images.map((src, index) =>
      <figure key={src} className="group overflow-hidden rounded-3xl bg-ink/5 shadow-lg ring-1 ring-ink/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src={src} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain transition duration-500 group-hover:scale-[1.03]" priority={index < 3} />
        </div>
      </figure>)}</div></main>);
}
