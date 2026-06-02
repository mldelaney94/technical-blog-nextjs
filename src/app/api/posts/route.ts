import { NextRequest, NextResponse } from 'next/server'

interface GitHubErrorResponse {
  message: string
}

interface PostData {
  content: string
  date: string
  description: string
  slug: string
  tags: string[]
  title: string
  token?: string
}

// Repo config - set these in your environment
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main'

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!GITHUB_REPO) {
    return NextResponse.json(
      { error: 'GITHUB_REPO environment variable not configured.' },
      { status: 500 },
    )
  }

  try {
    const data: PostData = await request.json()

    // Token from request or env var
    const token = data.token || process.env.GITHUB_TOKEN

    if (!token) {
      return NextResponse.json(
        { error: 'GitHub token required.' },
        { status: 401 },
      )
    }

    if (!data.slug || !data.title || !data.content) {
      return NextResponse.json(
        { error: 'Missing required fields: slug, title, content' },
        { status: 400 },
      )
    }

    // Sanitize slug
    const slug = data.slug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    const filePath = `src/content/posts/${slug}.mdx`

    // Check if file already exists in repo
    const checkResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (checkResponse.status === 200) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 409 },
      )
    }

    const escapeJsString = (value: string): string =>
      value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')

    const tagsFormatted = data.tags.length > 0
      ? `[${data.tags.map(t => `"${escapeJsString(t)}"`).join(', ')}]`
      : '[]'

    const fileContent = `export const metadata = {
  title: "${escapeJsString(data.title)}",
  date: "${data.date}",
  description: "${escapeJsString(data.description)}",
  tags: ${tagsFormatted},
}

${data.content}
`

    // Base64 encode the content
    const contentBase64 = Buffer.from(fileContent).toString('base64')

    // Create file via GitHub API
    const createResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`,
      {
        body: JSON.stringify({
          branch: GITHUB_BRANCH,
          content: contentBase64,
          message: `Add blog post: ${data.title}`,
        }),
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      },
    )

    if (!createResponse.ok) {
      const errorData: GitHubErrorResponse = await createResponse.json()

      // Provide helpful error messages
      let errorMessage = errorData.message

      if (createResponse.status === 404) {
        errorMessage = `Repository "${GITHUB_REPO}" not found, or token lacks access. Check GITHUB_REPO env var and token permissions.`
      } else if (createResponse.status === 401) {
        errorMessage = 'Invalid or expired token.'
      } else if (createResponse.status === 403) {
        errorMessage = 'Token lacks write permission. Needs "repo" scope or Contents write access.'
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: createResponse.status },
      )
    }

    return NextResponse.json({ slug, success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 },
    )
  }
}
