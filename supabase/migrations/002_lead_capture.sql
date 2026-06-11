-- Lead capture forms, submissions, CRM leads, and notifications

create table if not exists public.capture_forms (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  fields jsonb not null default '[]'::jsonb,
  default_campaign text,
  notify_email text,
  success_message text not null default 'Thank you! We''ll be in touch shortly.',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.crm_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text default '',
  email text default '',
  service_requested text default '',
  estimated_value numeric not null default 0,
  notes text default '',
  source text not null default 'Form',
  campaign text,
  status text not null default 'new_lead',
  stage text not null default 'new_lead',
  form_submission_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint crm_leads_stage_check check (
    stage in ('new_lead', 'attempted_contact', 'appointment_booked', 'estimate_sent', 'won', 'lost')
  )
);

create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  form_id uuid not null references public.capture_forms(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  campaign text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  referrer text,
  crm_lead_id uuid references public.crm_leads(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.crm_leads
  add constraint crm_leads_form_submission_fkey
  foreign key (form_submission_id) references public.form_submissions(id) on delete set null;

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'new_lead',
  title text not null,
  message text not null,
  metadata jsonb default '{}'::jsonb,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists capture_forms_slug_idx on public.capture_forms(slug);
create index if not exists form_submissions_form_id_idx on public.form_submissions(form_id);
create index if not exists form_submissions_campaign_idx on public.form_submissions(campaign);
create index if not exists crm_leads_stage_idx on public.crm_leads(stage);
create index if not exists crm_leads_campaign_idx on public.crm_leads(campaign);
create index if not exists notifications_created_at_idx on public.notifications(created_at desc);
create index if not exists notifications_read_idx on public.notifications(read);

alter table public.capture_forms enable row level security;
alter table public.form_submissions enable row level security;
alter table public.crm_leads enable row level security;
alter table public.notifications enable row level security;

-- Public can read active forms by slug (for embed)
create policy "Public read active forms"
  on public.capture_forms for select
  to anon, authenticated
  using (is_active = true);

-- Public can submit to active forms
create policy "Public insert submissions"
  on public.form_submissions for insert
  to anon, authenticated
  with check (
    exists (
      select 1 from public.capture_forms
      where id = form_id and is_active = true
    )
  );

-- Authenticated users can manage forms (admins — tighten with auth later)
create policy "Authenticated manage forms"
  on public.capture_forms for all
  to authenticated
  using (true) with check (true);

create policy "Authenticated read submissions"
  on public.form_submissions for select
  to authenticated
  using (true);

create policy "Authenticated manage crm leads"
  on public.crm_leads for all
  to authenticated
  using (true) with check (true);

create policy "Authenticated manage notifications"
  on public.notifications for all
  to authenticated
  using (true) with check (true);

-- Service role bypasses RLS; anon insert for submissions via API with service key

create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger capture_forms_updated_at
  before update on public.capture_forms
  for each row execute function public.update_updated_at();

create trigger crm_leads_updated_at
  before update on public.crm_leads
  for each row execute function public.update_updated_at();

-- Default contractor intake form
insert into public.capture_forms (slug, name, description, fields, default_campaign, success_message)
values (
  'contractor-intake',
  'Contractor Intake',
  'Tell us about your project and we''ll get back to you within 24 hours.',
  '[
    {"id":"fld_name","type":"text","label":"Full Name","placeholder":"John Smith","required":true,"mapsTo":"name"},
    {"id":"fld_email","type":"email","label":"Email","placeholder":"john@email.com","required":true,"mapsTo":"email"},
    {"id":"fld_phone","type":"phone","label":"Phone","placeholder":"(555) 000-0000","required":true,"mapsTo":"phone"},
    {"id":"fld_service","type":"text","label":"Service Requested","placeholder":"Kitchen remodel...","required":true,"mapsTo":"serviceRequested"},
    {"id":"fld_notes","type":"textarea","label":"Project Details","placeholder":"Tell us more...","required":false,"mapsTo":"notes"}
  ]'::jsonb,
  'organic',
  'Thank you! A member of our team will contact you shortly.'
) on conflict (slug) do nothing;
