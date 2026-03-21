import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { positions } from "@/lib/data/positions"
import { applications } from "@/lib/data/applications"

// Mock: show positions for "TechCorp Japan" and "CloudNative Corp"
const companyPositions = positions.filter(
  (p) => p.company === "TechCorp Japan" || p.company === "CloudNative Corp"
)

function formatRate(rate: number) {
  return `¥${(rate / 10000).toFixed(0)}万`
}

export default function CompanyDashboard() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      <div>
        <h1 className="text-2xl font-semibold">Company Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          TechCorp Japan &middot; Review applicants and arrange interviews
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {companyPositions.map((position) => {
          const posApps = applications.filter(
            (a) => a.positionId === position.id
          )
          const pending = posApps.filter((a) => a.status === "pending").length

          return (
            <Link key={position.id} href={`/company/positions/${position.id}`}>
              <Card className="transition-colors hover:border-teal-500/50">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">
                        {position.title}
                      </CardTitle>
                      <CardDescription>
                        {position.location} &middot; {position.contractType}{" "}
                        &middot; {formatRate(position.rateMin)}–
                        {formatRate(position.rateMax)}/月
                      </CardDescription>
                    </div>
                    {pending > 0 ? (
                      <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100">
                        {pending} new
                      </Badge>
                    ) : (
                      <Badge variant="secondary">No applicants</Badge>
                    )}
                  </div>
                </CardHeader>
                {posApps.length > 0 && (
                  <CardContent className="pt-0">
                    <div className="flex -space-x-2">
                      {posApps.slice(0, 5).map((app) => (
                        <div
                          key={app.id}
                          className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-zinc-200 text-xs font-medium text-zinc-600"
                          title={app.engineer.name}
                        >
                          {app.engineer.name.charAt(0)}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
