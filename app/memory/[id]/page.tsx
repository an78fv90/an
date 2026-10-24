import QRCode from "qrcode";
export const metadata = { title: "A memory, kept", robots: { index: false } };
export default async function Memory({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id, qr = await QRCode.toDataURL(`${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/memory/${id}`, { width: 200, margin: 1 });
  return (<main className="min-h-screen bg-mulberry px-6 pb-20 pt-32 text-plaster"><div className="mx-auto max-w-3xl">
    <p className="font-display text-xl">ANSH MEMORIES FOREVER</p><h1 className="mt-4 font-display text-6xl">Aarav's First Year</h1><p className="mt-2">Born 12 June 2026</p>
    <p className="mt-8 max-w-xl text-lg">Hands no bigger than a walnut. Cast on a quiet Sunday while his grandmother hummed in the next room.</p>
    <div className="mt-8 grid grid-cols-3 gap-3">{["Photo", "Video", "Letter"].map(m => <div key={m} className="grid aspect-square place-items-center rounded-2xl glass">{m}</div>)}</div>
    {/* eslint-disable-next-line @next/next/no-img-element */}<img src={qr} alt="QR code for this memory" width={200} height={200} className="mt-10 rounded-xl" />
    <p className="mt-2 text-sm">Visibility: Anyone with the link. The owner can switch to Private or QR-only in the dashboard.</p></div></main>);
}
