# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Website for **Vaidya Vrindavanam Ayurveda Hospital** (Haripad, Kerala, India). Dark-premium static site targeting local patients and medical tourists/NRIs. Primary conversion action: WhatsApp booking.

## Commands

```bash
npm run dev      # Start dev server (localhost:4321)
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

All commands run from the `vaidya-vrindavanam/` directory.

## Tech Stack

- **Astro 4.x** — static site generator (zero JS by default)
- **Tailwind CSS v3** with `@tailwindcss/typography` plugin
- **Google Fonts** — Cormorant Garamond (display) + Inter (body)
- **No framework** — pure `.astro` components, no React/Vue/Svelte

## Architecture

### Layout & Components

Every page uses `BaseLayout.astro` which wraps content with `SEO.astro` (head), `Navbar.astro`, `Footer.astro`, and `WhatsAppButton.astro` (fixed floating button). Pages pass `title`, `description`, and optional `schema` (JSON-LD) props to BaseLayout.

**Note:** The current `index.astro` does NOT use BaseLayout yet — it has its own inline HTML. New pages should use BaseLayout.

### Content Strategy (Planned)

The site will use **Astro Content Collections** (`src/content/`) with Markdown files for:
- `treatments/` — 20 treatment pages (Abhyangam, Shirodhara, Pizhichil, etc.)
- `conditions/` — 11 condition pages (Arthritis, Asthma, Diabetes, etc.)
- `blog/` — Educational articles

Dynamic routes at `/treatments/[slug]`, `/conditions/[slug]`, `/blog/[slug]` will render these. Content collection schemas go in `src/content/config.ts`.

### Pages Roadmap

| Page | Route | Status |
|---|---|---|
| Homepage | `/` | Scaffold only (placeholder) |
| About | `/about` | Not started |
| Treatments listing | `/treatments` | Not started |
| Treatment detail | `/treatments/[slug]` | Not started |
| Packages | `/packages` | Not started |
| Conditions listing | `/conditions` | Not started |
| Conditions detail | `/conditions/[slug]` | Not started |
| Blog listing | `/blog` | Not started |
| Blog post | `/blog/[slug]` | Not started |
| Contact | `/contact` | Not started |

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

## Key Reference Documents

- **Design spec:** `docs/superpowers/specs/2026-03-31-vaidya-vrindavanam-website-design.md` — full page-by-page design with sections, content, and layout details
- **Site architecture:** `Site-Architecture.md` — routes, nav structure, internal linking, SEO requirements
- **Implementation plan:** `docs/superpowers/plans/2026-03-31-vaidya-vrindavanam-website.md` — step-by-step build plan with file structure

## SEO Requirements

- JSON-LD schema markup per page (LocalBusiness, MedicalBusiness, FAQPage, Article)
- Unique title/description per page (SEO component handles format: `{title} | Vaidya Vrindavanam Ayurveda Hospital, Haripad`)
- Sitemap auto-generated via `@astrojs/sitemap` (site: `https://vaidyavrindavanam.com`)
- Image alt text must include location + treatment keywords

## Clinic Details (for content)

- **Phone:** +91 90748 48705, +91 82818 61587
- **Email:** ayurvv@gmail.com
- **Location:** Haripad, Alappuzha, Kerala — 690514
- **Hours:** Mon–Sat 9AM–12PM & 4PM–7PM, Sunday closed
- **USP:** Marma Chikitsa combined with modern chiropractic treatment
- **Operating since:** 2014
