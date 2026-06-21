import { formatAuthors } from '../shared/authors.ts'
import { formatPublicationDate } from '../shared/dates.ts'
import { joinParts, quoted } from '../shared/parts.ts'
import type { ReferenceFormatter } from '../types.ts'

export const formatOnline: ReferenceFormatter = item => joinParts([
  formatAuthors(item.authors),
  quoted(item.title),
  item.publisher,
  formatPublicationDate(item.date),
])
