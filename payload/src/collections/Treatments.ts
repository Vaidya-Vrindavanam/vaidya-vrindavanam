import type { CollectionConfig } from 'payload'

export const Treatments: CollectionConfig = {
  slug: 'treatments',
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
    { name: 'slug', type: 'text', required: true, unique: true, admin: { description: 'URL-friendly identifier (e.g. abhyangam-swedam)' } },
    { name: 'sanskrit', type: 'text' },
    { name: 'malayalam', type: 'text' },
    { name: 'shortDescription', type: 'textarea', required: true },
    { name: 'icon', type: 'text', defaultValue: '🌿' },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Panchakarma', value: 'panchakarma' },
        { label: 'Massage', value: 'massage' },
        { label: 'Speciality', value: 'speciality' },
      ],
    },
    { name: 'conditions', type: 'array', fields: [{ name: 'slug', type: 'text' }] },
    { name: 'duration', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 99 },
    { name: 'content', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
}
