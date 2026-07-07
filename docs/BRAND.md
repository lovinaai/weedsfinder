# WeedsFinder Brand & Design System — LOCKED

Aesthetic: **Botanical Precision** — Apple-grade restraint on a dark forest canvas, emerald as the single signal color. Every token below is canonical. Do not introduce new colors, fonts, radii, shadows, or easing curves; extend by composing these.

## Identity

- **Wordmark:** `Weeds` in ink + `Finder` in emerald, set in Fraunces.
- **Mark:** seven-point leaf silhouette knocked out of an emerald gradient disc (`src/components/Logo.tsx`).
- **Voice:** calm, precise, science-first. Never stoner slang, never medical claims.
- **Assets:** favicon `src/app/icon.svg` (brand mark), social card `src/app/opengraph-image.tsx`, browser chrome `themeColor #0a0e0b`.

## Typography

| Role | Font | Notes |
|---|---|---|
| Display / h1–h3 | Fraunces (variable, opsz) | `letter-spacing: -0.02em`, `text-wrap: balance` |
| Body / UI | Outfit | antialiased |

Scale: hero `3.4rem → 5.5rem`, section h2 `text-4xl → 5xl`, page h1 `text-4xl → 5xl`, eyebrow `.eyebrow` (0.78rem, 0.25em tracking, uppercase, emerald).

## Color (CSS vars in `globals.css`)

- Canvas: `--bg #0a0e0b`, surfaces `--surface / -2 / -3`, hairlines `--line / --line-strong`.
- Ink: `--ink`, `--ink-dim`, `--ink-faint`.
- Brand: `--emerald #4ade80` (primary signal), `--emerald-deep`, `--amber` (secondary highlight), `--clay` (indica/warnings), `--sky` (decriminalized).
- Gradient text: emerald → lime → amber (`.text-gradient`). The only permitted multi-hue gradient.

## Materials & elevation

- `.glass` — blurred translucent chrome (header).
- `.card` — surface gradient, hairline top highlight, layered shadows `--shadow-1/2/3`, emerald glow on hover, spring lift `-3px`.
- Radii tokens only: `--r-sm .6rem`, `--r-md 1rem`, `--r-lg 1.5rem`, `--r-full`.

## Motion

- Easings: `--ease-out cubic-bezier(0.22,1,0.36,1)` (reveals), `--ease-spring cubic-bezier(0.34,1.25,0.44,1)` (touch feedback).
- Durations: `--dur-fast 160ms`, `--dur 280ms`, `--dur-slow 600ms`.
- Page load: `.rise` stagger (80ms steps). Scroll: framer-motion `whileInView`, once, `y: 24 → 0`.
- Signature moves: breathing orbs, marquee, gradient ring CTA, animated `link-quiet` underline, button press scale `0.97`.
- All motion disabled under `prefers-reduced-motion`.

## Page anatomy (every page)

1. `.eyebrow` label (`.rise`)
2. Fraunces h1 (`.rise .rise-1`)
3. One-line `text-ink-dim` subtitle
4. Content in `.card` grid, `max-w-6xl px-5`

## Buttons

- `.btn-primary` — emerald vertical gradient, inner top highlight, glow hover, press scale. One per view.
- `.btn-secondary` — hairline pill, emerald tint on hover.
- Text links — `.link-quiet` animated underline.
