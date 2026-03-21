"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"

const locations = [
  { value: "", label: "All locations" },
  { value: "remote", label: "Remote" },
  { value: "tokyo", label: "Tokyo" },
  { value: "osaka", label: "Osaka" },
]

export function PositionFilters({
  stack,
  location,
}: {
  stack?: string
  location?: string
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

  return (
    <div className="animate-fade-in-up stagger-1 mt-6 flex flex-wrap gap-3">
      <Input
        placeholder="Filter by stack (e.g. React, Go)"
        defaultValue={stack}
        className="max-w-xs shadow-sm"
        onChange={(e) => updateFilter("stack", e.target.value)}
      />
      <select
        defaultValue={location ?? ""}
        onChange={(e) => updateFilter("location", e.target.value)}
        className="h-9 rounded-lg border border-input bg-card px-3 text-sm shadow-sm outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
      >
        {locations.map((loc) => (
          <option key={loc.value} value={loc.value}>
            {loc.label}
          </option>
        ))}
      </select>
    </div>
  )
}
