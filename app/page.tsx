import Link from "next/link"
import { Button } from "@/components/ui/button"
import { positions } from "@/lib/data/positions"
import { PositionCard } from "./positions/position-card"

export default function Home() {
  const featured = positions.slice(0, 3)

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="bg-zinc-900 text-white">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Freelance IT jobs
            <br />
            <span className="text-teal-400">matched to your skills</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-400">
            Upload your resume and let AI find the best freelance and contract
            positions for you. No more scrolling through irrelevant listings.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              href="/upload"
              className="inline-flex h-9 items-center rounded-lg bg-teal-500 px-4 text-sm font-medium text-white transition-colors hover:bg-teal-400"
            >
              Upload Resume
            </Link>
            <Link
              href="/positions"
              className="inline-flex h-9 items-center rounded-lg border border-zinc-600 px-4 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-400 hover:text-white"
            >
              Browse Positions
            </Link>
          </div>
        </div>
      </section>

      {/* Featured positions */}
      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Positions</h2>
          <Link
            href="/positions"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((position) => (
            <PositionCard key={position.id} position={position} />
          ))}
        </div>
      </section>
    </div>
  )
}
