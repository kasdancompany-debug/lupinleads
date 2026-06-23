-- Multi-client portal MVP: clients, portal users, monthly ad spend
-- clients.slug aligns with crm_leads.campaign for tenant scoping (no FK yet)

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  trade text,
  market text,
  status text not null default 'onboarding',
  created_at timestamptz not null default now()
);

create table if not exists public.client_users (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  auth_user_id uuid not null references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'owner',
  invited_at timestamptz not null default now(),
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  unique (client_id, auth_user_id),
  unique (client_id, email)
);

create table if not exists public.client_monthly_spend (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  month text not null,
  ad_spend_cad numeric not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  unique (client_id, month)
);

create index if not exists clients_slug_idx on public.clients (slug);
create index if not exists client_users_auth_user_id_idx on public.client_users (auth_user_id);
create index if not exists client_users_client_id_idx on public.client_users (client_id);
create index if not exists client_monthly_spend_client_id_idx on public.client_monthly_spend (client_id);
create index if not exists client_monthly_spend_month_idx on public.client_monthly_spend (month);

alter table public.clients enable row level security;
alter table public.client_users enable row level security;
alter table public.client_monthly_spend enable row level security;

-- Service role (server API) has full access; portal policies added when auth ships
create policy "Service role full access on clients"
  on public.clients for all
  to service_role
  using (true)
  with check (true);

create policy "Service role full access on client_users"
  on public.client_users for all
  to service_role
  using (true)
  with check (true);

create policy "Service role full access on client_monthly_spend"
  on public.client_monthly_spend for all
  to service_role
  using (true)
  with check (true);

-- Example clients: slug matches crm_leads.campaign for report/dashboard scoping
insert into public.clients (slug, name, trade, market, status)
values
  (
    'summit-renovations',
    'Summit Renovations',
    'Home Remodeling',
    'Calgary, AB',
    'active'
  ),
  (
    'northline-plumbing',
    'Northline Plumbing',
    'Plumbing',
    'Edmonton, AB',
    'onboarding'
  )
on conflict (slug) do nothing;

-- Sample monthly ad spend (illustrative — wire to reports in a follow-up)
insert into public.client_monthly_spend (client_id, month, ad_spend_cad, notes)
select
  c.id,
  v.month,
  v.ad_spend_cad,
  v.notes
from public.clients c
join (
  values
    ('summit-renovations', '2026-03', 3240::numeric, 'Sample month · illustrative ad spend'),
    ('northline-plumbing', '2026-03', 2180::numeric, 'Sample month · illustrative ad spend')
) as v(slug, month, ad_spend_cad, notes)
  on c.slug = v.slug
on conflict (client_id, month) do nothing;

-- Match existing client_branding pattern (text client_id = clients.slug)
insert into public.client_branding (client_id, client_name, primary_color, accent_color, report_footer)
values
  (
    'summit-renovations',
    'Summit Renovations',
    '#1b4332',
    '#52b788',
    'Confidential — Prepared exclusively for Summit Renovations.'
  ),
  (
    'northline-plumbing',
    'Northline Plumbing',
    '#1b4332',
    '#52b788',
    'Confidential — Prepared exclusively for Northline Plumbing.'
  )
on conflict (client_id) do nothing;
