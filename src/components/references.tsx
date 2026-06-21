'use client'

import { createContext, type JSX, type ReactNode, useContext } from 'react'
import styled from 'styled-components'

import {
  formatIeeeReference,
  type ReferenceItem,
} from '@/lib/ieee-reference'

export type { ReferenceItem } from '@/lib/ieee-reference'

const ReferenceContext = createContext<null | ReferenceItem[]>(null)

const RefWrapper = styled.sup`
  position: relative;
  white-space: nowrap;
`

const RefLink = styled.a`
  color: #0070f3;
  font-size: 0.75em;
  line-height: 0;
  text-decoration: none;
  vertical-align: super;

  &:hover {
    text-decoration: underline;
  }
`

const Tooltip = styled.span`
  background: var(--background);
  border: 1px solid color-mix(in srgb, var(--foreground) 20%, transparent);
  border-radius: 6px;
  box-shadow: 0 4px 12px color-mix(in srgb, var(--foreground) 15%, transparent);
  color: var(--foreground);
  font-size: 0.8rem;
  font-weight: 400;
  left: 50%;
  line-height: 1.4;
  max-width: min(36rem, 85vw);
  opacity: 0;
  padding: 0.6rem 0.75rem;
  pointer-events: none;
  position: absolute;
  top: calc(100% + 0.35rem);
  transform: translateX(-50%) translateY(-0.15rem);
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
  visibility: hidden;
  white-space: normal;
  width: max-content;
  z-index: 10;

  ${RefWrapper}:hover &,
  ${RefWrapper}:focus-within & {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    visibility: visible;
  }
`

const BibliographyList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  list-style: none;
  margin: 0;
  padding: 0;
`

const BibliographyEntry = styled.li`
  display: grid;
  gap: 0.35rem;
  grid-template-columns: auto 1fr;
`

const BibliographyLabel = styled.span`
  font-variant-numeric: tabular-nums;
`

const BibliographyText = styled.p`
  margin: 0;
`

export function Bibliography({
  children,
  items,
}: {
  children: ReactNode
  items: ReferenceItem[]
}): JSX.Element {
  return (
    <ReferenceContext.Provider value={items}>
      {children}
      <BibliographyListView items={items} />
    </ReferenceContext.Provider>
  )
}

export function Ref({ n }: { n: number }): JSX.Element {
  const items = useReferences()
  const item = items[n - 1]
  const text = item ? formatIeeeReference(item) : undefined

  if (!text) {
    return (
      <RefWrapper>
        [
        {n}
        ?]
      </RefWrapper>
    )
  }

  return (
    <RefWrapper>
      <RefLink href={`#ref-${n}`}>
        [
        {n}
        ]
      </RefLink>
      <Tooltip role="tooltip">
        {text}
      </Tooltip>
    </RefWrapper>
  )
}

function BibliographyListView({ items }: { items: ReferenceItem[] }): JSX.Element | null {
  if (items.length === 0) {
    return null
  }

  return (
    <BibliographyList>
      {items.map((item, index) => {
        const n = index + 1

        return (
          <BibliographyEntry id={`ref-${n}`} key={item.id ?? n}>
            <BibliographyLabel>
              [
              {n}
              ]
            </BibliographyLabel>
            <BibliographyText>{formatIeeeReference(item)}</BibliographyText>
          </BibliographyEntry>
        )
      })}
    </BibliographyList>
  )
}

function useReferences(): ReferenceItem[] {
  const items = useContext(ReferenceContext)

  if (!items) {
    throw new Error(
      'Ref requires a parent <Bibliography items={[...]}> wrapper.',
    )
  }

  return items
}
