import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { formatAuthors, formatAuthorsFromItem } from './authors.ts'

describe('formatAuthors', () => {
  it('uses et al. for three or more authors by default', () => {
    assert.equal(
      formatAuthors(['G. Liu', 'K. Y. Lee', 'H. F. Jordan']),
      'G. Liu, et al.',
    )
  })

  it('lists all authors when listAllAuthors is true', () => {
    assert.equal(
      formatAuthors(['G. Liu', 'K. Y. Lee', 'H. F. Jordan'], { listAllAuthors: true }),
      'G. Liu, K. Y. Lee, and H. F. Jordan',
    )
  })

  it('keeps two authors joined with and', () => {
    assert.equal(
      formatAuthors(['P. Hoffman', 'K. Fujiwara']),
      'P. Hoffman and K. Fujiwara',
    )
  })

  it('passes through a pre-formatted et al. string', () => {
    assert.equal(
      formatAuthors('P. Smith, et al.'),
      'P. Smith, et al.',
    )
  })

  it('reads listAllAuthors from the reference item', () => {
    assert.equal(
      formatAuthorsFromItem({
        authors: ['A. One', 'B. Two', 'C. Three'],
        listAllAuthors: true,
      }),
      'A. One, B. Two, and C. Three',
    )
  })
})
