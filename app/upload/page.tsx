"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getPosition } from "@/lib/data/positions"
import {
  type ExtractedProfile,
  type MatchedPosition,
  mockExtractedProfile,
  mockMatches,
} from "@/lib/data/mock-resume-result"

type State = "idle" | "analyzing" | "done"

export default function UploadPage() {
  const [state, setState] = useState<State>("idle")
  const [fileName, setFileName] = useState<string | null>(null)
  const [profile, setProfile] = useState<ExtractedProfile | null>(null)
  const [matches, setMatches] = useState<MatchedPosition[]>([])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  async function handleAnalyze() {
    setState("analyzing")
    // Simulate AI processing delay
    await new Promise((r) => setTimeout(r, 2000))
    setProfile(mockExtractedProfile)
    setMatches(mockMatches)
    setState("done")
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Upload Your Resume</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        We&apos;ll extract your skills and match you to the best positions.
      </p>

      {/* Upload area */}
      <Card className="mt-6">
        <CardContent className="pt-6">
          <label className="flex cursor-pointer flex-col items-center rounded-lg border-2 border-dashed border-zinc-300 px-6 py-10 transition-colors hover:border-teal-500 hover:bg-teal-50/50">
            <svg
              className="size-10 text-zinc-400"
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
            <span className="mt-3 text-sm font-medium">
              {fileName ?? "Click to select a resume (PDF, DOCX, TXT)"}
            </span>
            {fileName && (
              <span className="mt-1 text-xs text-muted-foreground">
                {fileName}
              </span>
            )}
            <input
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <Button
            className="mt-4 w-full"
            size="lg"
            disabled={!fileName || state === "analyzing"}
            onClick={handleAnalyze}
          >
            {state === "analyzing" ? "Analyzing..." : "Analyze Resume"}
          </Button>
        </CardContent>
      </Card>

      {/* Loading state */}
      {state === "analyzing" && (
        <div className="mt-8 flex flex-col items-center gap-3 text-muted-foreground">
          <div className="size-8 animate-spin rounded-full border-2 border-zinc-300 border-t-teal-500" />
          <p className="text-sm">Extracting skills and matching positions...</p>
        </div>
      )}

      {/* Results */}
      {state === "done" && profile && (
        <div className="mt-8 space-y-6">
          {/* Extracted profile */}
          <Card>
            <CardHeader>
              <CardTitle>Extracted Profile</CardTitle>
              <CardDescription>
                Here&apos;s what we found in your resume
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium">{profile.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Title</p>
                  <p className="font-medium">{profile.title}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Experience</p>
                  <p className="font-medium">
                    {profile.yearsOfExperience} years
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Recent Role</p>
                  <p className="font-medium">
                    {profile.recentRole} @ {profile.recentCompany}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Education</p>
                  <p className="font-medium">{profile.education}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Skills</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {profile.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Summary</p>
                <p className="mt-1 text-sm">{profile.summary}</p>
              </div>
            </CardContent>
          </Card>

          {/* Matched positions */}
          <div>
            <h2 className="text-xl font-semibold">Recommended Positions</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Top matches based on your skills and experience
            </p>

            <div className="mt-4 space-y-3">
              {matches.map((match) => {
                const position = getPosition(match.positionId)
                if (!position) return null

                return (
                  <Card key={match.positionId}>
                    <CardContent className="flex gap-4 pt-6">
                      <div className="flex flex-col items-center">
                        <span
                          className={`text-2xl font-bold ${match.score >= 90 ? "text-teal-600" : match.score >= 80 ? "text-blue-600" : "text-zinc-600"}`}
                        >
                          {match.score}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          match
                        </span>
                      </div>
                      <div className="flex-1">
                        <a
                          href={`/positions/${position.id}`}
                          className="font-medium hover:underline"
                        >
                          {position.title}
                        </a>
                        <p className="text-sm text-muted-foreground">
                          {position.company} &middot; {position.location}
                        </p>
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {position.stack.map((tech) => (
                            <Badge
                              key={tech}
                              variant={
                                profile.skills.includes(tech)
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {match.reason}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
