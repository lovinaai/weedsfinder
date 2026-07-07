import { NextResponse } from "next/server";
import { strains } from "@/data/strains";
import { countries } from "@/data/countries";

export const runtime = "nodejs";

// Phase 0 assistant: keyword retrieval over the local corpus.
// Phase 2 upgrade path: embed corpus into pgvector (`embeddings` table),
// retrieve top-k chunks by cosine similarity, and synthesize with Claude
// (model: claude-fable-5 via ANTHROPIC_API_KEY). The request/response
// contract below stays identical, so clients won't change.

type Doc = { type: "strain" | "law"; title: string; url: string; text: string; snippet: string };

const corpus: Doc[] = [
  ...strains.map((s) => ({
    type: "strain" as const,
    title: s.name,
    url: `/strains/${s.slug}`,
    text: `${s.name} ${s.genetics} ${s.effects.join(" ")} ${s.taste.join(" ")} ${s.terpenes.join(" ")} ${s.medicalInfo} ${s.description} thc ${s.thc}`,
    snippet: `${s.name} is a ${s.genetics} (${s.thc}% THC) with ${s.effects.slice(0, 3).join(", ")} effects. ${s.description}`,
  })),
  ...countries.map((c) => ({
    type: "law" as const,
    title: `Cannabis laws in ${c.name}`,
    url: `/laws/${c.slug}`,
    text: `${c.name} ${c.legalStatus} ${c.rules} ${c.cities.map((x) => x.name + " " + x.guide).join(" ")}`,
    snippet: `${c.name} — status: ${c.legalStatus}. ${c.rules}`,
  })),
];

function retrieve(query: string, k = 3): Doc[] {
  const terms = query.toLowerCase().split(/\W+/).filter((t) => t.length > 2);
  return corpus
    .map((d) => ({
      d,
      score: terms.reduce((n, t) => n + (d.text.toLowerCase().includes(t) ? 1 : 0), 0),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((r) => r.d);
}

export async function POST(req: Request) {
  let question: unknown;
  try {
    ({ question } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (typeof question !== "string" || question.length < 3 || question.length > 500) {
    return NextResponse.json({ error: "question must be a 3–500 character string" }, { status: 400 });
  }

  const sources = retrieve(question);
  const answer =
    sources.length === 0
      ? "I couldn't find anything relevant in the WeedsFinder knowledge base yet. Try asking about a strain, an effect, or a country's cannabis laws."
      : sources[0].snippet +
        (sources.length > 1 ? ` Also relevant: ${sources.slice(1).map((s) => s.title).join(", ")}.` : "");

  return NextResponse.json({
    answer,
    sources: sources.map(({ type, title, url }) => ({ type, title, url })),
  });
}
