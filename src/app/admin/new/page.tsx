'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, JSX, useEffect, useState } from 'react'

import styles from './admin.module.css'

const STORAGE_KEY = 'blog-admin-token'

export default function NewPostPage(): JSX.Element {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [showSettings, setShowSettings] = useState(false)

  // GitHub token (persisted in localStorage)
  const [token, setToken] = useState('')

  // Post fields
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [content, setContent] = useState('')

  // Load saved token on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved) {
      setToken(saved)
    }
  }, [])

  function saveToken(): void {
    localStorage.setItem(STORAGE_KEY, token)
  }

  // Auto-generate slug from title
  function handleTitleChange(value: string): void {
    setTitle(value)

    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(value))
    }
  }

  function generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault()

    if (!token) {
      setError('GitHub token required. Click "Settings" to add your token.')

      return
    }

    setSaving(true)
    setError('')
    saveToken()

    const now = new Date()
    const date = now.toISOString().slice(0, 19) // YYYY-MM-DDTHH:mm:ss

    const tagList = tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)

    try {
      const res = await fetch('/api/posts', {
        body: JSON.stringify({
          content,
          date,
          description,
          slug,
          tags: tagList,
          title,
          token,
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create post')
        setSaving(false)

        return
      }

      router.push(`/blog/${data.slug}`)
    } catch {
      setError('Failed to create post')
      setSaving(false)
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>New Post</h1>
        <button
          className={styles.settingsToggle}
          onClick={() => setShowSettings(!showSettings)}
          type="button"
        >
          {showSettings ? 'Hide' : 'Settings'}
        </button>
      </div>

      {showSettings && (
        <div className={styles.settings}>
          <div className={styles.field}>
            <label htmlFor="token">GitHub Token</label>
            <input
              id="token"
              onChange={e => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxx"
              type="password"
              value={token}
            />
            <span className={styles.hint}>
              <a
                href="https://github.com/settings/tokens"
                rel="noopener noreferrer"
                target="_blank"
              >
                Create a token
              </a>
              {' '}
              with repo access. Saved in your browser.
            </span>
          </div>

          <button
            className={styles.saveSettings}
            onClick={saveToken}
            type="button"
          >
            Save Token
          </button>
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.field}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            onChange={e => handleTitleChange(e.target.value)}
            placeholder="My Awesome Post"
            required
            type="text"
            value={title}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="slug">Slug</label>
          <input
            id="slug"
            onChange={e => setSlug(e.target.value)}
            placeholder="my-awesome-post"
            required
            type="text"
            value={slug}
          />
          <span className={styles.hint}>
            /blog/
            {slug || 'my-awesome-post'}
          </span>
        </div>

        <div className={styles.field}>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            onChange={e => setDescription(e.target.value)}
            placeholder="A short summary of the post"
            type="text"
            value={description}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            onChange={e => setTags(e.target.value)}
            placeholder="react, tutorial, nextjs"
            type="text"
            value={tags}
          />
          <span className={styles.hint}>Comma-separated</span>
        </div>

        <div className={styles.field}>
          <label htmlFor="content">Content (MDX)</label>
          <textarea
            id="content"
            onChange={e => setContent(e.target.value)}
            placeholder="Write your post in markdown..."
            required
            rows={20}
            value={content}
          />
        </div>

        <button className={styles.submit} disabled={saving} type="submit">
          {saving ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </main>
  )
}
