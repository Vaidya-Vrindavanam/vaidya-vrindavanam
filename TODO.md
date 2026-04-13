# Vaidya Vrindavanam Website — Progress Tracker

Last updated: 2026-04-01

---

## DONE

- [x] Project scaffold (Astro 4.x + Tailwind CSS v3 + typography plugin)
- [x] `tailwind.config.mjs` — custom dark-premium design tokens (brand-bg, brand-gold, text-*)
- [x] `src/layouts/BaseLayout.astro` — HTML shell, Google Fonts, JSON-LD schema slot
- [x] `src/components/Navbar.astro` — responsive nav with mobile hamburger
- [x] `src/components/Footer.astro` — links, contact info, copyright
- [x] `src/content/config.ts` — Zod schemas for treatments, conditions, blog collections
- [x] `src/content/treatments/` — 20 treatment markdown files (full body content)
- [x] `src/content/conditions/` — 11 condition markdown files (full body content)
- [x] `src/content/blog/` — 2 initial blog posts
- [x] Components: SectionHeader, StatsBar, DoctorProfile, TreatmentCard, PackageCard, ConditionTag, CTABanner, FAQAccordion, BlogPostCard
- [x] `src/pages/index.astro` — Hero, StatsBar, About+Doctors, Treatments, Conditions, Packages, Testimonials, CTA
- [x] `src/pages/about.astro` — Clinic story, differentiators, facility, doctor bios
- [x] `src/pages/treatments/index.astro` — Grouped by category (Panchakarma / Massage / Speciality)
- [x] `src/pages/treatments/[...slug].astro` — Dynamic treatment detail pages (MedicalTherapy schema)
- [x] `src/pages/packages.astro` — 5 packages with WhatsApp CTAs + FAQ section
- [x] `src/pages/conditions/index.astro` — Conditions listing
- [x] `src/pages/conditions/[...slug].astro` — Condition detail with related treatments
- [x] `src/pages/blog/index.astro` — Blog listing (sorted newest first)
- [x] `src/pages/blog/[...slug].astro` — Blog post detail (Article schema)
- [x] `src/pages/contact.astro` — Netlify form + contact info + Google Maps + FAQ
- [x] `astro.config.mjs` — sitemap integration (`@astrojs/sitemap`)
- [x] **Build verified: 40 static pages, 0 errors** (`npm run build` — 2026-04-01)

---

## TODO

### High Priority

- [ ] **Fix Google Maps embed** — Replace placeholder iframe src in `contact.astro` (line 103) with the real embed URL from the clinic's Google Business Profile
- [ ] **Doctor photos** — Replace circular "Photo" placeholder divs with real clinic images in `about.astro` and `index.astro`
- [x] **Confirm email address** — Updated everywhere to `ayurvv@gmail.com`.

### Deployment (Task 13)

- [ ] Create `netlify.toml` with build command + publish dir + 404 redirect
- [ ] Push repo to GitHub (needs client's GitHub account)
- [ ] Connect GitHub repo to Netlify or Vercel
- [ ] Set custom domain (if client has one)
- [ ] Test Netlify Form submission on live URL

### Nice-to-Have

- [ ] Add more blog posts (plan suggests 3–5 at launch)
- [ ] Real testimonials — replace placeholder testimonials section on homepage with actual patient quotes
- [ ] `src/pages/404.astro` — Custom not-found page
- [ ] Open Graph image (`og:image`) for social sharing previews
- [ ] Google Analytics / Search Console setup (once deployed)

---

## Notes

- Dev server: `npm run dev` → http://localhost:4321/
- Build: `npm run build` → `dist/` (40 pages)
- WhatsApp number: +91 90748 48705
- Secondary phone: +91 82818 61587
- All CTAs link to `wa.me/919074848705` with pre-filled messages
