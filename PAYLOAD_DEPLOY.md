# Deploying Payload CMS

Complete deployment guide for the Payload CMS backend (Neon + Railway) and connecting the Astro site (Netlify) to it.

---

## Overview

| Service | Role | Free tier |
|---|---|---|
| Neon | PostgreSQL database | Yes — 0.5 GB storage |
| Railway | Hosts Payload Node.js/Next.js server | Yes — $5 credit/month |
| Netlify | Hosts Astro static site | Yes — existing |

---

## Step 1: Create Neon PostgreSQL Database

1. Go to [neon.tech](https://neon.tech) → create a free account
2. Create a new project → name it `vaidya-vrindavanam`
3. Select region closest to your users (e.g. `ap-southeast-1` for India)
4. Once created, go to **Connection Details** → copy the **Connection string** (looks like `postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require`)

---

## Step 2: Deploy Payload to Railway

1. Go to [railway.app](https://railway.app) → create a free account
2. Create a **New Project** → **Deploy from GitHub repo** → select this repository
3. Set the **Root Directory** to `payload/` (the Payload app is in the `payload/` subdirectory)
4. Set the **Start Command** to: `npm run start`
5. Set the **Build Command** to: `npm run build`
6. Add these **Environment Variables** in Railway:

```
DATABASE_URI=<paste Neon connection string from Step 1>
PAYLOAD_SECRET=<generate a random 32+ character string — e.g. run: openssl rand -hex 32>
NEXT_PUBLIC_SERVER_URL=<Railway will give you a URL after first deploy — come back and fill this in>
PORT=3000
```

7. Deploy — Railway builds and starts the app
8. Once deployed, copy the Railway URL (e.g. `https://<railway-project-url>.up.railway.app`)
9. Go back to Railway env vars and set: `NEXT_PUBLIC_SERVER_URL=https://your-railway-url.up.railway.app`
10. Redeploy

---

## Step 3: Run Database Migrations

Once Payload is live on Railway, run migrations to create the database tables. In Railway:

1. Go to your service → **Settings** → **Deploy** → open a **Shell** (or use Railway CLI)
2. Run: `npm run payload migrate`

This creates all the required PostgreSQL tables.

---

## Step 4: Create First Admin User

1. Visit your Payload admin at: `https://your-railway-url.up.railway.app/admin`
2. On first visit, Payload asks you to create the first admin user
3. Create an account with a strong password
4. Log in to confirm the admin panel loads

---

## Step 5: Seed Content from Markdown Files

Run the migration script locally to seed all existing content into Payload:

```bash
# From the repo root
cd payload

# Update .env with the Railway DATABASE_URI (same as Step 2)
# Edit payload/.env and set DATABASE_URI to the Neon connection string

npm run migrate:content
```

This reads all `.md` files from `../src/content/` and creates them in Payload.
After it completes, verify the content appears in the Payload admin.

---

## Step 6: Set Up Netlify Rebuild Webhook

1. In Netlify, go to your site → **Site configuration** → **Build & deploy** → **Continuous deployment** → **Build hooks**
2. Click **Add build hook** → name it `Payload CMS` → select branch `main`
3. Copy the webhook URL (looks like `https://api.netlify.com/build_hooks/xxxxxxxxxxxxxxxx`)
4. In Railway, add this environment variable:
   ```
   NETLIFY_BUILD_HOOK_URL=https://api.netlify.com/build_hooks/xxxxxxxxxxxxxxxx
   ```
5. Redeploy Railway (to pick up the new env var)

---

## Step 7: Connect Astro Site to Payload

1. In Netlify, go to **Site configuration** → **Environment variables**
2. Add: `PAYLOAD_URL=https://your-railway-url.up.railway.app`
3. Trigger a manual redeploy in Netlify

---

## Step 8: Verify End-to-End

1. Visit the live Netlify site — all 40 pages should render with content from Payload
2. Log into Payload admin → edit a blog post → click Save
3. Netlify should start a new build automatically (check Netlify deploys dashboard)
4. After ~60 seconds, the live site should reflect your change

---

## Step 9: Clean Up Markdown Files

Once you've verified everything works:

```bash
# From repo root
rm -rf src/content/treatments/
rm -rf src/content/conditions/
rm -rf src/content/blog/
rm src/content/config.ts
```

Commit and push. The Astro site now exclusively uses Payload as the content source.

---

## Local Development

To develop locally with Payload:

**Terminal 1 — Start Payload:**
```bash
cd payload
npm run dev
# Payload admin available at http://localhost:3000/admin
```

**Terminal 2 — Start Astro:**
```bash
npm run dev
# Astro site available at http://localhost:4321
```

Make sure `payload/.env` has a valid `DATABASE_URI` (can use Neon in dev or a local PostgreSQL).

---

## Troubleshooting

| Problem | Solution |
|---|---|
| Astro build produces empty pages | Check `PAYLOAD_URL` is set and Payload is running |
| Payload admin won't load on Railway | Check `DATABASE_URI` is correct in Railway env vars |
| Migration script fails | Ensure `npm run payload migrate` has been run first |
| Netlify rebuild not triggering | Check `NETLIFY_BUILD_HOOK_URL` is set in Railway env vars |
