import type { JSX, ReactNode } from 'react'
import styled from 'styled-components'

import { formatAccessedDate } from '@/lib/format-accessed-date'

const Figure = styled.blockquote`
  border-left: 3px solid color-mix(in srgb, var(--foreground) 25%, transparent);
  margin: 0;
  padding-left: 1rem;

  & > :first-child {
    display: inline;
    margin: 0;
  }
`

const Accessed = styled.p`
  opacity: 0.8;
`

export function Quote({
  accessed,
  children,
}: {
  accessed?: string
  children: ReactNode
}): JSX.Element {
  return (
    <Figure>
      &ldquo;
      {children}
      &rdquo;
      {accessed ? (
        <>
          {' '}
          <Accessed>
            (accessed
            {' '}
            {formatAccessedDate(accessed)}
            )
          </Accessed>
        </>
      ) : null}
    </Figure>
  )
}
