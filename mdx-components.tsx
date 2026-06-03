import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentPropsWithoutRef, JSX } from 'react'

import { CodeBlock, Pre } from '@/components/code-block'

// Heading component with level-based top margins
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
type HeadingTag = `h${HeadingLevel}`

const headingMargins: Record<HeadingLevel, string> = {
  1: '2.5rem',
  2: '2.5rem',
  3: '2rem',
  4: '1.5rem',
  5: '1.25rem',
  6: '1rem',
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Custom components
    // MDX element overrides
    h1: (props: ComponentPropsWithoutRef<'h1'>) => <Heading level={1} {...props} />,
    h2: (props: ComponentPropsWithoutRef<'h2'>) => <Heading level={2} {...props} />,
    h3: (props: ComponentPropsWithoutRef<'h3'>) => <Heading level={3} {...props} />,
    h4: (props: ComponentPropsWithoutRef<'h4'>) => <Heading level={4} {...props} />,
    h5: (props: ComponentPropsWithoutRef<'h5'>) => <Heading level={5} {...props} />,
    h6: (props: ComponentPropsWithoutRef<'h6'>) => <Heading level={6} {...props} />,
    Image,
    Link,
    pre: Pre,
  }
}

function Heading({ level, ...props }: { level: HeadingLevel } & ComponentPropsWithoutRef<HeadingTag>): JSX.Element {
  const Tag = `h${level}` as HeadingTag

  return <Tag style={{ marginTop: headingMargins[level] }} {...props} />
}
