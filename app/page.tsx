"use client"

import Link from "next/link"
import { Mermaid } from "@/components/mermaid"

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFCF5]/95 backdrop-blur-sm border-b border-[#F5E6D3]">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-[#FF6B35] to-[#FF8F5E] rounded-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8H19C20.1046 8 21 8.89543 21 10V11C21 12.1046 20.1046 13 19 13H17.5V14C17.5 15.6569 16.1569 17 14.5 17H5.5C3.84315 17 2.5 15.6569 2.5 14V5C2.5 3.34315 3.84315 2 5.5 2H14.5C16.1569 2 17.5 3.34315 17.5 5V6H17.5C17.5 6 17.5 6 17.5 6C17.5 6 21 6 21 10V11C21 11 21 11 21 11C21 11 17.5 11 17.5 11V8Z"/>
              <path d="M6 14H14.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6 17H10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-[var(--font-heading),Georgia,serif] text-xl font-semibold text-[#2D2A26]">Visbow</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link href="#features" className="text-[15px] font-medium text-[#6B6560] no-underline hover:text-[#2D2A26] transition-colors hidden md:block">Features</Link>
          <Link href="#quick-start" className="text-[15px] font-medium text-[#6B6560] no-underline hover:text-[#2D2A26] transition-colors hidden md:block">Docs</Link>
          <Link href="#pricing" className="text-[15px] font-medium text-[#6B6560] no-underline hover:text-[#2D2A26] transition-colors hidden md:block">Pricing</Link>
          <Link href="#" className="text-sm font-semibold bg-[#FF6B35] text-white rounded-lg py-2.5 px-5 no-underline hover:bg-[#E85A2A] transition-colors shadow-md hover:shadow-lg">
            Get API Key
          </Link>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="pt-40 pb-20 px-6 bg-[#FFFCF5]">
      <div className="max-w-[900px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-[#F5E6D3] rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse"></span>
          <span className="text-sm font-medium text-[#FF6B35]">Now tracking 4 AI platforms</span>
        </div>

        <h1 className="font-[var(--font-heading),Georgia,serif] text-[clamp(36px,5vw,56px)] font-semibold text-[#2D2A26] mb-6 leading-[1.1]">
          The universal visibility API<br />
          <span className="text-[#FF6B35]">for the AI era</span>
        </h1>

        <p className="text-xl text-[#6B6560] max-w-[640px] mx-auto mb-8 leading-relaxed">
          Stop building brand tracking from scratch. Monitor your presence across ChatGPT, Claude, Perplexity, and Gemini. Built for developers who ship.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="#" className="text-base font-semibold bg-[#FF6B35] text-white rounded-lg py-3 px-6 no-underline hover:bg-[#E85A2A] transition-colors inline-flex items-center gap-2 shadow-md hover:shadow-lg">
            Start Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <Link href="#" className="text-base font-medium bg-white text-[#2D2A26] border-2 border-[#E8D5C4] rounded-lg py-3 px-6 no-underline hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors">
            View Documentation
          </Link>
        </div>

        <div className="flex items-center justify-center gap-8 text-sm text-[#9C9690]">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
            <span>9,000+ GitHub Stars</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            <span>Free Forever Tier</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustedBy() {
  const companies = [
    "Flow", "MedtechVendors", "Cline", "Cursor", "Windsurf", "Stash"
  ]
  
  return (
    <section className="py-12 px-6 bg-[#FFF5E1] border-y border-[#F5E6D3]">
      <div className="max-w-[1000px] mx-auto">
        <p className="text-center text-sm text-[#9C9690] mb-8">Trusted by Open Source, enterprise, and more than 35,000 of you</p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {companies.map((company) => (
            <div key={company} className="text-lg font-semibold text-[#9C9690]">{company}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProblemSection() {
  return (
    <section className="py-24 px-6 bg-[#FFFCF5]">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[var(--font-heading),Georgia,serif] text-[clamp(28px,4vw,40px)] font-semibold text-[#2D2A26] mb-4">
            Context is everything
          </h2>
          <p className="text-lg text-[#6B6560]">
            Without brand visibility data, even the smartest AI is just a expensive chatbot
          </p>
        </div>

        <div className="bg-white border border-[#F5E6D3] rounded-xl p-6 font-mono text-sm shadow-sm">
          <div className="text-[#9C9690] mb-4">~ marketing.team</div>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-[#9C9690]">$</span>
              <span className="text-[#6B6560]">init brand_tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500">✗</span>
              <span className="text-[#6B6560]">Way too expensive. Manual research takes weeks.</span>
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              <span className="text-[#9C9690]">$</span>
              <span className="text-[#6B6560]">handle competitor_analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500">✗</span>
              <span className="text-[#6B6560]">No unified API. Every platform is different.</span>
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              <span className="text-[#9C9690]">$</span>
              <span className="text-[#6B6560]">init ai_platform_presence</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500">✗</span>
              <span className="text-[#6B6560]">ChatGPT, Claude, Perplexity - how do I track all of them?</span>
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              <span className="text-[#9C9690]">$</span>
              <span className="text-[#6B6560]">get weekly_insights</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500">✗</span>
              <span className="text-[#6B6560]">Manual spreadsheets. Always outdated.</span>
            </div>
          </div>

          <div className="border-t border-[#F5E6D3] pt-4 mt-4">
            <div className="bg-orange-50 border border-[#F5E6D3] rounded-lg p-4">
              <div className="text-[#FF6B35] font-semibold mb-2">BREAKING NEWS</div>
              <div className="text-[#2D2A26]">
                New visibility tracking just dropped: <span className="text-[#FF6B35]">Visbow</span> - AI Brand Intelligence Platform
              </div>
            </div>
          </div>

          <div className="border-t border-[#F5E6D3] pt-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-[#9C9690]">$</span>
              <span className="text-[#6B6560]">compare tracking_methods</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500">✗</span>
              <span className="text-[#6B6560]">Manual: 6-8 weeks to set up</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[#2ECC71]">✓</span>
              <span className="text-[#6B6560]">Visbow: 2 minutes to integrate</span>
            </div>
          </div>

          <div className="border-t border-[#F5E6D3] pt-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-[#9C9690]">$</span>
              <span className="text-[#6B6560]">init visbow</span>
            </div>
            <div className="text-[#2ECC71]">✓ Done. Ship your brand intelligence.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function QuickStart() {
  const links = [
    { label: "API Documentation", href: "#" },
    { label: "TypeScript SDK", href: "#" },
    { label: "Python SDK", href: "#" },
    { label: "REST API Reference", href: "#" },
    { label: "Developer Console (API Keys)", href: "#" },
  ]

  const endpoints = [
    { method: "POST", path: "/v3/brands", description: "Add a brand to track" },
    { method: "POST", path: "/v3/mentions", description: "Search mentions across platforms" },
    { method: "GET", path: "/v3/visibility", description: "Get visibility scores" },
  ]

  return (
    <section className="py-24 px-6 bg-[#FFF9ED]" id="quick-start">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-[var(--font-heading),Georgia,serif] text-3xl font-semibold text-[#2D2A26] mb-8">
              Quick Start
            </h2>
            <div className="space-y-3">
              {links.map((link, i) => (
                <a 
                  key={i} 
                  href={link.href}
                  className="flex items-center gap-2 text-[#6B6560] hover:text-[#FF6B35] transition-colors no-underline group"
                >
                  <svg className="w-4 h-4 text-[#9C9690] group-hover:text-[#FF6B35] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7"/>
                  </svg>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-[var(--font-heading),Georgia,serif] text-3xl font-semibold text-[#2D2A26] mb-8">
              Core API Endpoints
            </h2>
            <div className="space-y-4">
              {endpoints.map((endpoint, i) => (
                <div key={i} className="bg-white border border-[#F5E6D3] rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold bg-[#FF6B35] text-white px-2 py-0.5 rounded">{endpoint.method}</span>
                    <code className="text-sm text-[#2D2A26] font-mono">{endpoint.path}</code>
                  </div>
                  <p className="text-sm text-[#9C9690]">{endpoint.description}</p>
                </div>
              ))}
            </div>
            <a href="#" className="inline-block mt-4 text-sm text-[#FF6B35] hover:underline">
              Full reference → 
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    {
      title: "Multi-Platform Tracking",
      description: "Track your brand across ChatGPT, Claude, Perplexity, and Gemini. One API to rule them all.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
        </svg>
      ),
    },
    {
      title: "Competitor Intelligence",
      description: "Monitor competitor mentions and compare your visibility against them in real-time.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
      ),
    },
    {
      title: "Weekly Reports",
      description: "Get actionable insights delivered to your inbox every week. Know exactly what to fix.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
    },
    {
      title: "Sentiment Analysis",
      description: "Understand how AI platforms talk about you. Positive, negative, or neutral - we track it all.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
    },
    {
      title: "Historical Data",
      description: "Track changes over time. See how your visibility evolves week over week.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
    },
  ]

  return (
    <section className="py-24 px-6 bg-white" id="features">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[var(--font-heading),Georgia,serif] text-[clamp(28px,4vw,40px)] font-semibold text-[#2D2A26] mb-4">
            Five layers of visibility
          </h2>
          <p className="text-lg text-[#6B6560] max-w-[600px] mx-auto">
            Everything you need to understand and improve your AI presence — all in one API.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="bg-[#FFFCF5] border border-[#F5E6D3] rounded-xl p-6 hover:border-[#FF6B35] hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center mb-4 text-[#FF6B35] group-hover:bg-[#FF6B35] group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#2D2A26] mb-2">{feature.title}</h3>
              <p className="text-[#6B6560] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Architecture() {
  const mermaidCode = `graph TD
  A[Add Your Brand] --> B[Weekly AI Scanning]
  B --> C{Query AI Platforms}
  C -->|ChatGPT| D[ChatGPT]
  C -->|Claude| E[Claude]
  C -->|Perplexity| F[Perplexity]
  C -->|Gemini| G[Gemini]
  D --> H[Process Results]
  E --> H
  F --> H
  G --> H
  H --> I[Generate Report]
  I --> J[Email Digest]
  I --> K[Dashboard Update]
  J --> L[Actionable Insights]
  K --> L
  style A fill:#FF6B35,color:#fff,stroke:#E85A2A
  style B fill:#FFF5E1,stroke:#F5E6D3
  style C fill:#FFFCF5,stroke:#F5E6D3
  style D fill:#166534,stroke:#22C55E,color:#fff
  style E fill:#166534,stroke:#22C55E,color:#fff
  style F fill:#166534,stroke:#22C55E,color:#fff
  style G fill:#166534,stroke:#22C55E,color:#fff
  style H fill:#FFF5E1,stroke:#F5E6D3
  style I fill:#FF6B35,color:#fff,stroke:#E85A2A
  style L fill:#2D2A26,stroke:#F5E6D3,color:#fff`

  return (
    <section className="py-24 px-6 bg-[#FFF9ED]">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[var(--font-heading),Georgia,serif] text-[clamp(28px,4vw,40px)] font-semibold text-[#2D2A26] mb-4">
            How It Works
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="bg-white border border-[#F5E6D3] rounded-2xl p-8 shadow-sm">
              <h3 className="font-[var(--font-heading),Georgia,serif] text-xl font-semibold text-[#2D2A26] mb-6">
                System Flow
              </h3>
              <Mermaid code={mermaidCode} id="visbow-arch-flow-light" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-[#F5E6D3] rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-[#2D2A26]">Query Processing</h4>
              </div>
              <p className="text-[#6B6560]">
                We query AI platforms with your brand name and track every mention, sentiment, and context.
              </p>
            </div>

            <div className="bg-white border border-[#F5E6D3] rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-[#2D2A26]">Analysis Engine</h4>
              </div>
              <p className="text-[#6B6560]">
                Our ML models analyze mentions, extract sentiment, and identify competitive positioning.
              </p>
            </div>

            <div className="bg-white border border-[#F5E6D3] rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-[#2D2A26]">Weekly Reports</h4>
              </div>
              <p className="text-[#6B6560]">
                Get detailed reports delivered to your inbox with actionable insights and recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Integrations() {
  const integrations = [
    "LangGraph", "CrewAI", "OpenAI SDK", "Mastra", "Zapier", "n8n", "Pipecat", "Vercel AI SDK"
  ]

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[900px] mx-auto text-center">
        <h2 className="font-[var(--font-heading),Georgia,serif] text-[clamp(28px,4vw,40px)] font-semibold text-[#2D2A26] mb-4">
          Works with your stack
        </h2>
        <p className="text-lg text-[#6B6560] mb-12">
          Seamlessly integrate with your existing AI development tools.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {integrations.map((item, i) => (
            <div 
              key={i} 
              className="bg-[#FFFCF5] border border-[#F5E6D3] rounded-lg px-6 py-3 text-[#6B6560] font-medium hover:border-[#FF6B35] hover:text-[#FF6B35] hover:shadow-md transition-all cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CodeExample() {
  return (
    <section className="py-24 px-6 bg-[#FFF9ED]">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-[var(--font-heading),Georgia,serif] text-[clamp(28px,4vw,40px)] font-semibold text-[#2D2A26] mb-4">
            Just Visbow
          </h2>
          <p className="text-lg text-[#6B6560]">
            One API call. All platforms. Always bleeding edge. Done.
          </p>
        </div>

        <div className="bg-[#2D2A26] border border-[#2D2A26] rounded-xl overflow-hidden shadow-xl">
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1917] border-b border-[#3D3A36]">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-sm text-zinc-500">visbow-example.ts</span>
          </div>
          <pre className="p-6 text-sm font-mono overflow-x-auto">
            <code className="text-zinc-300">
{`import { Visbow } from 'visbow'

const client = new Visbow({ apiKey: process.env.VISBOW_API_KEY })

// Track your brand across all AI platforms
const visibility = await client.visibility({
  brand: 'YourCompany',
  platforms: ['chatgpt', 'claude', 'perplexity', 'gemini']
})

console.log(visibility)
// {
//   chatgpt: { mentions: 42, sentiment: 'positive', rank: 3 },
//   claude: { mentions: 28, sentiment: 'neutral', rank: 5 },
//   perplexity: { mentions: 15, sentiment: 'positive', rank: 2 },
//   gemini: { mentions: 8, sentiment: 'negative', rank: 7 }
// }

// Get weekly report
const report = await client.reports.weekly()
console.log(report.insights)
// ["Your brand sentiment improved by 12% this week",
//  "Competitor X is gaining visibility in Claude",
//  "Consider optimizing your LinkedIn presence"]`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying us out",
      features: [
        "1 brand",
        "1,000 queries/month",
        "2 platforms",
        "7-day history",
        "Email support",
      ],
    },
    {
      name: "Pro",
      price: "$49",
      period: "/month",
      description: "For growing businesses",
      features: [
        "10 brands",
        "10,000 queries/month",
        "All 4 platforms",
        "Daily updates",
        "Competitor tracking",
        "API access",
        "Priority support",
      ],
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations",
      features: [
        "Unlimited brands",
        "Unlimited queries",
        "All platforms",
        "Real-time updates",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantee",
      ],
    },
  ]

  return (
    <section className="py-24 px-6 bg-[#FFFCF5]" id="pricing">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[var(--font-heading),Georgia,serif] text-[clamp(28px,4vw,40px)] font-semibold text-[#2D2A26] mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-[#6B6560]">
            Start free. Scale as you grow. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`bg-white border rounded-2xl p-8 text-center transition-all ${
                plan.featured 
                  ? 'border-[#FF6B35] shadow-lg relative' 
                  : 'border-[#F5E6D3] hover:border-[#E8D5C4] hover:shadow-md'
              }`}
            >
              {plan.featured && (
                <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 bg-[#FF6B35] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="text-sm font-medium text-[#9C9690] uppercase tracking-wide mb-2">{plan.name}</div>
              <div className="font-[var(--font-heading),Georgia,serif] text-[48px] font-semibold text-[#2D2A26]">
                {plan.price}
              </div>
              <div className="text-sm text-[#9C9690] mt-1">{plan.period}</div>
              <p className="text-sm text-[#6B6560] mt-4 mb-6">{plan.description}</p>
              
              <ul className="space-y-3 text-left mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-[#6B6560]">
                    <svg className="w-4 h-4 text-[#2ECC71] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                href="#" 
                className={`block w-full py-3 px-6 rounded-lg text-center font-semibold transition-all ${
                  plan.featured 
                    ? 'bg-[#FF6B35] text-white hover:bg-[#E85A2A] shadow-md hover:shadow-lg' 
                    : 'bg-[#FFF5E1] text-[#2D2A26] hover:bg-[#F5E6D3]'
                }`}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[700px] mx-auto text-center">
        <h2 className="font-[var(--font-heading),Georgia,serif] text-[clamp(28px,4vw,44px)] font-semibold text-[#2D2A26] mb-4">
          Ready to own your AI presence?
        </h2>
        <p className="text-lg text-[#6B6560] mb-8">
          Join thousands of marketers who already track their brand across every AI platform.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="#" className="text-base font-semibold bg-[#FF6B35] text-white rounded-lg py-3 px-8 no-underline hover:bg-[#E85A2A] transition-colors inline-flex items-center gap-2 shadow-md hover:shadow-lg">
            Start Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <Link href="#" className="text-base font-semibold bg-[#FFF5E1] text-[#2D2A26] border-2 border-[#F5E6D3] rounded-lg py-3 px-8 no-underline hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors">
            Talk to Sales
          </Link>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Product: ["Features", "Pricing", "Changelog", "Roadmap"],
    Developers: ["Documentation", "API Reference", "SDKs", "Status"],
    Company: ["About", "Blog", "Careers", "Contact"],
    Legal: ["Privacy", "Terms", "Security"],
  }

  return (
    <footer className="py-16 px-6 bg-[#FFF9ED] border-t border-[#F5E6D3]">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 no-underline mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-[#FF6B35] to-[#FF8F5E] rounded-lg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 8H19C20.1046 8 21 8.89543 21 10V11C21 12.1046 20.1046 13 19 13H17.5V14C17.5 15.6569 16.1569 17 14.5 17H5.5C3.84315 17 2.5 15.6569 2.5 14V5C2.5 3.34315 3.84315 2 5.5 2H14.5C16.1569 2 17.5 3.34315 17.5 5V6H17.5C17.5 6 17.5 6 17.5 6C17.5 6 21 6 21 10V11C21 11 21 11 21 11C21 11 17.5 11 17.5 11V8Z"/>
                  <path d="M6 14H14.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M6 17H10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-[var(--font-heading),Georgia,serif] text-lg font-semibold text-[#2D2A26]">Visbow</span>
            </Link>
            <p className="text-sm text-[#6B6560] mb-4">
              Track your brand across every AI platform.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-[#9C9690] hover:text-[#2D2A26] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </a>
              <a href="#" className="text-[#9C9690] hover:text-[#2D2A26] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-medium text-[#2D2A26] mb-4">{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-[#6B6560] hover:text-[#2D2A26] transition-colors no-underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-[#F5E6D3] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#9C9690]">
            2026 Visbow. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-[#9C9690]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#2ECC71] rounded-full"></span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF5] text-[#2D2A26]">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <ProblemSection />
        <QuickStart />
        <Features />
        <Architecture />
        <Integrations />
        <CodeExample />
        <Pricing />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
