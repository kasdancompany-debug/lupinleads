-- Run this in your Supabase SQL Editor

create table if not exists public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  phone text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'scheduled', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.consultation_requests enable row level security;

create policy "Allow anonymous inserts"
  on public.consultation_requests
  for insert
  to anon
  with check (true);

create policy "Service role full access"
  on public.consultation_requests
  for all
  to service_role
  using (true)
  with check (true);

create index consultation_requests_created_at_idx
  on public.consultation_requests (created_at desc);
