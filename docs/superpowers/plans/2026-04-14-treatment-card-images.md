# Treatment Card Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace emoji icons on treatment cards with photorealistic WebP images generated via the kie.ai Nanobanana Pro API, displayed in the top half of each card.

**Architecture:** Three frontend files wire up the existing Payload `image` field to the card UI (payload.ts fetches at depth=1, TreatmentCard renders the image, treatments page passes the prop). A standalone TypeScript script handles one-time image generation: calls kie.ai → converts PNG to WebP with sharp → uploads to Payload Media → assigns to each treatment.

**Tech Stack:** Astro 4, TypeScript, sharp (WebP conversion), kie.ai REST API (Nanobanana Pro), Payload CMS REST API, tsx (script runner)

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/lib/payload.ts` | Modify | Add `imageUrl` to `Treatment` type; fetch treatments at depth=1 |
| `src/components/TreatmentCard.astro` | Modify | Render image top-half + text bottom-half; replace emoji |
| `src/pages/treatments/index.astro` | Modify | Pass `imageUrl` prop to TreatmentCard |
| `scripts/generate-treatment-images.ts` | Create | kie.ai generation → sharp WebP → Payload upload + assignment |
| `.env` | Modify | Add `KIE_AI_API_KEY`, `PAYLOAD_EMAIL`, `PAYLOAD_PASSWORD` |

---

## Task 1: Update `payload.ts` — add `imageUrl` to Treatment

**Files:**
- Modify: `src/lib/payload.ts`

- [ ] **Step 1: Add `imageUrl` to the `Treatment` type and add `depth` param to `fetchCollection`**

In `src/lib/payload.ts`, make these two changes:

Change the `Treatment` type (add `imageUrl` after `icon`):
```ts
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
```

Change `fetchCollection` to accept an optional `depth` param:
```ts
async function fetchCollection(collection: string, depth = 0): Promise<unknown[]> {
  if (!PAYLOAD_URL) {
    console.warn(`[payload.ts] PAYLOAD_URL not set — ${collection} will be empty`)
    return []
  }
  try {
    const res = await fetch(`${PAYLOAD_URL}/api/${collection}?limit=200&depth=${depth}`)
    if (!res.ok) throw new Error(`Payload API error: ${res.status} for ${collection}`)
    const json = await res.json() as { docs: unknown[] }
    return json.docs
  } catch (err) {
    console.error(`[payload.ts] Failed to fetch ${collection}:`, err)
    return []
  }
}
```

- [ ] **Step 2: Update `getTreatments` to use depth=1 and map imageUrl**

Replace the `getTreatments` function:
```ts
export async function getTreatments(): Promise<Treatment[]> {
  const docs = await fetchCollection('treatments', 1) as PayloadTreatment[]
  return docs.map(doc => ({
    id: doc.id,
    slug: doc.slug,
    name: doc.name,
    sanskrit: doc.sanskrit ?? undefined,
    malayalam: doc.malayalam ?? undefined,
    shortDescription: doc.shortDescription,
    icon: doc.icon ?? '🌿',
    imageUrl: typeof doc.image === 'object' && doc.image !== null
      ? `${PAYLOAD_URL}${(doc.image as { url?: string | null }).url ?? ''}`
      : undefined,
    category: doc.category,
    conditions: (doc.conditions ?? []) as Array<{ slug: string }>,
    duration: doc.duration ?? undefined,
    order: doc.order ?? 99,
    contentHTML: lexicalToHTML(doc.content),
    featured: doc.featured ?? false,
  }))
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run from `vaidya-vrindavanam/`:
```bash
npm run build 2>&1 | head -30
```
Expected: build succeeds (or only pre-existing errors, none from payload.ts)

- [ ] **Step 4: Commit**

```bash
git add src/lib/payload.ts
git commit -m "feat: add imageUrl to Treatment type, fetch treatments at depth=1"
```

---

## Task 2: Update `TreatmentCard.astro` — image on top, text below

**Files:**
- Modify: `src/components/TreatmentCard.astro`

- [ ] **Step 1: Replace the entire component**

Replace all content of `src/components/TreatmentCard.astro` with:

```astro
---
interface Props {
  name: string;
  description: string;
  slug: string;
  imageUrl?: string;
}

const { name, description, slug, imageUrl } = Astro.props;
---

<a href={`/treatments/${slug}`} class="block bg-brand-bg/60 border border-brand-gold-dim hover:border-brand-gold transition-colors group overflow-hidden">
  <div class="aspect-[3/2] overflow-hidden bg-brand-bg-alt">
    {imageUrl
      ? <img src={imageUrl} alt={name} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      : <div class="w-full h-full" />
    }
  </div>
  <div class="p-4 text-center">
    <div class="text-sm text-text-primary font-semibold group-hover:text-brand-gold transition-colors">{name}</div>
    <div class="text-xs text-text-muted mt-2 leading-relaxed">{description}</div>
  </div>
</a>
```

- [ ] **Step 2: Start dev server and verify the card renders**

```bash
npm run dev
```

Open `http://localhost:4321/treatments`. Expected: cards show a dark placeholder block on top (no image uploaded yet), name + description below. No emoji visible. No broken images.

- [ ] **Step 3: Commit**

```bash
git add src/components/TreatmentCard.astro
git commit -m "feat: replace emoji with image block in TreatmentCard"
```

---

## Task 3: Update `treatments/index.astro` — pass imageUrl prop

**Files:**
- Modify: `src/pages/treatments/index.astro`

- [ ] **Step 1: Update the TreatmentCard call**

In `src/pages/treatments/index.astro`, change line 35 from:
```astro
<TreatmentCard name={t.name} description={t.shortDescription} icon={t.icon} slug={t.slug} />
```
to:
```astro
<TreatmentCard name={t.name} description={t.shortDescription} imageUrl={t.imageUrl} slug={t.slug} />
```

- [ ] **Step 2: Verify build passes with no type errors**

```bash
npm run build 2>&1 | grep -E "error|warning" | head -20
```
Expected: no errors related to TreatmentCard or imageUrl.

- [ ] **Step 3: Commit**

```bash
git add src/pages/treatments/index.astro
git commit -m "feat: pass imageUrl to TreatmentCard on treatments page"
```

---

## Task 4: Create image generation script

**Files:**
- Modify: `.env`
- Create: `scripts/generate-treatment-images.ts`

- [ ] **Step 1: Add env vars to `.env`**

Append to `vaidya-vrindavanam/.env`:
```
KIE_AI_API_KEY=<your-kie-ai-api-key>
PAYLOAD_EMAIL=<your-payload-admin-email>
PAYLOAD_PASSWORD=<your-payload-admin-password>
```

Replace the placeholder values with real credentials before running the script.

- [ ] **Step 2: Install `sharp` and `dotenv`**

From `vaidya-vrindavanam/`:
```bash
npm install sharp dotenv
npm install --save-dev @types/node tsx
```

Expected: `sharp`, `dotenv`, `tsx`, `@types/node` appear in package.json.

- [ ] **Step 3: Create `scripts/generate-treatment-images.ts`**

Create `vaidya-vrindavanam/scripts/generate-treatment-images.ts` with the full content below:

```typescript
import 'dotenv/config'
import sharp from 'sharp'

const PAYLOAD_URL = process.env.PAYLOAD_URL!
const KIE_AI_API_KEY = process.env.KIE_AI_API_KEY!
const PAYLOAD_EMAIL = process.env.PAYLOAD_EMAIL!
const PAYLOAD_PASSWORD = process.env.PAYLOAD_PASSWORD!

const STYLE_SUFFIX =
  ', Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k'

const TREATMENTS: { slug: string; name: string; prompt: string }[] = [
  {
    slug: 'nasyam',
    name: 'Nasyam',
    prompt: "Ayurvedic therapist gently applying drops of medicated oil into patient's nostril using a small dropper, patient lying back on wooden treatment table, copper vessel of herbal oil beside them",
  },
  {
    slug: 'raktamoksham',
    name: 'Raktamoksham',
    prompt: "Close-up of medicinal leeches placed on patient's skin for traditional Ayurvedic Raktamokshana bloodletting therapy, dark stone surface, medicinal herbs and copper bowls nearby",
  },
  {
    slug: 'vamanam',
    name: 'Vamanam',
    prompt: 'Ayurvedic patient sitting cross-legged holding a copper cup of herbal decoction for Vamana therapy, surrounded by traditional medicinal herb preparations and brass vessels on a wooden tray',
  },
  {
    slug: 'vasthi',
    name: 'Vasthi',
    prompt: 'Traditional Ayurvedic Vasthi medicated enema therapy preparation — brass Vasthi vessel filled with warm medicated oil, neatly arranged with herbal preparations and white cloth on a dark wooden surface',
  },
  {
    slug: 'abhyangam-swedam',
    name: 'Abhyangam & Swedam',
    prompt: 'Two Ayurvedic therapists performing synchronized Abhyangam full-body oil massage on patient lying on wooden droni table, hands gliding with warm golden sesame oil, herbal steam rising in background',
  },
  {
    slug: 'choorna-pinda-swedam',
    name: 'Choorna Pinda Swedam',
    prompt: "Ayurvedic therapist pressing warm linen boluses filled with herbal powder onto patient's shoulder and back in circular strokes, steam rising from the heated bundles",
  },
  {
    slug: 'elakizhi',
    name: 'Elakizhi',
    prompt: "Ayurvedic therapist massaging patient's back with fresh medicinal leaf boluses — bundles of large green leaves tied in cloth, dipped in warm medicated oil",
  },
  {
    slug: 'jambeera-pinda-swedam',
    name: 'Jambeera Pinda Swedam',
    prompt: "Therapist applying warm citrus herb boluses to patient's knee — halved lemons and medicinal herbs wrapped tightly in white cloth, golden oil glistening on skin",
  },
  {
    slug: 'udwarthanam',
    name: 'Udwarthanam',
    prompt: "Ayurvedic therapist vigorously massaging herbal powder into patient's leg in firm upward strokes for Udwarthanam therapy, fine green herbal powder visible on skin",
  },
  {
    slug: 'uzhichil',
    name: 'Uzhichil',
    prompt: "Skilled Kerala therapist performing traditional deep-pressure Uzhichil massage with both palms pressing firmly along patient's spine on a dark wooden droni, medicated oil pooling on skin",
  },
  {
    slug: 'agnikarmam',
    name: 'Agnikarmam',
    prompt: "Ayurvedic practitioner holding a thin glowing Agnikarma metal rod, precisely applying controlled heat to patient's specific pain point on the lower back",
  },
  {
    slug: 'katee-greeva-vasthi',
    name: 'Katee Vasthi & Greeva Vasthi',
    prompt: "Close-up of Kati Vasti therapy — a circular dough dam ring on patient's lower back filled with warm dark medicated oil, golden oil surface reflecting candlelight",
  },
  {
    slug: 'marma-chikitsa',
    name: 'Marma Chikitsa',
    prompt: "Ayurvedic Marma therapist pressing precise finger pressure on the vital energy point on patient's forearm, focused expression",
  },
  {
    slug: 'njavara-kizhi',
    name: 'Njavara Kizhi',
    prompt: "Therapist massaging patient's shoulder with warm white Njavara rice boluses — soft cloth bundles of cooked medicated rice dripping with warm milk decoction on skin",
  },
  {
    slug: 'njavara-theppu',
    name: 'Njavara Theppu',
    prompt: 'Therapist spreading a creamy white Njavara rice paste evenly over patient\'s forearm and chest with gentle hands, the paste glistening in warm light',
  },
  {
    slug: 'pichu',
    name: 'Pichu',
    prompt: "Therapist carefully placing a thick square of white cotton gauze soaked in warm medicated oil directly over patient's spine vertebrae, golden oil slowly saturating the cloth",
  },
  {
    slug: 'pizhichil',
    name: 'Pizhichil',
    prompt: "Two Ayurvedic therapists simultaneously squeezing warm medicated oil from white cloth over patient's entire body lying on droni — streams of golden oil pouring down the sides",
  },
  {
    slug: 'shirodhara',
    name: 'Shirodhara',
    prompt: "Continuous thin stream of warm golden medicated oil flowing from a brass dhara vessel onto the centre of patient's forehead, patient lying still with eyes closed in complete peace",
  },
  {
    slug: 'thalam',
    name: 'Thalam',
    prompt: "Dark herbal medicinal paste applied in a neat circular mound on the crown of patient's head, a small copper coin pressed into the centre, patient seated serenely",
  },
  {
    slug: 'tharpanam',
    name: 'Tharpanam',
    prompt: "Close-up of Netra Tarpana eye therapy — a patient's eyes surrounded by neat dough rings filled with warm golden medicated ghee, lashes visible under the clear ghee pool",
  },
]

// ---- Payload auth ----

async function getPayloadToken(): Promise<string> {
  const res = await fetch(`${PAYLOAD_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: PAYLOAD_EMAIL, password: PAYLOAD_PASSWORD }),
  })
  if (!res.ok) throw new Error(`Payload login failed: ${res.status}`)
  const json = await res.json() as { token: string }
  return json.token
}

// ---- kie.ai API ----

async function createKieTask(prompt: string): Promise<string> {
  const res = await fetch('https://api.kie.ai/api/v1/jobs/createTask', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${KIE_AI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'nano-banana-pro',
      input: {
        prompt: prompt + STYLE_SUFFIX,
        image_input: [],
        aspect_ratio: '3:2',
      },
    }),
  })
  if (!res.ok) throw new Error(`kie.ai createTask failed: ${res.status} ${await res.text()}`)
  const json = await res.json() as { code: number; data: { taskId: string } }
  if (json.code !== 200) throw new Error(`kie.ai error: ${JSON.stringify(json)}`)
  return json.data.taskId
}

async function pollKieTask(taskId: string): Promise<string> {
  const MAX_WAIT_MS = 5 * 60 * 1000 // 5 minutes
  const start = Date.now()

  while (Date.now() - start < MAX_WAIT_MS) {
    await new Promise(r => setTimeout(r, 10_000)) // wait 10s between polls

    const res = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, {
      headers: { 'Authorization': `Bearer ${KIE_AI_API_KEY}` },
    })
    if (!res.ok) throw new Error(`kie.ai poll failed: ${res.status}`)
    const json = await res.json() as {
      code: number
      data: {
        successFlag: number
        progress?: string
        response?: { result_urls: string[] }
        errorMessage?: string
      }
    }

    const { successFlag, progress, response, errorMessage } = json.data
    console.log(`  polling… progress=${progress ?? '?'} flag=${successFlag}`)

    if (successFlag === 1) {
      const url = response?.result_urls?.[0]
      if (!url) throw new Error('No result URL in completed task')
      return url
    }
    if (successFlag === 2) throw new Error(`kie.ai generation failed: ${errorMessage}`)
  }
  throw new Error(`kie.ai task ${taskId} timed out after 5 minutes`)
}

// ---- Image processing ----

async function downloadImage(url: string): Promise<Buffer> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed: ${res.status} for ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

async function convertToWebP(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer).webp({ quality: 85 }).toBuffer()
}

// ---- Payload Media upload ----

async function uploadToPayload(webpBuffer: Buffer, filename: string, token: string): Promise<number> {
  // FormData is a global in Node 18+ — no import needed
  const formData = new FormData()
  formData.append('file', new Blob([webpBuffer], { type: 'image/webp' }), filename)
  formData.append('alt', filename.replace('.webp', ''))

  const res = await fetch(`${PAYLOAD_URL}/api/media`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData as unknown as BodyInit,
  })
  if (!res.ok) throw new Error(`Payload media upload failed: ${res.status} ${await res.text()}`)
  const json = await res.json() as { doc: { id: number } }
  return json.doc.id
}

// ---- Treatment update ----

async function assignImageToTreatment(slug: string, mediaId: number, token: string): Promise<void> {
  // First find the treatment by slug
  const res = await fetch(`${PAYLOAD_URL}/api/treatments?where[slug][equals]=${slug}&limit=1&depth=0`, {
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Failed to find treatment ${slug}: ${res.status}`)
  const json = await res.json() as { docs: Array<{ id: number }> }
  const treatment = json.docs[0]
  if (!treatment) throw new Error(`Treatment not found for slug: ${slug}`)

  const patchRes = await fetch(`${PAYLOAD_URL}/api/treatments/${treatment.id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: mediaId }),
  })
  if (!patchRes.ok) throw new Error(`Failed to update treatment ${slug}: ${patchRes.status} ${await patchRes.text()}`)
}

// ---- Main ----

async function main() {
  console.log('Logging into Payload CMS…')
  const token = await getPayloadToken()
  console.log('Authenticated.\n')

  for (const treatment of TREATMENTS) {
    console.log(`▶ ${treatment.name} (${treatment.slug})`)

    try {
      console.log('  creating kie.ai task…')
      const taskId = await createKieTask(treatment.prompt)
      console.log(`  task created: ${taskId}`)

      const imageUrl = await pollKieTask(taskId)
      console.log(`  image ready: ${imageUrl}`)

      const pngBuffer = await downloadImage(imageUrl)
      const webpBuffer = await convertToWebP(pngBuffer)
      console.log(`  converted to WebP (${webpBuffer.length} bytes)`)

      const filename = `${treatment.slug}.webp`
      const mediaId = await uploadToPayload(webpBuffer, filename, token)
      console.log(`  uploaded to Payload Media (id=${mediaId})`)

      await assignImageToTreatment(treatment.slug, mediaId, token)
      console.log(`  ✓ assigned to treatment\n`)
    } catch (err) {
      console.error(`  ✗ FAILED: ${(err as Error).message}\n`)
    }
  }

  console.log('Done.')
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
```

- [ ] **Step 4: Test the script with a single treatment (smoke test)**

To avoid generating all 20 at once, temporarily edit the `TREATMENTS` array at the top of the script to only include one entry (e.g., `shirodhara`), then run:

```bash
npx tsx scripts/generate-treatment-images.ts
```

Expected output:
```
Logging into Payload CMS…
Authenticated.

▶ Shirodhara (shirodhara)
  creating kie.ai task…
  task created: task_nano-banana-pro_...
  polling… progress=0.00 flag=0
  polling… progress=0.50 flag=0
  image ready: https://...
  converted to WebP (XXXXX bytes)
  uploaded to Payload Media (id=XX)
  ✓ assigned to treatment

Done.
```

Then visit `http://localhost:4321/treatments` — the Shirodhara card should now show the generated image.

Restore all 20 treatments in the array once the smoke test passes.

- [ ] **Step 5: Run the full script for all 20 treatments**

```bash
npx tsx scripts/generate-treatment-images.ts
```

Expected: all 20 treatments print `✓ assigned to treatment`. Any failures print `✗ FAILED` with the error — rerun just the failed ones by temporarily commenting out the rest.

- [ ] **Step 6: Verify the treatments page visually**

With dev server running (`npm run dev`), visit `http://localhost:4321/treatments`.

Check:
- All 20 cards show photorealistic WebP images in the top half
- Names and descriptions display correctly below
- Hovering a card scales the image and turns the title gold
- No broken image icons anywhere

- [ ] **Step 7: Run production build**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 8: Commit**

```bash
git add scripts/generate-treatment-images.ts package.json package-lock.json .env
git commit -m "feat: add treatment image generation script (kie.ai → WebP → Payload)"
```

Note: ensure `.env` is in `.gitignore` before committing. If it isn't, do NOT stage `.env` — add it to `.gitignore` first.
