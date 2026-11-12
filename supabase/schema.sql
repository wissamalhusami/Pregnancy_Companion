-- ==========================================================================
-- RIFQAH — Supabase schema, Row Level Security and signup provisioning
-- --------------------------------------------------------------------------
-- Run this once in the Supabase dashboard: SQL Editor → New query → Run.
-- Safe to re-run: every statement is idempotent.
--
-- Security model
--   * `profiles` holds only the minimum needed to render an account: display
--     name, optional avatar URL and preferred language.
--   * RLS is enabled and every policy is scoped to `auth.uid()`. There is no
--     policy that lets a user read, list or modify another user's row.
--   * No passwords are ever stored here — Supabase Auth (auth.users) owns
--     credentials and hashes them itself.
--   * The service-role key is never used by the browser application.
-- ==========================================================================

-- --------------------------------------------------------------- profiles --
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text check (char_length(full_name) <= 120),
  avatar_url text check (char_length(avatar_url) <= 2048),
  preferred_language text not null default 'ar' check (preferred_language in ('ar', 'en')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'RIFQAH account profile: one row per authenticated user.';

alter table public.profiles enable row level security;
alter table public.profiles force row level security;

-- Read your own profile only.
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

-- Create your own profile row only.
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

-- Update your own profile row only (cannot reassign the row to another user).
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Deliberately no DELETE policy: profile rows are removed with the auth user
-- via ON DELETE CASCADE, so a client can never orphan or wipe audit trails.

-- ------------------------------------------------------- updated_at helper --
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row
  execute function public.touch_updated_at();

-- ------------------------------------------- provision profile on signup ----
-- Runs with definer rights so it can write to public.profiles for the brand-new
-- user. Values come from the OAuth/email metadata, never from client input.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url, preferred_language)
  values (
    new.id,
    coalesce(
      nullif(new.raw_user_meta_data ->> 'full_name', ''),
      nullif(new.raw_user_meta_data ->> 'name', ''),
      nullif(split_part(coalesce(new.email, ''), '@', 1), '')
    ),
    nullif(new.raw_user_meta_data ->> 'avatar_url', ''),
    'ar'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ==========================================================================
-- Optional: server-side pregnancy records
-- --------------------------------------------------------------------------
-- The application currently keeps pregnancy tracking data in the browser
-- (localStorage, namespaced per account) so health data never leaves the
-- device by default. The table below is ready if you later want opt-in cloud
-- backup; it carries the same owner-only RLS rules.
-- ==========================================================================
create table if not exists public.pregnancy_records (
  user_id uuid primary key references auth.users (id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.pregnancy_records enable row level security;
alter table public.pregnancy_records force row level security;

drop policy if exists "records_select_own" on public.pregnancy_records;
create policy "records_select_own"
  on public.pregnancy_records
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "records_insert_own" on public.pregnancy_records;
create policy "records_insert_own"
  on public.pregnancy_records
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "records_update_own" on public.pregnancy_records;
create policy "records_update_own"
  on public.pregnancy_records
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "records_delete_own" on public.pregnancy_records;
create policy "records_delete_own"
  on public.pregnancy_records
  for delete
  to authenticated
  using (auth.uid() = user_id);
