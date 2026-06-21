export function formatAuthors(
  authors?: string | string[],
  suffix?: string,
): string {
  if (!authors) {
    return suffix ?? ''
  }

  const list = typeof authors === 'string' ? [authors] : authors

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

  const names = `${list.slice(0, -1).join(', ')}, and ${list.at(-1)}`
  return suffix ? `${names}, ${suffix}` : names
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
