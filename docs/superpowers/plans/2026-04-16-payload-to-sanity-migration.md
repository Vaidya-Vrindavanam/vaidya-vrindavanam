# Payload CMS → Sanity Migration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Payload CMS (Next.js on Railway + Neon PostgreSQL) with Sanity CMS — eliminating ephemeral image storage, Railway hosting costs, and database maintenance — while keeping all 40 Astro pages and their TypeScript interfaces identical.

**Architecture:** Sanity hosts content and images on its global CDN (free tier). The Astro frontend fetches data via GROQ queries at build time using `@sanity/client`. The `src/lib/sanity.ts` client is a drop-in replacement for `src/lib/payload.ts` — same exported types and function signatures so no page component changes are needed beyond updating the import path.

**Tech Stack:** `@sanity/client` (GROQ queries), `@portabletext/to-html` (rich text → HTML), Sanity Studio (schema-as-code, deployed free to `sanity.studio`), Sanity Image CDN (persistent, uploaded manually via Studio)

---

## Execution Rules (Read Before Starting)

1. **Token budget:** Before starting each task, Claude must confirm with the user: "Ready to begin Task N — [name]. Shall we proceed?" Only continue when the user confirms.
2. **Session end protocol:** When the user signals a pause or the session is running low on tokens, Claude must: (a) mark completed tasks with `- [x]` in this file, (b) update memory with current progress, (c) note the next task to resume from.
3. **Local-first:** Every task is tested locally (`npm run dev` or `npm run build`) before anything is pushed to Vercel or production.
4. **Images:** Treatment images will be uploaded manually by the user via Sanity Studio. No image generation scripts are part of this migration.
5. **Payload stays live** until Task 12 (migration) is confirmed complete in Sanity.

---

## File Map

### Created
| File | Purpose |
|------|---------|
| `sanity/sanity.config.ts` | Studio entrypoint — projectId, dataset, schema list |
| `sanity/sanity.cli.ts` | CLI config (`projectId`, `dataset`) for `sanity` commands |
| `sanity/package.json` | Studio dependencies (sanity, @sanity/vision) |
| `sanity/tsconfig.json` | TypeScript config for the studio |
| `sanity/schemaTypes/index.ts` | Re-exports all schema types |
| `sanity/schemaTypes/treatment.ts` | Treatment document schema |
| `sanity/schemaTypes/condition.ts` | Condition document schema |
| `sanity/schemaTypes/post.ts` | Blog post document schema |
| `src/lib/sanity.ts` | Drop-in replacement for `payload.ts` — same types and function signatures |
| `scripts/migrate-to-sanity.ts` | One-time migration: Payload REST API → Sanity NDJSON import |

### Modified
| File | Change |
|------|--------|
| `src/pages/index.astro` | Import from `../lib/sanity` |
| `src/pages/treatments/index.astro` | Import from `../../lib/sanity` |
| `src/pages/treatments/[...slug].astro` | Import from `../../lib/sanity` |
| `src/pages/conditions/index.astro` | Import from `../../lib/sanity` |
| `src/pages/conditions/[...slug].astro` | Import from `../../lib/sanity` |
| `src/pages/blog/index.astro` | Import from `../../lib/sanity` |
| `src/pages/blog/[...slug].astro` | Import from `../../lib/sanity` |
| `package.json` | Remove `@payloadcms/richtext-lexical`; add `@sanity/client`, `@portabletext/to-html` |
| `.env` | Replace Payload vars with `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN` |
| `CLAUDE.md` | Update architecture, commands, env vars |

### Deleted (after migration confirmed working in production)
- `payload/` — entire Payload CMS backend directory
- `src/lib/payload.ts` — replaced by `src/lib/sanity.ts`

---

## Task 1: Create Sanity Project (Manual — no code to write)

**Files:** None (account + project setup only)

- [ ] **Step 1: Create a free Sanity account**

Go to https://www.sanity.io and sign up with Google or email.

- [ ] **Step 2: Create a new project**

In the Sanity dashboard, click **"New project"**, name it **"Vaidya Vrindavanam"**, choose dataset name **"production"**, pick the **Free plan**.

- [ ] **Step 3: Record your Project ID**

From the project dashboard URL or Settings → API page, note the **Project ID** (8-character string, e.g. `abc12xyz`). You will need this in Task 2 and Task 5.

- [ ] **Step 4: Create an API token**

In the project → Settings → API → Tokens, click **Add API token**:
- Name: `Astro Build`
- Permissions: **Editor** (needed for the migration script; downgrade to Viewer after migration is confirmed)

Copy the token value — it won't be shown again.

- [ ] **Step 5: Add CORS origins**

In Settings → API → CORS Origins, add:
- `http://localhost:4321` (Astro dev server)
- `https://vaidyavrindavanam.com` (production — add later before going live)

**→ Checkpoint:** Share your Project ID with Claude to continue. *(Token is secret — keep it only in `.env`.)*

---

## Task 2: Scaffold Sanity Studio Files

**Files:**
- Create: `sanity/package.json`
- Create: `sanity/tsconfig.json`
- Create: `sanity/sanity.cli.ts`
- Create: `sanity/sanity.config.ts`
- Create: `sanity/schemaTypes/index.ts`

> **Note:** The `sanity/` directory lives at the same level as `vaidya-vrindavanam/`, i.e. `Vaidya Vrindavanam/sanity/`.

- [ ] **Step 1: Create `sanity/package.json`**

```json
{
  "name": "vaidya-vrindavanam-studio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "sanity dev",
    "build": "sanity build",
    "start": "sanity start",
    "deploy": "sanity deploy"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "sanity": "^3.88.0",
    "@sanity/vision": "^3.88.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "typescript": "5.5.4"
  }
}
```

- [ ] **Step 2: Create `sanity/tsconfig.json`**

```json
{
  "compilerOptions": {
    "lib": ["ES2017", "DOM"],
    "module": "preserve",
    "moduleResolution": "bundler",
    "target": "ES2017",
    "strict": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["**/*.ts", "**/*.tsx"]
}
```

- [ ] **Step 3: Create `sanity/sanity.cli.ts`**

Replace `YOUR_PROJECT_ID` with the Project ID from Task 1.

```typescript
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'YOUR_PROJECT_ID',
    dataset: 'production',
  },
  studioHost: 'vaidya-vrindavanam',
})
```

- [ ] **Step 4: Create `sanity/sanity.config.ts`**

Replace `YOUR_PROJECT_ID` with your Project ID.

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'vaidya-vrindavanam',
  title: 'Vaidya Vrindavanam',
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
```

- [ ] **Step 5: Create `sanity/schemaTypes/index.ts`**

```typescript
import { treatment } from './treatment'
import { condition } from './condition'
import { post } from './post'

export const schemaTypes = [treatment, condition, post]
```

- [ ] **Step 6: Install Studio dependencies**

```bash
cd "C:/Users/revat/OneDrive/Desktop/Agentic engineering/Vaidya Vrindavanam/sanity"
npm install
```

Expected: `node_modules/` populated with sanity, react, @sanity/vision.

---

## Task 3: Write Sanity Schema — Treatments

**Files:**
- Create: `sanity/schemaTypes/treatment.ts`

- [ ] **Step 1: Create treatment schema**

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity'

export const treatment = defineType({
  name: 'treatment',
  title: 'Treatment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'sanskrit',
      title: 'Sanskrit Name',
      type: 'string',
    }),
    defineField({
      name: 'malayalam',
      title: 'Malayalam Name',
      type: 'string',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon (emoji)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Treatment Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Panchakarma', value: 'panchakarma' },
          { title: 'Massage Therapies', value: 'massage' },
          { title: 'Speciality Treatments', value: 'speciality' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'conditions',
      title: 'Related Conditions',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'condition' }] })],
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. "45 – 60 minutes"',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 99,
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'content',
      title: 'Full Content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'image' },
  },
})
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
cd "C:/Users/revat/OneDrive/Desktop/Agentic engineering/Vaidya Vrindavanam/sanity"
npx tsc --noEmit
```

Expected: no errors.

---

## Task 4: Write Sanity Schema — Conditions

**Files:**
- Create: `sanity/schemaTypes/condition.ts`

- [ ] **Step 1: Create condition schema**

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity'

export const condition = defineType({
  name: 'condition',
  title: 'Condition',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'treatments',
      title: 'Related Treatments',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'treatment' }] })],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 99,
    }),
    defineField({
      name: 'content',
      title: 'Full Content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'shortDescription' },
  },
})
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd "C:/Users/revat/OneDrive/Desktop/Agentic engineering/Vaidya Vrindavanam/sanity"
npx tsc --noEmit
```

Expected: no errors.

---

## Task 5: Write Sanity Schema — Blog Posts

**Files:**
- Create: `sanity/schemaTypes/post.ts`

- [ ] **Step 1: Create post schema**

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Published Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Dr. Jayakrishnan T J',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Health Tips', value: 'health-tips' },
          { title: 'Treatment Guides', value: 'treatment-guides' },
          { title: 'Seasonal Advice', value: 'seasonal-advice' },
          { title: 'Patient Education', value: 'patient-education' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Published Date, New First',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'date' },
    prepare({ title, subtitle }: { title: string; subtitle: string }) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString('en-IN') : '',
      }
    },
  },
})
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

---

## Task 6: Build `src/lib/sanity.ts` — Drop-in Replacement

**Files:**
- Create: `vaidya-vrindavanam/src/lib/sanity.ts`

This is the most critical file. It exports the **exact same TypeScript types and function signatures** as `payload.ts` so no page components need changing beyond the import path.

- [ ] **Step 1: Install Sanity client and Portable Text in the Astro project**

```bash
cd "C:/Users/revat/OneDrive/Desktop/Agentic engineering/Vaidya Vrindavanam/vaidya-vrindavanam"
npm install @sanity/client @portabletext/to-html
```

Expected: both packages appear in `package.json` dependencies.

- [ ] **Step 2: Create `src/lib/sanity.ts`**

```typescript
import { createClient } from '@sanity/client'
import { toHTML } from '@portabletext/to-html'

const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID as string,
  dataset: (import.meta.env.SANITY_DATASET as string | undefined) ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: import.meta.env.SANITY_API_TOKEN as string | undefined,
})

// ---- Types (identical to payload.ts — pages import these unchanged) ----

export type Treatment = {
  id: string
  slug: string
  name: string
  sanskrit?: string
  malayalam?: string
  shortDescription: string
  icon: string
  imageUrl?: string
  category: 'panchakarma' | 'massage' | 'speciality'
  conditions: Array<{ slug: string }>
  duration?: string
  order: number
  contentHTML: string
  featured: boolean
}

export type Condition = {
  id: string
  slug: string
  name: string
  shortDescription: string
  treatments: Array<{ slug: string }>
  order: number
  contentHTML: string
}

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  date: Date
  author: string
  category: 'health-tips' | 'treatment-guides' | 'seasonal-advice' | 'patient-education'
  contentHTML: string
}

// ---- Portable Text → HTML ----

function portableTextToHTML(content: unknown): string {
  if (!content || !Array.isArray(content) || content.length === 0) return ''
  try {
    return toHTML(content as Parameters<typeof toHTML>[0])
  } catch {
    return ''
  }
}

// ---- Public API (identical signatures to payload.ts) ----

export async function getTreatments(): Promise<Treatment[]> {
  const docs = await client.fetch<Array<{
    _id: string
    name: string
    slug: string
    sanskrit?: string
    malayalam?: string
    shortDescription: string
    icon?: string
    imageUrl?: string
    category: Treatment['category']
    conditions: Array<{ slug: string }>
    duration?: string
    order?: number
    featured?: boolean
    content?: unknown
  }>>(`
    *[_type == "treatment"] | order(order asc) {
      _id,
      name,
      "slug": slug.current,
      sanskrit,
      malayalam,
      shortDescription,
      icon,
      "imageUrl": image.asset->url,
      category,
      "conditions": conditions[]->{
        "slug": slug.current
      },
      duration,
      order,
      featured,
      content
    }
  `)

  return docs.map(doc => ({
    id: doc._id,
    slug: doc.slug,
    name: doc.name,
    sanskrit: doc.sanskrit ?? undefined,
    malayalam: doc.malayalam ?? undefined,
    shortDescription: doc.shortDescription,
    icon: doc.icon ?? '🌿',
    imageUrl: doc.imageUrl ?? undefined,
    category: doc.category,
    conditions: doc.conditions ?? [],
    duration: doc.duration ?? undefined,
    order: doc.order ?? 99,
    contentHTML: portableTextToHTML(doc.content),
    featured: doc.featured ?? false,
  }))
}

export async function getTreatmentBySlug(slug: string): Promise<Treatment | null> {
  const treatments = await getTreatments()
  return treatments.find(t => t.slug === slug) ?? null
}

export async function getConditions(): Promise<Condition[]> {
  const docs = await client.fetch<Array<{
    _id: string
    name: string
    slug: string
    shortDescription: string
    treatments: Array<{ slug: string }>
    order?: number
    content?: unknown
  }>>(`
    *[_type == "condition"] | order(order asc) {
      _id,
      name,
      "slug": slug.current,
      shortDescription,
      "treatments": treatments[]->{
        "slug": slug.current
      },
      order,
      content
    }
  `)

  return docs.map(doc => ({
    id: doc._id,
    slug: doc.slug,
    name: doc.name,
    shortDescription: doc.shortDescription,
    treatments: doc.treatments ?? [],
    order: doc.order ?? 99,
    contentHTML: portableTextToHTML(doc.content),
  }))
}

export async function getConditionBySlug(slug: string): Promise<Condition | null> {
  const conditions = await getConditions()
  return conditions.find(c => c.slug === slug) ?? null
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const docs = await client.fetch<Array<{
    _id: string
    title: string
    slug: string
    excerpt: string
    date: string
    author?: string
    category: BlogPost['category']
    content?: unknown
  }>>(`
    *[_type == "post"] | order(date desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      date,
      author,
      category,
      content
    }
  `)

  return docs.map(doc => ({
    id: doc._id,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    date: doc.date ? new Date(doc.date) : new Date(),
    author: doc.author ?? 'Dr. Jayakrishnan T J',
    category: doc.category,
    contentHTML: portableTextToHTML(doc.content),
  }))
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts()
  return posts.find(p => p.slug === slug) ?? null
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd "C:/Users/revat/OneDrive/Desktop/Agentic engineering/Vaidya Vrindavanam/vaidya-vrindavanam"
npx tsc --noEmit
```

Expected: no errors. (May warn about missing env vars — that's fine at this stage.)

---

## Task 7: Update package.json — Remove Payload Dependency

**Files:**
- Modify: `vaidya-vrindavanam/package.json`

- [ ] **Step 1: Uninstall the Payload richtext package**

```bash
cd "C:/Users/revat/OneDrive/Desktop/Agentic engineering/Vaidya Vrindavanam/vaidya-vrindavanam"
npm uninstall @payloadcms/richtext-lexical
```

Expected: `@payloadcms/richtext-lexical` removed from `package.json` and `node_modules`.

- [ ] **Step 2: Confirm final `package.json` dependencies section**

```json
"dependencies": {
  "@astrojs/sitemap": "3.2.1",
  "@astrojs/tailwind": "^5.1.0",
  "@portabletext/to-html": "^2.0.14",
  "@sanity/client": "^6.25.0",
  "@tailwindcss/typography": "^0.5.15",
  "@vercel/analytics": "^2.0.1",
  "@vercel/speed-insights": "^2.0.0",
  "astro": "^4.16.0",
  "dotenv": "^17.4.2",
  "tailwindcss": "^3.4.0"
}
```

(Exact `@portabletext/to-html` and `@sanity/client` versions will be whatever npm installed.)

---

## Task 8: Update All Astro Page Imports

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/treatments/index.astro`
- Modify: `src/pages/treatments/[...slug].astro`
- Modify: `src/pages/conditions/index.astro`
- Modify: `src/pages/conditions/[...slug].astro`
- Modify: `src/pages/blog/index.astro`
- Modify: `src/pages/blog/[...slug].astro`

- [ ] **Step 1: Update `src/pages/index.astro`**

Find:
```typescript
import { getTreatments, getConditions } from '../lib/payload';
```
Replace with:
```typescript
import { getTreatments, getConditions } from '../lib/sanity';
```

- [ ] **Step 2: Update `src/pages/treatments/index.astro`**

Find:
```typescript
import { getTreatments } from '../../lib/payload';
```
Replace with:
```typescript
import { getTreatments } from '../../lib/sanity';
```

- [ ] **Step 3: Update `src/pages/treatments/[...slug].astro`**

Find:
```typescript
import { getTreatments } from '../../lib/payload';
import type { Treatment } from '../../lib/payload';
```
Replace with:
```typescript
import { getTreatments } from '../../lib/sanity';
import type { Treatment } from '../../lib/sanity';
```

- [ ] **Step 4: Update `src/pages/conditions/index.astro`**

Find:
```typescript
import { getConditions } from '../../lib/payload';
```
Replace with:
```typescript
import { getConditions } from '../../lib/sanity';
```

- [ ] **Step 5: Update `src/pages/conditions/[...slug].astro`**

Find:
```typescript
import { getConditions, getTreatments } from '../../lib/payload';
import type { Condition, Treatment } from '../../lib/payload';
```
Replace with:
```typescript
import { getConditions, getTreatments } from '../../lib/sanity';
import type { Condition, Treatment } from '../../lib/sanity';
```

- [ ] **Step 6: Update `src/pages/blog/index.astro`**

Find:
```typescript
import { getBlogPosts } from '../../lib/payload';
```
Replace with:
```typescript
import { getBlogPosts } from '../../lib/sanity';
```

- [ ] **Step 7: Update `src/pages/blog/[...slug].astro`**

Find:
```typescript
import { getBlogPosts } from '../../lib/payload';
import type { BlogPost } from '../../lib/payload';
```
Replace with:
```typescript
import { getBlogPosts } from '../../lib/sanity';
import type { BlogPost } from '../../lib/sanity';
```

---

## Task 9: Update Environment Variables

**Files:**
- Modify: `vaidya-vrindavanam/.env`

- [ ] **Step 1: Update `.env`**

Replace the existing Payload variables with Sanity variables:

```env
# Sanity CMS
SANITY_PROJECT_ID=your_project_id_here
SANITY_DATASET=production
SANITY_API_TOKEN=your_editor_token_here

# Google Maps (unchanged)
GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>

# kie.ai (kept for reference — image generation script is now manual)
KIE_AI_API_KEY=<your-kie-ai-api-key>
```

> Keep `PAYLOAD_URL` in `.env` temporarily — needed for Task 10 (migration script). Remove it after migration is confirmed.

- [ ] **Step 2: Verify `.env` is in `.gitignore`**

```bash
grep "\.env" "C:/Users/revat/OneDrive/Desktop/Agentic engineering/Vaidya Vrindavanam/vaidya-vrindavanam/.gitignore"
```

Expected: `.env` appears. If not, add it manually.

---

## Task 10: Write Content Migration Script

**Files:**
- Create: `vaidya-vrindavanam/scripts/migrate-to-sanity.ts`

This script fetches all content from the live Payload REST API and imports it into Sanity. Run it **before** shutting down Railway. Images are intentionally skipped — they will be uploaded manually via Sanity Studio.

- [ ] **Step 1: Create migration script**

```typescript
/**
 * migrate-to-sanity.ts
 *
 * One-time migration: Payload CMS REST API → Sanity
 *
 * Fetches treatments, conditions, and blog posts from Payload,
 * converts Lexical rich text to Portable Text blocks,
 * and creates documents in Sanity via mutations API.
 *
 * Images are intentionally NOT migrated — upload manually via Sanity Studio.
 *
 * Usage:
 *   npx tsx scripts/migrate-to-sanity.ts
 *
 * Required env vars (.env):
 *   PAYLOAD_URL        — https://vaidya-vrindavanam-production.up.railway.app
 *   SANITY_PROJECT_ID
 *   SANITY_DATASET
 *   SANITY_API_TOKEN   — must have Editor permissions
 */

import 'dotenv/config'
import { createClient } from '@sanity/client'

const PAYLOAD_URL = process.env.PAYLOAD_URL
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID
const SANITY_DATASET = process.env.SANITY_DATASET ?? 'production'
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN

for (const [k, v] of Object.entries({ PAYLOAD_URL, SANITY_PROJECT_ID, SANITY_API_TOKEN })) {
  if (!v) { console.error(`Missing env var: ${k}`); process.exit(1) }
}

const sanity = createClient({
  projectId: SANITY_PROJECT_ID!,
  dataset: SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: SANITY_API_TOKEN!,
  useCdn: false,
})

// ---- Payload fetch helpers ----

async function fetchPayload(collection: string): Promise<unknown[]> {
  const url = `${PAYLOAD_URL}/api/${collection}?limit=200&depth=1`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Payload fetch failed: ${res.status} for ${collection}`)
  const json = await res.json() as { docs: unknown[] }
  return json.docs
}

// ---- Lexical → Portable Text converter ----
// Handles paragraphs, headings (h2, h3), and unordered lists.
// Preserves bold/italic marks. Falls back gracefully for unknown node types.

type LexicalNode = {
  type: string
  tag?: string
  children?: LexicalNode[]
  text?: string
  format?: number // bitmask: 1=bold, 2=italic
}

type PTSpan = {
  _type: 'span'
  _key: string
  text: string
  marks: string[]
}

type PTBlock = {
  _type: 'block'
  _key: string
  style: string
  children: PTSpan[]
  markDefs: never[]
  level?: number
  listItem?: 'bullet'
}

let keyCounter = 0
function key(): string {
  return `migrated${++keyCounter}`
}

function lexicalChildrenToSpans(children: LexicalNode[]): PTSpan[] {
  return children
    .filter(n => n.type === 'text' && typeof n.text === 'string')
    .map(n => ({
      _type: 'span' as const,
      _key: key(),
      text: n.text ?? '',
      marks: [
        ...(n.format && n.format & 1 ? ['strong'] : []),
        ...(n.format && n.format & 2 ? ['em'] : []),
      ],
    }))
}

function lexicalToPortableText(lexicalData: unknown): PTBlock[] {
  if (!lexicalData || typeof lexicalData !== 'object') return []

  const data = lexicalData as { root?: { children?: LexicalNode[] } }
  const rootChildren = data.root?.children ?? []
  const blocks: PTBlock[] = []

  for (const node of rootChildren) {
    if (node.type === 'paragraph') {
      const children = lexicalChildrenToSpans(node.children ?? [])
      if (children.length === 0) children.push({ _type: 'span', _key: key(), text: '', marks: [] })
      blocks.push({ _type: 'block', _key: key(), style: 'normal', children, markDefs: [] as never[] })
    } else if (node.type === 'heading') {
      const style = node.tag === 'h3' ? 'h3' : 'h2'
      const children = lexicalChildrenToSpans(node.children ?? [])
      if (children.length === 0) children.push({ _type: 'span', _key: key(), text: '', marks: [] })
      blocks.push({ _type: 'block', _key: key(), style, children, markDefs: [] as never[] })
    } else if (node.type === 'list') {
      for (const item of (node.children ?? [])) {
        if (item.type === 'listitem') {
          const children = lexicalChildrenToSpans(item.children ?? [])
          if (children.length === 0) children.push({ _type: 'span', _key: key(), text: '', marks: [] })
          blocks.push({
            _type: 'block', _key: key(), style: 'normal',
            level: 1, listItem: 'bullet', children, markDefs: [] as never[],
          })
        }
      }
    }
    // Unknown node types are silently skipped
  }

  return blocks
}

// ---- Payload document types ----

type PayloadTreatment = {
  id: string
  slug: string
  name: string
  sanskrit?: string | null
  malayalam?: string | null
  shortDescription: string
  icon?: string | null
  category: string
  conditions?: Array<{ slug: string }> | null
  duration?: string | null
  order?: number | null
  featured?: boolean | null
  content?: unknown
}

type PayloadCondition = {
  id: string
  slug: string
  name: string
  shortDescription: string
  treatments?: Array<{ slug: string }> | null
  order?: number | null
  content?: unknown
}

type PayloadBlog = {
  id: string
  slug: string
  title: string
  excerpt: string
  date?: string | null
  author?: string | null
  category?: string | null
  content?: unknown
}

// ---- Transformers ----

function transformTreatment(doc: PayloadTreatment): Record<string, unknown> {
  return {
    _id: `treatment-${doc.slug}`,
    _type: 'treatment',
    name: doc.name,
    slug: { _type: 'slug', current: doc.slug },
    ...(doc.sanskrit ? { sanskrit: doc.sanskrit } : {}),
    ...(doc.malayalam ? { malayalam: doc.malayalam } : {}),
    shortDescription: doc.shortDescription,
    icon: doc.icon ?? '🌿',
    // image intentionally omitted — upload manually via Sanity Studio
    category: doc.category,
    // conditions wired in second pass after all documents exist
    conditions: [],
    ...(doc.duration ? { duration: doc.duration } : {}),
    order: doc.order ?? 99,
    featured: doc.featured ?? false,
    content: lexicalToPortableText(doc.content),
  }
}

function transformCondition(doc: PayloadCondition): Record<string, unknown> {
  return {
    _id: `condition-${doc.slug}`,
    _type: 'condition',
    name: doc.name,
    slug: { _type: 'slug', current: doc.slug },
    shortDescription: doc.shortDescription,
    // treatments wired in second pass
    treatments: [],
    order: doc.order ?? 99,
    content: lexicalToPortableText(doc.content),
  }
}

function transformPost(doc: PayloadBlog): Record<string, unknown> {
  return {
    _id: `post-${doc.slug}`,
    _type: 'post',
    title: doc.title,
    slug: { _type: 'slug', current: doc.slug },
    excerpt: doc.excerpt,
    date: doc.date ?? new Date().toISOString(),
    author: doc.author ?? 'Dr. Jayakrishnan T J',
    category: doc.category ?? 'health-tips',
    content: lexicalToPortableText(doc.content),
  }
}

// ---- Second pass: wire cross-references ----

async function wireTreatmentConditions(treatments: PayloadTreatment[]): Promise<void> {
  for (const treatment of treatments) {
    const conditionSlugs = (treatment.conditions ?? []).map(c => c.slug).filter(Boolean)
    if (conditionSlugs.length === 0) continue

    const refs = conditionSlugs.map(slug => ({
      _type: 'reference',
      _key: key(),
      _ref: `condition-${slug}`,
    }))

    await sanity.patch(`treatment-${treatment.slug}`).set({ conditions: refs }).commit()
    console.log(`  Wired treatment ${treatment.slug} → ${conditionSlugs.join(', ')}`)
  }
}

async function wireConditionTreatments(conditions: PayloadCondition[]): Promise<void> {
  for (const condition of conditions) {
    const treatmentSlugs = (condition.treatments ?? []).map(t => t.slug).filter(Boolean)
    if (treatmentSlugs.length === 0) continue

    const refs = treatmentSlugs.map(slug => ({
      _type: 'reference',
      _key: key(),
      _ref: `treatment-${slug}`,
    }))

    await sanity.patch(`condition-${condition.slug}`).set({ treatments: refs }).commit()
    console.log(`  Wired condition ${condition.slug} → ${treatmentSlugs.join(', ')}`)
  }
}

// ---- Main ----

async function main() {
  console.log('=== Vaidya Vrindavanam — Payload → Sanity Migration ===')
  console.log(`Payload URL: ${PAYLOAD_URL}`)
  console.log(`Sanity project: ${SANITY_PROJECT_ID}/${SANITY_DATASET}\n`)

  console.log('Fetching from Payload...')
  const treatments = await fetchPayload('treatments') as PayloadTreatment[]
  const conditions = await fetchPayload('conditions') as PayloadCondition[]
  const posts = await fetchPayload('blog') as PayloadBlog[]
  console.log(`  ${treatments.length} treatments, ${conditions.length} conditions, ${posts.length} blog posts\n`)

  console.log('Creating treatment documents in Sanity...')
  const treatmentTx = sanity.transaction()
  for (const doc of treatments.map(transformTreatment)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    treatmentTx.createOrReplace(doc as any)
  }
  await treatmentTx.commit()
  console.log(`  ✓ ${treatments.length} treatments created`)

  console.log('Creating condition documents in Sanity...')
  const conditionTx = sanity.transaction()
  for (const doc of conditions.map(transformCondition)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    conditionTx.createOrReplace(doc as any)
  }
  await conditionTx.commit()
  console.log(`  ✓ ${conditions.length} conditions created`)

  console.log('Creating blog post documents in Sanity...')
  const postTx = sanity.transaction()
  for (const doc of posts.map(transformPost)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    postTx.createOrReplace(doc as any)
  }
  await postTx.commit()
  console.log(`  ✓ ${posts.length} blog posts created\n`)

  console.log('Wiring treatment → condition references...')
  await wireTreatmentConditions(treatments)

  console.log('\nWiring condition → treatment references...')
  await wireConditionTreatments(conditions)

  console.log('\n=== Migration complete ===')
  console.log('Next steps:')
  console.log('  1. Verify content in Sanity Studio at sanity.io/manage')
  console.log('  2. Upload treatment images manually via Sanity Studio (Treatments → image field)')
  console.log('  3. Run: npm run build — should produce 40 pages with 0 errors')
  console.log('  4. Remove PAYLOAD_URL from .env')
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
```

---

## Task 11: Run Migration and Verify Data

**Files:** None (script execution only)

> **Prerequisite:** Payload CMS on Railway must be running. Confirm before starting.

- [ ] **Step 1: Ensure `PAYLOAD_URL` is still in `.env`**

```env
PAYLOAD_URL=https://vaidya-vrindavanam-production.up.railway.app
```

- [ ] **Step 2: Run the migration script**

```bash
cd "C:/Users/revat/OneDrive/Desktop/Agentic engineering/Vaidya Vrindavanam/vaidya-vrindavanam"
npx tsx scripts/migrate-to-sanity.ts
```

Expected output:
```
=== Vaidya Vrindavanam — Payload → Sanity Migration ===
Payload URL: https://vaidya-vrindavanam-production.up.railway.app
Sanity project: <id>/production

Fetching from Payload...
  20 treatments, 11 conditions, N blog posts

Creating treatment documents in Sanity...
  ✓ 20 treatments created
Creating condition documents in Sanity...
  ✓ 11 conditions created
Creating blog post documents in Sanity...
  ✓ N blog posts created

Wiring treatment → condition references...
  Wired treatment abhyangam-swedam → arthritis, ...
  ...

Wiring condition → treatment references...
  Wired condition arthritis → abhyangam-swedam, ...
  ...

=== Migration complete ===
```

- [ ] **Step 3: Verify data in Sanity Studio**

Open https://www.sanity.io/manage → select your project → open Studio.

Confirm:
- 20 treatment documents, each with name, slug, category, content, and conditions linked
- 11+ condition documents with treatments linked
- Blog posts present (if any exist in Payload)

- [ ] **Step 4: Remove `PAYLOAD_URL` from `.env`**

Delete the `PAYLOAD_URL` line — it is no longer needed.

---

## Task 12: Test the Astro Build Locally

**Files:** None (build verification)

> **Note:** Treatment image fields will be empty at this stage — that is expected. Images will be uploaded manually via Sanity Studio after the build is confirmed working.

- [ ] **Step 1: Run production build locally**

```bash
cd "C:/Users/revat/OneDrive/Desktop/Agentic engineering/Vaidya Vrindavanam/vaidya-vrindavanam"
npm run build
```

Expected:
```
▶ building production...
✓ Completed in Xs.
40 page(s) generated
0 errors
```

- [ ] **Step 2: Preview locally and spot-check all key pages**

```bash
npm run preview
```

Visit and verify each:
- `http://localhost:4321` — homepage renders with treatments and conditions
- `http://localhost:4321/treatments` — 20 treatment cards listed (no images yet — expected)
- `http://localhost:4321/treatments/shirodhara` — detail page with content renders
- `http://localhost:4321/conditions` — conditions listed
- `http://localhost:4321/conditions/arthritis` — condition page with related treatments
- `http://localhost:4321/blog` — blog listing renders

All pages must render without errors. Empty image slots on treatment cards are expected.

- [ ] **Step 3: Check no references to Payload remain**

```bash
grep -r "payload" "C:/Users/revat/OneDrive/Desktop/Agentic engineering/Vaidya Vrindavanam/vaidya-vrindavanam/src" --include="*.astro" --include="*.ts"
```

Expected: zero results (all imports updated to sanity).

---

## Task 13: Upload Treatment Images via Sanity Studio (Manual)

**Files:** None (manual upload in Sanity Studio UI)

- [ ] **Step 1: Open Sanity Studio locally**

```bash
cd "C:/Users/revat/OneDrive/Desktop/Agentic engineering/Vaidya Vrindavanam/sanity"
npm run dev
```

Opens at `http://localhost:3333`.

- [ ] **Step 2: Upload images for each treatment**

For each of the 20 treatments:
1. Click **Treatments** in the sidebar
2. Open a treatment
3. Click the **Treatment Image** field → upload the image file
4. Fill in the **Alt text** field: `[Treatment name] Ayurveda treatment at Vaidya Vrindavanam, Haripad`
5. Click **Publish**

- [ ] **Step 3: Rebuild locally and verify images appear**

```bash
cd "C:/Users/revat/OneDrive/Desktop/Agentic engineering/Vaidya Vrindavanam/vaidya-vrindavanam"
npm run build && npm run preview
```

Visit `http://localhost:4321/treatments` — treatment cards should now show images served from `cdn.sanity.io`.

---

## Task 14: Deploy Sanity Studio

**Files:** None (deployment only)

- [ ] **Step 1: Deploy Studio to sanity.io hosting (free)**

```bash
cd "C:/Users/revat/OneDrive/Desktop/Agentic engineering/Vaidya Vrindavanam/sanity"
npm run deploy
```

When prompted for a hostname, enter `vaidya-vrindavanam`.

Expected: Studio live at `https://vaidya-vrindavanam.sanity.studio`

This replaces the Railway admin panel (`/admin`). Use this URL to manage all content going forward.

---

## Task 15: Update CLAUDE.md and Decommission Payload/Railway

**Files:**
- Modify: `vaidya-vrindavanam/CLAUDE.md`

- [ ] **Step 1: Update CLAUDE.md backend section**

Replace the Backend section with:

```markdown
### Backend
- **Sanity CMS v3** — Headless CMS with Sanity Studio
- **Sanity Image CDN** — Persistent image hosting (cdn.sanity.io) — no re-upload needed on deploy
- **Studio URL:** https://vaidya-vrindavanam.sanity.studio (for content editing)
- **API client:** `src/lib/sanity.ts` — GROQ queries, same types as old payload.ts
```

Replace the Commands section backend block with:

```markdown
# Sanity Studio (run from ../sanity/ directory)
npm run dev      # Local Studio (localhost:3333)
npm run deploy   # Deploy Studio to vaidya-vrindavanam.sanity.studio
```

Replace env vars section with:

```markdown
## Environment Variables

\`\`\`env
# Frontend (.env in vaidya-vrindavanam/)
SANITY_PROJECT_ID=<your project id>
SANITY_DATASET=production
SANITY_API_TOKEN=<editor token>
GOOGLE_MAPS_API_KEY=...
KIE_AI_API_KEY=...
\`\`\`
```

- [ ] **Step 2: Push to Vercel and confirm production build**

Commit all changes and push to the repo. In Vercel dashboard:
1. Settings → Environment Variables: add `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN`
2. Remove old `PAYLOAD_URL` variable
3. Trigger a redeploy

Verify `https://vaidyavrindavanam.com` loads with Sanity content.

- [ ] **Step 3: Delete `src/lib/payload.ts`**

Only after confirming Vercel production build passes:

```bash
rm "C:/Users/revat/OneDrive/Desktop/Agentic engineering/Vaidya Vrindavanam/vaidya-vrindavanam/src/lib/payload.ts"
```

- [ ] **Step 4: Delete the `payload/` directory**

```bash
rm -rf "C:/Users/revat/OneDrive/Desktop/Agentic engineering/Vaidya Vrindavanam/vaidya-vrindavanam/payload"
```

- [ ] **Step 5: Shut down Railway**

In the Railway dashboard, delete the Payload CMS service.

- [ ] **Step 6: (Optional) Delete Neon database**

In the Neon dashboard, delete the `vaidya-vrindavanam` database project. All content is now in Sanity.

---

## Session Progress Tracker

| Task | Status | Notes |
|------|--------|-------|
| Task 1 — Create Sanity Project | ✅ Done | Project ID: <your-sanity-project-id> |
| Task 2 — Scaffold Studio Files | ✅ Done | |
| Task 3 — Treatment Schema | ✅ Done | |
| Task 4 — Condition Schema | ✅ Done | |
| Task 5 — Blog Post Schema | ✅ Done | |
| Task 6 — `src/lib/sanity.ts` | ✅ Done | Core replacement |
| Task 7 — Update package.json | ✅ Done | |
| Task 8 — Update page imports | ✅ Done | 7 files |
| Task 9 — Update .env | ✅ Done | |
| Task 10 — Migration script | ✅ Done | |
| Task 11 — Run migration | ✅ Done | 20 treatments, 11 conditions, 2 posts migrated |
| Task 12 — Local build test | ✅ Done | 40 pages, 0 errors |
| Task 13 — Upload images (manual) | ✅ Done | All 20 images on cdn.sanity.io. 40 pages built, 0 errors. |
| Task 14 — Deploy Studio | ✅ Done | Live at https://vaidya-vrindavanam.sanity.studio |
| Task 15 — CLAUDE.md + decommission | ✅ Done | CLAUDE.md updated, payload.ts + payload/ deleted, pushed to Vercel |

> **Resume point:** Update this table with `✅ Done` / `🔄 In progress` as tasks complete. At session end, save progress to memory so the next session has full context.
