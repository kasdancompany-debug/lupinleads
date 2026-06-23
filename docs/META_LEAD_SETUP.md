# Meta / Facebook Lead Ads — Setup Guide

This guide connects a client's **Meta instant form** to Lupin Leads so new leads land in the correct client CRM pipeline (`crm_leads.campaign` = client slug).

---

## How it works

1. Homeowner submits a **Facebook / Instagram lead form**
2. Meta sends a webhook to Lupin: `POST /api/webhooks/meta`
3. Lupin logs the raw payload (`meta_webhook_logs`)
4. Lupin looks up **Meta form ID → client slug** (`meta_form_mappings`)
5. Lupin fetches full lead fields from the Meta Graph API
6. Lupin creates a CRM lead (`source: Facebook Lead Ad`) — duplicates blocked by `meta_leadgen_id`

---

## 1. Apply database migration

Run in Supabase SQL editor:

```
supabase/migrations/010_meta_lead_intake.sql
```

---

## 2. Environment variables

Add to Vercel / `.env.local`:

```env
# Webhook verification (you choose this string — same value in Meta App Dashboard)
META_VERIFY_TOKEN=your-random-verify-token

# App secret from Meta App Dashboard → Settings → Basic (validates webhook signatures)
META_APP_SECRET=your-meta-app-secret

# Page access token with leads_retrieval permission (fetches lead field data)
META_GRAPH_ACCESS_TOKEN=your-page-access-token
```

`NEXT_PUBLIC_APP_URL` must be your production URL (e.g. `https://lupinleads.com`).

---

## 3. Create the client in Lupin

1. Agency dashboard → **Clients** → **Add client**
2. Note the **slug** (e.g. `summit-roofing`) — this becomes `crm_leads.campaign`

---

## 4. Map Meta form ID → client slug

When you create the lead form in Meta Ads Manager, copy the **Form ID** (numeric).

In Lupin:

- **Clients** page → client card → **Meta lead form ID** → Save

Or API:

```http
POST /api/clients/{clientId}/meta-forms
Content-Type: application/json

{
  "metaFormId": "123456789012345",
  "metaPageId": "987654321098765",
  "label": "Summit Roofing — Instant Form"
}
```

One Meta form ID maps to exactly one client slug.

---

## 5. Subscribe Meta webhook

In [Meta for Developers](https://developers.facebook.com/):

1. Create or select your **App**
2. Add product **Webhooks**
3. Subscribe to **Page** object
4. Callback URL:

   ```
   https://YOUR_DOMAIN/api/webhooks/meta
   ```

5. **Verify token**: same as `META_VERIFY_TOKEN`
6. Subscribe to field: **`leadgen`**
7. Subscribe your client's **Facebook Page** to the app

### Page access token

Generate a **Page access token** with:

- `leads_retrieval`
- `pages_manage_metadata`
- `pages_read_engagement`

Set as `META_GRAPH_ACCESS_TOKEN`.

---

## 6. Test before going live

### Option A — Dev simulator (recommended)

1. Dashboard → `/dashboard/dev/meta-lead`
2. Select client slug
3. Optionally enter the real Meta form ID (creates mapping)
4. Click **Simulate Meta lead**
5. Verify lead in `/dashboard/crm?client={slug}` and client portal

### Option B — Meta test lead

Use Meta's **Lead Ads Testing Tool** in Events Manager to send a real test webhook.

---

## 7. Connect the client's live campaign

1. Client Meta ad account → **Lead generation** campaign
2. Instant form uses the **mapped Form ID**
3. Ad goes live → leads flow to Lupin automatically

**Important:** The form ID in Meta must match the ID saved in Lupin. The client slug in Lupin must match `clients.slug`.

---

## Troubleshooting

| Symptom | Fix |
|--------|-----|
| Webhook verify fails | Check `META_VERIFY_TOKEN` matches Meta dashboard |
| 401 Invalid signature | Set `META_APP_SECRET` correctly |
| Lead not created | Check `meta_webhook_logs` in Supabase for `error_message` |
| No client mapping | Save Meta form ID on Clients page |
| Graph API fetch fails | Regenerate `META_GRAPH_ACCESS_TOKEN` with `leads_retrieval` |
| Duplicate lead skipped | Expected — same `leadgen_id` won't insert twice |

### Raw payload logs

Query Supabase:

```sql
select id, status, meta_leadgen_id, meta_form_id, client_slug, error_message, created_at
from meta_webhook_logs
order by created_at desc
limit 20;
```

---

## Embed form alternative

For non-Meta-native forms, use Lupin's embed capture form:

1. Create `capture_forms` row with `default_campaign` = client slug
2. Point Meta ads to `/embed/{form-slug}`

Meta Lead Ads webhook (this guide) is the path for **native Meta instant forms**.
