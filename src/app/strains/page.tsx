import type { Metadata } from "next";
import StrainBrowser from "./StrainBrowser";
import { strains } from "@/data/strains";

export const metadata: Metadata = {
  title: "Cannabis Strain Database — Effects, THC & Terpenes",
  description:
    `Browse ${strains.length} cannabis strains with THC and CBD levels, dominant terpenes, reported effects, and reader ratings. Filter by indica, sativa, hybrid, or effect.`,
};

export default function StrainsPage() {
  return <StrainBrowser />;
}
