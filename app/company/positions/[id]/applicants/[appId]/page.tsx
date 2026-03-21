"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getPosition } from "@/lib/data/positions"
import { getApplicationsByPosition, engineers } from "@/lib/data/applications"
import { engineerListings } from "@/lib/data/engineer-listings"
import { type ScoreBreakdown, scoreEngineerForPosition } from "@/lib/scoring"

function formatRate(rate: number) {
  return `¥${(rate / 10000).toFixed(0)}万`
}

function scoreColor(score: number) {
  if (score >= 80) return "text-teal-600"
  if (score >= 60) return "text-blue-600"
  return "text-zinc-500"
}

function ScoreBar({ dimension }: { dimension: ScoreBreakdown["dimensions"][number] }) {
  const pct = (dimension.score / dimension.maxScore) * 100
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{dimension.name}</span>
        <span className="font-mono text-xs text-muted-foreground">
          {dimension.score}/{dimension.maxScore}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
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
      <p className="text-xs text-muted-foreground">{dimension.detail}</p>
    </div>
  )
}

export default function ApplicantPreviewPage() {
  const params = useParams<{ id: string; appId: string }>()
  const router = useRouter()
  const [status, setStatus] = useState<"pending" | "accepted" | "rejected">("pending")
  const [scheduling, setScheduling] = useState(false)

  const position = getPosition(params.id)
  const apps = getApplicationsByPosition(params.id)
  const app = apps.find((a) => a.id === params.appId)

  if (!position || !app) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Application not found.</p>
      </div>
    )
  }

  const engineer = app.engineer
  const listing = engineerListings.find((el) => el.name === engineer.name)
  const breakdown = scoreEngineerForPosition(engineer, position, engineers)

  async function handleAccept() {
    setStatus("accepted")
    setScheduling(true)
    await new Promise((r) => setTimeout(r, 1500))
    setScheduling(false)
  }

  function handleReject() {
    setStatus("rejected")
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Dark header */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="mx-auto w-full max-w-4xl px-6 pb-12 pt-8">
          {/* Breadcrumb */}
          <nav className="animate-fade-in-up flex items-center gap-2 text-sm text-zinc-500">
            <Link href="/company" className="transition-colors hover:text-zinc-300">
              Dashboard
            </Link>
            <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link
              href={`/company/positions/${params.id}`}
              className="truncate transition-colors hover:text-zinc-300"
            >
              {position.title}
            </Link>
            <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="truncate text-zinc-400">{engineer.name}</span>
          </nav>

          {/* Engineer header */}
          <div className="animate-fade-in-up mt-6 flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-400/20 to-emerald-400/20 text-2xl font-bold text-teal-400">
              {engineer.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white sm:text-2xl">{engineer.name}</h1>
              <p className="mt-0.5 text-sm text-zinc-400">
                {engineer.title} &middot; {engineer.yearsOfExperience} years experience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto w-full max-w-4xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Left: Profile details */}
          <div className="space-y-5">
            {/* Match score card */}
            <Card className="animate-fade-in-up -mt-14 shadow-lg shadow-zinc-200/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Match Score for {position.title}</CardTitle>
                  <div className="relative flex size-14 items-center justify-center">
                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56">
                      <circle cx="28" cy="28" r="24" fill="none" stroke="oklch(0.93 0 0)" strokeWidth="3" />
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
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {breakdown.dimensions.map((dim) => (
                  <ScoreBar key={dim.name} dimension={dim} />
                ))}
                <Separator />
                <p className="text-xs text-muted-foreground">{breakdown.summary}</p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="animate-fade-in-up">
              <CardContent className="p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Skills
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {engineer.skills.map((skill) => {
                    const isRequired = position.stack
                      .map((s) => s.toLowerCase())
                      .some(
                        (s) =>
                          s.includes(skill.toLowerCase()) ||
                          skill.toLowerCase().includes(s)
                      )
                    return (
                      <Badge key={skill} variant={isRequired ? "default" : "secondary"}>
                        {skill}
                      </Badge>
                    )
                  })}
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Highlighted badges match the position&apos;s required stack
                </p>
              </CardContent>
            </Card>

            {/* Rate & Meta */}
            <Card className="animate-fade-in-up">
              <CardContent className="p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Details
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Rate</p>
                    <p className="mt-0.5 font-mono text-sm font-medium">
                      {formatRate(engineer.rateMin)}–{formatRate(engineer.rateMax)}/月
                    </p>
                  </div>
                  {listing && (
                    <>
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="mt-0.5 text-sm font-medium capitalize">{listing.location}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Available</p>
                        <p className={`mt-0.5 text-sm font-medium ${listing.availability === "Immediately" ? "text-teal-600" : ""}`}>
                          {listing.availability}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card className="animate-fade-in-up">
              <CardContent className="p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  About
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {listing?.summary ?? engineer.bio}
                </p>
              </CardContent>
            </Card>

            {/* Highlights */}
            {listing && listing.highlights.length > 0 && (
              <Card className="animate-fade-in-up">
                <CardContent className="p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Highlights
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {listing.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="mt-[7px] block size-1.5 shrink-0 rounded-full bg-teal-500" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Looking for */}
            {listing?.lookingFor && (
              <Card className="animate-fade-in-up">
                <CardContent className="p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Looking For
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {listing.lookingFor}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right sidebar: Actions */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <Card className="animate-fade-in-up shadow-lg shadow-zinc-200/50">
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold">Review Applicant</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Applied on {app.appliedAt} for {position.title}
                </p>

                <Separator className="my-4" />

                {status === "pending" && (
                  <div className="space-y-2.5">
                    <Button
                      onClick={handleAccept}
                      className="w-full gap-2 bg-teal-600 shadow-sm shadow-teal-600/20 hover:bg-teal-500"
                    >
                      <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Accept &amp; Schedule Interview
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleReject}
                      className="w-full text-muted-foreground hover:border-red-200 hover:text-red-600"
                    >
                      Pass on Candidate
                    </Button>
                  </div>
                )}

                {status === "accepted" && scheduling && (
                  <div className="flex flex-col items-center rounded-lg border border-teal-200 bg-teal-50 py-5">
                    <div className="size-6 animate-spin rounded-full border-2 border-teal-200 border-t-teal-600" />
                    <p className="mt-2 text-sm font-medium text-teal-700">Scheduling interview...</p>
                  </div>
                )}

                {status === "accepted" && !scheduling && (
                  <div className="space-y-3">
                    <div className="rounded-lg border border-teal-200 bg-teal-50 p-4 text-center">
                      <svg className="mx-auto size-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="mt-2 text-sm font-semibold text-teal-800">
                        Interview Scheduled
                      </p>
                      <p className="mt-1 font-mono text-xs text-teal-600">
                        Mar 25 &middot; 14:00 JST
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push(`/company/positions/${params.id}`)}
                    >
                      Back to Applicants
                    </Button>
                  </div>
                )}

                {status === "rejected" && (
                  <div className="space-y-3">
                    <div className="rounded-lg border bg-zinc-50 p-4 text-center">
                      <p className="text-sm text-muted-foreground">Candidate passed</p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push(`/company/positions/${params.id}`)}
                    >
                      Back to Applicants
                    </Button>
                  </div>
                )}

                <Separator className="my-4" />

                <Link
                  href={`/company/positions/${params.id}`}
                  className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to all applicants
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
