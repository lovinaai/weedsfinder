import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://weedsfinder.com"),
  title: {
    default: "WeedsFinder — Cannabis Discovery Intelligence",
    template: "%s | WeedsFinder",
  },
  description:
    "Discover strains, laws, tools, and knowledge. The world's cannabis discovery intelligence platform: strain database, AI finder, global legality map, and calculators.",
  openGraph: {
    siteName: "WeedsFinder",
    type: "website",
  },
};

const nav = [
  { href: "/strains", label: "Strains" },
  { href: "/finder", label: "AI Finder" },
  { href: "/map", label: "World Map" },
  { href: "/laws", label: "Laws" },
  { href: "/tools", label: "Tools" },
  { href: "/assistant", label: "Assistant" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className="atmosphere" aria-hidden />
        <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
            <Link href="/" className="display text-xl font-semibold tracking-tight">
              Weeds<span className="text-emerald">Finder</span>
            </Link>
            <nav className="hidden gap-6 text-sm text-ink-dim sm:flex">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="transition-colors hover:text-ink">
                  {n.label}
                </Link>
              ))}
            </nav>
            <Link href="/finder" className="btn-primary !py-2 !px-4 text-sm">
              Find my strain
            </Link>
          </div>
          <nav className="flex justify-center gap-5 border-t border-line py-2 text-xs text-ink-dim sm:hidden">
            {nav.map((n) => (
              <Link key={n.href} href={n.href}>{n.label}</Link>
            ))}
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-24 border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-ink-dim">
            <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
              <div>
                <div className="display text-lg text-ink">
                  Weeds<span className="text-emerald">Finder</span>
                </div>
                <p className="mt-2 max-w-sm">
                  Cannabis discovery intelligence — strains, laws, tools, and community knowledge for the whole planet.
                </p>
              </div>
              <div className="flex gap-12">
                <div className="flex flex-col gap-2">
                  <span className="text-ink">Explore</span>
                  {nav.map((n) => (
                    <Link key={n.href} href={n.href} className="hover:text-ink">{n.label}</Link>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-8 border-t border-line pt-6 text-xs leading-relaxed">
              For adults in jurisdictions where cannabis is legal. Information is educational, not medical or legal advice.
              Laws change — always verify locally. © {new Date().getFullYear()} WeedsFinder.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
