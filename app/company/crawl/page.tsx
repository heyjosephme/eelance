"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Position } from "@/lib/data/positions"
import { addCrawledPosition } from "@/lib/position-store"

type CrawlState =
  | { step: "input" }
  | { step: "crawling"; url: string }
  | { step: "preview"; position: Omit<Position, "id" | "createdAt">; demo?: boolean }
  | { step: "error"; message: string }
  | { step: "published" }

function formatRate(rate: number) {
  return `¥${(rate / 10000).toFixed(0)}万`
}

export default function CrawlPage() {
  const router = useRouter()
  const [state, setState] = useState<CrawlState>({ step: "input" })
  const [url, setUrl] = useState("")
  const [text, setText] = useState("")
  const [mode, setMode] = useState<"url" | "text">("url")

  async function handleCrawl() {
    const input = mode === "url" ? url.trim() : text.trim()
    if (!input) return

    setState({ step: "crawling", url: mode === "url" ? input : "text input" })

    try {
      const res = await fetch("/api/crawl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "url" ? { url: input } : { text: input }
        ),
      })

      const data = await res.json()

      if (!res.ok) {
        setState({ step: "error", message: data.error || "Failed to parse" })
        return
      }

      setState({ step: "preview", position: data.position, demo: data.demo })
    } catch (err) {
      setState({
        step: "error",
        message: err instanceof Error ? err.message : "Network error",
      })
    }
  }

  function handlePublish() {
    if (state.step !== "preview") return
    addCrawledPosition(state.position)
    setState({ step: "published" })
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Dark header */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="mx-auto max-w-3xl px-6 pb-14 pt-8">
          <nav className="animate-fade-in-up flex items-center gap-2 text-sm text-zinc-500">
            <Link
              href="/company"
              className="transition-colors hover:text-zinc-300"
            >
              Dashboard
            </Link>
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
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-zinc-400">Import Position</span>
          </nav>
          <h1 className="animate-fade-in-up mt-5 text-xl font-bold text-white">
            Import Job Posting
          </h1>
          <p className="animate-fade-in-up stagger-1 mt-1 text-sm text-zinc-400">
            Paste a job posting URL or text — AI extracts a structured position
            in seconds
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl px-6 py-8">
        {/* Input step */}
        {state.step === "input" && (
          <Card className="animate-fade-in-up -mt-10 overflow-hidden shadow-lg shadow-zinc-200/50">
            <CardHeader>
              <CardTitle className="text-base">Source</CardTitle>
              <CardDescription>
                Provide a URL to a job posting page, or paste the text directly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Mode toggle */}
              <div className="flex gap-1 rounded-lg bg-muted p-1">
                <button
                  type="button"
                  onClick={() => setMode("url")}
                  className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                    mode === "url"
                      ? "bg-white text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setMode("text")}
                  className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                    mode === "text"
                      ? "bg-white text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Paste Text
                </button>
              </div>

              {mode === "url" ? (
                <div>
                  <label
                    htmlFor="url-input"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Job posting URL
                  </label>
                  <input
                    id="url-input"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://company.com/careers/senior-engineer"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30"
                  />
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="text-input"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Job posting text
                  </label>
                  <textarea
                    id="text-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={`Paste the job description here...\n\nExample:\nSenior Frontend Engineer — Remote\nWe're looking for a React/TypeScript expert to join our team...`}
                    rows={8}
                    className="mt-1.5 w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm leading-relaxed outline-none transition-colors focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30"
                  />
                </div>
              )}

              <button
                type="button"
                onClick={handleCrawl}
                disabled={mode === "url" ? !url.trim() : !text.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-teal-500/30 transition-colors hover:bg-teal-400 disabled:opacity-40 disabled:hover:bg-teal-500"
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
                Extract with AI
              </button>

              <p className="text-center text-[11px] text-muted-foreground">
                Powered by Claude — extracts title, stack, requirements, rate
                and more
              </p>
            </CardContent>
          </Card>
        )}

        {/* Crawling animation */}
        {state.step === "crawling" && (
          <Card className="animate-fade-in -mt-10 overflow-hidden shadow-lg shadow-zinc-200/50">
            <CardContent className="flex flex-col items-center py-16">
              <div className="relative size-16">
                <div className="absolute inset-0 animate-spin rounded-full border-2 border-zinc-200 border-t-teal-500" />
                <div
                  className="absolute inset-2 animate-spin rounded-full border-2 border-zinc-100 border-b-teal-300"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "1.5s",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="size-5 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <p className="mt-5 text-lg font-medium">
                AI is extracting position data...
              </p>
              <p className="mt-1 max-w-xs truncate text-sm text-muted-foreground">
                {state.url}
              </p>
              <div className="mt-6 flex items-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 animate-pulse rounded-full bg-teal-500" />
                  Fetching page
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-zinc-300" />
                  AI extraction
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-zinc-300" />
                  Structuring
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error */}
        {state.step === "error" && (
          <Card className="animate-fade-in -mt-10 overflow-hidden shadow-lg shadow-zinc-200/50">
            <CardContent className="flex flex-col items-center py-12">
              <div className="flex size-14 items-center justify-center rounded-full bg-red-50">
                <svg
                  className="size-6 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <p className="mt-4 font-medium">Failed to extract</p>
              <p className="mt-1 max-w-sm text-center text-sm text-muted-foreground">
                {state.message}
              </p>
              <button
                type="button"
                onClick={() => setState({ step: "input" })}
                className="mt-6 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                Try Again
              </button>
            </CardContent>
          </Card>
        )}

        {/* Preview extracted position */}
        {state.step === "preview" && (
          <div className="animate-fade-in-up -mt-10 space-y-4">
            {/* Success banner */}
            <Card className="border-teal-200 bg-teal-50/50 shadow-lg shadow-zinc-200/50">
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-teal-100">
                    <svg
                      className="size-4 text-teal-600"
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
                  <div>
                    <p className="text-sm font-medium text-teal-900">
                      Position extracted successfully
                    </p>
                    <p className="text-xs text-teal-700/70">
                      Review the details below, then publish to your dashboard
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-medium shadow-sm">
                  <svg className="size-3 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-teal-800">
                    {state.demo ? "AI Demo Mode" : "Extracted by Claude"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Position preview card */}
            <Card className="overflow-hidden shadow-lg shadow-zinc-200/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3.5">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 text-sm font-bold text-white shadow-sm">
                    {state.position.companyLogo ??
                      state.position.company.charAt(0)}
                  </div>
                  <div>
                    <CardTitle>{state.position.title}</CardTitle>
                    <CardDescription className="mt-0.5">
                      {state.position.company} &middot;{" "}
                      <span className="capitalize">
                        {state.position.location}
                      </span>{" "}
                      &middot;{" "}
                      <span className="capitalize">
                        {state.position.contractType}
                      </span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                {/* Description */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {state.position.description}
                </p>

                {/* Meta grid */}
                <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/50 p-4 text-sm sm:grid-cols-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Rate</p>
                    <p className="mt-0.5 font-mono text-sm font-medium">
                      {formatRate(state.position.rateMin)}–
                      {formatRate(state.position.rateMax)}/月
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="mt-0.5 font-medium">
                      {state.position.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Team Size</p>
                    <p className="mt-0.5 font-medium">
                      {state.position.teamSize} people
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Start</p>
                    <p className="mt-0.5 font-medium">
                      {state.position.startDate}
                    </p>
                  </div>
                </div>

                {/* Stack */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Tech Stack
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {state.position.stack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Responsibilities */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Responsibilities
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {state.position.responsibilities.map((r, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <span className="mt-[7px] block size-1.5 shrink-0 rounded-full bg-teal-500" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Requirements
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {state.position.requirements.map((r, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <span className="mt-[7px] block size-1.5 shrink-0 rounded-full bg-zinc-400" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Nice to have */}
                {state.position.niceToHave.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Nice to Have
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {state.position.niceToHave.map((r, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground"
                        >
                          <span className="mt-[7px] block size-1.5 shrink-0 rounded-full bg-zinc-300" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Perks */}
                {state.position.perks.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Perks
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {state.position.perks.map((r, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground"
                        >
                          <span className="mt-[7px] block size-1.5 shrink-0 rounded-full bg-emerald-400" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Separator />

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handlePublish}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-teal-500/30 transition-colors hover:bg-teal-400"
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Publish Position
                  </button>
                  <button
                    type="button"
                    onClick={() => setState({ step: "input" })}
                    className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Re-crawl
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Published success */}
        {state.step === "published" && (
          <Card className="animate-fade-in -mt-10 overflow-hidden shadow-lg shadow-zinc-200/50">
            <CardContent className="flex flex-col items-center py-14">
              <div className="flex size-16 items-center justify-center rounded-full bg-teal-50">
                <svg
                  className="size-7 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="mt-4 text-lg font-bold">Position Published!</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Your imported position is now live on the platform
              </p>
              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/company")}
                  className="rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-teal-500/30 transition-colors hover:bg-teal-400"
                >
                  Back to Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUrl("")
                    setText("")
                    setState({ step: "input" })
                  }}
                  className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Import Another
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
