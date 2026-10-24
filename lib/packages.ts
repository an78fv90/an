// Starting prices are placeholders: edit them here (or in the database) before launch.
export type Pkg = { name: string; category: "BABY" | "COUPLES"; priceInr: number; features: string[]; durationMin: number; popular?: boolean };
export const packages: Pkg[] = [
  { name: "First Touch", category: "BABY", priceInr: 4500, durationMin: 30, features: ["One hand or one foot", "Framed with a photo, name and date"] },
  { name: "Tiny Pair", category: "BABY", priceInr: 5900, durationMin: 40, popular: true, features: ["Both hands or both feet", "Larger frame, photo, name and date"] },
  { name: "Little Steps", category: "BABY", priceInr: 7200, durationMin: 50, features: ["Both hands and both feet", "Shadow-box frame"] },
  { name: "Whole Baby", category: "BABY", priceInr: 9500, durationMin: 60, features: ["All four limbs plus a parent's hand", "Statement frame with name plate"] },
  { name: "Held Hands", category: "COUPLES", priceInr: 6400, durationMin: 45, popular: true, features: ["One hand each, clasped", "Framed with a photo and names"] },
  { name: "Hands of Blessing", category: "COUPLES", priceInr: 6200, durationMin: 40, features: ["A parent's two hands", "Framed with a photo and name"] },
  { name: "Together Always", category: "COUPLES", priceInr: 8900, durationMin: 60, features: ["Hands and feet for two", "Foldable box frame"] },
];
