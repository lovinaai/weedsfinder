import type { Metadata } from "next";
import FinderQuiz from "./FinderQuiz";

export const metadata: Metadata = {
  title: "AI Strain Finder — Personalized Cannabis Recommendations",
  description:
    "Answer five questions about experience, desired effects, time of day, taste, and potency. The WeedsFinder engine returns personalized strain matches with reasoning.",
};

export default function FinderPage() {
  return <FinderQuiz />;
}
