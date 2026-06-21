import { formatBook } from './book.ts'
import { formatChapter } from './chapter.ts'
import { formatConference } from './conference.ts'
import { formatJournal } from './journal.ts'
import { formatOnline } from './online.ts'
import { formatPatent } from './patent.ts'
import { formatReport } from './report.ts'
import { formatStandard } from './standard.ts'
import { formatThesis } from './thesis.ts'
import { formatWeb } from './web.ts'
import type { ReferenceFormatter, ReferenceKind } from '../types.ts'

export const formatters = {
  book: formatBook,
  chapter: formatChapter,
  conference: formatConference,
  journal: formatJournal,
  online: formatOnline,
  patent: formatPatent,
  report: formatReport,
  standard: formatStandard,
  thesis: formatThesis,
  web: formatWeb,
} satisfies Record<ReferenceKind, ReferenceFormatter>

export function getFormatter(kind: ReferenceKind): ReferenceFormatter {
  return formatters[kind]
}
