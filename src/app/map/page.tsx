import type { Metadata } from "next";
import Link from "next/link";
import { countries, statusLabel, type LegalStatus } from "@/data/countries";

export const metadata: Metadata = {
  title: "Cannabis Legal Map — Where Weed Is Legal Worldwide",
  description:
    "Browse countries by cannabis status: fully legal, medical-only, decriminalized, or prohibited. Each entry links to a full law guide with possession rules and city notes.",
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
      <p className="eyebrow rise">Legal status</p>
      <h1 className="rise rise-1 mt-2 text-4xl font-semibold sm:text-5xl">Where is cannabis legal?</h1>
      <p className="mt-3 max-w-xl text-ink-dim">
        Every country we track, grouped by how cannabis is treated. Open any card for possession limits, medical access, and local city notes.
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
                    title={`${c.name} cannabis laws — ${statusLabel[g]}`}
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
        We add more countries as laws change. Always confirm current rules with official sources before you travel.
      </p>
    </div>
  );
}
