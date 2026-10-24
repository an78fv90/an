import Link from "next/link";
import { site, studioChatHref } from "@/lib/site";
import BookNowLink from "@/components/BookNowLink";
const chatConfigured = studioChatHref.startsWith("https://");
export default function Footer() {
  return (<>
    <footer className="mt-24 border-t border-bronze/30 px-6 pb-28 pt-14 md:pb-14"><div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
      <div><p className="gold-text font-display text-3xl tracking-[0.2em]">{site.name}</p><p className="mt-2 font-display italic text-bronze">{site.tagline}</p></div>
      <div><h2 className="font-display text-xl text-bronze">{site.studio}</h2><p className="mt-2 text-sm">100% safe &amp; skin-friendly casting.<br />Free home visit: {site.areas.join(" · ")}</p>
        {site.phone && <p className="mt-2 text-sm">Call: <a href={`tel:${site.tel}`} className="underline">{site.phone}</a></p>}
        <a href={studioChatHref} {...(chatConfigured ? { target: "_blank", rel: "noreferrer" } : {})} className="mt-3 inline-block rounded-full border border-bronze px-5 py-2 text-sm">{chatConfigured ? "Chat with studio on WhatsApp" : "Contact the studio"}</a></div>
      <nav aria-label="Footer" className="grid grid-cols-2 gap-2 text-sm">{[["Collections", "/collections"], ["3D casting", "/3d-casting"], ["Gallery", "/gallery"], ["Chat with studio", "/chat"], ["FAQ", "/faq"], ["Contact", "/contact"]].map(([l, h]) => <Link key={h} href={h} className="hover:text-bronze">{l}</Link>)}<BookNowLink className="hover:text-bronze" /></nav></div></footer>
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-bronze/30 bg-ink/95 p-3 backdrop-blur md:hidden">
      {site.tel && <a href={`tel:${site.tel}`} className="flex-1 rounded-full border border-bronze py-3 text-center text-sm">Call</a>}
      <a href={studioChatHref} {...(chatConfigured ? { target: "_blank", rel: "noreferrer" } : {})} className="flex-1 rounded-full border border-bronze py-3 text-center text-sm">{chatConfigured ? "Chat" : "Contact"}</a>
      <BookNowLink className="flex-1 rounded-full bg-bronze py-3 text-center text-sm font-medium text-ink" /></div></>);
}
