import type { Metadata } from "next";
import Link from "next/link";
import { countries } from "@/data/countries";
import LegalBadge from "@/components/LegalBadge";

export const metadata: Metadata = {
  title: "Cannabis Laws by Country — Global Legal Database",
  description:
    "Is weed legal? Up-to-date cannabis legality for every country: recreational, medical, decriminalized, and illegal jurisdictions — with plain-language rules and city guides.",
};

const order = { legal: 0, decriminalized: 1, medical: 2, illegal: 3 };

export default function LawsPage() {
  const sorted = [...countries].sort((a, b) => order[a.legalStatus] - order[b.legalStatus]);
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-4xl font-semibold sm:text-5xl">Cannabis Law Library</h1>
      <p className="mt-3 max-w-xl text-ink-dim">
        Plain-language legal status for {countries.length} countries. Laws change fast — every page shows its last verification date.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((c) => (
          <Link key={c.code} href={`/laws/${c.slug}`} className="card p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                <span className="mr-2">{c.flag}</span>{c.name}
              </h2>
              <LegalBadge status={c.legalStatus} />
            </div>
            <p className="mt-3 line-clamp-2 text-sm text-ink-dim">{c.rules}</p>
            <p className="mt-3 text-xs text-ink-dim/70">
              Updated {c.updated}{c.cities.length > 0 && ` · ${c.cities.length} city guide${c.cities.length > 1 ? "s" : ""}`}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
