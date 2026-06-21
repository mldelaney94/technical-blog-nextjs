import type { ReferenceItem, ReferenceKind } from './types.ts'

export function inferKind(item: ReferenceItem): ReferenceKind {
  if (item.patentNumber) {
    return 'patent'
  }

  if (item.degree || item.university) {
    return 'thesis'
  }

  if (item.standardBody || item.reportNumber?.match(/standard/i)) {
    return 'standard'
  }

  if (item.reportNumber || item.institution) {
    return 'report'
  }

  if (item.journal) {
    return 'journal'
  }

  if (item.bookTitle && item.title) {
    return 'chapter'
  }

  if (item.conference || item.proceedings) {
    return 'conference'
  }

  if (item.url && !item.title && !item.authors && !item.publisher) {
    return 'web'
  }

  if (item.publisher && item.title && !item.journal) {
    return 'book'
  }

  return 'online'
}
