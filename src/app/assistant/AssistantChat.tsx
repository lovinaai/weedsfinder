"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Source = { type: "strain" | "law"; title: string; url: string };
type Msg = { role: "user" | "assistant"; text: string; sources?: Source[] };

const suggestions = [
  "Is cannabis legal in Germany?",
  "What strain helps with sleep?",
  "What does limonene smell like?",
  "Something uplifting for daytime use",
];

export default function AssistantChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function ask(question: string) {
    if (!question.trim() || busy) return;
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        res.ok
          ? { role: "assistant", text: data.answer, sources: data.sources }
          : { role: "assistant", text: "That didn't come through — try asking again in different words." },
      ]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "Connection dropped. Check your network and try again." }]);
    } finally {
      setBusy(false);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col px-5 py-12" style={{ minHeight: "calc(100vh - 8rem)" }}>
      <p className="eyebrow rise text-center">Questions &amp; answers</p>
      <h1 className="rise rise-1 mt-2 text-center text-4xl font-semibold sm:text-5xl">
        Ask about <span className="text-emerald">cannabis</span>
      </h1>
      <p className="mx-auto mt-3 max-w-md text-center text-ink-dim">
        Strains, terpenes, legal status — type a question and get an answer pulled from our guides, with links to read more.
      </p>

      <div className="mt-8 flex-1 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-wrap justify-center gap-2.5 pt-6">
            {suggestions.map((s) => (
              <button key={s} onClick={() => ask(s)} className="pill !px-4 !py-2 !text-sm hover:border-emerald/40 hover:text-ink">
                {s}
              </button>
            ))}
          </div>
        )}
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <div
              className={
                m.role === "user"
                  ? "max-w-[80%] rounded-2xl rounded-br-sm bg-emerald/15 px-4 py-3 text-sm"
                  : "card max-w-[85%] rounded-2xl rounded-bl-sm px-4 py-3 text-sm"
              }
            >
              <p className="leading-relaxed">{m.text}</p>
              {m.sources && m.sources.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 border-t border-line pt-3">
                  {m.sources.map((s) => (
                    <Link key={s.url} href={s.url} className="pill !py-1 !text-xs hover:border-emerald/40 hover:text-ink">
                      {s.type === "strain" ? "🌿" : "⚖️"} {s.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {busy && <p className="text-sm text-ink-dim animate-pulse">Looking that up…</p>}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); ask(input); }}
        className="sticky bottom-4 mt-8 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Is weed legal in Canada?"
          className="w-full !rounded-full !px-5 !py-3 shadow-lg"
          maxLength={500}
          aria-label="Your cannabis question"
        />
        <button type="submit" disabled={busy || !input.trim()} className="btn-primary shrink-0 disabled:opacity-40" aria-label="Submit question">
          Send
        </button>
      </form>
    </div>
  );
}
