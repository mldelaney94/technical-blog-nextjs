import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { formatThesis } from './thesis.ts'

describe('formatThesis', () => {
  it('formats a dissertation', () => {
    const result = formatThesis({
      authors: 'J. O. Williams',
      title: 'Narrow-band analyzer',
      degree: 'Ph.D.',
      department: 'Dept. Elect. Eng.',
      university: 'Harvard Univ.',
      location: 'Cambridge, MA',
      date: '1993',
    })

    assert.equal(
      result,
      'J. O. Williams, "Narrow-band analyzer,", Ph.D. dissertation, Dept. Elect. Eng., Harvard Univ., Cambridge, MA, 1993',
    )
  })
})
