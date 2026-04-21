"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function DashboardNav() {
  return (
    <nav className="fixed left-0 top-0 h-full w-64 border-r border-border bg-card p-4">
      <div className="mb-8 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <span className="font-heading text-xl font-semibold">Visbow</span>
        </Link>
      </div>
      <div className="space-y-1">
        {[
          { name: "Overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
          { name: "Visibility", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
          { name: "Competitors", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
          { name: "Reports", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
        ].map((item, i) => (
          <button
            key={i}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
              i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
            </svg>
            {item.name}
          </button>
        ))}
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
          <CardContent className="p-4">
            <div className="text-sm font-medium">Upgrade to Growth</div>
            <p className="mt-1 text-xs text-muted-foreground">Track 3 brands & get daily updates</p>
            <Button size="sm" className="mt-3 w-full">Upgrade</Button>
          </CardContent>
        </Card>
      </div>
    </nav>
  )
}

function StatCard({ title, value, change, trend }: { title: string; value: string; change: string; trend: "up" | "down" }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <div className={`mt-1 text-sm ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
          {change}
        </div>
      </CardContent>
    </Card>
  )
}

function PlatformCard({ name, score, mentions, trend }: { name: string; score: number; mentions: number; trend: string }) {
  return (
    <Card className="overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{name}</span>
          <Badge variant="secondary">{score}%</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{mentions}</div>
            <div className="text-xs text-muted-foreground">mentions</div>
          </div>
          <div className={`text-sm ${trend.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
            {trend}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardNav />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Track your brand across AI platforms</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </Button>
            <Button>
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Run scan
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Mentions" value="1,247" change="+23% this week" trend="up" />
          <StatCard title="Visibility Score" value="78%" change="+5% this week" trend="up" />
          <StatCard title="Competitors Ahead" value="2" change="-1 this week" trend="up" />
          <StatCard title="Queries Tracked" value="24" change="+3 this week" trend="up" />
        </div>

        <div className="mt-8">
          <h2 className="mb-4 font-heading text-xl font-semibold">AI Platform Performance</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <PlatformCard name="ChatGPT" score={78} mentions={456} trend="+12%" />
            <PlatformCard name="Claude" score={65} mentions={312} trend="+8%" />
            <PlatformCard name="Perplexity" score={92} mentions={289} trend="+15%" />
            <PlatformCard name="Gemini" score={71} mentions={190} trend="+6%" />
          </div>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="mentions">
            <TabsList>
              <TabsTrigger value="mentions">Recent Mentions</TabsTrigger>
              <TabsTrigger value="queries">Query Performance</TabsTrigger>
              <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
            </TabsList>
            <TabsContent value="mentions" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Brand Mentions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { query: "best project management tool", platform: "ChatGPT", date: "2 hours ago", sentiment: "positive" },
                      { query: "acme inc vs competitors", platform: "Perplexity", date: "5 hours ago", sentiment: "neutral" },
                      { query: "acme project management review", platform: "Claude", date: "1 day ago", sentiment: "positive" },
                      { query: "top productivity software 2026", platform: "Gemini", date: "2 days ago", sentiment: "neutral" },
                    ].map((mention, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0">
                        <div>
                          <div className="font-medium">"{mention.query}"</div>
                          <div className="text-sm text-muted-foreground">
                            {mention.platform} • {mention.date}
                          </div>
                        </div>
                        <Badge variant={mention.sentiment === "positive" ? "default" : "secondary"}>
                          {mention.sentiment}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage