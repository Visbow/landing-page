"use client"

import { useEffect, useRef, useId } from "react"
import mermaid from "mermaid"

mermaid.initialize({
  startOnLoad: false,
  theme: "neutral",
  themeVariables: {
    primaryColor: "#FFF5E1",
    primaryBorderColor: "#FF6B35",
    primaryTextColor: "#2D2A26",
    lineColor: "#F5E6D3",
    secondaryColor: "#FFFCF5",
    tertiaryColor: "#FFF9ED",
  },
})

interface MermaidProps {
  code: string
  id?: string
}

export function Mermaid({ code, id }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const uniqueId = useId()
  const chartId = id || `mermaid-${uniqueId.replace(/:/g, '')}`

  useEffect(() => {
    const renderChart = async () => {
      try {
        const { svg } = await mermaid.render(chartId, code)
        if (containerRef.current) {
          containerRef.current.innerHTML = svg
        }
      } catch (error) {
        console.error("Error rendering mermaid chart:", error)
        if (containerRef.current) {
          containerRef.current.innerHTML = `<pre class="text-xs p-4 bg-[#FFF9ED] rounded-xl overflow-x-auto">${code}</pre>`
        }
      }
    }

    renderChart()
  }, [code, chartId])

  return (
    <div className="bg-[#FFF9ED] p-4 rounded-xl border border-[#F5E6D3] overflow-x-auto">
      <div ref={containerRef} className="mermaid-content"></div>
    </div>
  )
}