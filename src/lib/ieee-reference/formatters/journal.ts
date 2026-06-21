import { formatAuthorsFromItem } from '../shared/authors.ts'
import { formatPublicationDate } from '../shared/dates.ts'
import { formatPages, formatVolumeIssue, joinParts, quoted } from '../shared/parts.ts'
import type { ReferenceFormatter } from '../types.ts'

export const formatJournal: ReferenceFormatter = item => joinParts([
  formatAuthorsFromItem(item),
  quoted(item.title),
  item.journal,
  formatVolumeIssue(item.volume, item.issue),
  formatPages(item.pages),
  formatPublicationDate(item.date),
])
