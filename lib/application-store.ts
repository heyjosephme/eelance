export type ApplicationStatus =
  | "applied"
  | "under_review"
  | "interview_scheduled"
  | "not_selected"

export type TrackedApplication = {
  positionId: string
  positionTitle: string
  company: string
  location: string
  stack: string[]
  score: number
  status: ApplicationStatus
  appliedAt: string
  updatedAt: string
}

const STORAGE_KEY = "eelance_applications"

// Pre-seeded demo applications so the page isn't empty on first visit
const seedApplications: TrackedApplication[] = [
  {
    positionId: "2",
    positionTitle: "Backend Engineer (Go)",
    company: "StartupXYZ",
    location: "tokyo",
    stack: ["Go", "gRPC", "PostgreSQL", "Kubernetes", "Terraform"],
    score: 88,
    status: "interview_scheduled",
    appliedAt: "2026-03-18T09:00:00Z",
    updatedAt: "2026-03-20T14:30:00Z",
  },
  {
    positionId: "7",
    positionTitle: "DevOps / SRE Engineer",
    company: "CloudNative Corp",
    location: "remote",
    stack: ["AWS", "GCP", "Terraform", "Kubernetes", "Go", "Datadog"],
    score: 76,
    status: "under_review",
    appliedAt: "2026-03-19T11:00:00Z",
    updatedAt: "2026-03-20T08:00:00Z",
  },
  {
    positionId: "5",
    positionTitle: "ML/Data Engineer",
    company: "HealthTech AI",
    location: "tokyo",
    stack: ["Python", "PyTorch", "FastAPI", "PostgreSQL", "Docker"],
    score: 62,
    status: "not_selected",
    appliedAt: "2026-03-15T10:00:00Z",
    updatedAt: "2026-03-19T16:00:00Z",
  },
]

export function getTrackedApplications(): TrackedApplication[] {
  if (typeof window === "undefined") return []
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    // Seed on first visit
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedApplications))
    return seedApplications
  }
  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function addTrackedApplication(app: Omit<TrackedApplication, "status" | "updatedAt">) {
  const apps = getTrackedApplications()
  if (apps.some((a) => a.positionId === app.positionId)) return // already tracked
  const newApp: TrackedApplication = {
    ...app,
    status: "applied",
    updatedAt: app.appliedAt,
  }
  apps.unshift(newApp)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps))
}

export function isPositionApplied(positionId: string): boolean {
  return getTrackedApplications().some((a) => a.positionId === positionId)
}

export function getStatusLabel(status: ApplicationStatus): string {
  switch (status) {
    case "applied":
      return "Applied"
    case "under_review":
      return "Under Review"
    case "interview_scheduled":
      return "Interview Scheduled"
    case "not_selected":
      return "Not Selected"
  }
}

export function getStatusColor(status: ApplicationStatus): {
  bg: string
  text: string
  dot: string
} {
  switch (status) {
    case "applied":
      return { bg: "bg-zinc-100", text: "text-zinc-700", dot: "bg-zinc-400" }
    case "under_review":
      return { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" }
    case "interview_scheduled":
      return { bg: "bg-teal-50", text: "text-teal-700", dot: "bg-teal-500" }
    case "not_selected":
      return { bg: "bg-red-50", text: "text-red-600", dot: "bg-red-400" }
  }
}
