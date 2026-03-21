"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ExtractedProfile, MatchedPosition } from "@/lib/data/mock-resume-result"
import { positions, getPosition } from "@/lib/data/positions"
import { scorePositionForEngineer, type ScoreBreakdown } from "@/lib/scoring"
import {
  type SavedProfile,
  getSavedProfile,
  getSubscription,
  type SubscriptionTier,
} from "@/lib/profile-store"
import {
  getTrackedApplications,
  type TrackedApplication,
} from "@/lib/application-store"
import { PaywallModal } from "./paywall-modal"

function scoreColor(score: number) {
  if (score >= 80) return "text-teal-600"
  if (score >= 60) return "text-blue-600"
  return "text-zinc-500"
}

function formatRate(rate: number) {
  return `¥${(rate / 10000).toFixed(0)}万`
}

type ScoredPosition = {
  positionId: string
  score: number
  reason: string
  position: NonNullable<ReturnType<typeof getPosition>>
  breakdown: ScoreBreakdown
}

function generateMatches(
  profile: ExtractedProfile,
  excludeIds: Set<string>,
  limit: number
): ScoredPosition[] {
  const engineerData = {
    skills: profile.skills,
    rateMin: 600000,
    rateMax: 1000000,
    location: "anywhere",
  }

  return positions
    .filter((pos) => !excludeIds.has(pos.id))
    .map((pos) => {
      const breakdown = scorePositionForEngineer(engineerData, pos)
      return {
        positionId: pos.id,
        score: breakdown.total,
        reason: breakdown.summary,
        position: pos,
        breakdown,
      }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

export function DashboardContent() {
  const [saved, setSaved] = useState<SavedProfile | null>(null)
  const [subscription, setSubscriptionState] = useState<SubscriptionTier>("free")
  const [applications, setApplications] = useState<TrackedApplication[]>([])
  const [recommendations, setRecommendations] = useState<ScoredPosition[]>([])
  const [aiSuggestions, setAiSuggestions] = useState<ScoredPosition[]>([])
  const [showPaywall, setShowPaywall] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const profile = getSavedProfile()
    const sub = getSubscription()
    const apps = getTrackedApplications()

    setSaved(profile)
    setSubscriptionState(sub)
    setApplications(apps)

    if (profile) {
      const appliedIds = new Set(apps.map((a) => a.positionId))
      const recs = generateMatches(profile.profile, appliedIds, 3)
      setRecommendations(recs)
    }

    setLoaded(true)
  }, [])

  async function handleSuggestMore() {
    if (subscription === "free") {
      setShowPaywall(true)
      return
    }
    if (!saved) return

    setAiLoading(true)
    // Simulate AI thinking
    await new Promise((r) => setTimeout(r, 2000))

    const existingIds = new Set([
      ...applications.map((a) => a.positionId),
      ...recommendations.map((r) => r.positionId),
    ])
    const more = generateMatches(saved.profile, existingIds, 5)
    setAiSuggestions(more)
    setAiLoading(false)
  }

  function handleSubscribed() {
    setSubscriptionState("pro")
    setShowPaywall(false)
    // Auto-trigger AI suggestions after subscribing
    if (saved) {
      handleSuggestMore()
    }
  }

  if (!loaded) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
      </div>
    )
  }

  // No profile yet — redirect to upload
  if (!saved) {
    return (
      <div className="mx-auto w-full max-w-3xl px-6 py-12">
        <div className="animate-fade-in-up flex flex-col items-center py-16 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-muted">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-xl font-bold">Set Up Your Profile</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Upload your resume or chat with AI to create your profile.
            <br />
            We&apos;ll save it so you never have to do it again.
          </p>
          <Link
            href="/upload"
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-teal-500 px-5 text-sm font-medium text-white shadow-sm shadow-teal-500/20 transition-all hover:bg-teal-400 hover:shadow-md"
          >
            Get Started
            <svg
              className="size-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  const { profile } = saved
  const activeApps = applications.filter(
    (a) => a.status !== "not_selected"
  ).length

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      {/* Header */}
      <div className="animate-fade-in-up flex items-start justify-between">
        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-teal-600">
            Dashboard
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Welcome back, {profile.name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile.title} &middot; {profile.yearsOfExperience} years
          </p>
        </div>
        <div className="flex items-center gap-2">
          {subscription === "pro" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 px-3 py-1 text-xs font-bold text-white shadow-sm">
              <svg className="size-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              PRO
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setShowPaywall(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 transition-all hover:bg-teal-100"
            >
              Upgrade to Pro
            </button>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="animate-fade-in-up stagger-1 mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {profile.skills.length}
            </p>
            <p className="text-[11px] text-muted-foreground">Skills</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-teal-600">{activeApps}</p>
            <p className="text-[11px] text-muted-foreground">Active Apps</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {recommendations.length + aiSuggestions.length}
            </p>
            <p className="text-[11px] text-muted-foreground">Matches</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {profile.yearsOfExperience}
            </p>
            <p className="text-[11px] text-muted-foreground">Years Exp</p>
          </CardContent>
        </Card>
      </div>

      {/* Profile card */}
      <Card className="animate-fade-in-up stagger-2 mt-6 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-teal-500 to-emerald-400" />
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-100 to-emerald-50 text-sm font-bold text-teal-700">
                {profile.name.charAt(0)}
              </div>
              <div>
                <CardTitle className="text-base">{profile.name}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {profile.title}
                  {profile.recentCompany && ` · ${profile.recentCompany}`}
                </p>
              </div>
            </div>
            <Link
              href="/upload"
              className="text-xs text-muted-foreground transition-colors hover:text-teal-600"
            >
              Update profile
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            {profile.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
          {profile.summary && (
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {profile.summary}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Recommended positions */}
      <div className="animate-fade-in-up stagger-3 mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-tight">
              Recommended for You
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Based on your skills and experience
            </p>
          </div>
          <Link
            href="/applications"
            className="text-xs text-muted-foreground transition-colors hover:text-teal-600"
          >
            View all applications →
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {recommendations.map((rec, i) => (
            <PositionMatchCard key={rec.positionId} match={rec} index={i} skills={profile.skills} />
          ))}
        </div>
      </div>

      {/* Suggest More by AI */}
      <div className="animate-fade-in-up stagger-4 mt-8">
        <Card className="overflow-hidden border-dashed">
          <CardContent className="p-0">
            {/* AI header */}
            <div className="flex items-center justify-between border-b bg-gradient-to-r from-zinc-50 to-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-[oklch(0.14_0.02_260)] to-[oklch(0.22_0.03_260)]">
                  <span className="text-[10px] font-bold text-teal-400">
                    AI
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">
                    Suggest More by AI
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Deep analysis finds hidden opportunities
                  </p>
                </div>
              </div>
              {subscription === "free" && (
                <span className="rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 px-2.5 py-0.5 text-[10px] font-bold text-white">
                  PRO
                </span>
              )}
            </div>

            <div className="p-4">
              {aiSuggestions.length === 0 && !aiLoading && (
                <div className="flex flex-col items-center py-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    {subscription === "free"
                      ? "Unlock AI-powered deep matching to discover positions you might have missed"
                      : "Let AI analyze your profile against all positions for hidden gems"}
                  </p>
                  <Button
                    onClick={handleSuggestMore}
                    className="mt-3 gap-2 bg-gradient-to-r from-teal-600 to-emerald-500 shadow-sm shadow-teal-600/20 hover:from-teal-500 hover:to-emerald-400"
                  >
                    <svg
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    {subscription === "free"
                      ? "Unlock AI Suggestions"
                      : "Generate Suggestions"}
                  </Button>
                </div>
              )}

              {aiLoading && (
                <div className="flex flex-col items-center py-6">
                  <div className="relative size-10">
                    <div className="absolute inset-0 animate-spin rounded-full border-2 border-zinc-200 border-t-teal-500" />
                    <div
                      className="absolute inset-2 animate-spin rounded-full border-2 border-zinc-100 border-b-teal-300"
                      style={{
                        animationDirection: "reverse",
                        animationDuration: "1.5s",
                      }}
                    />
                  </div>
                  <p className="mt-3 text-sm font-medium">
                    AI is analyzing your profile...
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Finding hidden opportunities across all positions
                  </p>
                </div>
              )}

              {aiSuggestions.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-teal-600">
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span className="font-medium">
                      AI found {aiSuggestions.length} additional matches
                    </span>
                  </div>
                  {aiSuggestions.map((sug, i) => (
                    <PositionMatchCard
                      key={sug.positionId}
                      match={sug}
                      index={i}
                      skills={profile.skills}
                      isAi
                    />
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Paywall modal */}
      {showPaywall && (
        <PaywallModal
          onClose={() => setShowPaywall(false)}
          onSubscribed={handleSubscribed}
        />
      )}
    </div>
  )
}

function PositionMatchCard({
  match,
  index,
  skills,
  isAi,
}: {
  match: ScoredPosition
  index: number
  skills: string[]
  isAi?: boolean
}) {
  const { position, breakdown } = match

  return (
    <Card
      className={`transition-all hover:shadow-md hover:shadow-zinc-200/50 ${isAi ? "border-teal-100 bg-teal-50/20" : ""}`}
    >
      <CardContent className="flex items-start gap-4 pt-5 pb-5">
        {/* Score circle */}
        <div className="relative flex size-11 shrink-0 items-center justify-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="oklch(0.95 0 0)"
              strokeWidth="2.5"
            />
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke={
                breakdown.total >= 80
                  ? "oklch(0.65 0.17 175)"
                  : breakdown.total >= 60
                    ? "oklch(0.6 0.15 250)"
                    : "oklch(0.6 0 0)"
              }
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={`${(breakdown.total / 100) * 113.1} 113.1`}
              className="animate-score-fill"
            />
          </svg>
          <span
            className={`relative text-xs font-bold ${scoreColor(breakdown.total)}`}
          >
            {breakdown.total}
          </span>
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Link
              href={`/positions/${position.id}`}
              className="text-sm font-semibold transition-colors hover:text-teal-600"
            >
              {position.title}
            </Link>
            {isAi && (
              <span className="rounded bg-teal-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-teal-700">
                AI Pick
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {position.company} &middot;{" "}
            <span className="capitalize">{position.location}</span> &middot;{" "}
            {formatRate(position.rateMin)}–{formatRate(position.rateMax)}/月
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {position.stack.map((tech) => {
              const isMatch = skills
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
                  className="text-[10px]"
                >
                  {tech}
                </Badge>
              )
            })}
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
            {breakdown.summary}
          </p>
        </div>

        {/* Apply */}
        <Link
          href={`/positions/${position.id}`}
          className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-all hover:border-teal-500 hover:text-teal-600"
        >
          View
        </Link>
      </CardContent>
    </Card>
  )
}
