import type { Metadata } from "next";
import FinderQuiz from "./FinderQuiz";

export const metadata: Metadata = {
  title: "Strain Finder — Get a Cannabis Recommendation in 5 Questions",
  description:
    "Tell us your experience, preferred effects, time of day, flavors, and THC tolerance. WeedsFinder returns matching strains and explains why each one fits.",
};

export default function FinderPage() {
  return <FinderQuiz />;
}
