import { generatePositions } from "./position-generator"

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
  {
    id: "11",
    company: "Rakuten Mobile",
    companyLogo: "RM",
    title: "Android Engineer (Kotlin)",
    description:
      "Join the team building Rakuten's next-generation mobile banking experience. You'll work on a greenfield Kotlin Multiplatform project targeting Android and iOS with shared business logic.",
    responsibilities: [
      "Build Android UI with Jetpack Compose",
      "Implement Kotlin Multiplatform shared modules",
      "Integrate biometric and secure enclave APIs",
      "Collaborate with iOS team on shared architecture",
      "Write automated tests with Espresso and Robolectric",
    ],
    requirements: [
      "4+ years Android development with Kotlin",
      "Jetpack Compose experience",
      "MVVM/MVI architecture patterns",
      "REST API integration and offline-first design",
      "Dagger/Hilt dependency injection",
    ],
    niceToHave: [
      "Kotlin Multiplatform experience",
      "Financial app development",
      "CI/CD with GitHub Actions for mobile",
      "Japanese language proficiency (N2+)",
    ],
    perks: [
      "Rakuten employee discount on all services",
      "Hybrid Tokyo office in Futako-Tamagawa",
      "Latest Pixel and Samsung devices provided",
      "Google I/O attendance sponsorship",
    ],
    stack: ["Kotlin", "Jetpack Compose", "KMP", "Hilt", "Gradle"],
    rateMin: 750000,
    rateMax: 950000,
    location: "tokyo",
    contractType: "contract",
    teamSize: 10,
    duration: "12 months",
    startDate: "May 2026",
    createdAt: "2026-03-08",
  },
  {
    id: "12",
    company: "SmartHR",
    companyLogo: "SH",
    title: "Product Engineer (Ruby/React)",
    description:
      "Build HR SaaS features used by 60,000+ companies in Japan. Work across the full stack — Rails API, React frontend, and PostgreSQL — in a mature agile team.",
    responsibilities: [
      "Develop end-to-end features across Rails and React",
      "Design database schemas for complex HR workflows",
      "Write comprehensive RSpec and Jest tests",
      "Participate in sprint planning and retrospectives",
      "Contribute to API design and documentation",
    ],
    requirements: [
      "3+ years Ruby on Rails experience",
      "React with TypeScript",
      "PostgreSQL and ActiveRecord",
      "Experience with SaaS B2B products",
      "Test-driven development practices",
    ],
    niceToHave: [
      "HR domain knowledge",
      "GraphQL API experience",
      "Performance profiling (New Relic, Skylight)",
      "Accessibility (a11y) awareness",
    ],
    perks: [
      "4-day work week option available",
      "¥300,000 annual learning budget",
      "Premium health insurance",
      "Stock options for long-term contracts",
    ],
    stack: ["Ruby on Rails", "React", "TypeScript", "PostgreSQL", "Redis"],
    rateMin: 700000,
    rateMax: 900000,
    location: "remote",
    contractType: "freelance",
    teamSize: 8,
    duration: "6+ months",
    startDate: "April 2026",
    createdAt: "2026-03-07",
  },
  {
    id: "13",
    company: "LINE Fukuoka",
    companyLogo: "LF",
    title: "Platform Engineer (Java/Kotlin)",
    description:
      "Build and maintain LINE's messaging infrastructure handling billions of messages per day. Work on distributed systems, message queues, and real-time delivery pipelines.",
    responsibilities: [
      "Develop high-throughput messaging services in Java/Kotlin",
      "Design and optimize message delivery pipelines",
      "Implement distributed caching and queue systems",
      "Monitor and optimize system performance at massive scale",
      "Participate in incident response and post-mortems",
    ],
    requirements: [
      "5+ years Java or Kotlin in production",
      "Distributed systems experience at scale",
      "Message queue expertise (Kafka, RabbitMQ)",
      "MySQL/PostgreSQL optimization",
      "Microservices architecture",
    ],
    niceToHave: [
      "Experience with 10K+ RPS systems",
      "Netty or similar async networking frameworks",
      "Container orchestration (Kubernetes, Verda)",
      "Japanese language ability",
    ],
    perks: [
      "Work on infrastructure serving 200M+ users",
      "Fukuoka office with ocean view",
      "Relocation support available",
      "LINE Pay stipend for meals",
    ],
    stack: ["Java", "Kotlin", "Kafka", "MySQL", "Kubernetes"],
    rateMin: 850000,
    rateMax: 1100000,
    location: "fukuoka",
    contractType: "contract",
    teamSize: 20,
    duration: "12 months",
    startDate: "June 2026",
    createdAt: "2026-03-06",
  },
  {
    id: "14",
    company: "Money Forward",
    companyLogo: "MF",
    title: "Security Engineer",
    description:
      "Lead security initiatives for Japan's leading personal finance platform. Conduct penetration testing, security reviews, and build automated security tooling across the organization.",
    responsibilities: [
      "Conduct penetration testing and vulnerability assessments",
      "Review code and architecture for security flaws",
      "Build automated security scanning pipelines",
      "Develop and maintain security policies and guidelines",
      "Respond to and investigate security incidents",
    ],
    requirements: [
      "4+ years in application security",
      "Web application penetration testing (OWASP Top 10)",
      "Secure code review experience",
      "Familiarity with cloud security (AWS)",
      "Scripting (Python, Go, or Ruby)",
    ],
    niceToHave: [
      "OSCP, CEH, or similar certifications",
      "Bug bounty experience",
      "Financial industry security regulations",
      "Terraform/IaC security scanning",
    ],
    perks: [
      "Access to security conference budget globally",
      "Bug bounty platform participation",
      "Remote-first with quarterly Tokyo gatherings",
      "Premium cybersecurity tool licenses",
    ],
    stack: ["Python", "AWS", "Docker", "Terraform", "Burp Suite"],
    rateMin: 800000,
    rateMax: 1050000,
    location: "remote",
    contractType: "contract",
    teamSize: 5,
    duration: "12 months",
    startDate: "May 2026",
    createdAt: "2026-03-05",
  },
  {
    id: "15",
    company: "Woven by Toyota",
    companyLogo: "WT",
    title: "Embedded Systems Engineer (C++/Rust)",
    description:
      "Develop software for Toyota's autonomous driving platform. Work on real-time sensor fusion, perception algorithms, and vehicle control systems in a cutting-edge robotics environment.",
    responsibilities: [
      "Develop real-time control software in C++ and Rust",
      "Implement sensor fusion algorithms for LiDAR and camera data",
      "Optimize code for embedded ARM and GPU targets",
      "Write safety-critical software following AUTOSAR standards",
      "Conduct hardware-in-the-loop testing and simulation",
    ],
    requirements: [
      "5+ years C++ systems programming",
      "Real-time operating systems (RTOS) experience",
      "Sensor processing (LiDAR, radar, camera)",
      "Linux kernel and driver development",
      "Version control and CI/CD for embedded systems",
    ],
    niceToHave: [
      "Rust for safety-critical systems",
      "ROS/ROS2 framework experience",
      "AUTOSAR or ISO 26262 knowledge",
      "Machine learning inference on edge devices",
    ],
    perks: [
      "Shape the future of autonomous driving",
      "Nihonbashi office with Toyota engineering labs access",
      "Test track and simulation facility access",
      "Competitive rate + travel allowance",
    ],
    stack: ["C++", "Rust", "ROS2", "Python", "CUDA"],
    rateMin: 900000,
    rateMax: 1300000,
    location: "tokyo",
    contractType: "contract",
    teamSize: 25,
    duration: "12+ months",
    startDate: "June 2026",
    createdAt: "2026-03-04",
  },
  {
    id: "16",
    company: "Mercari",
    companyLogo: "MC",
    title: "Search & Recommendation Engineer",
    description:
      "Improve product discovery for millions of users on Japan's largest marketplace. Build and optimize search ranking, personalization, and recommendation systems at scale.",
    responsibilities: [
      "Build and optimize search ranking models",
      "Develop personalized recommendation pipelines",
      "Design A/B testing frameworks for search quality",
      "Process and index millions of product listings in real-time",
      "Collaborate with product and data science teams",
    ],
    requirements: [
      "4+ years search or recommendation systems experience",
      "Elasticsearch or Solr expertise",
      "Python and data pipeline development",
      "Machine learning for ranking and personalization",
      "Large-scale data processing (Spark, Beam)",
    ],
    niceToHave: [
      "E-commerce or marketplace experience",
      "Vector search and embedding models",
      "Real-time feature engineering",
      "Japanese NLP experience",
    ],
    perks: [
      "Impact millions of daily active users",
      "Roppongi Hills office",
      "¥10,000/month Mercari credits",
      "Flexible work arrangements",
    ],
    stack: ["Python", "Elasticsearch", "Go", "Kafka", "TensorFlow"],
    rateMin: 850000,
    rateMax: 1100000,
    location: "tokyo",
    contractType: "freelance",
    teamSize: 12,
    duration: "9 months",
    startDate: "May 2026",
    createdAt: "2026-03-03",
  },
  {
    id: "17",
    company: "Treasure Data",
    companyLogo: "TD",
    title: "Infrastructure Engineer (Rust/Go)",
    description:
      "Build the core data platform that processes trillions of records for Fortune 500 companies. Work on high-performance data ingestion, storage, and query engines.",
    responsibilities: [
      "Develop data ingestion pipelines in Rust and Go",
      "Optimize columnar storage engine performance",
      "Build distributed query execution layers",
      "Manage Kubernetes clusters across multiple regions",
      "Implement observability and performance monitoring",
    ],
    requirements: [
      "5+ years systems programming (Rust or Go)",
      "Distributed systems and consensus protocols",
      "Database internals (storage engines, query planning)",
      "Kubernetes at scale",
      "Performance profiling and optimization",
    ],
    niceToHave: [
      "Apache Arrow or Parquet experience",
      "ClickHouse, DuckDB, or similar OLAP databases",
      "Raft or Paxos implementation experience",
      "Open-source database contributions",
    ],
    perks: [
      "Work on planet-scale data infrastructure",
      "Fully remote — anywhere in Japan",
      "Top-tier hardware budget",
      "Company retreat in Karuizawa",
    ],
    stack: ["Rust", "Go", "Kubernetes", "PostgreSQL", "Apache Arrow"],
    rateMin: 950000,
    rateMax: 1300000,
    location: "remote",
    contractType: "contract",
    teamSize: 8,
    duration: "12 months",
    startDate: "April 2026",
    createdAt: "2026-03-02",
  },
  {
    id: "18",
    company: "Cookpad",
    companyLogo: "CP",
    title: "React Native Engineer",
    description:
      "Build cross-platform mobile features for Japan's most popular recipe-sharing platform. Work on the recipe editor, social features, and meal planning tools used by millions.",
    responsibilities: [
      "Develop cross-platform features with React Native",
      "Implement rich media editor for recipe creation",
      "Build social features (comments, likes, sharing)",
      "Optimize app performance and reduce bundle size",
      "Write E2E tests with Detox",
    ],
    requirements: [
      "3+ years React Native development",
      "TypeScript and modern React patterns",
      "Native module bridging (iOS/Android)",
      "State management (Redux, Zustand, or Jotai)",
      "App Store and Play Store deployment",
    ],
    niceToHave: [
      "Native iOS (Swift) or Android (Kotlin) skills",
      "Image processing and camera APIs",
      "Push notification and deep linking",
      "Localization for Japanese market",
    ],
    perks: [
      "Free premium Cookpad subscription",
      "Monthly cooking events at office kitchen",
      "Bristol (UK) office exchange program",
      "Flexible hybrid schedule in Yokohama",
    ],
    stack: ["React Native", "TypeScript", "Redux", "Node.js", "GraphQL"],
    rateMin: 650000,
    rateMax: 850000,
    location: "yokohama",
    contractType: "freelance",
    teamSize: 6,
    duration: "6 months",
    startDate: "April 2026",
    createdAt: "2026-03-01",
  },
  {
    id: "19",
    company: "DeNA",
    companyLogo: "DN",
    title: "AI/LLM Engineer",
    description:
      "Build AI-powered products and integrate large language models into DeNA's gaming and entertainment platforms. Focus on prompt engineering, fine-tuning, and building production AI systems.",
    responsibilities: [
      "Integrate LLM APIs (Claude, GPT) into production applications",
      "Build RAG pipelines for knowledge-grounded generation",
      "Fine-tune and evaluate models for Japanese language tasks",
      "Design prompt engineering frameworks and evaluation suites",
      "Build internal AI tools for content creation and moderation",
    ],
    requirements: [
      "3+ years ML/AI engineering experience",
      "Python and modern ML frameworks (PyTorch, Transformers)",
      "LLM integration and prompt engineering",
      "REST API development (FastAPI or similar)",
      "Vector databases (Pinecone, Weaviate, pgvector)",
    ],
    niceToHave: [
      "Japanese NLP and tokenization experience",
      "Model fine-tuning (LoRA, QLoRA)",
      "LangChain or similar orchestration frameworks",
      "Game AI or creative AI experience",
    ],
    perks: [
      "Cutting-edge AI research environment",
      "Shibuya Hikarie office",
      "Access to GPU compute clusters",
      "Conference and paper publication support",
    ],
    stack: ["Python", "PyTorch", "FastAPI", "PostgreSQL", "Docker"],
    rateMin: 900000,
    rateMax: 1200000,
    location: "tokyo",
    contractType: "contract",
    teamSize: 7,
    duration: "9 months",
    startDate: "May 2026",
    createdAt: "2026-02-28",
  },
  {
    id: "20",
    company: "Cybozu",
    companyLogo: "CZ",
    title: "Accessibility Engineer",
    description:
      "Champion accessibility across Cybozu's kintone platform. Audit, fix, and build tooling to ensure WCAG 2.1 AA compliance across all products used by 35,000+ organizations.",
    responsibilities: [
      "Audit frontend components for WCAG 2.1 AA compliance",
      "Build accessible React components and patterns",
      "Create automated a11y testing pipelines",
      "Train engineering teams on accessibility best practices",
      "Collaborate with designers on inclusive design patterns",
    ],
    requirements: [
      "3+ years frontend with accessibility focus",
      "Deep WCAG 2.1 knowledge and ARIA patterns",
      "React/TypeScript component development",
      "Screen reader testing (NVDA, VoiceOver)",
      "Automated a11y testing (axe-core, Lighthouse)",
    ],
    niceToHave: [
      "IAAP CPAC certification",
      "Design system development experience",
      "Japanese language proficiency",
      "Experience with enterprise SaaS",
    ],
    perks: [
      "100% remote from anywhere in Japan",
      "Cybozu's famous 'ultra' work-life balance culture",
      "¥250,000 annual personal development budget",
      "6-hour workday option available",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Storybook", "Playwright"],
    rateMin: 650000,
    rateMax: 850000,
    location: "remote",
    contractType: "freelance",
    teamSize: 5,
    duration: "6 months",
    startDate: "April 2026",
    createdAt: "2026-02-27",
  },
  {
    id: "21",
    company: "Preferred Networks",
    companyLogo: "PF",
    title: "Deep Learning Infra Engineer",
    description:
      "Build and optimize the distributed training infrastructure for cutting-edge deep learning research. Work on GPU cluster management, training frameworks, and model serving at scale.",
    responsibilities: [
      "Manage and optimize multi-node GPU training clusters",
      "Build distributed training pipelines with PyTorch DDP/FSDP",
      "Develop model serving infrastructure for inference",
      "Implement mixed-precision training and memory optimization",
      "Create tools for experiment tracking and reproducibility",
    ],
    requirements: [
      "5+ years systems/infrastructure engineering",
      "CUDA programming and GPU optimization",
      "Distributed computing and networking",
      "Python and C++ proficiency",
      "Linux systems administration",
    ],
    niceToHave: [
      "PyTorch internals and custom operators",
      "NCCL and InfiniBand networking",
      "Kubernetes for ML workloads (KubeFlow)",
      "Compiler or runtime optimization experience",
    ],
    perks: [
      "Access to Japan's largest private GPU cluster",
      "Collaborate with world-class researchers",
      "Otemachi office near Imperial Palace",
      "Research paper co-authorship opportunities",
    ],
    stack: ["Python", "C++", "CUDA", "PyTorch", "Kubernetes"],
    rateMin: 1000000,
    rateMax: 1500000,
    location: "tokyo",
    contractType: "contract",
    teamSize: 15,
    duration: "12 months",
    startDate: "June 2026",
    createdAt: "2026-02-26",
  },
  {
    id: "22",
    company: "FreakOut",
    companyLogo: "FO",
    title: "AdTech Engineer (Scala/Kafka)",
    description:
      "Build real-time bidding systems processing 500K+ requests per second. Work on DSP infrastructure, audience targeting, and ad delivery optimization.",
    responsibilities: [
      "Develop real-time bidding engine in Scala",
      "Build streaming data pipelines with Kafka Streams",
      "Optimize latency-critical bid response paths (<100ms)",
      "Implement audience segmentation and targeting logic",
      "Scale infrastructure to handle traffic spikes",
    ],
    requirements: [
      "4+ years Scala or JVM development",
      "Kafka and stream processing experience",
      "Low-latency system design",
      "SQL and NoSQL databases at scale",
      "Understanding of programmatic advertising",
    ],
    niceToHave: [
      "RTB/OpenRTB protocol knowledge",
      "Akka or ZIO for concurrent programming",
      "ML for bid optimization",
      "Experience with 100K+ QPS systems",
    ],
    perks: [
      "Work on systems handling billions of daily events",
      "Roppongi office with panoramic views",
      "Free ad-tech industry conference passes",
      "Performance-based bonus structure",
    ],
    stack: ["Scala", "Kafka", "Redis", "PostgreSQL", "AWS"],
    rateMin: 800000,
    rateMax: 1050000,
    location: "tokyo",
    contractType: "contract",
    teamSize: 10,
    duration: "9 months",
    startDate: "May 2026",
    createdAt: "2026-02-25",
  },
  {
    id: "23",
    company: "HENNGE",
    companyLogo: "HG",
    title: "Cloud Security SaaS Engineer (Go)",
    description:
      "Build cloud security features for HENNGE One, used by 2,000+ companies. Work on SSO, email DLP, device management, and Zero Trust architecture in Go.",
    responsibilities: [
      "Develop identity and access management features in Go",
      "Build email security and DLP scanning pipelines",
      "Implement SAML/OIDC SSO integration flows",
      "Design Zero Trust network access features",
      "Write integration tests for security-critical paths",
    ],
    requirements: [
      "4+ years Go development",
      "Authentication protocols (SAML, OIDC, OAuth2)",
      "Cloud infrastructure (AWS/GCP)",
      "Security-focused software development",
      "PostgreSQL and caching systems",
    ],
    niceToHave: [
      "Email protocols (SMTP, IMAP, SPF/DKIM/DMARC)",
      "Device management (MDM) experience",
      "SOC 2 or ISO 27001 compliance",
      "Japanese enterprise sales support experience",
    ],
    perks: [
      "All-English engineering environment",
      "Shibuya office with standing desks",
      "Global engineering culture (30+ nationalities)",
      "Unlimited English/Japanese language lessons",
    ],
    stack: ["Go", "PostgreSQL", "Redis", "AWS", "Docker"],
    rateMin: 750000,
    rateMax: 950000,
    location: "tokyo",
    contractType: "freelance",
    teamSize: 9,
    duration: "6+ months",
    startDate: "April 2026",
    createdAt: "2026-02-24",
  },
  {
    id: "24",
    company: "ZOZO",
    companyLogo: "ZZ",
    title: "Computer Vision Engineer",
    description:
      "Develop ZOZOSUIT and ZOZOMAT measurement technology. Build 3D body scanning, virtual try-on, and size recommendation systems using computer vision and deep learning.",
    responsibilities: [
      "Develop 3D body measurement algorithms from smartphone cameras",
      "Build virtual try-on rendering pipeline",
      "Train and deploy size recommendation models",
      "Optimize inference for mobile edge deployment",
      "Collaborate with fashion and retail domain experts",
    ],
    requirements: [
      "4+ years computer vision engineering",
      "3D reconstruction and point cloud processing",
      "PyTorch for model training and inference",
      "Mobile deployment (CoreML, TFLite, ONNX)",
      "Image processing (OpenCV)",
    ],
    niceToHave: [
      "Fashion tech or retail experience",
      "AR/MR development",
      "NeRF or 3D Gaussian Splatting",
      "Synthetic data generation",
    ],
    perks: [
      "¥10,000/month ZOZO fashion credit",
      "Makuhari office with R&D lab",
      "Patent filing support and bonuses",
      "International conference sponsorship",
    ],
    stack: ["Python", "PyTorch", "C++", "OpenCV", "CoreML"],
    rateMin: 850000,
    rateMax: 1100000,
    location: "tokyo",
    contractType: "contract",
    teamSize: 8,
    duration: "12 months",
    startDate: "June 2026",
    createdAt: "2026-02-23",
  },
  {
    id: "25",
    company: "Sansan",
    companyLogo: "SS",
    title: "NLP / OCR Engineer",
    description:
      "Build the AI engine behind Eight and Sansan's business card recognition. Improve Japanese OCR accuracy, entity extraction, and contact data enrichment at scale.",
    responsibilities: [
      "Improve Japanese OCR models for business card recognition",
      "Build named entity recognition for contact information",
      "Develop data enrichment pipelines from web sources",
      "Train and evaluate NLP models for Japanese text",
      "Design APIs for real-time inference serving",
    ],
    requirements: [
      "3+ years NLP or OCR engineering",
      "Japanese language processing experience",
      "PyTorch and Transformers library",
      "Production ML model deployment",
      "Python and FastAPI/Flask",
    ],
    niceToHave: [
      "Tesseract or PaddleOCR customization",
      "Knowledge graph construction",
      "Document layout analysis",
      "Multilingual NLP (Japanese, English, Chinese)",
    ],
    perks: [
      "Omotesando office — great lunch options",
      "Access to unique B2B contact data",
      "Innovation time: 20% for personal projects",
      "Annual ML team offsite",
    ],
    stack: ["Python", "PyTorch", "FastAPI", "PostgreSQL", "Elasticsearch"],
    rateMin: 750000,
    rateMax: 1000000,
    location: "tokyo",
    contractType: "freelance",
    teamSize: 6,
    duration: "9 months",
    startDate: "May 2026",
    createdAt: "2026-02-22",
  },
]

// Generate additional positions to reach 80+ total
const generated = generatePositions(55, 26)
positions.push(...generated)

export function getPosition(id: string): Position | undefined {
  return positions.find((p) => p.id === id)
}

export function getPositions(filters?: {
  stack?: string
  location?: string
  rateMin?: number
  rateMax?: number
  contractType?: string
  sort?: string
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

  if (filters?.contractType) {
    result = result.filter((p) => p.contractType === filters.contractType)
  }

  if (filters?.rateMin) {
    result = result.filter((p) => p.rateMax >= filters.rateMin!)
  }

  if (filters?.rateMax) {
    result = result.filter((p) => p.rateMin <= filters.rateMax!)
  }

  // Sorting
  if (filters?.sort) {
    switch (filters.sort) {
      case "rate-high":
        result = [...result].sort((a, b) => b.rateMax - a.rateMax)
        break
      case "rate-low":
        result = [...result].sort((a, b) => a.rateMin - b.rateMin)
        break
      case "newest":
        result = [...result].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
      case "team-small":
        result = [...result].sort((a, b) => a.teamSize - b.teamSize)
        break
    }
  }

  return result
}

export const POSITIONS_PER_PAGE = 12

export function getPositionsPaginated(filters?: {
  stack?: string
  location?: string
  rateMin?: number
  rateMax?: number
  contractType?: string
  sort?: string
  page?: number
}): { positions: Position[]; total: number; totalPages: number; page: number } {
  const all = getPositions(filters)
  const page = Math.max(1, filters?.page ?? 1)
  const totalPages = Math.max(1, Math.ceil(all.length / POSITIONS_PER_PAGE))
  const start = (page - 1) * POSITIONS_PER_PAGE
  return {
    positions: all.slice(start, start + POSITIONS_PER_PAGE),
    total: all.length,
    totalPages,
    page: Math.min(page, totalPages),
  }
}

/** All unique stack technologies across positions */
export function getAllStacks(): string[] {
  const set = new Set<string>()
  for (const p of positions) {
    for (const s of p.stack) set.add(s)
  }
  return [...set].sort()
}

/** All unique locations */
export function getAllLocations(): { value: string; label: string }[] {
  const set = new Set<string>()
  for (const p of positions) set.add(p.location)
  return [...set]
    .sort()
    .map((loc) => ({
      value: loc,
      label: loc.charAt(0).toUpperCase() + loc.slice(1),
    }))
}
