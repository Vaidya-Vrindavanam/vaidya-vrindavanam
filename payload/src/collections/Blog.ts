import type { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title',
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
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'date', type: 'date', required: true },
    { name: 'author', type: 'text', defaultValue: 'Dr. Jayakrishnan T J' },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Health Tips', value: 'health-tips' },
        { label: 'Treatment Guides', value: 'treatment-guides' },
        { label: 'Seasonal Advice', value: 'seasonal-advice' },
        { label: 'Patient Education', value: 'patient-education' },
      ],
    },
    { name: 'content', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
