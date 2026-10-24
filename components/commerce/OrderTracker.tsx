"use client";
import { motion } from "framer-motion";
import { stages } from "@/lib/data";
export default function OrderTracker({ current }: { current: number }) {
  return <ol className="space-y-3">{stages.map((s, i) => <li key={s} className="flex items-center gap-3">
    <motion.span initial={{ scale: 0.6 }} animate={{ scale: i === current ? [1, 1.25, 1] : 1 }} transition={{ repeat: i === current ? Infinity : 0, duration: 1.8 }} className={`h-3 w-3 rounded-full ${i <= current ? "bg-bronze" : "bg-ink/20"}`} />
    <span className={i === current ? "font-medium" : i < current ? "" : "opacity-50"}>{s}</span></li>)}</ol>;
}
