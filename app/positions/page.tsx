import { getPositions } from "@/lib/data/positions"
import { PositionCard } from "./position-card"
import { PositionFilters } from "./position-filters"

export default async function PositionsPage(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const searchParams = await props.searchParams
  const filtered = getPositions({
    stack: searchParams.stack,
    location: searchParams.location,
    rateMin: searchParams.rateMin ? Number(searchParams.rateMin) : undefined,
    rateMax: searchParams.rateMax ? Number(searchParams.rateMax) : undefined,
  })

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="animate-fade-in-up">
        <span className="text-xs font-medium uppercase tracking-widest text-teal-600">
          Browse
        </span>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          Open Positions
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {filtered.length} position{filtered.length !== 1 && "s"} available
        </p>
      </div>

      <PositionFilters
        stack={searchParams.stack}
        location={searchParams.location}
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((position, i) => (
          <div
            key={position.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${(i + 1) * 0.06}s` }}
          >
            <PositionCard position={position} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-muted-foreground">
          No positions match your filters.
        </p>
      )}
    </div>
  )
}
