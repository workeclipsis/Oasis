-- ═══════════════════════════════════════════════════════════════
-- OASIS — Reviews schema + Row-Level Security
-- Paste this whole file into: Supabase → SQL Editor → New query → Run
-- ═══════════════════════════════════════════════════════════════

-- 1) Table ---------------------------------------------------------
create table if not exists public.reviews (
  id           uuid primary key default gen_random_uuid(),
  name         text not null check (char_length(name) between 2 and 80),
  email        text not null check (char_length(email) between 5 and 120),
  college      text check (char_length(college) <= 100),
  service      text check (char_length(service) <= 60),
  rating       int  not null check (rating between 1 and 5),
  review       text not null check (char_length(review) between 10 and 800),
  project_link text check (char_length(project_link) <= 200),
  status       text not null default 'pending'
                 check (status in ('pending','approved','rejected')),
  created_at   timestamptz not null default now(),
  decided_at   timestamptz
);

alter table public.reviews enable row level security;

-- 2) Admins table (who may manage reviews) -------------------------
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.admin_users enable row level security;

-- admins can read the admin list (to self-check); no public access
drop policy if exists "admins read admin_users" on public.admin_users;
create policy "admins read admin_users" on public.admin_users
  for select using (auth.uid() = user_id);

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

-- 3) Policies on reviews -------------------------------------------

-- Public (anon) may INSERT, but only a pending row with no decided_at.
drop policy if exists "public can submit pending" on public.reviews;
create policy "public can submit pending" on public.reviews
  for insert to anon, authenticated
  with check (status = 'pending' and decided_at is null);

-- Admins may read/update/delete everything.
drop policy if exists "admins manage all" on public.reviews;
create policy "admins manage all" on public.reviews
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- 4) Public-safe VIEW — approved rows, safe columns only ----------
--    (No email / status / decided_at exposed.)
create or replace view public.public_reviews
with (security_invoker = off) as
  select id, name, college, service, rating, review, project_link, created_at
  from public.reviews
  where status = 'approved'
  order by coalesce(decided_at, created_at) desc;

grant select on public.public_reviews to anon, authenticated;

-- ═══════════════════════════════════════════════════════════════
-- 5) Make yourself an admin
--    a) Create your user: Supabase → Authentication → Users → Add user
--    b) Copy that user's UID
--    c) Run (replace the UID):
--       insert into public.admin_users (user_id) values ('YOUR-UID-HERE');
-- ═══════════════════════════════════════════════════════════════
