"use client"

import Link from "next/link"

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ")
}

const COMPANY_LOGOS = {
  chatgpt: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729z" fill="#10A37F"/>
    </svg>
  ),
  perplexity: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="#6366F1"/>
      <path d="M12 7l-5 2.5v5L12 17l5-2.5v-5L12 7z" fill="white"/>
      <circle cx="12" cy="12" r="2" fill="#6366F1"/>
    </svg>
  ),
  claude: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <rect width="24" height="24" rx="6" fill="#D26152"/>
      <path d="M8 8h8v8H8V8z" fill="white" fillOpacity="0.8"/>
      <circle cx="12" cy="12" r="2" fill="white"/>
    </svg>
  ),
  gemini: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#4285F4"/>
      <path d="M8.5 12l3.5 3 3.5-3-3.5-3-3.5 3z" fill="white"/>
      <path d="M12 8v8M8.5 12h7" stroke="white" strokeWidth="1.5"/>
    </svg>
  ),
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/95 backdrop-blur-sm border-b border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="coffee-cup">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M17 8H19C20.1046 8 21 8.89543 21 10V11C21 12.1046 20.1046 13 19 13H17.5V14C17.5 15.6569 16.1569 17 14.5 17H5.5C3.84315 17 2.5 15.6569 2.5 14V5C2.5 3.34315 3.84315 2 5.5 2H14.5C16.1569 2 17.5 3.34315 17.5 5V6H17.5C17.5 6 17.5 6 17.5 6C17.5 6 21 6 21 10V11C21 11 21 11 21 11C21 11 17.5 11 17.5 11V8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 14H14.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6 17H10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-heading text-[22px] font-medium text-[var(--text-primary)]">Visbow</span>
        </Link>
        
        <div className="flex items-center gap-8">
          <Link href="#features" className="nav-link hidden sm:block">Features</Link>
          <Link href="#how-it-works" className="nav-link hidden sm:block">How it Works</Link>
          <Link href="#pricing" className="nav-link hidden sm:block">Pricing</Link>
          <Link href="#" className="btn-ghost hidden sm:block">Log in</Link>
          <Link href="#" className="btn-primary">
            Start my page
          </Link>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  const platforms = [
    { name: "ChatGPT", logo: COMPANY_LOGOS.chatgpt, color: "#10A37F" },
    { name: "Perplexity", logo: COMPANY_LOGOS.perplexity, color: "#6366F1" },
    { name: "Claude", logo: COMPANY_LOGOS.claude, color: "#D26152" },
    { name: "Gemini", logo: COMPANY_LOGOS.gemini, color: "#4285F4" },
  ]

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[var(--accent-dim)] rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
          <span className="text-sm font-medium text-[var(--accent)]">Now tracking 4 AI platforms</span>
        </div>

        <h1 className="font-heading text-[clamp(44px,6vw,68px)] font-medium leading-[1.1] text-[var(--text-primary)] mb-6 max-w-[800px] mx-auto">
          See how AI sees<br />
          <span className="text-[var(--accent)]">your brand</span>
        </h1>

        <p className="text-[20px] text-[var(--text-secondary)] max-w-[560px] mx-auto mb-10 leading-relaxed">
          Visbow tracks your brand across ChatGPT, Claude, Perplexity, and Gemini. 
          Know exactly where you appear, where you're missing, and what to do about it.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link href="#" className="btn-primary text-base px-8 py-4">
            Start my page
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <Link href="#how-it-works" className="btn-secondary">
            See how it works
          </Link>
        </div>

        <p className="text-[15px] text-[var(--text-dim)]">
          Free forever plan - No credit card required
        </p>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-6">
          {platforms.map((platform) => (
            <div key={platform.name} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--border)]">
              <div className="w-5 h-5">{platform.logo}</div>
              <span className="text-sm font-medium text-[var(--text-primary)]">{platform.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const stats = [
    { value: "2M+", label: "queries tracked weekly" },
    { value: "50K+", label: "brands monitored" },
    { value: "99.9%", label: "uptime guaranteed" },
  ]

  return (
    <section className="py-16 px-6 bg-[var(--bg-raised)] border-y border-[var(--border)]">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex flex-wrap justify-center gap-12 md:gap-20">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="stat-number">{stat.value}</div>
              <div className="text-[15px] text-[var(--text-secondary)] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureSection() {
  const features = [
    {
      logo: COMPANY_LOGOS.chatgpt,
      title: "Track Every Mention",
      description: "See which AI platforms mention your brand and where you rank. Get notified the moment something changes.",
    },
    {
      logo: COMPANY_LOGOS.perplexity,
      title: "Competitor Insights",
      description: "Compare your visibility against competitors. Know who's winning the AI conversation and why.",
    },
    {
      logo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Weekly Digests",
      description: "Get actionable insights delivered to your inbox every week. No login required to stay informed.",
    },
    {
      logo: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: "Actionable Tips",
      description: "Don't just see the data - understand what to do about it. We tell you exactly how to improve.",
    },
  ]

  return (
    <section className="py-24 px-6" id="features">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-16">
          <div className="section-label">FEATURES</div>
          <h2 className="section-h2 mt-3">
            Everything you need to own<br />your <span className="text-[var(--accent)]">AI presence</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="feature-card"
              style={{ transition: 'transform 0.3s ease, background-color 0.3s ease' }}
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-raised)] flex items-center justify-center mb-4 text-[var(--accent)]">
                {feature.logo}
              </div>
              <h3 className="font-heading text-[20px] font-medium text-[var(--text-primary)] mb-2">{feature.title}</h3>
              <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Add your brand",
      description: "Enter your company name and the keywords that matter to your business.",
    },
    {
      number: "2",
      title: "We do the tracking",
      description: "Our AI monitors ChatGPT, Claude, Perplexity, and Gemini every single week.",
    },
    {
      number: "3",
      title: "Get insights",
      description: "See where you appear, where you're missing, and exactly what to fix.",
    },
  ]

  return (
    <section className="py-24 px-6 bg-[var(--bg-surface)]" id="how-it-works">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-16">
          <div className="section-label">HOW IT WORKS</div>
          <h2 className="section-h2 mt-3">
            Simpler than you think
          </h2>
          <p className="text-[18px] text-[var(--text-secondary)] mt-4 max-w-[500px] mx-auto">
            From sign-up to your first insight in less than 2 minutes. No setup, no configuration.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className="how-step"
            >
              <div className="step-number mb-6">
                {step.number}
              </div>
              <h3 className="font-heading text-[20px] font-medium text-[var(--text-primary)] mb-2">{step.title}</h3>
              <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed px-4">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="#" className="btn-primary">
            Get Started Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
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
      features: ["1 brand", "5 queries", "2 platforms", "7-day history", "Email support"],
      featured: false,
    },
    {
      name: "Starter",
      price: "$19",
      period: "/month",
      description: "For small teams",
      features: ["3 brands", "25 queries", "All 4 platforms", "Weekly reports", "Competitor tracking", "Priority support"],
      featured: true,
    },
    {
      name: "Pro",
      price: "$49",
      period: "/month",
      description: "For growing businesses",
      features: ["10 brands", "100 queries", "All 4 platforms", "Daily updates", "API access", "Custom alerts", "Dedicated support"],
      featured: false,
    },
  ]

  return (
    <section className="py-24 px-6" id="pricing">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-16">
          <div className="section-label">PRICING</div>
          <h2 className="section-h2 mt-3">
            Start free. Scale as you grow.
          </h2>
          <p className="text-[18px] text-[var(--text-secondary)] mt-4 max-w-[500px] mx-auto">
            All plans include our core tracking features. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={cn("pricing-card", plan.featured && "featured")}>
              <div className="text-sm font-medium text-[var(--text-dim)] uppercase tracking-wide mb-2">{plan.name}</div>
              <div className="price-amount">
                {plan.price === "$0" ? (
                  <span>{plan.price}</span>
                ) : (
                  <>
                    <sup>$</sup>{plan.price.replace("$","")}
                  </>
                )}
              </div>
              <div className="text-sm text-[var(--text-dim)] mt-1">{plan.period}</div>
              <p className="text-[14px] text-[var(--text-secondary)] mt-4 mb-6">{plan.description}</p>
              
              <ul className="space-y-3 text-left mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-[15px] text-[var(--text-secondary)]">
                    <svg className="w-4 h-4 text-[var(--green)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="#" className={cn("btn-primary w-full", plan.featured ? "" : "bg-[var(--bg-raised)] text-[var(--text-primary)] hover:bg-[var(--border)]")}>
                {plan.price === "$0" ? "Get Started" : "Start Trial"}
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
    <section className="py-24 px-6 bg-[var(--accent)] text-white">
      <div className="max-w-[700px] mx-auto text-center">
        <h2 className="font-heading text-[clamp(36px,5vw,52px)] font-medium mb-4">
          Ready to own your AI presence?
        </h2>
        <p className="text-[19px] opacity-90 mb-8 max-w-[500px] mx-auto">
          Join thousands of marketers who already track their brand across every AI platform.
        </p>
        <Link href="#" className="inline-flex items-center gap-2 bg-white text-[var(--accent)] font-semibold px-8 py-4 rounded-[12px] text-base hover:bg-opacity-90 transition-all">
          Start my page
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
        <p className="text-[15px] opacity-70 mt-4">It is free to get started</p>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    Product: ["Features", "Pricing", "Integrations", "Changelog"],
    Company: ["About", "Blog", "Careers", "Press"],
    Resources: ["Help Center", "API Docs", "Community", "Status"],
    Legal: ["Privacy", "Terms", "Security"],
  }

  return (
    <footer className="py-16 px-6 border-t border-[var(--border)]">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 no-underline mb-4">
              <div className="coffee-cup w-8 h-8">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M17 8H19C20.1046 8 21 8.89543 21 10V11C21 12.1046 20.1046 13 19 13H17.5V14C17.5 15.6569 16.1569 17 14.5 17H5.5C3.84315 17 2.5 15.6569 2.5 14V5C2.5 3.34315 3.84315 2 5.5 2H14.5C16.1569 2 17.5 3.34315 17.5 5V6H17.5C17.5 6 17.5 6 17.5 6C17.5 6 21 6 21 10V11C21 11 21 11 21 11C21 11 17.5 11 17.5 11V8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 14H14.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M6 17H10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-heading text-lg font-medium text-[var(--text-primary)]">Visbow</span>
            </Link>
            <p className="text-[15px] text-[var(--text-secondary)] mb-4">
              Track your brand across every AI platform.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-[var(--text-dim)] hover:text-[var(--text-primary)] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="text-[var(--text-dim)] hover:text-[var(--text-primary)] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-medium text-[var(--text-primary)] mb-4">{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[14px] text-[var(--text-dim)]">
            2026 Visbow. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[14px] text-[var(--text-dim)]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[var(--green)] rounded-full"></span>
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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <FeatureSection />
        <HowItWorks />
        <Pricing />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}