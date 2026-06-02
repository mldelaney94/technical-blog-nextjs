import Link from 'next/link'
import { JSX } from 'react'

import RecentPostItem from '@/components/recent-post-item'
import { getAllPosts } from '@/lib/posts'

import styles from './page.module.css'

export default async function Home(): Promise<JSX.Element> {
  const recentPosts = (await getAllPosts()).slice(0, 3)

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.hero}>
          <h1>My Blog</h1>
          <p>Thoughts, ideas.</p>
        </header>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Recent Posts</h2>
            <Link href="/blog">View all →</Link>
          </div>

          <div className={styles.postList}>
            {recentPosts.map(post => (
              <RecentPostItem
                date={post.date}
                key={post.slug}
                slug={post.slug}
                title={post.title}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
