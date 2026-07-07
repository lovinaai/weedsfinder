"use client";

import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import StrainCard from "@/components/StrainCard";
import { strains } from "@/data/strains";
import { countries } from "@/data/countries";
import { terpenes } from "@/data/terpenes";

/* ---------- animated counter ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1.8, bounce: 0 });

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      if (ref.current) ref.current.textContent = to.toLocaleString() + suffix;
    } else {
      mv.set(to);
    }
  }, [inView, to, mv, reduce, suffix]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix;
    });
  }, [spring, suffix]);

  return <span ref={ref} className="tabular">0{suffix}</span>;
}

/* ---------- pillar icons — 1.5px stroke, geometry echoes the leaf mark ---------- */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconAssistant() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden {...stroke}>
      <path d="M14 4c1.8 0 8.5 1 8.5 8.2 0 5.6-4.3 8.3-8.5 8.3-1 0-2-.14-2.9-.42L6 22l1.3-3.8C5.9 16.7 5.5 14.7 5.5 12.2 5.5 5 12.2 4 14 4Z" />
      <path d="M14 9.5v5M11.5 12h5" />
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden {...stroke}>
      <circle cx="14" cy="14" r="9.5" />
      <path d="M4.5 14h19M14 4.5c2.6 2.6 3.9 5.9 3.9 9.5s-1.3 6.9-3.9 9.5c-2.6-2.6-3.9-5.9-3.9-9.5S11.4 7.1 14 4.5Z" />
    </svg>
  );
}
function IconDrop() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden {...stroke}>
      <path d="M14 4.5c3.8 4.6 6.5 8.3 6.5 11.6a6.5 6.5 0 1 1-13 0c0-3.3 2.7-7 6.5-11.6Z" />
      <path d="M11 16.5a3 3 0 0 0 3 3" />
    </svg>
  );
}
function IconScale() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden {...stroke}>
      <path d="M14 5v18M8.5 23h11M14 5l-6 3m6-3 6 3" />
      <path d="M5 15.5 8 8l3 7.5a3 3 0 0 1-6 0ZM17 15.5 20 8l3 7.5a3 3 0 0 1-6 0Z" />
    </svg>
  );
}

export default function HomeClient() {
  const reduce = useReducedMotion();
  const featured = [...strains].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const legalCount = countries.filter((c) => c.recreational).length;
  const totalReviews = strains.reduce((n, s) => n + s.ratingCount, 0);
  const marqueeItems = [
    ...strains.map((s) => ({ name: s.name, href: `/strains/${s.slug}` })),
    ...terpenes.map((t) => ({ name: t.name, href: null })),
  ];

  /* scroll parallax on hero atmosphere */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const heroFade = useTransform(scrollYProgress, [0, 0.9], [1, reduce ? 1 : 0.3]);

  const fadeUp = {
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  };
  const enter = (extra: object = {}) =>
    reduce ? false : { opacity: 0, y: 24, ...extra };

  return (
    <div className="overflow-x-clip">
      {/* ================= HERO ================= */}
      <section ref={heroRef} className="relative mx-auto max-w-6xl px-5 pb-16 pt-24 text-center sm:pt-32">
        <motion.div style={{ y: orbY1 }} className="orb left-[8%] top-[10%] h-72 w-72 bg-emerald/20" aria-hidden />
        <motion.div style={{ y: orbY2 }} className="orb right-[5%] top-[30%] h-56 w-56 bg-amber/10 [animation-delay:-7s]" aria-hidden />

        <motion.div style={{ opacity: heroFade }}>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pill mx-auto w-fit border-emerald/30 text-emerald"
          >
            <span className="relative flex h-2 w-2">
              {!reduce && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
            </span>
            Cannabis guides, worldwide
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-7 max-w-4xl text-[3.4rem] font-semibold leading-[0.98] tracking-tight sm:text-[5.5rem]"
          >
            The world&rsquo;s cannabis,
            <br />
            <span className="text-gradient">understood.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-dim"
          >
            Strain profiles with real THC numbers. Law summaries you can actually read.
            A five-question finder when you&rsquo;re not sure what to try.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/finder" className="btn-primary !px-8 !py-3.5 text-base" title="Answer five questions to get strain matches">
              Find a strain for me
            </Link>
            <Link href="/assistant" className="btn-secondary !px-7 !py-3.5 text-base" title="Ask about strains, terpenes, or cannabis laws">
              Ask a question
            </Link>
          </motion.div>
        </motion.div>

        {/* stats */}
        <motion.div {...fadeUp} className="mx-auto mt-20 grid max-w-3xl grid-cols-3 gap-4">
          {[
            { n: strains.length, suffix: "", label: "strains profiled" },
            { n: countries.length, suffix: "", label: "countries covered" },
            { n: totalReviews, suffix: "+", label: "reader ratings" },
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
          {[...marqueeItems, ...marqueeItems].map((item, i) =>
            item.href ? (
              <Link
                key={i}
                href={item.href}
                className="display shrink-0 text-lg text-ink-dim/60 transition-colors duration-200 hover:text-emerald"
                tabIndex={-1}
              >
                {item.name} <span className="ml-8 text-emerald/40">✦</span>
              </Link>
            ) : (
              <span key={i} className="display shrink-0 text-lg text-ink-dim/60">
                {item.name} <span className="ml-8 text-emerald/40">✦</span>
              </span>
            )
          )}
        </div>
      </div>

      {/* ================= FEATURED ================= */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <motion.div {...fadeUp} className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Strain library</p>
            <h2 className="mt-2 text-4xl font-semibold sm:text-5xl">Highest-rated strains</h2>
          </div>
          <Link href="/strains" className="link-quiet hidden text-sm text-emerald sm:block" title="Browse all cannabis strains">
            See all {strains.length} strains →
          </Link>
        </motion.div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={enter({ scale: 0.96, filter: "blur(6px)" })}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
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
          <p className="eyebrow text-center !text-amber">How it works</p>
          <h2 className="mt-2 text-center text-4xl font-semibold sm:text-5xl">
            Three steps to a better pick
          </h2>
        </motion.div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { n: "01", title: "Say what you want", body: "Your experience, the effects you're after, when you'll use it, flavor preferences, and how strong you like it. Takes about thirty seconds.", href: "/finder" },
            { n: "02", title: "See matches with reasons", body: "We score every strain against your answers and show why each one landed — not just a list of names.", href: "/finder" },
            { n: "03", title: "Check the law first", body: "Before you buy or travel, read the country guide so you know what's allowed where you're going.", href: "/laws" },
          ].map((step, i) => (
            <motion.div
              key={step.n}
              initial={enter()}
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
            { href: "/assistant", title: "Cannabis Q&A", body: "Type a question about strains, terpenes, or the law. Answers cite the pages they came from.", accent: "text-emerald", icon: <IconAssistant /> },
            { href: "/map", title: "Where It's Legal", body: `${countries.length} countries sorted by status — ${legalCount} allow recreational use. Tap through for full rules and city notes.`, accent: "text-amber", icon: <IconGlobe /> },
            { href: "/tools", title: "Dosing Calculators", body: "Work out THC in a joint, CBD per dropper, edible strength per serving, or how long a tolerance break might take.", accent: "text-clay", icon: <IconDrop /> },
            { href: "/laws", title: "Law Guides", body: "Plain-English summaries of possession, medical access, and penalties — with a date on when we last checked.", accent: "text-sky", icon: <IconScale /> },
          ].map((p, i) => (
            <motion.div
              key={p.href}
              initial={enter()}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link href={p.href} className="card block h-full p-6">
                <span className={`inline-block ${p.accent}`}>{p.icon}</span>
                <h3 className={`mt-3 text-xl font-semibold ${p.accent}`}>{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{p.body}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= LEGAL SNAPSHOT ================= */}
      <section className="border-y border-line bg-surface/60">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <motion.p {...fadeUp} className="eyebrow">
            Cannabis laws
          </motion.p>
          <motion.h2 {...fadeUp} className="mt-2 text-4xl font-semibold sm:text-5xl">
            Is weed legal where you are?
          </motion.h2>
          <motion.div {...fadeUp} className="mt-7 flex flex-wrap gap-2.5">
            {countries.map((c) => (
              <Link
                key={c.code}
                href={`/laws/${c.slug}`}
                title={`Cannabis laws in ${c.name}`}
                className="pill !py-1.5 transition-all hover:-translate-y-0.5 hover:border-emerald/40 hover:text-ink"
              >
                <span>{c.flag}</span> {c.name}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= CLOSING CTA ================= */}
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-24">
        <motion.div
          initial={enter({ scale: 0.97 })}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-ring"
        >
          <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-surface px-8 py-16 text-center sm:py-20">
            <div className="orb left-1/2 top-0 h-60 w-96 -translate-x-1/2 bg-emerald/15" aria-hidden />
            <h2 className="relative text-4xl font-semibold sm:text-6xl">
              Not sure which strain
              <br />
              <span className="text-gradient">to try next?</span>
            </h2>
            <p className="relative mx-auto mt-5 max-w-md text-ink-dim">
              Five quick questions. No account, no tracking — just a short list of strains that fit, with the reasoning spelled out.
            </p>
            <Link href="/finder" className="btn-primary relative mt-9 inline-block !px-9 !py-4 text-base" title="Start the strain finder quiz">
              Take the strain finder
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
