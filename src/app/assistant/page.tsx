import type { Metadata } from "next";
import AssistantChat from "./AssistantChat";

export const metadata: Metadata = {
  title: "Cannabis Q&A — Ask About Strains, Terpenes & Laws",
  description:
    "Ask WeedsFinder about strain effects, terpene profiles, or whether cannabis is legal in a given country. Answers link back to the source pages.",
};

export default function AssistantPage() {
  return <AssistantChat />;
}
