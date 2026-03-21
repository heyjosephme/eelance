export type EngineerProfile = {
  id: string
  name: string
  title: string
  yearsOfExperience: number
  skills: string[]
  rateMin: number
  rateMax: number
  bio: string
}

export type Application = {
  id: string
  positionId: string
  engineer: EngineerProfile
  status: "pending" | "accepted" | "rejected"
  matchScore: number
  appliedAt: string
}

export const engineers: EngineerProfile[] = [
  {
    id: "e1",
    name: "Tanaka Yuki",
    title: "Full-Stack Engineer",
    yearsOfExperience: 6,
    skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    rateMin: 700000,
    rateMax: 900000,
    bio: "6 years building web apps. Led frontend team at Mercari. Open-source contributor.",
  },
  {
    id: "e2",
    name: "Suzuki Hana",
    title: "Backend Engineer",
    yearsOfExperience: 8,
    skills: ["Go", "Python", "PostgreSQL", "Kubernetes", "gRPC", "Terraform"],
    rateMin: 800000,
    rateMax: 1100000,
    bio: "8 years in backend/infra. Previously at LINE. Strong in distributed systems and observability.",
  },
  {
    id: "e3",
    name: "Yamamoto Ren",
    title: "Frontend Engineer",
    yearsOfExperience: 4,
    skills: ["React", "TypeScript", "Vue.js", "Tailwind CSS", "Figma"],
    rateMin: 550000,
    rateMax: 750000,
    bio: "4 years focused on frontend. Design system experience. Previously at CyberAgent.",
  },
  {
    id: "e4",
    name: "Sato Mei",
    title: "DevOps / SRE",
    yearsOfExperience: 5,
    skills: ["AWS", "Terraform", "Kubernetes", "Docker", "Go", "Datadog"],
    rateMin: 750000,
    rateMax: 950000,
    bio: "5 years in SRE. Built CI/CD for 50+ microservices at Rakuten. On-call veteran.",
  },
]

export const applications: Application[] = [
  {
    id: "a1",
    positionId: "1", // Senior React/Next.js Engineer at TechCorp
    engineer: engineers[0], // Tanaka Yuki
    status: "pending",
    matchScore: 95,
    appliedAt: "2026-03-20",
  },
  {
    id: "a2",
    positionId: "1",
    engineer: engineers[2], // Yamamoto Ren
    status: "pending",
    matchScore: 72,
    appliedAt: "2026-03-19",
  },
  {
    id: "a3",
    positionId: "2", // Backend Engineer (Go) at StartupXYZ
    engineer: engineers[1], // Suzuki Hana
    status: "pending",
    matchScore: 92,
    appliedAt: "2026-03-20",
  },
  {
    id: "a4",
    positionId: "7", // DevOps/SRE at CloudNative
    engineer: engineers[3], // Sato Mei
    status: "pending",
    matchScore: 88,
    appliedAt: "2026-03-19",
  },
  {
    id: "a5",
    positionId: "7",
    engineer: engineers[1], // Suzuki Hana
    status: "pending",
    matchScore: 76,
    appliedAt: "2026-03-18",
  },
]

export function getApplicationsByPosition(positionId: string) {
  return applications.filter((a) => a.positionId === positionId)
}
