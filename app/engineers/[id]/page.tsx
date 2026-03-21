import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getEngineerListing } from "@/lib/data/engineer-listings"
import { positions } from "@/lib/data/positions"
import { scoreEngineerForPosition } from "@/lib/scoring"
import { engineers as engineerPool } from "@/lib/data/applications"

function formatRate(rate: number) {
  return `¥${rate.toLocaleString()}`
}

function scoreColor(score: number) {
  if (score >= 80) return "text-teal-600"
  if (score >= 60) return "text-blue-600"
  return "text-zinc-500"
}

export default async function EngineerListingPage(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params
  const eng = getEngineerListing(id)
  if (!eng) notFound()

  const engineerForScoring = {
    id: eng.id,
    name: eng.name,
    title: eng.title,
    yearsOfExperience: eng.yearsOfExperience,
    skills: eng.skills,
    rateMin: eng.rateMin,
    rateMax: eng.rateMax,
    bio: eng.summary,
  }

  const matchedPositions = positions
    .map((pos) => {
      const breakdown = scoreEngineerForPosition(
        engineerForScoring,
        pos,
        engineerPool
      )
      return { position: pos, breakdown }
    })
    .sort((a, b) => b.breakdown.total - a.breakdown.total)
    .slice(0, 3)

  return (
    <div>
      {/* Dark header */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="mx-auto max-w-3xl px-6 pb-14 pt-8">
          <nav className="animate-fade-in-up flex items-center gap-2 text-sm text-zinc-500">
            <Link href="/engineers" className="transition-colors hover:text-zinc-300">
              Engineers
            </Link>
            <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="truncate text-zinc-400">{eng.name}</span>
          </nav>
          <div className="animate-fade-in-up mt-5 flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-teal-400/20 to-emerald-400/20 text-xl font-bold text-teal-400">
              {eng.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{eng.name}</h1>
              <p className="mt-0.5 text-sm text-zinc-400">
                {eng.title} &middot; {eng.yearsOfExperience} years
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl px-6 py-8">
      {/* Profile */}
      <Card className="animate-fade-in-up -mt-10 overflow-hidden shadow-lg shadow-zinc-200/50">
        <CardContent className="space-y-6 pt-6">
          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/50 p-4 text-sm sm:grid-cols-4">
            <div>
              <p className="text-xs text-muted-foreground">Rate</p>
              <p className="mt-0.5 font-mono text-sm font-medium">
                {formatRate(eng.rateMin)}–{formatRate(eng.rateMax)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="mt-0.5 font-medium capitalize">{eng.location}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Available</p>
              <p
                className={`mt-0.5 font-medium ${eng.availability === "Immediately" ? "text-teal-600" : ""}`}
              >
                {eng.availability}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Type</p>
              <p className="mt-0.5 font-medium capitalize">
                {eng.contractType}
              </p>
            </div>
          </div>

          {/* Skills */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Skills
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {eng.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              About
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {eng.summary}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Highlights
            </p>
            <ul className="mt-2 space-y-2">
              {eng.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <span className="mt-[7px] block size-1.5 shrink-0 rounded-full bg-teal-500" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Looking for */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Looking for
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {eng.lookingFor}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Best matching positions */}
      <div className="animate-fade-in-up stagger-2 mt-8">
        <h2 className="text-lg font-bold tracking-tight">
          Best Matching Positions
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Scored against open positions
        </p>

        <div className="mt-4 space-y-3">
          {matchedPositions.map(({ position, breakdown }, i) => (
            <Card
              key={position.id}
              className="animate-fade-in-up transition-all hover:shadow-md hover:shadow-zinc-200/50"
              style={{ animationDelay: `${(i + 3) * 0.08}s` }}
            >
              <CardContent className="flex items-start gap-4 pt-6">
                {/* Score circle */}
                <div className="relative flex size-12 shrink-0 items-center justify-center">
                  <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20" fill="none" stroke="oklch(0.95 0 0)" strokeWidth="3" />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke={breakdown.total >= 80 ? "oklch(0.65 0.17 175)" : breakdown.total >= 60 ? "oklch(0.6 0.15 250)" : "oklch(0.6 0 0)"}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${(breakdown.total / 100) * 125.6} 125.6`}
                      className="animate-score-fill"
                    />
                  </svg>
                  <span className={`relative text-sm font-bold ${scoreColor(breakdown.total)}`}>
                    {breakdown.total}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/positions/${position.id}`}
                    className="font-semibold transition-colors hover:text-teal-600"
                  >
                    {position.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {position.company} &middot; {position.location}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {position.stack.map((tech) => (
                      <Badge
                        key={tech}
                        variant={
                          eng.skills
                            .map((s) => s.toLowerCase())
                            .some(
                              (s) =>
                                s.includes(tech.toLowerCase()) ||
                                tech.toLowerCase().includes(s)
                            )
                            ? "default"
                            : "secondary"
                        }
                        className="text-[11px]"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                    {breakdown.dimensions.map((dim) => (
                      <span key={dim.name}>
                        <span className="font-medium text-foreground">
                          {dim.score}/{dim.maxScore}
                        </span>{" "}
                        {dim.name}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}
