# Security Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all security vulnerabilities identified in the 2026-04-17 security review, from critical leaked API keys to low-severity hardcoded phone numbers.

**Architecture:** Static Astro 4.x site on Vercel with Sanity CMS. All fixes are code/config changes only — no runtime environment changes. Leaked secrets require both file edits AND git history purge (force-push to GitHub).

**Tech Stack:** Astro 4.x, Tailwind CSS, Sanity CMS, Vercel, Formspree, `sanitize-html`

---

## File Map

| File | Action | Reason |
|------|--------|--------|
| `docs/superpowers/plans/2026-04-16-payload-to-sanity-migration.md` | Modify | Redact 2 live API keys (CRIT-1) |
| `CLAUDE.md` | Modify | Redact Sanity project ID (HIGH-1) |
| `vercel.json` | Modify | Add security headers (HIGH-3) |
| `src/lib/sanity.ts` | Modify | Add sanitize-html to portableTextToHTML (HIGH-2) |
| `src/components/SEO.astro` | Modify | Safe JSON-LD serialization (LOW-5) |
| `src/config/contact.ts` | Create | Centralize phone/WhatsApp/email constants (LOW-2) |
| `src/components/WhatsAppButton.astro` | Modify | Use contact config (LOW-2) |
| `src/components/Navbar.astro` | Modify | Use contact config (LOW-2) |
| `src/components/CTABanner.astro` | Modify | Use contact config (LOW-2) |
| `src/components/Footer.astro` | Modify | Use contact config (LOW-2) |
| `src/components/PackageCard.astro` | Modify | Use contact config (LOW-2) |
| `src/pages/index.astro` | Modify | Use contact config (LOW-2) |
| `src/pages/about.astro` | Modify | Use contact config (LOW-2) |
| `src/pages/packages.astro` | Modify | Use contact config (LOW-2) |
| `src/pages/contact.astro` | Modify | Use contact config + add privacy notice (LOW-2, LOW-3) |
| `src/pages/treatments/[...slug].astro` | Modify | Use contact config (LOW-2) |
| `src/pages/conditions/[...slug].astro` | Modify | Use contact config (LOW-2) |
| `.env.example` | Create | Document all required env vars (MED-2) |
| `package.json` | Modify | Add sanitize-html dependency (HIGH-2) |

---

## Task 1: Redact leaked API keys from docs (CRIT-1)

**Files:**
- Modify: `docs/superpowers/plans/2026-04-16-payload-to-sanity-migration.md:943-949`

- [ ] **Step 1: Replace the two live keys with placeholders**

In `docs/superpowers/plans/2026-04-16-payload-to-sanity-migration.md`, find lines 943–949 and replace:

```
# Google Maps (unchanged)
GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>

# kie.ai (kept for reference — image generation script is now manual)
KIE_AI_API_KEY=<your-kie-ai-api-key>
```

With:

```
# Google Maps (unchanged)
GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>

# kie.ai (kept for reference — image generation script is now manual)
KIE_AI_API_KEY=<your-kie-ai-api-key>
```

- [ ] **Step 2: Commit the redaction**

Run from `vaidya-vrindavanam/`:
```bash
git add docs/superpowers/plans/2026-04-16-payload-to-sanity-migration.md
git commit -m "security: redact live API keys from migration plan docs"
```

- [ ] **Step 3: Purge keys from git history (MANUAL — requires user action)**

The keys were in previous commits. Rotating them alone is not enough — git history on a public repo is cached by GitHub and search engines. The user must run:

```bash
# Install git-filter-repo if not present
pip install git-filter-repo

# From the vaidya-vrindavanam/ repo root, run:
git filter-repo --replace-text <(echo "<your-google-maps-api-key>==>REDACTED_GOOGLE_MAPS_KEY
<your-kie-ai-api-key>==>REDACTED_KIE_AI_KEY") --force

# Force-push all branches
git push origin --force --all
git push origin --force --tags
```

**IMPORTANT:** After force-pushing, go to GitHub → Settings → Security → "Secret scanning alerts" and dismiss the alerts confirming the secrets have been rotated.

- [ ] **Step 4: Rotate the actual API keys (MANUAL — done in provider dashboards)**

1. **Google Maps key:** Go to [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials → find the key → REGENERATE. Then apply restrictions: Application restrictions → HTTP referrers → add `*.vaidyavrindavanam.com/*` and `vaidyavrindavanam.com/*`. API restrictions → restrict to "Maps Embed API" only.

2. **KIE.ai key:** Log into kie.ai dashboard → API Keys → revoke the old key → generate a new one.

3. **Update Vercel env vars:** In the Vercel dashboard → Project → Settings → Environment Variables, update `GOOGLE_MAPS_API_KEY` and `KIE_AI_API_KEY` with the new rotated values.

---

## Task 2: Add security headers to vercel.json (HIGH-3)

**Files:**
- Modify: `vercel.json`

- [ ] **Step 1: Replace vercel.json with the secured version**

The current `vercel.json` has only 5 lines. Replace the entire file with:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.vercel-insights.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob: cdn.sanity.io; frame-src https://www.google.com https://maps.google.com; connect-src 'self' https://vitals.vercel-insights.com https://api.vercel-insights.com https://7rhexv2k.api.sanity.io; object-src 'none'; base-uri 'self';"
        }
      ]
    }
  ]
}
```

- [ ] **Step 2: Verify the build still works**

```bash
cd vaidya-vrindavanam
npm run build
```

Expected: Build completes successfully, `dist/` directory populated with 40 pages.

- [ ] **Step 3: Commit**

```bash
git add vercel.json
git commit -m "security: add security headers (CSP, HSTS, X-Frame-Options, etc.)"
```

---

## Task 3: Sanitize CMS HTML output (HIGH-2)

**Files:**
- Modify: `package.json`
- Modify: `src/lib/sanity.ts`

The `portableTextToHTML()` function converts Sanity Portable Text to an HTML string that is then rendered with `set:html` (bypasses escaping) in all three dynamic detail pages. If the CMS is ever compromised, malicious HTML/JS can be injected. Fix: sanitize the HTML before returning it from `portableTextToHTML`.

- [ ] **Step 1: Install sanitize-html**

```bash
cd vaidya-vrindavanam
npm install sanitize-html
npm install --save-dev @types/sanitize-html
```

- [ ] **Step 2: Update src/lib/sanity.ts to sanitize HTML**

At the top of `src/lib/sanity.ts`, add the import after the existing imports:

```typescript
import sanitizeHtml from 'sanitize-html'
```

Then replace the `portableTextToHTML` function (lines 54–61) with:

```typescript
const ALLOWED_TAGS = [
  'p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li',
  'strong', 'em', 'a', 'br', 'blockquote',
]

const ALLOWED_ATTRS: sanitizeHtml.IOptions['allowedAttributes'] = {
  a: ['href', 'title', 'target', 'rel'],
}

function portableTextToHTML(content: unknown): string {
  if (!content || !Array.isArray(content) || content.length === 0) return ''
  try {
    const raw = toHTML(content as Parameters<typeof toHTML>[0])
    return sanitizeHtml(raw, {
      allowedTags: ALLOWED_TAGS,
      allowedAttributes: ALLOWED_ATTRS,
      allowedSchemes: ['https', 'mailto', 'tel'],
    })
  } catch {
    return ''
  }
}
```

- [ ] **Step 3: Run build to confirm no type errors**

```bash
npm run build
```

Expected: Build succeeds. All treatment/condition/blog pages render normally.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/lib/sanity.ts
git commit -m "security: sanitize CMS HTML output before set:html rendering"
```

---

## Task 4: Redact Sanity project ID from public docs (HIGH-1)

**Files:**
- Modify: `CLAUDE.md`
- Modify: `docs/superpowers/plans/2026-04-16-payload-to-sanity-migration.md`

- [ ] **Step 1: Redact from CLAUDE.md**

In `CLAUDE.md`, find the environment variables section and replace:

```
SANITY_PROJECT_ID=7rhexv2k
```

With:

```
SANITY_PROJECT_ID=<your-sanity-project-id>
```

- [ ] **Step 2: Redact from migration plan**

In `docs/superpowers/plans/2026-04-16-payload-to-sanity-migration.md`, search for all occurrences of `7rhexv2k` and replace each with `<your-sanity-project-id>`.

Also update the CSP `connect-src` in `vercel.json` (already done in Task 2 — it still works, the project ID in a CSP connect-src directive is not a secret since it matches a public API endpoint, but note this for awareness).

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md docs/superpowers/plans/2026-04-16-payload-to-sanity-migration.md
git commit -m "security: redact Sanity project ID from public documentation"
```

---

## Task 5: Add .env.example (MED-2)

**Files:**
- Create: `.env.example`

- [ ] **Step 1: Create .env.example at repo root**

Create `vaidya-vrindavanam/.env.example`:

```bash
# Sanity CMS — get these from sanity.io → Project → Settings → API
# Use a READ-ONLY Viewer token for the build process (not an Editor token)
SANITY_PROJECT_ID=your-sanity-project-id
SANITY_DATASET=production
SANITY_API_TOKEN=your-read-only-viewer-token

# Google Maps Embed API key
# Restrict to: HTTP referrers → vaidyavrindavanam.com/* AND *.vaidyavrindavanam.com/*
# API restriction: Maps Embed API only
GOOGLE_MAPS_API_KEY=your-restricted-google-maps-api-key

# KIE.ai image generation (used only for the manual scripts/ tooling, not the build)
KIE_AI_API_KEY=your-kie-ai-api-key
```

- [ ] **Step 2: Verify .env.example is tracked (not ignored)**

The `.gitignore` has `!.env.example` which explicitly un-ignores it. Confirm:

```bash
git check-ignore -v .env.example
```

Expected: no output (meaning the file is NOT ignored).

- [ ] **Step 3: Commit**

```bash
git add .env.example
git commit -m "docs: add .env.example with all required environment variables"
```

---

## Task 6: Centralize contact details into config (LOW-2)

**Files:**
- Create: `src/config/contact.ts`
- Modify: 11 files that hardcode phone numbers

- [ ] **Step 1: Create src/config/contact.ts**

```typescript
export const PHONE_PRIMARY = '+91 90748 48705'
export const PHONE_PRIMARY_RAW = '919074848705'
export const PHONE_SECONDARY = '+91 82818 61587'
export const PHONE_SECONDARY_RAW = '918281861587'
export const EMAIL = 'ayurvv@gmail.com'

export function whatsappLink(message: string): string {
  return `https://wa.me/${PHONE_PRIMARY_RAW}?text=${encodeURIComponent(message)}`
}

export const WA_DEFAULT = whatsappLink('Hi, I\'d like to book an appointment at Vaidya Vrindavanam')
export const WA_BOOKING = whatsappLink('Hi, I\'d like to book an appointment at Vaidya Vrindavanam')
```

- [ ] **Step 2: Update src/components/WhatsAppButton.astro**

Read the file first, then add the import and replace hardcoded values.

At the top of the frontmatter, add:
```typescript
import { WA_DEFAULT, PHONE_PRIMARY_RAW } from '../config/contact';
```

Replace every occurrence of `https://wa.me/919074848705` with `WA_DEFAULT` and `919074848705` with `PHONE_PRIMARY_RAW`.

- [ ] **Step 3: Update src/components/Navbar.astro**

Add import:
```typescript
import { PHONE_PRIMARY, WA_DEFAULT } from '../config/contact';
```

Replace hardcoded phone numbers and WhatsApp links with the imported constants.

- [ ] **Step 4: Update src/components/CTABanner.astro**

Add import:
```typescript
import { WA_DEFAULT, PHONE_PRIMARY } from '../config/contact';
```

Replace hardcoded values.

- [ ] **Step 5: Update src/components/Footer.astro**

Add import:
```typescript
import { PHONE_PRIMARY, PHONE_SECONDARY, EMAIL, WA_DEFAULT } from '../config/contact';
```

Replace hardcoded values.

- [ ] **Step 6: Update src/components/PackageCard.astro**

Add import:
```typescript
import { WA_DEFAULT } from '../config/contact';
```

Replace hardcoded WhatsApp link.

- [ ] **Step 7: Update src/pages/index.astro**

Add import:
```typescript
import { WA_DEFAULT, PHONE_PRIMARY } from '../config/contact';
```

Replace hardcoded values.

- [ ] **Step 8: Update src/pages/about.astro**

Add import:
```typescript
import { WA_DEFAULT, PHONE_PRIMARY } from '../config/contact';
```

Replace hardcoded values.

- [ ] **Step 9: Update src/pages/packages.astro**

Add import:
```typescript
import { WA_DEFAULT, PHONE_PRIMARY } from '../config/contact';
```

Replace hardcoded values.

- [ ] **Step 10: Update src/pages/contact.astro**

Add import:
```typescript
import { PHONE_PRIMARY, PHONE_SECONDARY, EMAIL, WA_DEFAULT } from '../config/contact';
```

Replace hardcoded values. Also add privacy notice (see Task 7 below — do both edits in this file together).

- [ ] **Step 11: Update src/pages/treatments/[...slug].astro**

The `waLink` variable is built inline. Replace:
```typescript
const waLink = `https://wa.me/919074848705?text=${encodeURIComponent(`Hi, I'm interested in ${treatment.name}. Please share more details.`)}`;
```

With:
```typescript
import { whatsappLink } from '../../config/contact';
const waLink = whatsappLink(`Hi, I'm interested in ${treatment.name}. Please share more details.`);
```

- [ ] **Step 12: Update src/pages/conditions/[...slug].astro**

Add import and replace hardcoded WhatsApp link similarly to Step 11:
```typescript
import { whatsappLink } from '../../config/contact';
```

- [ ] **Step 13: Run build to verify no broken references**

```bash
npm run build
```

Expected: Build succeeds, all 40 pages generated.

- [ ] **Step 14: Commit**

```bash
git add src/config/contact.ts src/components/ src/pages/
git commit -m "refactor: centralize contact details in src/config/contact.ts"
```

---

## Task 7: Add privacy notice to contact form (LOW-3)

**Files:**
- Modify: `src/pages/contact.astro`

This edit is done in the same file as Task 6 Step 10. If Task 6 is complete, just add the privacy notice now.

- [ ] **Step 1: Add privacy notice below the submit button in contact.astro**

In `src/pages/contact.astro`, after the `<button type="submit">SEND MESSAGE</button>` line and before the closing `</form>` tag, add:

```html
<p class="text-xs text-text-subtle mt-3">
  Your information is processed securely via
  <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" class="text-brand-gold underline">Formspree</a>
  and used only to respond to your enquiry. We do not share your data with third parties.
</p>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: add privacy notice to contact form"
```

---

## Task 8: Fix JSON-LD schema serialization (LOW-5)

**Files:**
- Modify: `src/components/SEO.astro`

The current `JSON.stringify(schema)` passed to `set:html` is safe now (all schema objects are built from hardcoded server-side data), but if a blog title like `</script><script>alert(1)</script>` ever came from the CMS, it would break out of the JSON-LD context. Fix by escaping `<`, `>`, and `&` in the serialized JSON.

- [ ] **Step 1: Update SEO.astro JSON-LD rendering**

In `src/components/SEO.astro`, replace line 50:

```astro
  <script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

With:

```astro
  <script type="application/ld+json" set:html={JSON.stringify(schema).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')} />
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SEO.astro
git commit -m "security: escape HTML chars in JSON-LD schema serialization"
```

---

## Task 9: Remove Railway infrastructure details from docs (MED-6)

**Files:**
- Modify: `IMPLEMENTATION_SUMMARY.md`
- Modify: `PAYLOAD_DEPLOY.md` (review and redact if it contains URLs/tokens)

- [ ] **Step 1: Check IMPLEMENTATION_SUMMARY.md for sensitive infrastructure details**

Read the file and identify any Railway URLs, project IDs, database connection strings, or Neon DB URLs. Replace all specific infrastructure identifiers with placeholders like `<railway-project-url>` and `<neon-db-url>`.

- [ ] **Step 2: Check PAYLOAD_DEPLOY.md**

Read the file and redact any Railway tokens, project IDs, or database credentials.

- [ ] **Step 3: Confirm Railway project is deprovisioned (MANUAL)**

Log into [railway.app](https://railway.app) and confirm the old Payload CMS + Neon PostgreSQL project has been deleted. If it still exists, delete it. Also revoke any Railway API tokens that were created for the old deployment.

- [ ] **Step 4: Commit**

```bash
git add IMPLEMENTATION_SUMMARY.md PAYLOAD_DEPLOY.md
git commit -m "security: redact legacy Railway/Payload infrastructure details from docs"
```

---

## Task 10: Manual steps requiring user action (MED-1, MED-3, LOW-4)

These cannot be automated from the codebase. The user must complete these in external dashboards.

- [ ] **MED-3: Downgrade Sanity API token to read-only Viewer**

  1. Go to [sanity.io](https://sanity.io) → Project → API → Tokens
  2. Revoke the current Editor/Write token used for the Astro build
  3. Create a new token: name it "Astro Build (read-only)", role = **Viewer**
  4. Copy the new token
  5. Update in Vercel dashboard → Settings → Environment Variables → `SANITY_API_TOKEN`
  6. Update your local `.env` file with the new token
  7. Run `npm run build` locally to confirm the read-only token can still fetch all content

- [ ] **MED-1: Enable Formspree domain restriction**

  1. Log into [formspree.io](https://formspree.io) → Forms → `mgoreanz`
  2. Settings → Submissions → Allowed Domains → add `vaidyavrindavanam.com`
  3. Enable spam filtering / reCAPTCHA or Cloudflare Turnstile if on a paid plan

- [ ] **LOW-4: Close the ineffective Netlify security PR**

  The open PR on branch `security/http-headers-form-honeypot` targets Netlify (via `netlify.toml`) but the project is deployed on Vercel. Security headers are now in `vercel.json` (done in Task 2).

  ```bash
  gh pr list
  # Find the PR number for security/http-headers-form-honeypot
  gh pr close <PR-NUMBER> --comment "Security headers implemented in vercel.json instead — this PR targeted Netlify which is not the active deployment platform."
  ```

---

## Final Verification

- [ ] **Run a full production build**

```bash
cd vaidya-vrindavanam
npm run build
npm run preview
```

Visit `http://localhost:4321` and check:
- Homepage loads
- A treatment detail page loads (check content renders with `set:html` still working after sanitization)
- A condition detail page loads
- A blog post loads
- Contact form is visible with privacy notice

- [ ] **Verify security headers with securityheaders.com (MANUAL)**

After deploying to Vercel:
1. Deploy: push to main or run `vercel --prod`
2. Visit [securityheaders.com](https://securityheaders.com) and enter `https://vaidyavrindavanam.com`
3. Expected score: A or A+

- [ ] **Final commit push**

```bash
git push origin main
```

---

## Summary of Manual Actions Required from User

| Priority | Action | Where |
|----------|--------|-------|
| CRITICAL | Rotate Google Maps API key + restrict to domain | Google Cloud Console |
| CRITICAL | Rotate KIE.ai API key | kie.ai dashboard |
| CRITICAL | Purge keys from git history + force push | Terminal (git filter-repo) |
| High | Downgrade Sanity token to Viewer/read-only | sanity.io |
| Medium | Enable Formspree domain restriction | formspree.io |
| Low | Close the Netlify security PR | GitHub |
| Low | Confirm Railway project is deprovisioned | railway.app |
