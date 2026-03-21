import type { EngineerProfile } from "./data/applications"
import type { Position } from "./data/positions"

// ─── Shared helpers ──────────────────────────────────────────────

function skillMatch(
  engineerSkills: string[],
  positionStack: string[]
): { overlap: string[]; ratio: number } {
  const engLower = engineerSkills.map((s) => s.toLowerCase())
  const posLower = positionStack.map((s) => s.toLowerCase())

  const overlap = engLower.filter((s) =>
    posLower.some((ps) => ps.includes(s) || s.includes(ps))
  )

  const ratio =
    posLower.length > 0 ? overlap.length / posLower.length : 0

  return {
    overlap: overlap.map(
      (s) =>
        engineerSkills.find((es) => es.toLowerCase() === s) ?? s
    ),
    ratio: Math.min(ratio, 1),
  }
}

function rateOverlap(
  engMin: number,
  engMax: number,
  posMin: number,
  posMax: number
): number {
  // Full overlap
  if (posMax >= engMin && posMin <= engMax) return 1
  // Close (within 20%)
  if (posMax >= engMin * 0.8 || posMin <= engMax * 1.2) return 0.5
  return 0
}

function locationMatch(
  engineerPref: string,
  positionLocation: string
): number {
  const eng = engineerPref.toLowerCase()
  const pos = positionLocation.toLowerCase()
  if (eng === "anywhere" || eng === pos) return 1
  if (eng === "remote" && pos === "remote") return 1
  return 0
}

// ─── Score breakdown type ────────────────────────────────────────

export type ScoreBreakdown = {
  total: number
  dimensions: {
    name: string
    score: number
    maxScore: number
    detail: string
  }[]
  summary: string
}

// ─── Engineer → Position scoring ─────────────────────────────────
// "How good is this position for this engineer?"

export function scorePositionForEngineer(
  engineer: { skills: string[]; rateMin: number; rateMax: number; location?: string },
  position: Position
): ScoreBreakdown {
  const { overlap, ratio } = skillMatch(engineer.skills, position.stack)
  const stackScore = Math.round(ratio * 35)

  const rateRatio = rateOverlap(
    engineer.rateMin,
    engineer.rateMax,
    position.rateMin,
    position.rateMax
  )
  const rateScore = Math.round(rateRatio * 30)

  // Growth: skills the position has that the engineer doesn't (learning opportunity)
  const posLower = position.stack.map((s) => s.toLowerCase())
  const engLower = engineer.skills.map((s) => s.toLowerCase())
  const newSkills = posLower.filter(
    (s) => !engLower.some((es) => es.includes(s) || s.includes(es))
  )
  // Some new skills = growth opportunity, too many = bad fit
  const growthRatio = newSkills.length > 0 && newSkills.length <= 2 ? 1 : newSkills.length === 0 ? 0.5 : 0.3
  const growthScore = Math.round(growthRatio * 20)

  const locMatch = locationMatch(engineer.location ?? "anywhere", position.location)
  const locationScore = Math.round(locMatch * 15)

  const total = stackScore + rateScore + growthScore + locationScore

  const reasons: string[] = []
  if (overlap.length > 0) reasons.push(`Uses your skills: ${overlap.join(", ")}`)
  if (rateRatio === 1) reasons.push("Rate fits your range")
  else if (rateRatio > 0) reasons.push("Rate is close to your range")
  if (newSkills.length > 0 && newSkills.length <= 2) {
    const newDisplay = newSkills.map(
      (s) => position.stack.find((ps) => ps.toLowerCase() === s) ?? s
    )
    reasons.push(`Growth opportunity: ${newDisplay.join(", ")}`)
  }
  if (locMatch === 1) reasons.push(`Location: ${position.location}`)

  return {
    total,
    dimensions: [
      {
        name: "Stack Match",
        score: stackScore,
        maxScore: 35,
        detail: overlap.length > 0 ? `${overlap.length}/${position.stack.length} skills match` : "No skill overlap",
      },
      {
        name: "Rate",
        score: rateScore,
        maxScore: 30,
        detail: rateRatio === 1 ? "Within your range" : rateRatio > 0 ? "Close to your range" : "Outside your range",
      },
      {
        name: "Growth",
        score: growthScore,
        maxScore: 20,
        detail: newSkills.length > 0 && newSkills.length <= 2 ? `Learn ${newSkills.length} new skill(s)` : newSkills.length === 0 ? "Already know the full stack" : "Steep learning curve",
      },
      {
        name: "Location",
        score: locationScore,
        maxScore: 15,
        detail: locMatch === 1 ? "Match" : "Different preference",
      },
    ],
    summary: reasons.join(". ") + ".",
  }
}

// ─── Position → Engineer scoring ─────────────────────────────────
// "How good is this engineer for this position?"

export function scoreEngineerForPosition(
  engineer: EngineerProfile,
  position: Position,
  allEngineers: EngineerProfile[]
): ScoreBreakdown {
  // Stack match (35%)
  const { overlap, ratio } = skillMatch(engineer.skills, position.stack)
  const stackScore = Math.round(ratio * 35)

  // Scarcity (20%) — how many engineers in the pool could fill this position?
  const competingEngineers = allEngineers.filter((e) => {
    if (e.id === engineer.id) return false
    const { ratio: r } = skillMatch(e.skills, position.stack)
    return r >= 0.5 // at least 50% stack match
  })
  const scarcityRatio = competingEngineers.length === 0 ? 1 : competingEngineers.length <= 1 ? 0.8 : competingEngineers.length <= 3 ? 0.5 : 0.3
  const scarcityScore = Math.round(scarcityRatio * 20)

  // Experience fit (25%)
  // Estimate position needs based on title keywords
  const titleLower = position.title.toLowerCase()
  let expectedYears = 3
  if (titleLower.includes("senior") || titleLower.includes("lead")) expectedYears = 5
  if (titleLower.includes("junior") || titleLower.includes("entry")) expectedYears = 1

  const expDiff = Math.abs(engineer.yearsOfExperience - expectedYears)
  const expRatio = expDiff === 0 ? 1 : expDiff <= 1 ? 0.9 : expDiff <= 2 ? 0.7 : expDiff <= 4 ? 0.5 : 0.3
  const expScore = Math.round(expRatio * 25)

  // Rate fit (20%)
  const rateRatio = rateOverlap(
    engineer.rateMin,
    engineer.rateMax,
    position.rateMin,
    position.rateMax
  )
  const rateScore = Math.round(rateRatio * 20)

  const total = stackScore + scarcityScore + expScore + rateScore

  const reasons: string[] = []
  if (overlap.length > 0) reasons.push(`Stack: ${overlap.join(", ")}`)
  if (scarcityRatio >= 0.8) reasons.push("Rare skill combination for this role")
  else if (scarcityRatio >= 0.5) reasons.push(`${competingEngineers.length} other candidate(s) match`)
  if (expRatio >= 0.7) reasons.push(`${engineer.yearsOfExperience}y exp fits the role`)
  if (rateRatio === 1) reasons.push("Rate within budget")

  return {
    total,
    dimensions: [
      {
        name: "Stack Match",
        score: stackScore,
        maxScore: 35,
        detail: overlap.length > 0 ? `${overlap.length}/${position.stack.length} required skills` : "No skill overlap",
      },
      {
        name: "Scarcity",
        score: scarcityScore,
        maxScore: 20,
        detail: competingEngineers.length === 0 ? "Only candidate with this skill set" : `${competingEngineers.length} other candidate(s) could fill this`,
      },
      {
        name: "Experience",
        score: expScore,
        maxScore: 25,
        detail: `${engineer.yearsOfExperience}y (role expects ~${expectedYears}y)`,
      },
      {
        name: "Rate Fit",
        score: rateScore,
        maxScore: 20,
        detail: rateRatio === 1 ? "Within budget" : rateRatio > 0 ? "Slightly outside budget" : "Over budget",
      },
    ],
    summary: reasons.join(". ") + ".",
  }
}
