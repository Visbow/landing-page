"use client"

import { useActionState, useState } from "react"
import dynamic from "next/dynamic"
import { joinWaitlist, type WaitlistResult } from "@/app/actions/waitlist"

const Lanyard = dynamic(() => import("@/components/Lanyard"), { ssr: false })
const MermaidChart = dynamic(
  () => import("@/components/mermaid").then((m) => ({ default: m.Mermaid })),
  { ssr: false }
)

// ─── Primitives ──────────────────────────────────────────────────────────────

function Logo({ size = 28, color = "#0A0A0A" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M 14 14 L 14 20 L 22 34 L 26 34 L 34 20 L 34 14 L 28 14 L 24 23 L 20 14 Z"
        fill={color}
      />
    </svg>
  )
}

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className="font-[var(--font-mono)] text-[11px] tracking-[0.16em] uppercase"
      style={{ color: light ? "#8AA4D8" : "#9B9B9B" }}
    >
      {children}
    </p>
  )
}

// ─── Waitlist Form ────────────────────────────────────────────────────────────

function WaitlistForm() {
  const [state, action, pending] = useActionState<WaitlistResult | null, FormData>(
    joinWaitlist,
    null
  )
  const isOk = state !== null && "ok" in state
  const errorMsg = state !== null && "error" in state ? state.error : null

  if (isOk) {
    return (
      <div className="flex items-center gap-3 text-[#3B82F6]">
        <span className="flex items-center justify-center w-7 h-7 bg-[#EFF6FF] rounded-full text-[15px] font-bold">
          ✓
        </span>
        <p className="text-[16px] font-semibold">
          You&apos;re on the list. We&apos;ll email you when Track ships.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <form action={action} className="flex flex-col sm:flex-row gap-2 w-full max-w-[520px]">
        <input
          name="email"
          type="email"
          placeholder="you@work.com"
          className="flex-1 h-12 px-4 text-[15px] bg-white border-2 border-[#EBEBEB] rounded-xl outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-all placeholder:text-[#C8C8C8]"
        />
        <button
          type="submit"
          disabled={pending}
          className="h-12 px-7 text-[15px] font-bold text-white bg-[#3B82F6] rounded-xl hover:bg-[#2563EB] disabled:opacity-60 transition-all hover:shadow-xl hover:shadow-[#3B82F6]/25 whitespace-nowrap cursor-pointer"
        >
          {pending ? "…" : "Join the waitlist →"}
        </button>
      </form>
      {errorMsg && <p className="text-[13px] text-red-500">{errorMsg}</p>}
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="px-6 pt-16 pb-10 max-w-[1200px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center gap-0">
        {/* Left: copy */}
        <div className="flex-1 min-w-0">
          <h1 className="text-[clamp(56px,8vw,104px)] font-extrabold tracking-[-0.04em] leading-[1.0] text-[#0A0A0A] mb-6">
            See where AI<br />sends buyers.
          </h1>

          <p className="text-[19px] leading-[1.7] text-[#555] max-w-[500px] mb-10">
            ChatGPT, Claude, Perplexity and Gemini are answering your buyers&apos; questions. Visbow
            shows you what they&apos;re saying and what&apos;s missing.
          </p>

          <WaitlistForm />

          <p className="mt-5 font-[var(--font-mono)] text-[11px] tracking-[0.08em] text-[#6B6B6B]">
            · launching this year · one email when we ship, nothing else
          </p>
        </div>

        {/* Right: lanyard */}
        <div className="hidden lg:block w-[480px] h-[600px] shrink-0">
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
        </div>
      </div>
    </section>
  )
}

// ─── Bento Grid ───────────────────────────────────────────────────────────────

const PLATFORMS = ["ChatGPT", "Claude", "Perplexity", "Gemini"]

const MODULES = [
  {
    num: "01",
    title: "Track",
    body: "Four AI surfaces. One view. Your brand vs. competitors, ranked by how often each surface puts you in front of a buyer.",
    bg: "bg-white",
  },
  {
    num: "02",
    title: "Diagnose",
    body: "Which queries you're invisible on. Which competitors own them. Which sources AI is citing instead of yours.",
    bg: "bg-[#F7F7F5]",
  },
  {
    num: "03",
    title: "Create",
    body: "Briefs that move AI's answers. Content shaped for how LLMs pick sources, not keyword-stuffed blog posts.",
    bg: "bg-white",
  },
]

function BentoGrid() {
  return (
    <section className="px-6 pb-4 max-w-[1200px] mx-auto">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[3px] bg-[#EBEBEB] rounded-2xl overflow-hidden"
        style={{ gridAutoRows: "minmax(200px, auto)" }}
      >
        {/* Card A: What we're building — 2×2, blue→violet gradient */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] p-8 sm:p-10 flex flex-col">
          <Label light>What we&apos;re building</Label>
          <h2 className="mt-5 text-[clamp(26px,2.8vw,38px)] font-extrabold tracking-[-0.03em] leading-[1.15] text-white flex-1">
            An instrument for AI brand visibility.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-[#C4ADEE]">
            AI surfaces are answering your buyers&apos; questions before they reach your site.
            Visbow tracks what ChatGPT, Claude, Perplexity and Gemini say about your brand
            and what&apos;s missing. One view. Refreshed weekly.
          </p>
          <div className="flex flex-wrap gap-2 mt-8">
            {PLATFORMS.map((p) => (
              <span
                key={p}
                className="font-[var(--font-mono)] text-[11px] text-[#C4ADEE] border border-[#6B4FBB] bg-[#5B3FAA]/30 rounded-full px-3 py-1"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Cards B/C/D: Modules */}
        {MODULES.map((m) => (
          <div key={m.num} className={`${m.bg} p-7 flex flex-col`}>
            <span className="font-[var(--font-mono)] text-[52px] font-bold leading-none text-[#DBEAFE] select-none">
              {m.num}
            </span>
            <h3 className="mt-4 text-[22px] font-extrabold tracking-[-0.02em] text-[#0A0A0A]">
              {m.title}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.65] text-[#666]">{m.body}</p>
          </div>
        ))}

        {/* Card G: Roadmap */}
        <div className="bg-white p-7 flex flex-col">
          <Label>Roadmap</Label>
          <div className="flex-1 flex flex-col justify-center gap-4 mt-5">
            <div className="flex items-center gap-3">
              <span className="font-[var(--font-mono)] text-[11px] text-[#3B82F6] bg-[#EFF6FF] rounded px-2 py-0.5 shrink-0">
                01
              </span>
              <span className="text-[17px] font-bold text-[#0A0A0A]">Track</span>
              <span className="ml-auto font-[var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#BEBEBE]">
                first
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-[var(--font-mono)] text-[11px] text-[#BEBEBE] bg-[#F7F7F5] rounded px-2 py-0.5 shrink-0">
                02
              </span>
              <span className="text-[17px] font-bold text-[#BEBEBE]">Diagnose</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-[var(--font-mono)] text-[11px] text-[#BEBEBE] bg-[#F7F7F5] rounded px-2 py-0.5 shrink-0">
                03
              </span>
              <span className="text-[17px] font-bold text-[#BEBEBE]">Create</span>
            </div>
          </div>
          <p className="mt-6 font-[var(--font-mono)] text-[11px] tracking-[0.1em] text-[#CBCBCB]">
            No dates we can&apos;t keep.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Context Bento ────────────────────────────────────────────────────────────

function ContextBento() {
  const [hovered, setHovered] = useState<number | null>(null)

  const card1 = (
    <>
      <span className="font-[var(--font-mono)] text-[12px] tracking-[0.16em] uppercase text-[#B45309]">
        Who it&apos;s for
      </span>
      <h3 className="mt-4 text-[26px] font-extrabold tracking-[-0.03em] leading-[1.2] text-[#111827]">
        B2B marketing teams at growing companies.
      </h3>
      <p className="mt-4 text-[15px] leading-[1.7] text-[#6B7280]">
        You run content at a 50 to 500 person company, small team, no dedicated AI-search tooling. Visbow is built for this.
      </p>
      <div className="flex flex-col gap-3 mt-6">
        {["50–500 person company", "Small content team", "No AI-search visibility yet"].map((t) => (
          <div key={t} className="flex items-center gap-2.5">
            <span className="w-4 h-4 rounded-full bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
            </span>
            <span className="text-[14px] font-medium text-[#374151]">{t}</span>
          </div>
        ))}
      </div>
    </>
  )

  const card2 = (
    <>
      <span className="font-[var(--font-mono)] text-[12px] tracking-[0.16em] uppercase text-[#5EEAD4]">
        Why now
      </span>
      <h3 className="mt-4 text-[26px] font-extrabold tracking-[-0.03em] leading-[1.2] text-white">
        Your buyers are already asking AI before they call you.
      </h3>
      <p className="mt-4 text-[15px] leading-[1.75] text-[#99F6E4]">
        A growing share of B2B buyers open ChatGPT or Perplexity before talking to a vendor. They ask which tools to consider, which brands to avoid.
      </p>
      <p className="mt-4 text-[15px] leading-[1.75] text-white font-medium">
        Most companies have no idea what those answers say. Visbow shows you.
      </p>
    </>
  )

  const card3 = (
    <>
      <span className="font-[var(--font-mono)] text-[12px] tracking-[0.16em] uppercase text-[#92400E]">
        A note from us
      </span>
      <h3 className="mt-4 text-[26px] font-extrabold tracking-[-0.03em] leading-[1.2] text-[#111827]">
        Bootstrapped. Small team.
      </h3>
      <p className="mt-4 text-[15px] leading-[1.75] text-[#6B7280]">
        No investors, no funding announcement. Just two people building something we wish existed. If you want to talk before we launch, just email us.
      </p>
      <a
        href="mailto:hello@visbow.com"
        className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-[#92400E] hover:text-[#78350F] no-underline transition-colors"
      >
        hello@visbow.com <span className="text-[#D97706]">→</span>
      </a>
    </>
  )

  const COLLAGE = [
    {
      id: 0,
      top: 38,
      left: "calc(50% - 540px)",
      rotate: "-8deg",
      zDefault: 10,
      bgClass: "bg-white border border-[#E5E7EB]",
      shadowOff: "0 6px 28px rgba(0,0,0,0.10)",
      shadowOn: "0 24px 64px rgba(0,0,0,0.24)",
      content: card1,
    },
    {
      id: 1,
      top: 10,
      left: "calc(50% - 210px)",
      rotate: "0deg",
      zDefault: 20,
      bgClass: "bg-[#0D9488]",
      shadowOff: "0 6px 28px rgba(13,148,136,0.26)",
      shadowOn: "0 24px 64px rgba(13,148,136,0.46)",
      content: card2,
    },
    {
      id: 2,
      top: 40,
      left: "calc(50% + 120px)",
      rotate: "7deg",
      zDefault: 30,
      bgClass: "bg-[#FFFBEB] border border-[#FDE68A]",
      shadowOff: "0 6px 28px rgba(0,0,0,0.08)",
      shadowOn: "0 24px 64px rgba(0,0,0,0.22)",
      content: card3,
    },
  ]

  return (
    <section className="px-6 pb-20 max-w-[1200px] mx-auto">
      <div className="mb-10">
        <Label>Context</Label>
        <h2 className="mt-3 text-[clamp(30px,4vw,48px)] font-extrabold tracking-[-0.03em] text-[#111827]">
          A little context.
        </h2>
      </div>

      {/* Desktop: photo collage — spread across full width, arch heights, casual rotations */}
      <div className="hidden lg:block relative" style={{ height: 540 }}>
        {COLLAGE.map((c) => {
          const isHov = hovered === c.id
          const anyHov = hovered !== null
          return (
            <div
              key={c.id}
              className={`absolute w-[420px] h-[420px] rounded-2xl p-9 flex flex-col ${c.bgClass}`}
              style={{
                top: c.top,
                left: c.left,
                transformOrigin: "50% 85%",
                zIndex: isHov ? 40 : c.zDefault,
                transform: `rotate(${isHov ? "0deg" : c.rotate}) scale(${isHov ? 1.05 : 1})`,
                boxShadow: isHov ? c.shadowOn : c.shadowOff,
                opacity: anyHov && !isHov ? 0.65 : 1,
                transition:
                  "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease, opacity 0.2s ease",
                cursor: "default",
              }}
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {c.content}
            </div>
          )
        })}
      </div>

      {/* Mobile: stacked, slight tilt */}
      <div className="flex flex-col gap-6 lg:hidden">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-7 flex flex-col" style={{ transform: "rotate(-0.5deg)" }}>
          {card1}
        </div>
        <div className="bg-[#0D9488] rounded-2xl p-7 flex flex-col" style={{ transform: "rotate(0.5deg)" }}>
          {card2}
        </div>
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-7 flex flex-col" style={{ transform: "rotate(-0.5deg)" }}>
          {card3}
        </div>
      </div>
    </section>
  )
}

// ─── Features Section ─────────────────────────────────────────────────────────

const FEATURES_LIST = [
  {
    num: "01",
    title: "Multi-Platform Tracking",
    body: "Your brand vs. competitors across ChatGPT, Claude, Perplexity and Gemini. Four surfaces, one view, refreshed every week.",
    color: "#3B82F6",
  },
  {
    num: "02",
    title: "Competitor Intelligence",
    body: "See which competitors own the queries you're invisible on, and which AI surfaces they dominate. Know before your buyers do.",
    color: "#7C3AED",
  },
  {
    num: "03",
    title: "Weekly Digest",
    body: "A concise report in your inbox every week. What changed, what moved, what needs your attention next.",
    color: "#0D9488",
  },
  {
    num: "04",
    title: "Sentiment Scoring",
    body: "Every mention scored: positive, neutral, or negative. Across every surface, updated weekly.",
    color: "#4F46E5",
  },
  {
    num: "05",
    title: "Historical Trends",
    body: "Track how your visibility evolves week over week. Spot a declining trend before it becomes a problem.",
    color: "#059669",
  },
]

function FeaturesSection() {
  return (
    <section className="px-6 pb-12 max-w-[1200px] mx-auto">
      <div className="mb-8">
        <Label>What you get</Label>
        <h2 className="mt-3 text-[clamp(30px,4vw,48px)] font-extrabold tracking-[-0.03em] text-[#0A0A0A]">
          Five layers of visibility
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {FEATURES_LIST.map((item) => (
          <div key={item.num} className="rounded-xl border border-[#EBEBEB] bg-white p-6 flex flex-col gap-3">
            <span className="font-[var(--font-mono)] text-[13px] font-bold" style={{ color: item.color }}>
              {item.num}
            </span>
            <h3 className="text-[16px] font-bold tracking-[-0.01em] text-[#0A0A0A] leading-snug">
              {item.title}
            </h3>
            <p className="text-[13px] leading-[1.7] text-[#666]">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Architecture Section ─────────────────────────────────────────────────────

const ARCH_CARDS = [
  {
    title: "Query processing",
    body: "We query each AI surface with your brand name and log every mention, context, and ranking position.",
  },
  {
    title: "Analysis engine",
    body: "Mentions are scored for sentiment, competitor positioning, and which sources each AI is citing.",
  },
  {
    title: "Weekly reports",
    body: "A digest lands in your inbox each week with what changed and the most actionable next steps.",
  },
]

const ARCH_DIAGRAM = `flowchart TD
    A([Your brand + competitors]):::anchor --> B[Weekly automated scan]:::process
    B --> C[ChatGPT]:::ai
    B --> D[Claude]:::ai
    B --> E[Perplexity]:::ai
    B --> F[Gemini]:::ai
    C & D & E & F --> G[Responses collected]:::process
    G --> H[Analysis engine]:::process
    H --> I[Sentiment scoring]:::output
    H --> J[Competitor gap detection]:::output
    H --> K[Source attribution]:::output
    I & J & K --> L([Weekly digest → your inbox]):::anchor
    classDef anchor  fill:#0D9488,stroke:#0D9488,color:#fff,font-weight:600
    classDef process fill:#F1F5F9,stroke:#94A3B8,stroke-width:1.5,color:#334155,font-weight:500
    classDef ai      fill:#DCFCE7,stroke:#16A34A,stroke-width:2,color:#14532D,font-weight:600
    classDef output  fill:#F5F3FF,stroke:#8B5CF6,stroke-width:1.5,color:#4C1D95,font-weight:500`

function ArchitectureSection() {
  return (
    <section className="px-6 pb-12 max-w-[1200px] mx-auto">
      <div className="mb-8">
        <Label>Under the hood</Label>
        <h2 className="mt-3 text-[clamp(30px,4vw,48px)] font-extrabold tracking-[-0.03em] text-[#0A0A0A]">
          How it works
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-[3px] bg-[#EBEBEB] rounded-2xl overflow-hidden">
        <div className="bg-white p-8 flex flex-col">
          <Label>System flow</Label>
          <div className="mt-6 flex-1">
            <MermaidChart code={ARCH_DIAGRAM} id="arch-flow" />
          </div>
        </div>

        <div className="flex flex-col gap-[3px]">
          {ARCH_CARDS.map((c, i) => (
            <div key={c.title} className="flex-1 bg-[#F7F7F5] px-7 py-6 flex flex-row items-start gap-5">
              <span className="font-[var(--font-mono)] text-[28px] font-bold leading-none text-[#0D9488] select-none shrink-0 pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[17px] font-extrabold tracking-[-0.02em] text-[#0A0A0A]">{c.title}</h3>
                <p className="mt-1.5 text-[13px] leading-[1.65] text-[#666]">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="px-6 py-20 max-w-[1200px] mx-auto">
      <div
        className="rounded-2xl px-8 py-14 flex flex-col items-center text-center gap-6"
        style={{ background: "linear-gradient(160deg, #EBF0FA 0%, #E4ECF5 100%)" }}
      >
        <p className="font-[var(--font-mono)] text-[11px] tracking-[0.12em] uppercase text-[#6B6B6B]">
          Pre-launch · Join the waitlist
        </p>
        <h2 className="text-[clamp(26px,3.5vw,42px)] font-extrabold tracking-[-0.03em] text-[#0A0A0A] max-w-[560px] leading-tight">
          Be first to know when Visbow ships.
        </h2>
        <p className="text-[15px] text-[#6B6B6B] max-w-[440px] leading-relaxed">
          One email when we launch. No drip campaigns, no noise.
        </p>
        <WaitlistForm />
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="px-6 pb-10 max-w-[1200px] mx-auto">
      <div className="border-t border-[#EBEBEB] pt-7 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={20} />
          <span className="text-[15px] font-bold text-[#0A0A0A]">visbow</span>
          <span className="text-[#DDDDD] mx-0.5">·</span>
          <a
            href="mailto:hello@visbow.com"
            className="text-[14px] text-[#888] hover:text-[#0A0A0A] transition-colors no-underline"
          >
            hello@visbow.com
          </a>
        </div>
        <p className="text-[13px] text-[#C0C0C0] font-[var(--font-mono)]">© 2026</p>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      <main>
        <Hero />
        <BentoGrid />
        <ContextBento />
        <FeaturesSection />
        <ArchitectureSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
