-- Isolation test fixtures: one lead per demo client (idempotent)
-- Used by /dashboard/dev/isolation-test and scripts/test-data-isolation.ts

insert into public.crm_leads (
  name,
  phone,
  email,
  service_requested,
  estimated_value,
  notes,
  source,
  campaign,
  status,
  stage
)
select
  v.name,
  v.phone,
  v.email,
  v.service_requested,
  v.estimated_value,
  v.notes,
  v.source,
  v.campaign,
  v.status,
  v.stage
from (
  values
    (
      '[Isolation Test] Summit Lead',
      '403-555-0101',
      'isolation-test@summit-renovations.local',
      'Kitchen remodel',
      45000::numeric,
      'DO NOT DELETE — used for tenant isolation checks',
      'isolation-test',
      'summit-renovations',
      'new_lead',
      'new_lead'
    ),
    (
      '[Isolation Test] Northline Lead',
      '780-555-0202',
      'isolation-test@northline-plumbing.local',
      'Water heater install',
      3200::numeric,
      'DO NOT DELETE — used for tenant isolation checks',
      'isolation-test',
      'northline-plumbing',
      'new_lead',
      'new_lead'
    )
) as v(
  name,
  phone,
  email,
  service_requested,
  estimated_value,
  notes,
  source,
  campaign,
  status,
  stage
)
where not exists (
  select 1
  from public.crm_leads cl
  where cl.email = v.email
);
