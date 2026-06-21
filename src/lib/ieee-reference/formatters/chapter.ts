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

export const formatChapter: ReferenceFormatter = item => joinParts([
  formatAuthors(item.authors),
  quoted(item.title),
  item.bookTitle ? `in ${item.bookTitle}` : undefined,
  formatEdition(item.edition),
  formatEditors(item.editor),
  formatPublisherLocation(item.location, item.publisher),
  formatPages(item.pages),
  formatPublicationDate(item.date),
])
