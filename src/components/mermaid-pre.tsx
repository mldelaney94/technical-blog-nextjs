import React from 'react'
import type { JSX } from 'react'

import { Mermaid } from '@/components/mermaid'

interface CodeChildProps {
  children?: React.ReactNode
  className?: string
}

export function MermaidPre({ children, ...props }: React.ComponentPropsWithoutRef<'pre'>): JSX.Element {
  const child = children as React.ReactElement<CodeChildProps> | undefined

  if (child?.props?.className === 'language-mermaid') {
    return <Mermaid chart={extractText(child.props.children)} />
  }

  return <pre {...props}>{children}</pre>
}

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (!node) return ''
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (typeof node === 'object' && 'props' in node) {
    return extractText((node as React.ReactElement<React.PropsWithChildren>).props.children)
  }

  return ''
}
