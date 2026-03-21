import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPosition } from "@/lib/data/positions"

function formatRate(rate: number) {
  return `¥${rate.toLocaleString()}`
}

export default async function PositionDetailPage(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params
  const position = getPosition(id)

  if (!position) {
    notFound()
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link
        href="/positions"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All positions
      </Link>

      <Card className="animate-fade-in-up mt-4 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-teal-500 to-emerald-400" />
        <CardHeader>
          <p className="text-xs text-muted-foreground">
            {position.company} &middot;{" "}
            <span className="capitalize">{position.location}</span> &middot;{" "}
            {position.contractType}
          </p>
          <CardTitle className="text-xl">{position.title}</CardTitle>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {position.stack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold">Monthly Rate</h3>
            <p className="mt-1 text-lg font-bold text-teal-600">
              {formatRate(position.rateMin)} – {formatRate(position.rateMax)}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Description</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {position.description}
            </p>
          </div>

          <Link
            href="/upload"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-teal-500 px-5 text-sm font-medium text-white shadow-sm shadow-teal-500/20 transition-all hover:bg-teal-400 hover:shadow-md"
          >
            Apply via Resume Upload
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
