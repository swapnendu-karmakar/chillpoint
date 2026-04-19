-- ============================================================
-- Chill Point — MIGRATION SCRIPT
-- Run this in your Supabase SQL Editor (safe to run on existing DB)
-- ============================================================

-- ADMIN CONFIG TABLE (new)
create table if not exists admin_config (
  id text primary key,
  value text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- CATEGORIES TABLE (new)
create table if not exists categories (
  id text primary key,
  label text not null,
  emoji text not null,
  color text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS on new tables
alter table admin_config enable row level security;
alter table categories enable row level security;

-- Policies for admin_config (create only if not exists)
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'admin_config' and policyname = 'Public can read admin config') then
    create policy "Public can read admin config" on admin_config for select using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'admin_config' and policyname = 'Public can update admin config') then
    create policy "Public can update admin config" on admin_config for update using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'admin_config' and policyname = 'Public can insert admin config') then
    create policy "Public can insert admin config" on admin_config for insert with check (true);
  end if;
end $$;

-- Policies for categories
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'categories' and policyname = 'Public can read categories') then
    create policy "Public can read categories" on categories for select using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'categories' and policyname = 'Public can insert categories') then
    create policy "Public can insert categories" on categories for insert with check (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'categories' and policyname = 'Public can update categories') then
    create policy "Public can update categories" on categories for update using (true);
  end if;
end $$;

-- Policies for menu_items (add missing update/delete/insert policies)
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'menu_items' and policyname = 'Public can insert menu items') then
    create policy "Public can insert menu items" on menu_items for insert with check (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'menu_items' and policyname = 'Public can update menu items') then
    create policy "Public can update menu items" on menu_items for update using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'menu_items' and policyname = 'Public can delete menu items') then
    create policy "Public can delete menu items" on menu_items for delete using (true);
  end if;
end $$;

-- ============================================================
-- SEED DATA
-- ============================================================

-- Initial admin password
insert into admin_config (id, value)
values ('admin_password', 'chillpoint2024')
on conflict (id) do nothing;

-- Default Categories
insert into categories (id, label, emoji, color) values
  ('chaat',     'Chaat',     '🍛', 'from-orange-400 to-red-500'),
  ('sandwich',  'Sandwich',  '🥪', 'from-yellow-400 to-orange-400'),
  ('pizza',     'Pizza',     '🍕', 'from-red-400 to-rose-500'),
  ('ice_slush', 'Ice Slush', '🧊', 'from-blue-400 to-cyan-400'),
  ('puff',      'Puff',      '🥐', 'from-amber-400 to-yellow-400'),
  ('maggi',     'Maggi',     '🍜', 'from-yellow-500 to-amber-500'),
  ('fries',     'Fries',     '🍟', 'from-yellow-400 to-orange-500')
on conflict (id) do nothing;
