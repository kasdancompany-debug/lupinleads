-- Per-client report branding

create table if not exists public.client_branding (
  id uuid primary key default gen_random_uuid(),
  client_id text not null unique,
  client_name text not null,
  logo_url text,
  primary_color text not null default '#1b4332',
  accent_color text not null default '#52b788',
  agency_name text not null default 'LUPIN LEADS',
  report_footer text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.client_branding enable row level security;

create policy "Authenticated manage branding"
  on public.client_branding for all
  to authenticated
  using (true) with check (true);

insert into public.client_branding (client_id, client_name, primary_color, accent_color, report_footer)
values
  ('apex-outdoors', 'Apex Outdoors Co.', '#1b4332', '#52b788', 'Confidential — Prepared exclusively for Apex Outdoors Co.'),
  ('summit-ventures', 'Summit Ventures', '#1e3a5f', '#4a90d9', 'Confidential — Prepared exclusively for Summit Ventures.'),
  ('wildcraft-studio', 'Wildcraft Studio', '#3d2c29', '#c9a87c', 'Confidential — Prepared exclusively for Wildcraft Studio.')
on conflict (client_id) do nothing;
