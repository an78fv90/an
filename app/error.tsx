"use client";
export default function E({ reset }: { error: Error; reset: () => void }) {
  return <main className="px-6 pt-40 text-center"><h1 className="font-display text-4xl">This page didn't load</h1><button onClick={reset} className="mt-6 rounded-full bg-ink px-6 py-3 text-plaster">Try again</button></main>;
}
