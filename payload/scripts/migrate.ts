import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const CONTENT_DIR = path.resolve(dirname, '../../src/content')

function textToLexical(text: string) {
  const paragraphs = text.trim().split(/\n\n+/).filter(Boolean)
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      direction: 'ltr',
      version: 1,
      children: paragraphs.map(p => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        direction: 'ltr',
        version: 1,
        children: [
          {
            type: 'text',
            format: 0,
            text: p.replace(/\n/g, ' ').trim(),
            style: '',
            mode: 'normal',
            detail: 0,
            version: 1,
          },
        ],
      })),
    },
  }
}

function readMarkdownFiles(dir: string) {
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const slug = f.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8')
      const { data, content } = matter(raw)
      return { slug, data, content }
    })
}

const payload = await getPayload({ config })

// ---- Treatments ----
console.log('\nMigrating treatments...')
const treatments = readMarkdownFiles(path.join(CONTENT_DIR, 'treatments'))
for (const { slug, data, content } of treatments) {
  try {
    await payload.create({
      collection: 'treatments',
      data: {
        name: data.name,
        slug,
        sanskrit: data.sanskrit ?? null,
        malayalam: data.malayalam ?? null,
        shortDescription: data.shortDescription,
        icon: data.icon ?? '🌿',
        category: data.category,
        conditions: (data.conditions ?? []).map((s: string) => ({ slug: s })),
        duration: data.duration ?? null,
        order: data.order ?? 99,
        content: textToLexical(content),
        featured: false,
      },
    })
    console.log(`  + ${slug}`)
  } catch (err) {
    console.error(`  ERROR ${slug}:`, err instanceof Error ? err.message : err)
  }
}

// ---- Conditions ----
console.log('\nMigrating conditions...')
const conditions = readMarkdownFiles(path.join(CONTENT_DIR, 'conditions'))
for (const { slug, data, content } of conditions) {
  try {
    await payload.create({
      collection: 'conditions',
      data: {
        name: data.name,
        slug,
        shortDescription: data.shortDescription,
        treatments: (data.treatments ?? []).map((s: string) => ({ slug: s })),
        order: data.order ?? 99,
        content: textToLexical(content),
      },
    })
    console.log(`  + ${slug}`)
  } catch (err) {
    console.error(`  ERROR ${slug}:`, err instanceof Error ? err.message : err)
  }
}

// ---- Blog ----
console.log('\nMigrating blog posts...')
const posts = readMarkdownFiles(path.join(CONTENT_DIR, 'blog'))
for (const { slug, data, content } of posts) {
  try {
    await payload.create({
      collection: 'blog',
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        date: new Date(data.date).toISOString(),
        author: data.author ?? 'Dr. Jayakrishnan T J',
        category: data.category,
        content: textToLexical(content),
      },
    })
    console.log(`  + ${slug}`)
  } catch (err) {
    console.error(`  ERROR ${slug}:`, err instanceof Error ? err.message : err)
  }
}

console.log('\nMigration complete')
