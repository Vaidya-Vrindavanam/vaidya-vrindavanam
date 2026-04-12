import type { CollectionConfig } from 'payload'

export const Conditions: CollectionConfig = {
  slug: 'conditions',
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    afterChange: [
      async () => {
        const hookUrl = process.env.NETLIFY_BUILD_HOOK_URL
        if (hookUrl) {
          await fetch(hookUrl, { method: 'POST' }).catch(() => {})
        }
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { description: 'URL-friendly identifier (e.g. arthritis)' } },
    { name: 'shortDescription', type: 'textarea', required: true },
    { name: 'treatments', type: 'array', fields: [{ name: 'slug', type: 'text' }] },
    { name: 'order', type: 'number', defaultValue: 99 },
    { name: 'content', type: 'richText' },
  ],
}
