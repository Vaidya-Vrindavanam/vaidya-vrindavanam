import { getPayload } from 'payload'
import config from '../src/payload.config'

const payload = await getPayload({ config })
const treatments = await payload.count({ collection: 'treatments' })
const conditions = await payload.count({ collection: 'conditions' })
const blog = await payload.count({ collection: 'blog' })
console.log('Treatments:', treatments.totalDocs)
console.log('Conditions:', conditions.totalDocs)
console.log('Blog posts:', blog.totalDocs)
process.exit(0)
