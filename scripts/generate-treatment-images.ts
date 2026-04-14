/**
 * generate-treatment-images.ts
 *
 * For each of the 20 Ayurvedic treatments:
 *   1. Creates a kie.ai image task (Nanobanana Pro model)
 *   2. Polls until the task is complete
 *   3. Downloads the PNG result
 *   4. Converts it to WebP (quality 85) via sharp
 *   5. Uploads the WebP to Payload Media collection
 *   6. Assigns the media document's ID to the treatment's `image` field
 *
 * Usage:
 *   npx tsx scripts/generate-treatment-images.ts
 *
 * Env vars required (.env):
 *   KIE_AI_API_KEY
 *   PAYLOAD_EMAIL
 *   PAYLOAD_PASSWORD
 *   PAYLOAD_URL  (e.g. https://vaidya-vrindavanam-production.up.railway.app)
 */

import 'dotenv/config'
import sharp from 'sharp'

const PAYLOAD_URL = process.env.PAYLOAD_URL!
const KIE_AI_API_KEY = process.env.KIE_AI_API_KEY!
const PAYLOAD_EMAIL = process.env.PAYLOAD_EMAIL!
const PAYLOAD_PASSWORD = process.env.PAYLOAD_PASSWORD!

for (const [k, v] of Object.entries({ PAYLOAD_URL, KIE_AI_API_KEY, PAYLOAD_EMAIL, PAYLOAD_PASSWORD })) {
  if (!v) { console.error(`Missing env var: ${k}`); process.exit(1) }
}

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
    prompt: "Therapist spreading a creamy white Njavara rice paste evenly over patient's forearm and chest with gentle hands, the paste glistening in warm light",
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
  const MAX_WAIT_MS = 10 * 60 * 1000 // 10 minutes
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
        state?: string
        resultJson?: string
        failCode?: string | null
        failMsg?: string | null
      }
    }

    const { state, resultJson, failMsg } = json.data
    const elapsed = Math.round((Date.now() - start) / 1000)
    process.stdout.write(`  polling… state=${state ?? 'pending'} (${elapsed}s)\r`)

    if (state === 'success') {
      process.stdout.write('\n')
      // resultJson is a JSON string: {"resultUrls":["https://..."]}
      let parsed: { resultUrls?: string[] } = {}
      try { parsed = JSON.parse(resultJson ?? '{}') } catch { /* ignore */ }
      const url = parsed.resultUrls?.[0]
      if (!url) throw new Error(`No result URL in completed task. resultJson=${resultJson}`)
      return url
    }
    if (state === 'failed' || state === 'error') {
      process.stdout.write('\n')
      throw new Error(`kie.ai generation failed: ${failMsg ?? state}`)
    }
  }
  throw new Error(`kie.ai task ${taskId} timed out after 10 minutes`)
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

async function uploadToPayload(webpBuffer: Buffer, filename: string, token: string): Promise<string> {
  const altText = filename.replace('.webp', '').replace(/-/g, ' ')
  const formData = new FormData()
  formData.append('file', new Blob([webpBuffer], { type: 'image/webp' }), filename)
  // Payload v3 multipart uploads require metadata via the _payload JSON field
  formData.append('_payload', JSON.stringify({ alt: altText }))

  const res = await fetch(`${PAYLOAD_URL}/api/media`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData as unknown as BodyInit,
  })
  if (!res.ok) throw new Error(`Payload media upload failed: ${res.status} ${await res.text()}`)
  const json = await res.json() as { doc?: { id: string }; id?: string }
  const id = json.doc?.id ?? json.id
  if (!id) throw new Error(`No id in media upload response: ${JSON.stringify(json)}`)
  return String(id)
}

// ---- Treatment update ----

async function assignImageToTreatment(slug: string, mediaId: string, token: string): Promise<void> {
  // Find the treatment by slug
  const res = await fetch(`${PAYLOAD_URL}/api/treatments?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=0`, {
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Failed to find treatment ${slug}: ${res.status}`)
  const json = await res.json() as { docs: Array<{ id: string }> }
  const treatment = json.docs[0]
  if (!treatment) throw new Error(`Treatment not found for slug: ${slug}`)

  // Payload relationship fields require a numeric id (not string)
  const numericMediaId = Number(mediaId)
  const patchRes = await fetch(`${PAYLOAD_URL}/api/treatments/${treatment.id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: numericMediaId }),
  })
  if (!patchRes.ok) throw new Error(`Failed to update treatment ${slug}: ${patchRes.status} ${await patchRes.text()}`)
}

// ---- Main ----

async function main() {
  console.log('=== Vaidya Vrindavanam — Treatment Image Generation ===')
  console.log(`Payload URL: ${PAYLOAD_URL}`)
  console.log(`Treatments to process: ${TREATMENTS.length}`)

  console.log('\nLogging into Payload CMS...')
  const token = await getPayloadToken()
  console.log('Authenticated.\n')

  const results: { slug: string; name: string; ok: boolean; error?: string }[] = []

  for (const treatment of TREATMENTS) {
    console.log(`▶ ${treatment.name} (${treatment.slug})`)

    try {
      console.log('  creating kie.ai task...')
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
      results.push({ slug: treatment.slug, name: treatment.name, ok: true })
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`  ✗ FAILED: ${msg}\n`)
      results.push({ slug: treatment.slug, name: treatment.name, ok: false, error: msg })
    }
  }

  console.log('\n=== SUMMARY ===')
  let passed = 0, failed = 0
  for (const r of results) {
    if (r.ok) { console.log(`  ✓ ${r.name}`); passed++ }
    else { console.log(`  ✗ ${r.name} — ${r.error}`); failed++ }
  }
  console.log(`\n${passed}/${TREATMENTS.length} succeeded, ${failed} failed`)
  if (failed > 0) process.exit(1)
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
