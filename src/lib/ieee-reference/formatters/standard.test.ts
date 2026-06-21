import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { formatStandard } from './standard.ts'

describe('formatStandard', () => {
  it('formats a standard', () => {
    const result = formatStandard({
      title: 'IEEE Criteria for Class IE Electric Systems',
      standardBody: 'IEEE',
      reportNumber: '308',
      date: '1969',
    })

    assert.equal(
      result,
      'IEEE Criteria for Class IE Electric Systems, IEEE Standard, 308, 1969',
    )
  })
})
