"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
export type Line = { slug: string; name: string; priceInr: number; qty: number };
const Ctx = createContext<{ lines: Line[]; add: (l: Omit<Line, "qty">) => void; remove: (s: string) => void; clear: () => void }>(null as never);
export const useCart = () => useContext(Ctx);
export default function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  useEffect(() => { try { setLines(JSON.parse(localStorage.getItem("ae-cart") || "[]")); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem("ae-cart", JSON.stringify(lines)); } catch {} }, [lines]);
  const add = (l: Omit<Line, "qty">) => setLines(p => p.some(x => x.slug === l.slug) ? p.map(x => x.slug === l.slug ? { ...x, qty: x.qty + 1 } : x) : [...p, { ...l, qty: 1 }]);
  return <Ctx.Provider value={{ lines, add, remove: s => setLines(p => p.filter(x => x.slug !== s)), clear: () => setLines([]) }}>{children}</Ctx.Provider>;
}
