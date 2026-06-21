import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { formatPatent } from './patent.ts'

describe('formatPatent', () => {
  it('formats a patent', () => {
    const result = formatPatent({
      authors: 'J. P. Wilkinson',
      title: 'Nonlinear resonant circuit devices',
      patentNumber: 'U.S. Patent 3 624 125',
      date: '1990-07-16',
    })

    assert.equal(
      result,
      'J. P. Wilkinson, "Nonlinear resonant circuit devices,", U.S. Patent 3 624 125, Jul. 1990',
    )
  })
})
