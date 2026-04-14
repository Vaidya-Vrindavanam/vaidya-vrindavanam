import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type {
  Treatment as PayloadTreatment,
  Condition as PayloadCondition,
  Blog as PayloadBlog,
} from '../../payload/src/payload-types'

const PAYLOAD_URL = import.meta.env.PAYLOAD_URL as string | undefined

function lexicalToHTML(data: unknown): string {
  if (!data) return ''
  try {
    return convertLexicalToHTML({ data: data as SerializedEditorState })
  } catch {
    return ''
  }
}

// ---- Types ----

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

// ---- Fetch helpers ----

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

// ---- Public API ----

export async function getTreatments(): Promise<Treatment[]> {
  const docs = await fetchCollection('treatments', 1) as PayloadTreatment[]
  return docs.map(doc => {
    const image = doc.image as { url?: string } | null | undefined
    return {
      id: doc.id,
      slug: doc.slug,
      name: doc.name,
      sanskrit: doc.sanskrit ?? undefined,
      malayalam: doc.malayalam ?? undefined,
      shortDescription: doc.shortDescription,
      icon: doc.icon ?? '🌿',
      imageUrl: image && typeof image === 'object' && image.url
        ? (image.url.startsWith('http') ? image.url : `${PAYLOAD_URL}${image.url}`)
        : undefined,
      category: doc.category,
      conditions: (doc.conditions ?? []) as Array<{ slug: string }>,
      duration: doc.duration ?? undefined,
      order: doc.order ?? 99,
      contentHTML: lexicalToHTML(doc.content),
      featured: doc.featured ?? false,
    }
  })
}

export async function getTreatmentBySlug(slug: string): Promise<Treatment | null> {
  const treatments = await getTreatments()
  return treatments.find(t => t.slug === slug) ?? null
}

export async function getConditions(): Promise<Condition[]> {
  const docs = await fetchCollection('conditions') as PayloadCondition[]
  return docs.map(doc => ({
    id: doc.id,
    slug: doc.slug,
    name: doc.name,
    shortDescription: doc.shortDescription,
    treatments: (doc.treatments ?? []) as Array<{ slug: string }>,
    order: doc.order ?? 99,
    contentHTML: lexicalToHTML(doc.content),
  }))
}

export async function getConditionBySlug(slug: string): Promise<Condition | null> {
  const conditions = await getConditions()
  return conditions.find(c => c.slug === slug) ?? null
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const docs = await fetchCollection('blog') as PayloadBlog[]
  return docs.map(doc => ({
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    date: doc.date ? new Date(doc.date) : new Date(),
    author: doc.author ?? 'Dr. Jayakrishnan T J',
    category: doc.category,
    contentHTML: lexicalToHTML(doc.content),
  }))
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts()
  return posts.find(p => p.slug === slug) ?? null
}
