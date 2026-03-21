"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getPosition } from "@/lib/data/positions"
import type { ExtractedProfile, MatchedPosition } from "@/lib/data/mock-resume-result"
import { type ScoreBreakdown, scorePositionForEngineer } from "@/lib/scoring"

function ScoreBar({ dimension }: { dimension: ScoreBreakdown["dimensions"][number] }) {
  const pct = (dimension.score / dimension.maxScore) * 100
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-20 shrink-0 text-muted-foreground">
        {dimension.name}
      </span>
      <div className="h-1.5 flex-1 rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full bg-teal-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 shrink-0 text-right tabular-nums text-muted-foreground">
        {dimension.score}/{dimension.maxScore}
      </span>
    </div>
  )
}

export function Results({
  profile,
  matches,
}: {
  profile: ExtractedProfile
  matches: MatchedPosition[]
}) {
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set())
  const [allSent, setAllSent] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  function applyTo(positionId: string) {
    setAppliedIds((prev) => new Set(prev).add(positionId))
  }

  async function applyToAll() {
    for (const match of matches) {
      await new Promise((r) => setTimeout(r, 400))
      setAppliedIds((prev) => new Set(prev).add(match.positionId))
    }
    setAllSent(true)
  }

  const allApplied =
    matches.length > 0 && matches.every((m) => appliedIds.has(m.positionId))

  // Compute real scores for each match
  const scoredMatches = matches.map((match) => {
    const position = getPosition(match.positionId)
    if (!position) return { match, position: null, breakdown: null }
    const breakdown = scorePositionForEngineer(
      {
        skills: profile.skills,
        rateMin: 600000, // fallback defaults
        rateMax: 1000000,
        location: "anywhere",
      },
      position
    )
    return { match: { ...match, score: breakdown.total, reason: breakdown.summary }, position, breakdown }
  })

  return (
    <div className="space-y-6">
      {/* Profile summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Welcome, {profile.name}</CardTitle>
          <CardDescription>
            {profile.title} &middot; {profile.yearsOfExperience} years
            {profile.recentCompany && ` · ${profile.recentCompany}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            {profile.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Apply all CTA */}
      {!allApplied && !allSent && (
        <div className="rounded-lg bg-teal-50 p-4 text-center">
          <p className="text-sm font-medium text-teal-900">
            We found {scoredMatches.length} great matches for you
          </p>
          <Button
            onClick={applyToAll}
            className="mt-2 bg-teal-600 hover:bg-teal-500"
            size="lg"
          >
            Apply to All ({scoredMatches.length})
          </Button>
        </div>
      )}

      {/* Applied confirmation */}
      {(allApplied || allSent) && (
        <div className="rounded-lg bg-teal-50 p-6 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-teal-100">
            <svg
              className="size-6 text-teal-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="mt-3 font-semibold text-teal-900">Applications sent!</p>
          <p className="mt-1 text-sm text-teal-700">
            We&apos;ll arrange interviews and notify you. Sit back and relax.
          </p>
        </div>
      )}

      {/* Match cards with score breakdown */}
      <div className="space-y-3">
        {scoredMatches.map(({ match, position, breakdown }) => {
          if (!position || !breakdown) return null
          const applied = appliedIds.has(match.positionId)
          const expanded = expandedId === match.positionId

          return (
            <Card
              key={match.positionId}
              className={applied ? "border-teal-200 bg-teal-50/30" : ""}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  {/* Score */}
                  <button
                    type="button"
                    onClick={() => setExpandedId(expanded ? null : match.positionId)}
                    className="flex flex-col items-center pt-1"
                    title="Click to see breakdown"
                  >
                    <span
                      className={`text-2xl font-bold ${breakdown.total >= 80 ? "text-teal-600" : breakdown.total >= 60 ? "text-blue-600" : "text-zinc-500"}`}
                    >
                      {breakdown.total}
                    </span>
                    <span className="text-[10px] text-muted-foreground">/100</span>
                  </button>

                  {/* Info */}
                  <div className="flex-1">
                    <Link
                      href={`/positions/${position.id}`}
                      className="font-medium hover:text-teal-600 hover:underline"
                    >
                      {position.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {position.company} &middot; {position.location}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {position.stack.map((tech) => (
                        <Badge
                          key={tech}
                          variant={
                            profile.skills
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
                    <p className="mt-2 text-sm text-muted-foreground">
                      {breakdown.summary}
                    </p>
                  </div>

                  {/* Apply */}
                  <div className="shrink-0">
                    {applied ? (
                      <span className="inline-flex h-8 items-center gap-1 rounded-md bg-teal-100 px-3 text-sm font-medium text-teal-700">
                        <svg
                          className="size-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Applied
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => applyTo(match.positionId)}
                      >
                        Apply
                      </Button>
                    )}
                  </div>
                </div>

                {/* Expandable breakdown */}
                {expanded && (
                  <div className="mt-4 space-y-2 border-t pt-4">
                    {breakdown.dimensions.map((dim) => (
                      <ScoreBar key={dim.name} dimension={dim} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
