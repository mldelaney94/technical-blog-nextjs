import Link from 'next/link'
import { JSX } from 'react'

import { getAllPosts } from '@/lib/posts'

import styles from './blog.module.css'
import BlogPostCard from './components/blog-post-card'

export const metadata = {
  description: 'All blog posts',
  title: 'Blog',
}

export default async function BlogPage(): Promise<JSX.Element> {
  const posts = await getAllPosts()

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Link className={styles.homeLink} href="/">
          ← Home
        </Link>
        <h1>Blog</h1>
      </header>

      <div className={styles.postList}>
        {posts.map(post => (
          <BlogPostCard
            date={post.date}
            description={post.description}
            key={post.slug}
            slug={post.slug}
            tags={post.tags}
            title={post.title}
          />
        ))}
      </div>
    </main>
  )
}
