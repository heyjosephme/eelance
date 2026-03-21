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
import { addTrackedApplication } from "@/lib/application-store"

function ScoreBar({ dimension }: { dimension: ScoreBreakdown["dimensions"][number] }) {
  const pct = (dimension.score / dimension.maxScore) * 100
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="w-24 shrink-0 font-medium text-foreground">
        {dimension.name}
      </span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full animate-score-fill"
          style={{
            width: `${pct}%`,
            backgroundColor: pct >= 80 ? "oklch(0.65 0.17 175)" : pct >= 50 ? "oklch(0.6 0.15 250)" : "oklch(0.6 0 0)",
          }}
        />
      </div>
      <span className="w-10 shrink-0 text-right font-mono text-muted-foreground">
        {dimension.score}/{dimension.maxScore}
      </span>
    </div>
  )
}

function scoreColor(score: number) {
  if (score >= 80) return "text-teal-600"
  if (score >= 60) return "text-blue-600"
  return "text-zinc-500"
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

  function saveToTracker(positionId: string, score: number) {
    const pos = getPosition(positionId)
    if (!pos) return
    addTrackedApplication({
      positionId,
      positionTitle: pos.title,
      company: pos.company,
      location: pos.location,
      stack: pos.stack,
      score,
      appliedAt: new Date().toISOString(),
    })
  }

  function applyTo(positionId: string) {
    setAppliedIds((prev) => new Set(prev).add(positionId))
    const scored = scoredMatches.find((s) => s.match.positionId === positionId)
    saveToTracker(positionId, scored?.breakdown?.total ?? 0)
  }

  async function applyToAll() {
    for (const match of matches) {
      await new Promise((r) => setTimeout(r, 400))
      setAppliedIds((prev) => new Set(prev).add(match.positionId))
      const scored = scoredMatches.find((s) => s.match.positionId === match.positionId)
      saveToTracker(match.positionId, scored?.breakdown?.total ?? 0)
    }
    setAllSent(true)
  }

  const allApplied =
    matches.length > 0 && matches.every((m) => appliedIds.has(m.positionId))

  const scoredMatches = matches.map((match) => {
    const position = getPosition(match.positionId)
    if (!position) return { match, position: null, breakdown: null }
    const breakdown = scorePositionForEngineer(
      {
        skills: profile.skills,
        rateMin: 600000,
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
      <Card className="animate-fade-in-up overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-teal-500 to-emerald-400" />
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
        <div className="animate-fade-in-up stagger-1 overflow-hidden rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-emerald-50 p-5 text-center">
          <p className="text-sm font-semibold text-teal-900">
            We found {scoredMatches.length} great matches for you
          </p>
          <p className="mt-0.5 text-xs text-teal-700/70">
            Apply to all with one click — we&apos;ll arrange interviews
          </p>
          <Button
            onClick={applyToAll}
            className="mt-3 bg-teal-600 shadow-sm shadow-teal-600/20 hover:bg-teal-500 hover:shadow-md"
            size="lg"
          >
            Apply to All ({scoredMatches.length})
          </Button>
        </div>
      )}

      {/* Applied confirmation */}
      {(allApplied || allSent) && (
        <div className="animate-fade-in-up overflow-hidden rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-emerald-50 p-6 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-teal-100">
            <svg className="size-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="mt-3 font-semibold text-teal-900">Applications sent!</p>
          <p className="mt-1 text-sm text-teal-700/80">
            We&apos;ll arrange interviews and notify you. Sit back and relax.
          </p>
          <Link
            href="/applications"
            className="mt-3 inline-flex h-9 items-center gap-1.5 rounded-lg bg-teal-600 px-4 text-sm font-medium text-white shadow-sm shadow-teal-600/20 transition-all hover:bg-teal-500"
          >
            Track My Applications
            <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      )}

      {/* Match cards */}
      <div className="space-y-3">
        {scoredMatches.map(({ match, position, breakdown }, i) => {
          if (!position || !breakdown) return null
          const applied = appliedIds.has(match.positionId)
          const expanded = expandedId === match.positionId

          return (
            <Card
              key={match.positionId}
              className={`animate-fade-in-up transition-all ${applied ? "border-teal-200 bg-teal-50/30" : "hover:shadow-md hover:shadow-zinc-200/50"}`}
              style={{ animationDelay: `${(i + 2) * 0.08}s` }}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  {/* Score circle */}
                  <button
                    type="button"
                    onClick={() => setExpandedId(expanded ? null : match.positionId)}
                    className="group relative flex size-14 shrink-0 flex-col items-center justify-center"
                    title="Click to see breakdown"
                  >
                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56">
                      <circle cx="28" cy="28" r="24" fill="none" stroke="oklch(0.95 0 0)" strokeWidth="3" />
                      <circle
                        cx="28"
                        cy="28"
                        r="24"
                        fill="none"
                        stroke={breakdown.total >= 80 ? "oklch(0.65 0.17 175)" : breakdown.total >= 60 ? "oklch(0.6 0.15 250)" : "oklch(0.6 0 0)"}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={`${(breakdown.total / 100) * 150.8} 150.8`}
                        className="animate-score-fill"
                      />
                    </svg>
                    <span className={`relative text-lg font-bold ${scoreColor(breakdown.total)}`}>
                      {breakdown.total}
                    </span>
                  </button>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/positions/${position.id}`}
                      className="font-semibold transition-colors hover:text-teal-600"
                    >
                      {position.title}
                    </Link>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {position.company} &middot; {position.location}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {position.stack.map((tech) => {
                        const isMatch = profile.skills
                          .map((s) => s.toLowerCase())
                          .some(
                            (s) =>
                              s.includes(tech.toLowerCase()) ||
                              tech.toLowerCase().includes(s)
                          )
                        return (
                          <Badge
                            key={tech}
                            variant={isMatch ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        )
                      })}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {breakdown.summary}
                    </p>
                  </div>

                  {/* Apply */}
                  <div className="shrink-0">
                    {applied ? (
                      <span className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-teal-100 px-3 text-xs font-semibold text-teal-700">
                        <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Applied
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => applyTo(match.positionId)}
                        className="shadow-sm"
                      >
                        Apply
                      </Button>
                    )}
                  </div>
                </div>

                {/* Expandable breakdown */}
                {expanded && (
                  <div className="animate-fade-in mt-4 space-y-2.5 border-t pt-4">
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
