export type EngineerListing = {
  id: string
  name: string
  title: string
  yearsOfExperience: number
  skills: string[]
  rateMin: number
  rateMax: number
  location: string
  availability: string
  contractType: "freelance" | "contract" | "either"
  summary: string
  highlights: string[]
  lookingFor: string
  createdAt: string
}

export const engineerListings: EngineerListing[] = [
  {
    id: "el1",
    name: "Tanaka Yuki",
    title: "Full-Stack Engineer",
    yearsOfExperience: 6,
    skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
    rateMin: 700000,
    rateMax: 900000,
    location: "remote",
    availability: "Immediately",
    contractType: "freelance",
    summary:
      "Full-stack engineer with 6 years of experience building web applications. Strong frontend focus with React/Next.js, comfortable with backend Node.js and infrastructure.",
    highlights: [
      "Led a 4-person team on a payment integration project at Mercari",
      "Built and maintained a React component library used across 3 products",
      "Contributed to open-source design system libraries (500+ GitHub stars)",
      "Experience with real-time features using WebSockets and Redis pub/sub",
    ],
    lookingFor:
      "SaaS products with a modern stack. Interested in teams that value code quality and ship regularly. Open to greenfield or scaling existing products.",
    createdAt: "2026-03-20",
  },
  {
    id: "el2",
    name: "Suzuki Hana",
    title: "Backend Engineer",
    yearsOfExperience: 8,
    skills: ["Go", "Python", "PostgreSQL", "Kubernetes", "gRPC", "Terraform"],
    rateMin: 800000,
    rateMax: 1100000,
    location: "tokyo",
    availability: "From April 2026",
    contractType: "contract",
    summary:
      "Backend engineer with 8 years in distributed systems and infrastructure. Previously at LINE building high-throughput messaging services.",
    highlights: [
      "Designed microservice architecture handling 10M+ requests/day at LINE",
      "Built observability platform with custom Datadog integrations",
      "Migrated monolith to 12 microservices with zero downtime",
      "Speaker at Go Conference Tokyo 2025",
    ],
    lookingFor:
      "Complex backend challenges — high traffic, distributed systems, data pipelines. Prefer teams with strong engineering culture and code review practices.",
    createdAt: "2026-03-19",
  },
  {
    id: "el3",
    name: "Yamamoto Ren",
    title: "Frontend Engineer",
    yearsOfExperience: 4,
    skills: ["React", "TypeScript", "Vue.js", "Tailwind CSS", "Figma"],
    rateMin: 550000,
    rateMax: 750000,
    location: "remote",
    availability: "Immediately",
    contractType: "either",
    summary:
      "Frontend engineer with 4 years of experience and a strong design sense. Previously at CyberAgent building consumer-facing products.",
    highlights: [
      "Built a design system from scratch used by 5 product teams at CyberAgent",
      "Reduced Largest Contentful Paint by 40% on a high-traffic marketing site",
      "Proficient in Figma — can translate designs to pixel-perfect code independently",
      "Experience with accessibility (WCAG 2.1 AA compliance)",
    ],
    lookingFor:
      "Consumer products where design and UX matter. Happy to work closely with designers or operate independently. Interested in design system work.",
    createdAt: "2026-03-18",
  },
  {
    id: "el4",
    name: "Sato Mei",
    title: "DevOps / SRE Engineer",
    yearsOfExperience: 5,
    skills: ["AWS", "Terraform", "Kubernetes", "Docker", "Go", "Datadog"],
    rateMin: 750000,
    rateMax: 950000,
    location: "remote",
    availability: "From May 2026",
    contractType: "freelance",
    summary:
      "SRE with 5 years of experience. Built CI/CD pipelines and infrastructure for 50+ microservices at Rakuten. On-call veteran.",
    highlights: [
      "Reduced deploy time from 45min to 8min across 50+ microservices",
      "Built self-healing infrastructure with automated incident response",
      "Implemented cost optimization saving ¥3M/month on AWS spend",
      "Created internal developer platform used by 200+ engineers",
    ],
    lookingFor:
      "Companies scaling their infrastructure or migrating to cloud. Enjoy building developer tools and improving deployment workflows.",
    createdAt: "2026-03-17",
  },
  {
    id: "el5",
    name: "Kim Jihoon",
    title: "ML / Data Engineer",
    yearsOfExperience: 5,
    skills: ["Python", "PyTorch", "FastAPI", "PostgreSQL", "Docker", "Apache Spark"],
    rateMin: 750000,
    rateMax: 1000000,
    location: "tokyo",
    availability: "Immediately",
    contractType: "contract",
    summary:
      "ML engineer with 5 years building production ML systems. Background in computer vision and NLP. Previously at Preferred Networks.",
    highlights: [
      "Deployed real-time image classification model serving 1M+ predictions/day",
      "Built end-to-end ML pipeline from data collection to model serving",
      "Published paper on efficient fine-tuning at NeurIPS workshop",
      "Experience with medical imaging data (DICOM, HL7 standards)",
    ],
    lookingFor:
      "Companies with real ML use cases, not just adding AI for buzzwords. Interested in healthcare, robotics, or industrial applications.",
    createdAt: "2026-03-16",
  },
]

export function getEngineerListing(id: string): EngineerListing | undefined {
  return engineerListings.find((e) => e.id === id)
}
