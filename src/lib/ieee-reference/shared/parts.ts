export function joinParts(parts: Array<string | undefined>): string {
  return parts.filter((part): part is string => Boolean(part)).join(', ')
}

export function quoted(title?: string): string | undefined {
  if (!title) {
    return undefined
  }

  return `"${title},"`
}

export function formatPages(pages?: string): string | undefined {
  if (!pages) {
    return undefined
  }

  return pages.startsWith('p') || pages.startsWith('pp') ? pages : `pp. ${pages}`
}

export function formatEdition(edition?: string | number): string | undefined {
  if (edition === undefined) {
    return undefined
  }

  return `${edition} ed.`
}

export function formatPublisherLocation(location?: string, publisher?: string): string | undefined {
  if (location && publisher) {
    return `${location}: ${publisher}`
  }

  return publisher ?? location
}

export function formatVolumeIssue(volume?: string | number, issue?: string | number): string | undefined {
  const parts: string[] = []

  if (volume !== undefined) {
    parts.push(`vol. ${volume}`)
  }

  if (issue !== undefined) {
    parts.push(`no. ${issue}`)
  }

  return parts.length > 0 ? parts.join(', ') : undefined
}
