-- ============================================================
-- PICTORA — Admin / editable packages setup
-- Run this once in the Supabase SQL Editor.
-- ============================================================

-- A tiny key/value store. We keep the whole packages structure
-- (packageData + comboBenefits) as one JSON document under key = 'packages'.
create table if not exists public.site_config (
  key         text primary key,
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------
alter table public.site_config enable row level security;

-- Anyone (anon) can READ the config so the public site can load prices.
drop policy if exists "site_config read" on public.site_config;
create policy "site_config read"
  on public.site_config
  for select
  using (true);

-- Anyone with the anon key can WRITE.
-- NOTE: This is a convenience setup for a small site protected only by the
-- admin page password. For real security, replace the two policies below with
-- `to authenticated` and log admins in via Supabase Auth.
drop policy if exists "site_config insert" on public.site_config;
create policy "site_config insert"
  on public.site_config
  for insert
  with check (true);

drop policy if exists "site_config update" on public.site_config;
create policy "site_config update"
  on public.site_config
  for update
  using (true)
  with check (true);

-- The 'packages' row is created automatically the first time you press
-- "Save changes" in the admin panel (it publishes the current site defaults).
