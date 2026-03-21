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
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      {/* Entry: choose path */}
      {mode === "choose" && (
        <div className="flex flex-col items-center py-12">
          <h1 className="text-2xl font-semibold">How would you like to start?</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Either way, we&apos;ll find the best positions for you.
          </p>

          <div className="mt-8 grid w-full max-w-lg gap-4 sm:grid-cols-2">
            {/* Upload option */}
            <label className="group cursor-pointer rounded-xl border-2 border-zinc-200 p-6 text-center transition-all hover:border-teal-500 hover:shadow-md">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-zinc-100 transition-colors group-hover:bg-teal-50">
                <svg
                  className="size-7 text-zinc-500 group-hover:text-teal-600"
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
              <p className="mt-3 font-medium">Upload Resume</p>
              <p className="mt-1 text-xs text-muted-foreground">
                PDF, DOCX, or TXT
              </p>
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
              className="group rounded-xl border-2 border-zinc-200 p-6 text-center transition-all hover:border-teal-500 hover:shadow-md"
            >
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-zinc-100 transition-colors group-hover:bg-teal-50">
                <svg
                  className="size-7 text-zinc-500 group-hover:text-teal-600"
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
              <p className="mt-3 font-medium">Tell Us About Yourself</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Quick AI chat, ~30 seconds
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Analyzing spinner */}
      {mode === "analyzing" && (
        <div className="flex flex-col items-center py-24">
          <div className="size-10 animate-spin rounded-full border-3 border-zinc-200 border-t-teal-500" />
          <p className="mt-4 font-medium">Reading your resume...</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Extracting skills and finding the best matches
          </p>
        </div>
      )}

      {/* Chat flow */}
      {mode === "chat" && (
        <div>
          <button
            type="button"
            onClick={() => setMode("choose")}
            className="mb-4 text-sm text-muted-foreground hover:text-foreground"
          >
            &larr; Back
          </button>
          <ChatIntake onComplete={handleChatComplete} />
        </div>
      )}

      {/* Results */}
      {mode === "results" && profile && (
        <Results profile={profile} matches={matches} />
      )}
    </div>
  )
}
