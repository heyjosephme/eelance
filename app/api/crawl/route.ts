import type { Position } from "@/lib/data/positions"

const SYSTEM_PROMPT = `You are a job posting parser. Given the text content of a job posting webpage, extract structured data and return it as JSON.

Return ONLY valid JSON with this exact schema (no markdown, no explanation):
{
  "title": "string — job title",
  "company": "string — company name",
  "companyLogo": "string — 2-letter abbreviation of company name",
  "description": "string — 2-3 sentence summary of the role",
  "responsibilities": ["string array — 4-5 key responsibilities"],
  "requirements": ["string array — 4-5 key requirements"],
  "niceToHave": ["string array — 2-4 nice-to-have qualifications"],
  "perks": ["string array — 3-5 perks or benefits"],
  "stack": ["string array — specific technologies mentioned (React, Go, PostgreSQL, etc.)"],
  "rateMin": number — monthly rate in JPY (estimate if not stated, typical range 500000-1200000),
  "rateMax": number — monthly rate in JPY (estimate if not stated),
  "location": "string — one of: remote, tokyo, osaka, hybrid",
  "contractType": "string — one of: freelance, contract",
  "teamSize": number — team size (estimate 4-12 if not stated),
  "duration": "string — e.g. '6+ months', '1 year'",
  "startDate": "string — e.g. 'April 2026' (estimate near-future if not stated)"
}

If the page content isn't a job posting, still try your best to extract whatever relevant info you can and fill in reasonable defaults for the rest. Always return valid JSON.`

// Mock positions that look realistic for demo — picked based on input keywords
const MOCK_POSITIONS: Omit<Position, "id" | "createdAt">[] = [
  {
    title: "Senior Full-Stack Engineer",
    company: "Mercari",
    companyLogo: "Me",
    description:
      "Join our marketplace engineering team to build scalable features powering millions of transactions. You'll own full-stack delivery from API design to polished React frontends, working in a fast-paced product-driven environment.",
    responsibilities: [
      "Design and implement new marketplace features end-to-end",
      "Build performant React/Next.js frontends with server-side rendering",
      "Develop and maintain GraphQL APIs with Go microservices",
      "Collaborate with product and design on user-facing features",
      "Participate in on-call rotation and incident response",
    ],
    requirements: [
      "5+ years of full-stack development experience",
      "Strong proficiency in React, TypeScript, and Go",
      "Experience with microservices architecture and gRPC",
      "Solid understanding of SQL databases and caching strategies",
      "Business-level Japanese (N2+) or fluent English",
    ],
    niceToHave: [
      "Experience with Kubernetes and container orchestration",
      "Background in e-commerce or marketplace platforms",
      "Contributions to open-source projects",
    ],
    perks: [
      "Fully remote with optional Tokyo office",
      "RSU grants and competitive base salary",
      "¥300,000 annual learning budget",
      "Premium health insurance for family",
      "Quarterly team off-sites",
    ],
    stack: ["React", "Next.js", "TypeScript", "Go", "GraphQL", "Kubernetes"],
    rateMin: 800000,
    rateMax: 1100000,
    location: "remote",
    contractType: "contract",
    teamSize: 8,
    duration: "12 months",
    startDate: "May 2026",
  },
  {
    title: "Backend Engineer — Platform Infrastructure",
    company: "SmartNews",
    companyLogo: "SN",
    description:
      "Build the data infrastructure that serves personalized news to 50M+ users. You'll work on high-throughput ingestion pipelines, real-time recommendation APIs, and distributed systems that process billions of events daily.",
    responsibilities: [
      "Design and optimize high-throughput data ingestion pipelines",
      "Build real-time APIs serving personalized content at scale",
      "Improve system reliability, observability, and performance",
      "Develop internal tooling for content operations teams",
      "Drive technical design reviews and architecture decisions",
    ],
    requirements: [
      "4+ years building backend systems in Java, Kotlin, or Go",
      "Experience with distributed systems and stream processing (Kafka, Flink)",
      "Strong SQL skills and experience with large-scale data stores",
      "Understanding of CI/CD, containerization, and cloud infrastructure",
      "Comfortable working in an English-first international team",
    ],
    niceToHave: [
      "Experience with ML model serving and feature stores",
      "Background in ad-tech or content recommendation systems",
      "AWS Solutions Architect or similar certification",
      "Experience with Terraform and infrastructure as code",
    ],
    perks: [
      "Hybrid work — 2 days/week in Shibuya office",
      "Visa sponsorship available",
      "Latest MacBook Pro + 4K monitor setup",
      "Free lunch on office days",
      "10% time for personal projects",
    ],
    stack: ["Kotlin", "Go", "Kafka", "AWS", "PostgreSQL", "Redis", "Terraform"],
    rateMin: 750000,
    rateMax: 1000000,
    location: "hybrid",
    contractType: "freelance",
    teamSize: 6,
    duration: "6+ months",
    startDate: "April 2026",
  },
  {
    title: "iOS Engineer — Consumer App",
    company: "LINE",
    companyLogo: "LN",
    description:
      "Work on the LINE messaging app used by 200M+ people. You'll build new features for chat, payments, and social commerce using Swift and SwiftUI, collaborating closely with design and backend teams across Tokyo and Seoul.",
    responsibilities: [
      "Develop new features for the LINE iOS app in Swift/SwiftUI",
      "Optimize app performance, startup time, and memory usage",
      "Implement accessibility features and internationalization",
      "Write comprehensive unit and UI tests",
      "Review PRs and mentor junior iOS engineers",
    ],
    requirements: [
      "4+ years native iOS development with Swift",
      "Experience with SwiftUI, Combine, and modern concurrency (async/await)",
      "Strong understanding of iOS architecture patterns (MVVM, Clean Architecture)",
      "App Store submission and release management experience",
      "Good communication skills in English or Japanese",
    ],
    niceToHave: [
      "Experience with cross-platform frameworks (KMM)",
      "Background in messaging or social apps",
      "Familiarity with payment systems (Apple Pay, in-app purchases)",
    ],
    perks: [
      "Work from Shinjuku office or remote 3 days/week",
      "Annual ¥500,000 equipment budget",
      "WWDC attendance sponsorship",
      "Comprehensive relocation package",
      "Free LINE FRIENDS merchandise",
    ],
    stack: ["Swift", "SwiftUI", "Combine", "GraphQL", "Firebase", "CI/CD"],
    rateMin: 700000,
    rateMax: 950000,
    location: "hybrid",
    contractType: "contract",
    teamSize: 10,
    duration: "12 months",
    startDate: "June 2026",
  },
]

/** Pick the best mock based on keywords in the input text */
function pickMockPosition(
  input: string
): Omit<Position, "id" | "createdAt"> {
  const lower = input.toLowerCase()

  // Keyword scoring for each mock
  const scores = MOCK_POSITIONS.map((mock) => {
    let score = 0
    for (const tech of mock.stack) {
      if (lower.includes(tech.toLowerCase())) score += 3
    }
    // Title keywords
    for (const word of mock.title.toLowerCase().split(/\s+/)) {
      if (word.length > 3 && lower.includes(word)) score += 2
    }
    return score
  })

  const maxIdx = scores.indexOf(Math.max(...scores))
  return MOCK_POSITIONS[maxIdx >= 0 ? maxIdx : 0]
}

export async function POST(request: Request) {
  try {
    const { url, text } = await request.json()

    if (!url && !text) {
      return Response.json(
        { error: "Provide a URL or text to parse" },
        { status: 400 },
      )
    }

    let content = text || ""

    // Fetch URL content if provided
    if (url && !text) {
      try {
        const res = await fetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
          },
          signal: AbortSignal.timeout(10000),
        })
        const html = await res.text()

        // Strip HTML tags, scripts, styles to get readable text
        content = html
          .replace(/<script[\s\S]*?<\/script>/gi, "")
          .replace(/<style[\s\S]*?<\/style>/gi, "")
          .replace(/<nav[\s\S]*?<\/nav>/gi, "")
          .replace(/<footer[\s\S]*?<\/footer>/gi, "")
          .replace(/<header[\s\S]*?<\/header>/gi, "")
          .replace(/<[^>]+>/g, " ")
          .replace(/&[a-z]+;/gi, " ")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 12000)
      } catch (fetchErr) {
        return Response.json(
          {
            error: `Failed to fetch URL: ${fetchErr instanceof Error ? fetchErr.message : "Unknown error"}`,
          },
          { status: 422 },
        )
      }
    }

    if (!content || content.length < 20) {
      return Response.json(
        { error: "Could not extract enough content from the page" },
        { status: 422 },
      )
    }

    // Try real Claude extraction if API key is set
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (apiKey) {
      const Anthropic = (await import("@anthropic-ai/sdk")).default
      const client = new Anthropic({ apiKey })

      const message = await client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: `Extract the job posting data from this content:\n\n${content}`,
          },
        ],
        system: SYSTEM_PROMPT,
      })

      const responseText =
        message.content[0].type === "text" ? message.content[0].text : ""

      const parsed = JSON.parse(responseText) as Omit<
        Position,
        "id" | "createdAt"
      >
      return Response.json({ position: parsed })
    }

    // Demo fallback — simulate AI processing delay, pick best mock
    await new Promise((r) => setTimeout(r, 2000))
    const position = pickMockPosition(content)
    return Response.json({ position, demo: true })
  } catch (err) {
    console.error("[/api/crawl] Error:", err)
    const msg = err instanceof Error ? err.message : "Unknown error"
    return Response.json({ error: msg }, { status: 500 })
  }
}
