import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Explicitly pass server-side secrets through the build.
  // Next.js/Turbopack replaces process.env.X statically; this ensures
  // the values from Railway are baked in correctly at build time.
  env: {
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    DATABASE_URI: process.env.DATABASE_URI,
  },
}

export default withPayload(nextConfig)
