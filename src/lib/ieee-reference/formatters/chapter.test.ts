import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { formatChapter } from './chapter.ts'

describe('formatChapter', () => {
  it('formats a book chapter', () => {
    const result = formatChapter({
      authors: 'G. O. Young',
      title: 'Synthetic structure of industrial plastics',
      bookTitle: 'Plastics',
      edition: '2nd',
      editor: 'J. Peters',
      location: 'New York',
      publisher: 'McGraw-Hill',
      pages: '15-64',
      date: '1964',
    })

    assert.equal(
      result,
      'G. O. Young, "Synthetic structure of industrial plastics,", in Plastics, 2nd ed., J. Peters Ed., New York: McGraw-Hill, pp. 15-64, 1964',
    )
  })
})
