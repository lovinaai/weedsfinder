export type Terpene = {
  name: string;
  aroma: string;
  effects: string[];
  alsoFoundIn: string;
  color: string; // accent for TerpeneBar
};

export const terpenes: Terpene[] = [
  { name: "Myrcene", aroma: "Earthy, musky, cloves", effects: ["relaxing", "sedating"], alsoFoundIn: "Mango, hops, thyme", color: "#4ADE80" },
  { name: "Limonene", aroma: "Bright citrus", effects: ["uplifting", "stress relief"], alsoFoundIn: "Lemon rind, orange", color: "#F5C518" },
  { name: "Caryophyllene", aroma: "Pepper, spice, wood", effects: ["anti-inflammatory", "calming"], alsoFoundIn: "Black pepper, cinnamon", color: "#D97757" },
  { name: "Pinene", aroma: "Fresh pine", effects: ["alertness", "memory"], alsoFoundIn: "Pine needles, rosemary", color: "#34D399" },
  { name: "Terpinolene", aroma: "Floral, herbal, citrus", effects: ["uplifting", "energizing"], alsoFoundIn: "Nutmeg, tea tree, apples", color: "#A3E635" },
  { name: "Linalool", aroma: "Lavender, floral", effects: ["calming", "anti-anxiety"], alsoFoundIn: "Lavender, birch bark", color: "#C084FC" },
  { name: "Humulene", aroma: "Hoppy, woody, earthy", effects: ["appetite suppressant", "anti-inflammatory"], alsoFoundIn: "Hops, coriander", color: "#FB923C" },
  { name: "Ocimene", aroma: "Sweet, herbal, woody", effects: ["uplifting", "decongestant"], alsoFoundIn: "Mint, parsley, orchids", color: "#22D3EE" },
];

export const getTerpene = (name: string) => terpenes.find((t) => t.name === name);
