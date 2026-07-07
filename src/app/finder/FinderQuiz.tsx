"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StrainCard from "@/components/StrainCard";
import { recommend, allEffects, allTastes, type FinderAnswers } from "@/lib/recommend";

type Step = {
  key: keyof FinderAnswers;
  question: string;
  multi: boolean;
  options: { value: string; label: string }[];
};

const steps: Step[] = [
  {
    key: "experience",
    question: "How often do you use cannabis?",
    multi: false,
    options: [
      { value: "beginner", label: "New or occasional" },
      { value: "intermediate", label: "A few times a week" },
      { value: "expert", label: "Daily or near-daily" },
    ],
  },
  {
    key: "effects",
    question: "What do you want to feel?",
    multi: true,
    options: allEffects.map((e) => ({ value: e, label: e })),
  },
  {
    key: "time",
    question: "When will you use it?",
    multi: false,
    options: [
      { value: "morning", label: "Morning" },
      { value: "afternoon", label: "Afternoon" },
      { value: "evening", label: "Evening" },
      { value: "night", label: "Before bed" },
    ],
  },
  {
    key: "taste",
    question: "Which flavors do you like?",
    multi: true,
    options: allTastes.map((t) => ({ value: t, label: t })),
  },
  {
    key: "thc",
    question: "How much THC can you handle?",
    multi: false,
    options: [
      { value: "low", label: "Light — up to 12% THC" },
      { value: "medium", label: "Moderate — 12 to 21% THC" },
      { value: "high", label: "Strong — 21% THC and up" },
    ],
  },
];

export default function FinderQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<FinderAnswers>>({ effects: [], taste: [] });
  const [done, setDone] = useState(false);

  const current = steps[step];
  const selected = answers[current?.key];

  function toggle(value: string) {
    if (current.multi) {
      const arr = (selected as string[]) ?? [];
      setAnswers({
        ...answers,
        [current.key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      });
    } else {
      setAnswers({ ...answers, [current.key]: value });
    }
  }

  function next() {
    if (step < steps.length - 1) setStep(step + 1);
    else setDone(true);
  }

  const canAdvance = current?.multi ? ((selected as string[]) ?? []).length > 0 : !!selected;
  const results = done ? recommend(answers as FinderAnswers) : [];

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="eyebrow rise text-center">Strain finder</p>
      <h1 className="rise rise-1 mt-2 text-center text-4xl font-semibold sm:text-5xl">Find your strain</h1>
      <p className="mx-auto mt-3 max-w-md text-center text-ink-dim">
        Five questions. You get a short list of strains that match — plus a plain explanation for each pick.
      </p>

      {!done ? (
        <div className="mt-10">
          <div className="h-1.5 rounded-full bg-surface-2">
            <motion.div
              className="h-1.5 rounded-full bg-emerald"
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <h2 className="text-2xl font-semibold">
                <span className="tabular mr-2 text-emerald">{step + 1}/{steps.length}</span>
                {current.question}
              </h2>
              {current.multi && <p className="mt-1 text-sm text-ink-dim">Choose one or more.</p>}
              <div className="mt-6 flex flex-wrap gap-2.5">
                {current.options.map((o) => {
                  const active = current.multi
                    ? ((selected as string[]) ?? []).includes(o.value)
                    : selected === o.value;
                  return (
                    <button
                      key={o.value}
                      onClick={() => toggle(o.value)}
                      className={`pill !px-4 !py-2.5 !text-sm capitalize transition-all ${
                        active ? "!border-emerald !bg-emerald/15 !text-emerald" : "hover:border-white/25 hover:text-ink"
                      }`}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
              <div className="mt-10 flex justify-between">
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  className={`text-sm text-ink-dim hover:text-ink ${step === 0 ? "invisible" : ""}`}
                  aria-label="Go back to previous question"
                >
                  Back
                </button>
                <button onClick={next} disabled={!canAdvance} className="btn-primary disabled:opacity-40" aria-label={step === steps.length - 1 ? "Show my strain matches" : "Continue to next question"}>
                  {step === steps.length - 1 ? "Show my matches" : "Next"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
          <h2 className="text-2xl font-semibold">
            Strains that fit your answers
          </h2>
          <div className="mt-6 space-y-6">
            {results.map(({ strain, reasons }, i) => (
              <motion.div
                key={strain.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
              >
                <StrainCard strain={strain} />
                <p className="mt-2 px-1 text-sm text-ink-dim">
                  <span className="text-emerald">Why this strain:</span> {reasons.join("; ")}.
                </p>
              </motion.div>
            ))}
            {results.length === 0 && (
              <p className="text-ink-dim">Nothing in our database lines up with that combo. Try widening your effect choices or bumping your experience level.</p>
            )}
          </div>
          <button
            onClick={() => { setDone(false); setStep(0); setAnswers({ effects: [], taste: [] }); }}
            className="mt-8 text-sm text-emerald hover:underline"
            aria-label="Restart the strain finder quiz"
          >
            Start over
          </button>
        </motion.div>
      )}
    </div>
  );
}
