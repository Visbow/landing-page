"use client"

import { useEffect, useRef } from "react"

export function Mermaid({ code, id }: { code: string; id: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      try {
        const { default: mermaid } = await import("mermaid")
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: {
            primaryColor: "#FFFFFF",
            primaryTextColor: "#1E293B",
            primaryBorderColor: "#CBD5E1",
            lineColor: "#A8A29E",
            secondaryColor: "#F8FAFC",
            tertiaryColor: "#F8FAFC",
            edgeLabelBackground: "#FFFFFF",
            fontSize: "18px",
          },
          fontFamily: "inherit",
          securityLevel: "loose",
          flowchart: { curve: "basis", padding: 28, useMaxWidth: false },
        })

        const uid = `${id}-${Date.now()}`
        const { svg } = await mermaid.render(uid, code)
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg
          // make SVG responsive
          const el = ref.current.querySelector("svg")
          if (el) {
            el.removeAttribute("width")
            el.removeAttribute("height")
            el.style.width = "100%"
            el.style.height = "auto"
          }
        }
      } catch (err) {
        console.error("Mermaid:", err)
        if (!cancelled && ref.current)
          ref.current.innerHTML = `<pre style="color:#ef4444;font-size:11px;white-space:pre-wrap">${err}</pre>`
      }
    }

    run()
    return () => { cancelled = true }
  }, [code, id])

  return <div ref={ref} className="w-full" style={{ minHeight: 200 }} />
}
