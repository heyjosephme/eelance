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
    <div className="flex flex-1 flex-col">
      {/* Choose path */}
      {mode === "choose" && (
        <>
          {/* Dark header */}
          <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
            <div className="mx-auto max-w-3xl px-6 pb-14 pt-12 text-center">
              <h1 className="animate-fade-in-up text-2xl font-bold tracking-tight text-white">
                Create Your Profile
              </h1>
              <p className="animate-fade-in-up stagger-1 mt-2 text-sm text-zinc-400">
                Upload your resume or tell us about yourself — we&apos;ll find the best positions for you.
              </p>
            </div>
          </div>

          {/* Cards overlapping header */}
          <div className="mx-auto w-full max-w-lg px-6">
            <div className="-mt-8 grid gap-4 sm:grid-cols-2">
              {/* Upload option */}
              <label className="animate-fade-in-up stagger-2 group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card p-8 text-center shadow-lg shadow-zinc-200/50 transition-all hover:border-teal-500/40 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-b from-teal-500/[0.03] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-teal-50 transition-colors group-hover:bg-teal-100">
                    <svg className="size-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16" />
                    </svg>
                  </div>
                  <p className="mt-4 font-semibold">Upload Resume</p>
                  <p className="mt-1 text-sm text-muted-foreground">
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
                className="animate-fade-in-up stagger-3 group relative overflow-hidden rounded-xl border border-border bg-card p-8 text-center shadow-lg shadow-zinc-200/50 transition-all hover:border-teal-500/40 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-teal-500/[0.03] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-teal-50 transition-colors group-hover:bg-teal-100">
                    <svg className="size-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="mt-4 font-semibold">Tell Us About Yourself</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Quick AI chat &middot; ~30 seconds
                  </p>
                </div>
              </button>
            </div>
          </div>

          <div className="flex-1" />
        </>
      )}

      {/* Analyzing spinner */}
      {mode === "analyzing" && (
        <div className="flex flex-1 flex-col">
          <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
            <div className="mx-auto max-w-3xl px-6 py-12 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Analyzing Your Resume
              </h1>
            </div>
          </div>
          <div className="animate-fade-in flex flex-1 flex-col items-center justify-center py-16">
            <div className="relative size-14">
              <div className="absolute inset-0 animate-spin rounded-full border-2 border-zinc-200 border-t-teal-500" />
              <div className="absolute inset-2 animate-spin rounded-full border-2 border-zinc-100 border-b-teal-300" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
            </div>
            <p className="mt-5 text-lg font-medium">Reading your resume...</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Extracting skills and finding the best matches
            </p>
          </div>
        </div>
      )}

      {/* Chat flow */}
      {mode === "chat" && (
        <div className="flex flex-1 flex-col">
          <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
            <div className="mx-auto max-w-3xl px-6 pb-8 pt-8">
              <button
                type="button"
                onClick={() => setMode("choose")}
                className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <h1 className="mt-3 text-xl font-bold tracking-tight text-white">
                Quick Profile Setup
              </h1>
              <p className="mt-1 text-sm text-zinc-400">
                Answer a few questions and we&apos;ll find your best matches.
              </p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-6">
            <ChatIntake onComplete={handleChatComplete} />
          </div>
        </div>
      )}

      {/* Results */}
      {mode === "results" && profile && (
        <div className="flex flex-1 flex-col">
          <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
            <div className="mx-auto max-w-3xl px-6 pb-10 pt-8">
              <h1 className="animate-fade-in-up text-2xl font-bold tracking-tight text-white">
                Your Matches
              </h1>
              <p className="animate-fade-in-up stagger-1 mt-1 text-sm text-zinc-400">
                AI-scored positions based on your profile
              </p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-3xl px-6 py-8">
            <Results profile={profile} matches={matches} />
          </div>
        </div>
      )}
    </div>
  )
}
