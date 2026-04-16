# Treatment Card Image Redesign

**Date:** 2026-04-14  
**Status:** Approved  

---

## Context

The `/treatments` page currently shows each treatment card with a single emoji icon, the treatment name, and a short description. The emoji icons look unprofessional and detract from the clinic's premium positioning. The goal is to replace them with photorealistic AI-generated images (produced via Nanobanana Pro) that show each procedure being performed — warm amber lighting, authentic Kerala Ayurveda atmosphere.

The Payload CMS `Treatments` collection already has an `image` upload field wired to the `Media` collection. It is unused in the frontend. This redesign activates that field.

---

## Design Decisions

- **Card layout:** Clean & minimal — image fills the top half (3:2 aspect ratio), treatment name + description below. No category tags, no CTA text.
- **Image style:** Photorealistic. Warm golden-amber lighting. Procedure being performed (therapist hands, patient receiving treatment). Dark, moody background consistent with the site aesthetic.
- **Upload workflow:** User generates images with Nanobanana Pro → uploads to Payload Media library → assigns to each treatment via admin panel → site rebuilds.
- **Fallback:** Cards without an image yet show a subtle dark placeholder (no emoji, no broken image). The page looks clean at any stage of image rollout.
- **Hover effect:** Image scales up (105%) on card hover. Title transitions to brand-gold. Consistent with existing hover patterns.

---

## Files to Change

| File | Change |
|------|--------|
| `src/lib/payload.ts` | Fetch treatments at `depth=1` so `image` returns a Media object; map `imageUrl` |
| `src/components/TreatmentCard.astro` | Add `imageUrl` prop; render `<img>` block on top; remove emoji |
| `src/pages/treatments/index.astro` | Pass `imageUrl={t.imageUrl}` to TreatmentCard |
| `scripts/generate-treatment-images.ts` | New script: calls kie.ai API → converts to WebP → uploads to Payload |

No changes needed to Payload CMS schema — the `image` field already exists.

---

## Implementation Details

### 1. `src/lib/payload.ts`

Change fetch depth for treatments from `0` to `1`:
```
/api/treatments?limit=200&depth=1
```

At depth=1, `doc.image` becomes `{ id, url, alt, ... }` when populated, or `null` when unset.

Update the `PayloadTreatment` interface to type the populated image:
```ts
image?: { url: string; alt?: string } | number | null
```

Add `imageUrl` to the returned `Treatment` object:
```ts
imageUrl: typeof doc.image === 'object' && doc.image !== null
  ? `${PAYLOAD_URL}${doc.image.url}`
  : undefined,
```

Add `imageUrl?: string` to the local `Treatment` type.

### 2. `src/components/TreatmentCard.astro`

New props: `name`, `description`, `slug`, `imageUrl?` (drop `icon`).

New structure:
```astro
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

### 3. `src/pages/treatments/index.astro`

Change the TreatmentCard call:
```astro
<TreatmentCard name={t.name} description={t.shortDescription} imageUrl={t.imageUrl} slug={t.slug} />
```

---

## Image Generation Script

A standalone script at `scripts/generate-treatment-images.ts` automates the full pipeline:

1. For each treatment: POST to kie.ai API with Nanobanana Pro
2. Poll `GET /api/v1/jobs/recordInfo?taskId=` every 10s until `successFlag === 1`
3. Download the PNG from `data.response.result_urls[0]`
4. Convert to WebP using `sharp` (smaller file size, better page speed)
5. Upload WebP to Payload Media via `POST /api/media` (multipart)
6. PATCH the treatment record to set `image` field to the new Media ID

**API details:**
- Create: `POST https://api.kie.ai/api/v1/jobs/createTask`
  - `model: "nano-banana-pro"`, `input.aspect_ratio: "3:2"`
  - Auth: `Authorization: Bearer ${KIE_AI_API_KEY}`
- Poll: `GET https://api.kie.ai/api/v1/jobs/recordInfo?taskId={taskId}`
  - `successFlag`: 0 = generating, 1 = success, 2 = failed
  - Image URL: `data.response.result_urls[0]`

**Environment variables required:**
- `KIE_AI_API_KEY` — user-provided kie.ai API key (add to `.env`)
- `PAYLOAD_URL` — already set
- `PAYLOAD_EMAIL` + `PAYLOAD_PASSWORD` — Payload admin credentials for API auth

**Dependencies to add:** `sharp`, `form-data` (or Node 18+ native `FormData`)

**Output format:** WebP at quality 85 — kie.ai outputs PNG/JPG natively, `sharp` converts before upload.

**Image dimensions:** `aspect_ratio: "3:2"` with `resolution: "1K"` (~1024×683 px) — matches card `aspect-[3/2]`.

---

## Nanobanana Pro Image Prompts

**Style suffix appended to every prompt:** `, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k`

Generate one image per treatment using the prompt below:

---

### Panchakarma (4 treatments)

**Nasyam** (`nasyam`)
> Ayurvedic therapist gently applying drops of medicated oil into patient's nostril using a small dropper, patient lying back on wooden treatment table, copper vessel of herbal oil beside them, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k

**Raktamoksham** (`raktamoksham`)
> Close-up of medicinal leeches placed on patient's skin for traditional Ayurvedic Raktamokshana bloodletting therapy, dark stone surface, medicinal herbs and copper bowls nearby, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k

**Vamanam** (`vamanam`)
> Ayurvedic patient sitting cross-legged holding a copper cup of herbal decoction for Vamana therapy, surrounded by traditional medicinal herb preparations and brass vessels on a wooden tray, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k

**Vasthi** (`vasthi`)
> Traditional Ayurvedic Vasthi medicated enema therapy preparation — brass Vasthi vessel filled with warm medicated oil, neatly arranged with herbal preparations and white cloth on a dark wooden surface, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k

---

### Massage Therapies (6 treatments)

**Abhyangam & Swedam** (`abhyangam-swedam`)
> Two Ayurvedic therapists performing synchronized Abhyangam full-body oil massage on patient lying on wooden droni table, hands gliding with warm golden sesame oil, herbal steam rising in background, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k

**Choorna Pinda Swedam** (`choorna-pinda-swedam`)
> Ayurvedic therapist pressing warm linen boluses filled with herbal powder onto patient's shoulder and back in circular strokes, steam rising from the heated bundles, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k

**Elakizhi** (`elakizhi`)
> Ayurvedic therapist massaging patient's back with fresh medicinal leaf boluses — bundles of large green leaves tied in cloth, dipped in warm medicated oil, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k

**Jambeera Pinda Swedam** (`jambeera-pinda-swedam`)
> Therapist applying warm citrus herb boluses to patient's knee — halved lemons and medicinal herbs wrapped tightly in white cloth, golden oil glistening on skin, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k

**Udwarthanam** (`udwarthanam`)
> Ayurvedic therapist vigorously massaging herbal powder into patient's leg in firm upward strokes for Udwarthanam therapy, fine green herbal powder visible on skin, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k

**Uzhichil** (`uzhichil`)
> Skilled Kerala therapist performing traditional deep-pressure Uzhichil massage with both palms pressing firmly along patient's spine on a dark wooden droni, medicated oil pooling on skin, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k

---

### Speciality Treatments (10 treatments)

**Agnikarmam** (`agnikarmam`)
> Ayurvedic practitioner holding a thin glowing Agnikarma metal rod, precisely applying controlled heat to patient's specific pain point on the lower back, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k

**Katee Vasthi & Greeva Vasthi** (`katee-greeva-vasthi`)
> Close-up of Kati Vasti therapy — a circular dough dam ring on patient's lower back filled with warm dark medicated oil, golden oil surface reflecting candlelight, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k

**Marma Chikitsa** (`marma-chikitsa`)
> Ayurvedic Marma therapist pressing precise finger pressure on the vital energy point on patient's forearm, focused expression, subtle energy lines implied in the composition, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k

**Njavara Kizhi** (`njavara-kizhi`)
> Therapist massaging patient's shoulder with warm white Njavara rice boluses — soft cloth bundles of cooked medicated rice dripping with warm milk decoction on skin, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k

**Njavara Theppu** (`njavara-theppu`)
> Therapist spreading a creamy white Njavara rice paste evenly over patient's forearm and chest with gentle hands, the paste glistening in warm light, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k

**Pichu** (`pichu`)
> Therapist carefully placing a thick square of white cotton gauze soaked in warm medicated oil directly over patient's spine vertebrae, golden oil slowly saturating the cloth, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k

**Pizhichil** (`pizhichil`)
> Two Ayurvedic therapists simultaneously squeezing warm medicated oil from white cloth over patient's entire body lying on droni — streams of golden oil pouring down the sides, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k

**Shirodhara** (`shirodhara`)
> Continuous thin stream of warm golden medicated oil flowing from a brass dhara vessel onto the centre of patient's forehead, patient lying still with eyes closed in complete peace, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k

**Thalam** (`thalam`)
> Dark herbal medicinal paste applied in a neat circular mound on the crown of patient's head, a small copper coin pressed into the centre, patient seated serenely, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k

**Tharpanam** (`tharpanam`)
> Close-up of Netra Tarpana eye therapy — a patient's eyes surrounded by neat dough rings filled with warm golden medicated ghee, lashes visible under the clear ghee pool, Kerala Ayurvedic treatment, warm amber candlelight, shallow depth of field, professional spa photography, dark moody background, photorealistic, high detail, 8k

---

## Upload Workflow

1. Add `KIE_AI_API_KEY`, `PAYLOAD_EMAIL`, `PAYLOAD_PASSWORD` to `.env`
2. Run `npx tsx scripts/generate-treatment-images.ts` from `vaidya-vrindavanam/`
3. Script generates all 20 images, converts to WebP, uploads to Payload, and assigns them — fully automated
4. Trigger a site rebuild (or wait for the automatic webhook)

---

## Verification

1. Run `npm run dev` from `vaidya-vrindavanam/`
2. Visit `http://localhost:4321/treatments`
3. Confirm cards without images show a clean dark placeholder
4. Run `npx tsx scripts/generate-treatment-images.ts` with one treatment (comment out the rest) to test the pipeline end-to-end
5. Confirm the WebP image appears in the card top half, name + description below, hover scales image and turns title gold
6. Run `npm run build` — confirm no TypeScript errors from the new `imageUrl` field
