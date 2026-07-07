import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { tools, getTool } from "../registry";
import ToolPanel from "./ToolPanel";

type Props = { params: Promise<{ tool: string }> };

export function generateStaticParams() {
  return tools.map((t) => ({ tool: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool } = await params;
  const t = getTool(tool);
  if (!t) return {};
  return {
    title: `Free ${t.name} — Cannabis Dosing Tool`,
    description: t.blurb,
    alternates: { canonical: `/tools/${t.slug}` },
  };
}

export default async function ToolPage({ params }: Props) {
  const { tool } = await params;
  const t = getTool(tool);
  if (!t) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <nav className="text-sm text-ink-dim" aria-label="Breadcrumb">
        <Link href="/tools" className="hover:text-ink">Cannabis tools</Link> / {t.name}
      </nav>
      <h1 className="mt-4 text-4xl font-semibold">
        <span className="mr-3">{t.icon}</span>{t.name}
      </h1>
      <p className="mt-3 text-ink-dim">{t.blurb}</p>
      <div className="card mt-8 p-6">
        <Suspense>
          <ToolPanel tool={t.slug} />
        </Suspense>
      </div>
      <p className="mt-6 text-xs text-ink-dim/70">
        Estimates for learning purposes. Everyone responds differently — start with less than you think you need.
      </p>
    </div>
  );
}
