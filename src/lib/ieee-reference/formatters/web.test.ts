import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { formatWeb } from './web.ts'

describe('formatWeb', () => {
  it('returns empty body for url-only references', () => {
    assert.equal(formatWeb({ url: 'https://example.com' }), '')
  })

  it('formats a titled web page body', () => {
    const result = formatWeb({
      authors: 'A. Example',
      title: 'Example page',
    })

    assert.equal(result, 'A. Example, "Example page,"')
  })
})
