# GEO Platform — Master Plan

**Version:** 2.0   
**Last Updated:** April 2026 

## Table of Contents

0. How to Read This Document  
1. Product Vision  
2. Non-Goals  
3. Tech Stack  
4. System Architecture  
5. Data Model (Conceptual)  
6. Security Posture  
7. Testing Strategy  
8. Shared Foundation Services  
9. Module 1 — Visibility  
10. Module 2 — Content Audit  
11. Module 3 — Content Workflows  
12. Module 4 — Voice Engine  
13. Cross-Cutting Concerns  
14. Folder Structure & Module Isolation  
15. Environment Configuration  
16. Deployment & CI/CD  
17. Observability & Operations  
18. Compliance Posture  
19. Build Sequence & Timeline  
20. Open Questions

## 0\. How to Read This Document

This is the **master architectural plan** for GEO Platform. It describes **intent, contracts, and principles** — the decisions that stay stable across implementation changes.

### 0.1 What This Document Defines

- Product vision and the four modules that make up the platform  
- Tech stack choices and the reasoning behind them  
- System architecture, component boundaries, and how they interact  
- Data model at the conceptual level (entities, relationships, ownership)  
- Security principles enforced at every layer  
- Testing strategy across unit, integration, E2E, security, and LLM-eval dimensions  
- Shared foundation services that every module consumes  
- Per-module descriptions of what each module does, what data it owns, how it integrates, and what user experience it delivers

### 0.2 What This Document Deliberately Does Not Define

- Exact table column names, data types, or indexes — those live in Turso migrations  
- Exact function signatures, class internals, or algorithm code — those live in source files  
- Exact test cases — those live in test files, described here by strategy  
- Step-by-step build instructions for a specific module — those live in the per-module spec (`specs/module-N-*.md`) written when that module is about to be built

This separation keeps plan.md stable and useful over months. Implementation details change constantly; architecture does not.

### 0.3 When to Update This Document

Update plan.md when an **architectural** decision changes:

- A vendor is swapped  
- A shared abstraction is introduced or removed  
- A security principle changes  
- A new module is added or an existing one materially changes scope  
- A cross-cutting concern fundamentally shifts

Do not update plan.md for column renames, function refactors, bug fixes, or tactical implementation changes. Those are code-level concerns.

### 0.4 Precedence When Instructions Conflict

1. This plan.md for system-wide architectural decisions  
2. Module spec for that module's implementation detail  
3. Code and code comments for local implementation rationale

If a module spec needs to contradict this plan, update this plan first.

### 0.5 Conventions

- `monospace` — identifiers, file paths, vendor product names  
- **Bold** — concepts to anchor on  
- *Italic* — cautions or caveats  
- Tables for scannable reference material

## 1\. Product Vision

### 1.1 What We Are Building

**GEO Platform** (working name) is a B2B SaaS product for marketing teams operating in the era of AI-mediated search. As buyers increasingly research vendors through ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews alongside traditional search, marketing teams need new tooling to track visibility, diagnose content gaps, and produce content that performs across both traditional and AI-mediated surfaces.

The product is **one unified application** with four modules, accessed through a single workspace per customer. One signup. One subscription. Modules activated per plan tier.

### 1.2 The Four Modules

| \# | Module | Core Capability | Primary Buyer |
| :---- | :---- | :---- | :---- |
| 1 | **Visibility** | Track brand and competitor mentions across ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews. Weekly automated reporting. | Head of Marketing |
| 2 | **Content Audit** | Scan existing blog/site content. Score AI-readiness per page. Flag pages to refresh, remove, or consolidate. | Content Manager |
| 3 | **Content Workflows** | Workflow engine with templates for creating on-brand content: comparison pages, pSEO pages, refresh workflows, social content, newsletters. | Marketing Team |
| 4 | **Voice Engine** | Generate content (LinkedIn posts, blog drafts, newsletters) preserving founder/brand voice using their past writing as reference. | Founder / CXO / Ghostwriter |

All modules share: authentication, workspace model, billing, LLM infrastructure, image generation, observability, security posture, UI shell, navigation.

### 1.3 Platform Narrative

**Track → Diagnose → Create.**

- **Module 1** handles tracking: where you stand across AI search.  
- **Module 2** handles diagnosis: which of your existing content is broken, and what to do about each piece.  
- **Modules 3 and 4** handle creation: workflow-driven content generation for the team, and voice-preserving content generation for individuals.

The loop is the platform's retention mechanic. Customers entering via one module naturally discover the adjacent ones.

### 1.4 Target Customer

B2B SaaS companies, 50–500 employees, marketing teams of 2–10 people, existing content library of 50+ pieces, 3–8 identifiable competitors, English-primary content. Primary market: India and APAC. Secondary: US mid-market comfortable with remote vendors.

Primary buyers: Head of Marketing, VP Marketing, Head of Content, Demand Gen Lead. Module 4 has a separate buyer: Founder, CXO, or ghostwriter-for-executive.

### 1.5 Pricing Philosophy

Tiered subscriptions with per-module entitlements. Usage-metered overages on variable-cost resources (LLM queries per month, images generated per month, pages audited per month, workflow runs per month).

The architecture must support flexible pricing evolution without schema changes — per-module entitlements and per-resource quotas are data, not hardcoded logic.

### 1.6 Product Philosophy

Three principles that shape every module:

1. **The user is always in control.** No module delivers "magic" AI output that the user cannot inspect, edit, or regenerate. Every AI-generated artifact supports briefing before generation, selection during generation, and iterative refinement after.  
     
2. **Templates beat blank canvases.** The platform ships opinionated starting points for every common workflow. Users customize templates; they rarely build from scratch. Empty canvases are a failure mode.  
     
3. **Trust compounds.** Recommendations that turn out to be wrong cost us customers. We prefer conservative, defensible recommendations with clear reasoning over confident guesses. When in doubt, we surface "review recommended" rather than "do this."

## 2\. Non-Goals

Explicitly out of scope until product-market fit is proven and specific customer demand justifies the cost:

- Multi-user workspaces beyond single-owner (no team roles, commenting, real-time collaboration)  
- SSO (SAML, OIDC, enterprise identity provider integration)  
- Formal compliance certifications (SOC 2, ISO 27001, HIPAA) — security *practices* are in scope; *certifications* are not  
- White-labeling or customer-branded reports  
- Public API for customers (no customer-facing API keys, webhooks, or SDKs)  
- Native mobile apps — responsive web is the only UI target  
- Internationalization (English only)  
- On-prem deployment  
- Customer-owned custom domains per workspace  
- Real-time co-editing of any content  
- Open workflow marketplace where third parties publish templates (deferred; we publish templates ourselves until proven)

## 3\. Tech Stack

### 3.1 Core Stack

| Concern | Choice | Rationale |
| :---- | :---- | :---- |
| Framework | Next.js 15 (App Router) | Single-repo fullstack, edge-compatible output, server components, familiar to founder |
| Language | TypeScript (strict mode) | End-to-end type safety, shared types across server and client |
| Database | Turso (libSQL / SQLite edge) with vector extension | Generous free tier (9 GB, 500 DBs, no auto-pause), edge-replicated reads, fits Cloudflare Workers runtime. Fallback: Neon Postgres (0.5 GB free, no auto-pause, native `pgvector`) if SQL compatibility matters more |
| Auth | Clerk (free tier up to 10k MAU) | Managed auth with session handling, magic link, TOTP 2FA, OAuth. Swap to self-hosted on Workers \+ DB sessions if MAU exceeds free tier |
| File Storage | Cloudflare R2 | 10 GB storage free, zero egress fees, S3-compatible API. Handles uploaded CSVs, PDF exports, generated images (when Modules 3/4 ship) |
| Hosting | Cloudflare Pages \+ Workers | Free for commercial use, 100k requests/day free, edge runtime with zero cold starts, global distribution |
| Background Jobs | Cloudflare Workers Cron Triggers \+ Queues | Built-in scheduled invocations, Queues for durable fan-out. Simpler durability model than Inngest but sufficient for Module 1's weekly-run pattern |
| Transactional Email | Resend | Free tier covers 3k emails/month. Clean API, React Email component support |
| Payments | Stripe (Checkout, Billing, Customer Portal) | Subscriptions, metering, tax, dunning, proration |
| Error Tracking | Sentry (free tier, 5k errors/month) | Full-stack error capture |
| Product Analytics | PostHog (free tier, 1M events/month) | Event tracking, feature flags, session replay |
| Rate Limiting | Cloudflare Workers Rate Limiting API \+ Durable Objects | Native to Workers runtime, no extra vendor, consistent counters via Durable Objects |
| UI Components | shadcn/ui \+ Tailwind CSS | Copy-in components, full styling ownership |
| Forms | React Hook Form \+ Zod | Unified validation schemas for client and server |
| Client Data Fetching | TanStack Query | Cache, optimistic updates, deduping |
| Visual Workflow Builder (Module 3 Phase C+) | React Flow (`@xyflow/react`) | Mature library for node-based visual editors; serializes cleanly to JSON |

###  3.2 LLM & AI Stack

| Concern | Choice | Rationale |
| :---- | :---- | :---- |
| Text LLM providers | OpenAI, Anthropic, Perplexity, Google Gemini | Four major AI search surfaces customers care about. Platform pays; bundled into subscription |
| Google AI Overviews | Deferred to Phase 2 | Feature gap vs competitors accepted initially; revisit when revenue supports SerpAPI/DataForSEO subscription (~₹6,000–12,000/month) |
| Image generation | Google Nano Banana 2 (`gemini-3.1-flash-image-preview`) | Strong at infographics and text rendering, needed by Modules 3 and 4 |
| Vector store | Turso native vector search (or Cloudflare Vectorize) | Turso supports embedding columns natively; Vectorize is a managed edge vector DB. Either avoids adding a separate Postgres instance just for pgvector |
| Embeddings | OpenAI `text-embedding-3-small` (1536 dim) | Cost-effective, high quality |
| Audio transcription (Module 4\) | Whisper API or equivalent | Needed for voice-note input in Voice Engine |
| Provider abstraction | Custom `LLMProvider` and `ImageProvider` interfaces (Section 8\) | No module calls vendor SDKs directly; swappable, loggable, rate-limitable |

###  3.3 Third-Party Integrations (Optional, Per Customer)

These are optional integrations that enhance specific modules when configured. The platform works without them; it works better with them.

| Integration | Module | Purpose |
| :---- | :---- | :---- |
| Google Search Console | Module 2 | Traffic, impressions, and query data for content audit |
| Google Analytics 4 | Module 2 | Engagement signals for content audit |
| WordPress (REST API) | Modules 3, 4 | Publishing workflow outputs |
| Webflow (CMS API) | Modules 3, 4 | Publishing workflow outputs |

###  3.4 Dev Tooling

- Package manager: `npm`  
- Node: version 20+ (pinned via `.nvmrc`)  
- Lint: ESLint (Next.js preset, `@typescript-eslint`, custom module-boundary rules per Section 14\)  
- Format: Prettier (enforced pre-commit)  
- Unit/Integration tests: Vitest  
- E2E tests: Playwright  
- Git hooks: Husky \+ lint-staged  
- CI: GitHub Actions (runs lint, type-check, tests, security scans on every PR)  
- CD: Cloudflare Pages auto-deploy on `main` push (production) and `dev` push (staging). Preview deployment per PR via Pages Git integration.  
- Secret scanning: `gitleaks` in CI  
- Dependency security: GitHub Dependabot \+ `npm audit` in CI

###  3.5 Running Cost Baseline (10 customers, moderate usage)

Purpose: sanity-check economics during build. Actual costs will differ; revisit monthly.

| Service | Expected Monthly Cost |
| :---- | :---- |
| Cloudflare Pages \+ Workers | ₹0 (Free tier, 100k req/day, commercial-allowed) |
| Turso (DB) | ₹0 (Free tier, 9 GB, 500 DBs, no auto-pause) |
| Cloudflare R2 (Storage) | ₹0 (Free tier, 10 GB storage, zero egress) |
| Clerk (Auth) | ₹0 (Free tier, up to 10k MAU) |
| Cloudflare Queues / Durable Objects | ₹0 (Free tier sufficient at this scale) |
| Resend | ₹0 (Free tier, 3k emails/month) |
| Sentry | ₹0 (Free tier) |
| PostHog | ₹0 (Free tier) |
| Stripe | \~2.9% of revenue \+ ₹3 per transaction |
| LLM APIs (OpenAI \+ Anthropic \+ Perplexity \+ Gemini text, bundled) | ₹15,000–30,000 |
| Nano Banana 2 image generation (Modules 3/4) | ₹2,000–10,000 depending on image volume |
| Whisper audio transcription (Module 4\) | ₹500–2,000 |
| Domain, misc | ₹500 |
| **Total baseline (Module 1 only)** | **\~₹15,500–30,500/month** |
| **Total baseline (with Modules 3/4 variable costs)** | **\~₹18,000–42,500/month** |

Break-even (Module 1, bundled LLM, current ₹5,398 blended ARPU): \~6–8 paying customers.

*Notes:*

- *Cloudflare's free commercial tier is the foundational architectural bet. All infrastructure except LLM APIs and Stripe processing is zero-variable-cost up to roughly 200 paying customers.*  
- *Google AI Overviews tracking is intentionally deferred; when added, budget an additional ₹6,000–12,000/month for SerpAPI or DataForSEO.*  
- *At \>200 customers, expect Tier 2 upgrades (Resend paid, Sentry Team) adding ₹3,500–4,000/month.*

## 4\. System Architecture

### 4.1 Architectural Principles

1. **Monolith deployment, modular internals.** One Next.js application deployed as one unit; internally organized as rigorously isolated modules. The codebase is navigable because each module is self-contained; the deployment is simple because there is only one process to reason about.  
     
2. **Multi-tenant by default.** Every row of every tenant-specific table belongs to a `workspace_id`. Tenant isolation is enforced in application code via typed, workspace-scoped query builders. Because Turso (SQLite at the edge) does not provide Postgres-style Row-Level Security, the database is not an independent defense layer — which makes disciplined query construction, mandatory integration tests that attempt cross-tenant reads, and ESLint rules forbidding direct database clients in module code essential. This is a deliberate trade-off: we accept a weaker defense-in-depth story for massively cheaper infrastructure and edge latency, and compensate with testing rigor.  
     
3. **Modules are vertical slices.** Each module owns its own UI routes, API routes, database tables, background jobs, business logic, and tests. Modules share foundation services only. **Cross-module imports are forbidden at the linter level.**  
     
4. **LLM and image calls always go through the abstraction layer.** No module calls vendor SDKs directly. This guarantees consistent logging, cost tracking, retry behavior, rate limiting, and the ability to swap providers without rewriting module code.  
     
5. **Background jobs are durable.** Anything taking more than a few seconds, calling an external API, or involving multiple steps moves to a Cloudflare Workers cron-triggered job or Queue-backed consumer. Each durable unit of work is a separate queue message; failures retry individual messages with a dead-letter queue for persistent failures. Long multi-step orchestrations (Module 3 workflows) decompose into chained queue messages with per-step state persisted to the database.  
     
6. **Observability is non-optional.** Every external API call is traced. Every error reaches Sentry. Every user action generates a PostHog event. When production breaks, the time to diagnosis should be minutes, not hours.  
     
7. **Security is enforced in depth.** Application-layer tenant isolation (workspace-scoped query builders + tests), plus edge-layer rate limiting (Cloudflare Workers + Durable Objects), plus infrastructure-layer secret management, plus auth-provider-owned identity (Clerk). No single layer is the only thing preventing a breach, though the loss of database-layer RLS means application-layer enforcement carries more weight than in a Postgres-backed system.  
     
8. **Feature flags gate module access.** Whether a workspace can access Module N is controlled by a per-workspace feature flag and the active subscription, not by hardcoded conditionals. Enables gradual rollouts, beta access, and pricing tier changes without code changes.  
     
9. **Typed contracts everywhere.** Zod schemas for API inputs. Generated types for DB queries (via Drizzle ORM or similar, against the Turso schema). Shared types between server and client. Zero `any` in production code (enforced by ESLint).  
     
10. **Foundation is small; modules carry complexity.** The foundation layer is deliberately thin — auth, workspace, billing, LLM abstraction, image abstraction, observability, workflow engine. Everything else lives in a module. This keeps the shared surface stable and lets modules evolve independently.  
      
11. **Human-in-the-loop by default for generation.** No module that produces AI-generated content ships with only auto-generation. Every generation-producing module supports briefing before, selection during, and iterative refinement after. Users always see, edit, and approve what the AI produces.  
      
12. **Workflows are data, not code.** Any multi-step content-generation process is expressed as a workflow definition (typed nodes with inputs/outputs) that can be serialized, versioned, stored, and replayed. The same definition powers programmatic execution and visual editing.

### 4.2 High-Level Component Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          Browser                                 │
│   Next.js App (React Server + Client Components, Tailwind)      │
│   - Marketing (public)                                           │
│   - Auth (signup, login, password reset, 2FA — Clerk)           │
│   - App shell (workspace selector, module nav, account)         │
│   - Module UIs (one route segment per module)                   │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│            Cloudflare Pages + Workers (edge runtime)            │
│                                                                   │
│   Middleware:                                                     │
│     - Session validation (Clerk)                                  │
│     - Workspace resolution + authorization                        │
│     - Rate limiting (Workers Rate Limiting API + Durable Objects)│
│     - Request/response logging                                    │
│     - Audit logging for sensitive actions                         │
│     - Correlation ID propagation                                  │
│                                                                   │
│   Route groups:                                                   │
│     /api/auth/*          - auth endpoints                         │
│     /api/profile/*       - profile read/update, avatar upload    │
│     /api/workspace/*     - workspace CRUD, settings               │
│     /api/billing/*       - Stripe webhooks, subscription mgmt    │
│     /api/modules/N/*     - per-module endpoints                   │
│     /api/workflows/*     - workflow engine endpoints              │
│     /api/cron/*          - Cloudflare Cron Trigger entry points  │
│     /api/webhooks/*      - third-party webhooks (Stripe, etc.)    │
└──────────┬──────────────────────────┬───────────────────────────┘
           │                          │
           ▼                          ▼
┌──────────────────────┐  ┌───────────────────────────────────────┐
│  Turso (libSQL)      │  │  Cloudflare Workers Queues + Cron     │
│  - SQLite at edge    │  │  - Cron: weekly visibility runs       │
│  - Vector search     │  │  - Queues: durable fan-out            │
│  - Auth sessions     │  │    (query × provider × run)           │
│  - Multi-region read │  │  - Retries on failed messages         │
│  - Durable writes    │  │  - Dead-letter queue for failures     │
└──────────────────────┘  └───────────┬───────────────────────────┘
                                       │
                                       ▼
                     ┌──────────────────────────────────────┐
                     │   External Services                  │
                     │   - OpenAI, Anthropic,               │
                     │     Perplexity, Gemini (text LLMs)   │
                     │   - Nano Banana 2 (image gen)        │
                     │   - Whisper (audio transcription)    │
                     │   - Stripe (billing)                 │
                     │   - Resend (transactional email)     │
                     │   - Google Search Console / GA4      │
                     │     (per-customer optional)          │
                     │   - WordPress / Webflow              │
                     │     (per-customer optional)          │
                     └──────────────────────────────────────┘

┌──────────────────────┐
│  Cloudflare R2       │     (file storage, S3-compatible,
│  - Uploaded CSVs     │      zero egress fees)
│  - PDF exports       │
│  - Generated images  │
│  - Workspace logos   │
└──────────────────────┘

Cross-cutting services (every layer sends data to):
   Sentry          ← errors, exceptions
   PostHog         ← product analytics events
   Durable Objects ← rate limit counters + coordination state
   Trace table (Turso) ← LLM/image provider calls with cost and latency
```

**How to read this diagram:**

* **Browser** — the Next.js app rendered in the user's browser. Public marketing pages, authentication flows (powered by Clerk's hosted UI and components), the authenticated app shell (with workspace switcher and navigation), and one UI route segment per module.
* **Cloudflare Pages + Workers** — the edge runtime backend. Pages serves the Next.js output globally; Workers handles API routes, middleware, and cron-triggered background work. Every request flows through middleware first (session, workspace, rate limiting, logging, audit). Route groups are organized by concern: auth, profile, workspace, billing, per-module endpoints, workflow engine endpoints, cron entry points, and webhook receivers. Zero cold starts because it's edge runtime.
* **Turso (libSQL / SQLite at the edge)** — the data plane. Turso is distributed SQLite with multi-region read replicas and durable writes. Tenant isolation is enforced at the application layer via workspace-scoped query builders (no native RLS as in Postgres — discipline and testing substitute for DB-enforced policies). Native vector search handles embeddings for Modules 2 and 4. Session storage for Clerk tokens lives alongside application data.
* **Cloudflare Workers Queues + Cron Triggers** — the background job runner. Cron Triggers fire scheduled invocations (weekly visibility runs, audit cadence). Queues handle durable fan-out: one message per (query × provider × run), processed with automatic retry and dead-letter handling on failure. Simpler primitives than Inngest's `step.run`, but sufficient for Module 1's fan-out pattern.
* **Cloudflare R2** — S3-compatible object storage with zero egress fees. Holds uploaded CSVs, generated images, PDF exports, workspace logos. Accessed via signed URLs with expiry.
* **External Services** — every vendor API the platform calls. AI providers (OpenAI, Anthropic, Perplexity, Gemini) and image generation (Nano Banana 2) are always called via the foundation `LLMProvider` and `ImageProvider` abstractions, never directly. Whisper handles audio transcription for Module 4. Stripe handles billing. Resend sends transactional email. Customer-optional integrations (GSC, GA4, WordPress, Webflow) use per-workspace OAuth credentials from the encrypted credentials vault. Google AI Overviews tracking is deferred to Phase 2 (no SerpAPI/DataForSEO in Module 1).
* **Cross-cutting services** — Sentry captures errors from frontend and backend. PostHog tracks product events and serves feature flags. Durable Objects hold rate-limit counters (replacing Upstash Redis) and any state requiring strong consistency. The LLM trace table (in Turso) records every LLM and image provider call with its cost, latency, and correlation ID for debugging and cost attribution.

**Two architectural principles encoded in this diagram:**

1. **Monolith deployment, modular internals.** The Browser, edge runtime, and middleware all deploy as one Cloudflare Pages project. Internally, the API routes branch into per-module namespaces, and modules are rigorously isolated (see Section 14). One deploy, one rollback, one monitoring target.
2. **Every external vendor is abstracted.** No module code calls OpenAI's SDK or Stripe's SDK directly. They call foundation abstractions, which handle retries, logging, cost tracking, and vendor-swap capability. The architecture supports swapping any LLM provider, image provider, auth provider, or database vendor with changes isolated to the foundation layer.

*A visual version of this diagram is available in the repo at `architecture-page-1.png` and `architecture-page-2.png` for use in slide decks and docs where images render better than ASCII.*

![architecture.png](https://github.com/ContentOperations/docs/blob/main/photos/architecture.png)

### 4.3 Two Representative Request Flows

**Synchronous: user opens the Visibility dashboard**

1. Browser requests `/app/visibility` (React Server Component).  
2. Middleware reads session cookie, validates with Clerk, resolves `workspace_id`.  
3. Middleware checks rate limit for this workspace \+ endpoint in Durable Objects.  
4. Middleware verifies workspace has Module 1 entitlement (active subscription \+ feature flag).  
5. Server component queries Turso via the workspace-scoped query builder; tenant isolation enforced at the application layer.  
6. HTML streams to browser with data already filtered.  
7. Client components hydrate, subscribe to any real-time updates.  
8. Any error goes to Sentry. Page view event goes to PostHog.

**Asynchronous: user runs a Module 3 workflow**

1. User selects a workflow template (e.g., "Comparison page for competitor X"), fills brief, clicks Run.  
2. API route validates input, checks quota, persists a `workflow_run` record, enqueues a Queue message `workflow.run.start`.  
3. Queue consumer loads workflow definition, executes steps in order. Each step is a queue message handler (fetch, analyze, generate text, generate image, evaluate, format) with state persisted between steps.  
4. Interactive nodes pause execution (the consumer stops advancing state) and emit an event the UI can subscribe to; user reviews, edits, approves, and a new queue message resumes execution.  
5. Each LLM and image call goes through the provider abstraction, logged to traces.  
6. On completion, outputs (draft content, generated images) stored to Turso and R2, scoped to `workspace_id`.  
7. User notified in-app and (optionally) by email.  
8. Failed messages retry per Queue policy; persistent failures land in the dead-letter queue and surface in Sentry.

### 4.4 Module Boundaries and Isolation

A module is a **vertical slice** containing:

- Its UI routes (under `src/app/app/<module>/`)  
- Its API routes (under `src/app/api/modules/<module>/`)  
- Its business logic and services (under `src/modules/<module>/`)  
- Its Queue consumers and cron handlers (under `src/modules/<module>/jobs/`)  
- Its Zod schemas (under `src/modules/<module>/schemas/`)  
- Its DB tables (prefixed `<module>_` in Postgres)  
- Its tests (colocated)

A module **never** imports from another module. If shared logic is needed, it is promoted to the foundation layer. This rule is enforced by an ESLint boundary plugin, not just convention.

The foundation layer exposes only stable, well-typed interfaces — modules depend on foundation abstractions, never on foundation internals.

## 5\. Data Model (Conceptual)

This section describes entities and relationships at the conceptual level. Exact column names, data types, constraints, and indexes live in database migrations (applied via the Turso CLI against libSQL/SQLite), which are the source of truth for the database schema.

### **5.1 Foundation Entities**

**User (Auth)** — managed by Clerk. Holds only authentication data: Clerk user ID (canonical string), email, password hash (managed by Clerk), email verification status, 2FA factors, last sign-in timestamp, OAuth provider metadata. Application code never writes to Clerk's user store directly; it references users by their Clerk user ID and treats Clerk as the system of record for identity. Clerk webhooks notify the application of user lifecycle events (created, updated, deleted).

**Profile** — the application-managed counterpart to User, stored in the `profiles` table. Holds display-facing and preference data: display name, avatar URL, job title, timezone, locale, notification preferences, onboarding completion state, timestamps. Linked one-to-one to User via the Clerk user ID (`profile.clerk_user_id`). A Clerk webhook hits the application on user creation and creates the default profile row, so the profile always exists before the user's first authenticated request.

**Workspace Member** — the association between a User and a Workspace, stored in `public.workspace_members`. Holds role (currently always `owner` under the single-owner model) and timestamps. Having this as a distinct table — rather than a `workspace.owner_id` column — is deliberate: it makes the eventual migration to multi-user teams a non-breaking change rather than a schema rewrite.

**Workspace** — the tenant boundary. The unit of data isolation, billing, and module entitlement. Every tenant-specific row in the entire database has a `workspace_id`.

**Subscription** — a Stripe subscription linked to a workspace. Tracks plan tier, status, current period dates, and per-module entitlements derived from the plan.

**Feature Flag** — per-workspace toggle. Used for module entitlements, beta access, and experimental features. Checked on every request that touches a gated resource.

**Audit Log** — append-only record of security-sensitive actions: login, logout, password change, 2FA change, subscription change, data export, destructive operations. Includes actor, action, resource, IP, user agent, timestamp.

**LLM Trace** — one row per LLM or image provider call. Captures provider, model, input reference, output reference, tokens consumed, latency, cost, workspace, module, and correlation ID. Enables cost attribution, debugging, and eval replay.

**Notification** — any email or in-app message sent to a user. Logged for audit and troubleshooting.

**Usage Counter** — per-workspace, per-module, per-period tallies of metered resources. Drives usage-based billing and quota enforcement.

**Workflow Definition** — a typed, serialized description of a multi-step content-generation process. Owned either by the platform (templates) or by a workspace (custom workflows). Consists of nodes, edges, and workflow-level metadata.

**Workflow Run** — a single execution of a workflow for a workspace, with input parameters, step-by-step execution state, and output references.

**Content Brief** — structured input captured before a workflow runs. Contains positioning notes, constraints, audience, tone directives, and any workflow-specific parameters.

### 5.2 Per-Module Entities (Referenced, Detailed in Module Sections)

| Module | Core Entities |
| :---- | :---- |
| Visibility | Tracked Brand, Tracked Competitor, Tracked Query, Visibility Run, Run Result, Mention |
| Content Audit | Content Source, Content Page, Audit Run, Page Score, Page Verdict, Fix Recommendation |
| Content Workflows | Workflow Template (shared platform-owned), Custom Workflow, Workflow Run, Content Draft, Draft Revision, Published Output |
| Voice Engine | Voice Corpus, Voice Sample, Style Profile, Content Brief (Voice), Draft |

Exact schemas live in migrations.

### 5.3 Tenancy Rule

Every table that holds tenant-specific data has a non-nullable `workspace_id` column with a foreign key to the workspaces table. Every query against such a table must go through the workspace-scoped query builder, which forces a `workspace_id = ?` predicate on all reads and writes. Integration tests include cross-tenant leak tests for every tenant-scoped table: create a row in workspace A, attempt to read/write it as workspace B, assert failure. This rule admits no exceptions — the database itself cannot enforce isolation (SQLite has no RLS), so the application-layer query builder and its test coverage are the sole defense.

Foundation tables that are inherently global (pricing plans, workflow templates, countries) may omit `workspace_id` but are read-only to all workspaces and writable only by service-role operations.

### 5.4 Soft Delete vs Hard Delete

- **Soft delete** (mark `deleted_at`) for customer-facing entities the user might restore: workspaces (30-day grace), content pages, drafts, custom workflows.  
- **Hard delete** for ephemeral or regeneratable data: trace rows older than retention period, notifications older than retention period, usage counters for past periods after roll-up.  
- **GDPR deletion** (hard delete on customer request) cascades through all workspace data, with audit log entry preserved.

### 5.5 Data Retention

| Data | Retention |
| :---- | :---- |
| Raw LLM response bodies | 90 days |
| Aggregated report results | Indefinitely while subscription active |
| Audit log | 1 year minimum |
| Deleted workspace data | 30-day grace, then hard-deleted |
| Trace rows (without bodies) | 180 days for cost analysis |
| Customer content (uploads, blog ingests) | While subscription active \+ 30 days |
| Workflow runs | Indefinitely while subscription active; archived after 6 months |
| Generated drafts (unpublished) | 90 days, then prompted for archive or delete |

Retention is enforced by Cloudflare Workers cron-triggered jobs that run against Turso, not by application code.

---

## 6\. Security Posture

Security is a first-class pillar. The platform is used by B2B businesses entrusting us with competitive intelligence, content strategy, and published content assets. Failure in security is a failure of the product, not a separate concern.

### 6.1 Threat Model

Realistic threats defended against:

1. **Cross-tenant data leak** — a bug or SQL injection allowing workspace A to see workspace B's data. Highest-severity risk; defended at the application layer via workspace-scoped query builders and cross-tenant leak tests (SQLite has no RLS, so the database itself is not an independent defense).  
2. **Credential theft** — weak passwords, phishing, session hijacking, leaked tokens.  
3. **Prompt injection / data exfiltration via LLM** — malicious content in ingested data manipulating LLM outputs to leak or corrupt data.  
4. **Billing fraud** — Stripe webhook spoofing, replay attacks, or bypasses.  
5. **Denial of service / cost amplification** — attacker running up LLM API costs by flooding requests.  
6. **Insider access misuse** — founder/Claude Code inadvertently exposing data in dev environments, logs, or error reports.  
7. **Dependency supply-chain attacks** — compromised npm packages.  
8. **Malicious workflow** — a custom workflow configured to exfiltrate data or abuse integrations.

Out of scope: nation-state adversaries, DDoS at scale beyond what Cloudflare absorbs, physical security of infrastructure.

### 6.2 Authentication

- Password hashing managed by Clerk (industry-standard algorithm, salted, rotated as Clerk updates its auth infrastructure).  
- Minimum password policy: 12+ characters, complexity rules, breached-password check against Have I Been Pwned API on signup and password change.  
- Email verification required before first login.  
- TOTP 2FA available from day one; encouraged for all accounts.  
- Magic link login available as alternative to password.  
- Session cookies are HTTP-only, `Secure`, `SameSite=Lax`, with sliding expiration and absolute maximum lifetime.  
- CSRF tokens on every state-changing request.  
- Rate limits on login, signup, password reset, and 2FA verification endpoints — per IP and per user.  
- Account lockout after repeated failed login attempts, with exponential backoff.

### 6.3 Database-Layer Security

- **Workspace-scoped query builder is the sole path to tenant data.** Every read and write against a tenant-scoped table must go through a typed builder that requires a `workspace_id` parameter and injects it as a predicate. Direct database client access from module code is forbidden by an ESLint rule that allows imports only from the foundation's database module.  
- **Cross-tenant leak tests are mandatory for every tenant-scoped table.** CI runs positive tests (workspace A reads its own data) and negative tests (workspace A attempts to read workspace B's data; must fail). A new tenant-scoped table cannot be merged without these tests.  
- **Turso auth tokens** are treated like service credentials. The application's token grants full database access and is used only in trusted server-side contexts (Queue consumers, Stripe webhooks, admin scripts, authenticated API routes). Never exposed to client. ESLint rule prevents accidental client-side import.  
- **Parameterized queries only**; no string-concatenated SQL. The Drizzle ORM (or equivalent) enforces this by default.  
- Every foreign key to `workspaces` is indexed.  
- Destructive operations require explicit migration review; cannot be executed from application code.  
- *Honest trade-off note*: Because SQLite lacks Postgres RLS, a bug in the query builder or a module that bypasses it could leak data across tenants. This is the cost of the edge-native, near-zero-infrastructure architecture choice. The compensating controls above (single-path query builder, mandatory leak tests, ESLint boundary) are the defense.

### 6.4 Secrets Management

- No secrets in source code, ever. Enforced by `gitleaks` in CI.  
- Local development: `.env.local` (gitignored) with development-only credentials.  
- Staging and production: Cloudflare Pages environment variables scoped per environment.  
- Rotation policy: API keys rotated quarterly; Stripe restricted keys by default; Turso auth tokens rotated on any suspected exposure.  
- Separate API keys for dev, staging, prod.  
- Customer-provided integration credentials (WordPress app passwords, Webflow tokens) encrypted at rest using envelope encryption with a platform-level key.

### 6.5 API Security

- Every API route validates input with a Zod schema. Malformed requests rejected before any business logic runs.  
- API routes are authenticated by default; explicit opt-in for public routes.  
- Per-workspace rate limits on all authenticated endpoints. Per-IP rate limits on auth endpoints.  
- Request size limits: typical 1 MB; higher only for explicit upload endpoints.  
- CORS policy: strict allowlist, no wildcards.  
- Security headers on all responses: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`, `Referrer-Policy`.  
- API responses never include stack traces or internal error details in production.

### 6.6 LLM-Specific Security

- **Prompt injection defense**: user-provided input is sanitized and delimited clearly in prompts. Instructions to the LLM are separated from user content via structured message roles.  
- **PII detection**: content ingested into RAG systems (Module 2 blog content, Module 4 voice corpus) is scanned for PII before embedding. Configurable redaction at ingestion.  
- **Provider data-retention settings**: each provider configured for zero data retention where supported (OpenAI ZDR, Anthropic no-training, Google data governance). Settings verified per provider quarterly.  
- **Output filtering**: LLM outputs that will be shown to end users or published pass through a safety and hallucination filter where the use case warrants it.  
- **Injection in retrieval**: when RAG retrieves content, retrieved content is treated as untrusted — instructions embedded in retrieved text must not manipulate the system prompt. Defended via strict prompt templates.  
- **Cost amplification defense**: per-workspace quotas on LLM calls and image generations, with hard cutoffs at plan limit \+ grace margin. Alerts at 80% quota consumption.

### 6.7 Workflow-Specific Security

Because Module 3 allows users to customize workflows, additional controls are required:

- **Workflow sandboxing**: custom workflows cannot invoke arbitrary URLs. All external fetches go through a centrally-controlled allow-list plus per-workspace approved-domain list. Preventing SSRF is critical.  
- **Node-type restrictions**: users can only use platform-provided node types. They cannot inject custom code. New node types are added by the platform, not by users.  
- **Data access scoping**: workflow nodes operate only on data from the workspace running the workflow. Cross-workspace data access is impossible at the runtime level.  
- **Publishing destination verification**: when a workflow publishes to WordPress/Webflow, the destination must be pre-verified by the workspace owner (one-time OAuth/token setup with confirmation).  
- **Template audit**: platform-provided workflow templates are reviewed by maintainers before publication. User-created workflows are private to the workspace and not shared until a marketplace exists (deferred).

### 6.8 Data Handling

- Encryption at rest: Turso infrastructure-layer AES-256. Customer-provided credentials additionally encrypted with platform key.  
- Encryption in transit: TLS 1.3 minimum; HSTS enforced.  
- PII tagging: any column potentially containing personal data is documented as such. PII in logs is forbidden.  
- Customer data export: one-click JSON export per GDPR Art. 20\.  
- Customer data deletion: one-click deletion per GDPR Art. 17, cascading through all workspace data, with audit log of the deletion action itself preserved.  
- Backups: Turso point-in-time recovery and daily logical dumps to R2 cold storage.  
- No sensitive data in URLs, query strings, or referrer headers.

### 6.9 Audit Logging

Every security-sensitive action generates an immutable audit log entry:

- Authentication events (login, logout, failed login, password change, 2FA enable/disable)  
- Authorization changes (subscription change, module entitlement change)  
- Data export  
- Data deletion  
- Workspace creation or deletion  
- Billing changes  
- Integration credential addition or removal  
- Custom workflow creation or modification  
- Publishing actions (content sent to WordPress/Webflow)  
- Admin/impersonation actions

Audit log entries cannot be modified or deleted by application code. Retention: minimum 1 year.

### 6.10 Billing Security

- Stripe webhook signature verification is mandatory.  
- Idempotency keys on all payment-relevant operations.  
- Clear separation between Stripe source of truth and local DB: every webhook re-syncs the affected subscription state.  
- Payment details never stored on our servers; Stripe Elements used for all card input.  
- Disputed charges and chargebacks tracked as first-class events with defined handling procedure.

### 6.11 Operational Security

- Dependabot enabled for automated security updates.  
- `npm audit` runs in CI; high-severity vulnerabilities fail the build.  
- Incident response protocol documented: detection → containment → customer notification → post-mortem.  
- Security contact email published at `/security` page.  
- Vulnerability disclosure policy published.  
- No production database access from personal laptops; all production data access via Turso console with MFA.

### 6.12 Security Review Cadence

- Weekly: review Sentry for security-flavored errors, review Clerk auth logs for anomalies.  
- Monthly: review audit log for unusual patterns, review dependency vulnerabilities.  
- Quarterly: rotate API keys, review workspace-scoped query builder for regressions, review user account list.  
- On every module ship: security review checklist (Section 7.6).

## 7\. Testing Strategy

Testing is a first-class pillar. The combination of a solo maintainer, paying customers, and non-deterministic LLM outputs makes comprehensive testing essential for sustainable velocity.

### 7.1 Testing Philosophy

- **Write tests for behavior, not implementation.** Tests survive refactors.  
- **Tests are documentation.** A well-tested module is easier to understand than a documented one.  
- **Confidence before coverage.** Prefer 70% coverage of hard-to-reproduce logic over 95% coverage of trivial getters.  
- **CI is the gatekeeper.** If tests don't pass, code doesn't merge to `main`. No exceptions.

### 7.2 Test Layers

**Unit tests (Vitest)**

- Every utility function, pure logic module, provider adapter.  
- Mock external APIs and database.  
- Fast — target full unit suite under 30 seconds.  
- Coverage target: 80%+ on business logic layers.

**Integration tests (Vitest \+ local Turso)**

- Database queries with workspace-scoping exercised against real local SQLite (Turso dev mode).  
- API route handlers tested end-to-end with real DB, mocked external services.  
- Queue consumer handlers tested with mocked provider calls.  
- Cross-tenant leak tests: create user in workspace A, attempt to read workspace B's data, confirm failure. Required for every tenant-scoped table.  
- Workflow engine tests: define a test workflow, execute it, verify each node ran correctly and outputs chained.  
- Slower — runs in CI on every PR.

**E2E tests (Playwright)**

- Critical user journeys only: signup, onboarding, primary happy path per module, payment, running a workflow.  
- Run against preview deployment on every PR.  
- Visual regression on key dashboard pages.

**Security tests (automated)**

- Workspace-scoping verification across all tenant tables (cross-tenant leak tests).  
- Authentication bypass attempts.  
- Input validation fuzzing on critical endpoints.  
- Rate limit enforcement verification.  
- Secret leakage scan on built bundle.  
- CSP header verification.  
- Workflow SSRF prevention (attempt to call disallowed URLs via custom workflow).

**LLM evaluation (per module)**

- Golden dataset per module: handcrafted input-output pairs representing good and bad outputs.  
- Regression tests: if a prompt or model change drops accuracy below threshold, CI fails.  
- Non-determinism handled by running N times and measuring aggregate metrics, not pass/fail per run.  
- Prompt injection test suite: known attack patterns tested against every user-input-to-LLM flow.

**Load tests (manual, before major releases)**

- k6 or Playwright scripts simulating concurrent load.  
- Primary scenario: 100 workspaces hitting weekly visibility runs simultaneously.  
- Secondary scenario: 50 workspaces running Module 3 workflows simultaneously.  
- Identify bottlenecks before customers do.

### 7.3 Test Data Strategy

- Test fixtures for common entities (test workspace, test user, test subscription, test workflow templates).  
- Database reset to known state between integration tests.  
- Factories over fixtures for complex object graphs.  
- No production data in tests. Ever.

### 7.4 What Does Not Get Tested

Explicitly accepting the tradeoff:

- Turso client internals (trusting the vendor).  
- Third-party SDK behavior (mocked, not exercised).  
- UI visual pixel-perfect rendering.  
- Extremely rare error paths with minimal blast radius.

### 7.5 Pre-Merge Checklist

Every PR must pass, gated by CI:

- Lint and type-check clean  
- Unit tests pass  
- Integration tests pass  
- Affected E2E tests pass  
- Security test suite passes  
- No new high-severity dependency vulnerabilities  
- Coverage not decreased on touched files

### 7.6 Per-Module Ship Checklist

Before a module ships to production:

- All test layers green  
- Workspace-scoped query builder tests for new tables (including cross-tenant leak tests)  
- Security review checklist completed  
- Rate limits configured on new endpoints  
- Audit logging covers new sensitive actions  
- Feature flag exists to toggle module on/off  
- Rollback plan documented  
- Cost projection validated with dry run  
- Observability dashboard updated  
- At least one internal dogfooding cycle with real data

## 8\. Shared Foundation Services

The foundation layer provides shared services that every module consumes. It is deliberately small. Modules depend on these abstractions; they never depend on foundation internals or vendor SDKs directly.

### 8.1 Authentication & Session

**Responsibility**: sign up, log in, log out, password reset, 2FA, session management, current-user resolution.

**Provided by**: Clerk, wrapped in a thin adapter that exposes `getCurrentUser()`, `requireAuth()`, `requireWorkspaceAccess(workspaceId)` helpers.

**Contract**: every authenticated request resolves a current user and current workspace before any business logic runs. Unauthenticated access to authenticated routes returns 401\.

### 8.2 Workspace Context

**Responsibility**: resolve the current workspace for every request. Enforce user access. Load relevant workspace metadata (plan, entitlements, settings).

Contract: every authenticated request exposes { user, workspace, entitlements } to downstream handlers. No module code re-checks workspace access; it trusts the context.

8.2a Profile Service

**Responsibility**: manage application-side user data that lives outside Clerk — display name, avatar, timezone, locale, notification preferences, onboarding state.

**Provided by**: a thin service layer over the `profiles` table, exposing typed read and update functions.

**Contract**:

* `getCurrentProfile()` — returns the profile row for the currently authenticated user, always non-null after signup (guaranteed by the auto-create trigger).  
* `updateProfile(patch)` — partial update of editable fields. Validates via Zod.  
* `uploadAvatar(file)` — uploads to Cloudflare R2 under a user-scoped path, writes the resulting URL to the profile, returns the new URL.  
* `getNotificationPreferences(userId)` — returns per-notification-type preferences for email and in-app channels.  
* `setNotificationPreferences(userId, patch)` — updates preference flags.  
* `markOnboardingComplete()` — flips the onboarding completion flag; emits a PostHog event.

**Separation rule**: the Profile service never touches Clerk's user store. Password changes, email changes, 2FA enrollment, and session management all go through Clerk helpers in the `auth/` foundation module. This split keeps auth-layer concerns isolated from application-layer user data.

**Avatar storage**: avatars live in a dedicated Cloudflare R2 bucket. Access is controlled via signed URLs with short expiry; the R2 bucket has no public list access. Each user's objects are scoped under a `users/{clerk_user_id}/` prefix enforced by the upload helper.

**Extension point**: new profile fields are added via schema migrations and exposed through the same service interface. No other foundation module or business module is affected.

### 8.3 LLM Provider Abstraction

**Responsibility**: unified interface for text LLM calls across OpenAI, Anthropic, Perplexity, Google Gemini.

**Contract**: a module calls `LLMProvider.complete({ provider, model, messages, ... })` and receives a normalized response. The abstraction handles:

- Routing to the correct vendor SDK  
- Retry with exponential backoff on transient failures  
- Timeout enforcement  
- Trace row insertion  
- Cost accounting against workspace quotas  
- Rate limit check before the call  
- Error normalization

**Extension point**: adding a new provider \= implementing the `LLMProvider` interface and registering it. No module code changes.

### 8.4 Image Provider Abstraction

**Responsibility**: unified interface for image generation, initially backed by Google Nano Banana 2\.

**Contract**: a module calls `ImageProvider.generate({ prompt, resolution, aspectRatio, style, ... })` and receives a generated image stored in Cloudflare R2 with a persistent URL and metadata record. Handles:

- Vendor API call (Nano Banana 2 via Gemini API)  
- Storage upload to Cloudflare R2 with signed-URL access control  
- Image metadata record (prompt, model, resolution, cost, workspace, module, associated entity)  
- Cost accounting  
- Content moderation check on prompt  
- Automatic batch mode selection for non-urgent workflows (50% cost savings)

**Extension point**: new image provider \= implement `ImageProvider`, register it.

### 8.5 Audio Transcription Service

**Responsibility**: transcribe audio uploads (primarily for Module 4 voice-note input).

**Contract**: `TranscriptionProvider.transcribe(audioRef)` returns text with confidence scores and optional speaker labels. Handles provider call, cost tracking, and storage of transcripts linked to source audio.

### 8.6 Background Job Runner

**Responsibility**: schedule, execute, observe, retry background jobs.

**Provided by**: Cloudflare Workers Cron Triggers (for scheduled jobs) and Cloudflare Queues (for durable fan-out and multi-step orchestration), wrapped in module-specific handler definitions.

**Contract**: any operation that takes more than a few seconds, calls an external API, or requires multi-step orchestration is decomposed into one or more Queue messages. Each message handler is a durable unit of work with automatic retry and dead-letter queue on persistent failure. Multi-step workflows chain messages by enqueueing the next step from the current handler, with per-step state persisted to the database.

### 8.7 Workflow Engine

**Responsibility**: define, execute, observe, and version typed multi-step workflows. Used primarily by Module 3 but available to any module that needs to compose operations.

**Contract**:

A **workflow** is a directed graph of typed nodes with edges connecting outputs of one node to inputs of another. The workflow definition is a serializable JSON document. The engine executes a workflow by:

1. Validating the definition (all nodes known, all edges type-compatible, no cycles unless explicitly allowed)  
2. Topologically ordering nodes  
3. Running each node in order as a durable Queue message handler (retries on transient failure; dead-letter queue on persistent failure)  
4. Passing outputs as inputs to downstream nodes  
5. Pausing at interactive nodes that require user review before continuing  
6. Completing or failing with per-node error context

**Node types** (platform-defined, not user-extensible):

| Category | Example Node Types |
| :---- | :---- |
| Input | brief input, data source (CSV, URL, Sheet), voice corpus selection |
| Fetch | fetch page, fetch sitemap, fetch competitor changelog, fetch review site, fetch audit findings from Module 2 |
| Analyze | extract features, compute similarity, classify, score |
| Generate | generate text (with prompt template), generate image, generate outline |
| Evaluate | LLM-as-judge, regex check, length check, brand compliance check |
| Transform | format as Markdown, format as HTML, clean HTML, convert to social format |
| Publish | publish to WordPress, publish to Webflow, export PDF, send email |
| Interactive | user review, user edit, user approval, A/B selection |

Each node type has:

- A defined input schema (Zod)  
- A defined output schema (Zod)  
- An execution function (pure or async)  
- Cost metadata (estimated tokens, images, etc.)  
- An optional UI component for configuring the node

**Workflow templates** are platform-owned workflow definitions that ship with the product. Customers start from a template, customize parameters, and run it. Templates are versioned; running a workflow pins to the template version at start to prevent mid-run changes.

**Custom workflows** are workspace-owned and not shared across tenants. Users create a custom workflow by starting from a template and modifying, or (in later phases) by building from scratch.

**Interactive nodes** pause workflow execution and emit an event the UI subscribes to. When the user acts (edit, approve, regenerate), the workflow resumes from the paused step.

**Versioning**: every workflow definition has a version. Every workflow run pins to a specific version. When a template updates, in-flight runs complete on the old version; new runs use the new version.

**Extension point**: new node types added by the platform follow the node interface. Modules consuming workflows can add module-specific node types (e.g., Module 2 contributes "fetch audit findings" node).

### 8.8 Content Brief & Draft Service

**Responsibility**: standardize how briefs are captured before content generation and how drafts are managed through review cycles.

**Contract**:

- Briefs captured against a schema per use case (comparison page brief, blog post brief, social post brief).  
- Drafts stored with full revision history.  
- Section-level regeneration supported: a draft is broken into sections; each section can be independently regenerated while others remain locked.  
- User edits preserved even when surrounding sections regenerate.  
- Approval flow: draft → review → approved → published (or exported).

### 8.9 Billing & Subscriptions

**Responsibility**: manage Stripe subscriptions, sync state to local DB, enforce plan entitlements, track metered usage.

**Contract**:

- Modules call `requireEntitlement(workspace, 'module-N')` before executing gated logic.  
- Modules call `recordUsage(workspace, 'llm_queries' | 'images_generated' | 'pages_audited' | 'workflow_runs', count)` after metered operations.  
- Stripe webhooks are processed centrally, updating the local subscription row atomically.

### 8.10 Email

**Responsibility**: send transactional emails.

**Contract**: modules call `sendEmail({ to, template, data })`. Templates live in a shared location, rendered with React Email. All sends are logged to the notification table.

### 8.11 Observability

**Responsibility**: capture errors, record events, trace operations.

**Components**:

- Sentry SDK in frontend and backend; captures unhandled errors and explicit exception captures.  
- PostHog SDK for product analytics; standardized event naming convention.  
- LLM trace table as described in Sections 5.1 and 8.3.  
- Structured logging with correlation IDs flowing from request through to background jobs.  
- Workflow run history with per-step timing and cost.

**Contract**: every meaningful operation produces at least one observable artifact. If it's not observable, it didn't happen.

### 8.12 Feature Flags

**Responsibility**: per-workspace toggles for module access, beta features, experimental rollouts.

**Provided by**: PostHog feature flags, with fallback to a local DB table for critical flags (module entitlements) that must work even if PostHog is down.

**Contract**: every module entry point checks the relevant feature flag before rendering UI or executing logic. A customer without the entitlement sees a graceful upgrade prompt, not an error.

### 8.13 Rate Limiting

**Responsibility**: prevent abuse, runaway costs, and resource exhaustion.

**Provided by**: Cloudflare Workers Rate Limiting API for simple per-endpoint limits, plus Durable Objects for anything requiring strong consistency (per-workspace counters, sliding windows). Accessed via a thin helper.

**Contract**: middleware applies default rate limits per workspace and per IP. Modules can override limits per endpoint. Exceeded limits return 429 with appropriate `Retry-After` headers.

### 8.14 Audit Logger

**Responsibility**: record security-sensitive actions.

**Contract**: modules call `audit({ actor, action, resource, metadata })` for any operation worth tracking per Section 6.9. Append-only from the application's perspective.

### 8.15 Integration Credentials Vault

**Responsibility**: securely store and retrieve per-workspace credentials for third-party integrations (WordPress, Webflow, GSC, GA4).

**Contract**: credentials encrypted at rest with envelope encryption. Retrieved only by server-side code that needs them. Access logged to audit log. Rotation and revocation supported.

## 9\. Module 1 — Visibility

### 9.1 Purpose

Track how often a customer's brand and their competitors are mentioned across ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews when buyers ask category-relevant questions. Surface the trend over time, what AIs say about each brand, and which sources AIs cite.

### 9.2 User Stories

- As a marketing head, I want to see, for each of my target buyer queries, whether my product is mentioned across major AI search surfaces.  
- As a marketing head, I want to compare my mention frequency and sentiment against my top 3–5 competitors.  
- As a marketing head, I want a weekly email digest summarizing changes week-over-week.  
- As a marketing head, I want to see which sources AIs cite when they talk about my category.  
- As a marketing head, I want to know when a competitor starts being mentioned more often than me.

### 9.3 Core Entities

- **Tracked Brand** — the workspace's own product being monitored.  
- **Tracked Competitor** — a competitor to monitor alongside the brand.  
- **Tracked Query** — a natural-language query a buyer might ask.  
- **Visibility Run** — a scheduled or ad-hoc execution of all tracked queries across all providers for one workspace.  
- **Run Result** — one row per (query × provider × run), storing raw response and parsed structure.  
- **Mention** — a parsed instance of a brand or competitor being referenced, with position, sentiment, and context.

### 9.4 External Integrations

- OpenAI (ChatGPT-equivalent queries)  
- Anthropic (Claude queries)  
- Perplexity (with citation capture)  
- Google Gemini (with grounding/search enabled where applicable)  
- *Deferred to Phase 2*: SerpAPI (or DataForSEO fallback) for Google AI Overviews tracking. Module 1 ships with four AI surfaces; Google AI Overviews added when revenue supports the ₹6,000–12,000/month subscription.

All calls go through the `LLMProvider` abstraction. When SerpAPI is added, it will use its own thin adapter following the same tracing and rate-limiting contracts.

### 9.5 Core Business Logic

- **Multi-run aggregation**: each (query × provider) is executed N times (typically 3\) per run to reduce non-determinism. Mentions aggregated across runs.  
- **Mention detection**: handles brand name variations, URL references, pronoun references when preceded by brand name. Starts simple (fuzzy string matching \+ embedding similarity for disambiguation); iterates based on customer feedback.  
- **Sentiment tagging**: each mention classified as positive, neutral, or negative based on surrounding context.  
- **Position tracking**: order in which brands are mentioned is recorded.  
- **Source citation extraction**: Perplexity and grounded Gemini responses include citations; extracted and aggregated per query.  
- **Trend computation**: week-over-week deltas for mention rate, position, sentiment.

### 9.6 Scheduled Execution

Weekly run is the default. Cloudflare Cron Triggers fan-out: one cron invocation per workspace enqueues Queue messages, one message per (query × provider × run). Typical volume per workspace: 10 queries × 5 providers × 3 runs \= 150 provider calls per week.

Ad-hoc runs available as a "refresh now" action, rate-limited per workspace.

### 9.7 UI Surfaces

- Dashboard: current mention rates, trend chart, competitor comparison, recent changes.  
- Query detail: drill into a single query, see full responses across providers, see cited sources.  
- Competitor detail: drill into a single competitor's performance.  
- Settings: add/remove tracked brand, competitors, queries.

### 9.8 Notifications

- Weekly email digest summarizing the week's changes.  
- Alert when a competitor overtakes the customer on a tracked query.  
- Alert when a tracked query stops mentioning the customer entirely.

### 9.9 Success Metrics

- Mention detection accuracy (measured against manually labeled golden dataset).  
- Run completion rate (percentage of scheduled runs completing within SLA).  
- Customer engagement (weekly dashboard views, email open rate).

### 9.10 Known Edge Cases

- Brand names that are common English words (context-aware disambiguation).  
- Providers occasionally refusing queries (retry with prompt variations).  
- Google AI Overviews not appearing for some queries (captured as "no AI Overview," not an error).  
- LLM output format variation across providers (normalized by provider adapters).

## 10\. Module 2 — Content Audit

### 10.1 Purpose

Scan a customer's existing blog and marketing site content. Score each page for AI-readiness. For each page, produce one of five verdicts with a clear recommended action. Connect to Google Search Console and Google Analytics 4 for traffic and engagement signals that materially improve the quality of recommendations.

### 10.2 User Stories

- As a content manager, I want to connect my blog and have every page automatically scored for AI-readiness.  
- As a content manager, I want to know which pages are invisible to LLMs and how to fix them.  
- As a content manager, I want to know which pages are stale and need a refresh.  
- As a content manager, I want to be told which pages are candidates for removal, with a suggested redirect target.  
- As a content manager, I want to find overlapping pages that should be consolidated into one stronger piece.  
- As a content manager, I want a prioritized list ranked by potential impact and confidence.

### 10.3 Core Entities

- **Content Source** — a connection to the customer's content: blog URL, sitemap, CMS API, uploaded files.  
- **Content Page** — a single page scraped from a source, with text, metadata, extracted signals, and optional GSC/GA4 data.  
- **Audit Run** — execution of the audit against a workspace's content.  
- **Page Score** — per-page multi-dimensional score (structure, freshness, answer-directness, citability).  
- **Page Verdict** — one of five verdicts per page, with supporting evidence: healthy, invisible-to-AI, stale, remove-candidate, consolidate-candidate.  
- **Fix Recommendation** — specific actionable recommendation tied to a page, with expected impact.

### 10.4 Five Verdicts and Their Criteria

**Healthy** — page is performing well. Structure is strong, content is fresh, AI mentions are present. Verdict: *keep and monitor*.

**Invisible to AI Search** — page exists and may have traffic, but is not cited or mentioned by AIs for relevant queries. Root causes: weak structure (no clear heading hierarchy, no lists/tables), no direct answer near the top, thin claims (no stats, no data, no named methodologies), long preamble before the payoff. Verdict: *optimize for GEO*.

**Stale** — page content is aging in ways that matter. Dated stats ("in 2023..."), references to deprecated product features, broken external links, named tools that have rebranded or pivoted. Verdict: *refresh with updated information*.

**Remove Candidate** — page is actively harming the site. Requires multi-signal confirmation:

- Low traffic for 6+ months (from GSC/GA4 if connected)  
- No valuable backlinks  
- Not ranked in Google (top 30\) or mentioned by AIs  
- Thin or duplicate content, or  
- About an abandoned product feature or pivoted-away topic, or  
- Violates current brand positioning

Recommendation always includes a suggested 301 redirect target (nearest high-quality page) to preserve any residual link equity. Framed as "review recommended" rather than "delete immediately." No automatic deletion ever.

**Consolidate Candidate** — two or more pages cover semantically overlapping topics and are splitting their own signal. Detected via vector similarity clustering (Turso native vector search, or Cloudflare Vectorize). Recommendation: merge into one stronger piece, redirect the others.

### 10.5 Integrations

- Blog scrapers (RSS, sitemap, direct HTML with Readability extraction).  
- WordPress, Webflow, Contentful API adapters (optional).  
- Google Search Console (OAuth, optional): traffic, impressions, query data per page.  
- Google Analytics 4 (OAuth, optional): engagement signals per page.  
- LLM-based analysis via `LLMProvider`.  
- Turso native vector search (or Cloudflare Vectorize) for semantic similarity and consolidation detection.

### 10.6 Core Business Logic

- **Ingestion**: scrape or pull pages, extract main content with Readability, chunk, embed, store.  
- **Scoring dimensions**: structure, freshness, answer-directness, citability, topical relevance.  
- **Traffic enrichment**: when GSC/GA4 connected, each page enriched with traffic, impressions, position, engagement metrics. Materially improves the confidence of remove and consolidate verdicts.  
- **Verdict assignment**: rule-based with LLM-assisted edge cases. Multi-signal requirements for high-severity verdicts (remove, consolidate).  
- **Prioritization**: sort recommendations by potential impact × confidence. Impact is estimated from traffic (when known) and topical importance. Confidence reflects strength of supporting signals.  
- **Fix recommendations**: rule-based for simple fixes (add an H2, update a stat), LLM-generated for nuanced ones (rewrite the opening for directness).

### 10.7 Scheduled Execution

Initial full audit on connect. Re-audit cadence configurable per workspace (weekly, monthly). Per-page re-audit triggered when source content changes (detected via sitemap lastmod or content hash).

### 10.8 UI Surfaces

- Dashboard: overall content health score, verdict distribution, top-priority fixes, trend chart.  
- Page list: filter by verdict, sort by impact × confidence, bulk actions.  
- Page detail: full score breakdown, verdict rationale, specific recommendations, change history, linked GSC/GA4 data if connected.  
- Consolidation view: clusters of similar pages with merge recommendations.

### 10.9 Notifications

- Post-audit email summarizing top fixes and critical verdicts (especially remove and consolidate candidates).  
- Alert when a high-traffic page drops significantly in score.

### 10.10 Known Edge Cases

- JavaScript-rendered content requiring headless browser.  
- Paywalled or gated content.  
- Very large content libraries (batched audit with progress reporting).  
- Pages ranking for a single valuable keyword despite low overall traffic (GSC data protects against wrongly recommending removal).  
- Non-English content (out of scope initially).  
- Customer not connecting GSC/GA4 (verdicts still produced, with lower confidence on remove/consolidate).

### 10.11 Safety Rails

- Remove and consolidate verdicts always framed as "recommended for review" with clear rationale. Never "deleted automatically."  
- Every destructive recommendation includes the supporting evidence summary so the customer can verify.  
- Link to the page, its GSC data if available, and its similarity cluster members (for consolidation) so the customer makes an informed decision.

## 11\. Module 3 — Content Workflows

### 11.1 Purpose

Module 3 is the platform's content creation engine. It consists of a workflow engine (defined in foundation Section 8.7) plus a library of platform-provided workflow templates covering the most common content-generation jobs B2B marketing teams face. Users pick a template, provide a brief and any required inputs, run the workflow, review and edit each output section, and publish.

This module replaces what earlier planning split into "BOFU Pages," "pSEO Pages," and assorted content-generation tools. Those are now templates within Module 3, not separate modules.

### 11.2 User Stories

- As a marketing team member, I want to pick a "comparison page" template, fill in a brief, and get a first draft in minutes.  
- As an SEO lead, I want to run a programmatic pSEO workflow that generates N pages from a data source, each following a consistent template.  
- As a content creator, I want to review each section of generated content and regenerate only the parts I don't like.  
- As a power user, I want to visually see and edit the workflow that produced my content so I can understand and tweak it.  
- As a content creator, I want the workflow to automatically pull in findings from my Module 2 audit so my refresh workflow knows what to fix.  
- As a publisher, I want to push approved content directly to my WordPress or Webflow site.

### 11.3 Template Library (Platform-Owned)

The platform ships and maintains an opinionated library of workflow templates. Template count grows over time. Initial launch set includes:

- **Comparison Page** — "Your Product vs. Competitor" with feature matrix, positioning, and feature-comparison infographic generated via Nano Banana 2\.  
- **pSEO Page Generator** — template that runs N times against a data source (list of competitors, list of integrations, list of use cases), producing one page per row.  
- **Content Refresh** — takes a page from Module 2's remove/stale verdict and regenerates it using the audit findings as input.  
- **Blog Post from Brief** — multi-section long-form blog post with feature image and suggested inline images.  
- **LinkedIn Post Pack** — a set of 3–5 variations from a single brief.  
- **Product Launch Announcement** — blog \+ social \+ email variants from a single input.  
- **Newsletter Issue** — templated newsletter from a content brief and a curated list of items.

Additional templates added based on customer demand.

### 11.4 Workflow Structure

Every template is a workflow definition composed of nodes from Section 8.7's node catalog. A typical comparison-page workflow looks like this:

          ┌──────────────────────────────┐  
           │  1 · INPUT                   │  
           │  Comparison Brief            │  
           │  Your product · competitor · │  
           │  positioning · tone          │  
           └──────────────┬───────────────┘  
                          │  
          ┌───────────────┴───────────────┐  
          │                               │  
          ▼                               ▼  
┌──────────────────────┐        ┌──────────────────────┐  
│  2a · FETCH          │        │  2b · FETCH          │  
│  Competitor Website  │        │  Review Aggregators  │  
│  Homepage, features, │        │  G2, Capterra,       │  
│  pricing, changelog  │        │  Reddit sentiment    │  
└──────────┬───────────┘        └──────────┬───────────┘  
           │                               │  
           └───────────────┬───────────────┘  
                           │  
                           ▼  
           ┌──────────────────────────────┐  
           │  3 · ANALYZE                 │  
           │  Extract Features            │  
           │  & Positioning               │  
           │  (LLM-driven, both sources)  │  
           └──────────────┬───────────────┘  
                          │  
                          ▼  
           ┌──────────────────────────────┐  
           │  4 · GENERATE                │  
           │  Comparison Outline          │  
           │  Sections, framing, hooks    │  
           └──────────────┬───────────────┘  
                          │  
                          ▼  
           ┌──────────────────────────────┐  
           │  5 · INTERACTIVE (PAUSE)     │  
           │  Review Outline              │  
           │  User approves, edits,       │  
           │  or regenerates              │  
           └──────────────┬───────────────┘  
                          │  
                          ▼  
           ┌──────────────────────────────┐  
           │  6 · GENERATE                │  
           │  Section Drafts              │  
           │  Fans out per section,       │  
           │  merges results              │  
           └──────────────┬───────────────┘  
                          │  
                          ▼  
           ┌──────────────────────────────┐  
           │  7 · GENERATE (IMAGE)        │  
           │  Feature Matrix Infographic  │  
           │  Nano Banana 2 \+ inline imgs │  
           └──────────────┬───────────────┘  
                          │  
                          ▼  
           ┌──────────────────────────────┐  
           │  8 · EVALUATE                │  
           │  Brand Compliance Check      │  
           │  Tone, terminology, claims,  │  
           │  factual accuracy            │  
           └──────────────┬───────────────┘  
                          │  
                          ▼  
           ┌──────────────────────────────┐  
           │  9 · INTERACTIVE (PAUSE)     │  
           │  Review & Edit Draft         │  
           │  Per-section regenerate,     │  
           │  inline edit, approve        │  
           └──────────────┬───────────────┘  
                          │  
                          ▼  
           ┌──────────────────────────────┐  
           │  10 · TRANSFORM              │  
           │  Format for Publishing       │  
           │  Markdown, HTML, CMS-ready   │  
           └──────────────┬───────────────┘  
                          │  
                          ▼  
           ┌──────────────────────────────┐  
           │  11 · PUBLISH                │  
           │  Send Live                   │  
           │  WordPress, Webflow, Export  │  
           └──────────────────────────────┘

**How this workflow runs:**

Users interact with the workflow at the Input node (step 1, to configure the brief) and at Interactive nodes (steps 5 and 9, to review and approve). Other nodes run automatically. Here's what each category contributes:

* **Input (step 1\)** captures the brief — product positioning, competitor details, tone directives, audience. This is the only structured data the user provides before the workflow begins.  
* **Fetch nodes (steps 2a, 2b)** pull external data the workflow needs. These run in parallel since neither depends on the other's output. The results fan in to the next step.  
* **Analyze (step 3\)** is LLM-driven feature extraction. Takes the fetched data, identifies features, positioning claims, and pricing models for both the user's product and the competitor.  
* **Generate (steps 4, 6, 7\)** produces content. Step 4 generates the outline as a scaffold. Step 6 fans out per section — each section runs as a separate Queue message for parallelism — and merges the drafts. Step 7 generates the feature matrix infographic and any inline images using Nano Banana 2\.  
* **Interactive (steps 5, 9\)** pauses the workflow and hands control back to the user. Step 5 is the outline review (catches direction problems before expensive draft generation). Step 9 is the draft review (per-section regeneration, inline editing, final approval). The workflow run state persists across the pause — the user can leave and come back days later.  
* **Evaluate (step 8\)** is an automated quality gate. Runs brand compliance checks on the complete draft — tone, terminology, forbidden claims, factual accuracy. Flags issues to surface in the step 9 review.  
* **Transform (step 10\)** converts the approved draft into the target format — Markdown for export, HTML for direct publishing, platform-specific structure for WordPress or Webflow.  
* **Publish (step 11\)** sends the content live to the user's chosen destination, or produces an export file. This is always an explicit user action, never automatic.

**Key properties of the workflow engine:**

1. **Each step is a durable Queue message handler.** Failures retry individually without losing completed work. A failure in step 7 (image generation) does not throw away the outputs of steps 1–6.  
2. **Interactive steps pause execution indefinitely.** When the workflow reaches step 5, it emits an event and suspends. The UI subscribes to that event and surfaces the review. When the user acts (approve, edit, regenerate), the workflow resumes from that step with the updated input.  
3. **Every LLM and image call is traced.** Every Generate and Evaluate node's provider call writes a row to the trace table with provider, model, tokens, cost, latency, and correlation ID. This enables per-workflow cost attribution and eval replay.  
4. **Workflow definitions are data, not code.** The workflow above is stored as a typed JSON document, not as a hand-written function. This is what lets the same definition power both programmatic execution (run by template) and visual editing (the drag-and-drop builder in Phase C). New templates are authored by defining JSON, not by writing TypeScript.  
5. **Versions pin on run start.** When a workflow run begins, it pins to the current version of the workflow definition. If the template is updated mid-run, the in-flight run continues on the old version; the next run uses the new version.

*A visual version of this workflow diagram is available in the repo at `workflow-comparison-page.png` for use in slide decks and docs where images render better than ASCII.*

![workflow-comparison-page.png](https://github.com/ContentOperations/docs/blob/main/photos/workflow-comparison-page.png)

Users interact with the workflow at Input nodes (to configure) and at Interactive nodes (to review, edit, approve, regenerate). Other nodes run automatically.

### 11.5 Interaction Modes (Phased Rollout)

Three interaction modes will ship in sequence:

**Phase A (initial launch) — Form-Based Template Runner**

Users pick a template. The template exposes a form with the configurable parameters (brief fields, data source selection, publishing destination). Users fill the form, run the workflow, and review outputs in a standard reviewer UI. No visual workflow editing.

This phase validates the template library and engine under real usage.

**Phase B — Section-Level Review and Regeneration**

Output review UI allows per-section regeneration, inline editing, and explicit approval. Users can say "regenerate this section with a more aggressive tone" without touching other sections. Revision history preserved per section.

**Phase C — Visual Workflow Builder**

A drag-and-drop editor (React Flow) exposes the workflow definition visually. Users can:

- View the workflow that produced their content  
- Duplicate a template and modify nodes, edges, or parameters  
- Save custom workflows scoped to their workspace  
- Run custom workflows alongside platform templates

Custom workflows still use only platform-provided node types. No arbitrary code, no arbitrary external URLs (allow-list enforced).

**Phase D (deferred) — Template Marketplace**

A marketplace where customers can share custom workflows and optionally purchase or subscribe to third-party-contributed templates. Deferred to Open Questions; built only when organic template sharing demand is evident and the supply problem can be solved.

### 11.6 Publishing

Generated content can be:

- Previewed in-app  
- Exported as Markdown, HTML, or PDF  
- Copied with platform-optimized formatting (LinkedIn, Twitter, email)  
- Published directly to WordPress or Webflow via authorized integration

Publishing is an explicit user action, never automatic.

### 11.7 Cross-Module Integration

Module 3 consumes outputs from Module 2:

- "Content Refresh" template accepts a Module 2 audit finding as input and generates replacement content.  
- "Consolidation" template accepts a Module 2 consolidation cluster and generates the merged piece.

This is the platform's retention mechanic in action: Module 2's diagnoses drive Module 3's work.

### 11.8 UI Surfaces

- Workflow library: browse and select templates, filter by use case.  
- Template configuration: form-based brief entry, data source selection, publishing destination.  
- Run view: real-time workflow execution, per-node status, interactive pauses surfaced prominently.  
- Draft review: per-section review, regenerate, edit, approve, preview final output.  
- Publication: push to integrated CMS or export.  
- Workflow history: all past runs with inputs, outputs, and revision history.  
- Visual workflow editor (Phase C+): drag-and-drop canvas with template and custom workflow support.

### 11.9 Success Metrics

- Template adoption rate (percentage of active workspaces running a template in the last 30 days).  
- Time-to-published-content (from template start to published output).  
- Regeneration rate per section (lower is better — indicates first-draft quality).  
- Workflow completion rate (percentage of started workflows that reach publication or export).  
- Cost per workflow run versus budget.

### 11.10 Known Edge Cases

- Very long workflows (10+ nodes) stretch beyond Cloudflare Workers' per-invocation CPU-time budget — require planned chunking, with each node as its own Queue message.  
- Interactive pauses lasting days — workflow run state must persist indefinitely.  
- Third-party publishing destination changes (WordPress site moves, Webflow plan changes) — credentials rotation flow required.  
- Image generation failures mid-workflow — workflow continues with placeholder, user notified.  
- Customer hits quota mid-run — workflow pauses with clear upgrade prompt; resumes when quota extended.

### 11.11 Realistic Timeline

Module 3 is the most complex module in the platform. Realistic timeline from build start to Phase A shipping is 2–3 months of focused work. Phase B follows within 4–6 weeks of Phase A. Phase C adds roughly 3–4 weeks beyond Phase B. Phase D is entirely demand-driven.

Module 3 work should not start until Module 1 has paying customers and Module 2 is in production.

## 12\. Module 4 — Voice Engine

### 12.1 Purpose

Generate content that sounds like a specific person or brand — preserving their voice, phrases, cadence, and opinions — using their past writing and speaking as reference material. Defining capability: output that readers of the person's past content cannot distinguish from their own writing.

Module 4 is positioned for a distinct buyer from Modules 1–3: founders, CXOs writing thought leadership themselves, and ghostwriters serving executives. The workflow is personal and iterative rather than team-oriented.

### 12.2 User Stories

- As a founder, I want to record a 5-minute voice note on a topic and get a LinkedIn post that sounds like me.  
- As a founder, I want the tool to learn from my past posts so it preserves my vocabulary, structure, and opinions.  
- As a CMO, I want to generate blog drafts in our brand voice from bullet points or briefs.  
- As a ghostwriter, I want to maintain distinct voice profiles for multiple executive clients in one workspace.  
- As any user, I want to review and refine output iteratively, not accept one-shot drafts.

### 12.3 Core Entities

- **Voice Corpus** — the collection of past writing used as reference for a specific voice.  
- **Voice Sample** — an individual piece in the corpus (blog post, LinkedIn post, email, transcript, interview).  
- **Style Profile** — derived characteristics of the voice: vocabulary patterns, sentence rhythms, typical opinions, structural preferences, topics of authority, forbidden patterns (things this person would never say).  
- **Content Brief (Voice)** — input from user: topic, format, length, audience, voice selection, optional voice note.  
- **Draft** — generated output with section-level revision history.

### 12.4 Integrations

- Audio transcription (via foundation `TranscriptionProvider`) for voice-note input.  
- Import from LinkedIn export, blog crawl, direct paste, uploaded files.  
- `LLMProvider` for draft generation and style-profile derivation.  
- `ImageProvider` (Nano Banana 2\) for feature images and inline visuals in blog drafts.

### 12.5 Core Business Logic

- **Corpus ingestion**: clean, deduplicate, chunk, and embed samples. Extract style markers.  
- **Style profile generation**: LLM-summarized profile treated as part of the generation prompt. Regenerated when corpus grows significantly.  
- **Retrieval-augmented generation**: for each brief, retrieve the most stylistically similar past samples as few-shot examples.  
- **Multi-pass generation**: outline → draft → self-critique (does this sound like the voice?) → refine.  
- **Voice fidelity measurement**: perplexity against corpus plus LLM-as-judge comparison to retrieved samples; surfaced to user as a voice-match score.  
- **Image integration**: for blog drafts, optional feature image generation and suggested inline visuals.

### 12.6 UI Surfaces

- Dashboard: draft queue, recent outputs, corpus health indicator per voice.  
- Corpus management: upload and curate samples, review auto-ingested items, prune outdated or off-brand pieces.  
- Multi-voice management (for ghostwriters): distinct voice profiles per client, each with its own corpus.  
- Brief builder: structured form for topic, format, audience, voice selection, optional voice-note upload.  
- Draft editor: inline editing, per-section regeneration, voice-match score visible, export or publish.

### 12.7 Publishing

- Export as Markdown, HTML, plain text.  
- One-click copy optimized for LinkedIn, Twitter, email.  
- Direct publish to WordPress/Webflow (blog drafts) — optional.

### 12.8 Known Edge Cases

- Small corpora (\<10 samples): voice profile less reliable; warn user, suggest corpus expansion.  
- Voice drift over time (a founder's voice in 2019 differs from 2026): corpus can be time-bounded or "snapshotted."  
- Mixed voices (multiple writers contributing to one brand): multiple style profiles per workspace.  
- Transcripts of spoken content (podcasts, interviews) differ from written voice — handled by separate style dimensions.

### 12.9 Open Positioning Question

Whether Module 4 is best positioned as a module inside GEO Platform or as a distinct sister product with its own brand remains an open question. The buyer and pricing model differ materially from Modules 1–3. This decision is deferred until Modules 1 and 2 are in production and Module 4 is closer to build. Tracked in Section 20\.

## 13\. Cross-Cutting Concerns

### 13.1 Onboarding

- When a new user signs up via Clerk, a Clerk webhook fires into the application and creates a matching row in the `profiles` table with default values. The profile always exists by the time the user reaches the onboarding flow. The webhook is idempotent — repeated delivery of the same `user.created` event is a no-op.  
- First login leads to workspace creation: name, industry, target competitors, initial queries (Module 1 presets), primary content source URL (Module 2 presets), optional GSC/GA4 connection, optional publishing destination setup (WordPress/Webflow).  
- During onboarding, the user also completes a short profile step: display name, timezone, job title, notification preferences. These defaults can be edited later in settings but capturing them upfront improves first-run experience (timezone-aware scheduling, personalized emails).  
- Onboarding doubles as initial data seeding for the chosen workspace.  
- Feature flags determine which onboarding steps are shown based on the plan selected.  
- Onboarding completion is marked on the profile (`onboarding_completed_at` timestamp) and tracked as a PostHog event for conversion measurement.  
- If a user abandons onboarding partway, the next login resumes at the last incomplete step.

### 13.2 Billing Lifecycle

- Signup flow offers a free trial (typically 14 days) with full Module 1 access.  
- Trial end triggers payment prompt; subscription state tracked against Stripe source of truth.  
- Plan changes handled via Stripe Customer Portal.  
- Failed payments enter a Stripe dunning sequence; account moves to read-only after grace period.  
- Cancellation retains data for 30 days, then hard-deletes.

### 13.3 Usage Metering

Metered resources (counted per workspace per billing period):

- LLM text queries executed (all modules, heavy in Module 1\)  
- Pages audited (Module 2\)  
- Workflow runs (Module 3\)  
- Images generated (Modules 3, 4\)  
- Voice drafts generated (Module 4\)

Usage counters incremented atomically during module operations. Quota check happens before the expensive operation; breach returns clear error with upgrade prompt. Overage billing handled via Stripe metered billing or hard cap per plan.

### 13.4 Notifications

All notifications flow through the shared notification service. Each has a template, dispatch trigger, recipient, and log entry. Customers configure per-notification preferences.

Standardized notification types: Digest, Alert, Lifecycle, Transactional.

### 13.5 Data Export

Every module provides a data export endpoint returning the workspace's data for that module as JSON. Platform-level endpoint aggregates across modules for GDPR export. Exports generated async (Cloudflare Queue job), written to R2, and delivered to the user via a signed URL emailed to them.

### 13.6 Admin Tooling

Internal admin operations exposed via a separate admin UI gated by internal-role flag. Every admin action generates an audit log entry including impersonation sessions.

Admin capabilities: view workspace state (read-only), time-bounded user impersonation for support debugging, manually trigger background jobs for a workspace, force-sync subscription from Stripe, extend trials or apply credits.

Never in admin UI: unaudited reads of customer content, unaudited exports of customer data, direct edits to customer data.

## 14\. Folder Structure & Module Isolation

### 14.1 Guiding Principle

Folder structure enforces module isolation physically. Each module lives in its own directory; cross-module imports are rejected by the linter, not merely discouraged.

### 14.2 Top-Level Layout

geo-platform/  
├── src/  
│   ├── app/                           ← Next.js App Router  
│   │   ├── (marketing)/               ← public pages  
│   │   ├── (auth)/                    ← login, signup, password reset, 2FA  
│   │   ├── app/                       ← authenticated app  
│   │   │   ├── layout.tsx             ← app shell, workspace switcher  
│   │   │   ├── page.tsx               ← dashboard landing  
│   │   │   ├── settings/  
│   │   │   │   ├── profile/           ← user profile editing  
│   │   │   │   ├── notifications/     ← notification preferences  
│   │   │   │   ├── account/           ← password, 2FA, sessions  
│   │   │   │   └── workspace/         ← workspace-level settings  
│   │   │   ├── billing/  
│   │   │   ├── integrations/          ← GSC, GA4, WordPress, Webflow  
│   │   │   ├── visibility/            ← Module 1 UI  
│   │   │   ├── audit/                 ← Module 2 UI  
│   │   │   ├── workflows/             ← Module 3 UI  
│   │   │   └── voice/                 ← Module 4 UI  
│   │   └── api/                       ← Next.js route handlers  
│   │       ├── auth/  
│   │       ├── profile/               ← profile read/update endpoints  
│   │       ├── workspace/  
│   │       ├── billing/  
│   │       ├── webhooks/  
│   │       ├── queues/                   ← Cloudflare Queue consumers  
│   │       ├── cron/                     ← Cloudflare Cron Trigger handlers  
│   │       └── modules/  
│   │           ├── visibility/  
│   │           ├── audit/  
│   │           ├── workflows/  
│   │           └── voice/  
│   │  
│   ├── foundation/                    ← shared services (Section 8\)  
│   │   ├── auth/  
│   │   ├── profile/                   ← Profile service (Section 8.2a)  
│   │   ├── workspace/  
│   │   ├── billing/  
│   │   ├── llm/                       ← LLMProvider abstraction  
│   │   ├── image/                     ← ImageProvider abstraction  
│   │   ├── transcription/             ← audio transcription  
│   │   ├── workflow-engine/           ← core workflow runtime  
│   │   ├── content-brief/             ← brief & draft service  
│   │   ├── integrations/              ← credentials vault, OAuth helpers  
│   │   ├── email/  
│   │   ├── observability/  
│   │   ├── feature-flags/  
│   │   ├── rate-limit/  
│   │   ├── audit/  
│   │   └── index.ts                   ← public re-exports only  
│   │  
│   ├── modules/                       ← module business logic  
│   │   ├── visibility/  
│   │   │   ├── services/  
│   │   │   ├── jobs/                  ← Queue consumers & cron handlers  
│   │   │   ├── schemas/               ← Zod schemas  
│   │   │   ├── types.ts  
│   │   │   ├── \_\_tests\_\_/  
│   │   │   └── index.ts               ← module public API  
│   │   ├── audit/                     ← (same structure)  
│   │   ├── workflows/  
│   │   │   ├── services/  
│   │   │   ├── jobs/  
│   │   │   ├── schemas/  
│   │   │   ├── templates/             ← built-in workflow definitions  
│   │   │   ├── nodes/                 ← module-contributed node types  
│   │   │   ├── types.ts  
│   │   │   ├── \_\_tests\_\_/  
│   │   │   └── index.ts  
│   │   └── voice/  
│   │  
│   ├── components/                    ← shared UI components  
│   │   ├── ui/                        ← shadcn primitives  
│   │   └── shared/                    ← cross-module UI (navbar, etc.)  
│   │  
│   ├── lib/                           ← pure utilities  
│   │   ├── utils.ts  
│   │   ├── format.ts  
│   │   └── validation.ts  
│   │  
│   └── types/                         ← shared types  
│       ├── database.ts                ← generated from Drizzle schema  
│       └── api.ts  
│  
├── db/                                ← database schema, migrations, seed  
│   ├── schema.ts                      ← Drizzle schema definitions  
│   ├── migrations/                    ← SQL migrations, one per change  
│   └── seed.ts                        ← local dev seed data  
│  
├── specs/                             ← per-module detailed build specs  
│   ├── module-1-visibility.md  
│   ├── module-2-audit.md  
│   ├── module-3-workflows.md  
│   └── module-4-voice.md  
│  
├── tests/  
│   ├── e2e/                           ← Playwright  
│   ├── integration/                   ← cross-module integration tests  
│   └── fixtures/  
│  
├── scripts/                           ← operational scripts  
├── .github/workflows/                 ← CI pipelines  
├── plan.md                            ← THIS DOCUMENT  
├── CLAUDE.md                          ← Claude Code usage notes  
├── README.md  
└── package.json

**How to read this tree:**

* **`src/app/`** holds Next.js routing — both the UI pages the browser renders and the API endpoints it calls. Both live here because Next.js deploys them as one app.  
* **`src/foundation/`** holds shared services imported by modules. Modules call foundation; foundation never calls modules back. The `index.ts` is the only file that modules are allowed to import from.  
* **`src/modules/`** holds business logic, one folder per module. Each module is self-contained and cannot import from any other module — that rule is enforced by ESLint, not just convention. Module 3 has two extra folders (`templates/` and `nodes/`) because it contributes workflow definitions and node types to the foundation workflow engine.  
* **Settings splits user-level from workspace-level.** `profile/`, `notifications/`, `account/` are about the person; `workspace/` is about the tenant. This separation matters once team features land.  
* **Root-level directories** (`db/`, `specs/`, `tests/`, `scripts/`) support development but aren't part of the running app.  
* **`plan.md` and `CLAUDE.md`** at the root give Claude Code the architectural context it needs on a fresh session.

### 14.3 Module Isolation Rules (Enforced)

1. **No cross-module imports.** `src/modules/visibility/*` may not import from `src/modules/audit/*` or any other module. Enforced via ESLint boundary rules.  
     
2. **Public API via index.ts only.** Each module exposes a single `index.ts` listing what is intentionally public. Consumers import only from the module's index path, never deep into internal files. Enforced via ESLint `no-internal-modules`.  
     
3. **Foundation is imported, never modified.** Modules import from `src/foundation/*` but never modify foundation code as part of module work. Foundation changes go through their own planning step.  
     
4. **Database tables prefixed per module.** Visibility tables prefixed `visibility_`, audit tables `audit_`, workflow tables `workflow_`, voice tables `voice_`. Foundation tables have no module prefix; they sit at the top level of the database alongside `profiles`, `workspaces`, `workspace_members`, `subscriptions`, `audit_log`, `llm_traces`, `notifications`, and `usage_counters`. (SQLite has a flat table namespace — no schemas.) User identity is owned by Clerk and referenced via `clerk_user_id`; the application never stores passwords or auth material locally.  
     
5. **Module jobs registered centrally.** Each module's Queue consumers and cron handlers exported from its `index.ts`; a central registration file composes them so Cloudflare Workers discovers all handlers at deploy time.  
     
6. **Module-specific types stay in the module.** Types shared across modules live in `src/types/`.  
     
7. **Workflow nodes contributed by modules are registered explicitly.** Module 2 may contribute a "fetch audit findings" node; it registers via the foundation workflow engine's node registry, not by reaching across into Module 3\.

### 14.4 Why This Works

- When Module 1 breaks, you open `src/modules/visibility/` and `src/app/app/visibility/`. You do not look anywhere else.  
- When a foundation decision changes, you know every module is affected.  
- When adding a new module, you copy the structure of an existing module and fill in logic.  
- Any developer (or Claude Code in a fresh session) can orient to any module in minutes.

## 15\. Environment Configuration

### 15.1 Environments

- **Local**: developer machine with a local libSQL file (via `turso dev` or a file-backed SQLite instance), `.env.local` for secrets.  
- **Preview**: per-PR Cloudflare Pages preview deployment using a staging Turso database.  
- **Staging**: dedicated environment for dogfooding and pre-release QA.  
- **Production**: customer-facing environment.

### 15.2 Environment Variable Categories

- **Public** (prefixed `NEXT_PUBLIC_`): safe to ship to browser — Clerk publishable key, PostHog public key, Sentry DSN.  
- **Server secrets**: Clerk secret key, Turso database URL, Turso auth token, Stripe secret key, Stripe webhook secret, Resend API key, Cloudflare R2 access key and secret, Cloudflare account ID, all LLM provider API keys, encryption key for integration credentials vault.  
- **Config**: environment name, log level, feature flag defaults, rate limit defaults, content moderation strictness.

Exact variable names defined at implementation time and documented in `README.md`.

### 15.3 Secret Handling Rules

- Secrets never in the repo. Enforced by `gitleaks`.  
- Local secrets in `.env.local`, gitignored.  
- Preview/Staging/Production secrets in Cloudflare Pages, scoped per environment.  
- Rotation documented; calendar reminder quarterly.  
- Separate keys per environment — leaking a staging key must not compromise production.

### 15.4 Configuration vs Code

Everything a non-developer might need to tweak (rate limits, quota defaults, feature flag defaults, email sender addresses, support contact) lives in a central config module, not sprinkled through the codebase.

## 16\. Deployment & CI/CD

### 16.1 Branching Model

- `main` — always deployable. Every merge auto-deploys to production.  
- Feature branches — named by ticket or feature. Open a PR to `main`.  
- PRs require passing CI before merge.

### 16.2 CI Pipeline (GitHub Actions)

Every PR runs:

1. Install dependencies (cached)  
2. Lint and type-check  
3. Unit tests  
4. Integration tests (against ephemeral local Turso/libSQL instance)  
5. E2E smoke tests (against preview deployment)  
6. Security scans (secret scan, dependency audit)  
7. Build check  
8. Test coverage report

PRs cannot merge with failing CI.

### 16.3 Deployment Pipeline

- Merge to `main` → Cloudflare Pages auto-deploys to production.  
- Turso migrations applied manually via the Turso CLI, gated by review.  
- Feature flags used to dark-launch new modules or features to a subset of workspaces before full rollout.  
- Rollback procedure: Cloudflare Pages deployment rollback to previous production build; migration rollback scripts kept alongside forward migrations for destructive changes.

### 16.4 Release Notes

Each production deployment generates a release note entry. Customer-facing changes also published to a changelog page.

### 16.5 Database Migration Discipline

- One migration file per change, timestamped.  
- Workspace-scoping changes in the query builder reviewed especially carefully.  
- Destructive migrations require written rationale in PR description.  
- Migrations are forward-only in production; rollback via a new forward migration, not by reverting.

## 17\. Observability & Operations

### 17.1 What We Observe

- **Application errors** → Sentry (frontend and backend).  
- **Product events** → PostHog (signups, logins, feature usage, conversion, workflow completions).  
- **LLM/image calls** → `llm_traces` table (every call, with cost and latency).  
- **Background jobs** → Cloudflare Workers logs \+ Queue consumer metrics (runs, failures, dead-letter depth).  
- **Workflow runs** → workflow history table with per-node timing, cost, status.  
- **HTTP requests** → structured logs (Cloudflare Workers logs \+ optional log push to R2 or external drain).  
- **Database metrics** → Turso dashboard.  
- **External service health** → synthetic checks against our own public endpoints.

### 17.2 Correlation IDs

Every HTTP request receives a correlation ID in middleware. The ID propagates through:

- Structured logs  
- Sentry error context  
- LLM trace rows  
- Queue messages (when a request spawns a background job)  
- Workflow run nodes  
- Notification sends

When debugging, the correlation ID ties everything together.

### 17.3 Dashboards

Minimum set maintained manually until automation pays off:

- Customer success: active workspaces, weekly engagement, churn signals.  
- Cost: LLM spend per workspace per module, forecast vs actual.  
- Reliability: error rate, p50/p95 latency, job success rate, workflow completion rate.  
- Security: failed login rate, rate-limit triggers, unusual audit log events.

### 17.4 Alerting

Pager-level alerts:

- Production down (health check fails)  
- Error rate spike above baseline  
- Background job or workflow failure rate above threshold  
- Cost spike above forecast by significant margin  
- Security events: multiple failed logins, unusual admin activity

Non-urgent alerts (daily digest):

- New sign-ups, payments, cancellations  
- Weekly customer engagement roll-up

### 17.5 Incident Response

Defined procedure:

1. Detect (automated alert or customer report)  
2. Acknowledge and communicate (status page, direct email if customer-impacting)  
3. Contain (roll back, disable feature flag, or throttle)  
4. Diagnose (logs, traces, reproduction)  
5. Fix and deploy  
6. Post-mortem within 72 hours for customer-impacting incidents  
7. Follow-up actions tracked to completion

Status page hosted on a separate service so it does not share a failure mode with the main application.

### 17.6 Cost Observability

Every LLM and image call records its cost. Nightly job rolls up:

- Cost per workspace per module per workflow  
- Cost variance vs prior period  
- Projection vs budget

Alerts trigger when any workspace crosses plan cost limits or the platform crosses aggregate cost budget.

## 18\. Compliance Posture

### 18.1 Current Posture

The platform is built with industry-standard security practices appropriate for serving mid-market B2B customers. Formal compliance certifications are not pursued initially; the controls such certifications would require are implemented so that pursuing them later is straightforward.

### 18.2 GDPR

- Privacy policy and terms of service published before launch.  
- Data processing agreement available to customers on request.  
- Right to access (Art. 15): workspace data export.  
- Right to erasure (Art. 17): account deletion cascades through all workspace data.  
- Right to portability (Art. 20): data export in structured JSON.  
- Data processing records maintained.  
- Sub-processors listed publicly.

### 18.3 Sub-Processors

Published list:

- Cloudflare (hosting, edge compute, object storage via R2, Queues, Durable Objects, rate limiting)  
- Turso (database)  
- Clerk (authentication and user identity)  
- Stripe (payment processing)  
- Resend (transactional email)  
- Sentry (error tracking)  
- PostHog (product analytics)  
- OpenAI, Anthropic, Perplexity, Google (LLM and image providers)

Each vendor's DPA reviewed and on file. List updated before adding a new sub-processor. (SerpAPI / DataForSEO will be added when Google AI Overviews tracking ships in Phase 2.)

### 18.4 When Compliance Certifications Become Priority

Triggers for formally pursuing SOC 2:

- A customer explicitly requires it for purchase  
- Multiple prospects abandon due to lack of certification  
- Enterprise sales motion begins

At that point, Type I SOC 2 is achievable in 3–6 months given the controls already in place.

## 19\. Build Sequence & Timeline

This section gives Claude Code and the founder a shared expectation of how the platform is built over time.

### 19.1 Phase 1 — Foundation (Weeks 1–2)

Everything in Sections 3–8 except the workflow engine. Auth, workspaces, multi-tenancy via workspace-scoped query builders and cross-tenant leak tests, billing skeleton, LLM abstraction, image abstraction, observability, security primitives, testing harness, CI/CD, folder structure scaffolding.

Outcome: a deployable shell with login, workspace creation, empty dashboard, and all shared services ready to be consumed by modules.

### 19.2 Phase 2 — Module 1 Visibility (Weeks 3–7)

Goal: first paying customer.

Tracked brand, competitors, queries. Cloudflare Cron-scheduled weekly runs fanning out through Queues across 4 providers (OpenAI, Anthropic, Perplexity, Gemini — Google AI Overviews deferred to Phase 2). Dashboard. Weekly email digest. Stripe billing wired up. Landing page.

Outcome: production system serving paying customers on Module 1\.

### 19.3 Phase 3 — Hardening & Early Scale (Weeks 8–12)

Stabilize Module 1 based on real customer feedback. Improve mention detection accuracy, refine alerts, polish dashboard. Add small quality-of-life features customers ask for. Grow customer base to 8–15.

### 19.4 Phase 4 — Module 2 Content Audit (Months 3–4)

Content ingestion, AI-readiness scoring, five-verdict system. GSC and GA4 OAuth integrations. Post-audit email. Dashboard.

Outcome: Module 1 customers naturally upgrade to multi-module plans for audit access.

### 19.5 Phase 5 — Workflow Engine Foundation (Months 5–6)

Build the workflow engine in the foundation layer. Node registry, type-safe graph execution, interactive-node support, workflow history. No user-facing visual editor yet.

Outcome: workflow engine ready to host templates.

### 19.6 Phase 6 — Module 3 Content Workflows, Phase A (Months 6–7)

Launch initial template library with form-based runner UI. First templates: Comparison Page, Content Refresh, pSEO Page Generator, Blog Post from Brief.

Outcome: Module 3 ships in form-based mode. Customers run workflows, review outputs, publish.

### 19.7 Phase 7 — Module 3 Phase B (Months 7–8)

Section-level review and regeneration. Per-section revision history. Inline editing refined.

### 19.8 Phase 8 — Module 3 Phase C (Months 8–10)

Visual workflow builder (React Flow). Custom workflow saving. Full visibility into workflow graphs.

### 19.9 Phase 9 — Module 4 Voice Engine (Month 10+)

Voice corpus ingestion, style profile generation, voice-preserving draft generation, multi-voice workspace support. Timing depends on Module 1–3 revenue, team capacity, and whether Module 4 is built inside GEO Platform or as a sister product (see Section 20).

### 19.10 Realistic Expectations

These timelines assume focused solo work with occasional help from developer friends when stuck. Each phase will probably take 20–40% longer than estimated. Phase 1 is the most predictable; Phase 5+ involves the most uncertainty because the workflow engine is genuinely novel construction.

Revenue milestones the timeline must support:

- Month 2 post-launch: 3 paying customers on Module 1\.  
- Month 4: 8–10 customers; Module 2 shipped and being adopted.  
- Month 6: 15–20 customers; early Module 3 templates in customer hands.  
- Month 12: all shipped modules in production; platform supporting ₹8L+ MRR.

## 20\. Open Questions

Tracked decisions to revisit. Each should eventually resolve into a concrete choice reflected elsewhere in this plan.

1. **Final product name.** Currently "GEO Platform" as working name. Final name, domain, and branding TBD before public launch.  
     
2. **Trial length and free tier.** 14-day full-access trial vs freemium with limited quota — decide based on early customer feedback.  
     
3. **Pricing tier structure.** Starter / Growth / Scale is a reasonable starting point but exact per-tier entitlements and prices should be validated with the first 10 customers.  
     
4. **Self-service vs sales-assisted.** Fully self-service signup to paid is the default. If enterprise deals emerge, add a "Contact Sales" path later.  
     
5. **Image generation quota defaults.** Nano Banana 2 costs add up. Per-plan image quotas need calibration after watching early usage patterns.  
     
6. **Cross-module intelligence sharing depth.** Module 2 feeds Module 3 refresh workflows (confirmed). Should Module 1's detected mentions also inform Module 3's comparison page content? Obvious product value, but also creates coupling risk. Revisit when both modules are live.  
     
7. **Module 4 as module vs. sister product.** The buyer, pricing model, and product motion for Voice Engine differ materially from Modules 1–3. Decide whether to ship it inside GEO Platform or launch a separate branded product when Module 4 is closer to build.  
     
8. **Workflow marketplace.** Deferred until customer demand for sharing workflows is evident. Architecture supports it; UI and policy to be designed later.  
     
9. **Multi-workspace per user.** Teams will eventually want this. Foundation supports it architecturally; UI and permission model need design when triggered by demand.  
     
10. **Observability platform consolidation.** Sentry \+ PostHog \+ Cloudflare \+ Turso dashboards is four places to look. If an affordable unified platform reaches maturity, consider consolidation.  
      
11. **Evaluation framework maturity.** Each module needs its own eval suite. Building a shared eval framework vs per-module evals is a decision to make after Modules 1 and 2 ship and their eval patterns are clear.  
      
12. **Visual workflow builder timing.** Current plan introduces drag-and-drop in Phase C of Module 3\. If customer demand for custom workflows is low, this can slide further. If demand is high from day one, it may need to pull earlier.  
      
13. **Public landing content strategy.** The product is about GEO; the founder has a content marketing background. How aggressively to use founder-led content (blog posts, LinkedIn) as the primary acquisition channel versus other channels is an ongoing strategic question.

One last architectural note

A question you might get from a future developer (or Claude Code in a fresh session) is: "why not just put all of this in Clerk's `publicMetadata` / `privateMetadata`?" Clerk does offer JSON metadata fields on the user row. The answer is: Clerk metadata is not queryable with SQL operators, not type-safe, not scopable with our workspace-scoped query builder, and not migratable through standard schema migrations. For anything structured, a real table in Turso is the right answer. Clerk metadata is fine for small unstructured flags the application doesn't need to query (e.g., a feature-flag opt-in marker); everything else goes in the `profiles` table or another tenant-scoped table.

**End of Master Plan**

This document will evolve as architectural decisions are made, revisited, or overridden by real-world learning. Module-specific specs in `specs/` contain the detailed implementation guidance for each module's scope at the time it is built.
