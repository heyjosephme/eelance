"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  type ApplicationStatus,
  type TrackedApplication,
  getTrackedApplications,
  getStatusLabel,
  getStatusColor,
} from "@/lib/application-store"

const statusOrder: ApplicationStatus[] = [
  "interview_scheduled",
  "under_review",
  "applied",
  "not_selected",
]

function StatusBadge({ status }: { status: ApplicationStatus }) {
  const colors = getStatusColor(status)
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}
    >
      <span className={`size-1.5 rounded-full ${colors.dot}`} />
      {getStatusLabel(status)}
    </span>
  )
}

function scoreColor(score: number) {
  if (score >= 80) return "text-teal-600"
  if (score >= 60) return "text-blue-600"
  return "text-zinc-500"
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function ApplicationTracker() {
  const [apps, setApps] = useState<TrackedApplication[]>([])
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | "all">("all")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setApps(getTrackedApplications())
    setLoaded(true)
  }, [])

  if (!loaded) {
    return (
      <div className="mt-12 flex justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
      </div>
    )
  }

  const filtered =
    filterStatus === "all"
      ? apps.sort(
          (a, b) =>
            statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
        )
      : apps.filter((a) => a.status === filterStatus)

  const counts = {
    all: apps.length,
    applied: apps.filter((a) => a.status === "applied").length,
    under_review: apps.filter((a) => a.status === "under_review").length,
    interview_scheduled: apps.filter((a) => a.status === "interview_scheduled").length,
    not_selected: apps.filter((a) => a.status === "not_selected").length,
  }

  return (
    <div className="mt-6 space-y-4">
      {/* Filter tabs */}
      <div className="animate-fade-in-up stagger-1 flex flex-wrap gap-2">
        {(
          [
            { key: "all", label: "All" },
            { key: "interview_scheduled", label: "Interview" },
            { key: "under_review", label: "Reviewing" },
            { key: "applied", label: "Applied" },
            { key: "not_selected", label: "Closed" },
          ] as const
        ).map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilterStatus(key)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
              filterStatus === key
                ? "bg-foreground text-background shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {label}
            {counts[key] > 0 && (
              <span className="ml-1.5 opacity-60">{counts[key]}</span>
            )}
          </button>
        ))}
      </div>

      {/* Summary stats */}
      <div className="animate-fade-in-up stagger-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border bg-card p-3 text-center">
          <p className="text-2xl font-bold text-foreground">{counts.all}</p>
          <p className="text-[11px] text-muted-foreground">Total</p>
        </div>
        <div className="rounded-lg border bg-card p-3 text-center">
          <p className="text-2xl font-bold text-teal-600">
            {counts.interview_scheduled}
          </p>
          <p className="text-[11px] text-muted-foreground">Interviews</p>
        </div>
        <div className="rounded-lg border bg-card p-3 text-center">
          <p className="text-2xl font-bold text-blue-600">
            {counts.under_review}
          </p>
          <p className="text-[11px] text-muted-foreground">Reviewing</p>
        </div>
        <div className="rounded-lg border bg-card p-3 text-center">
          <p className="text-2xl font-bold text-zinc-500">
            {counts.applied + counts.not_selected}
          </p>
          <p className="text-[11px] text-muted-foreground">Other</p>
        </div>
      </div>

      {/* Application cards */}
      <div className="space-y-3">
        {filtered.map((app, i) => (
          <Card
            key={app.positionId}
            className={`animate-fade-in-up transition-all hover:shadow-md hover:shadow-zinc-200/50 ${
              app.status === "interview_scheduled"
                ? "border-teal-200"
                : app.status === "not_selected"
                  ? "opacity-60"
                  : ""
            }`}
            style={{ animationDelay: `${(i + 2) * 0.06}s` }}
          >
            <CardContent className="flex items-start gap-4 pt-6">
              {/* Score circle */}
              <div className="relative flex size-12 shrink-0 items-center justify-center">
                <svg
                  className="absolute inset-0 -rotate-90"
                  viewBox="0 0 48 48"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="oklch(0.95 0 0)"
                    strokeWidth="3"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke={
                      app.score >= 80
                        ? "oklch(0.65 0.17 175)"
                        : app.score >= 60
                          ? "oklch(0.6 0.15 250)"
                          : "oklch(0.6 0 0)"
                    }
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${(app.score / 100) * 125.6} 125.6`}
                    className="animate-score-fill"
                  />
                </svg>
                <span
                  className={`relative text-sm font-bold ${scoreColor(app.score)}`}
                >
                  {app.score}
                </span>
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link
                      href={`/positions/${app.positionId}`}
                      className="font-semibold transition-colors hover:text-teal-600"
                    >
                      {app.positionTitle}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {app.company} &middot;{" "}
                      <span className="capitalize">{app.location}</span>
                    </p>
                  </div>
                  <StatusBadge status={app.status} />
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {app.stack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-[11px]"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Timeline */}
                <div className="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground">
                  <span>Applied {formatDate(app.appliedAt)}</span>
                  {app.status !== "applied" && (
                    <>
                      <span className="text-border">|</span>
                      <span>Updated {timeAgo(app.updatedAt)}</span>
                    </>
                  )}
                </div>

                {/* Interview CTA */}
                {app.status === "interview_scheduled" && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-teal-50 px-3 py-2 text-xs text-teal-700">
                    <svg
                      className="size-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium">
                      Interview scheduled — check your email for details
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">
            No applications in this category.
          </p>
        </div>
      )}

      {apps.length === 0 && (
        <div className="animate-fade-in-up py-16 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-muted">
            <svg
              className="size-7 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="mt-4 font-medium">No applications yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload your resume or chat with AI to find matching positions
          </p>
          <Link
            href="/upload"
            className="mt-4 inline-flex h-9 items-center rounded-lg bg-teal-500 px-4 text-sm font-medium text-white shadow-sm shadow-teal-500/20 transition-all hover:bg-teal-400"
          >
            Get Started
          </Link>
        </div>
      )}
    </div>
  )
}
