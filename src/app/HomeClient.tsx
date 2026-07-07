"use client";

import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import StrainCard from "@/components/StrainCard";
import { strains } from "@/data/strains";
import { countries } from "@/data/countries";
import { terpenes } from "@/data/terpenes";

/* ---------- animated counter ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1.8, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix;
    });
  }, [spring, suffix]);

  return <span ref={ref} className="tabular">0{suffix}</span>;
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export default function HomeClient() {
  const featured = [...strains].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const legalCount = countries.filter((c) => c.recreational).length;
  const totalReviews = strains.reduce((n, s) => n + s.ratingCount, 0);
  const marqueeItems = [...strains.map((s) => s.name), ...terpenes.map((t) => t.name)];

  return (
    <div className="overflow-x-clip">
      {/* ================= HERO ================= */}
      <section className="relative mx-auto max-w-6xl px-5 pb-16 pt-24 text-center sm:pt-32">
        <div className="orb left-[8%] top-[10%] h-72 w-72 bg-emerald/20" aria-hidden />
        <div className="orb right-[5%] top-[30%] h-56 w-56 bg-amber/10 [animation-delay:-7s]" aria-hidden />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pill mx-auto w-fit border-emerald/30 text-emerald"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
          </span>
          Cannabis intelligence, worldwide
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-7 max-w-4xl text-[3.4rem] font-semibold leading-[0.98] tracking-tight sm:text-[5.5rem]"
        >
          The world&rsquo;s cannabis,
          <br />
          <span className="text-gradient">understood.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-dim"
        >
          Every strain, every law, every terpene — one intelligent platform.
          Personal recommendations in five questions. Legal clarity in one tap.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/finder" className="btn-primary !px-8 !py-3.5 text-base">
            Find my perfect strain
          </Link>
          <Link
            href="/assistant"
            className="rounded-full border border-line px-7 py-3.5 text-base text-ink transition-colors hover:border-emerald/40 hover:text-emerald"
          >
            Ask the AI →
          </Link>
        </motion.div>

        {/* stats */}
        <motion.div {...fadeUp} className="mx-auto mt-20 grid max-w-3xl grid-cols-3 gap-4">
          {[
            { n: strains.length, suffix: "", label: "curated strains" },
            { n: countries.length, suffix: "", label: "countries mapped" },
            { n: totalReviews, suffix: "+", label: "community reviews" },
          ].map((s) => (
            <div key={s.label}>
              <div className="display text-3xl font-semibold text-ink sm:text-5xl">
                <Counter to={s.n} suffix={s.suffix} />
              </div>
              <div className="mt-1.5 text-xs uppercase tracking-widest text-ink-dim sm:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ================= MARQUEE ================= */}
      <div className="relative border-y border-line py-4 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="marquee-track gap-10">
          {[...marqueeItems, ...marqueeItems].map((name, i) => (
            <span key={i} className="display shrink-0 text-lg text-ink-dim/60">
              {name} <span className="ml-8 text-emerald/40">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ================= FEATURED ================= */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <motion.div {...fadeUp} className="flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-emerald">The library</p>
            <h2 className="mt-2 text-4xl font-semibold sm:text-5xl">Top-rated strains</h2>
          </div>
          <Link href="/strains" className="hidden text-sm text-emerald hover:underline sm:block">
            Browse all {strains.length} →
          </Link>
        </motion.div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <StrainCard strain={s} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <motion.div {...fadeUp}>
          <p className="text-center text-sm uppercase tracking-[0.25em] text-amber">How it works</p>
          <h2 className="mt-2 text-center text-4xl font-semibold sm:text-5xl">
            From curious to confident
          </h2>
        </motion.div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { n: "01", title: "Tell us about you", body: "Experience level, desired effects, time of day, taste, potency. Five questions, thirty seconds.", href: "/finder" },
            { n: "02", title: "Get matched, with reasons", body: "The engine scores every strain against your profile and shows its work — never a black box.", href: "/finder" },
            { n: "03", title: "Know before you go", body: "Check the law library and city guides so you always know exactly where you stand.", href: "/laws" },
          ].map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.55 }}
            >
              <Link href={step.href} className="card block h-full p-7">
                <span className="display text-5xl font-light text-emerald/30">{step.n}</span>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-dim">{step.body}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PILLARS ================= */}
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/assistant", title: "AI Assistant", body: "Ask anything — answers grounded in the knowledge base, sources linked.", accent: "text-emerald", icon: "✳" },
            { href: "/map", title: "Global Map", body: `${countries.length} countries mapped, ${legalCount} fully legal. City guides included.`, accent: "text-amber", icon: "◍" },
            { href: "/tools", title: "Dosing Tools", body: "THC, CBD, edible, and tolerance calculators built on published pharmacology.", accent: "text-clay", icon: "❋" },
            { href: "/laws", title: "Law Library", body: "Plain-language legal breakdowns per country and city, kept current.", accent: "text-cyan-300", icon: "❖" },
          ].map((p, i) => (
            <motion.div
              key={p.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link href={p.href} className="card block h-full p-6">
                <span className={`text-2xl ${p.accent}`}>{p.icon}</span>
                <h3 className={`mt-3 text-xl font-semibold ${p.accent}`}>{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{p.body}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= LEGAL SNAPSHOT ================= */}
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <motion.h2 {...fadeUp} className="text-4xl font-semibold sm:text-5xl">
          Where is it legal?
        </motion.h2>
        <motion.div {...fadeUp} className="mt-7 flex flex-wrap gap-2.5">
          {countries.map((c) => (
            <Link
              key={c.code}
              href={`/laws/${c.slug}`}
              className="pill !py-1.5 transition-all hover:-translate-y-0.5 hover:border-emerald/40 hover:text-ink"
            >
              <span>{c.flag}</span> {c.name}
            </Link>
          ))}
        </motion.div>
      </section>

      {/* ================= CLOSING CTA ================= */}
      <section className="mx-auto max-w-6xl px-5 pb-8">
        <motion.div {...fadeUp} className="gradient-ring">
          <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-surface px-8 py-16 text-center sm:py-20">
            <div className="orb left-1/2 top-0 h-60 w-96 -translate-x-1/2 bg-emerald/15" aria-hidden />
            <h2 className="relative text-4xl font-semibold sm:text-6xl">
              Your perfect strain is
              <br />
              <span className="text-gradient">five questions away.</span>
            </h2>
            <p className="relative mx-auto mt-5 max-w-md text-ink-dim">
              Free, private, and built on real pharmacology — not marketing.
            </p>
            <Link href="/finder" className="btn-primary relative mt-9 inline-block !px-9 !py-4 text-base">
              Start the finder
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
