-- Allow client_users rows before the invitee has a Supabase Auth account.
-- auth_user_id is linked on first magic-link login (see linkPendingClientInvites).

alter table public.client_users
  alter column auth_user_id drop not null;

create index if not exists client_users_email_idx
  on public.client_users (lower(email));
