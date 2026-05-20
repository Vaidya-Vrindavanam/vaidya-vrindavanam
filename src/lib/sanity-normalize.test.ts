import assert from 'node:assert/strict'
import { test } from 'node:test'

import { normalizeBlogPosts, normalizeConditions, normalizeTreatments } from './sanity'

test('normalizeTreatments skips documents without a usable slug or required fields', () => {
  const treatments = normalizeTreatments([
    {
      _id: 'valid',
      name: 'Shirodhara',
      slug: 'shirodhara',
      shortDescription: 'Warm oil therapy',
      category: 'panchakarma',
      conditions: [{ slug: 'stress-anxiety' }, { slug: '' }, {}],
      content: [],
    },
    {
      _id: 'missing-slug',
      name: 'Draft Treatment',
      shortDescription: 'Incomplete draft',
      category: 'massage',
      conditions: [],
    },
    {
      _id: 'missing-name',
      slug: 'missing-name',
      shortDescription: 'Incomplete draft',
      category: 'massage',
      conditions: [],
    },
  ])

  assert.equal(treatments.length, 1)
  assert.equal(treatments[0].slug, 'shirodhara')
  assert.deepEqual(treatments[0].conditions, [{ slug: 'stress-anxiety' }])
})

test('normalizeConditions skips incomplete documents and drops broken treatment refs', () => {
  const conditions = normalizeConditions([
    {
      _id: 'valid',
      name: 'Arthritis',
      slug: 'arthritis',
      shortDescription: 'Joint pain support',
      treatments: [{ slug: 'vasthi' }, { slug: null }],
      content: [],
    },
    {
      _id: 'missing-slug',
      name: 'Draft Condition',
      shortDescription: 'Incomplete draft',
      treatments: [],
    },
  ])

  assert.equal(conditions.length, 1)
  assert.equal(conditions[0].slug, 'arthritis')
  assert.deepEqual(conditions[0].treatments, [{ slug: 'vasthi' }])
})

test('normalizeBlogPosts skips incomplete posts and defaults optional metadata', () => {
  const posts = normalizeBlogPosts([
    {
      _id: 'valid',
      title: 'Daily Routine',
      slug: 'daily-routine',
      excerpt: 'A practical guide',
      date: null,
      category: 'health-tips',
      content: [],
    },
    {
      _id: 'missing-title',
      slug: 'missing-title',
      excerpt: 'Incomplete draft',
      category: 'health-tips',
      content: [],
    },
  ])

  assert.equal(posts.length, 1)
  assert.equal(posts[0].slug, 'daily-routine')
  assert.equal(posts[0].author, 'Dr. Jayakrishnan T J')
  assert.ok(posts[0].date instanceof Date)
})
