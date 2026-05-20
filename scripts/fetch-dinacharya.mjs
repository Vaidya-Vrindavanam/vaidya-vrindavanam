import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID ?? '7rhexv2k',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const doc = await client.fetch(
  `*[_type == "post" && slug.current == "ayurvedic-daily-routine"][0]{ title, excerpt, author, category, content }`
)
console.log(JSON.stringify(doc, null, 2))
