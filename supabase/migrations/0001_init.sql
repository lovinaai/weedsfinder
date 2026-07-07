-- WeedsFinder core schema. Designed for 500k+ strains, 100M+ users.
create extension if not exists "uuid-ossp";
create extension if not exists vector;

-- ============ CATALOG ============
create table strains (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  genetics text check (genetics in ('indica','sativa','hybrid')),
  lineage text[],                      -- parent strain names
  breeder text,
  origin text,
  thc numeric(4,1),                    -- percent
  cbd numeric(4,1),
  cbg numeric(4,1),
  effects text[] not null default '{}',
  taste text[] not null default '{}',
  aroma text[] not null default '{}',
  medical_info text,
  best_time text check (best_time in ('morning','afternoon','evening','night')),
  experience_level text check (experience_level in ('beginner','intermediate','expert')),
  description text,
  image_url text,
  rating_avg numeric(3,2) default 0,   -- denormalized, updated by trigger
  rating_count int default 0,
  created_at timestamptz default now()
);
create index on strains using gin (effects);
create index on strains (genetics, thc);

create table terpenes (
  id serial primary key,
  name text unique not null,
  aroma text,
  effects text[],
  also_found_in text
);

create table strain_terpenes (
  strain_id uuid references strains on delete cascade,
  terpene_id int references terpenes on delete cascade,
  dominance int default 1,             -- 1 = dominant
  primary key (strain_id, terpene_id)
);

create table brands (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  country text
);

create table products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  category text not null,              -- flower, edible, vape, concentrate, accessory
  brand_id uuid references brands,
  strain_id uuid references strains,
  specifications jsonb default '{}',
  rating_avg numeric(3,2) default 0,
  rating_count int default 0
);

-- ============ GEO / LEGAL ============
create table countries (
  code text primary key,               -- ISO 3166-1 alpha-2
  name text not null,
  slug text unique not null,
  legal_status text not null,          -- legal | medical | decriminalized | illegal
  medical_status boolean default false,
  recreational_status boolean default false,
  rules text,
  updated_at timestamptz default now()
);

create table cities (
  id uuid primary key default uuid_generate_v4(),
  slug text not null,
  name text not null,
  country_code text references countries,
  guide text,
  unique (country_code, slug)
);

create table businesses (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  type text,                           -- dispensary, coffeeshop, club, doctor
  city_id uuid references cities,
  lat numeric, lng numeric,
  verified boolean default false,
  listing_tier text default 'free'     -- monetization: free | featured | premium
);

-- ============ USERS / COMMUNITY ============
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null,
  avatar_url text,
  bio text,
  preferences jsonb default '{}',      -- finder answers, tolerance, favorites
  level int default 1,
  xp int default 0,
  created_at timestamptz default now()
);

create table reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles on delete cascade,
  strain_id uuid references strains on delete cascade,
  product_id uuid references products on delete cascade,
  rating int not null check (rating between 1 and 5),
  body text,
  created_at timestamptz default now(),
  check (strain_id is not null or product_id is not null)
);
create index on reviews (strain_id, created_at desc);

create table posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles on delete cascade,
  title text, body text not null,
  created_at timestamptz default now()
);
create table comments (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references posts on delete cascade,
  user_id uuid references profiles on delete cascade,
  body text not null,
  created_at timestamptz default now()
);
create table likes (
  user_id uuid references profiles on delete cascade,
  post_id uuid references posts on delete cascade,
  primary key (user_id, post_id)
);
create table follows (
  follower_id uuid references profiles on delete cascade,
  followee_id uuid references profiles on delete cascade,
  primary key (follower_id, followee_id)
);
create table favorites (
  user_id uuid references profiles on delete cascade,
  strain_id uuid references strains on delete cascade,
  primary key (user_id, strain_id)
);
create table badges (
  id serial primary key, slug text unique, name text, description text
);
create table user_badges (
  user_id uuid references profiles on delete cascade,
  badge_id int references badges on delete cascade,
  awarded_at timestamptz default now(),
  primary key (user_id, badge_id)
);

-- ============ AI / RAG ============
create table embeddings (
  id uuid primary key default uuid_generate_v4(),
  source_type text not null,           -- strain | law | guide | post
  source_id text not null,
  content text not null,
  embedding vector(1536)
);
create index on embeddings using ivfflat (embedding vector_cosine_ops);

-- ============ TRIGGERS ============
create or replace function bump_strain_rating() returns trigger as $$
begin
  update strains s set
    rating_count = (select count(*) from reviews where strain_id = s.id),
    rating_avg   = coalesce((select avg(rating) from reviews where strain_id = s.id), 0)
  where s.id = coalesce(new.strain_id, old.strain_id);
  return null;
end $$ language plpgsql;
create trigger reviews_rating after insert or update or delete on reviews
  for each row execute function bump_strain_rating();

-- ============ RLS ============
alter table profiles enable row level security;
alter table reviews enable row level security;
alter table posts enable row level security;
alter table comments enable row level security;
alter table likes enable row level security;
alter table follows enable row level security;
alter table favorites enable row level security;

create policy "public read" on profiles for select using (true);
create policy "own profile" on profiles for update using (auth.uid() = id);
create policy "public read" on reviews for select using (true);
create policy "own reviews" on reviews for all using (auth.uid() = user_id);
create policy "public read" on posts for select using (true);
create policy "own posts" on posts for all using (auth.uid() = user_id);
create policy "public read" on comments for select using (true);
create policy "own comments" on comments for all using (auth.uid() = user_id);
create policy "own likes" on likes for all using (auth.uid() = user_id);
create policy "public read likes" on likes for select using (true);
create policy "own follows" on follows for all using (auth.uid() = follower_id);
create policy "public read follows" on follows for select using (true);
create policy "own favorites" on favorites for all using (auth.uid() = user_id);
