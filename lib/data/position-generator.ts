import type { Position } from "./positions"

// Seed data pools for generating realistic positions
const companies = [
  { name: "TechCorp Japan", logo: "TC" },
  { name: "StartupXYZ", logo: "SX" },
  { name: "MediaFlow Inc.", logo: "MF" },
  { name: "CryptoVault", logo: "CV" },
  { name: "HealthTech AI", logo: "HA" },
  { name: "GameStudio Tokyo", logo: "GS" },
  { name: "CloudNative Corp", logo: "CN" },
  { name: "DataInsight Co.", logo: "DI" },
  { name: "Rakuten Mobile", logo: "RM" },
  { name: "SmartHR", logo: "SH" },
  { name: "LINE Fukuoka", logo: "LF" },
  { name: "Money Forward", logo: "MF" },
  { name: "Woven by Toyota", logo: "WT" },
  { name: "Mercari", logo: "MC" },
  { name: "Treasure Data", logo: "TD" },
  { name: "Cookpad", logo: "CP" },
  { name: "DeNA", logo: "DN" },
  { name: "Cybozu", logo: "CZ" },
  { name: "Preferred Networks", logo: "PF" },
  { name: "FreakOut", logo: "FO" },
  { name: "HENNGE", logo: "HG" },
  { name: "ZOZO", logo: "ZZ" },
  { name: "Sansan", logo: "SS" },
  { name: "PayPay", logo: "PP" },
  { name: "Timee", logo: "TM" },
  { name: "LayerX", logo: "LX" },
  { name: "UPSIDER", logo: "UP" },
  { name: "Classi", logo: "CL" },
  { name: "atama plus", logo: "AP" },
  { name: "10X Inc.", logo: "10" },
  { name: "Luup", logo: "LP" },
  { name: "Kyash", logo: "KY" },
  { name: "FLUX", logo: "FX" },
  { name: "RevComm", logo: "RC" },
  { name: "Yappli", logo: "YP" },
]

type RoleTemplate = {
  title: string
  stack: string[]
  description: string
  responsibilities: string[]
  requirements: string[]
  niceToHave: string[]
  rateMin: number
  rateMax: number
}

const roleTemplates: RoleTemplate[] = [
  {
    title: "Senior React/Next.js Engineer",
    stack: ["React", "Next.js", "TypeScript", "PostgreSQL", "Redis"],
    description: "Build and maintain modern web applications using React and Next.js. Own features end-to-end with a focus on performance and user experience.",
    responsibilities: ["Architect and build new features using React and Next.js", "Design and implement RESTful APIs", "Write comprehensive tests and maintain code quality", "Mentor junior developers through code reviews", "Drive technical decisions on the engineering roadmap"],
    requirements: ["5+ years React/TypeScript experience", "Next.js App Router and server components", "PostgreSQL and database design", "REST or GraphQL API development", "Strong communication skills in English"],
    niceToHave: ["Real-time features (WebSockets, SSE)", "Redis caching", "CI/CD pipeline experience", "Open-source contributions"],
    rateMin: 700000, rateMax: 950000,
  },
  {
    title: "Backend Engineer (Go)",
    stack: ["Go", "gRPC", "PostgreSQL", "Kubernetes", "Terraform"],
    description: "Design and implement high-throughput microservices. Focus on reliability, observability, and performance for mission-critical systems.",
    responsibilities: ["Design and build microservices in Go", "Implement gRPC APIs for inter-service communication", "Optimize database queries and data models", "Set up monitoring and distributed tracing", "Participate in on-call rotation"],
    requirements: ["4+ years backend engineering with Go", "gRPC and Protocol Buffers", "PostgreSQL optimization", "Kubernetes deployment", "Understanding of distributed systems"],
    niceToHave: ["Fintech experience", "Terraform IaC", "Event-driven architectures", "Japanese language proficiency"],
    rateMin: 750000, rateMax: 1000000,
  },
  {
    title: "Full-Stack Rails Developer",
    stack: ["Ruby on Rails", "React", "PostgreSQL", "Elasticsearch", "AWS"],
    description: "Work across the full stack building features for a modern SaaS platform. Rails backend with React frontend, serving thousands of business users.",
    responsibilities: ["Build features with Ruby on Rails and React", "Optimize search with Elasticsearch", "Integrate third-party APIs", "Improve performance and page load times", "Write comprehensive tests"],
    requirements: ["3+ years Ruby on Rails", "React/TypeScript frontend", "PostgreSQL and ActiveRecord", "Search engines (Elasticsearch or Solr)", "Testing discipline (RSpec)"],
    niceToHave: ["AWS infrastructure", "Performance profiling", "B2B SaaS experience", "Japanese language ability"],
    rateMin: 650000, rateMax: 850000,
  },
  {
    title: "iOS Engineer (Swift)",
    stack: ["Swift", "SwiftUI", "GraphQL", "Core Data", "CI/CD"],
    description: "Build and maintain a high-quality iOS app. Focus on clean architecture, smooth animations, accessibility, and integration with backend services.",
    responsibilities: ["Develop features with SwiftUI", "Integrate REST and GraphQL APIs", "Implement security and biometric features", "Ensure accessibility compliance", "Write unit and UI tests"],
    requirements: ["4+ years iOS with Swift", "SwiftUI and UIKit", "GraphQL client integration", "Core Data or persistence", "App Store submission experience"],
    niceToHave: ["Banking or fintech apps", "Accessibility testing", "Fastlane/Xcode Cloud CI", "Security certifications"],
    rateMin: 700000, rateMax: 900000,
  },
  {
    title: "Android Engineer (Kotlin)",
    stack: ["Kotlin", "Jetpack Compose", "Hilt", "Room", "Gradle"],
    description: "Build modern Android applications using Kotlin and Jetpack Compose. Work on a greenfield project with a focus on clean architecture and testing.",
    responsibilities: ["Build Android UI with Jetpack Compose", "Implement MVVM/MVI architecture", "Integrate REST APIs with offline-first design", "Write automated tests with Espresso", "Optimize app performance"],
    requirements: ["4+ years Android with Kotlin", "Jetpack Compose experience", "MVVM/MVI patterns", "REST API integration", "Dependency injection (Hilt/Dagger)"],
    niceToHave: ["Kotlin Multiplatform", "CI/CD for mobile", "Financial app development", "Japanese proficiency"],
    rateMin: 700000, rateMax: 950000,
  },
  {
    title: "DevOps / SRE Engineer",
    stack: ["AWS", "Terraform", "Kubernetes", "Go", "Datadog"],
    description: "Manage and improve cloud infrastructure. Build CI/CD pipelines, implement monitoring, and automate incident response for reliable systems.",
    responsibilities: ["Design multi-cloud infrastructure", "Build CI/CD pipelines", "Implement monitoring with Datadog", "Automate incident response", "Manage Kubernetes clusters"],
    requirements: ["5+ years DevOps/SRE", "Expert AWS/GCP knowledge", "Terraform IaC", "Kubernetes administration", "Scripting (Go, Python, Bash)"],
    niceToHave: ["Multi-cloud architecture", "Service mesh (Istio)", "FinOps optimization", "Incident commander experience"],
    rateMin: 800000, rateMax: 1100000,
  },
  {
    title: "ML/Data Engineer",
    stack: ["Python", "PyTorch", "FastAPI", "PostgreSQL", "Docker"],
    description: "Build data pipelines and ML models for production. Work on training, evaluation, and deployment of machine learning systems at scale.",
    responsibilities: ["Build ML pipelines for production", "Train and fine-tune models", "Design ETL pipelines", "Build inference APIs with FastAPI", "Collaborate with researchers on model validation"],
    requirements: ["4+ years ML/data engineering", "PyTorch and Python", "Model training and evaluation", "Database design and SQL", "Docker containerization"],
    niceToHave: ["MLOps tools (MLflow, W&B)", "Computer vision or NLP", "Edge deployment", "Data governance"],
    rateMin: 750000, rateMax: 1000000,
  },
  {
    title: "Frontend Engineer (Vue.js)",
    stack: ["Vue.js", "TypeScript", "Tailwind CSS", "Vite", "Pinia"],
    description: "Build modern, responsive frontend applications with Vue.js. Create reusable component libraries and implement complex data visualizations.",
    responsibilities: ["Build features with Vue 3 and TypeScript", "Create reusable component library", "Implement data tables and charts", "Collaborate with designers", "Set up frontend testing"],
    requirements: ["3+ years Vue.js", "Strong TypeScript", "Tailwind CSS responsive design", "Build tools (Vite/Webpack)", "Component library experience"],
    niceToHave: ["Storybook documentation", "D3 or Chart.js", "State management (Pinia)", "Legacy migration experience"],
    rateMin: 600000, rateMax: 850000,
  },
  {
    title: "Blockchain/Web3 Engineer",
    stack: ["Solidity", "TypeScript", "React", "Hardhat", "ethers.js"],
    description: "Build smart contracts and decentralized applications. Work on DeFi protocols, token standards, and Web3 frontend interfaces.",
    responsibilities: ["Write and audit Solidity smart contracts", "Build DeFi protocol interfaces", "Implement token standards", "Conduct security audits", "Research L2 scaling solutions"],
    requirements: ["3+ years Solidity", "EVM and gas optimization", "Hardhat or Foundry", "React/TypeScript", "DeFi protocol knowledge"],
    niceToHave: ["Smart contract auditing", "L2 chains (Arbitrum, Optimism)", "Rust for Solana", "Bug bounty experience"],
    rateMin: 900000, rateMax: 1200000,
  },
  {
    title: "Data Platform Engineer",
    stack: ["Python", "Apache Spark", "Kafka", "BigQuery", "dbt"],
    description: "Build and scale real-time analytics platforms. Design ETL pipelines, optimize queries on large datasets, and build dashboards for stakeholders.",
    responsibilities: ["Design ETL pipelines with Spark and Kafka", "Optimize BigQuery queries at scale", "Build dbt transformation models", "Create internal analytics dashboards", "Manage data quality"],
    requirements: ["4+ years data engineering", "Python and SQL expertise", "Distributed processing (Spark)", "Streaming platforms (Kafka)", "Cloud data warehouses"],
    niceToHave: ["dbt for transformation", "Data governance tools", "Orchestration (Airflow, Dagster)", "Visualization (Looker, Metabase)"],
    rateMin: 750000, rateMax: 1000000,
  },
  {
    title: "Security Engineer",
    stack: ["Python", "AWS", "Docker", "Terraform", "Go"],
    description: "Lead security initiatives across the organization. Conduct penetration testing, security reviews, and build automated security tooling.",
    responsibilities: ["Conduct penetration testing", "Review code for security flaws", "Build security scanning pipelines", "Develop security policies", "Investigate security incidents"],
    requirements: ["4+ years application security", "OWASP Top 10 expertise", "Secure code review", "Cloud security (AWS)", "Scripting (Python, Go)"],
    niceToHave: ["OSCP or CEH certification", "Bug bounty experience", "Financial regulations", "IaC security scanning"],
    rateMin: 800000, rateMax: 1100000,
  },
  {
    title: "AI/LLM Engineer",
    stack: ["Python", "PyTorch", "FastAPI", "LangChain", "Docker"],
    description: "Build AI-powered products using large language models. Focus on RAG pipelines, prompt engineering, fine-tuning, and production AI systems.",
    responsibilities: ["Integrate LLM APIs into production apps", "Build RAG pipelines", "Fine-tune models for domain tasks", "Design prompt engineering frameworks", "Build internal AI tools"],
    requirements: ["3+ years ML/AI engineering", "PyTorch and Transformers", "LLM integration and prompting", "FastAPI development", "Vector databases"],
    niceToHave: ["Japanese NLP", "Model fine-tuning (LoRA)", "LangChain orchestration", "Creative AI experience"],
    rateMin: 850000, rateMax: 1200000,
  },
  {
    title: "React Native Engineer",
    stack: ["React Native", "TypeScript", "Redux", "Node.js", "GraphQL"],
    description: "Build cross-platform mobile features for millions of users. Work on rich editors, social features, and performance optimization.",
    responsibilities: ["Develop cross-platform features", "Build rich media editors", "Implement social features", "Optimize app performance", "Write E2E tests with Detox"],
    requirements: ["3+ years React Native", "TypeScript and modern React", "Native module bridging", "State management", "App store deployment"],
    niceToHave: ["Native iOS/Android skills", "Camera and image APIs", "Push notifications", "Japanese localization"],
    rateMin: 650000, rateMax: 900000,
  },
  {
    title: "Platform Engineer (Java/Kotlin)",
    stack: ["Java", "Kotlin", "Kafka", "MySQL", "Kubernetes"],
    description: "Build and maintain high-throughput platform services. Work on distributed systems, message queues, and real-time delivery pipelines at massive scale.",
    responsibilities: ["Develop high-throughput services in Java/Kotlin", "Design message delivery pipelines", "Implement distributed caching", "Monitor system performance at scale", "Participate in incident response"],
    requirements: ["5+ years Java or Kotlin", "Distributed systems at scale", "Kafka and message queues", "MySQL/PostgreSQL optimization", "Microservices architecture"],
    niceToHave: ["10K+ RPS system experience", "Async networking (Netty)", "Container orchestration", "Japanese language"],
    rateMin: 800000, rateMax: 1100000,
  },
  {
    title: "Infrastructure Engineer (Rust/Go)",
    stack: ["Rust", "Go", "Kubernetes", "PostgreSQL", "Apache Arrow"],
    description: "Build core data platform infrastructure. Work on high-performance data ingestion, storage engines, and distributed query execution.",
    responsibilities: ["Develop data pipelines in Rust and Go", "Optimize storage engine performance", "Build distributed query layers", "Manage multi-region Kubernetes", "Implement observability"],
    requirements: ["5+ years systems programming (Rust/Go)", "Distributed systems", "Database internals", "Kubernetes at scale", "Performance optimization"],
    niceToHave: ["Apache Arrow/Parquet", "OLAP database experience", "Consensus protocols", "Open-source contributions"],
    rateMin: 950000, rateMax: 1300000,
  },
  {
    title: "Embedded Systems Engineer (C++)",
    stack: ["C++", "Rust", "ROS2", "Python", "CUDA"],
    description: "Develop software for autonomous systems and robotics. Work on real-time control, sensor fusion, and safety-critical software.",
    responsibilities: ["Develop real-time control software in C++", "Implement sensor fusion algorithms", "Optimize for embedded targets", "Write safety-critical software", "Conduct hardware-in-the-loop testing"],
    requirements: ["5+ years C++ systems programming", "RTOS experience", "Sensor processing", "Linux kernel development", "Embedded CI/CD"],
    niceToHave: ["Rust for safety-critical systems", "ROS/ROS2", "AUTOSAR or ISO 26262", "Edge ML inference"],
    rateMin: 900000, rateMax: 1300000,
  },
  {
    title: "Product Engineer (TypeScript)",
    stack: ["TypeScript", "React", "Node.js", "PostgreSQL", "Prisma"],
    description: "Ship user-facing features end-to-end. Work closely with product and design to build delightful experiences that solve real problems.",
    responsibilities: ["Build end-to-end features across frontend and backend", "Collaborate with product and design", "Own feature lifecycle from spec to deploy", "Write tests and monitor production", "Contribute to technical roadmap"],
    requirements: ["3+ years full-stack TypeScript", "React with modern patterns", "Node.js backend development", "PostgreSQL and ORMs", "Product-minded engineering"],
    niceToHave: ["Prisma ORM", "Tailwind CSS", "E2E testing (Playwright)", "SaaS B2B experience"],
    rateMin: 650000, rateMax: 900000,
  },
  {
    title: "QA Automation Engineer",
    stack: ["TypeScript", "Playwright", "Cypress", "Python", "Docker"],
    description: "Build and maintain automated testing frameworks. Design test strategies, write E2E tests, and integrate quality checks into CI/CD pipelines.",
    responsibilities: ["Design test automation frameworks", "Write E2E tests with Playwright", "Integrate tests into CI/CD pipelines", "Perform performance and load testing", "Collaborate with developers on testability"],
    requirements: ["3+ years QA automation", "Playwright or Cypress", "TypeScript or Python", "API testing experience", "CI/CD integration"],
    niceToHave: ["Performance testing (k6, Locust)", "Mobile app testing", "Visual regression testing", "Security testing basics"],
    rateMin: 600000, rateMax: 800000,
  },
  {
    title: "Design Systems Engineer",
    stack: ["React", "TypeScript", "Storybook", "Tailwind CSS", "Figma"],
    description: "Build and maintain a design system used across multiple products. Create accessible, performant components and tooling for design-engineering collaboration.",
    responsibilities: ["Build accessible React component library", "Create Storybook documentation", "Implement design tokens and theming", "Ensure cross-browser compatibility", "Collaborate with designers on Figma integration"],
    requirements: ["3+ years React component development", "Design system experience", "Accessibility (WCAG 2.1)", "CSS architecture and Tailwind", "Storybook or similar tools"],
    niceToHave: ["Figma plugin development", "CSS-in-JS alternatives", "Animation libraries (Motion)", "Multi-brand theming"],
    rateMin: 700000, rateMax: 900000,
  },
  {
    title: "Site Reliability Engineer (GCP)",
    stack: ["GCP", "Terraform", "Kubernetes", "Python", "Prometheus"],
    description: "Ensure reliability of services running on Google Cloud. Build monitoring, alerting, and automation for large-scale distributed systems.",
    responsibilities: ["Manage GCP infrastructure with Terraform", "Build monitoring with Prometheus/Grafana", "Implement SLO/SLI frameworks", "Automate incident response", "Optimize cloud spend"],
    requirements: ["4+ years SRE/infrastructure", "GCP expertise", "Terraform IaC", "Kubernetes operations", "Monitoring and alerting"],
    niceToHave: ["GCP Professional certifications", "Chaos engineering", "FinOps practices", "SRE book principles"],
    rateMin: 800000, rateMax: 1050000,
  },
]

const allLocations = ["remote", "tokyo", "osaka", "fukuoka", "yokohama", "nagoya", "kyoto"]
const contractTypes: ("freelance" | "contract")[] = ["freelance", "contract"]
const durations = ["3 months", "4 months", "6 months", "6+ months", "9 months", "12 months", "12+ months", "Ongoing"]
const startDates = ["ASAP", "April 2026", "May 2026", "June 2026", "July 2026"]

const perkPool = [
  "Fully remote — work from anywhere",
  "Flexible hours with async-first culture",
  "Latest MacBook Pro provided",
  "Annual learning budget of ¥200,000",
  "Monthly team offsites in Tokyo",
  "Health insurance supplement",
  "WeWork hot desk membership",
  "Conference attendance sponsorship",
  "Stock options for long-term contracts",
  "4-day work week option available",
  "Premium health insurance",
  "Home office setup stipend ¥50,000",
  "Quarterly team activities",
  "Access to GPU compute clusters",
  "Direct mentorship from senior engineers",
  "Innovation time: 20% for personal projects",
  "Annual company retreat",
  "Free product/service credits",
  "Hybrid office with great location",
  "Certification exam sponsorship",
]

// Deterministic pseudo-random from seed
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)]
}

function pickN<T>(arr: T[], n: number, rng: () => number): T[] {
  const shuffled = [...arr].sort(() => rng() - 0.5)
  return shuffled.slice(0, n)
}

export function generatePositions(count: number, startId: number): Position[] {
  const result: Position[] = []
  const baseDate = new Date("2026-03-20")

  for (let i = 0; i < count; i++) {
    const rng = seededRandom(startId + i + 42)
    const template = pick(roleTemplates, rng)
    const company = pick(companies, rng)
    const location = pick(allLocations, rng)
    const contractType = pick(contractTypes, rng)

    // Vary rate slightly from template
    const rateVariation = (rng() - 0.5) * 100000
    const rateMin = Math.round((template.rateMin + rateVariation) / 10000) * 10000
    const rateMax = Math.round((template.rateMax + rateVariation) / 10000) * 10000

    const createdDate = new Date(baseDate)
    createdDate.setDate(createdDate.getDate() - i - 1)

    result.push({
      id: String(startId + i),
      company: company.name,
      companyLogo: company.logo,
      title: template.title,
      description: template.description,
      responsibilities: template.responsibilities,
      requirements: template.requirements,
      niceToHave: template.niceToHave,
      perks: pickN(perkPool, 4, rng),
      stack: template.stack,
      rateMin,
      rateMax,
      location,
      contractType,
      teamSize: Math.floor(rng() * 20) + 3,
      duration: pick(durations, rng),
      startDate: pick(startDates, rng),
      createdAt: createdDate.toISOString().split("T")[0],
    })
  }

  return result
}
