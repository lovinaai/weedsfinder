export const tools = [
  { slug: "thc-calculator", name: "THC Calculator", icon: "🧪", blurb: "How many milligrams of THC are in your flower, joint, or vape session." },
  { slug: "cbd-calculator", name: "CBD Calculator", icon: "💧", blurb: "Convert CBD oil percentages and dropper volumes into precise milligram doses." },
  { slug: "edible-calculator", name: "Edible Calculator", icon: "🍪", blurb: "Per-serving THC dose for homemade edibles, with decarboxylation and infusion losses." },
  { slug: "tolerance-calculator", name: "Tolerance Planner", icon: "📉", blurb: "Estimate your tolerance level and how long a break needs to be to reset it." },
  { slug: "compare", name: "Strain Comparison", icon: "⚖️", blurb: "Two strains side by side: cannabinoids, terpenes, effects, and ratings." },
  { slug: "terpene-finder", name: "Terpene Finder", icon: "🍋", blurb: "Pick the aromas and effects you love, find the terpenes and strains that carry them." },
] as const;

export type ToolSlug = (typeof tools)[number]["slug"];
export const getTool = (slug: string) => tools.find((t) => t.slug === slug);
