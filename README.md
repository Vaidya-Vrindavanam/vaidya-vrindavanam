# Vaidya Vrindavanam — Ayurveda Hospital Website

Official website for **Vaidya Vrindavanam Ayurveda Hospital**, Haripad, Alappuzha, Kerala, India.

**Live site:** [vaidyavrindavanam.com](https://vaidyavrindavanam.com)  
**CMS Studio:** [vaidya-vrindavanam.sanity.studio](https://vaidya-vrindavanam.sanity.studio)

---

## About the Project

A dark-premium static marketing website built with Astro and Sanity CMS. It targets two audiences — local Kerala patients and international medical tourists / NRIs — and drives bookings via WhatsApp.

**Key numbers:**
- 40 static pages
- 20+ treatments across 3 categories
- 11+ medical conditions
- 5 curated treatment packages
- Zero JavaScript shipped to the browser (except mobile nav & FAQ accordion)

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | [Astro](https://astro.build) | `^5.18.1` |
| Styling | [Tailwind CSS](https://tailwindcss.com) | `^3.4.0` |
| CMS | [Sanity v3](https://sanity.io) | `@sanity/client ^7.21.0` |
| Rich Text | `@portabletext/to-html` + `sanitize-html` | — |
| Analytics | Vercel Analytics + GA4 | — |
| Contact Form | [Formspree](https://formspree.io) | — |
| Hosting | [Vercel](https://vercel.com) | — |
| Sitemap | `@astrojs/sitemap` | `^3.7.2` |
| Typography | `@tailwindcss/typography` | `^0.5.15` |

---

## Prerequisites

- **Node.js** `>=18`
- **npm** `>=9`
- A [Sanity.io](https://sanity.io) account with the project configured (Project ID: `7rhexv2k`)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Vaidya-Vrindavanam/vaidya-vrindavanam.git
cd vaidya-vrindavanam
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and fill in the values:

```bash
cp .env.example .env
```

```env
SANITY_PROJECT_ID=7rhexv2k
SANITY_DATASET=production
SANITY_API_TOKEN=<your-sanity-read-token>
GOOGLE_MAPS_API_KEY=<optional>
KIE_AI_API_KEY=<optional - only needed for image generation scripts>
```

Get your Sanity API token from [sanity.io/manage](https://sanity.io/manage) → Project → API → Tokens → Add API token (Viewer role).

### 4. Start the development server

```bash
npm run dev
# → http://localhost:4321
```

---

## Available Scripts

All commands are run from the `vaidya-vrindavanam/` directory.

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build production site → `dist/` (40 pages) |
| `npm run preview` | Preview production build locally |

---

## Project Structure

```
vaidya-vrindavanam/
├── src/
│   ├── components/         # Reusable Astro components
│   │   ├── BaseLayout.astro      # Root layout (SEO, Navbar, Footer, WhatsApp button)
│   │   ├── SEO.astro             # Meta tags, OG, JSON-LD schema injection
│   │   ├── Navbar.astro          # Sticky nav with mobile hamburger overlay
│   │   ├── Footer.astro          # 3-column footer
│   │   ├── WhatsAppButton.astro  # Fixed floating booking button
│   │   ├── TreatmentCard.astro   # Treatment image card
│   │   ├── CTABanner.astro       # "Begin Your Healing Journey" section
│   │   ├── PackageCard.astro     # Package listing card
│   │   ├── BlogPostCard.astro    # Blog article card
│   │   ├── FAQAccordion.astro    # Collapsible FAQ component
│   │   └── ...
│   ├── pages/              # File-based routing (every .astro file = a page)
│   │   ├── index.astro           # Homepage
│   │   ├── about.astro
│   │   ├── packages.astro
│   │   ├── contact.astro
│   │   ├── 404.astro
│   │   ├── treatments/
│   │   │   ├── index.astro       # All treatments
│   │   │   └── [...slug].astro   # Dynamic treatment detail pages
│   │   ├── conditions/
│   │   │   ├── index.astro       # All conditions
│   │   │   └── [...slug].astro   # Dynamic condition detail pages
│   │   └── blog/
│   │       ├── index.astro       # Blog listing
│   │       └── [...slug].astro   # Dynamic blog post pages
│   ├── lib/
│   │   └── sanity.ts             # Sanity GROQ client + typed fetch functions
│   └── config/
│       └── contact.ts            # Clinic contact details (single source of truth)
├── public/                 # Static assets (robots.txt, favicon, og-image)
├── scripts/                # Utility scripts (image generation, etc.)
├── tailwind.config.mjs     # Design tokens (brand-gold, brand-bg, etc.)
├── astro.config.mjs        # Astro + integrations config
├── vercel.json             # Vercel deployment config + security headers
└── .env.example            # Environment variable template
```

---

## Data Flow

Content is fetched **at build time** — there is no client-side API call:

```
Sanity CMS
   ↓  GROQ queries (src/lib/sanity.ts)
Astro build
   ↓  Static HTML generation
dist/ (40 pages)
   ↓  Deployed to
Vercel CDN → vaidyavrindavanam.com
```

When content is updated in Sanity Studio, Vercel automatically triggers a rebuild and redeploys within ~1–2 minutes.

### Sanity query functions (`src/lib/sanity.ts`)

| Function | Returns |
|----------|---------|
| `getTreatments()` | All treatments ordered by `order` field |
| `getTreatmentBySlug(slug)` | Single treatment with related conditions |
| `getConditions()` | All conditions ordered by `order` field |
| `getConditionBySlug(slug)` | Single condition with related treatments |
| `getBlogPosts()` | All posts ordered newest-first |
| `getBlogPostBySlug(slug)` | Single blog post |

---

## Sanity CMS

The Sanity Studio is deployed at [vaidya-vrindavanam.sanity.studio](https://vaidya-vrindavanam.sanity.studio).

To run the Studio locally:

```bash
cd ../sanity
npm install
npm run dev
# → http://localhost:3333
```

To deploy Studio changes:

```bash
npm run deploy
```

### Collections

#### `treatment`
| Field | Type | Notes |
|-------|------|-------|
| `name` | string | Required |
| `slug` | slug | Auto-generated from name |
| `sanskrit` | string | Sanskrit name |
| `malayalam` | string | Malayalam name |
| `shortDescription` | string | Required — used on cards |
| `icon` | string | Emoji (legacy, now replaced by image) |
| `image` | image | Uploaded to Sanity CDN |
| `category` | string | `panchakarma` / `massage` / `speciality` |
| `conditions` | reference[] | Links to Condition documents |
| `duration` | string | e.g. "45 minutes" |
| `order` | number | Sort order (lower = first) |
| `featured` | boolean | Shows on homepage |
| `content` | Portable Text | Full treatment description |

#### `condition`
| Field | Type | Notes |
|-------|------|-------|
| `name` | string | Required |
| `slug` | slug | Auto-generated |
| `shortDescription` | string | Required |
| `treatments` | reference[] | Links to Treatment documents |
| `order` | number | Sort order |
| `content` | Portable Text | Full condition description |

#### `post` (blog)
| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Required |
| `slug` | slug | Auto-generated |
| `excerpt` | string | Required — used on listing cards |
| `date` | datetime | Required |
| `author` | string | Default: "Dr. Jayakrishnan T J" |
| `category` | string | `health-tips` / `treatment-guides` / `seasonal-advice` / `patient-education` |
| `content` | Portable Text | Full article body |

---

## Design System

Design tokens are defined in `tailwind.config.mjs`. Always use semantic token names — never hardcode hex values.

### Color Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-bg` | `#0f1a0a` | Primary background (near-black forest green) |
| `brand-bg-alt` | `#162210` | Alternating section background |
| `brand-bg-footer` | `#080e05` | Footer |
| `brand-gold` | `#c8a96e` | Headings, accents, borders, CTAs |
| `brand-gold-dim` | `rgba(200,169,110,0.15)` | Subtle fills |
| `brand-gold-border` | `rgba(200,169,110,0.2)` | Card borders |
| `brand-whatsapp` | `#25D366` | WhatsApp buttons |
| `text-primary` | `#e8e0d0` | Body text |
| `text-secondary` | `#a09080` | Descriptions |
| `text-muted` | `#8b8070` | Labels, timestamps |

### Typography

| Class | Font | Used For |
|-------|------|----------|
| `font-display` | Cormorant Garamond | All headings |
| `font-body` | Inter | Body text, labels, nav, CTAs |

### Rules

- No rounded corners on cards — `rounded-sm` maximum
- All CTAs must link to `wa.me/919074848705` or `tel:` links
- Client-side JS only for: mobile menu toggle and FAQ accordions

---

## Deployment

### Vercel (Production)

The site is deployed on Vercel with automatic deploys on push to `main`.

**Build settings (in `vercel.json`):**
- Build command: `npm run build`
- Output directory: `dist`
- Clean URLs: enabled (no `.html` extensions)
- Trailing slash: disabled

**Environment variables to set in Vercel dashboard:**

```
SANITY_PROJECT_ID
SANITY_DATASET
SANITY_API_TOKEN
GOOGLE_MAPS_API_KEY
```

### Security Headers

All routes include the following headers (configured in `vercel.json`):

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security` (HSTS, 1 year)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (camera, microphone, geolocation disabled)
- Full `Content-Security-Policy`

---

## SEO

Every page implements the following SEO features:

- **Title format:** `{Page Topic} | Vaidya Vrindavanam Ayurveda Hospital, Haripad`
- **JSON-LD Structured Data:**
  - Homepage → `MedicalBusiness`
  - Treatment pages → `MedicalTherapy` + `BreadcrumbList`
  - Condition pages → `MedicalCondition` + `BreadcrumbList`
  - Blog posts → `Article` + `BreadcrumbList`
  - Packages + Contact → `FAQPage`
  - Treatments listing → `ItemList`
- **Sitemap:** Auto-generated at `/sitemap-index.xml` (via `@astrojs/sitemap`)
- **OG + Twitter Card** meta tags on all pages
- **`robots.txt`** in `public/`
- **GA4** Measurement ID: `G-48TMD9CGFK`
- **Google Business Profile** linked in `MedicalBusiness` schema

---

## Clinic Details

Configured as a single source of truth in `src/config/contact.ts`:

| Field | Value |
|-------|-------|
| Phone (primary) | +91 90748 48705 |
| Phone (secondary) | +91 82818 61587 |
| Email | ayurvv@gmail.com |
| Address | Near RK Junction, NH-66, Haripad, Alappuzha, Kerala 690514 |
| Hours (Mon–Sat) | 9:00 AM–12:00 PM & 4:00 PM–7:00 PM |
| Sunday | Closed (outpatient) |
| WhatsApp | wa.me/919074848705 |
| Operating since | 2014 |

---

## Open TODOs

- [ ] Add real doctor photos (placeholders in `about.astro` and `index.astro`)
- [ ] Replace placeholder testimonials with real patient quotes
- [ ] Fix Google Maps iframe embed (needs real API key in `contact.astro`)
- [ ] Add more blog posts (target: 8–10 for launch)
- [ ] Set up GA4 custom events (WhatsApp clicks, phone call clicks, form submissions)

---

## Key Reference Documents

| Document | Path | Purpose |
|----------|------|---------|
| Design spec | `docs/superpowers/specs/2026-03-31-vaidya-vrindavanam-website-design.md` | Full product design |
| Implementation plan | `docs/superpowers/plans/2026-03-31-vaidya-vrindavanam-website.md` | Build plan |
| Site architecture | `Site-Architecture.md` | Routes, nav, internal links, SEO strategy |
| Clinic owner guide | `../DOCUMENTATION.md` | Non-technical documentation for the clinic owner |

---

## License

Private — all rights reserved. Not open source.
