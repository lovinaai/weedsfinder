"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import StrainCard from "@/components/StrainCard";
import { strains } from "@/data/strains";
import { allEffects } from "@/lib/recommend";

const genetics = ["all", "indica", "sativa", "hybrid"] as const;

export default function StrainBrowser() {
  const [q, setQ] = useState("");
  const [gen, setGen] = useState<(typeof genetics)[number]>("all");
  const [effect, setEffect] = useState("all");

  const results = useMemo(
    () =>
      strains.filter(
        (s) =>
          (gen === "all" || s.genetics === gen) &&
          (effect === "all" || s.effects.includes(effect)) &&
          (q === "" || s.name.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, gen, effect],
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-4xl font-semibold sm:text-5xl">Strain Database</h1>
      <p className="mt-3 max-w-xl text-ink-dim">
        {strains.length} strains with lab-style profiles: cannabinoids, terpenes, effects, and community ratings.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <input
          placeholder="Search strains…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full sm:w-64"
          aria-label="Search strains"
        />
        <div className="flex gap-2">
          {genetics.map((g) => (
            <button
              key={g}
              onClick={() => setGen(g)}
              className={`pill !py-1.5 capitalize transition-colors ${gen === g ? "!border-emerald/50 !text-emerald" : "hover:text-ink"}`}
            >
              {g}
            </button>
          ))}
        </div>
        <select value={effect} onChange={(e) => setEffect(e.target.value)} aria-label="Filter by effect">
          <option value="all">Any effect</option>
          {allEffects.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
      </div>

      <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((s, i) => (
          <motion.div
            key={s.slug}
            layout
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.35 }}
          >
            <StrainCard strain={s} />
          </motion.div>
        ))}
      </motion.div>
      {results.length === 0 && (
        <p className="mt-16 text-center text-ink-dim">No strains match those filters.</p>
      )}
    </div>
  );
}
