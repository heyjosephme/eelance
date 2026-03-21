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

export default async function EngineerListingPage(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params
  const eng = getEngineerListing(id)
  if (!eng) notFound()

  // Score this engineer against all positions (from company perspective)
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
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <Link
        href="/engineers"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; All engineers
      </Link>

      {/* Profile header */}
      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-full bg-zinc-100 text-xl font-semibold text-zinc-600">
              {eng.name.charAt(0)}
            </div>
            <div>
              <CardTitle className="text-xl">{eng.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {eng.title} &middot; {eng.yearsOfExperience} years experience
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Meta */}
          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <div>
              <p className="text-muted-foreground">Rate</p>
              <p className="font-medium">
                {formatRate(eng.rateMin)}–{formatRate(eng.rateMax)}/月
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Location</p>
              <p className="font-medium capitalize">{eng.location}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Available</p>
              <p
                className={`font-medium ${eng.availability === "Immediately" ? "text-teal-600" : ""}`}
              >
                {eng.availability}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Type</p>
              <p className="font-medium capitalize">{eng.contractType}</p>
            </div>
          </div>

          {/* Skills */}
          <div>
            <p className="text-sm font-medium">Skills</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {eng.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div>
            <p className="text-sm font-medium">About</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {eng.summary}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <p className="text-sm font-medium">Highlights</p>
            <ul className="mt-1.5 space-y-1.5">
              {eng.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-teal-500" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Looking for */}
          <div>
            <p className="text-sm font-medium">Looking for</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {eng.lookingFor}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Best matching positions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Best Matching Positions</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          How this engineer scores against open positions
        </p>

        <div className="mt-4 space-y-3">
          {matchedPositions.map(({ position, breakdown }) => (
            <Card key={position.id}>
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="flex flex-col items-center">
                  <span
                    className={`text-xl font-bold ${breakdown.total >= 80 ? "text-teal-600" : breakdown.total >= 60 ? "text-blue-600" : "text-zinc-500"}`}
                  >
                    {breakdown.total}
                  </span>
                  <span className="text-[10px] text-muted-foreground">/100</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{position.title}</p>
                  <p className="text-sm text-muted-foreground">
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
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-2 grid grid-cols-4 gap-2 text-xs text-muted-foreground">
                    {breakdown.dimensions.map((dim) => (
                      <div key={dim.name}>
                        <span className="font-medium text-foreground">
                          {dim.score}/{dim.maxScore}
                        </span>{" "}
                        {dim.name}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
