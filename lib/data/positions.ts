export type Position = {
  id: string
  company: string
  companyLogo?: string
  title: string
  description: string
  responsibilities: string[]
  requirements: string[]
  niceToHave: string[]
  perks: string[]
  stack: string[]
  rateMin: number
  rateMax: number
  location: string
  contractType: "freelance" | "contract"
  teamSize: number
  duration: string
  startDate: string
  createdAt: string
}

export const positions: Position[] = [
  {
    id: "1",
    company: "TechCorp Japan",
    companyLogo: "TC",
    title: "Senior React/Next.js Engineer",
    description:
      "Build and maintain our customer-facing SaaS platform. You'll work on a modern stack with a small, senior team. We need someone who can own features end-to-end, from API design to polished UI. Experience with real-time data and WebSockets is a plus.",
    responsibilities: [
      "Architect and build new features for our SaaS platform using React and Next.js",
      "Design and implement RESTful APIs with Node.js and PostgreSQL",
      "Collaborate with designers on pixel-perfect, responsive UI components",
      "Mentor junior developers through code reviews and pair programming",
      "Drive technical decisions and contribute to our engineering roadmap",
    ],
    requirements: [
      "5+ years of professional React/TypeScript experience",
      "Strong experience with Next.js App Router and server components",
      "Solid understanding of PostgreSQL and database design",
      "Experience building and consuming REST or GraphQL APIs",
      "Excellent communication skills in English (Japanese is a plus)",
    ],
    niceToHave: [
      "Experience with real-time features (WebSockets, SSE)",
      "Redis caching and queue management",
      "CI/CD pipeline setup and maintenance",
      "Open-source contributions",
    ],
    perks: [
      "Fully remote — work from anywhere",
      "Flexible hours with async-first culture",
      "Latest MacBook Pro provided",
      "Annual learning budget of ¥200,000",
      "Monthly team offsites in Tokyo",
    ],
    stack: ["React", "Next.js", "TypeScript", "PostgreSQL", "Redis"],
    rateMin: 700000,
    rateMax: 900000,
    location: "remote",
    contractType: "freelance",
    teamSize: 6,
    duration: "6+ months",
    startDate: "April 2026",
    createdAt: "2026-03-18",
  },
  {
    id: "2",
    company: "StartupXYZ",
    companyLogo: "SX",
    title: "Backend Engineer (Go)",
    description:
      "Design and implement microservices for our fintech platform processing millions of transactions daily. Strong focus on reliability, observability, and performance. You'll be working closely with the infrastructure team on deployment pipelines and monitoring.",
    responsibilities: [
      "Design and build high-throughput microservices in Go",
      "Implement gRPC APIs for inter-service communication",
      "Optimize database queries and design efficient data models",
      "Set up monitoring, alerting, and distributed tracing",
      "Participate in on-call rotation and incident response",
    ],
    requirements: [
      "4+ years backend engineering with Go",
      "Experience with gRPC, Protocol Buffers, and microservice patterns",
      "Strong PostgreSQL skills including query optimization",
      "Kubernetes deployment and orchestration experience",
      "Understanding of financial regulations and secure coding practices",
    ],
    niceToHave: [
      "Fintech or payments industry experience",
      "Terraform for infrastructure as code",
      "Experience with event-driven architectures (Kafka, NATS)",
      "Japanese language proficiency (N2+)",
    ],
    perks: [
      "Equity package available for long-term contracts",
      "WeWork hot desk membership in Tokyo",
      "Conference attendance sponsorship",
      "Direct mentorship from CTO (ex-Google)",
    ],
    stack: ["Go", "gRPC", "PostgreSQL", "Kubernetes", "Terraform"],
    rateMin: 800000,
    rateMax: 1000000,
    location: "tokyo",
    contractType: "contract",
    teamSize: 12,
    duration: "12 months",
    startDate: "May 2026",
    createdAt: "2026-03-17",
  },
  {
    id: "3",
    company: "MediaFlow Inc.",
    companyLogo: "MF",
    title: "Full-Stack Rails Developer",
    description:
      "Join our content management platform team. We serve major publishing companies across Japan. The role involves building new editorial workflows, improving search performance, and integrating with third-party content APIs.",
    responsibilities: [
      "Build editorial workflow features with Ruby on Rails and React",
      "Optimize Elasticsearch queries for content discovery",
      "Integrate third-party content APIs and data feeds",
      "Improve platform performance and page load times",
      "Write comprehensive tests and maintain code quality",
    ],
    requirements: [
      "3+ years with Ruby on Rails in production",
      "React/TypeScript frontend experience",
      "PostgreSQL and ActiveRecord proficiency",
      "Experience with search engines (Elasticsearch or Solr)",
      "Strong testing discipline (RSpec, Minitest)",
    ],
    niceToHave: [
      "Publishing or media industry background",
      "AWS infrastructure experience (ECS, RDS, S3)",
      "Performance optimization and profiling",
      "Japanese language ability for stakeholder meetings",
    ],
    perks: [
      "Osaka-based with flexible hybrid schedule",
      "Access to publisher events and industry conferences",
      "Team lunch every Friday",
      "Health insurance supplement",
    ],
    stack: ["Ruby on Rails", "React", "PostgreSQL", "Elasticsearch", "AWS"],
    rateMin: 650000,
    rateMax: 850000,
    location: "osaka",
    contractType: "freelance",
    teamSize: 8,
    duration: "6 months",
    startDate: "April 2026",
    createdAt: "2026-03-16",
  },
  {
    id: "4",
    company: "CryptoVault",
    companyLogo: "CV",
    title: "Blockchain/Web3 Engineer",
    description:
      "Build smart contracts and DeFi protocols on Ethereum and L2 chains. You'll work on auditing existing contracts, developing new protocol features, and building the frontend interfaces for our decentralized exchange.",
    responsibilities: [
      "Write, test, and audit Solidity smart contracts",
      "Build frontend interfaces for DeFi protocols with React",
      "Implement token standards and DeFi primitives (AMM, lending, staking)",
      "Conduct security audits and formal verification",
      "Research and integrate L2 scaling solutions",
    ],
    requirements: [
      "3+ years Solidity development with deployed contracts",
      "Deep understanding of EVM and gas optimization",
      "Experience with Hardhat, Foundry, or Truffle",
      "React/TypeScript frontend skills",
      "Knowledge of DeFi protocols and tokenomics",
    ],
    niceToHave: [
      "Smart contract audit experience",
      "Familiarity with L2 chains (Arbitrum, Optimism, zkSync)",
      "Rust experience for Solana development",
      "Bug bounty or CTF participation",
    ],
    perks: [
      "Token allocation for long-term contributors",
      "Fully remote and async-first",
      "Annual team retreat (previous: Bali, Lisbon)",
      "Hardware wallet and security tools provided",
    ],
    stack: ["Solidity", "TypeScript", "React", "Hardhat", "ethers.js"],
    rateMin: 900000,
    rateMax: 1200000,
    location: "remote",
    contractType: "freelance",
    teamSize: 5,
    duration: "Ongoing",
    startDate: "ASAP",
    createdAt: "2026-03-15",
  },
  {
    id: "5",
    company: "HealthTech AI",
    companyLogo: "HA",
    title: "ML/Data Engineer",
    description:
      "Build data pipelines and ML models for our medical imaging platform. Work with radiologists and researchers to develop AI-assisted diagnostic tools. Experience with medical data standards (DICOM, HL7) is a strong plus.",
    responsibilities: [
      "Build and optimize ML pipelines for medical image analysis",
      "Train and fine-tune PyTorch models for diagnostic classification",
      "Design ETL pipelines for DICOM and HL7 medical data",
      "Build FastAPI services for model inference at scale",
      "Collaborate with radiologists on model validation and clinical trials",
    ],
    requirements: [
      "4+ years ML/data engineering experience",
      "Strong PyTorch and Python skills",
      "Experience with medical imaging or computer vision",
      "Database design and SQL optimization",
      "Docker and containerized deployment",
    ],
    niceToHave: [
      "DICOM and HL7 standards knowledge",
      "Experience with FDA/PMDA regulatory processes",
      "MLOps tools (MLflow, Weights & Biases)",
      "Japanese language proficiency",
    ],
    perks: [
      "Contribute to life-saving technology",
      "Collaborate with top researchers at University of Tokyo Hospital",
      "Publication opportunities in medical AI",
      "Premium health insurance package",
    ],
    stack: ["Python", "PyTorch", "FastAPI", "PostgreSQL", "Docker"],
    rateMin: 750000,
    rateMax: 950000,
    location: "tokyo",
    contractType: "contract",
    teamSize: 10,
    duration: "12 months",
    startDate: "June 2026",
    createdAt: "2026-03-14",
  },
  {
    id: "6",
    company: "GameStudio Tokyo",
    companyLogo: "GS",
    title: "Unity Game Developer",
    description:
      "Develop mobile games for the Japanese market. You'll prototype new game mechanics, optimize performance for low-end devices, and work with our art team on visual effects and UI animations.",
    responsibilities: [
      "Prototype and implement game mechanics in Unity/C#",
      "Optimize game performance for mobile devices",
      "Implement UI systems, menus, and in-game HUDs",
      "Work with the art team on particle effects and animations",
      "Integrate analytics and monetization SDKs",
    ],
    requirements: [
      "3+ years Unity game development",
      "Strong C# and OOP skills",
      "Mobile optimization experience (iOS and Android)",
      "Understanding of game design patterns and architecture",
      "Firebase integration experience",
    ],
    niceToHave: [
      "Shipped at least one title on App Store or Google Play",
      "Shader programming (HLSL/ShaderLab)",
      "Experience with live-ops and GaaS models",
      "Japanese gaming market knowledge",
    ],
    perks: [
      "Play-test new games before anyone else",
      "Access to game industry events (TGS, BitSummit)",
      "Creative input on game design decisions",
      "Game library and console access",
    ],
    stack: ["Unity", "C#", "Firebase", "iOS", "Android"],
    rateMin: 600000,
    rateMax: 800000,
    location: "tokyo",
    contractType: "freelance",
    teamSize: 15,
    duration: "4 months",
    startDate: "April 2026",
    createdAt: "2026-03-13",
  },
  {
    id: "7",
    company: "CloudNative Corp",
    companyLogo: "CN",
    title: "DevOps / SRE Engineer",
    description:
      "Manage and improve our multi-cloud infrastructure across AWS and GCP. Implement CI/CD pipelines, monitoring, and incident response automation. On-call rotation required.",
    responsibilities: [
      "Design and maintain multi-cloud infrastructure (AWS + GCP)",
      "Build and optimize CI/CD pipelines for 50+ microservices",
      "Implement comprehensive monitoring with Datadog",
      "Automate incident response and create runbooks",
      "Manage Kubernetes clusters and service mesh",
    ],
    requirements: [
      "5+ years in DevOps/SRE roles",
      "Expert-level AWS and/or GCP knowledge",
      "Terraform for infrastructure as code",
      "Kubernetes administration and troubleshooting",
      "Scripting with Go, Python, or Bash",
    ],
    niceToHave: [
      "Multi-cloud architecture experience",
      "Service mesh (Istio, Linkerd) experience",
      "FinOps and cloud cost optimization",
      "Incident commander or on-call lead experience",
    ],
    perks: [
      "Fully remote with ¥50,000/month home office stipend",
      "AWS/GCP certification sponsorship",
      "On-call compensation: ¥5,000/hour",
      "Annual tech conference of your choice",
    ],
    stack: ["AWS", "GCP", "Terraform", "Kubernetes", "Go", "Datadog"],
    rateMin: 800000,
    rateMax: 1100000,
    location: "remote",
    contractType: "contract",
    teamSize: 8,
    duration: "12+ months",
    startDate: "May 2026",
    createdAt: "2026-03-12",
  },
  {
    id: "8",
    company: "TechCorp Japan",
    companyLogo: "TC",
    title: "iOS Engineer (Swift)",
    description:
      "Build and maintain our flagship iOS banking app used by 2M+ users. Focus on security, accessibility, and smooth UX. You'll work with SwiftUI and integrate with our existing REST/GraphQL backends.",
    responsibilities: [
      "Develop new features for our iOS banking app with SwiftUI",
      "Integrate REST and GraphQL APIs for real-time data",
      "Implement biometric authentication and security features",
      "Ensure accessibility compliance (WCAG 2.1 AA)",
      "Write unit and UI tests for critical user flows",
    ],
    requirements: [
      "4+ years iOS development with Swift",
      "SwiftUI and UIKit experience",
      "GraphQL client integration (Apollo or similar)",
      "Core Data or other persistence frameworks",
      "App Store submission and TestFlight experience",
    ],
    niceToHave: [
      "Banking or fintech app experience",
      "Security certifications or knowledge",
      "Accessibility testing tools experience",
      "CI/CD for iOS (Fastlane, Xcode Cloud)",
    ],
    perks: [
      "Work on an app used by 2M+ people",
      "Latest Apple hardware provided",
      "WWDC ticket sponsorship",
      "Hybrid Tokyo office with rooftop terrace",
    ],
    stack: ["Swift", "SwiftUI", "GraphQL", "Core Data", "CI/CD"],
    rateMin: 700000,
    rateMax: 900000,
    location: "tokyo",
    contractType: "freelance",
    teamSize: 7,
    duration: "6 months",
    startDate: "April 2026",
    createdAt: "2026-03-11",
  },
  {
    id: "9",
    company: "DataInsight Co.",
    companyLogo: "DI",
    title: "Data Platform Engineer",
    description:
      "Build and scale our real-time analytics platform. Design ETL pipelines, optimize query performance on large datasets, and build internal dashboards for business stakeholders.",
    responsibilities: [
      "Design and build ETL pipelines with Apache Spark and Kafka",
      "Optimize BigQuery queries for TB-scale datasets",
      "Build dbt models for data transformation and documentation",
      "Create internal dashboards and self-serve analytics tools",
      "Manage data quality and implement monitoring",
    ],
    requirements: [
      "4+ years data engineering experience",
      "Python and SQL expertise",
      "Apache Spark or similar distributed processing frameworks",
      "Experience with streaming platforms (Kafka, Pub/Sub)",
      "Cloud data warehouses (BigQuery, Snowflake, or Redshift)",
    ],
    niceToHave: [
      "dbt for data transformation",
      "Data governance and catalog tools",
      "Airflow or Dagster for orchestration",
      "Visualization tools (Looker, Metabase)",
    ],
    perks: [
      "Fully remote position",
      "Work with massive real-world datasets",
      "Data community meetup sponsorship",
      "Learning budget for certifications",
    ],
    stack: ["Python", "Apache Spark", "Kafka", "BigQuery", "dbt"],
    rateMin: 750000,
    rateMax: 950000,
    location: "remote",
    contractType: "contract",
    teamSize: 6,
    duration: "9 months",
    startDate: "May 2026",
    createdAt: "2026-03-10",
  },
  {
    id: "10",
    company: "StartupXYZ",
    companyLogo: "SX",
    title: "Frontend Engineer (Vue.js)",
    description:
      "Rebuild our admin dashboard from legacy jQuery to Vue 3. You'll create a component library, implement complex data tables and charts, and work with designers on a new design system.",
    responsibilities: [
      "Migrate legacy jQuery dashboard to Vue 3 with TypeScript",
      "Build a reusable component library with Storybook",
      "Implement complex data tables, charts, and visualizations",
      "Collaborate with designers on a new design system",
      "Set up frontend testing with Vitest and Playwright",
    ],
    requirements: [
      "3+ years Vue.js experience (Vue 3 preferred)",
      "Strong TypeScript skills",
      "Tailwind CSS and responsive design",
      "Build tools experience (Vite, Webpack)",
      "Component library or design system experience",
    ],
    niceToHave: [
      "Storybook for component documentation",
      "Chart libraries (D3, Chart.js, ECharts)",
      "State management patterns (Pinia, Vuex)",
      "Migration experience from legacy codebases",
    ],
    perks: [
      "Hybrid in Osaka — 2 days/week in office",
      "Shape the frontend architecture from scratch",
      "Direct collaboration with product designer",
      "Quarterly team activities and dinners",
    ],
    stack: ["Vue.js", "TypeScript", "Tailwind CSS", "Vite", "Pinia"],
    rateMin: 600000,
    rateMax: 800000,
    location: "osaka",
    contractType: "freelance",
    teamSize: 4,
    duration: "6 months",
    startDate: "April 2026",
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
