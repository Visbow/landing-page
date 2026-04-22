"use client"

import { useActionState } from "react"
import Link from "next/link"
import { joinWaitlist, type WaitlistResult } from "@/app/actions/waitlist"

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

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#EBEBEB]">
      <div className="max-w-[1200px] mx-auto px-6 h-[60px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Logo size={40} color="#3B82F6" />
          <span className="text-[20px] font-bold tracking-tight text-[#0A0A0A]">visbow</span>
        </Link>
        <div className="flex items-center gap-2 bg-[#F0F5FF] rounded-full px-4 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
          <span className="font-[var(--font-mono)] text-[11px] tracking-[0.12em] uppercase text-[#3B82F6]">
            coming soon
          </span>
        </div>
      </div>
    </nav>
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
      <div className="inline-flex items-center gap-2 bg-[#EFF6FF] rounded-full px-4 py-1.5 mb-7">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
        <span className="font-[var(--font-mono)] text-[11px] tracking-[0.14em] uppercase text-[#3B82F6]">
          Pre-launch · Join the waitlist
        </span>
      </div>

      <h1 className="text-[clamp(56px,8vw,104px)] font-extrabold tracking-[-0.04em] leading-[1.0] text-[#0A0A0A] mb-6 max-w-[820px]">
        See where AI<br />sends buyers.
      </h1>

      <p className="text-[19px] leading-[1.7] text-[#555] max-w-[500px] mb-10">
        ChatGPT, Claude, Perplexity and Gemini are answering your buyers&apos; questions. Visbow
        shows you what they&apos;re saying — and what&apos;s missing.
      </p>

      <WaitlistForm />

      <p className="mt-5 font-[var(--font-mono)] text-[11px] tracking-[0.08em] text-[#BEBEBE]">
        · launching this year · one email when we ship, nothing else
      </p>
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
    body: "Briefs that move AI's answers. Content shaped for how LLMs pick sources — not keyword-stuffed blog posts.",
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
            Visbow tracks what ChatGPT, Claude, Perplexity and Gemini say about your brand —
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
  const card1 = (
    <>
      <span className="font-[var(--font-mono)] text-[10px] tracking-[0.16em] uppercase text-[#B45309]">
        Who it&apos;s for
      </span>
      <h3 className="mt-3 text-[22px] font-extrabold tracking-[-0.03em] leading-[1.2] text-[#111827]">
        B2B marketing teams at growing companies.
      </h3>
      <p className="mt-3 text-[13px] leading-[1.7] text-[#6B7280]">
        You run content at a 50 to 500 person company, small team, no dedicated AI-search tooling. Visbow is built for this.
      </p>
      <div className="flex flex-col gap-2 mt-5">
        {["50–500 person company", "Small content team", "No AI-search visibility yet"].map((t) => (
          <div key={t} className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
            </span>
            <span className="text-[12.5px] font-medium text-[#374151]">{t}</span>
          </div>
        ))}
      </div>
    </>
  )

  const card2 = (
    <>
      <span className="font-[var(--font-mono)] text-[10px] tracking-[0.16em] uppercase text-[#5EEAD4]">
        Why now
      </span>
      <h3 className="mt-3 text-[22px] font-extrabold tracking-[-0.03em] leading-[1.2] text-white">
        Your buyers are already asking AI before they call you.
      </h3>
      <p className="mt-3 text-[13px] leading-[1.75] text-[#99F6E4]">
        A growing share of B2B buyers open ChatGPT or Perplexity before talking to a vendor. They ask which tools to consider, which brands to avoid.
      </p>
      <p className="mt-3 text-[13px] leading-[1.75] text-white font-medium">
        Most companies have no idea what those answers say. Visbow shows you.
      </p>
    </>
  )

  const card3 = (
    <>
      <span className="font-[var(--font-mono)] text-[10px] tracking-[0.16em] uppercase text-[#92400E]">
        A note from us
      </span>
      <h3 className="mt-3 text-[22px] font-extrabold tracking-[-0.03em] leading-[1.2] text-[#111827]">
        Bootstrapped. Small team.
      </h3>
      <p className="mt-3 text-[13px] leading-[1.75] text-[#6B7280]">
        No investors, no funding announcement. Just two people building something we wish existed. If you want to talk before we launch, just email us.
      </p>
      <a
        href="mailto:hello@visbow.com"
        className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#92400E] hover:text-[#78350F] no-underline transition-colors"
      >
        hello@visbow.com <span className="text-[#D97706]">→</span>
      </a>
    </>
  )

  return (
    <section className="px-6 pb-20 max-w-[1200px] mx-auto">
      <div className="mb-10">
        <Label>Context</Label>
        <h2 className="mt-3 text-[clamp(30px,4vw,48px)] font-extrabold tracking-[-0.03em] text-[#111827]">
          A little context.
        </h2>
      </div>

      {/* Desktop: staggered collage — cards overlap only in the padding zone */}
      <div className="hidden lg:flex lg:flex-col">
        {/* Card 1 — white, left-aligned, tilted left */}
        <div
          className="bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_6px_28px_rgba(0,0,0,0.09)] p-10 pb-24 flex flex-col"
          style={{ width: 600, alignSelf: "flex-start", transform: "rotate(-1.5deg)", position: "relative", zIndex: 10 }}
        >
          {card1}
        </div>
        {/* Card 2 — teal, centered, tilted right, overlaps card 1 bottom padding */}
        <div
          className="bg-[#0D9488] rounded-2xl shadow-[0_10px_40px_rgba(13,148,136,0.26)] p-10 pb-24 flex flex-col"
          style={{ width: 640, alignSelf: "center", transform: "rotate(1deg)", position: "relative", zIndex: 20, marginTop: "-64px" }}
        >
          {card2}
        </div>
        {/* Card 3 — amber, right-aligned, tilted left, overlaps card 2 bottom padding */}
        <div
          className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl shadow-[0_6px_28px_rgba(0,0,0,0.08)] p-10 pb-20 flex flex-col"
          style={{ width: 580, alignSelf: "flex-end", transform: "rotate(-0.8deg)", position: "relative", zIndex: 30, marginTop: "-56px" }}
        >
          {card3}
        </div>
      </div>

      {/* Mobile: stacked, slight tilt for visual warmth */}
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

const FEATURES = [
  {
    title: "Multi-Platform Tracking",
    description: "Track your brand across ChatGPT, Claude, Perplexity, and Gemini in a single view.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    title: "Competitor Intelligence",
    description: "See how your competitors rank on each surface. Know who's outranking you and on which queries.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Weekly Reports",
    description: "Actionable insights in your inbox every week. Know exactly what changed and what to do.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Sentiment Analysis",
    description: "Understand the tone — positive, neutral, or negative — for every mention across every surface.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Historical Data",
    description: "Track how your visibility evolves week over week. Spot trends before they become problems.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[3px] bg-[#EBEBEB] rounded-2xl overflow-hidden">

        {/* Card 1 — featured, spans 2 cols */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 bg-white p-8 flex flex-col gap-5 group hover:bg-[#F8FBFF] transition-colors cursor-default">
          <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:text-white transition-colors">
            {FEATURES[0].icon}
          </div>
          <div>
            <h3 className="text-[22px] font-extrabold tracking-[-0.02em] text-[#0A0A0A]">{FEATURES[0].title}</h3>
            <p className="mt-2 text-[15px] leading-[1.7] text-[#555] max-w-[480px]">{FEATURES[0].description}</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-auto">
            {PLATFORMS.map((p) => (
              <span key={p} className="font-[var(--font-mono)] text-[11px] text-[#3B82F6] border border-[#DBEAFE] bg-[#EFF6FF] rounded-full px-3 py-0.5">{p}</span>
            ))}
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#F7F7F5] p-7 flex flex-col gap-4 group hover:bg-[#F8FBFF] transition-colors cursor-default">
          <div className="w-12 h-12 rounded-xl bg-white border border-[#EBEBEB] flex items-center justify-center text-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:text-white transition-colors">
            {FEATURES[1].icon}
          </div>
          <div>
            <h3 className="text-[17px] font-bold tracking-[-0.01em] text-[#0A0A0A]">{FEATURES[1].title}</h3>
            <p className="mt-1.5 text-[13.5px] leading-[1.65] text-[#666]">{FEATURES[1].description}</p>
          </div>
        </div>

        {/* Cards 3–5 — equal, fill row 2 */}
        {FEATURES.slice(2).map((f, i) => (
          <div key={f.title} className={`${i === 1 ? "bg-[#F7F7F5]" : "bg-white"} p-7 flex flex-col gap-4 group hover:bg-[#F8FBFF] transition-colors cursor-default`}>
            <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:text-white transition-colors">
              {f.icon}
            </div>
            <div>
              <h3 className="text-[17px] font-bold tracking-[-0.01em] text-[#0A0A0A]">{f.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-[1.65] text-[#666]">{f.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Architecture Section ─────────────────────────────────────────────────────

const ARCH_STEPS = [
  {
    label: "Input",
    title: "Brand setup",
    desc: "Add your brand name, key competitors, and topics you want tracked.",
    tags: null,
    done: false,
  },
  {
    label: "Scan",
    title: "Weekly AI queries",
    desc: "Automated queries run on each surface every 7 days.",
    tags: ["ChatGPT", "Claude", "Perplexity", "Gemini"],
    done: false,
  },
  {
    label: "Collect",
    title: "Every response logged",
    desc: "Each mention, ranking position, and cited source is stored.",
    tags: null,
    done: false,
  },
  {
    label: "Analyse",
    title: "Pattern detection",
    desc: "Sentiment scored, competitor gaps surfaced, source attribution tracked.",
    tags: null,
    done: false,
  },
  {
    label: "Output",
    title: "Weekly digest",
    desc: "Email report and dashboard update, every week.",
    tags: null,
    done: true,
  },
]

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

function ArchFlow() {
  return (
    <div className="relative py-1">
      <div
        className="absolute top-[18px] bottom-[18px] w-px"
        style={{
          left: 15,
          background: "linear-gradient(to bottom, #DBEAFE 0%, #3B82F6 100%)",
        }}
      />
      <div className="flex flex-col gap-6">
        {ARCH_STEPS.map((s) => (
          <div key={s.title} className="flex items-start gap-4">
            <div
              className={`w-[30px] h-[30px] rounded-full shrink-0 z-10 flex items-center justify-center border-2 ${
                s.done ? "bg-[#3B82F6] border-[#3B82F6]" : "bg-white border-[#DBEAFE]"
              }`}
            >
              {s.done ? (
                <div className="w-2 h-2 rounded-full bg-white" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-[#BFDBFE]" />
              )}
            </div>
            <div className="flex-1 pt-0.5">
              <div className="flex items-center gap-2">
                <span
                  className={`font-[var(--font-mono)] text-[9px] uppercase tracking-[0.14em] ${
                    s.done ? "text-[#3B82F6]" : "text-[#C0C0C0]"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              <h4
                className={`mt-0.5 text-[14px] font-bold tracking-[-0.01em] ${
                  s.done ? "text-[#2563EB]" : "text-[#111827]"
                }`}
              >
                {s.title}
              </h4>
              <p className="mt-0.5 text-[12px] leading-[1.6] text-[#9CA3AF]">{s.desc}</p>
              {s.tags && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="font-[var(--font-mono)] text-[10px] bg-[#111827] text-white rounded-md px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

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
        {/* Left: custom flow diagram */}
        <div className="bg-white p-8 flex flex-col">
          <Label>System flow</Label>
          <div className="mt-6 flex-1">
            <ArchFlow />
          </div>
        </div>

        {/* Right: 3 step detail cards */}
        <div className="flex flex-col gap-[3px]">
          {ARCH_CARDS.map((c, i) => (
            <div key={c.title} className="flex-1 bg-[#F7F7F5] px-7 py-6 flex flex-row items-start gap-5">
              <span className="font-[var(--font-mono)] text-[28px] font-bold leading-none text-[#DBEAFE] select-none shrink-0 pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[17px] font-extrabold tracking-[-0.02em] text-[#0A0A0A]">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-[1.65] text-[#666]">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
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
      <Nav />
      <main>
        <Hero />
        <BentoGrid />
        <ContextBento />
        <FeaturesSection />
        <ArchitectureSection />
      </main>
      <Footer />
    </div>
  )
}
