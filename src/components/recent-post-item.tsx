import Link from 'next/link'
import { JSX } from 'react'
import styled from 'styled-components'

interface BlogPostItemProps {
  date: string
  slug: string
  title: string
}

const PostLink = styled(Link)`
  align-items: center;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  transition: background 0.2s;

  &:hover {
    background: color-mix(in srgb, var(--foreground) 5%, transparent);
  }

  time {
    font-size: 0.875rem;
    opacity: 0.6;
  }
`

const PostTitle = styled.span`
  font-weight: 500;
`

export default function RecentPostItem({ date, slug, title }: BlogPostItemProps): JSX.Element {
  return (
    <div>
      <PostLink href={`/blog/${slug}`}>
        <PostTitle>{title}</PostTitle>
        <time dateTime={date}>
          {new Date(date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
          })}
        </time>
      </PostLink>
    </div>
  )
}
