import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "WeedsFinder — Cannabis Strains, Laws & Dosing Tools",
  description:
    "Compare cannabis strains by effects and THC, read up-to-date law guides for dozens of countries, and use free calculators for flower, edibles, and CBD oil.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "WeedsFinder — Cannabis Strains, Laws & Tools",
    description:
      "Strain profiles, legal status by country, and dosing calculators — one place to research before you buy or travel.",
  },
};

export default function Home() {
  return <HomeClient />;
}
