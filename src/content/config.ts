import { defineCollection, z } from 'astro:content';

const treatments = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    sanskrit: z.string().optional(),
    malayalam: z.string().optional(),
    shortDescription: z.string(),
    icon: z.string().default('🌿'),
    category: z.enum(['panchakarma', 'massage', 'speciality']),
    conditions: z.array(z.string()).default([]),
    duration: z.string().optional(),
    order: z.number().default(99),
  }),
});

const conditions = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    shortDescription: z.string(),
    treatments: z.array(z.string()).default([]),
    order: z.number().default(99),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
    author: z.string().default('Dr. Jayakrishnan T J'),
    category: z.enum(['health-tips', 'treatment-guides', 'seasonal-advice', 'patient-education']),
  }),
});

export const collections = { treatments, conditions, blog };
