import { formatAuthors } from '../shared/authors.ts'
import { formatPublicationDate } from '../shared/dates.ts'
import { joinParts, quoted } from '../shared/parts.ts'
import type { ReferenceFormatter } from '../types.ts'

export const formatThesis: ReferenceFormatter = item => joinParts([
  formatAuthors(item.authors),
  quoted(item.title),
  item.degree ? `${item.degree} dissertation` : 'dissertation',
  item.department,
  item.university,
  item.location,
  formatPublicationDate(item.date),
])
