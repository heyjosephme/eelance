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

  // Score each applicant using the scoring engine
  const scoredApps = applications
    .map((app) => {
      const breakdown = scoreEngineerForPosition(app.engineer, position, engineers)
      return { app, breakdown }
    })
    .sort((a, b) => b.breakdown.total - a.breakdown.total)

  return (
    <div className="space-y-4">
      {scoredApps.map(({ app, breakdown }) => {
        const status = getStatus(app.id, app.status)
        const isScheduling = scheduling === app.id
        const expanded = expandedId === app.id

        return (
          <Card
            key={app.id}
            className={
              status === "accepted"
                ? "border-teal-200 bg-teal-50/30"
                : status === "rejected"
                  ? "opacity-50"
                  : ""
            }
          >
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                {/* Avatar + score */}
                <button
                  type="button"
                  onClick={() => setExpandedId(expanded ? null : app.id)}
                  className="flex flex-col items-center gap-1"
                  title="Click to see breakdown"
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-zinc-100 text-lg font-semibold text-zinc-600">
                    {app.engineer.name.charAt(0)}
                  </div>
                  <span
                    className={`text-sm font-bold ${breakdown.total >= 80 ? "text-teal-600" : breakdown.total >= 60 ? "text-blue-600" : "text-zinc-500"}`}
                  >
                    {breakdown.total}
                  </span>
                  <span className="text-[10px] text-muted-foreground">/100</span>
                </button>

                {/* Engineer info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const listing = engineerListings.find(
                        (el) => el.name === app.engineer.name
                      )
                      return listing ? (
                        <Link
                          href={`/engineers/${listing.id}`}
                          className="font-medium hover:text-teal-600 hover:underline"
                        >
                          {app.engineer.name}
                        </Link>
                      ) : (
                        <p className="font-medium">{app.engineer.name}</p>
                      )
                    })()}
                    <span className="text-sm text-muted-foreground">
                      {app.engineer.title} &middot;{" "}
                      {app.engineer.yearsOfExperience}y exp
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
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
                    Rate: {formatRate(app.engineer.rateMin)}–
                    {formatRate(app.engineer.rateMax)}/月 &middot;{" "}
                    {breakdown.summary}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 flex-col items-end gap-2">
                  {status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleAccept(app.id)}
                        className="bg-teal-600 hover:bg-teal-500"
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
                      Arranging interview...
                    </div>
                  )}

                  {status === "accepted" && !isScheduling && (
                    <div className="rounded-md bg-teal-100 px-3 py-2 text-center">
                      <p className="text-xs font-medium text-teal-800">
                        Interview scheduled
                      </p>
                      <p className="mt-0.5 text-xs text-teal-600">
                        Mar 25, 2026 · 14:00 JST
                      </p>
                    </div>
                  )}

                  {status === "rejected" && (
                    <span className="text-sm text-muted-foreground">
                      Passed
                    </span>
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
  )
}
