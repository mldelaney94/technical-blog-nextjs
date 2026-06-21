import { getFormatter } from './formatters/index.ts'
import { inferKind } from './infer-kind.ts'
import { formatOnlineSuffix } from './online-suffix.ts'
import type { ReferenceItem } from './types.ts'

export function formatIeeeReference(item: ReferenceItem): string {
  const kind = item.kind ?? inferKind(item)
  const body = getFormatter(kind)(item).replace(/\.\s*$/, '')
  const online = formatOnlineSuffix(item, Boolean(body))

  if (!body) {
    return online.replace(/^\.\s*/, '')
  }

  return `${body}${online}`
}

export type { ReferenceItem, ReferenceKind } from './types.ts'
export { inferKind } from './infer-kind.ts'
