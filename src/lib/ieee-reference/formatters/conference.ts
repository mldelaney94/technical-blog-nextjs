import { formatAuthors } from '../shared/authors.ts'
import { formatPublicationDate } from '../shared/dates.ts'
import { formatPages, joinParts, quoted } from '../shared/parts.ts'
import type { ReferenceFormatter } from '../types.ts'

export const formatConference: ReferenceFormatter = item => {
  const proceedings = item.proceedings ?? item.conference

  return joinParts([
    formatAuthors(item.authors),
    quoted(item.title),
    proceedings ? `in ${proceedings}` : undefined,
    item.location,
    formatPublicationDate(item.date),
    formatPages(item.pages),
  ])
}
