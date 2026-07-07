import Link from "next/link";
import StrainCard from "@/components/StrainCard";
import { strains } from "@/data/strains";
import { countries } from "@/data/countries";

export default function Home() {
  const featured = [...strains].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const legalCount = countries.filter((c) => c.recreational).length;

  return (
    <div className="mx-auto max-w-6xl px-5">
      {/* Hero */}
      <section className="py-20 text-center sm:py-28">
        <p className="rise pill mx-auto w-fit border-emerald/30 text-emerald">
          {strains.length} strains · {countries.length} countries · 7 tools
        </p>
        <h1 className="rise rise-1 mx-auto mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] sm:text-7xl">
          Know your <em className="text-emerald not-italic">flower</em>.
          <br />
          Know your <em className="text-amber not-italic">world</em>.
        </h1>
        <p className="rise rise-2 mx-auto mt-6 max-w-xl text-lg text-ink-dim">
          The cannabis discovery intelligence platform — strain encyclopedia, AI-powered
          recommendations, global legality map, and precision dosing tools.
        </p>
        <div className="rise rise-3 mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href="/finder" className="btn-primary">Find my perfect strain →</Link>
          <Link href="/strains" className="pill !px-5 !py-2.5 !text-sm hover:text-ink">
            Browse the database
          </Link>
        </div>
      </section>

      {/* Featured strains */}
      <section className="py-10">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold">Top-rated strains</h2>
          <Link href="/strains" className="text-sm text-emerald hover:underline">View all →</Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => <StrainCard key={s.slug} strain={s} />)}
        </div>
      </section>

      {/* Pillars */}
      <section className="grid gap-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { href: "/finder", title: "AI Strain Finder", body: "Answer five questions, get personalized matches with reasons — not just a list.", accent: "text-emerald" },
          { href: "/map", title: "Global Legality Map", body: `Live legal status for ${countries.length} countries, ${legalCount} fully legal. City guides included.`, accent: "text-amber" },
          { href: "/tools", title: "Dosing Tools", body: "THC, CBD, edible, and tolerance calculators built on published pharmacology.", accent: "text-clay" },
          { href: "/laws", title: "Law Library", body: "Plain-language legal breakdowns per country and city, kept current.", accent: "text-cyan-300" },
        ].map((p) => (
          <Link key={p.href} href={p.href} className="card p-6">
            <h3 className={`text-xl font-semibold ${p.accent}`}>{p.title}</h3>
            <p className="mt-2 text-sm text-ink-dim">{p.body}</p>
          </Link>
        ))}
      </section>

      {/* Legal snapshot */}
      <section className="py-10">
        <h2 className="text-3xl font-semibold">Where is it legal?</h2>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {countries.map((c) => (
            <Link
              key={c.code}
              href={`/laws/${c.slug}`}
              className="pill !py-1.5 hover:border-emerald/40 hover:text-ink"
            >
              <span>{c.flag}</span> {c.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
