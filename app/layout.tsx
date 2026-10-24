import "./globals.css";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CartProvider from "@/components/commerce/CartProvider";
const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-display" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body" });
export const metadata = { title: { default: "ANSH MEMORIES FOREVER — Memories, Made Tangible.", template: "%s | ANSH MEMORIES FOREVER" }, description: "A 3D memory and keepsake studio.", openGraph: { title: "ANSH MEMORIES FOREVER — Memories, Made Tangible.", type: "website" }, twitter: { card: "summary_large_image" } };
export default function Root({ children }: { children: React.ReactNode }) {
  return (<html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable}`}><body>
    <CartProvider><Nav />{children}<Footer /></CartProvider></body></html>);
}
