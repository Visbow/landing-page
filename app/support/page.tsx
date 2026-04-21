"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      question: "How does Visbow track my brand in AI platforms?",
      answer: "We use proprietary APIs and scraping techniques to query AI platforms with your brand name and analyze the responses. We run these queries automatically on a weekly (or daily for paid plans) basis and track changes over time."
    },
    {
      question: "Which AI platforms does Visbow support?",
      answer: "Currently, we support ChatGPT, Claude (Anthropic), Perplexity, and Gemini (Google). Google AI Overviews tracking is coming in Phase 2."
    },
    {
      question: "What queries should I track?",
      answer: "Focus on problem-aware, category-level queries that your potential customers might search. For example: 'best project management software for small teams' rather than just 'project management software'. Avoid brand names and extremely generic terms."
    },
    {
      question: "How accurate is the sentiment analysis?",
      answer: "Our sentiment analysis is AI-powered and designed to capture the general tone of mentions. It's not perfect, but it gives you a good directional signal. For important decisions, we recommend manually reviewing the actual mentions."
    },
    {
      question: "Can I export my data?",
      answer: "Yes! All plans include data export capabilities. You can export to CSV or PDF format. Higher-tier plans include more historical data retention."
    },
    {
      question: "How does competitor tracking work?",
      answer: "Add your competitors in the onboarding process or from Settings. We'll track their brand mentions alongside yours, allowing you to compare visibility scores and spot trends."
    },
    {
      question: "What happens when I exceed my plan limits?",
      answer: "We'll notify you when you're approaching your limits. If you exceed them, the system will continue tracking but may pause new queries until the next billing cycle or you upgrade."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use industry-standard encryption (TLS 1.3 in transit, AES-256 at rest), and we never share your data with third parties. Our AI providers are configured for zero data retention where available."
    },
  ]

  const categories = [
    {
      name: "Getting Started",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      articles: ["Quick start guide", "Adding your first brand", "Understanding your dashboard"],
    },
    {
      name: "Billing & Pricing",
      icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
      articles: ["Changing plans", "Payment methods", "Upgrading/downgrading"],
    },
    {
      name: "Features",
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
      articles: ["Visibility tracking", "Competitor analysis", "Sentiment analysis"],
    },
    {
      name: "Troubleshooting",
      icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      articles: ["Why isn't my brand showing?", "Data not updating", "Contacting support"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <span className="font-heading text-xl font-semibold">Visbow</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">Dashboard</Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
              <Link href="/login">
                <Button size="sm">Sign in</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="py-20 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="font-heading text-4xl font-bold">How can we help?</h1>
            <p className="mt-4 text-muted-foreground">Search our knowledge base or browse categories below</p>
            <div className="mt-8">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <Input
                  placeholder="Search for answers..."
                  className="h-14 pl-12 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {categories.map((category, i) => (
                <Card key={i} className="group cursor-pointer transition-all hover:ring-2 hover:ring-primary/50">
                  <CardHeader>
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={category.icon} />
                      </svg>
                    </div>
                    <CardTitle>{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.articles.map((article, j) => (
                        <li key={j}>
                          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            {article}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-8 text-center font-heading text-2xl font-bold">Frequently Asked Questions</h2>
            <Accordion className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6">
            <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <CardContent className="p-12 text-center">
                <h2 className="font-heading text-2xl font-bold">Still need help?</h2>
                <p className="mx-auto mt-4 max-w-md opacity-90">
                  Our support team is here to help you get the most out of Visbow.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button size="lg" variant="secondary" className="h-12">
                    Contact support
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 border-white/30 text-white hover:bg-white/10">
                    Join community
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-600">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <span className="font-heading text-sm font-semibold">Visbow</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Visbow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SupportPage