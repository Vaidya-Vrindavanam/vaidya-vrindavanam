# CMS Options for Vaidya Vrindavanam — Research Notes

**Context:** Replacing Payload CMS + Railway with a more sustainable solution for client handover.
**Constraint:** Free / near-zero monthly cost. Client (non-technical) will manage content independently.
**Date:** 2026-04-16

---

## Current Setup (Problems)

- **Payload CMS v3** running as a Next.js app on Railway
- **Railway ephemeral storage** — uploaded images are deleted on every redeployment
- **Neon PostgreSQL** — data is safe, but image files are not
- **Two services to maintain** (Railway app + DB) — fragile for a client handover
- Many Payload v3 setup quirks caused repeated issues during development

---

## Option A — Sanity CMS *(Claude's Recommendation)*

**Website:** https://www.sanity.io

**How it works:**
- Fully hosted headless CMS — no server to run or maintain
- Admin UI ("Sanity Studio") deployed to `your-clinic.sanity.studio` for free
- Images stored on Sanity's global CDN — never lost on redeployment
- Astro fetches content via GROQ queries or REST API at build time

**Free tier limits:**
- 3 admin users
- 10 GB asset (image) storage
- 500,000 API requests/month
- 20 GB CDN bandwidth/month

**Integration with Astro:**
- Official package: `@sanity/astro` or `@sanity/client`
- Fetch content at build time → fully static output
- Rebuild trigger: Sanity webhook → Netlify/Vercel deploy hook

**Migration effort:**
- Replace `src/lib/payload.ts` with a Sanity client
- Re-define content schemas (Treatments, Conditions, Blog, Media)
- Re-enter or script-migrate content from Neon DB

**Pros:**
- Zero server maintenance
- Images on CDN (permanent)
- Polished, intuitive admin UI
- Strong free tier — well-funded company (~$175M raised)
- Well-documented Astro integration
- Client never touches Railway, GitHub, or servers

**Cons:**
- Content lives on a third-party platform (vendor dependency)
- Migration work required to re-enter/script content
- GROQ query language has a small learning curve

**Verdict:** Best fit for a client handover. Eliminates infrastructure entirely.

---

## Option B — Keystatic CMS

**Website:** https://keystatic.com

**How it works:**
- Git-based CMS — content stored as JSON/Markdown files in the GitHub repo
- Admin UI served at `/keystatic` on the Astro site itself
- Every content save = a Git commit → triggers automatic Netlify rebuild
- Images committed directly to the Git repo

**Free tier limits:**
- Completely free — uses GitHub storage (1 GB free per repo)
- No API request limits
- Rebuild time: 2–3 minutes after each save

**Integration with Astro:**
- Official Astro integration via `@keystatic/astro`
- Schemas defined in `keystatic.config.ts`

**Migration effort:**
- Replace Payload collections with Keystatic schema files
- Import existing Markdown content from `src/content/` (already exists)
- Images committed to repo

**Pros:**
- 100% free, no external services
- Content is version-controlled in Git
- No account/subscription risk
- Images portable (in your repo)

**Cons:**
- Images in Git — repo grows over time with large files (can use Git LFS)
- 2–3 min delay between saving and site going live
- Less polished UI than Sanity
- Client must understand the Git-based workflow

**Verdict:** Good for developers; less ideal for non-technical clients expecting instant feedback.

---

## Option C — Fix Payload with Cloudflare R2 Storage

**Website:** https://developers.cloudflare.com/r2

**How it works:**
- Keep Payload CMS + Railway as-is
- Add Cloudflare R2 (S3-compatible object storage) for image uploads
- Images stored permanently in R2, served via Cloudflare CDN
- Fixes the ephemeral storage problem without changing the CMS

**Free tier limits:**
- 10 GB storage
- 10 million read operations/month
- 1 million write operations/month

**Integration:**
- Add `@payloadcms/storage-s3` plugin to `payload/src/payload.config.ts`
- Point it at R2 endpoint with R2 API keys

**Migration effort:**
- Minimal code change (~10 lines in Payload config)
- Re-run `scripts/generate-treatment-images.ts` once to re-upload images to R2
- No content migration needed

**Pros:**
- Least migration effort
- Existing content/DB stays untouched
- R2 is genuinely free at this scale

**Cons:**
- Still running a self-hosted server on Railway (cold starts, potential downtime)
- Still handing client a fragile infrastructure to manage
- Payload v3 quirks remain
- Railway free tier has sleep/idle restrictions
- Does not fix the root problem — just patches image storage

**Verdict:** Quickest fix, but not a sustainable client handover solution.

---

## Comparison Table

| Criteria | Sanity (A) | Keystatic (B) | Fix Payload (C) |
|---|---|---|---|
| Monthly cost | Free | Free | Free |
| Image safety | CDN (permanent) | Git repo | R2 (permanent) |
| Server to maintain | None | None | Railway |
| Admin UI quality | Excellent | Good | Good |
| Client-friendliness | High | Medium | Medium |
| Migration effort | High | Medium | Low |
| Vendor dependency | Sanity (hosted) | GitHub | Railway + Cloudflare |
| Astro integration | Official | Official | Custom |
| Rebuild time after edit | ~2 min | ~3 min | ~2 min |

---

## Other Options to Research

- **Tina CMS** — https://tina.io — Git-based with visual editing. Free for 2 users. May be worth evaluating.
- **Storyblok** — https://www.storyblok.com — Free tier is 1 user only (too limited).
- **Contentful** — https://www.contentful.com — Free tier: 2 users, 1 space, 5k records. Worth checking against Sanity.
- **Decap CMS** (formerly Netlify CMS) — https://decapcms.org — Git-based, free, older but stable.

---

## Questions to Validate During Research

1. Is Sanity's free tier stable long-term, or has it changed pricing recently?
2. Does Keystatic support image upload to an external CDN (e.g., Cloudflare Images) to avoid bloating the Git repo?
3. Is there an official Sanity → Astro starter template that matches this stack?
4. Does Sanity Studio support Malayalam/multilingual field labels for the clinic staff?
5. What happens to Sanity content if the free tier is discontinued — can data be exported?
