# WeedsFinder — Startup Architecture

Mission: the definitive cannabis discovery intelligence platform. Search + maps + encyclopedia + community + AI, for cannabis.

## 1. System Architecture

```
                        ┌─────────────────────────────┐
                        │   Vercel Edge Network / CDN  │
                        └──────────────┬──────────────┘
                                       │
                        ┌──────────────▼──────────────┐
                        │  Next.js App (App Router)    │
                        │  RSC + ISR + programmatic SEO│
                        └───┬──────────┬──────────┬───┘
                            │          │          │
              ┌─────────────▼──┐  ┌────▼─────┐ ┌──▼─────────────┐
              │ Supabase       │  │ Redis    │ │ AI Layer       │
              │ Postgres +     │  │ (cache,  │ │ Claude API +   │
              │ Auth + Storage │  │ ratelimit│ │ pgvector RAG   │
              │ + pgvector     │  │ sessions)│ │ embeddings     │
              └────────────────┘  └──────────┘ └────────────────┘
```

- **API-first**: all data flows through typed API routes (`/api/*`) and Supabase RPC. Same APIs power web, future mobile apps, and the API marketplace.
- **Rendering**: strain/law/city pages are statically generated (ISR) for SEO; community + tools are client-interactive.
- **Scale path**: Postgres read replicas → Redis cache layer → search moves to dedicated engine (Typesense/Meilisearch) at ~1M strains; pgvector → dedicated vector DB at ~50M embeddings.

## 2. Database Schema

Full SQL in [`supabase/migrations/0001_init.sql`](../supabase/migrations/0001_init.sql). Tables: `strains`, `terpenes`, `strain_terpenes`, `products`, `brands`, `countries`, `cities`, `businesses`, `profiles`, `reviews`, `posts`, `comments`, `likes`, `follows`, `badges`, `user_badges`, `favorites`, `embeddings` (pgvector). Row Level Security on all user-generated content.

## 3. UI Design System — "Botanical Noir"

- **Canvas**: near-black green-tinted `#0B0F0C`; surfaces `#11170F` / `#161D14`.
- **Accents**: emerald `#4ADE80` (primary), amber `#F5C518` (ratings/highlights), clay `#D97757` (warnings/legality).
- **Type**: Fraunces (display serif, optical sizing) + Outfit (body). Numeric data in tabular figures.
- **Texture**: grain overlay, radial glow gradients, hairline `rgba(255,255,255,.08)` borders.
- **Motion**: staggered page-load reveals, hover lift on cards, spring transitions (Framer Motion).
- **Components**: StrainCard, LegalBadge, TerpeneBar, RatingStars, StatPill — all in `src/components`.

## 4. SEO Strategy

- Programmatic pages: `/strains/[slug]`, `/laws/[country]`, `/laws/[country]/[city]` — each with unique generated metadata, `Product`/`FAQPage`/`BreadcrumbList` schema.org JSON-LD.
- `sitemap.ts` auto-generates from DB; `robots.ts` included.
- Internal linking automation: every strain page links related strains (shared effects/terpenes), every law page links neighbor countries + strains legal there.
- Content targets long-tail queries: "is weed legal in X", "[strain] THC level", "best strain for sleep".

## 5. Development Roadmap

| Phase | Scope | Status |
|---|---|---|
| 0 — Foundation (now) | Design system, schema, strain DB, finder, tools, laws, SEO engine | ✅ this repo |
| 1 — Data + Auth | Supabase live, OAuth + email login, profiles, reviews, 10k strains ingested | next |
| 2 — AI | Claude-powered assistant, pgvector RAG over strain/law corpus | |
| 3 — Community | Posts, follows, badges, moderation, admin CMS | |
| 4 — Monetization | Business listings, affiliate links, premium tier, public API | |
| 5 — Scale | Search engine, read replicas, mobile apps, i18n | |

## 6. Folder Structure

```
src/
  app/                 # routes (App Router)
    strains/[slug]/    # programmatic strain pages
    laws/[country]/    # programmatic legal pages
    finder/            # AI strain finder quiz
    tools/[tool]/      # calculators + comparison
    map/               # global legality map
    api/assistant/     # AI assistant endpoint (RAG-ready)
    sitemap.ts robots.ts
  components/          # design-system components
  data/                # seed dataset (moves to Supabase in Phase 1)
  lib/                 # recommendation engine, supabase client, utils
supabase/migrations/   # SQL schema
docs/                  # this file
```
