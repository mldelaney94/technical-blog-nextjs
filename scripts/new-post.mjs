#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const postsDir = path.join(__dirname, '../src/content/posts')

// Get title from command line args
const title = process.argv.slice(2).join(' ')

if (!title) {
  console.error('Usage: npm run new-post "Your Post Title"')
  process.exit(1)
}

// Generate slug from title (kebab-case)
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
  .trim()

// Generate ISO timestamp in local time
const now = new Date()
const pad = n => String(n).padStart(2, '0')
const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`

// Create metadata export
const content = `export const metadata = {
  title: "${title}",
  date: "${date}",
  description: "",
  tags: [],
}

`

const filePath = path.join(postsDir, `${slug}.mdx`)

// Check if file already exists
if (fs.existsSync(filePath)) {
  console.error(`Error: Post already exists at ${filePath}`)
  process.exit(1)
}

// Create the file
fs.writeFileSync(filePath, content)
console.log(`Created: ${filePath}`)
