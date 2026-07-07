import type { Metadata } from "next";
import StrainBrowser from "./StrainBrowser";

export const metadata: Metadata = {
  title: "Strain Database — Effects, THC, Terpenes & Reviews",
  description:
    "Browse the WeedsFinder cannabis strain encyclopedia. Filter by genetics, effects, THC level, and flavor. Detailed terpene profiles and community ratings for every strain.",
};

export default function StrainsPage() {
  return <StrainBrowser />;
}
