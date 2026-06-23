-- Extended fields for strategy call / contact form submissions

alter table public.consultation_requests
  add column if not exists trade text,
  add column if not exists city text,
  add column if not exists website text,
  add column if not exists monthly_ad_budget text;

comment on column public.consultation_requests.company is 'Business / company name';
comment on column public.consultation_requests.trade is 'Trade or service category';
comment on column public.consultation_requests.city is 'Primary service city or area';
comment on column public.consultation_requests.website is 'Business website URL';
comment on column public.consultation_requests.monthly_ad_budget is 'Estimated monthly Meta ad budget';

create index if not exists consultation_requests_trade_idx
  on public.consultation_requests (trade)
  where trade is not null;

create index if not exists consultation_requests_city_idx
  on public.consultation_requests (city)
  where city is not null;
