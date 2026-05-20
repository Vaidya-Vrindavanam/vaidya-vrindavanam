import assert from 'node:assert/strict'
import { test } from 'node:test'

import { sanitizeRenderedHTML } from './sanity'

test('sanitizeRenderedHTML drops raw text containers that can smuggle scripts', () => {
  const html = sanitizeRenderedHTML('<xmp><script>alert(1)</script><img src=x onerror=alert(2)>')

  assert.equal(html.includes('<script'), false)
  assert.equal(html.includes('onerror'), false)
  assert.equal(html.includes('<img'), false)
})

test('sanitizeRenderedHTML keeps supported editorial markup and safe links', () => {
  const html = sanitizeRenderedHTML(
    '<h2>Care</h2><p><strong>Warm oil</strong> supports recovery. <a href="https://example.com" title="Read more">Read more</a></p>',
  )

  assert.match(html, /<h2>Care<\/h2>/)
  assert.match(html, /<strong>Warm oil<\/strong>/)
  assert.match(html, /href="https:\/\/example.com"/)
})
