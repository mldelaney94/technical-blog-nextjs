import Link from 'next/link'
import { JSX } from 'react'

import styles from './recent-post-item.module.css'

interface BlogPostItemProps {
  date: string
  slug: string
  title: string
}

export default function RecentPostItem({ date, slug, title }: BlogPostItemProps): JSX.Element {
  return (
    <div>
      <Link className={styles.postLink} href={`/blog/${slug}`}>
        <span className={styles.postTitle}>{title}</span>
        <time dateTime={date}>
          {new Date(date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
          })}
        </time>
      </Link>
    </div>
  )
}
