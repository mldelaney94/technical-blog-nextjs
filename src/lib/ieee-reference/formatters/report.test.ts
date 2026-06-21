import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { formatReport } from './report.ts'

describe('formatReport', () => {
  it('formats a technical report', () => {
    const result = formatReport({
      authors: 'P. Mockapetris',
      title: 'STD 13: Domain names - concepts and facilities',
      publisher: 'RFC Editor',
      reportNumber: 'RFC 1034',
      date: '1987-11-01',
    })

    assert.equal(
      result,
      'P. Mockapetris, "STD 13: Domain names - concepts and facilities,", RFC Editor, RFC 1034, Nov. 1987',
    )
  })
})
