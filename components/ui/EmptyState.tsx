import Link from "next/link";
export default function EmptyState({ title, text, href, cta }: { title: string; text: string; href: string; cta: string }) {
  return <div className="rounded-3xl border border-dashed border-ink/25 p-12 text-center"><h2 className="font-display text-3xl">{title}</h2><p className="mt-2">{text}</p><Link href={href} className="mt-5 inline-block rounded-full bg-ink px-6 py-3 text-plaster">{cta}</Link></div>;
}
