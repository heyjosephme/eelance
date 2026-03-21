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

const companyPositions = positions.filter(
  (p) => p.company === "TechCorp Japan" || p.company === "CloudNative Corp"
)

function formatRate(rate: number) {
  return `¥${(rate / 10000).toFixed(0)}万`
}

export default function CompanyDashboard() {
  const totalApps = applications.length
  const pendingApps = applications.filter((a) => a.status === "pending").length

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      {/* Header */}
      <div className="animate-fade-in-up">
        <span className="text-xs font-medium uppercase tracking-widest text-teal-600">
          Dashboard
        </span>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          TechCorp Japan
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review applicants and arrange interviews
        </p>
      </div>

      {/* Stats */}
      <div className="animate-fade-in-up stagger-1 mt-6 grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-5">
            <p className="text-2xl font-bold">{companyPositions.length}</p>
            <p className="text-xs text-muted-foreground">Open positions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-2xl font-bold text-teal-600">{pendingApps}</p>
            <p className="text-xs text-muted-foreground">Pending reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-2xl font-bold">{totalApps}</p>
            <p className="text-xs text-muted-foreground">Total applicants</p>
          </CardContent>
        </Card>
      </div>

      {/* Position list */}
      <div className="mt-8 space-y-3">
        {companyPositions.map((position, i) => {
          const posApps = applications.filter(
            (a) => a.positionId === position.id
          )
          const pending = posApps.filter((a) => a.status === "pending").length

          return (
            <Link key={position.id} href={`/company/positions/${position.id}`}>
              <Card
                className="animate-fade-in-up transition-all hover:border-teal-500/30 hover:shadow-md hover:shadow-zinc-200/50"
                style={{ animationDelay: `${(i + 2) * 0.08}s` }}
              >
                <CardContent className="flex items-center gap-4 py-5">
                  {/* Applicant count circle */}
                  <div className={`flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${pending > 0 ? "bg-teal-50 text-teal-600" : "bg-zinc-50 text-zinc-400"}`}>
                    {posApps.length}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-sm">
                        {position.title}
                      </CardTitle>
                      {pending > 0 && (
                        <Badge className="bg-teal-500 text-white hover:bg-teal-500 text-[10px] px-1.5 py-0">
                          {pending} new
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="mt-0.5 text-xs">
                      {position.location} &middot; {position.contractType}{" "}
                      &middot; {formatRate(position.rateMin)}–
                      {formatRate(position.rateMax)}/月
                    </CardDescription>
                  </div>

                  {/* Avatar stack */}
                  {posApps.length > 0 && (
                    <div className="flex -space-x-2">
                      {posApps.slice(0, 4).map((app) => (
                        <div
                          key={app.id}
                          className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-zinc-100 text-xs font-medium text-zinc-600 shadow-sm"
                          title={app.engineer.name}
                        >
                          {app.engineer.name.charAt(0)}
                        </div>
                      ))}
                    </div>
                  )}

                  <svg className="size-4 shrink-0 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
