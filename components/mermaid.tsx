"use client"

import { useEffect, useRef } from "react"
import mermaid from "mermaid"

export function Mermaid({ code, id }: { code: string; id: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "neutral",
      fontFamily: "var(--font-mono, monospace)",
      securityLevel: "loose",
    })

    mermaid
      .render(id, code)
      .then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg
      })
      .catch(console.error)
  }, [code, id])

  return <div ref={ref} className="w-full" />
}
