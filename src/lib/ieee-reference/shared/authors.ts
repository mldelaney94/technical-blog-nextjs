import type { ReferenceItem } from '../types.ts'

const ET_AL_THRESHOLD = 3

export function formatAuthors(
  authors?: string | string[],
  options: { listAllAuthors?: boolean, suffix?: string } = {},
): string {
  const { listAllAuthors = false, suffix } = options

  if (!authors) {
    return suffix ?? ''
  }

  if (typeof authors === 'string') {
    if (/,\s*et al\.?/i.test(authors)) {
      return suffix ? `${authors}, ${suffix}` : authors
    }

    return suffix ? `${authors}, ${suffix}` : authors
  }

  const list = authors.filter(Boolean)

  if (list.length === 0) {
    return suffix ?? ''
  }

  if (list.length === 1) {
    return suffix ? `${list[0]}, ${suffix}` : list[0]
  }

  if (list.length === 2) {
    const names = `${list[0]} and ${list[1]}`
    return suffix ? `${names}, ${suffix}` : names
  }

  if (!listAllAuthors && list.length >= ET_AL_THRESHOLD) {
    const first = suffix ? `${list[0]}, ${suffix}` : list[0]
    return `${first}, et al.`
  }

  const names = `${list.slice(0, -1).join(', ')}, and ${list.at(-1)}`
  return suffix ? `${names}, ${suffix}` : names
}

export function formatAuthorsFromItem(
  item: Pick<ReferenceItem, 'authors' | 'listAllAuthors'>,
  suffix?: string,
): string {
  return formatAuthors(item.authors, { listAllAuthors: item.listAllAuthors, suffix })
}

export function formatEditors(editor?: string | string[]): string | undefined {
  if (!editor) {
    return undefined
  }

  const editors = typeof editor === 'string' ? [editor] : editor
  const names = editors.length === 1
    ? `${editors[0]} Ed.`
    : `${editors.slice(0, -1).join(', ')}, and ${editors.at(-1)} Eds.`

  return names
}
