"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { strains, getStrain } from "@/data/strains";
import { terpenes } from "@/data/terpenes";
import type { ToolSlug } from "../registry";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm text-ink-dim">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Result({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="mt-6 rounded-xl border border-emerald/30 bg-emerald/10 p-5 text-center">
      <div className="text-sm text-ink-dim">{label}</div>
      <div className="tabular mt-1 text-4xl font-semibold text-emerald">
        {value}
        {unit && <span className="ml-1 text-lg font-normal text-ink-dim">{unit}</span>}
      </div>
    </div>
  );
}

/* ---------- THC ---------- */
function ThcCalc() {
  const [grams, setGrams] = useState(0.5);
  const [thc, setThc] = useState(20);
  const [efficiency, setEfficiency] = useState(50); // combustion loss
  const mg = grams * 1000 * (thc / 100) * (efficiency / 100);
  return (
    <div className="space-y-4">
      <Field label="Flower amount (grams)">
        <input type="number" step="0.1" min="0" value={grams} onChange={(e) => setGrams(+e.target.value)} className="w-full" />
      </Field>
      <Field label="THC content (%)">
        <input type="number" step="0.5" min="0" max="40" value={thc} onChange={(e) => setThc(+e.target.value)} className="w-full" />
      </Field>
      <Field label={`Delivery efficiency: ${efficiency}% (joint ≈40–50%, vaporizer ≈60–80%)`}>
        <input type="range" min="20" max="90" value={efficiency} onChange={(e) => setEfficiency(+e.target.value)} className="w-full" />
      </Field>
      <Result label="THC delivered" value={mg.toFixed(0)} unit="mg" />
    </div>
  );
}

/* ---------- CBD ---------- */
function CbdCalc() {
  const [bottleMl, setBottleMl] = useState(30);
  const [totalCbd, setTotalCbd] = useState(1000);
  const [drops, setDrops] = useState(10);
  const mgPerMl = totalCbd / bottleMl;
  const mg = (drops * 0.05) * mgPerMl; // 1 drop ≈ 0.05 ml
  return (
    <div className="space-y-4">
      <Field label="Bottle size (ml)">
        <input type="number" min="1" value={bottleMl} onChange={(e) => setBottleMl(+e.target.value)} className="w-full" />
      </Field>
      <Field label="Total CBD in bottle (mg)">
        <input type="number" min="0" value={totalCbd} onChange={(e) => setTotalCbd(+e.target.value)} className="w-full" />
      </Field>
      <Field label="Drops taken">
        <input type="number" min="0" value={drops} onChange={(e) => setDrops(+e.target.value)} className="w-full" />
      </Field>
      <p className="text-xs text-ink-dim">Strength: {mgPerMl.toFixed(1)} mg/ml · one drop ≈ 0.05 ml</p>
      <Result label="CBD per dose" value={mg.toFixed(1)} unit="mg" />
    </div>
  );
}

/* ---------- Edibles ---------- */
function EdibleCalc() {
  const [grams, setGrams] = useState(3.5);
  const [thc, setThc] = useState(20);
  const [servings, setServings] = useState(12);
  // decarb ≈ 0.877 conversion, infusion extraction ≈ 60%
  const totalMg = grams * 1000 * (thc / 100) * 0.877 * 0.6;
  const perServing = totalMg / Math.max(servings, 1);
  const level = perServing <= 5 ? "microdose–low" : perServing <= 10 ? "standard" : perServing <= 25 ? "strong" : "very strong ⚠️";
  return (
    <div className="space-y-4">
      <Field label="Flower used (grams)">
        <input type="number" step="0.5" min="0" value={grams} onChange={(e) => setGrams(+e.target.value)} className="w-full" />
      </Field>
      <Field label="THC content (%)">
        <input type="number" step="0.5" min="0" max="40" value={thc} onChange={(e) => setThc(+e.target.value)} className="w-full" />
      </Field>
      <Field label="Number of servings">
        <input type="number" min="1" value={servings} onChange={(e) => setServings(+e.target.value)} className="w-full" />
      </Field>
      <p className="text-xs text-ink-dim">
        Assumes 87.7% decarboxylation conversion and ~60% infusion extraction. Batch total ≈ {totalMg.toFixed(0)} mg.
      </p>
      <Result label={`Per serving (${level})`} value={perServing.toFixed(1)} unit="mg THC" />
    </div>
  );
}

/* ---------- Tolerance ---------- */
function ToleranceCalc() {
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [sessionsPerDay, setSessionsPerDay] = useState(1);
  const [years, setYears] = useState(1);
  const score = daysPerWeek * sessionsPerDay * Math.min(years, 5);
  const tier = score <= 3 ? "Low" : score <= 10 ? "Moderate" : score <= 25 ? "High" : "Very high";
  const breakDays = score <= 3 ? 3 : score <= 10 ? 7 : score <= 25 ? 14 : 28;
  return (
    <div className="space-y-4">
      <Field label="Days per week you consume">
        <input type="number" min="0" max="7" value={daysPerWeek} onChange={(e) => setDaysPerWeek(+e.target.value)} className="w-full" />
      </Field>
      <Field label="Sessions per day">
        <input type="number" min="0" max="10" value={sessionsPerDay} onChange={(e) => setSessionsPerDay(+e.target.value)} className="w-full" />
      </Field>
      <Field label="Years at this pace">
        <input type="number" min="0" max="50" value={years} onChange={(e) => setYears(+e.target.value)} className="w-full" />
      </Field>
      <Result label={`Tolerance: ${tier}`} value={`${breakDays}`} unit="day reset break" />
      <p className="text-xs text-ink-dim">
        CB1 receptor availability substantially recovers within ~2 days and approaches baseline over ~4 weeks of abstinence.
      </p>
    </div>
  );
}

/* ---------- Compare ---------- */
function Compare() {
  const params = useSearchParams();
  const [a, setA] = useState(params.get("a") ?? strains[0].slug);
  const [b, setB] = useState(params.get("b") ?? strains[1].slug);
  const sa = getStrain(a)!;
  const sb = getStrain(b)!;
  const rows: [string, string | number, string | number][] = [
    ["Genetics", sa.genetics, sb.genetics],
    ["THC", `${sa.thc}%`, `${sb.thc}%`],
    ["CBD", `${sa.cbd}%`, `${sb.cbd}%`],
    ["Dominant terpene", sa.terpenes[0], sb.terpenes[0]],
    ["Effects", sa.effects.join(", "), sb.effects.join(", ")],
    ["Best time", sa.bestTime, sb.bestTime],
    ["Experience", sa.experienceLevel, sb.experienceLevel],
    ["Rating", `★ ${sa.rating}`, `★ ${sb.rating}`],
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        {[{ v: a, set: setA }, { v: b, set: setB }].map((sel, i) => (
          <select key={i} value={sel.v} onChange={(e) => sel.set(e.target.value)} className="w-full">
            {strains.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
          </select>
        ))}
      </div>
      <table className="mt-6 w-full text-sm">
        <tbody>
          {rows.map(([k, va, vb]) => (
            <tr key={k} className="border-t border-line">
              <td className="py-2.5 pr-3 text-ink-dim">{k}</td>
              <td className="py-2.5 pr-3 capitalize">{va}</td>
              <td className="py-2.5 capitalize">{vb}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 grid grid-cols-2 gap-3 text-center text-sm">
        <Link href={`/strains/${sa.slug}`} className="text-emerald hover:underline">{sa.name} →</Link>
        <Link href={`/strains/${sb.slug}`} className="text-emerald hover:underline">{sb.name} →</Link>
      </div>
    </div>
  );
}

/* ---------- Terpene finder ---------- */
function TerpeneFinder() {
  const [picked, setPicked] = useState<string | null>(null);
  const t = terpenes.find((x) => x.name === picked);
  const matches = picked ? strains.filter((s) => s.terpenes.includes(picked)) : [];
  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {terpenes.map((tp) => (
          <button
            key={tp.name}
            onClick={() => setPicked(tp.name)}
            className={`pill !px-4 !py-2 !text-sm transition-all ${picked === tp.name ? "!border-emerald !bg-emerald/15 !text-emerald" : "hover:text-ink"}`}
          >
            {tp.name}
          </button>
        ))}
      </div>
      {t && (
        <div className="mt-6">
          <div className="rounded-xl border border-line p-5" style={{ borderColor: `${t.color}55` }}>
            <h3 className="text-xl font-semibold" style={{ color: t.color }}>{t.name}</h3>
            <p className="mt-2 text-sm text-ink-dim"><strong className="text-ink">Aroma:</strong> {t.aroma}</p>
            <p className="mt-1 text-sm text-ink-dim"><strong className="text-ink">Effects:</strong> {t.effects.join(", ")}</p>
            <p className="mt-1 text-sm text-ink-dim"><strong className="text-ink">Also found in:</strong> {t.alsoFoundIn}</p>
          </div>
          <h4 className="mt-6 text-sm uppercase tracking-widest text-ink-dim">Strains rich in {t.name}</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {matches.map((s) => (
              <Link key={s.slug} href={`/strains/${s.slug}`} className="pill !py-1.5 hover:border-emerald/40 hover:text-ink">
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const panels: Record<ToolSlug, () => React.ReactElement> = {
  "thc-calculator": ThcCalc,
  "cbd-calculator": CbdCalc,
  "edible-calculator": EdibleCalc,
  "tolerance-calculator": ToleranceCalc,
  compare: Compare,
  "terpene-finder": TerpeneFinder,
};

export default function ToolPanel({ tool }: { tool: ToolSlug }) {
  const Panel = panels[tool];
  return <Panel />;
}
