import Link from 'next/link'
import { JSX } from 'react'

import styles from './blog-post-card.module.css'

interface BlogPostCardProps {
  date: string
  description: string
  slug: string
  tags?: string[]
  title: string
}

export default function BlogPostCard({ date, description, slug, tags, title }: BlogPostCardProps): JSX.Element {
  return (
    <div>
      <Link className={styles.postCard} href={`/blog/${slug}`}>
        <article>
          <h2>{title}</h2>
          <time dateTime={date}>
            {new Date(date).toLocaleString('en-US', {
              day: 'numeric',
              hour: '2-digit',
              hour12: false,
              minute: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </time>
          <p>{description}</p>
          {tags && tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map(tag => (
                <span className={styles.tag} key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </Link>
    </div>
  )
}
