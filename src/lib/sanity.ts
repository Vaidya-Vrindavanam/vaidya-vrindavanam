import { createClient } from '@sanity/client'
import { toHTML } from '@portabletext/to-html'
import sanitizeHtml from 'sanitize-html'
import { marked } from 'marked'

const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID as string,
  dataset: (import.meta.env.SANITY_DATASET as string | undefined) ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
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

type PTBlock = { _type: string; style?: string; listItem?: string; level?: number; children?: Array<{ _type: string; text?: string }> }

// Some Sanity entries author a whole bulleted list as a SINGLE block whose text concatenates
// items with " - " separators (either as a normal paragraph starting with "- " or as a single
// bullet listItem block). Split those into individual bullet blocks so the renderer emits one
// <li> per item. Conservative: only split when 3+ parts result, to avoid mangling legitimately
// hyphenated phrases like "Mon - Sat" or "Stage 1 - Initial".
function splitBulletBlocks(blocks: PTBlock[]): PTBlock[] {
  const out: PTBlock[] = []
  for (const block of blocks) {
    if (
      block._type === 'block' &&
      block.children &&
      block.children.length > 0
    ) {
      const text = block.children.map(c => c.text ?? '').join('').trim()
      const startsWithBullet = /^-\s+/.test(text)
      const isBulletBlock = block.listItem === 'bullet'

      if (isBulletBlock || startsWithBullet) {
        const stripped = text.replace(/^-\s+/, '')
        const parts = stripped.split(/\s+-\s+/).map(s => s.trim()).filter(Boolean)
        if (parts.length >= 3) {
          for (const part of parts) {
            out.push({
              _type: 'block',
              style: 'normal',
              listItem: 'bullet',
              level: block.level ?? 1,
              children: [{ _type: 'span', text: part }],
            })
          }
          continue
        }
      }
    }
    out.push(block)
  }
  return out
}

function hasMarkdownSyntax(blocks: PTBlock[]): boolean {
  for (const block of blocks) {
    if (block._type !== 'block') continue
    const text = (block.children ?? []).map(c => c.text ?? '').join('')
    if (/^#{1,6}\s/.test(text) || /^[-*]\s/.test(text) || /\*\*[^*]+\*\*/.test(text)) return true
  }
  return false
}

function blocksToMarkdown(blocks: PTBlock[]): string {
  // Join consecutive bullet items with a single newline (tight list — no <p> wrapper),
  // and use blank lines only between non-bullet blocks or when transitioning into/out of a list.
  const lines: string[] = []
  let prevWasBullet = false
  for (const b of blocks) {
    if (b._type !== 'block') continue
    const text = (b.children ?? []).map(c => c.text ?? '').join('')
    const isBullet = b.listItem === 'bullet'
    if (lines.length > 0) {
      lines.push(prevWasBullet && isBullet ? '' : '\n')
    }
    lines.push(isBullet ? `- ${text}` : text)
    prevWasBullet = isBullet
  }
  return lines.join('\n')
}

// Marked emits <li><p>text</p></li> for any list following the GFM loose-list rules.
// Our list items are always single-line content, so unwrap the inner <p> for tight rendering.
function unwrapListItemParagraphs(html: string): string {
  return html.replace(/<li>\s*<p>([\s\S]*?)<\/p>\s*<\/li>/g, '<li>$1</li>')
}

function portableTextToHTML(content: unknown): string {
  if (!content || !Array.isArray(content) || content.length === 0) return ''
  try {
    const sanitizeOpts = {
      allowedTags: ALLOWED_TAGS,
      allowedAttributes: ALLOWED_ATTRS,
      allowedSchemes: ['https', 'mailto', 'tel'],
    }
    const normalized = splitBulletBlocks(content as PTBlock[])
    if (hasMarkdownSyntax(normalized)) {
      const markdown = blocksToMarkdown(normalized)
      const rendered = marked.parse(markdown) as string
      return sanitizeHtml(unwrapListItemParagraphs(rendered), sanitizeOpts)
    }
    const raw = toHTML(normalized as Parameters<typeof toHTML>[0])
    return sanitizeHtml(unwrapListItemParagraphs(raw), sanitizeOpts)
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
