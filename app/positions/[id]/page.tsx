import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <Link
        href="/positions"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; All positions
      </Link>

      <Card className="mt-4">
        <CardHeader>
          <p className="text-sm text-muted-foreground">
            {position.company} &middot; {position.location} &middot;{" "}
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
            <h3 className="text-sm font-medium">Monthly Rate</h3>
            <p className="mt-1 text-lg font-semibold text-teal-600">
              {formatRate(position.rateMin)} – {formatRate(position.rateMax)}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium">Description</h3>
            <p className="mt-1 leading-relaxed text-muted-foreground">
              {position.description}
            </p>
          </div>

          <Button size="lg" asChild>
            <Link href="/upload">Upload Resume to Apply</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
