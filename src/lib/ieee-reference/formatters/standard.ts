import { formatPublicationDate } from '../shared/dates.ts'
import { joinParts } from '../shared/parts.ts'
import type { ReferenceFormatter } from '../types.ts'

export const formatStandard: ReferenceFormatter = item => joinParts([
  item.title,
  item.standardBody ? `${item.standardBody} Standard` : 'Standard',
  item.reportNumber,
  formatPublicationDate(item.date),
])
