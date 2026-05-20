import { createClient } from '@sanity/client'
import { toHTML } from '@portabletext/to-html'
import sanitizeHtml from 'sanitize-html'
import { marked } from 'marked'

const sanityEnv = import.meta.env ?? process.env

let client: ReturnType<typeof createClient> | undefined

function getClient() {
  client ??= createClient({
    projectId: sanityEnv.SANITY_PROJECT_ID as string,
    dataset: (sanityEnv.SANITY_DATASET as string | undefined) ?? 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: sanityEnv.SANITY_API_TOKEN as string | undefined,
  })
  return client
}

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

export type FAQ = {
  question: string
  answer: string
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
  faqs: FAQ[]
}

type TreatmentDoc = {
  _id?: string
  name?: string | null
  slug?: string | null
  sanskrit?: string | null
  malayalam?: string | null
  shortDescription?: string | null
  icon?: string | null
  imageUrl?: string | null
  category?: Treatment['category'] | null
  conditions?: Array<{ slug?: string | null }> | null
  duration?: string | null
  order?: number | null
  featured?: boolean | null
  content?: unknown
}

type ConditionDoc = {
  _id?: string
  name?: string | null
  slug?: string | null
  shortDescription?: string | null
  treatments?: Array<{ slug?: string | null }> | null
  order?: number | null
  content?: unknown
}

type BlogPostDoc = {
  _id?: string
  title?: string | null
  slug?: string | null
  excerpt?: string | null
  date?: string | null
  author?: string | null
  category?: BlogPost['category'] | null
  content?: unknown
  faqs?: Array<{ question?: string | null; answer?: string | null }> | null
}

// ---- Portable Text → HTML ----

const ALLOWED_TAGS = [
  'p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li',
  'strong', 'em', 'a', 'br', 'blockquote',
]

const ALLOWED_ATTRS: sanitizeHtml.IOptions['allowedAttributes'] = {
  a: ['href', 'title', 'target', 'rel'],
}

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ALLOWED_TAGS,
  allowedAttributes: ALLOWED_ATTRS,
  allowedSchemes: ['https', 'mailto', 'tel'],
  disallowedTagsMode: 'discard',
  nonTextTags: ['script', 'style', 'textarea', 'option', 'xmp'],
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

export function sanitizeRenderedHTML(html: string): string {
  return sanitizeHtml(unwrapListItemParagraphs(html), SANITIZE_OPTIONS)
}

function portableTextToHTML(content: unknown): string {
  if (!content || !Array.isArray(content) || content.length === 0) return ''
  try {
    const normalized = splitBulletBlocks(content as PTBlock[])
    if (hasMarkdownSyntax(normalized)) {
      const markdown = blocksToMarkdown(normalized)
      const rendered = marked.parse(markdown) as string
      return sanitizeRenderedHTML(rendered)
    }
    const raw = toHTML(normalized as Parameters<typeof toHTML>[0])
    return sanitizeRenderedHTML(raw)
  } catch {
    return ''
  }
}

function requiredText(value: string | null | undefined): string | null {
  const text = value?.trim()
  return text ? text : null
}

function slugRefs(refs: Array<{ slug?: string | null }> | null | undefined): Array<{ slug: string }> {
  return (refs ?? [])
    .map(ref => requiredText(ref.slug))
    .filter((slug): slug is string => Boolean(slug))
    .map(slug => ({ slug }))
}

export function normalizeTreatments(docs: TreatmentDoc[]): Treatment[] {
  return docs.flatMap(doc => {
    const id = requiredText(doc._id)
    const slug = requiredText(doc.slug)
    const name = requiredText(doc.name)
    const shortDescription = requiredText(doc.shortDescription)
    const category = doc.category
    if (!id || !slug || !name || !shortDescription || !category) return []

    return [{
      id,
      slug,
      name,
      sanskrit: doc.sanskrit ?? undefined,
      malayalam: doc.malayalam ?? undefined,
      shortDescription,
      icon: doc.icon ?? '🌿',
      imageUrl: doc.imageUrl ?? undefined,
      category,
      conditions: slugRefs(doc.conditions),
      duration: doc.duration ?? undefined,
      order: doc.order ?? 99,
      contentHTML: portableTextToHTML(doc.content),
      featured: doc.featured ?? false,
    }]
  })
}

export function normalizeConditions(docs: ConditionDoc[]): Condition[] {
  return docs.flatMap(doc => {
    const id = requiredText(doc._id)
    const slug = requiredText(doc.slug)
    const name = requiredText(doc.name)
    const shortDescription = requiredText(doc.shortDescription)
    if (!id || !slug || !name || !shortDescription) return []

    return [{
      id,
      slug,
      name,
      shortDescription,
      treatments: slugRefs(doc.treatments),
      order: doc.order ?? 99,
      contentHTML: portableTextToHTML(doc.content),
    }]
  })
}

export function normalizeBlogPosts(docs: BlogPostDoc[]): BlogPost[] {
  return docs.flatMap(doc => {
    const id = requiredText(doc._id)
    const slug = requiredText(doc.slug)
    const title = requiredText(doc.title)
    const excerpt = requiredText(doc.excerpt)
    const category = doc.category
    if (!id || !slug || !title || !excerpt || !category) return []

    return [{
      id,
      slug,
      title,
      excerpt,
      date: doc.date ? new Date(doc.date) : new Date(),
      author: doc.author ?? 'Dr. Jayakrishnan T J',
      category,
      contentHTML: portableTextToHTML(doc.content),
      faqs: (doc.faqs ?? []).flatMap(f => {
        const q = f.question?.trim()
        const a = f.answer?.trim()
        return q && a ? [{ question: q, answer: a }] : []
      }),
    }]
  })
}

// ---- Public API (identical signatures to payload.ts) ----

export async function getTreatments(): Promise<Treatment[]> {
  const docs = await getClient().fetch<TreatmentDoc[]>(`
    *[_type == "treatment" && defined(slug.current) && defined(name) && defined(shortDescription) && defined(category)] | order(order asc) {
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

  return normalizeTreatments(docs)
}

export async function getTreatmentBySlug(slug: string): Promise<Treatment | null> {
  const treatments = await getTreatments()
  return treatments.find(t => t.slug === slug) ?? null
}

export async function getConditions(): Promise<Condition[]> {
  const docs = await getClient().fetch<ConditionDoc[]>(`
    *[_type == "condition" && defined(slug.current) && defined(name) && defined(shortDescription)] | order(order asc) {
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

  return normalizeConditions(docs)
}

export async function getConditionBySlug(slug: string): Promise<Condition | null> {
  const conditions = await getConditions()
  return conditions.find(c => c.slug === slug) ?? null
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const docs = await getClient().fetch<BlogPostDoc[]>(`
    *[_type == "post" && defined(slug.current) && defined(title) && defined(excerpt) && defined(category)] | order(date desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      date,
      author,
      category,
      content,
      faqs[] {
        question,
        answer
      }
    }
  `)

  return normalizeBlogPosts(docs)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts()
  return posts.find(p => p.slug === slug) ?? null
}
