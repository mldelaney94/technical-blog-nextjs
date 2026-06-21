import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { formatConference } from './conference.ts'

describe('formatConference', () => {
  it('formats a conference paper', () => {
    const result = formatConference({
      authors: ['L. Liu', 'H. Miao'],
      title: 'A specification based approach to testing polymorphic attributes',
      proceedings: 'Formal Methods and Software Engineering: Proceedings of the 6th International Conference on Formal Engineering Methods, ICFEM 2004, Seattle, WA, USA, November 8-12, 2004',
      location: 'Berlin',
      publisher: 'Springer',
      pages: '306-19',
      date: '2004',
    })

    assert.match(result, /^L\. Liu and H\. Miao, "A specification based approach/)
    assert.match(result, /in Formal Methods and Software Engineering/)
    assert.match(result, /Berlin, 2004, pp\. 306-19$/)
  })
})
