import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Payload CMS runs as a headless backend
  // The admin UI is accessible at /admin
}

export default withPayload(nextConfig)
