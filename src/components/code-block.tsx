import React from 'react'
import type { JSX } from 'react'
import { codeToHtml } from 'shiki'

interface CodeBlockProps {
  children?: React.ReactNode
  className?: string
}

export async function CodeBlock({ children, className }: CodeBlockProps): Promise<JSX.Element> {
  const code = extractText(children).replace(/\n$/, '')
  const lang = className?.replace('language-', '') ?? 'text'

  const html = await codeToHtml(code, {
    lang,
    theme: 'github-dark',
  })

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export function Pre({ children, ...props }: React.ComponentPropsWithoutRef<'pre'>): JSX.Element {
  const child = children as React.ReactElement<CodeBlockProps> | undefined

  if (child?.props?.className?.startsWith('language-')) {
    return <CodeBlock className={child.props.className}>{child.props.children}</CodeBlock>
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
