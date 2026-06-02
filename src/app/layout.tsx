import './globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { JSX } from 'react'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  authors: [{ name: 'Matthew Delaney' }],
  description: 'A technical blog by Matthew Delaney',
  metadataBase: new URL('https://technical.mldelaney94.com'), // Update this to your actual domain
  openGraph: {
    description: 'A technical blog by Matthew Delaney',
    locale: 'en_US',
    siteName: 'Matthew Delaney',
    title: 'Matthew Delaney',
    type: 'website',
  },
  title: {
    default: 'Matthew Delaney',
    template: '%s | Matthew Delaney',
  },
  twitter: {
    card: 'summary',
    description: 'A technical blog by Matthew Delaney',
    title: 'Matthew Delaney',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
