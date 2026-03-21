"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Application } from "@/lib/data/applications"
import { engineers } from "@/lib/data/applications"
import type { Position } from "@/lib/data/positions"
import { type ScoreBreakdown, scoreEngineerForPosition } from "@/lib/scoring"

function formatRate(rate: number) {
  return `¥${(rate / 10000).toFixed(0)}万`
}

function scoreColor(score: number) {
  if (score >= 80) return "text-teal-600"
  if (score >= 60) return "text-blue-600"
  return "text-zinc-500"
}

function scoreBg(score: number) {
  if (score >= 80) return "bg-teal-50"
  if (score >= 60) return "bg-blue-50"
  return "bg-zinc-50"
}

function ScoreBar({ dimension }: { dimension: ScoreBreakdown["dimensions"][number] }) {
  const pct = (dimension.score / dimension.maxScore) * 100
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">{dimension.name}</span>
        <span className="font-mono text-muted-foreground">
          {dimension.score}/{dimension.maxScore}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out animate-score-fill"
          style={{
            width: `${pct}%`,
            backgroundColor:
              pct >= 80
                ? "oklch(0.65 0.17 175)"
                : pct >= 50
                  ? "oklch(0.6 0.15 250)"
                  : "oklch(0.6 0 0)",
          }}
        />
      </div>
      <p className="text-[11px] text-muted-foreground">{dimension.detail}</p>
    </div>
  )
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

        return (
          <Card
            key={app.id}
            className={`animate-fade-in-up overflow-hidden transition-all ${
              status === "accepted"
                ? "border-teal-200 bg-teal-50/30"
                : status === "rejected"
                  ? "opacity-40"
                  : "hover:shadow-md hover:shadow-zinc-200/50"
            }`}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                {/* Score circle */}
                <button
                  type="button"
                  onClick={() => setExpandedId(expanded ? null : app.id)}
                  className={`relative flex size-14 shrink-0 flex-col items-center justify-center rounded-full transition-colors ${scoreBg(breakdown.total)}`}
                  title="Click to see breakdown"
                >
                  <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56">
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      fill="none"
                      stroke="oklch(0.93 0 0)"
                      strokeWidth="3"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      fill="none"
                      stroke={
                        breakdown.total >= 80
                          ? "oklch(0.65 0.17 175)"
                          : breakdown.total >= 60
                            ? "oklch(0.6 0.15 250)"
                            : "oklch(0.6 0 0)"
                      }
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
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-full bg-zinc-100 text-[10px] font-semibold text-zinc-600">
                      {app.engineer.name.charAt(0)}
                    </div>
                    <Link
                      href={`/company/positions/${position.id}/applicants/${app.id}`}
                      className="text-sm font-semibold transition-colors hover:text-teal-600"
                    >
                      {app.engineer.name}
                    </Link>
                    <span className="hidden text-xs text-muted-foreground sm:inline">
                      {app.engineer.title} &middot; {app.engineer.yearsOfExperience}y exp
                    </span>
                  </div>

                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
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
                          className="text-[10px]"
                        >
                          {skill}
                        </Badge>
                      )
                    })}
                  </div>

                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>
                      {formatRate(app.engineer.rateMin)}–{formatRate(app.engineer.rateMax)}/月
                    </span>
                    <span className="text-border">&middot;</span>
                    <span>Applied {app.appliedAt}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 flex-col items-end gap-2">
                  {status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleAccept(app.id)}
                        className="gap-1.5 bg-teal-600 shadow-sm shadow-teal-600/20 hover:bg-teal-500"
                      >
                        <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleReject(app.id)}
                        className="text-muted-foreground hover:text-red-500"
                      >
                        Pass
                      </Button>
                    </>
                  )}

                  {status === "accepted" && isScheduling && (
                    <div className="flex items-center gap-2 rounded-lg border border-teal-200 bg-teal-50 px-3 py-2">
                      <div className="size-4 animate-spin rounded-full border-2 border-teal-200 border-t-teal-600" />
                      <span className="text-xs font-medium text-teal-700">Scheduling...</span>
                    </div>
                  )}

                  {status === "accepted" && !isScheduling && (
                    <div className="rounded-lg border border-teal-200 bg-teal-50 px-3 py-2.5 text-center">
                      <div className="flex items-center gap-1.5">
                        <svg className="size-3.5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs font-semibold text-teal-800">Interview set</span>
                      </div>
                      <p className="mt-1 font-mono text-[10px] text-teal-600">
                        Mar 25 &middot; 14:00 JST
                      </p>
                    </div>
                  )}

                  {status === "rejected" && (
                    <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs text-muted-foreground">
                      Passed
                    </span>
                  )}
                </div>
              </div>

              {/* Expandable score breakdown */}
              {expanded && (
                <div className="mt-4 rounded-lg border bg-zinc-50/50 p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Score Breakdown
                  </p>
                  <div className="space-y-3">
                    {breakdown.dimensions.map((dim) => (
                      <ScoreBar key={dim.name} dimension={dim} />
                    ))}
                  </div>
                  <Separator className="my-3" />
                  <p className="text-xs text-muted-foreground">{breakdown.summary}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
