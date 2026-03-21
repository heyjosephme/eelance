import type { ExtractedProfile, MatchedPosition } from "./mock-resume-result"
import { positions } from "./positions"

export type ChatAnswers = {
  name: string
  stack: string
  experience: string
  role: string
  location: string
  rate: string
}

function parseYears(exp: string): number {
  if (exp.includes("8+") || exp.includes("10")) return 9
  const match = exp.match(/(\d+)/)
  if (!match) return 3
  const nums = exp.match(/\d+/g)?.map(Number) ?? [3]
  return nums.length > 1 ? Math.round((nums[0] + nums[1]) / 2) : nums[0]
}

function parseSkills(stack: string): string[] {
  return stack
    .split(/[,、/]/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function parseRate(rate: string): { min: number; max: number } {
  const nums = rate.match(/\d+/g)?.map(Number) ?? []
  if (rate.includes("100+")) return { min: 1000000, max: 1500000 }
  if (nums.length >= 2) return { min: nums[0] * 10000, max: nums[1] * 10000 }
  if (nums.length === 1) return { min: nums[0] * 10000, max: (nums[0] + 20) * 10000 }
  return { min: 600000, max: 800000 }
}

function roleTitleMap(role: string): string {
  const r = role.toLowerCase()
  if (r.includes("front")) return "Frontend Engineer"
  if (r.includes("back")) return "Backend Engineer"
  if (r.includes("full")) return "Full-Stack Engineer"
  if (r.includes("devops") || r.includes("sre")) return "DevOps / SRE Engineer"
  if (r.includes("data") || r.includes("ml")) return "Data / ML Engineer"
  return "Software Engineer"
}

export function buildProfileFromChat(answers: ChatAnswers): {
  profile: ExtractedProfile
  matches: MatchedPosition[]
} {
  const skills = parseSkills(answers.stack)
  const years = parseYears(answers.experience)
  const title = roleTitleMap(answers.role)
  const rate = parseRate(answers.rate)
  const locationPref = answers.location.toLowerCase()

  const profile: ExtractedProfile = {
    name: answers.name || "You",
    title,
    yearsOfExperience: years,
    skills,
    recentRole: title,
    recentCompany: "",
    education: "",
    summary: `${title} with ${years} years of experience. Skills: ${skills.join(", ")}. Looking for ${locationPref} positions in the ¥${rate.min / 10000}万–¥${rate.max / 10000}万 range.`,
  }

  // Score positions against the profile
  const scored = positions.map((pos) => {
    let score = 0

    // Skill overlap (biggest factor)
    const posStackLower = pos.stack.map((s) => s.toLowerCase())
    const userSkillsLower = skills.map((s) => s.toLowerCase())
    const overlap = userSkillsLower.filter((s) =>
      posStackLower.some((ps) => ps.includes(s) || s.includes(ps))
    )
    score += Math.min(overlap.length / Math.max(posStackLower.length, 1), 1) * 50

    // Location match
    if (
      locationPref === "anywhere" ||
      locationPref === pos.location ||
      (locationPref === "remote" && pos.location === "remote")
    ) {
      score += 20
    }

    // Rate overlap
    if (pos.rateMax >= rate.min && pos.rateMin <= rate.max) {
      score += 20
    } else if (pos.rateMax >= rate.min * 0.8) {
      score += 10
    }

    // Experience fit (rough)
    if (years >= 5) score += 10
    else if (years >= 3) score += 7
    else score += 4

    score = Math.min(Math.round(score), 99)

    // Build reason
    const reasons: string[] = []
    if (overlap.length > 0) {
      reasons.push(`Stack overlap: ${overlap.join(", ")}`)
    }
    if (pos.location === locationPref || locationPref === "anywhere") {
      reasons.push(`Location match (${pos.location})`)
    }
    if (pos.rateMax >= rate.min && pos.rateMin <= rate.max) {
      reasons.push("Rate range fits")
    }

    return {
      positionId: pos.id,
      score,
      reason: reasons.join(". ") + ".",
    }
  })

  // Top 3-5 matches
  const matches = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .filter((m) => m.score >= 30)

  return { profile, matches }
}
