"use client"

import { useState } from "react"
import type { ExtractedProfile, MatchedPosition } from "@/lib/data/mock-resume-result"
import { mockExtractedProfile, mockMatches } from "@/lib/data/mock-resume-result"
import { ChatIntake } from "./chat-intake"
import { Results } from "./results"

type Mode = "choose" | "upload" | "analyzing" | "chat" | "results"

export default function UploadPage() {
  const [mode, setMode] = useState<Mode>("choose")
  const [profile, setProfile] = useState<ExtractedProfile | null>(null)
  const [matches, setMatches] = useState<MatchedPosition[]>([])

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setMode("analyzing")
    await new Promise((r) => setTimeout(r, 2000))
    setProfile(mockExtractedProfile)
    setMatches(mockMatches)
    setMode("results")
  }

  function handleChatComplete(p: ExtractedProfile, m: MatchedPosition[]) {
    setProfile(p)
    setMatches(m)
    setMode("results")
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      {/* Entry: choose path */}
      {mode === "choose" && (
        <div className="animate-fade-in-up flex flex-col items-center py-8">
          <span className="text-xs font-medium uppercase tracking-widest text-teal-600">
            Step 1
          </span>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">
            How would you like to start?
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Either way, we&apos;ll find the best positions for you.
          </p>

          <div className="mt-10 grid w-full max-w-lg gap-4 sm:grid-cols-2">
            {/* Upload option */}
            <label className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card p-7 text-center shadow-sm transition-all hover:border-teal-500/40 hover:shadow-md hover:shadow-teal-500/5">
              <div className="absolute inset-0 bg-gradient-to-b from-teal-500/[0.03] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-teal-50 transition-colors group-hover:bg-teal-100">
                  <svg
                    className="size-6 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16"
                    />
                  </svg>
                </div>
                <p className="mt-4 text-sm font-semibold">Upload Resume</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  PDF, DOCX, or TXT
                </p>
              </div>
              <input
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {/* Chat option */}
            <button
              type="button"
              onClick={() => setMode("chat")}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-7 text-center shadow-sm transition-all hover:border-teal-500/40 hover:shadow-md hover:shadow-teal-500/5"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-teal-500/[0.03] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-teal-50 transition-colors group-hover:bg-teal-100">
                  <svg
                    className="size-6 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <p className="mt-4 text-sm font-semibold">
                  Tell Us About Yourself
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Quick AI chat &middot; ~30 seconds
                </p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Analyzing spinner */}
      {mode === "analyzing" && (
        <div className="animate-fade-in flex flex-col items-center py-28">
          <div className="relative size-12">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-zinc-200 border-t-teal-500" />
            <div className="absolute inset-2 animate-spin rounded-full border-2 border-zinc-100 border-b-teal-300" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
          </div>
          <p className="mt-5 font-medium">Reading your resume...</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Extracting skills and finding the best matches
          </p>
        </div>
      )}

      {/* Chat flow */}
      {mode === "chat" && (
        <div className="animate-fade-in">
          <button
            type="button"
            onClick={() => setMode("choose")}
            className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <ChatIntake onComplete={handleChatComplete} />
        </div>
      )}

      {/* Results */}
      {mode === "results" && profile && (
        <div className="animate-fade-in-up">
          <Results profile={profile} matches={matches} />
        </div>
      )}
    </div>
  )
}
