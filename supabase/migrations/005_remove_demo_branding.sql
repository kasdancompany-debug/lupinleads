-- Remove demo client branding seeded for placeholder reports

delete from public.client_branding
where client_id in ('apex-outdoors', 'summit-ventures', 'wildcraft-studio');
