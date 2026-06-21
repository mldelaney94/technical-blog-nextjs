import { formatAccessedDate } from '../format-accessed-date.ts'

import type { ReferenceItem } from './types.ts'

export function formatOnlineSuffix(item: ReferenceItem, hasBody: boolean): string {
  if (!item.url && !item.accessed) {
    return hasBody ? '.' : ''
  }

  const parts: string[] = []

  if (item.url) {
    parts.push(`[Online]. Available: ${item.url}`)
  }

  if (item.accessed) {
    parts.push(`[Accessed ${formatAccessedDate(item.accessed)}]`)
  }

  const suffix = `${parts.join('. ')}.`

  return hasBody ? `. ${suffix}` : suffix
}
