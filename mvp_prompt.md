# Hackathon MVP: FreelanceMatch — AI-Powered Freelance IT Job Board

## Project Overview

Build a **2-sided freelance IT job matching platform** that:
1. Aggregates freelance/contract positions from company career pages via AI crawler
2. Lets engineers browse and apply to positions
3. Lets companies review and accept applicants
4. Auto-matches available time slots for interviews
5. Uses AI to recommend the best positions for each engineer (and best engineers for each company)

This is a hackathon MVP. Prioritize working demo over polish. Every feature should be demoable end-to-end.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Prisma + SQLite (`DATABASE_URL="file:./dev.db"`)
- **Auth**: NextAuth.js (credentials provider, simple email/password)
- **Styling**: Tailwind CSS
- **AI**: Claude API (`claude-sonnet-4-20250514`) — for job parsing + recommendations
- **Crawler**: Firecrawl JS SDK
- **Package manager**: pnpm

---

## Database Schema (Prisma)

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String        @id @default(cuid())
  email         String        @unique
  password      String
  role          String        // "engineer" | "company"
  engineer      Engineer?
  company       Company?
  createdAt     DateTime      @default(now())
}

model Engineer {
  id            String        @id @default(cuid())
  userId        String        @unique
  user          User          @relation(fields: [userId], references: [id])
  name          String
  skills        String        // comma-separated e.g. "Rails, React, TypeScript"
  experience    Int           // years
  rateMin       Int           // desired monthly rate in JPY (e.g. 600000)
  rateMax       Int
  bio           String?
  availability  String?       // JSON array of available time slots
  applications  Application[]
}

model Company {
  id            String        @id @default(cuid())
  userId        String        @unique
  user          User          @relation(fields: [userId], references: [id])
  name          String
  description   String?
  positions     Position[]
}

model Position {
  id            String        @id @default(cuid())
  companyId     String
  company       Company       @relation(fields: [companyId], references: [id])
  title         String
  description   String
  stack         String        // comma-separated e.g. "Rails, PostgreSQL"
  rateMin       Int           // monthly rate in JPY
  rateMax       Int
  location      String        // "remote" | "tokyo" | "osaka" etc.
  contractType  String        // "freelance" | "contract"
  source        String?       // crawled URL
  applications  Application[]
  createdAt     DateTime      @default(now())
}

model Application {
  id            String        @id @default(cuid())
  engineerId    String
  engineer      Engineer      @relation(fields: [engineerId], references: [id])
  positionId    String
  position      Position      @relation(fields: [positionId], references: [id])
  status        String        @default("pending") // "pending" | "accepted" | "rejected"
  engineerSlots String?       // JSON array of proposed time slots
  companySlots  String?       // JSON array of company available slots
  matchedSlot   String?       // final matched interview slot
  createdAt     DateTime      @default(now())
}
```

---

## Project Structure

```
/app
  /api
    /auth/[...nextauth]/route.ts
    /crawl/route.ts               ← trigger crawler
    /positions/route.ts           ← list positions
    /positions/[id]/route.ts      ← position detail
    /applications/route.ts        ← create application
    /applications/[id]/route.ts   ← update application (accept/reject)
    /applications/[id]/slots/route.ts  ← submit time slots
    /recommend/route.ts           ← AI recommendations

  /(auth)
    /login/page.tsx
    /register/page.tsx

  /(engineer)
    /dashboard/page.tsx           ← recommended positions + applications
    /positions/page.tsx           ← browse all positions
    /positions/[id]/page.tsx      ← apply to position

  /(company)
    /dashboard/page.tsx           ← posted positions + incoming applications
    /applications/[id]/page.tsx   ← review application, accept/reject, pick slots

  /page.tsx                       ← landing page

/prisma
  schema.prisma
  seed.ts                         ← seed with sample data

/lib
  /crawler.ts                     ← Firecrawl + Claude parsing
  /recommend.ts                   ← Claude recommendation logic
  /auth.ts                        ← NextAuth config
  /prisma.ts                      ← Prisma client singleton
```

---

## Feature Specs

### 1. Seed Data (implement first, unblocks everything)

Create `/prisma/seed.ts` with:
- 2 companies (e.g. "TechCorp Japan", "StartupXYZ")
- 8–10 positions with varied stacks (Rails, React, Go, Python, etc.), rates, and locations
- 2 engineer accounts with different skill sets
- 1 sample application in "pending" state

Run with: `pnpm prisma db seed`

---

### 2. Auth (NextAuth, credentials provider)

- Register as either **engineer** or **company** (role selector on register page)
- Simple email + bcrypt password
- After login, redirect to role-appropriate dashboard
- Protect all dashboard routes with middleware

---

### 3. Job Board (Engineer side)

**`/positions` page:**
- List all positions as cards
- Filter by: stack (text input), location (select), rate range (slider or min/max inputs)
- Each card shows: title, company, stack tags, rate range, location
- Click → position detail page

**`/positions/[id]` page:**
- Full position description
- "Apply" button (only shown to logged-in engineers)
- On apply: show time slot picker (engineer selects 5 available time slots using date/time checkboxes or a simple grid)
- Submit creates an Application record

---

### 4. Application Flow (Company side)

**`/dashboard` (company):**
- List all positions with application counts
- Click position → see list of applicants

**`/applications/[id]` (company):**
- Show engineer profile: name, skills, experience, rate expectation, bio
- Two actions: **Accept** or **Reject**
- On Accept: show company's available time slots (same slot picker UI)
- System finds overlap between engineer slots and company slots
- If overlap found: set `matchedSlot`, show confirmation "Interview scheduled for [slot]"
- If no overlap: show "No matching slots — please contact the engineer directly"

---

### 5. AI Recommendation (Claude API)

**`/api/recommend` POST endpoint:**

```typescript
// Input: engineer profile + list of positions
// Output: top 3 ranked positions with explanation

const prompt = `
You are a technical recruiter matching freelance engineers to positions.

Engineer profile:
- Skills: ${engineer.skills}
- Experience: ${engineer.experience} years
- Desired rate: ¥${engineer.rateMin}–¥${engineer.rateMax}/month

Available positions:
${positions.map((p, i) => `
${i + 1}. ${p.title} at ${p.company.name}
   Stack: ${p.stack}
   Rate: ¥${p.rateMin}–¥${p.rateMax}/month
   Location: ${p.location}
`).join('')}

Return a JSON array of the top 3 best matches:
[
  {
    "positionIndex": 1,
    "score": 95,
    "reason": "Strong match because..."
  }
]
Return ONLY the JSON array, no markdown, no explanation outside the array.
`
```

Show recommendations at the top of the engineer dashboard as highlighted cards with match score and reason.

Also implement the reverse: on company dashboard, for each position show top 3 matched engineers from the registered engineer pool.

---

### 6. AI Crawler (implement last, swap in for seed data)

**`/lib/crawler.ts`:**

```typescript
import FirecrawlApp from '@mendableai/firecrawl-js'
import Anthropic from '@anthropic-ai/sdk'

const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY })
const claude = new Anthropic()

export async function crawlCareerPage(url: string): Promise<Position[]> {
  // 1. Scrape the page
  const result = await firecrawl.scrapeUrl(url, { formats: ['markdown'] })
  
  // 2. Claude parses and normalizes
  const response = await claude.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [{
      role: 'user',
      content: `Extract all freelance/contract IT job positions from this career page content.
      
${result.markdown}

Return a JSON array of positions. Each position must have:
{
  "title": string,
  "description": string,
  "stack": string (comma-separated technologies),
  "rateMin": number (monthly JPY, estimate if not stated),
  "rateMax": number (monthly JPY, estimate if not stated),
  "location": string ("remote" | "tokyo" | city name),
  "contractType": "freelance" | "contract"
}

Return ONLY the JSON array. If no freelance positions found, return empty array [].`
    }]
  })
  
  const text = response.content[0].type === 'text' ? response.content[0].text : '[]'
  return JSON.parse(text.replace(/```json|```/g, '').trim())
}
```

**Target career pages to crawl (start with these):**
- Any 10 Japanese tech companies with known freelance/contract listings
- Hardcode the URL list for the hackathon

**`/api/crawl` POST endpoint:**
- Loops through URL list
- Calls `crawlCareerPage` for each
- Upserts positions into DB
- Returns count of positions found

Add a "Refresh Data" admin button on the landing page that triggers this endpoint.

---

## UI Design Direction

**Aesthetic**: Clean, professional, dark-accented. Think a modern job board — not a startup landing page.

- Dark navy/charcoal header
- White card-based content area  
- Accent color: electric blue or teal for CTAs and match scores
- Stack tags as colored badges
- Match score shown as a percentage bar or badge (e.g. "95% match" in green)
- Keep it fast and readable — this is a tool, not a marketing site

Use Tailwind utility classes throughout. No component libraries needed for hackathon speed.

---

## Environment Variables

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="any-random-string-for-hackathon"
NEXTAUTH_URL="http://localhost:3000"
ANTHROPIC_API_KEY="your-key"
FIRECRAWL_API_KEY="your-key"
```

---

## Build Order

1. `pnpm create next-app` + install dependencies
2. Prisma schema + `pnpm prisma migrate dev` + seed data
3. NextAuth setup (login/register)
4. Job listing + position detail pages (read-only, uses seed data)
5. Engineer apply flow + time slot picker
6. Company dashboard + accept/reject + slot matching
7. AI recommendation endpoint + engineer dashboard integration
8. Crawler (swap seed data for real crawled data)

---

## Demo Script (for your partner)

1. **Land on homepage** — show value prop: "Positions from company career pages that aren't on Levtech or Findy"
2. **Login as engineer** → dashboard shows AI-recommended positions with match scores
3. **Browse positions** → filter by stack → click into a position
4. **Apply** → select available time slots → submit
5. **Login as company** → see incoming application → view engineer profile
6. **Accept** → select company time slots → system shows matched interview slot
7. **(Optional)** Trigger crawler → show new positions appearing in real time

Total demo time: ~3 minutes. Every step should be clickable with no dead ends.
