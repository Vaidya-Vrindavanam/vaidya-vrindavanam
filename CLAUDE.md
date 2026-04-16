# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Website for **Vaidya Vrindavanam Ayurveda Hospital** (Haripad, Kerala, India). Dark-premium static site targeting local patients and medical tourists/NRIs. Primary conversion action: WhatsApp booking (+91 90748 48705).

**Status:** Production-ready. 40 static pages live at vaidyavrindavanam.com.

## Commands

```bash
# Frontend (run from vaidya-vrindavanam/ directory)
npm run dev      # Start Astro dev server (localhost:4321)
npm run build    # Production build → dist/ (40 pages)
npm run preview  # Preview production build locally

# Sanity Studio (run from ../sanity/ directory)
npm run dev      # Local Studio (localhost:3333)
npm run deploy   # Deploy Studio to vaidya-vrindavanam.sanity.studio
```

## Tech Stack

### Frontend
- **Astro 4.x** — static site generator (zero JS by default)
- **Tailwind CSS v3** with `@tailwindcss/typography` plugin
- **Google Fonts** — Cormorant Garamond (display) + Inter (body)
- **No framework** — pure `.astro` components, no React/Vue/Svelte
- **Vercel Analytics & Speed Insights**

### Backend
- **Sanity CMS v3** — Headless CMS with Sanity Studio
- **Sanity Image CDN** — Persistent image hosting (cdn.sanity.io) — no re-upload needed on deploy
- **Studio URL:** https://vaidya-vrindavanam.sanity.studio (for content editing)
- **API client:** `src/lib/sanity.ts` — GROQ queries, same types as old payload.ts
- **Vercel** — hosts Astro frontend

## Architecture

### Data Flow

```
Sanity CMS → GROQ API → Astro build-time fetch (src/lib/sanity.ts)
→ 40 static HTML pages → Vercel CDN (vaidyavrindavanam.com)
```

All content is fetched at **build time** — zero JavaScript in browser. API client is at `src/lib/sanity.ts` (functions: `getTreatments`, `getConditions`, `getBlogPosts`).

### Layout & Components

Every page uses `BaseLayout.astro` which wraps content with `SEO.astro` (head), `Navbar.astro`, `Footer.astro`, and `WhatsAppButton.astro` (fixed floating button). Pages pass `title`, `description`, and optional `schema` (JSON-LD) props to BaseLayout.

### Pages (all complete)

| Page | Route | Notes |
|---|---|---|
| Homepage | `/` | Hero, treatments, conditions, testimonials, CTA |
| About | `/about` | Clinic story + doctors |
| Treatments listing | `/treatments` | All 20+ treatments |
| Treatment detail | `/treatments/[slug]` | Dynamic, fetches from Sanity |
| Packages | `/packages` | 5 packages + pricing |
| Conditions listing | `/conditions` | All 11+ conditions |
| Conditions detail | `/conditions/[slug]` | Dynamic, links to treatments |
| Blog listing | `/blog` | All articles |
| Blog post | `/blog/[slug]` | Dynamic, rich text content |
| Contact | `/contact` | Maps + form + FAQ |

### CMS Collections (Sanity)

- **Treatments** — name, slug, sanskrit, malayalam, shortDescription, icon, image (Sanity Image CDN), category (panchakarma|massage|speciality), conditions[], content (Portable Text), featured, order
- **Conditions** — name, slug, shortDescription, treatments[], content (Portable Text), order
- **Blog** — title, slug, excerpt, date, author, category, content (Portable Text)

**Studio:** https://vaidya-vrindavanam.sanity.studio

## Design System

### Color Tokens (defined in `tailwind.config.mjs`)

Use these semantic token names — do not hardcode hex values:

- **Backgrounds:** `brand-bg` (primary dark), `brand-bg-alt` (alternating sections), `brand-bg-footer` (darkest)
- **Accent:** `brand-gold`, `brand-gold-dim` (subtle fills), `brand-gold-border` (borders)
- **Text:** `text-primary`, `text-secondary`, `text-muted`, `text-subtle`
- **CTA:** `brand-whatsapp`

### Typography

- `font-display` — Cormorant Garamond for headings (light weight, tracked)
- `font-body` — Inter for body text, labels, nav, CTAs
- Labels use uppercase + wide tracking (`tracking-widest` or `tracking-[4px]`)

### Design Rules

- **No rounded corners** on cards — use `rounded-sm` at most
- Dark premium aesthetic: near-black forest greens with antique gold accents
- Generous whitespace between sections
- All CTAs link to WhatsApp (`wa.me/919074848705`) or `tel:` links
- Client-side JS only for: mobile menu toggle, FAQ accordions. Everything else is static.

## Treatment Card Images

Images are hosted on **Sanity Image CDN** (`cdn.sanity.io`) — persistent, no re-upload needed on redeploy. Uploaded manually via Sanity Studio (Treatments → Treatment Image field).

## Environment Variables

```
# Frontend (.env in vaidya-vrindavanam/)
SANITY_PROJECT_ID=7rhexv2k
SANITY_DATASET=production
SANITY_API_TOKEN=<editor token>
GOOGLE_MAPS_API_KEY=...
KIE_AI_API_KEY=...
```

Also set `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN` in Vercel dashboard → Settings → Environment Variables.

## Key Reference Documents

- **Design spec:** `docs/superpowers/specs/2026-03-31-vaidya-vrindavanam-website-design.md`
- **Site architecture:** `Site-Architecture.md` — routes, nav, internal linking, SEO strategy
- **Implementation plan:** `docs/superpowers/plans/2026-03-31-vaidya-vrindavanam-website.md`
- **Deployment guide:** `PAYLOAD_DEPLOY.md` — Neon + Railway + Vercel setup
- **TODO tracker:** `TODO.md`

## SEO Requirements

- JSON-LD schema markup per page (LocalBusiness, MedicalBusiness, FAQPage, Article)
- Unique title/description per page (format: `{title} | Vaidya Vrindavanam Ayurveda Hospital, Haripad`)
- Sitemap auto-generated via `@astrojs/sitemap` (site: `https://vaidyavrindavanam.com`)
- Image alt text must include location + treatment keywords

## Clinic Details (for content)

- **Phone:** +91 90748 48705, +91 82818 61587
- **Email:** ayurvv@gmail.com
- **Location:** Haripad, Alappuzha, Kerala — 690514
- **Hours:** Mon–Sat 9AM–12PM & 4PM–7PM, Sunday closed
- **USP:** Marma Chikitsa combined with modern chiropractic treatment
- **Operating since:** 2014

## Open TODOs

- Fix Google Maps embed (placeholder in `contact.astro`)
- Add real doctor photos (Dr. Ganga, Dr. Jayakrishnan — placeholders in `about.astro` & `index.astro`)
- Google Analytics / Search Console setup
