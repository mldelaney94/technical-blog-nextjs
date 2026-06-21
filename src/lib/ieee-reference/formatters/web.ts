import { formatAuthors } from '../shared/authors.ts'
import { joinParts, quoted } from '../shared/parts.ts'
import type { ReferenceFormatter } from '../types.ts'

export const formatWeb: ReferenceFormatter = item => joinParts([
  formatAuthors(item.authors),
  quoted(item.title),
])
