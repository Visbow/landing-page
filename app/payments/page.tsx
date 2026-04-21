"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

function PaymentsPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for trying us out",
      features: ["1 brand tracked", "3 queries", "2 AI platforms", "View-only access", "7-day history"],
    },
    {
      name: "Starter",
      price: { monthly: 49, yearly: 39 },
      description: "For small marketing teams",
      features: ["1 brand tracked", "10 queries", "4 AI platforms", "Weekly reports", "90-day history", "Email support"],
      popular: true,
    },
    {
      name: "Growth",
      price: { monthly: 69, yearly: 55 },
      description: "For growing companies",
      features: ["3 brands tracked", "30 queries", "4 AI platforms", "Daily refresh", "1-year history", "Priority support", "Competitor tracking"],
    },
    {
      name: "Scale",
      price: { monthly: 99, yearly: 79 },
      description: "For enterprise teams",
      features: ["10 brands tracked", "100 queries", "4 AI platforms", "Real-time alerts", "Unlimited history", "Dedicated support", "Custom integrations", "API access"],
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
              <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">Support</Link>
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
            <Badge variant="outline" className="mb-4">Billing</Badge>
            <h1 className="font-heading text-4xl font-bold">Simple, transparent pricing</h1>
            <p className="mt-4 text-muted-foreground">
              Choose the plan that fits your needs. All plans include a 14-day free trial.
            </p>
            
            <div className="mt-8 inline-flex items-center rounded-lg border border-border p-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  billingCycle === "monthly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  billingCycle === "yearly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Yearly
                <Badge variant="secondary" className="ml-2 text-xs">Save 20%</Badge>
              </button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {plans.map((plan, i) => (
                <Card key={i} className={`relative flex flex-col ${plan.popular ? "ring-2 ring-primary" : ""}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge>Most popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-6">
                      <span className="font-heading text-4xl font-bold">
                        ${billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                      {billingCycle === "yearly" && plan.price.yearly > 0 && (
                        <div className="mt-1 text-sm text-green-600">
                          Billed ${plan.price.yearly * 12}/year
                        </div>
                      )}
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.name === "Free" ? "Get started" : "Start free trial"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Manage your subscription</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Starter Plan</div>
                      <div className="text-sm text-muted-foreground">$49/month • Renews May 21, 2026</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Cancel</Button>
                    <Button size="sm">Upgrade</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Manage your payment details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-14 items-center justify-center rounded border border-border bg-background">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                        <rect width="20" height="14" x="2" y="5" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">•••• •••• •••• 4242</div>
                      <div className="text-sm text-muted-foreground">Expires 12/2027</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add payment method
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View your past invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { date: "Apr 21, 2026", amount: "$49.00", status: "Paid", invoice: "#INV-004" },
                    { date: "Mar 21, 2026", amount: "$49.00", status: "Paid", invoice: "#INV-003" },
                    { date: "Feb 21, 2026", amount: "$49.00", status: "Paid", invoice: "#INV-002" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border/50 p-4">
                      <div>
                        <div className="font-medium">{item.date}</div>
                        <div className="text-sm text-muted-foreground">{item.invoice}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{item.amount}</div>
                        <Badge variant="secondary" className="mt-1">{item.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="font-heading text-2xl font-bold">Questions about pricing?</h2>
            <p className="mt-4 text-muted-foreground">
              Our team is here to help you find the right plan for your needs.
            </p>
            <Button size="lg" className="mt-6">
              Contact sales
            </Button>
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

export default PaymentsPage