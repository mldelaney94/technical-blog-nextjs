import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { formatIeeeReference } from './index.ts'

describe('formatIeeeReference', () => {
  it('selects the report formatter and appends online suffix', () => {
    const result = formatIeeeReference({
      authors: ['P. Hoffman', 'K. Fujiwara'],
      title: 'BCP 219: DNS Terminology',
      publisher: 'RFC Editor',
      reportNumber: 'RFC 9499',
      date: '2024-03-01',
      url: 'https://www.rfc-editor.org/rfc/rfc9499.html#section-2-1.38',
      accessed: '2026-06-03',
    })

    assert.equal(
      result,
      'P. Hoffman and K. Fujiwara, "BCP 219: DNS Terminology,", RFC Editor, RFC 9499, Mar. 2024. [Online]. Available: https://www.rfc-editor.org/rfc/rfc9499.html#section-2-1.38. [Accessed Jun 3 2026].',
    )
  })

  it('formats url-only references through the web formatter', () => {
    const result = formatIeeeReference({
      url: 'https://serverfault.com/questions/613829/why-cant-a-cname-record-be-used-at-the-apex-aka-root-of-a-domain',
      accessed: '2026-06-03',
    })

    assert.equal(
      result,
      '[Online]. Available: https://serverfault.com/questions/613829/why-cant-a-cname-record-be-used-at-the-apex-aka-root-of-a-domain. [Accessed Jun 3 2026].',
    )
  })

  it('respects an explicit kind override', () => {
    const result = formatIeeeReference({
      kind: 'online',
      authors: 'A. Altun',
      title: 'Understanding hypertext in the context of reading on the web: Language learners\' experience',
      publisher: 'Current Issues in Education',
      date: '2005-07-01',
      url: 'http://cie.ed.asu.edu/volume6/number12/',
      accessed: '2007-12-02',
    })

    assert.match(result, /^A\. Altun, "Understanding hypertext/)
    assert.match(result, /\[Online\]\. Available: http:\/\/cie\.ed\.asu\.edu\/volume6\/number12\//)
    assert.match(result, /\[Accessed Dec 2 2007\]\.$/)
  })
})
