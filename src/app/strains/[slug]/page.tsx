import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { strains, getStrain, relatedStrains } from "@/data/strains";
import { getTerpene } from "@/data/terpenes";
import StrainCard, { Stars } from "@/components/StrainCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return strains.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getStrain(slug);
  if (!s) return {};
  return {
    title: `${s.name} Cannabis Strain — ${s.thc}% THC, ${s.effects.slice(0, 2).join(" & ")}`,
    description: `${s.name} is a ${s.genetics} strain (${s.thc}% THC, ${s.cbd}% CBD) known for ${s.effects.slice(0, 3).join(", ").toLowerCase()}. Parent strains: ${s.lineage.join(" × ")}. Terpene profile, uses, and ${s.ratingCount.toLocaleString()} reader ratings.`,
    alternates: { canonical: `/strains/${s.slug}` },
  };
}

export default async function StrainPage({ params }: Props) {
  const { slug } = await params;
  const s = getStrain(slug);
  if (!s) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${s.name} cannabis strain`,
    description: s.description,
    brand: { "@type": "Brand", name: s.breeder },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: s.rating,
      reviewCount: s.ratingCount,
      bestRating: 5,
    },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Strains", item: "https://weedsfinder.com/strains" },
      { "@type": "ListItem", position: 2, name: s.name, item: `https://weedsfinder.com/strains/${s.slug}` },
    ],
  };

  const stats = [
    { label: "THC", value: `${s.thc}%`, color: "text-emerald" },
    { label: "CBD", value: `${s.cbd}%`, color: "text-amber" },
    { label: "CBG", value: `${s.cbg}%`, color: "text-cyan-300" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="text-sm text-ink-dim" aria-label="Breadcrumb">
        <Link href="/strains" className="hover:text-ink">Cannabis strains</Link> / {s.name}
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div>
          <span className="pill capitalize border-emerald/30 text-emerald">{s.genetics}</span>
          <h1 className="mt-3 text-5xl font-semibold">{s.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <Stars rating={s.rating} />
            <span className="tabular text-ink-dim">{s.rating} out of 5 · {s.ratingCount.toLocaleString()} ratings</span>
          </div>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-dim">{s.description}</p>

          <h2 className="mt-10 text-2xl font-semibold">Reported effects &amp; flavor</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              { title: "Effects", items: s.effects },
              { title: "Taste", items: s.taste },
              { title: "Aroma", items: s.aroma },
            ].map((g) => (
              <div key={g.title} className="card p-4">
                <h3 className="text-sm uppercase tracking-widest text-ink-dim">{g.title}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((i) => <span key={i} className="pill capitalize">{i}</span>)}
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-semibold">Terpene profile</h2>
          <div className="mt-4 space-y-3">
            {s.terpenes.map((name, i) => {
              const t = getTerpene(name);
              const width = 100 - i * 28;
              return (
                <div key={name}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{name}</span>
                    <span className="text-ink-dim">{t?.aroma}</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-surface-2">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${width}%`, background: t?.color ?? "#4ADE80" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <h2 className="mt-10 text-2xl font-semibold">What people use it for</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink-dim">{s.medicalInfo}</p>
          <p className="mt-2 text-xs text-ink-dim/70">Reported uses only — not medical advice. Talk to a doctor before treating any condition with cannabis.</p>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="card p-5">
            <h3 className="text-sm uppercase tracking-widest text-ink-dim">Cannabinoids</h3>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {stats.map((st) => (
                <div key={st.label}>
                  <div className={`tabular text-2xl font-semibold ${st.color}`}>{st.value}</div>
                  <div className="text-xs text-ink-dim">{st.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card space-y-3 p-5 text-sm">
            {[
              ["Lineage", s.lineage.join(" × ")],
              ["Breeder", s.breeder],
              ["Origin", s.origin],
              ["Best time", s.bestTime],
              ["Experience", s.experienceLevel],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <span className="text-ink-dim">{k}</span>
                <span className="text-right capitalize">{v}</span>
              </div>
            ))}
          </div>
          <Link href={`/tools/compare?a=${s.slug}`} className="btn-primary block text-center text-sm" title={`Compare ${s.name} with another strain`}>
            Compare {s.name} with another strain
          </Link>
        </aside>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Strains like {s.name}</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedStrains(s).map((r) => <StrainCard key={r.slug} strain={r} />)}
        </div>
      </section>
    </div>
  );
}
