---
name: create-reference
description: >-
  Add IEEE bibliography entries to MDX posts in this blog. Use when the user
  asks to create a reference, add a citation, construct a bibliography item,
  cite a paper/URL/PubMed/DOI, or fill in bibliographic metadata for a post.
---

# Create a blog reference

Posts cite sources via `<Bibliography items={[...]}>` and inline `<Ref n={N} />`.
Do **not** hand-write IEEE citation strings — pass fields; `formatIeeeReference` renders them.

Source of truth for the item shape: `src/lib/ieee-reference/types.ts`.
Kind is usually inferred (`src/lib/ieee-reference/infer-kind.ts`); set `kind` only if inference would be wrong.

## Workflow

1. Open the target post under `src/content/posts/*.mdx`.
2. Find the `<Bibliography items={[...]}>` array at the top of the post body.
3. Append a new object (or fill a stub that is only `{ url }`). Array order = citation number: index `0` → `<Ref n={1} />`.
4. Prefer a DOI URL (`https://doi.org/...`) when one exists; else PubMed/PMC/publisher URL; keep URL fragments if the user cited a specific section.
5. If the user wants an inline cite, add `<Ref n={N} />` at the claim. `N` is `1`-based index in `items`.
6. Optional: verify rendering with:

```bash
node --experimental-strip-types -e "
import { formatIeeeReference } from './src/lib/ieee-reference/index.ts';
console.log(formatIeeeReference({ /* item */ }));
"
```

## Field conventions

| Field | Rules |
|-------|--------|
| `id` | Optional kebab-case slug for drafting (`schiavo-tetanus-zinc`). Readers never see it. |
| `authors` | `'F. Last'` or `['F. Last', 'G. Other']`. Initials + surname. Org names as a single string OK. |
| `title` | Article/page title as published. |
| `date` / `accessed` | ISO-8601 (`YYYY-MM-DD` or `YYYY`). Formatter turns these into IEEE dates. |
| `journal` | Presence → journal article. Include `volume`, `issue`, `pages` when known. |
| `url` | Always useful. With only `url` (+ optional `accessed`) → web stub (first-pass OK). |
| `accessed` | Use for websites/reports that can change; journal articles usually omit it. |
| `listAllAuthors` | Default false → 3+ authors become "First, et al." in output. Set `true` only if you need full list. |

Omit unknown fields. Partial entries are valid.

## Kind inference (do not reinvent)

| Signal | Kind |
|--------|------|
| `patentNumber` | patent |
| `degree` / `university` | thesis |
| `standardBody` | standard |
| `reportNumber` / `institution` | report |
| `journal` | journal |
| `bookTitle` + `title` | chapter |
| `conference` / `proceedings` | conference |
| `url` only (no title/authors/publisher) | web |
| `publisher` + `title`, no journal | book |
| else | online |

## Templates

**Journal (second pass):**

```js
{
  id: 'slug',
  authors: ['G. Schiavo', 'B. Poulain'], // or string for one author
  title: 'Paper title',
  journal: 'EMBO J.',
  volume: 11,
  issue: 10,
  pages: '3577-3583',
  date: '1992-10-01',
  url: 'https://doi.org/10.1002/j.1460-2075.1992.tb05441.x',
}
```

**Web stub (first pass):**

```js
{
  id: 'slug',
  url: 'https://example.com/page',
  accessed: '2026-07-18',
}
```

**Report / RFC:**

```js
{
  id: 'rfc9499',
  authors: ['P. Hoffman', 'K. Fujiwara'],
  title: 'BCP 219: DNS Terminology',
  publisher: 'RFC Editor',
  reportNumber: 'RFC 9499',
  date: '2024-03-01',
  url: 'https://www.rfc-editor.org/rfc/rfc9499.html',
  accessed: '2026-06-03',
}
```

## Do / don't

- **Do** append to the existing `items` array; never renumber earlier entries unless the user asks.
- **Do** fetch metadata from the URL/PubMed/DOI the user gave when building a second-pass entry.
- **Don't** invent authors, titles, or page ranges.
- **Don't** explore `this-blog.mdx` or the IEEE formatter source unless the skill is insufficient for an edge case.
