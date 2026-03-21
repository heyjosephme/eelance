export type Position = {
  id: string
  company: string
  title: string
  description: string
  stack: string[]
  rateMin: number
  rateMax: number
  location: string
  contractType: "freelance" | "contract"
  createdAt: string
}

export const positions: Position[] = [
  {
    id: "1",
    company: "TechCorp Japan",
    title: "Senior React/Next.js Engineer",
    description:
      "Build and maintain our customer-facing SaaS platform. You'll work on a modern stack with a small, senior team. We need someone who can own features end-to-end, from API design to polished UI. Experience with real-time data and WebSockets is a plus.",
    stack: ["React", "Next.js", "TypeScript", "PostgreSQL", "Redis"],
    rateMin: 700000,
    rateMax: 900000,
    location: "remote",
    contractType: "freelance",
    createdAt: "2026-03-18",
  },
  {
    id: "2",
    company: "StartupXYZ",
    title: "Backend Engineer (Go)",
    description:
      "Design and implement microservices for our fintech platform processing millions of transactions daily. Strong focus on reliability, observability, and performance. You'll be working closely with the infrastructure team on deployment pipelines and monitoring.",
    stack: ["Go", "gRPC", "PostgreSQL", "Kubernetes", "Terraform"],
    rateMin: 800000,
    rateMax: 1000000,
    location: "tokyo",
    contractType: "contract",
    createdAt: "2026-03-17",
  },
  {
    id: "3",
    company: "MediaFlow Inc.",
    title: "Full-Stack Rails Developer",
    description:
      "Join our content management platform team. We serve major publishing companies across Japan. The role involves building new editorial workflows, improving search performance, and integrating with third-party content APIs.",
    stack: ["Ruby on Rails", "React", "PostgreSQL", "Elasticsearch", "AWS"],
    rateMin: 650000,
    rateMax: 850000,
    location: "osaka",
    contractType: "freelance",
    createdAt: "2026-03-16",
  },
  {
    id: "4",
    company: "CryptoVault",
    title: "Blockchain/Web3 Engineer",
    description:
      "Build smart contracts and DeFi protocols on Ethereum and L2 chains. You'll work on auditing existing contracts, developing new protocol features, and building the frontend interfaces for our decentralized exchange.",
    stack: ["Solidity", "TypeScript", "React", "Hardhat", "ethers.js"],
    rateMin: 900000,
    rateMax: 1200000,
    location: "remote",
    contractType: "freelance",
    createdAt: "2026-03-15",
  },
  {
    id: "5",
    company: "HealthTech AI",
    title: "ML/Data Engineer",
    description:
      "Build data pipelines and ML models for our medical imaging platform. Work with radiologists and researchers to develop AI-assisted diagnostic tools. Experience with medical data standards (DICOM, HL7) is a strong plus.",
    stack: ["Python", "PyTorch", "FastAPI", "PostgreSQL", "Docker"],
    rateMin: 750000,
    rateMax: 950000,
    location: "tokyo",
    contractType: "contract",
    createdAt: "2026-03-14",
  },
  {
    id: "6",
    company: "GameStudio Tokyo",
    title: "Unity Game Developer",
    description:
      "Develop mobile games for the Japanese market. You'll prototype new game mechanics, optimize performance for low-end devices, and work with our art team on visual effects and UI animations.",
    stack: ["Unity", "C#", "Firebase", "iOS", "Android"],
    rateMin: 600000,
    rateMax: 800000,
    location: "tokyo",
    contractType: "freelance",
    createdAt: "2026-03-13",
  },
  {
    id: "7",
    company: "CloudNative Corp",
    title: "DevOps / SRE Engineer",
    description:
      "Manage and improve our multi-cloud infrastructure across AWS and GCP. Implement CI/CD pipelines, monitoring, and incident response automation. On-call rotation required.",
    stack: ["AWS", "GCP", "Terraform", "Kubernetes", "Go", "Datadog"],
    rateMin: 800000,
    rateMax: 1100000,
    location: "remote",
    contractType: "contract",
    createdAt: "2026-03-12",
  },
  {
    id: "8",
    company: "TechCorp Japan",
    title: "iOS Engineer (Swift)",
    description:
      "Build and maintain our flagship iOS banking app used by 2M+ users. Focus on security, accessibility, and smooth UX. You'll work with SwiftUI and integrate with our existing REST/GraphQL backends.",
    stack: ["Swift", "SwiftUI", "GraphQL", "Core Data", "CI/CD"],
    rateMin: 700000,
    rateMax: 900000,
    location: "tokyo",
    contractType: "freelance",
    createdAt: "2026-03-11",
  },
  {
    id: "9",
    company: "DataInsight Co.",
    title: "Data Platform Engineer",
    description:
      "Build and scale our real-time analytics platform. Design ETL pipelines, optimize query performance on large datasets, and build internal dashboards for business stakeholders.",
    stack: ["Python", "Apache Spark", "Kafka", "BigQuery", "dbt"],
    rateMin: 750000,
    rateMax: 950000,
    location: "remote",
    contractType: "contract",
    createdAt: "2026-03-10",
  },
  {
    id: "10",
    company: "StartupXYZ",
    title: "Frontend Engineer (Vue.js)",
    description:
      "Rebuild our admin dashboard from legacy jQuery to Vue 3. You'll create a component library, implement complex data tables and charts, and work with designers on a new design system.",
    stack: ["Vue.js", "TypeScript", "Tailwind CSS", "Vite", "Pinia"],
    rateMin: 600000,
    rateMax: 800000,
    location: "osaka",
    contractType: "freelance",
    createdAt: "2026-03-09",
  },
]

export function getPosition(id: string): Position | undefined {
  return positions.find((p) => p.id === id)
}

export function getPositions(filters?: {
  stack?: string
  location?: string
  rateMin?: number
  rateMax?: number
}): Position[] {
  let result = positions

  if (filters?.stack) {
    const query = filters.stack.toLowerCase()
    result = result.filter((p) =>
      p.stack.some((s) => s.toLowerCase().includes(query))
    )
  }

  if (filters?.location) {
    result = result.filter((p) => p.location === filters.location)
  }

  if (filters?.rateMin) {
    result = result.filter((p) => p.rateMax >= filters.rateMin!)
  }

  if (filters?.rateMax) {
    result = result.filter((p) => p.rateMin <= filters.rateMax!)
  }

  return result
}
