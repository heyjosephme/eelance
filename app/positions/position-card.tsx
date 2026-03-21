import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Position } from "@/lib/data/positions"

function formatRate(rate: number) {
  return `¥${(rate / 10000).toFixed(0)}万`
}

export function PositionCard({ position }: { position: Position }) {
  return (
    <Link href={`/positions/${position.id}`}>
      <Card className="h-full transition-all hover:border-teal-500/30 hover:shadow-md hover:shadow-zinc-200/50">
        <CardHeader className="pb-3">
          <CardDescription className="text-xs">
            {position.company} &middot;{" "}
            <span className="capitalize">{position.location}</span> &middot;{" "}
            {position.contractType}
          </CardDescription>
          <CardTitle className="text-sm leading-snug">
            {position.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-1">
            {position.stack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-[11px]">
                {tech}
              </Badge>
            ))}
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            {formatRate(position.rateMin)}–{formatRate(position.rateMax)}/月
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
