import { strains, type Strain } from "@/data/strains";

export type FinderAnswers = {
  experience: "beginner" | "intermediate" | "expert";
  effects: string[]; // desired effects
  time: "morning" | "afternoon" | "evening" | "night";
  taste: string[]; // preferred taste families
  thc: "low" | "medium" | "high"; // THC preference
};

const levelRank = { beginner: 0, intermediate: 1, expert: 2 };

function thcFits(thc: number, pref: FinderAnswers["thc"]) {
  if (pref === "low") return thc <= 12;
  if (pref === "medium") return thc > 12 && thc <= 21;
  return thc > 21;
}

export function recommend(a: FinderAnswers, n = 5): { strain: Strain; score: number; reasons: string[] }[] {
  return strains
    .map((s) => {
      const reasons: string[] = [];
      let score = 0;

      const effectHits = s.effects.filter((e) => a.effects.includes(e));
      score += effectHits.length * 3;
      if (effectHits.length) reasons.push(`matches your desired effects: ${effectHits.join(", ")}`);

      if (s.bestTime === a.time) {
        score += 2;
        reasons.push(`ideal for ${a.time} use`);
      }

      const tasteHits = s.taste.filter((t) => a.taste.includes(t));
      score += tasteHits.length * 2;
      if (tasteHits.length) reasons.push(`tastes of ${tasteHits.join(" and ")}`);

      if (thcFits(s.thc, a.thc)) {
        score += 2;
        reasons.push(`${s.thc}% THC fits your ${a.thc}-potency preference`);
      }

      // never recommend above user's experience level; bonus for exact match
      if (levelRank[s.experienceLevel] > levelRank[a.experience]) score -= 100;
      else if (s.experienceLevel === a.experience) {
        score += 1;
        reasons.push(`rated for ${a.experience}s`);
      }

      score += s.rating / 10; // tiebreak on community rating
      return { strain: s, score, reasons };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}

export const allEffects = [...new Set(strains.flatMap((s) => s.effects))].sort();
export const allTastes = [...new Set(strains.flatMap((s) => s.taste))].sort();
