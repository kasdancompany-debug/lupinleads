-- Link strategy call submissions to CRM and backfill existing rows

alter table public.crm_leads
  add column if not exists consultation_request_id uuid
    references public.consultation_requests(id) on delete set null;

create unique index if not exists crm_leads_consultation_request_id_idx
  on public.crm_leads (consultation_request_id)
  where consultation_request_id is not null;

-- Backfill consultation_requests into crm_leads (New Lead column = stage new_lead)
insert into public.crm_leads (
  name,
  phone,
  email,
  service_requested,
  notes,
  source,
  status,
  stage,
  consultation_request_id,
  created_at,
  updated_at
)
select
  cr.name,
  coalesce(cr.phone, ''),
  cr.email,
  coalesce(nullif(trim(cr.company), ''), 'Strategy call inquiry'),
  coalesce(cr.message, ''),
  'Strategy Call',
  case cr.status
    when 'contacted' then 'attempted_contact'
    when 'scheduled' then 'appointment_booked'
    when 'closed' then 'won'
    else 'new_lead'
  end,
  case cr.status
    when 'contacted' then 'attempted_contact'
    when 'scheduled' then 'appointment_booked'
    when 'closed' then 'won'
    else 'new_lead'
  end,
  cr.id,
  cr.created_at,
  cr.created_at
from public.consultation_requests cr
where not exists (
  select 1
  from public.crm_leads cl
  where cl.consultation_request_id = cr.id
);
