import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "./registry";

export const metadata: Metadata = {
  title: "Cannabis Tools — Dosing Calculators & Strain Comparison",
  description:
    "Free cannabis tools: THC calculator, CBD dosage calculator, edible dose calculator, tolerance break planner, strain comparison, and terpene finder.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-4xl font-semibold sm:text-5xl">Tools</h1>
      <p className="mt-3 max-w-xl text-ink-dim">
        Precision instruments for informed consumption. All calculations run in your browser — nothing is tracked.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.slug} href={`/tools/${t.slug}`} className="card p-6">
            <div className="text-3xl">{t.icon}</div>
            <h2 className="mt-3 text-xl font-semibold">{t.name}</h2>
            <p className="mt-2 text-sm text-ink-dim">{t.blurb}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
