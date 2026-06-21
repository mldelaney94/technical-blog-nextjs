import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { formatOnline } from './online.ts'

describe('formatOnline', () => {
  it('formats partial online metadata', () => {
    const result = formatOnline({
      authors: 'A. Altun',
      title: 'Understanding hypertext in the context of reading on the web: Language learners\' experience',
      publisher: 'Current Issues in Education',
      date: '2005-07-01',
    })

    assert.equal(
      result,
      'A. Altun, "Understanding hypertext in the context of reading on the web: Language learners\' experience,", Current Issues in Education, Jul. 2005',
    )
  })
})
