import Link from "next/link"
import { getPositionsPaginated } from "@/lib/data/positions"
import { Separator } from "@/components/ui/separator"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { PositionCard } from "./position-card"
import { PositionFilters } from "./position-filters"

function buildPageUrl(
  searchParams: Record<string, string | undefined>,
  page: number
) {
  const params = new URLSearchParams()
  for (const [key, val] of Object.entries(searchParams)) {
    if (val) params.set(key, val)
  }
  params.set("page", String(page))
  return `/positions?${params.toString()}`
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | "ellipsis")[] = [1]
  if (current > 3) pages.push("ellipsis")

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push("ellipsis")
  pages.push(total)

  return pages
}

export default async function PositionsPage(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const searchParams = await props.searchParams
  const { positions, total, totalPages, page } = getPositionsPaginated({
    stack: searchParams.stack,
    location: searchParams.location,
    contractType: searchParams.contractType,
    rateMin: searchParams.rateMin ? Number(searchParams.rateMin) : undefined,
    rateMax: searchParams.rateMax ? Number(searchParams.rateMax) : undefined,
    sort: searchParams.sort,
    page: searchParams.page ? Number(searchParams.page) : 1,
  })

  const pageNumbers = getPageNumbers(page, totalPages)

  return (
    <div>
      {/* Dark header */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="animate-fade-in-up mx-auto max-w-6xl px-6 pb-10 pt-8">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Open Positions
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            {total} position{total !== 1 && "s"} available
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 py-6">
      {/* Filters */}
      <PositionFilters
        stack={searchParams.stack}
        location={searchParams.location}
        contractType={searchParams.contractType}
        sort={searchParams.sort}
        rateRange={searchParams.rate}
        total={total}
      />

      {/* Results info */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Page {page} of {totalPages}
          </span>
          <span>
            Showing {(page - 1) * 12 + 1}–{Math.min(page * 12, total)} of{" "}
            {total}
          </span>
        </div>
      )}

      {/* Grid */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {positions.map((position, i) => (
          <div
            key={position.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${(i + 1) * 0.03}s` }}
          >
            <PositionCard position={position} />
          </div>
        ))}
      </div>

      {/* Empty state */}
      {positions.length === 0 && (
        <div className="mt-16 flex flex-col items-center text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-muted">
            <svg
              className="size-7 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <p className="mt-4 font-medium">No positions match your filters</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search criteria or clearing filters
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <>
          <Separator className="mt-8" />
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                {/* Previous */}
                <PaginationItem>
                  {page > 1 ? (
                    <PaginationPrevious
                      href={buildPageUrl(searchParams, page - 1)}
                    />
                  ) : (
                    <PaginationPrevious
                      className="pointer-events-none opacity-40"
                      href="#"
                    />
                  )}
                </PaginationItem>

                {/* Page numbers */}
                {pageNumbers.map((p, i) =>
                  p === "ellipsis" ? (
                    <PaginationItem key={`e${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href={buildPageUrl(searchParams, p)}
                        isActive={p === page}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                {/* Next */}
                <PaginationItem>
                  {page < totalPages ? (
                    <PaginationNext
                      href={buildPageUrl(searchParams, page + 1)}
                    />
                  ) : (
                    <PaginationNext
                      className="pointer-events-none opacity-40"
                      href="#"
                    />
                  )}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
      </div>
    </div>
  )
}
