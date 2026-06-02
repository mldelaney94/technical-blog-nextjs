import fs from 'fs'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

export interface PostMeta {
  date: string
  description: string
  slug: string
  tags?: string[]
  title: string
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = getAllPostSlugs()

  const posts = await Promise.all(
    slugs.map(async slug => {
      const mod = await import(`@/content/posts/${slug}.mdx`)
      const meta = mod.metadata ?? {}

      return {
        date: meta.date ?? '',
        description: meta.description ?? '',
        slug,
        tags: meta.tags ?? [],
        title: meta.title ?? slug,
      }
    }),
  )

  return posts.sort((a, b) => {
    if (a.date !== b.date) {
      return a.date > b.date ? -1 : 1
    }

    return a.title.localeCompare(b.title)
  })
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  return fs
    .readdirSync(postsDirectory)
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => fileName.replace(/\.mdx$/, ''))
}

export async function getPostBySlug(slug: string): Promise<null | PostMeta> {
  const slugs = getAllPostSlugs()

  if (!slugs.includes(slug)) {
    return null
  }

  const mod = await import(`@/content/posts/${slug}.mdx`)
  const meta = mod.metadata ?? {}

  return {
    date: meta.date ?? '',
    description: meta.description ?? '',
    slug,
    tags: meta.tags ?? [],
    title: meta.title ?? slug,
  }
}
