import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { inferKind } from './infer-kind.ts'

describe('inferKind', () => {
  it('infers report from reportNumber', () => {
    assert.equal(inferKind({ reportNumber: 'RFC 1034' }), 'report')
  })

  it('infers standard before report when reportNumber mentions standard', () => {
    assert.equal(inferKind({ reportNumber: 'IEEE Standard 308' }), 'standard')
  })

  it('infers web from a bare url', () => {
    assert.equal(inferKind({ url: 'https://example.com' }), 'web')
  })
})
