import React from 'react'
import type { JSX } from 'react'

import { Pre as CodePre } from '@/components/code-block'
import { MermaidPre } from '@/components/mermaid-pre'

interface CodeChildProps {
  className?: string
}

export function Pre({ children, ...props }: React.ComponentPropsWithoutRef<'pre'>): JSX.Element {
  const child = children as React.ReactElement<CodeChildProps> | undefined

  if (child?.props?.className === 'language-mermaid') {
    return <MermaidPre {...props}>{children}</MermaidPre>
  }

  return <CodePre {...props}>{children}</CodePre>
}
