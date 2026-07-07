import Link from "next/link";
import type { Strain } from "@/data/strains";

const geneticsColor: Record<Strain["genetics"], string> = {
  indica: "text-clay",
  sativa: "text-amber",
  hybrid: "text-emerald",
};

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-amber" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(Math.round(rating))}
      <span className="text-ink-dim/40">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}

export default function StrainCard({ strain, className = "" }: { strain: Strain; className?: string }) {
  return (
    <Link href={`/strains/${strain.slug}`} className={`card block p-5 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className={`text-[0.7rem] uppercase tracking-widest ${geneticsColor[strain.genetics]}`}>
            {strain.genetics}
          </span>
          <h3 className="mt-0.5 text-lg font-semibold">{strain.name}</h3>
        </div>
        <div className="tabular rounded-lg bg-emerald/10 px-2.5 py-1 text-sm font-semibold text-emerald">
          {strain.thc}%<span className="ml-1 text-[0.65rem] font-normal text-ink-dim">THC</span>
        </div>
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-ink-dim">{strain.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {strain.effects.slice(0, 3).map((e) => (
          <span key={e} className="pill">{e}</span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <Stars rating={strain.rating} />
        <span className="tabular text-xs text-ink-dim">
          {strain.ratingCount.toLocaleString()} reviews
        </span>
      </div>
    </Link>
  );
}
