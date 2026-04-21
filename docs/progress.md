# Visbow — Progress Tracker

**Purpose:** Track what's decided, what's done, and what's next. Not architecture (see plan.md for that). Just progress and pending actions.

**Last updated:** April 2026

---

## Brand & Identity

| Item | Status | Notes |
|---|---|---|
| Brand name | ✅ Decided | **Visbow** |
| Domain | ✅ Purchased | visbow.com (on Cloudflare Registrar) |
| Trademark search | ⏳ Pending | Run USPTO, IP India, EUIPO, WIPO, Google |
| Trademark filing (India) | ⏳ Pending | Class 9 + Class 42, as sole proprietor |
| Logo / visual identity | ⏳ Pending | After trademark clearance |
| Tagline | ⏳ Pending | Working: "Ahrefs for AI search" |

---

## Legal & Compliance

| Item | Status | Notes |
|---|---|---|
| Legal structure | ✅ Sole proprietorship | India, founder's personal capacity |
| PAN / Aadhaar | ✅ Have | Used for TM filing |
| GST registration | ⏳ Pending | Within 2-3 months of operations; needed for international invoicing under LUT |
| DPIIT Startup registration | 🤔 Optional | Free, 1-2 weeks; individual proprietor already gets 50% TM discount so not essential |
| Pvt Ltd incorporation | 🔜 Future trigger | At fundraise, first hire, or first enterprise contract |
| Trademark assignment (proprietor → Pvt Ltd) | 🔜 Future | When company is incorporated |
| Privacy policy | ⏳ Pending | Before launch |
| Terms of service | ⏳ Pending | Before launch |
| DPA template | ⏳ Pending | Available on customer request |

---

## Tech Stack (Decided)

| Layer | Choice |
|---|---|
| Hosting + edge compute | Cloudflare Pages + Workers (free commercial tier) |
| Database | Turso (libSQL / SQLite edge) — fallback: Neon Postgres |
| Auth | Clerk (Google OAuth + email/password at launch) |
| File storage | Cloudflare R2 |
| Background jobs | Cloudflare Cron Triggers + Queues |
| Rate limiting | Cloudflare Rate Limiting API + Durable Objects |
| Email | Resend |
| Payments | Stripe |
| Errors | Sentry |
| Analytics | PostHog |
| LLMs | OpenAI, Anthropic, Perplexity, Gemini (bundled, platform-paid — not BYOK) |
| Google AI Overviews | 🔜 Phase 2 (SerpAPI / DataForSEO, ~₹6-12k/month) |

---

## Product Scope

### Modules (Platform Vision)

| Module | Name | Customer question | Status |
|---|---|---|---|
| Module 1 | Track (Visibility) | "Am I showing up in AI?" | 🚧 In development |
| Module 2 | Diagnose (Content Audit) | "Why am I not showing up?" | 📋 Planned |
| Module 3 | Create (Content Workflows) | "What should I write?" | 📋 Planned |
| Module 4 | Voice (Brand Voice Engine) | "How do I stay consistent?" | 📋 Planned |

### Module 1 — Launch Scope

**Decided:** Weekly tracking of brand + competitor mentions across OpenAI, Anthropic, Perplexity, Gemini. Captures mentions (with variation/pronoun matching), position, sentiment, citations from Perplexity/Gemini. 3 runs per provider/query to smooth variance. Week-over-week trend computation.

**Deferred to Phase 2:** Google AI Overviews tracking, ChatGPT Shopping, daily refresh (weekly at launch).

---

## Pricing (Decided)

| Tier | Price | Brands | Queries | AI surfaces | Cadence |
|---|---|---|---|---|---|
| Free | $0 | 1 | 3 | 2 | View-only, 7-day history |
| **Starter** | **$49/mo** | 1 | 10 | 4 | Weekly |
| **Growth** | **$69/mo** | 3 | 30 | 4 | Daily |
| **Scale** | **$99/mo** | 10 | 100 | 4 | Daily |

**Paid mix assumption:** 50% Starter / 35% Growth / 15% Scale  
**Blended ARPU:** ₹5,398 (~$64)

**⚠️ Open pricing issue:** Scale tier has 21% gross margin at pessimistic LLM cost. Not acceptable. Three possible fixes pending decision:
- [ ] Reduce Scale queries from 100 to 60 (GM → ~52%)
- [ ] Raise Scale price to $149-199 (GM → 48-67%)
- [ ] Commit to caching + cheap-model routing (realistic LLM: $0.007/call → GM 77%)

---

## Unit Economics Summary

**Cloudflare stack + bundled LLM + pessimistic scenario:**

| Scenario | Break-even | Peak burn | M24 OP | M24 GM |
|---|---|---|---|---|
| Base | Month 2 | ₹13,500 | ₹404,629 | 51% |
| Optimistic | Month 2 | ₹10,285 | ₹1,088,368 | 50.9% |
| Pessimistic | Month 6 | ₹15,500 | ₹60,132 | 50.6% |

**Per-customer LLM cost at pessimistic:**
- Starter (10 queries): ₹663/mo → 84% GM ✅
- Growth (30 queries): ₹1,989/mo → 66% GM ✅
- Scale (100 queries): ₹6,630/mo → 21% GM ❌

---

## Go-to-Market (Decided)

| Decision | Choice |
|---|---|
| Geography | Global (dollar-priced) |
| ICP | B2B SaaS, 50-500 employees, 2-10 person marketing teams |
| Initial market | India-first (first 20-30 customers), then global |
| Channels | D2C, agencies over time |
| Pitch line | "Ahrefs for AI search" |

---

## Immediate Next Actions (this week)

Ordered by priority:

1. [ ] **Trademark search for "Visbow"** — 20 min across USPTO, IP India, EUIPO, WIPO, Google (Class 9 + 42)
2. [ ] **File India trademark** — LegalWiz or Vakilsearch, ₹15-20k, sole proprietor, Class 9 + 42
3. [ ] **Set up legal pages** — Privacy policy + Terms of Service drafts
4. [ ] **Put up landing page** — headline, problem, solution, 4 AI surfaces, pricing, email capture
5. [ ] **Talk to 5 potential customers** — 30-min calls with B2B SaaS marketing heads
6. [ ] **Give senior dev Module 1 thin slice** — input brand + 3 prompts, query OpenAI, show results table
7. [ ] **Decide Scale tier pricing fix** — pick one of the three options above

---

## Weekly Update Log

### Week of 14 April 2026
- Bought visbow.com on Cloudflare Registrar
- Finalized tech stack migration to Cloudflare + Turso + Clerk
- Completed competitor SWOT analysis (14 competitors)
- Decided sole proprietor trademark filing path

### Week of [next] 
- [ ] ...

---

## How to Use This File

- **Update weekly.** Add a dated entry under "Weekly Update Log."
- **Keep plan.md untouched.** Plan.md is the architectural reference. This file tracks reality.
- **When a "pending" item becomes "done,"** move it to the weekly log with date.
- **When a "deferred" item becomes active,** move it up to the relevant section.
- **If an item has been "pending" for 4+ weeks,** kill it or reprioritize it. Stale todos rot.
