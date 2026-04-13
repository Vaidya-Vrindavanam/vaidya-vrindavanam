import type { CollectionConfig } from 'payload'
import { triggerNetlifyBuild } from '../lib/triggerNetlifyBuild'

export const Conditions: CollectionConfig = {
  slug: 'conditions',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    afterChange: [triggerNetlifyBuild],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { description: 'URL-friendly identifier (e.g. arthritis)' } },
    { name: 'shortDescription', type: 'textarea', required: true },
    { name: 'treatments', type: 'array', admin: { description: 'Treatment slugs for this condition (resolved at Astro build time)' }, fields: [{ name: 'slug', type: 'text' }] },
    { name: 'order', type: 'number', defaultValue: 99 },
    { name: 'content', type: 'richText' },
  ],
}
