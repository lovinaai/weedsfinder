import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "./registry";

export const metadata: Metadata = {
  title: "Free Cannabis Calculators — THC, CBD, Edibles & More",
  description:
    "Free browser-based tools: THC dose calculator, CBD oil calculator, homemade edible potency, tolerance break planner, strain side-by-side comparison, and terpene lookup.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <p className="eyebrow rise">Calculators</p>
      <h1 className="rise rise-1 mt-2 text-4xl font-semibold sm:text-5xl">Cannabis dosing tools</h1>
      <p className="mt-3 max-w-xl text-ink-dim">
        Figure out milligrams before you consume. Everything runs in your browser — we don&rsquo;t store your inputs.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.slug} href={`/tools/${t.slug}`} className="card p-6" title={t.blurb}>
            <div className="text-3xl">{t.icon}</div>
            <h2 className="mt-3 text-xl font-semibold">{t.name}</h2>
            <p className="mt-2 text-sm text-ink-dim">{t.blurb}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
