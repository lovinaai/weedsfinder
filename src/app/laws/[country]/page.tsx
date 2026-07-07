import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { countries, getCountry, statusLabel } from "@/data/countries";
import LegalBadge from "@/components/LegalBadge";

type Props = { params: Promise<{ country: string }> };

export function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const c = getCountry(country);
  if (!c) return {};
  return {
    title: `Is Weed Legal in ${c.name}? Cannabis Laws ${new Date(c.updated).getFullYear()}`,
    description: `Cannabis in ${c.name}: ${statusLabel[c.legalStatus].toLowerCase()}. ${c.rules.slice(0, 150)}…`,
    alternates: { canonical: `/laws/${c.slug}` },
  };
}

export default async function CountryLawPage({ params }: Props) {
  const { country } = await params;
  const c = getCountry(country);
  if (!c) notFound();

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is cannabis legal in ${c.name}?`,
        acceptedAnswer: { "@type": "Answer", text: `${statusLabel[c.legalStatus]}. ${c.rules}` },
      },
      {
        "@type": "Question",
        name: `Is medical cannabis available in ${c.name}?`,
        acceptedAnswer: { "@type": "Answer", text: c.medical ? `Yes, medical cannabis is available in ${c.name}.` : `No, ${c.name} does not have a medical cannabis program.` },
      },
    ],
  };

  const neighbors = countries.filter((x) => x.slug !== c.slug && x.legalStatus === c.legalStatus).slice(0, 5);

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <nav className="text-sm text-ink-dim">
        <Link href="/laws" className="hover:text-ink">Laws</Link> / {c.name}
      </nav>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <h1 className="text-4xl font-semibold sm:text-5xl">
          <span className="mr-3">{c.flag}</span>Cannabis in {c.name}
        </h1>
        <LegalBadge status={c.legalStatus} />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="card p-5">
          <h2 className="text-sm uppercase tracking-widest text-ink-dim">Recreational</h2>
          <p className={`mt-2 text-2xl font-semibold ${c.recreational ? "text-emerald" : "text-clay"}`}>
            {c.recreational ? "Legal" : "Not legal"}
          </p>
        </div>
        <div className="card p-5">
          <h2 className="text-sm uppercase tracking-widest text-ink-dim">Medical</h2>
          <p className={`mt-2 text-2xl font-semibold ${c.medical ? "text-emerald" : "text-clay"}`}>
            {c.medical ? "Available" : "Not available"}
          </p>
        </div>
      </div>

      <h2 className="mt-10 text-2xl font-semibold">The rules</h2>
      <p className="mt-3 leading-relaxed text-ink-dim">{c.rules}</p>
      <p className="mt-3 text-xs text-ink-dim/70">Last verified {c.updated}. Not legal advice — always confirm with local authorities.</p>

      {c.cities.length > 0 && (
        <>
          <h2 className="mt-10 text-2xl font-semibold">City guides</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {c.cities.map((city) => (
              <div key={city.slug} className="card p-5">
                <h3 className="text-lg font-semibold">{city.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{city.guide}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {neighbors.length > 0 && (
        <>
          <h2 className="mt-10 text-2xl font-semibold">Similar legal status</h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {neighbors.map((n) => (
              <Link key={n.slug} href={`/laws/${n.slug}`} className="pill !py-1.5 hover:border-emerald/40 hover:text-ink">
                {n.flag} {n.name}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
