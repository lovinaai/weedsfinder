import type { Metadata } from "next";
import Link from "next/link";
import { countries, statusLabel, type LegalStatus } from "@/data/countries";

export const metadata: Metadata = {
  title: "Global Cannabis Map — Legality Worldwide",
  description:
    "Interactive world view of cannabis legality: fully legal, medical-only, decriminalized, and prohibited countries with links to detailed law guides and city information.",
};

const statusColor: Record<LegalStatus, string> = {
  legal: "border-emerald/40 bg-emerald/10",
  medical: "border-amber/40 bg-amber/10",
  decriminalized: "border-cyan-400/40 bg-cyan-400/10",
  illegal: "border-clay/40 bg-clay/10",
};
const dot: Record<LegalStatus, string> = {
  legal: "bg-emerald",
  medical: "bg-amber",
  decriminalized: "bg-cyan-400",
  illegal: "bg-clay",
};

const groups: LegalStatus[] = ["legal", "decriminalized", "medical", "illegal"];

export default function MapPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-4xl font-semibold sm:text-5xl">Global Cannabis Map</h1>
      <p className="mt-3 max-w-xl text-ink-dim">
        The world, sorted by cannabis legality. Tap any country for full rules, penalties, and city guides.
      </p>

      <div className="mt-6 flex flex-wrap gap-4 text-sm text-ink-dim">
        {groups.map((g) => (
          <span key={g} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${dot[g]}`} /> {statusLabel[g]}
          </span>
        ))}
      </div>

      <div className="mt-10 space-y-10">
        {groups.map((g) => {
          const list = countries.filter((c) => c.legalStatus === g);
          if (!list.length) return null;
          return (
            <section key={g}>
              <h2 className="text-2xl font-semibold capitalize">
                {statusLabel[g]} <span className="tabular text-base text-ink-dim">({list.length})</span>
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {list.map((c) => (
                  <Link
                    key={c.code}
                    href={`/laws/${c.slug}`}
                    className={`card border p-4 text-center ${statusColor[g]}`}
                  >
                    <div className="text-3xl">{c.flag}</div>
                    <div className="mt-1.5 font-medium">{c.name}</div>
                    {c.cities.length > 0 && (
                      <div className="mt-1 text-xs text-ink-dim">{c.cities.map((x) => x.name).join(" · ")}</div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      <p className="mt-12 text-xs text-ink-dim/70">
        Coverage expanding to all 195 countries in Phase 1. Interactive geographic map (MapLibre) lands with business listings.
      </p>
    </div>
  );
}
