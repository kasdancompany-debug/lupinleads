# Lupin Leads — Go-Live Checklist

A practical launch guide for getting Lupin Leads live with your first paying client. Work through the sections in order. You do not need a dev team for this — just accounts on Vercel, Supabase, and a few optional services.

**Time estimate:** 2–4 hours for first launch (assuming domain and Meta ads are already in progress).

---

## Overview

| Piece | What it does |
|-------|----------------|
| **Vercel** | Hosts the website, dashboard, and API |
| **Supabase** | Database + login (magic links) |
| **Your domain** | `lupinleads.com` (or similar) |
| **Resend** | Email alerts when leads come in |
| **Calendly** | Strategy call booking on the marketing site |
| **Meta** | Facebook/Instagram lead forms → your CRM |

---

## 1. Domain setup

1. Buy your domain (Namecheap, Cloudflare, Google Domains, etc.).
2. In **Vercel** → your project → **Settings → Domains**, add:
   - `lupinleads.com` (or your domain)
   - `www.lupinleads.com` (optional; redirect to apex)
3. Vercel shows DNS records (usually an `A` record or `CNAME`). Add them at your registrar.
4. Wait for DNS to propagate (often 15 minutes, sometimes up to 48 hours).
5. Confirm HTTPS works — Vercel provisions the certificate automatically.

**Set your production URL everywhere:**

- Vercel env: `NEXT_PUBLIC_APP_URL=https://lupinleads.com`
- Supabase (step 3 below): Site URL = same URL

---

## 2. Vercel deployment

1. Push the repo to GitHub (if not already).
2. [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Framework: **Next.js** (auto-detected).
4. **Do not deploy yet** — add environment variables first (section 4).
5. Deploy. Fix any build errors locally with `npm run build` before retrying.
6. Attach your custom domain (section 1).
7. After domain is live, redeploy once so `NEXT_PUBLIC_APP_URL` matches production.

**Tip:** Use Vercel’s **Production** environment for live vars. Preview deployments can share the same Supabase project, but use a separate project if you want a true staging copy.

---

## 3. Supabase setup

### Create the project

1. [supabase.com](https://supabase.com) → **New project**.
2. Save the **database password** somewhere safe.
3. Go to **Project Settings → API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (**never expose this in the browser or client code**)

### Run migrations

In **SQL Editor**, run each file from `supabase/migrations/` **in order**:

| # | File | Purpose |
|---|------|---------|
| 001 | `001_consultation_requests.sql` | Strategy call form submissions |
| 002 | `002_lead_capture.sql` | CRM leads + capture forms |
| 003 | `003_client_branding.sql` | Client report branding |
| 004 | `004_unify_strategy_call_leads.sql` | Links strategy calls to CRM |
| 005 | `005_remove_demo_branding.sql` | Cleans demo data |
| 006 | `006_client_portal.sql` | Clients, portal users, ad spend |
| 007 | `007_client_users_pending_invites.sql` | Invite before first login |
| 008 | `008_isolation_test_leads.sql` | **Optional** — dev isolation tests only |
| 009 | `009_strategy_call_form_fields.sql` | Extra strategy call fields |
| 010 | `010_meta_lead_intake.sql` | Meta lead webhook + form mappings |

Copy/paste the full contents of each file and click **Run**. If a migration says “already exists,” that’s fine — move to the next one.

### Auth settings (required)

**Authentication → URL configuration:**

| Setting | Value |
|---------|--------|
| **Site URL** | `https://lupinleads.com` |
| **Redirect URLs** | Add all of these (one per line): |

```
https://lupinleads.com/auth/callback
https://lupinleads.com/**
http://localhost:3000/auth/callback
http://localhost:3000/**
```

Replace `lupinleads.com` with your real domain. Localhost entries let you test magic links during development.

**Authentication → Providers → Email:**

- Enable **Email** provider.
- **Confirm email** can stay on or off; magic links work either way.
- Customize the email template later if you want (optional).

**Authentication → Users:**

- Add yourself as a user, or sign in once via magic link after deploy — Supabase creates the user on first login.

### Who can log in where

| Role | How access works |
|------|------------------|
| **You (agency)** | Email listed in `AGENCY_ADMIN_EMAILS` → `/login` → dashboard |
| **Client owner** | You invite them in **Clients** → they use `/portal/login` |
| **Random person** | Magic link works, but they get “no access” and are signed out |

---

## 4. Environment variables

Add these in **Vercel → Settings → Environment Variables** (and in `.env.local` for local dev). See `.env.example` in the repo for the full list.

### Required for launch

```env
# Your live site URL (no trailing slash)
NEXT_PUBLIC_APP_URL=https://lupinleads.com

# Your agency login — comma-separated if multiple admins
AGENCY_ADMIN_EMAILS=you@lupinleads.com

# Supabase (all three)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### Strongly recommended

```env
# Strategy call booking popup + /book page
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-link/30min

# Lead alert emails
RESEND_API_KEY=re_...
NOTIFICATION_EMAIL=you@lupinleads.com
NOTIFICATION_FROM=LUPIN LEADS <notifications@lupinleads.com>
```

### Required when first Meta client goes live

```env
META_VERIFY_TOKEN=pick-a-long-random-string
META_APP_SECRET=from-meta-developer-app
META_GRAPH_ACCESS_TOKEN=page-token-with-leads_retrieval
```

Details: `docs/META_LEAD_SETUP.md`

### Can wait (see section 11)

Stripe, OpenAI, Slack webhook, `DASHBOARD_PASSWORD` (local dev only).

**After changing env vars in Vercel, redeploy** so the new values take effect.

---

## 5. Auth redirect settings (quick reference)

Magic links send users to:

```
https://lupinleads.com/auth/callback?next=/dashboard   ← agency
https://lupinleads.com/auth/callback?next=/portal      ← client portal
```

If redirects fail with “redirect URL not allowed,” your Supabase **Redirect URLs** list is missing the callback URL (section 3).

**Common mistakes:**

- Site URL still set to `http://localhost:3000` in production
- Forgot to add `https://yourdomain.com/auth/callback`
- Agency email not in `AGENCY_ADMIN_EMAILS` → login succeeds then immediately shows “no access”
- Client not invited → same at `/portal/login`

---

## 6. Calendly setup

1. Create a free Calendly event (e.g. “Free Lead Strategy Call”, 30 min).
2. Copy the **scheduling link** (looks like `https://calendly.com/your-name/30min`).
3. Set `NEXT_PUBLIC_CALENDLY_URL` to that link in Vercel.
4. Redeploy.

**What happens:**

- Homepage CTAs open the Calendly popup when the URL is set.
- `/book` embeds Calendly when configured; otherwise shows the strategy call form.
- If Calendly is not set, the site still works — visitors use the contact form instead.

**Optional:** In Calendly, add intake questions (trade, city) so you’re prepared before the call. Lupin’s own strategy call form still saves to Supabase separately.

---

## 7. Resend email setup

1. [resend.com](https://resend.com) → create account.
2. **Domains** → add `lupinleads.com` → add the DNS records Resend gives you (SPF, DKIM).
3. Wait for domain verification.
4. **API Keys** → create key → `RESEND_API_KEY`.
5. Set in Vercel:

```env
RESEND_API_KEY=re_...
NOTIFICATION_EMAIL=you@lupinleads.com
NOTIFICATION_FROM=LUPIN LEADS <notifications@lupinleads.com>
```

**What you get emailed about:**

- New strategy call form submissions
- New Meta/Facebook leads
- Other instant notifications from the app

Without Resend, leads still save to Supabase — you just won’t get an email ping. Check the dashboard instead.

---

## 8. First-client onboarding

Do this once per contractor client. Takes about 15 minutes.

### Step 1 — Create the client

1. Sign in at `https://lupinleads.com/login` (your agency email).
2. **Dashboard → Clients → Add client**
3. Fill in:
   - **Name** — e.g. “Summit Roofing”
   - **Slug** — auto-generated, e.g. `summit-roofing` (this is the tenant key; leads are tagged with this)
   - **Trade, city**
   - **Owner email** — their real email (invite is sent automatically)

### Step 2 — Map Meta lead form (when ads are ready)

On the client card → **Meta lead form** → paste the **Form ID** from Meta Ads Manager → Save.

Full walkthrough: `docs/META_LEAD_SETUP.md`

### Step 3 — Send portal access

Copy the portal login link from the client card and text/email it to the owner:

```
https://lupinleads.com/portal/login
```

They enter their email → magic link → see only **their** leads and stats.

### Step 4 — Verify with a test lead

On the client card → **Add test lead** (or **Dashboard → Dev → Meta lead** to simulate Facebook).

Confirm:

- Lead appears in **CRM** filtered to that client
- Owner sees it in **portal** after logging in
- You get a Resend notification (if configured)

### Step 5 — Log ad spend

**Dashboard → Ad Spend** → add this month’s spend for the client. Portal stats (CPL, etc.) use this.

### Onboarding checklist (per client)

- [ ] Client created with correct slug
- [ ] Owner invited / portal login tested
- [ ] Test lead visible in CRM + portal
- [ ] Meta form ID mapped (when campaign live)
- [ ] Ad spend logged
- [ ] Owner knows how to move leads through pipeline stages

---

## 9. Meta lead form setup (summary)

Native Facebook/Instagram instant forms send leads to:

```
https://lupinleads.com/api/webhooks/meta
```

**Minimum steps:**

1. Migration `010_meta_lead_intake.sql` applied (section 3).
2. Meta env vars set (section 4).
3. Client exists in Lupin with matching slug.
4. Meta **Form ID** saved on the client card.
5. Meta Developer App → Webhooks → Page → `leadgen` field subscribed.
6. Page access token with `leads_retrieval` → `META_GRAPH_ACCESS_TOKEN`.

**Test without spending ad budget:**

`Dashboard → Dev → Meta lead test` → simulate a lead → check CRM and portal.

**Full guide:** `docs/META_LEAD_SETUP.md`

**Troubleshooting:** Query `meta_webhook_logs` in Supabase for errors.

---

## 10. Smoke test checklist

Run through this after deploy and again before each new client goes live on ads.

### Automated (2 minutes)

```bash
npm run test:isolation
```

- Auth tests should pass even without extra data.
- Data tests need migrations **006** + **008** and test leads in Supabase.
- Fix any failures before onboarding real clients.

### Manual — agency (you)

- [ ] Homepage loads on production domain
- [ ] “Book My Free Lead Strategy Call” opens Calendly (or form fallback)
- [ ] `/login` → magic link → lands on `/dashboard`
- [ ] **Clients** → create client works
- [ ] **CRM** → leads filter by client
- [ ] **Add test lead** → appears only under that client
- [ ] Strategy call form on `/book` submits → row in Supabase `consultation_requests`
- [ ] Email notification received (if Resend configured)

### Manual — client portal

- [ ] `/portal/login` with **invited** owner email → magic link → `/portal`
- [ ] Owner sees only their leads (not another client’s)
- [ ] Owner can update lead stage
- [ ] `/portal/login` with **uninvited** email → “no access” after clicking link
- [ ] Your agency email at `/portal/login` → redirected to dashboard (not client view)

### Manual — Meta (when configured)

- [ ] `Dashboard → Dev → Meta lead test` → lead in CRM
- [ ] Meta webhook verify succeeds in Developer Console
- [ ] Real test lead from Meta Testing Tool → `meta_webhook_logs` status `processed`

### Manual — security sanity

- [ ] `/dashboard` logged out → redirects to login
- [ ] Client cannot open `/dashboard`
- [ ] You cannot accidentally browse `/portal` as agency (redirects to dashboard)

---

## 11. What is optional and can wait

You do not need these for your first client.

| Feature | Env / setup | When to add |
|---------|-------------|-------------|
| **Stripe billing** | `STRIPE_*` vars | When you sell packages through the site |
| **AI follow-up assistant** | `OPENAI_API_KEY` | When you want AI draft messages in dashboard |
| **Slack alerts** | `NOTIFICATION_WEBHOOK_URL` | When you live in Slack |
| **Calendly** | `NEXT_PUBLIC_CALENDLY_URL` | Nice to have; form works without it |
| **Resend** | `RESEND_API_KEY` | Recommended early, but CRM works without it |
| **Isolation test migration (008)** | SQL only | Only for `npm run test:isolation` data suite |
| **DASHBOARD_PASSWORD** | `.env.local` dev only | Legacy dev gate; not used in production auth |
| **Custom capture forms / embed** | Dashboard → Forms | Alternative to Meta native forms |
| **Executive PDF reports** | Works once clients + leads exist | Polish, not launch-blocking |
| **Multiple agency admins** | Comma-separate emails in `AGENCY_ADMIN_EMAILS` | When you hire ops help |

---

## Launch day order (TL;DR)

1. Supabase project + run migrations `001`–`007`, `009`, `010`
2. Supabase auth URLs configured
3. Vercel deploy + all **required** env vars
4. Domain pointed to Vercel + `NEXT_PUBLIC_APP_URL` updated
5. Resend + Calendly (recommended)
6. You log in → create first client → test lead → portal login for owner
7. `npm run test:isolation` + manual smoke tests (section 10)
8. Map Meta form + go live on ads when ready

---

## When something breaks

| Problem | First place to look |
|---------|---------------------|
| Magic link doesn’t work | Supabase → Auth → URL configuration |
| “No access” after login | `AGENCY_ADMIN_EMAILS` or client invite |
| Leads not in CRM | `crm_leads` table; check `campaign` = client slug |
| Meta leads missing | `meta_webhook_logs` in Supabase; `docs/META_LEAD_SETUP.md` |
| No email alerts | Resend domain verified? `RESEND_API_KEY` set? |
| Build fails on Vercel | Run `npm run build` locally and fix errors |

---

*Last updated for Lupin Leads MVP — agency dashboard, client portal, Meta lead intake, strategy call form.*
