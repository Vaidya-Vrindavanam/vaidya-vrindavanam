import { createClient } from '@sanity/client'
import { toHTML } from '@portabletext/to-html'
import sanitizeHtml from 'sanitize-html'
import { marked } from 'marked'

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

const ALLOWED_TAGS = [
  'p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li',
  'strong', 'em', 'a', 'br', 'blockquote',
]

const ALLOWED_ATTRS: sanitizeHtml.IOptions['allowedAttributes'] = {
  a: ['href', 'title', 'target', 'rel'],
}

type PTBlock = { _type: string; style?: string; listItem?: string; children?: Array<{ _type: string; text?: string }> }

function hasMarkdownSyntax(blocks: PTBlock[]): boolean {
  for (const block of blocks) {
    if (block._type !== 'block') continue
    const text = (block.children ?? []).map(c => c.text ?? '').join('')
    if (/^#{1,6}\s/.test(text) || /^[-*]\s/.test(text) || /\*\*[^*]+\*\*/.test(text)) return true
  }
  return false
}

function blocksToMarkdown(blocks: PTBlock[]): string {
  return blocks
    .filter(b => b._type === 'block')
    .map(b => {
      const text = (b.children ?? []).map(c => c.text ?? '').join('')
      if (b.listItem === 'bullet') return `- ${text}`
      return text
    })
    .join('\n\n')
}

function portableTextToHTML(content: unknown): string {
  if (!content || !Array.isArray(content) || content.length === 0) return ''
  try {
    const sanitizeOpts = {
      allowedTags: ALLOWED_TAGS,
      allowedAttributes: ALLOWED_ATTRS,
      allowedSchemes: ['https', 'mailto', 'tel'],
    }
    if (hasMarkdownSyntax(content as PTBlock[])) {
      const markdown = blocksToMarkdown(content as PTBlock[])
      return sanitizeHtml(marked.parse(markdown) as string, sanitizeOpts)
    }
    const raw = toHTML(content as Parameters<typeof toHTML>[0])
    return sanitizeHtml(raw, sanitizeOpts)
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
