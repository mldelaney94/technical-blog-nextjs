import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { formatBook } from './book.ts'

describe('formatBook', () => {
  it('formats a print book', () => {
    const result = formatBook({
      editor: 'D. Sarunyagate',
      title: 'Lasers',
      location: 'New York',
      publisher: 'McGraw-Hill',
      date: '1996',
    })

    assert.equal(
      result,
      'D. Sarunyagate Ed., "Lasers,", New York: McGraw-Hill, 1996',
    )
  })
})
