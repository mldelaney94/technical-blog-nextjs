export function formatAccessedDate(iso8601: string): string {
  const dateOnly = iso8601.split('T')[0]
  const date = Temporal.PlainDate.from(dateOnly)
  const month = date.toLocaleString('en-US', { month: 'short' })

  return `${month} ${date.day} ${date.year}`
}
