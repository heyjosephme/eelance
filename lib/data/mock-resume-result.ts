export type ExtractedProfile = {
  name: string
  title: string
  yearsOfExperience: number
  skills: string[]
  recentRole: string
  recentCompany: string
  education: string
  summary: string
}

export const mockExtractedProfile: ExtractedProfile = {
  name: "Tanaka Yuki",
  title: "Full-Stack Engineer",
  yearsOfExperience: 6,
  skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
  recentRole: "Senior Frontend Engineer",
  recentCompany: "Mercari, Inc.",
  education: "B.S. Computer Science — University of Tokyo",
  summary:
    "Full-stack engineer with 6 years of experience building web applications. Strong frontend focus with React/Next.js, comfortable with backend Node.js and infrastructure. Led a 4-person team on a payment integration project. Contributed to open-source design system libraries.",
}

export type MatchedPosition = {
  positionId: string
  score: number
  reason: string
}

export const mockMatches: MatchedPosition[] = [
  {
    positionId: "1",
    score: 95,
    reason:
      "Exact stack match — React, Next.js, TypeScript, PostgreSQL. 6 years experience aligns with senior-level role. Rate range fits.",
  },
  {
    positionId: "3",
    score: 78,
    reason:
      "React experience transfers well. PostgreSQL and AWS overlap. Rails is new but full-stack background makes ramp-up fast.",
  },
  {
    positionId: "10",
    score: 72,
    reason:
      "Strong frontend skills translate to Vue.js. TypeScript and Tailwind CSS are direct matches. Component library experience is a plus.",
  },
]
