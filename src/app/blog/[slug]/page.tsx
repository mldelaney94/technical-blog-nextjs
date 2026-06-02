import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JSX } from 'react'

import { getAllPostSlugs, getPostBySlug } from '@/lib/posts'

import styles from './post.module.css'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    description: post.description,
    openGraph: {
      description: post.description,
      title: post.title,
      type: 'article',
    },
    title: post.title,
    twitter: {
      card: 'summary',
      description: post.description,
      title: post.title,
    },
  }
}

export function generateStaticParams(): { slug: string }[] {
  const slugs = getAllPostSlugs()

  return slugs.map(slug => ({ slug }))
}

export default async function PostPage({ params }: PageProps): Promise<JSX.Element> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  let Content: React.ComponentType
  try {
    const mdxModule = await import(`@/content/posts/${slug}.mdx`)
    Content = mdxModule.default
  } catch {
    notFound()
  }

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Link href="/blog">← Back to Blog</Link>
      </nav>

      <article className={styles.article}>
        <header className={styles.header}>
          <h1>{post.title}</h1>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleString('en-US', {
              day: 'numeric',
              hour: '2-digit',
              hour12: false,
              minute: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </time>
          {post.tags && post.tags.length > 0 && (
            <div className={styles.tags}>
              {post.tags.map(tag => (
                <span className={styles.tag} key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className={styles.content}>
          <Content />
        </div>
      </article>
    </main>
  )
}
