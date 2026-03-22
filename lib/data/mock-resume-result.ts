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
  name: "Fei-Fei Jin",
  title: "Senior Full Stack Developer",
  yearsOfExperience: 10,
  skills: ["C#", ".NET Core", "Python", "Vue.js", "Angular", "TypeScript", "PostgreSQL", "Redis", "Docker", "Azure"],
  recentRole: "Senior Full Stack Engineer",
  recentCompany: "Virtusa (Thomson Reuters)",
  education: "B.S. Information Management — Kunming University of Science and Technology",
  summary:
    "Seasoned full-stack developer with 10+ years building complex applications across finance, tech, and enterprise. Strong expertise in .NET, Python, and cloud-native technologies. Led teams of 3–10 members, delivered low-code platforms, data migration tools, and microservices. Experience spans Japan and China markets with N1 Japanese and TOEIC 875 English.",
}

export type MatchedPosition = {
  positionId: string
  score: number
  reason: string
}

export const mockMatches: MatchedPosition[] = [
  {
    positionId: "10",
    score: 93,
    reason:
      "Direct Vue.js experience from BPM system rewrite. TypeScript proficiency from Thomson Reuters role. Legacy jQuery-to-modern migration matches exactly — did the same WebForm→MVC→Vue transition at Authine.",
  },
  {
    positionId: "12",
    score: 86,
    reason:
      "PostgreSQL and Redis are exact stack matches. 10+ years full-stack experience exceeds requirements. SaaS B2B background from low-code platform work. TypeScript skills transfer directly.",
  },
  {
    positionId: "6",
    score: 79,
    reason:
      "Strong C# expertise from 7+ years of .NET development. OOP architecture skills align well. Japanese market knowledge is a plus. Unity-specific experience would need ramp-up.",
  },
  {
    positionId: "1",
    score: 74,
    reason:
      "PostgreSQL and Redis are direct matches. TypeScript from current Angular role transfers. Microservices architecture experience aligns. React/Next.js would be a framework switch but full-stack depth makes it feasible.",
  },
  {
    positionId: "13",
    score: 68,
    reason:
      "Distributed systems and microservices experience from Authine platform. MySQL knowledge from low-code APaaS work. N1 Japanese is a strong advantage. Java/Kotlin is a language shift but architectural skills transfer.",
  },
]
