-- Meta Lead Ads webhook intake: form → client mapping, payload logs, dedup on crm_leads

create table if not exists public.meta_form_mappings (
  id uuid primary key default gen_random_uuid(),
  client_slug text not null,
  meta_form_id text not null,
  meta_page_id text,
  label text,
  created_at timestamptz not null default now(),
  unique (meta_form_id)
);

create index if not exists meta_form_mappings_client_slug_idx
  on public.meta_form_mappings (client_slug);

create table if not exists public.meta_webhook_logs (
  id uuid primary key default gen_random_uuid(),
  meta_leadgen_id text,
  meta_form_id text,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'received',
  client_slug text,
  crm_lead_id uuid references public.crm_leads(id) on delete set null,
  error_message text,
  created_at timestamptz not null default now()
);

create index if not exists meta_webhook_logs_leadgen_idx
  on public.meta_webhook_logs (meta_leadgen_id)
  where meta_leadgen_id is not null;

create index if not exists meta_webhook_logs_created_at_idx
  on public.meta_webhook_logs (created_at desc);

alter table public.crm_leads
  add column if not exists meta_leadgen_id text;

create unique index if not exists crm_leads_meta_leadgen_id_idx
  on public.crm_leads (meta_leadgen_id)
  where meta_leadgen_id is not null;

alter table public.meta_form_mappings enable row level security;
alter table public.meta_webhook_logs enable row level security;

create policy "Service role full access on meta_form_mappings"
  on public.meta_form_mappings for all
  to service_role
  using (true)
  with check (true);

create policy "Service role full access on meta_webhook_logs"
  on public.meta_webhook_logs for all
  to service_role
  using (true)
  with check (true);
