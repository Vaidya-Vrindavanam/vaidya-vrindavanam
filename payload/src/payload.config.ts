import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Treatments } from './collections/Treatments'
import { Conditions } from './collections/Conditions'
import { Blog } from './collections/Blog'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Use dynamic key access to prevent Turbopack from statically replacing env vars at build time
const env = (key: string) => process.env[key] || ''

export default buildConfig({
  admin: {
    user: 'users',
  },
  editor: lexicalEditor(),
  collections: [Users, Treatments, Conditions, Blog, Media],
  secret: env('PAYLOAD_SECRET'),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: env('DATABASE_URI'),
    },
  }),
  serverURL: env('NEXT_PUBLIC_SERVER_URL') || 'http://localhost:3000',
})
