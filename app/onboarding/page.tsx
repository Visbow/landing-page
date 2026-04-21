"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const STEPS = [
  { id: 1, title: "Add your brand", description: "Tell us who you are" },
  { id: 2, title: "Add competitors", description: "Who you're tracking" },
  { id: 3, title: "Set up queries", description: "What you want to track" },
  { id: 4, title: "Choose plan", description: "Select your tier" },
]

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {STEPS.map((step, i) => (
        <div key={step.id} className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all ${
              currentStep >= step.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {currentStep > step.id ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              step.id
            )}
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-0.5 w-8 ${currentStep > step.id ? "bg-primary" : "bg-muted"}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function Step1Brand() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold">Let's start with your brand</h2>
        <p className="mt-2 text-muted-foreground">Enter your company name and website</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Company name</label>
          <Input placeholder="Acme Inc." className="mt-1.5 h-12" />
        </div>
        <div>
          <label className="text-sm font-medium">Website</label>
          <Input placeholder="acme.com" className="mt-1.5 h-12" />
        </div>
      </div>
      <Button size="lg" className="w-full h-12">Continue</Button>
    </div>
  )
}

function Step2Competitors() {
  const [competitors, setCompetitors] = useState([""])
  
  const addCompetitor = () => setCompetitors([...competitors, ""])
  const removeCompetitor = (i: number) => setCompetitors(competitors.filter((_, j) => j !== i))

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold">Add your competitors</h2>
        <p className="mt-2 text-muted-foreground">Who are you tracking against?</p>
      </div>
      <div className="space-y-3">
        {competitors.map((_, i) => (
          <div key={i} className="flex gap-2">
            <Input placeholder={`Competitor ${i + 1}`} className="h-12" />
            {competitors.length > 1 && (
              <Button variant="ghost" size="icon" onClick={() => removeCompetitor(i)}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            )}
          </div>
        ))}
        <Button variant="outline" onClick={addCompetitor} className="w-full">
          + Add competitor
        </Button>
      </div>
      <Button size="lg" className="w-full h-12">Continue</Button>
    </div>
  )
}

function Step3Queries() {
  const [queries, setQueries] = useState([""])
  
  const addQuery = () => setQueries([...queries, ""])
  const removeQuery = (i: number) => setQueries(queries.filter((_, j) => j !== i))

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold">What queries to track</h2>
        <p className="mt-2 text-muted-foreground">
          Think about what your customers search when looking for solutions like yours
        </p>
      </div>
      <div className="space-y-3">
        {queries.map((_, i) => (
          <div key={i} className="flex gap-2">
            <Input placeholder={`Query ${i + 1} (e.g., "best project management software")`} className="h-12" />
            {queries.length > 1 && (
              <Button variant="ghost" size="icon" onClick={() => removeQuery(i)}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            )}
          </div>
        ))}
        <Button variant="outline" onClick={addQuery} className="w-full">
          + Add query
        </Button>
      </div>
      <div className="rounded-lg bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground">
          <strong>Pro tip:</strong> Good queries are specific, problem-aware, and include your category. 
          Avoid brand names and generic words.
        </p>
      </div>
      <Button size="lg" className="w-full h-12">Continue</Button>
    </div>
  )
}

function Step4Plan() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: ["1 brand", "3 queries", "2 AI platforms"],
    },
    {
      name: "Starter",
      price: "$49",
      features: ["1 brand", "10 queries", "4 AI platforms", "Weekly reports"],
      popular: true,
    },
    {
      name: "Growth",
      price: "$69",
      features: ["3 brands", "30 queries", "Daily refresh", "Competitor tracking"],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold">Choose your plan</h2>
        <p className="mt-2 text-muted-foreground">Start free, upgrade anytime</p>
      </div>
      <div className="space-y-3">
        {plans.map((plan, i) => (
          <Card key={i} className={`relative cursor-pointer transition-all hover:ring-2 hover:ring-primary/50 ${plan.popular ? "ring-2 ring-primary" : ""}`}>
            {plan.popular && (
              <Badge className="absolute -top-2 left-4">Popular</Badge>
            )}
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <div className="font-medium">{plan.name}</div>
                <div className="text-sm text-muted-foreground">{plan.features.join(" • ")}</div>
              </div>
              <div className="text-xl font-bold">{plan.price}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button size="lg" className="w-full h-12">Get started free</Button>
    </div>
  )
}

function OnboardingPage() {
  const [step, setStep] = useState(1)

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1Brand />
      case 2: return <Step2Competitors />
      case 3: return <Step3Queries />
      case 4: return <Step4Plan />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-6 py-16">
        <div className="mb-8 flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span className="font-heading text-xl font-semibold">Visbow</span>
          </Link>
        </div>
        <StepIndicator currentStep={step} />
        <Card className="mt-8">
          <CardContent className="p-6">
            {renderStep()}
          </CardContent>
        </Card>
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage