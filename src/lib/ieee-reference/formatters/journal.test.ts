import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { formatJournal } from './journal.ts'

describe('formatJournal', () => {
  it('formats a journal article', () => {
    const result = formatJournal({
      authors: ['G. Liu', 'K. Y. Lee', 'H. F. Jordan'],
      title: 'TDM and TWDM de Bruijn networks and shufflenets for optical communications',
      journal: 'IEEE Trans. Comp.',
      volume: 46,
      pages: '695-701',
      date: '1997-06-01',
    })

    assert.equal(
      result,
      'G. Liu, K. Y. Lee, and H. F. Jordan, "TDM and TWDM de Bruijn networks and shufflenets for optical communications,", IEEE Trans. Comp., vol. 46, pp. 695-701, Jun. 1997',
    )
  })
})
