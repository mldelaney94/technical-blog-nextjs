export type ReferenceKind =
  | 'book'
  | 'chapter'
  | 'conference'
  | 'journal'
  | 'online'
  | 'patent'
  | 'report'
  | 'standard'
  | 'thesis'
  | 'web'

export type ReferenceItem = {
  accessed?: string
  authors?: string | string[]
  bookTitle?: string
  conference?: string
  date?: string
  degree?: string
  department?: string
  edition?: string | number
  editor?: string | string[]
  id?: string
  institution?: string
  issue?: string | number
  journal?: string
  kind?: ReferenceKind
  location?: string
  pages?: string
  patentNumber?: string
  proceedings?: string
  publisher?: string
  reportNumber?: string
  standardBody?: string
  title?: string
  university?: string
  url?: string
  volume?: string | number
}

export type ReferenceFormatter = (item: ReferenceItem) => string
