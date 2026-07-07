import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import Link from "next/link";
import Logo from "@/components/Logo";
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
    default: "WeedsFinder — Cannabis Strains, Laws & Tools",
    template: "%s | WeedsFinder",
  },
  description:
    "Look up cannabis strains by effects and THC, check what's legal where you live, and run free dosing calculators. Clear guides for adults in legal markets.",
  openGraph: {
    siteName: "WeedsFinder",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e0b",
};

const nav = [
  { href: "/strains", label: "Strains", title: "Browse the cannabis strain database" },
  { href: "/finder", label: "Strain Finder", title: "Get a strain recommendation in five questions" },
  { href: "/map", label: "Legal Map", title: "See where cannabis is legal worldwide" },
  { href: "/laws", label: "Cannabis Laws", title: "Cannabis laws by country" },
  { href: "/tools", label: "Tools", title: "THC, CBD, and edible dosing calculators" },
  { href: "/assistant", label: "Q&A", title: "Ask questions about strains, terpenes, and laws" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className="atmosphere" aria-hidden />
        <header className="glass sticky top-0 z-50 border-b border-line">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
            <Link href="/" className="display flex items-center gap-2.5 text-xl font-semibold tracking-tight" title="WeedsFinder home">
              <Logo />
              <span>Weeds<span className="text-emerald">Finder</span></span>
            </Link>
            <nav className="hidden gap-6 text-sm text-ink-dim sm:flex" aria-label="Main navigation">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} title={n.title} className="link-quiet transition-colors hover:text-ink">
                  {n.label}
                </Link>
              ))}
            </nav>
            <Link href="/finder" className="btn-primary !py-2 !px-4 text-sm" title="Take the strain finder quiz">
              Find a strain
            </Link>
          </div>
          <nav className="flex justify-center gap-5 border-t border-line py-2 text-xs text-ink-dim sm:hidden" aria-label="Main navigation">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} title={n.title}>{n.label}</Link>
            ))}
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-24 border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-ink-dim">
            <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
              <div>
                <div className="display flex items-center gap-2 text-lg text-ink">
                  <Logo size={22} />
                  <span>Weeds<span className="text-emerald">Finder</span></span>
                </div>
                <p className="mt-2 max-w-sm">
                  Strain profiles, country-by-country law guides, and dosing calculators — written for people who want facts, not hype.
                </p>
              </div>
              <div className="flex gap-12">
                <div className="flex flex-col gap-2">
                  <span className="text-ink">Site map</span>
                  {nav.map((n) => (
                    <Link key={n.href} href={n.href} title={n.title} className="link-quiet w-fit hover:text-ink">{n.label}</Link>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-8 border-t border-line pt-6 text-xs leading-relaxed">
              For adults where cannabis is legal. Everything here is educational — not medical or legal advice.
              Rules change; double-check with local authorities before you buy or travel. © {new Date().getFullYear()} WeedsFinder.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
