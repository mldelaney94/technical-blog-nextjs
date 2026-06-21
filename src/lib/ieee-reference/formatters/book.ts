import { formatAuthors, formatEditors } from '../shared/authors.ts'
import { formatPublicationDate } from '../shared/dates.ts'
import {
  formatEdition,
  formatPages,
  formatPublisherLocation,
  joinParts,
  quoted,
} from '../shared/parts.ts'
import type { ReferenceFormatter } from '../types.ts'

export const formatBook: ReferenceFormatter = item => joinParts([
  item.authors ? formatAuthors(item.authors) : undefined,
  formatEditors(item.editor),
  quoted(item.title),
  formatEdition(item.edition),
  formatPublisherLocation(item.location, item.publisher),
  formatPublicationDate(item.date),
])
