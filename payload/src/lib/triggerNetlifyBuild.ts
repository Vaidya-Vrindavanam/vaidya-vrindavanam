import type { CollectionAfterChangeHook } from 'payload'

export const triggerNetlifyBuild: CollectionAfterChangeHook = async () => {
  const hookUrl = process.env.NETLIFY_BUILD_HOOK_URL
  if (hookUrl) {
    await fetch(hookUrl, { method: 'POST' }).catch(() => {})
  }
}
