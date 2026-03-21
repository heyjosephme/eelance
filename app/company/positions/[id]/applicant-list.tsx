"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Application } from "@/lib/data/applications"
import { engineers } from "@/lib/data/applications"
import { engineerListings } from "@/lib/data/engineer-listings"
import type { Position } from "@/lib/data/positions"
import { type ScoreBreakdown, scoreEngineerForPosition } from "@/lib/scoring"

function formatRate(rate: number) {
  return `¥${(rate / 10000).toFixed(0)}万`
}

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

export function ApplicantList({
  applications,
  position,
}: {
  applications: Application[]
  position: Position
}) {
  const [statuses, setStatuses] = useState<Record<string, Application["status"]>>({})
  const [scheduling, setScheduling] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  function getStatus(appId: string, original: Application["status"]) {
    return statuses[appId] ?? original
  }

  async function handleAccept(appId: string) {
    setStatuses((prev) => ({ ...prev, [appId]: "accepted" }))
    setScheduling(appId)
    await new Promise((r) => setTimeout(r, 1500))
    setScheduling(null)
  }

  function handleReject(appId: string) {
    setStatuses((prev) => ({ ...prev, [appId]: "rejected" }))
  }

  const scoredApps = applications
    .map((app) => {
      const breakdown = scoreEngineerForPosition(app.engineer, position, engineers)
      return { app, breakdown }
    })
    .sort((a, b) => b.breakdown.total - a.breakdown.total)

  return (
    <div className="space-y-3">
      {scoredApps.map(({ app, breakdown }, i) => {
        const status = getStatus(app.id, app.status)
        const isScheduling = scheduling === app.id
        const expanded = expandedId === app.id

        const listing = engineerListings.find(
          (el) => el.name === app.engineer.name
        )

        return (
          <Card
            key={app.id}
            className={`animate-fade-in-up transition-all ${
              status === "accepted"
                ? "border-teal-200 bg-teal-50/30"
                : status === "rejected"
                  ? "opacity-40"
                  : "hover:shadow-md hover:shadow-zinc-200/50"
            }`}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                {/* Score circle */}
                <button
                  type="button"
                  onClick={() => setExpandedId(expanded ? null : app.id)}
                  className="relative flex size-14 shrink-0 flex-col items-center justify-center"
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

                {/* Engineer info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {listing ? (
                      <Link
                        href={`/engineers/${listing.id}`}
                        className="font-semibold transition-colors hover:text-teal-600"
                      >
                        {app.engineer.name}
                      </Link>
                    ) : (
                      <p className="font-semibold">{app.engineer.name}</p>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {app.engineer.title} &middot;{" "}
                      {app.engineer.yearsOfExperience}y
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {app.engineer.bio}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {app.engineer.skills.map((skill) => {
                      const isRequired = position.stack
                        .map((s) => s.toLowerCase())
                        .some(
                          (s) =>
                            s.includes(skill.toLowerCase()) ||
                            skill.toLowerCase().includes(s)
                        )
                      return (
                        <Badge
                          key={skill}
                          variant={isRequired ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      )
                    })}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {formatRate(app.engineer.rateMin)}–
                    {formatRate(app.engineer.rateMax)}/月
                  </p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 flex-col items-end gap-2">
                  {status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleAccept(app.id)}
                        className="bg-teal-600 shadow-sm shadow-teal-600/20 hover:bg-teal-500"
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleReject(app.id)}
                        className="text-muted-foreground"
                      >
                        Pass
                      </Button>
                    </>
                  )}

                  {status === "accepted" && isScheduling && (
                    <div className="flex items-center gap-2 text-sm text-teal-600">
                      <div className="size-4 animate-spin rounded-full border-2 border-teal-200 border-t-teal-600" />
                      <span className="text-xs">Arranging...</span>
                    </div>
                  )}

                  {status === "accepted" && !isScheduling && (
                    <div className="rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-center">
                      <p className="text-xs font-semibold text-teal-800">
                        Interview set
                      </p>
                      <p className="mt-0.5 font-mono text-[10px] text-teal-600">
                        Mar 25 &middot; 14:00
                      </p>
                    </div>
                  )}

                  {status === "rejected" && (
                    <span className="text-xs text-muted-foreground">
                      Passed
                    </span>
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
  )
}
