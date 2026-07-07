export const tools = [
  { slug: "thc-calculator", name: "THC Calculator", icon: "🧪", blurb: "Estimate how many milligrams of THC you get from flower, a joint, or a vape session." },
  { slug: "cbd-calculator", name: "CBD Calculator", icon: "💧", blurb: "Turn CBD oil strength and dropper size into an exact milligram dose per serving." },
  { slug: "edible-calculator", name: "Edible Calculator", icon: "🍪", blurb: "Calculate THC per brownie or gummy, accounting for decarboxylation and butter extraction loss." },
  { slug: "tolerance-calculator", name: "Tolerance Planner", icon: "📉", blurb: "Rough guide to how built-up your tolerance might be and how long a break could take to reset it." },
  { slug: "compare", name: "Strain Comparison", icon: "⚖️", blurb: "Put two strains side by side — THC, CBD, terpenes, effects, and reader ratings." },
  { slug: "terpene-finder", name: "Terpene Finder", icon: "🍋", blurb: "Pick a terpene to see what it smells like, how it tends to feel, and which strains carry it." },
] as const;

export type ToolSlug = (typeof tools)[number]["slug"];
export const getTool = (slug: string) => tools.find((t) => t.slug === slug);
