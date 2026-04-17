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
 *   PAYLOAD_URL        — https://<railway-project-url>.up.railway.app
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
    console.log(`  Wired treatment "${treatment.name}" → ${conditionSlugs.join(', ')}`)
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
    console.log(`  Wired condition "${condition.name}" → ${treatmentSlugs.join(', ')}`)
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
  console.log('  2. Upload treatment images manually via Sanity Studio')
  console.log('  3. Run: npm run build')
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
