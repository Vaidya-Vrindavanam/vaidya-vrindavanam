import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Payload CMS runs as a headless backend
  // The admin UI is accessible at /admin
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default withPayload(nextConfig)
