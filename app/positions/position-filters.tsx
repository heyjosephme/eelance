"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const locations = [
  { value: "", label: "All locations" },
  { value: "remote", label: "Remote" },
  { value: "tokyo", label: "Tokyo" },
  { value: "osaka", label: "Osaka" },
  { value: "fukuoka", label: "Fukuoka" },
  { value: "yokohama", label: "Yokohama" },
  { value: "nagoya", label: "Nagoya" },
  { value: "kyoto", label: "Kyoto" },
]

const contractTypes = [
  { value: "", label: "All types" },
  { value: "freelance", label: "Freelance" },
  { value: "contract", label: "Contract" },
]

const sortOptions = [
  { value: "", label: "Default" },
  { value: "newest", label: "Newest first" },
  { value: "rate-high", label: "Highest rate" },
  { value: "rate-low", label: "Lowest rate" },
  { value: "team-small", label: "Smallest team" },
]

const popularStacks = [
  "React",
  "TypeScript",
  "Go",
  "Python",
  "Rust",
  "Kotlin",
  "Swift",
  "Ruby on Rails",
  "Kubernetes",
  "AWS",
  "PostgreSQL",
  "Docker",
]

const ratePresets = [
  { value: "", label: "Any rate" },
  { value: "60-80", label: "¥60万–80万" },
  { value: "80-100", label: "¥80万–100万" },
  { value: "100-130", label: "¥100万–130万" },
  { value: "130-", label: "¥130万+" },
]

export function PositionFilters({
  stack,
  location,
  contractType,
  sort,
  rateRange,
  total,
}: {
  stack?: string
  location?: string
  contractType?: string
  sort?: string
  rateRange?: string
  total: number
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/positions?${params.toString()}`)
  }

  function updateRateRange(preset: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (!preset) {
      params.delete("rateMin")
      params.delete("rateMax")
      params.delete("rate")
    } else {
      params.set("rate", preset)
      const [min, max] = preset.split("-")
      if (min) params.set("rateMin", String(Number(min) * 10000))
      else params.delete("rateMin")
      if (max) params.set("rateMax", String(Number(max) * 10000))
      else params.delete("rateMax")
    }
    router.push(`/positions?${params.toString()}`)
  }

  function clearAll() {
    router.push("/positions")
  }

  const hasFilters = stack || location || contractType || sort || rateRange

  return (
    <div className="animate-fade-in-up stagger-1 mt-6 space-y-4">
      {/* Row 1: Search + dropdowns */}
      <div className="flex flex-wrap gap-3">
        <Input
          placeholder="Search stack (e.g. React, Go, Python)"
          defaultValue={stack}
          className="max-w-xs shadow-sm"
          onChange={(e) => updateFilter("stack", e.target.value)}
        />
        <SelectFilter
          value={location ?? ""}
          onChange={(v) => updateFilter("location", v)}
          options={locations}
        />
        <SelectFilter
          value={contractType ?? ""}
          onChange={(v) => updateFilter("contractType", v)}
          options={contractTypes}
        />
        <SelectFilter
          value={sort ?? ""}
          onChange={(v) => updateFilter("sort", v)}
          options={sortOptions}
          prefix="Sort: "
        />
      </div>

      {/* Row 2: Rate presets */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Rate:</span>
        {ratePresets.map((preset) => (
          <button
            key={preset.value}
            type="button"
            onClick={() => updateRateRange(preset.value)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
              (rateRange ?? "") === preset.value
                ? "bg-foreground text-background shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Row 3: Popular stack chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Popular:
        </span>
        {popularStacks.map((tech) => {
          const isActive =
            stack?.toLowerCase() === tech.toLowerCase()
          return (
            <button
              key={tech}
              type="button"
              onClick={() =>
                updateFilter("stack", isActive ? "" : tech)
              }
              className="group"
            >
              <Badge
                variant={isActive ? "default" : "secondary"}
                className={`cursor-pointer transition-all ${
                  isActive
                    ? ""
                    : "hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                }`}
              >
                {tech}
              </Badge>
            </button>
          )
        })}
      </div>

      {/* Active filters summary */}
      {hasFilters && (
        <>
          <Separator />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">{total}</span>{" "}
              position{total !== 1 && "s"}
              {stack && (
                <>
                  {" "}matching{" "}
                  <span className="font-semibold text-teal-600">{stack}</span>
                </>
              )}
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <svg
                className="size-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Clear all
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function SelectFilter({
  value,
  onChange,
  options,
  prefix,
}: {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  prefix?: string
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 rounded-lg border border-input bg-card px-3 text-sm shadow-sm outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {prefix ?? ""}{opt.label}
        </option>
      ))}
    </select>
  )
}
