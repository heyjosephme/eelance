import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Position } from "@/lib/data/positions"

function formatRate(rate: number) {
  return `¥${(rate / 10000).toFixed(0)}万`
}

export function PositionCard({ position }: { position: Position }) {
  return (
    <Link href={`/positions/${position.id}`}>
      <Card className="group h-full transition-all hover:border-teal-500/30 hover:shadow-md hover:shadow-zinc-200/50">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-50 text-[10px] font-bold text-zinc-500">
              {position.companyLogo ?? position.company.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <CardDescription className="truncate text-xs font-medium">
                  {position.company}
                </CardDescription>
                <span className="shrink-0 text-[10px] text-muted-foreground">
                  {position.createdAt}
                </span>
              </div>
              <CardTitle className="mt-0.5 text-sm leading-snug transition-colors group-hover:text-teal-600">
                {position.title}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Stack badges */}
          <div className="flex flex-wrap gap-1">
            {position.stack.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-[10px]">
                {tech}
              </Badge>
            ))}
            {position.stack.length > 4 && (
              <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                +{position.stack.length - 4}
              </span>
            )}
          </div>

          <Separator />

          {/* Bottom row: rate + meta */}
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs font-medium text-teal-600">
              {formatRate(position.rateMin)}–{formatRate(position.rateMax)}
              <span className="text-muted-foreground">/月</span>
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="inline-flex items-center gap-0.5 capitalize">
                {position.location === "remote" ? (
                  <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                )}
                {position.location}
              </span>
              <span className="text-border">·</span>
              <span className="inline-flex items-center gap-0.5">
                <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {position.teamSize}
              </span>
              <span className="text-border">·</span>
              <Badge variant="outline" className="h-4 px-1.5 text-[9px] capitalize">
                {position.contractType}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
