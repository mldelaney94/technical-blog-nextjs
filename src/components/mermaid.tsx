'use client'

import mermaid from 'mermaid'
import { useEffect, useId, useState } from 'react'
import type { JSX } from 'react'

interface MermaidProps {
  chart: string
}

export function Mermaid({ chart }: MermaidProps): JSX.Element {
  const id = useId().replace(/:/g, '')
  const [svg, setSvg] = useState('')

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
    })

    let cancelled = false

    void mermaid.render(`mermaid-${id}`, chart.trim()).then(({ svg: rendered }) => {
      if (!cancelled) {
        setSvg(rendered)
      }
    })

    return () => {
      cancelled = true
    }
  }, [chart, id])

  return (
    <div
      aria-label="Flowchart diagram"
      dangerouslySetInnerHTML={{ __html: svg }}
      role="img"
      style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0', overflowX: 'auto' }}
    />
  )
}
