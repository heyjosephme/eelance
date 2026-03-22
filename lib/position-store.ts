import type { Position } from "./data/positions"

const STORE_KEY = "eelance_crawled_positions"

export function getCrawledPositions(): Position[] {
  if (typeof window === "undefined") return []
  const raw = localStorage.getItem(STORE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function addCrawledPosition(
  data: Omit<Position, "id" | "createdAt">
): Position {
  const positions = getCrawledPositions()
  const position: Position = {
    ...data,
    id: `crawled-${Date.now()}`,
    createdAt: new Date().toISOString().slice(0, 10),
  }
  positions.push(position)
  localStorage.setItem(STORE_KEY, JSON.stringify(positions))
  return position
}

export function removeCrawledPosition(id: string) {
  const positions = getCrawledPositions().filter((p) => p.id !== id)
  localStorage.setItem(STORE_KEY, JSON.stringify(positions))
}
