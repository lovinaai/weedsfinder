# WeedsFinder Strain Encyclopedia — Design Spec

## 1. Objective

Transform the existing Phase-0 WeedsFinder app into a Wikipedia-level cannabis strain encyclopedia. The first deliverable is 120 iconic, fully-detailed strains served from Supabase, with rich category pages, programmatic SEO, and a detail-page experience that surfaces genetics, chemistry, effects, growing, consumption tips, secrets, and expert recommendations.

**Success criteria**
- 120 strains live in Supabase with complete, consistent, SEO-rich profiles.
- Strain detail pages render every field with structured schema.org JSON-LD.
- Category pages exist for type (`/strains/sativa`, etc.), effects (`/effects/sleep`, etc.), terpenes (`/terpenes/myrcene`, etc.), and use cases (`/best-for/daytime`, etc.).
- `/strains` browser supports filtering by type, effect, terpene, THC range, best time, and experience level.
- Sitemap, robots, and metadata are auto-generated from the database.
- No regression to existing homepage, finder, assistant, laws, map, or tools.

## 2. Current State

- Next.js 16 App Router + Tailwind CSS v4 + Supabase client installed.
- `src/data/strains.ts` holds 20 static strains and `getStrain` / `relatedStrains` helpers.
- `src/data/terpenes.ts` holds 8 hard-coded terpenes.
- `supabase/migrations/0001_init.sql` already defines `strains`, `terpenes`, `strain_terpenes`, reviews, community tables, and RLS.
- Existing pages: `/strains`, `/strains/[slug]`, `/finder`, `/tools`, `/laws`, `/map`, `/assistant`.
- No live Supabase connection is required for Phase 0; seed script will push data when a project is linked.

## 3. Schema Additions

Add the following columns to the existing `strains` table. All new fields are nullable unless marked `not null default`.

```sql
alter table strains add column cbn numeric(4,1);
-- Existing thc/cbd columns remain as the typical/primary value for backwards compatibility.
-- min/max columns add the range detail used for filters and richer display.
alter table strains add column thc_min numeric(4,1);
alter table strains add column thc_max numeric(4,1);
alter table strains add column cbd_min numeric(4,1);
alter table strains add column cbd_max numeric(4,1);
alter table strains add column negative_effects text[] not null default '{}';
alter table strains add column medical_conditions text[] not null default '{}';
alter table strains add column recreational_uses text[] not null default '{}';
alter table strains add column mood_tags text[] not null default '{}';
alter table strains add column onset_minutes int;
alter table strains add column duration_hours int;
alter table strains add column grow_difficulty text check (grow_difficulty in ('easy','moderate','hard'));
alter table strains add column grow_height_cm int;
alter table strains add column grow_yield_g_m2 int;
alter table strains add column flowering_weeks int;
alter table strains add column climate text check (climate in ('indoor','outdoor','greenhouse','versatile'));
alter table strains add column awards text[] not null default '{}';
alter table strains add column aliases text[] not null default '{}';
alter table strains add column excerpt text;                 -- 160 char meta / card summary
alter table strains add column expert_note text;             -- "why connoisseurs love it"
alter table strains add column hidden_truth text;            -- little-known fact / myth-busting
alter table strains add column pro_tips text[] not null default '{}';
alter table strains add column beginner_tips text[] not null default '{}';
alter table strains add column pairing_suggestions text[] not null default '{}';
alter table strains add column vibe_score int check (vibe_score between 1 and 10);
alter table strains add column potency_score int check (potency_score between 1 and 10);
alter table strains add column flavor_score int check (flavor_score between 1 and 10);
alter table strains add column medical_score int check (medical_score between 1 and 10);
alter table strains add column overall_score numeric(3,2);  -- weighted average of above
alter table strains add column is_daytime boolean default false;
alter table strains add column is_nighttime boolean default false;
alter table strains add column is_social boolean default false;
alter table strains add column is_focus boolean default false;
alter table strains add column is_creative boolean default false;
```

### New reference tables

```sql
create table effects (
  id serial primary key,
  slug text unique not null,
  name text unique not null,
  category text not null check (category in ('medical','recreational','negative')),
  description text not null,
  icon text,
  meta_title text,
  meta_description text,
  popular boolean default false
);

create table strain_effects (
  strain_id uuid references strains on delete cascade,
  effect_id int references effects on delete cascade,
  intensity int not null check (intensity between 1 and 10),
  primary key (strain_id, effect_id)
);

alter table terpenes add column slug text unique;
alter table terpenes add column description text;
alter table terpenes add column benefits text[] not null default '{}';
alter table terpenes add column aroma_notes text[] not null default '{}';
alter table terpenes add column flavor_notes text[] not null default '{}';
alter table terpenes add column also_found_in text;
alter table terpenes add column medical_notes text;
alter table terpenes add column meta_title text;
alter table terpenes add column meta_description text;
alter table terpenes add column color text; -- already exists, keep

-- Use-case pages (daytime, nighttime, social, focus, creativity, pain, anxiety, sleep)
create table use_cases (
  id serial primary key,
  slug text unique not null,
  name text not null,
  description text not null,
  meta_title text,
  meta_description text,
  filter_type text not null check (filter_type in ('boolean_field','effect','medical_condition')),
  filter_value text not null
);
```

### Indexes for performance

```sql
create index on strains using gin (negative_effects);
create index on strains using gin (medical_conditions);
create index on strains using gin (mood_tags);
create index on strains using gin (aliases);
create index on strains (thc_min, thc_max);
create index on strains (overall_score desc nulls last);
create index on strain_effects (effect_id, intensity desc);
```

## 4. Dataset Design

### 120 iconic strains

The seed set is organized into tiers so coverage is balanced and search intent is maximized:

| Tier | Count | Examples |
|------|-------|----------|
| Legendary / foundational | 30 | Blue Dream, OG Kush, Sour Diesel, Northern Lights, White Widow, Durban Poison, Afghani, Thai, Hindu Kush, Skunk #1 |
| Cup winners / modern icons | 35 | GSC, Gelato, Runtz, Wedding Cake, GG4, Blueberry, AK-47, Cheese, Chocolope, Amnesia Haze |
| Medical / CBD rich | 15 | ACDC, Harlequin, Charlotte's Web, Cannatonic, Ringo's Gift, Pennywise, Remedy, Harle-Tsu |
| Dessert / exotics | 20 | Zkittlez, Purple Punch, Ice Cream Cake, Mac, Biscotti, Gary Payton, London Pound Cake, Sherblato |
| Productive / daytime | 20 | Green Crack, Jack Herer, Super Lemon Haze, Mimosa, Tangie, Strawberry Cough, Ghost Train Haze, Clementine |

### Per-strain fields (generated)

Every strain receives values for:
- Identity: slug, name, aliases, breeder, origin, lineage (2–4 parents), awards (0–5), genetics.
- Chemistry: thc_min/max, cbd_min/max, cbg, cbn (where relevant).
- Experience: effects (4–6 positive + intensities), negative_effects (2–4), medical_conditions (3–6), recreational_uses, mood_tags, best_time, experience_level, onset_minutes, duration_hours.
- Sensory: taste (3–5), aroma (3–5), terpenes (3 dominant with percentages).
- Scores: vibe, potency, flavor, medical, overall (1–10).
- Use-case flags: is_daytime, is_nighttime, is_social, is_focus, is_creative.
- Cultivation: grow_difficulty, grow_height_cm, grow_yield_g_m2, flowering_weeks, climate.
- Content: description (120–180 words), excerpt (≤160 chars), expert_note, hidden_truth, pro_tips (2–3), beginner_tips (2–3), pairing_suggestions (2–3).

### Reference data

- **Effects**: 40+ entries covering medical (pain, anxiety, insomnia, inflammation, nausea, depression, ptsd, epilepsy, appetite loss, muscle spasms), recreational (euphoric, relaxed, energetic, focused, creative, talkative, giggly, hungry, sleepy, uplifted), and negative (dry mouth, dry eyes, dizzy, paranoid, anxious, headache).
- **Terpenes**: expand from 8 to 16: Myrcene, Limonene, Caryophyllene, Pinene, Terpinolene, Linalool, Humulene, Ocimene, plus Bisabolol, Valencene, Geraniol, Camphene, Carene, Phellandrene, Sabinene, Nerolidol.
- **Use cases**: daytime, nighttime, social, focus, creativity, pain relief, anxiety relief, sleep, appetite, nausea, stress, fatigue.

## 5. Page Architecture

### Existing pages (update)

- `/strains` — upgrade browser with faceted filters (type, effect, terpene, THC range, best time, experience). Add "featured strains" and "trending" sections.
- `/strains/[slug]` — rebuild detail page into a tabbed or scroll-section layout: hero, chemistry, effects chart, terpenes, sensory, grow info, expert note, hidden truth, tips, pairings, related strains.

### New category pages

| Route | Source | Content |
|-------|--------|---------|
| `/strains/sativa`, `/strains/indica`, `/strains/hybrid` | `strains.genetics` | Hero, strain grid, SEO copy, related categories. |
| `/effects/[slug]` | `effects` + `strain_effects` | Explanation of effect, top strains by intensity, related effects. |
| `/terpenes/[slug]` | `terpenes` + `strain_terpenes` | Terpene science, aroma/flavor, benefits, strains dominant in it. |
| `/best-for/[slug]` | `use_cases` | Curated lists: daytime, nighttime, social, focus, creativity, pain, anxiety, sleep, etc. |
| `/compare` | query params | Side-by-side strain comparison tool (up to 3 strains). |

All category pages receive auto-generated metadata, breadcrumb JSON-LD, and canonical URLs.

### Detail-page sections

1. **Hero**: name, aliases, genetics badge, overall score, rating, breeder/origin, excerpt, CTA (find similar, compare, favorite).
2. **Chemistry**: THC/CBD/CBG/CBN ranges, potency score, experience level.
3. **Effects radar**: positive effects with intensity bars; negative effects with likelihood.
4. **Terpenes**: 3 dominant terpenes with percentages, aroma/flavor tags, links to terpene pages.
5. **Sensory**: taste, aroma, appearance notes.
6. **Best for / when**: best time, use-case flags, medical conditions, recreational uses.
7. **Expert note & hidden truth**: voice-driven content that builds authority.
8. **Tips**: beginner tips, pro tips, pairings.
9. **Grow guide**: difficulty, height, yield, flowering time, climate.
10. **Related strains**: algorithmic + curated recommendations.
11. **Reviews preview**: link to reviews once auth/community is live.

## 6. Components & UI

Reusable components in `src/components/encyclopedia/`:

- `StrainHero` — hero section with score, badges, actions.
- `ChemistryPanel` — THC/CBD/CBG/CBN bars and potency badge.
- `EffectsChart` — horizontal intensity bars for effects.
- `TerpeneCloud` — terpene cards with percentages.
- `SensoryStrip` — taste/aroma pills.
- `GrowCard` — cultivation stats.
- `TipAccordion` — beginner/pro/pairing tips.
- `RelatedStrains` — horizontal carousel of strain cards.
- `CategoryHero` — used on all category pages.
- `StrainFilterBar` — faceted filters for `/strains`.
- `Breadcrumbs` — JSON-LD + visual breadcrumb.

All new components follow the existing Botanical Noir design system (dark green canvas, emerald/amber/clay accents, Fraunces + Outfit fonts).

## 7. SEO & Metadata Strategy

### Metadata

- Each `/strains/[slug]` page generates unique `title`, `description`, OpenGraph, Twitter card, and canonical URL.
- Category pages generate metadata from reference table fields (`meta_title`, `meta_description`).

### Structured data

- `Strain` detail: use `Article` for the strain profile and `FAQPage` for tips/truths.
- `BreadcrumbList` on every page.
- `ItemList` for category grids.
- `AggregateRating` for strain ratings.

### Programmatic SEO

- `sitemap.ts` queries all strains, effects, terpenes, use cases, and category pages.
- `robots.ts` stays permissive.
- Internal linking: every strain links to its dominant terpenes, top effects, and similar strains; every category page links to related categories and top strains.

## 8. Data Ingestion Workflow

1. **Generate dataset**: a TypeScript script (`scripts/generate-strains.ts`) outputs `generated-strains.json` with 120 fully-populated strain objects plus reference data for effects, terpenes, and use cases.
2. **Validation**: install `zod` as a dev dependency and run schemas over the JSON to ensure every required field is present and within range.
3. **Seed to Supabase**: `scripts/seed-supabase.ts` reads the JSON and upserts into `strains`, `terpenes`, `effects`, `use_cases`, `strain_terpenes`, and `strain_effects` using the service-role key.
4. **Local fallback**: when `NEXT_PUBLIC_SUPABASE_URL` is not set, the app falls back to a static import of `generated-strains.json` so development and static builds keep working.

## 9. Implementation Phases

This spec is intentionally scoped to one implementation plan. The work is split into parallel-safe tracks:

1. **Schema & types** — migration file, TypeScript types, Zod schemas.
2. **Dataset generation** — 120 strains + reference tables.
3. **Supabase seeding** — seed script and validation.
4. **Data layer** — server fetches, fallback, caching helpers.
5. **Strain detail page** — rebuild `/strains/[slug]`.
6. **Strain browser** — upgrade `/strains` with filters.
7. **Category pages** — type, effect, terpene, use-case routes.
8. **Compare tool** — `/compare` page.
9. **SEO plumbing** — sitemap, metadata, JSON-LD.
10. **QA** — typecheck, build, sample-page audit.

## 10. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Synthetic data feels generic | Use distinctive voice, hidden truths, expert notes, and specific lineage/awards. |
| Supabase not linked yet | Seed script can run later; app falls back to generated JSON for dev/build. |
| Page bloat hurts performance | Use Next.js dynamic imports for heavy chart/visual components; paginate grids. |
| Category pages compete with detail pages | Clear differentiation: category pages target broad intent, detail pages target strain-specific intent. |
| Break existing pages | Keep existing routes intact; only enhance `/strains` and `/strains/[slug]`. |

## 11. Open Questions

- Should category pages use ISR/SSG with revalidation, or server-render on demand?
- Do we want an `/admin/strains` preview page for reviewing generated content before seeding?
- Should we pre-generate OG images for each strain, or use dynamic text-on-image generation?

These can be resolved during implementation planning.
