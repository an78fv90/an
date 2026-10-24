"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";

const nav = [["Collections", "/collections"], ["Gallery", "/gallery"]];

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  return (<header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 text-plaster">
    <Link href="/" className="font-display text-2xl tracking-[0.2em] text-bronze">ANSH EVER</Link>
    <nav aria-label="Main" className="hidden items-center gap-6 text-sm lg:flex">
      {nav.map(([label, href]) => <Link key={href} href={href} className="hover:text-bronze">{label}</Link>)}
      <a href={site.bookingFormUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-bronze px-5 py-2 font-medium text-ink hover:bg-plaster">Book now</a>
      <Link href="/chat" className="hover:text-bronze">Chat with studio</Link>
    </nav>
    <button className="lg:hidden" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
    <AnimatePresence>{open && <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-label="Mobile" className="fixed inset-0 -z-10 flex flex-col justify-center gap-5 overflow-y-auto bg-mulberry px-8 py-24 font-display text-4xl">
      {nav.map(([label, href]) => <Link key={href} href={href} onClick={closeMenu}>{label}</Link>)}
      <a href={site.bookingFormUrl} target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="w-fit rounded-full bg-bronze px-6 py-3 text-2xl text-ink">Book now</a>
      <Link href="/chat" onClick={closeMenu}>Chat with studio</Link>
    </motion.nav>}</AnimatePresence>
  </header>);
}
