import type { Metadata } from "next";
import AssistantChat from "./AssistantChat";

export const metadata: Metadata = {
  title: "AI Cannabis Assistant — Ask Anything",
  description:
    "Ask the WeedsFinder assistant about strains, effects, terpenes, and cannabis laws worldwide. Answers grounded in the WeedsFinder knowledge base with linked sources.",
};

export default function AssistantPage() {
  return <AssistantChat />;
}
