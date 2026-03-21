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
      <Card className="h-full transition-colors hover:border-teal-500/50">
        <CardHeader>
          <CardDescription className="text-xs">
            {position.company} &middot; {position.location} &middot;{" "}
            {position.contractType}
          </CardDescription>
          <CardTitle className="text-base">{position.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            {position.stack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {formatRate(position.rateMin)} – {formatRate(position.rateMax)}/月
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
