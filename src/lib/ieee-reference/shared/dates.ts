import 'temporal-polyfill/global'

export function formatPublicationDate(date?: string): string | undefined {
  if (!date) {
    return undefined
  }

  const dateOnly = date.split('T')[0]

  if (/^\d{4}$/.test(dateOnly)) {
    return dateOnly
  }

  const parsed = Temporal.PlainDate.from(dateOnly)
  const month = parsed.toLocaleString('en-US', { month: 'short' })
  const monthWithPeriod = month.endsWith('.') ? month : `${month}.`

  return `${monthWithPeriod} ${parsed.year}`
}
