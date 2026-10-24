const months = ["May","Jun","Jul","Aug","Sep","Oct"], rev = [42, 55, 61, 58, 80, 92];
export default function P() { return <main className="mx-auto max-w-4xl px-6 pb-20 pt-36"><h1 className="mb-8 font-display text-5xl">Analytics</h1>
 <div className="flex h-48 items-end gap-4 rounded-2xl bg-white/60 p-5" role="img" aria-label="Revenue by month in thousands of rupees">{rev.map((h, i) => <div key={i} className="flex flex-1 flex-col items-center justify-end gap-1"><div className="w-full rounded-t bg-bronze" style={{ height: `${h}%` }} /><span className="text-xs">{months[i]}</span></div>)}</div>
 <p className="mt-6">Orders by category: Baby 38%, Couples 24%, Family 22%, Pets 16%. Sample data: connect to Prisma aggregates next.</p></main>; }
