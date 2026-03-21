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
import { positions } from "@/lib/data/positions"
import { applications } from "@/lib/data/applications"

const COMPANY_NAMES = ["TechCorp Japan", "CloudNative Corp"]
const companyPositions = positions.filter((p) =>
  COMPANY_NAMES.includes(p.company)
)

function formatRate(rate: number) {
  return `¥${(rate / 10000).toFixed(0)}万`
}

function getAppsForPosition(positionId: string) {
  return applications.filter((a) => a.positionId === positionId)
}

export default function CompanyDashboard() {
  const companyApps = applications.filter((a) =>
    companyPositions.some((p) => p.id === a.positionId)
  )
  const totalApps = companyApps.length
  const pendingApps = companyApps.filter((a) => a.status === "pending").length
  const avgScore =
    totalApps > 0
      ? Math.round(companyApps.reduce((sum, a) => sum + a.matchScore, 0) / totalApps)
      : 0

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Dark header */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="mx-auto w-full max-w-5xl px-6 pb-16 pt-10">
          <div className="animate-fade-in-up flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 text-lg font-black text-white shadow-lg shadow-teal-500/20">
                TC
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  TechCorp Group
                </h1>
                <p className="mt-0.5 text-sm text-zinc-400">
                  Manage open positions and review applicants
                </p>
              </div>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <button
                type="button"
                className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
              >
                Settings
              </button>
              <button
                type="button"
                className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-teal-500/30 transition-colors hover:bg-teal-400"
              >
                + New Position
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats cards — overlapping the dark header */}
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="-mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            label="Open Positions"
            value={companyPositions.length}
            icon={
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            }
          />
          <StatCard
            label="Total Applicants"
            value={totalApps}
            accent
            icon={
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <StatCard
            label="Pending Review"
            value={pendingApps}
            icon={
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            label="Avg Match Score"
            value={avgScore}
            suffix="/100"
            icon={
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
        </div>
      </div>

      {/* Position list */}
      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight">Open Positions</h2>
          <p className="text-xs text-muted-foreground">
            {companyPositions.length} position{companyPositions.length !== 1 && "s"}
          </p>
        </div>

        <div className="mt-5 space-y-5">
          {companyPositions.map((position, i) => {
            const posApps = getAppsForPosition(position.id)
            const pending = posApps.filter((a) => a.status === "pending").length
            const accepted = posApps.filter((a) => a.status === "accepted").length

            return (
              <Link key={position.id} href={`/company/positions/${position.id}`} className="block">
                <Card
                  className="animate-fade-in-up overflow-hidden transition-all hover:border-teal-500/30 hover:shadow-lg hover:shadow-zinc-200/50"
                  style={{ animationDelay: `${(i + 1) * 0.08}s` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-50 text-[11px] font-bold text-zinc-500">
                          {position.companyLogo ?? position.company.charAt(0)}
                        </div>
                        <div>
                          <CardTitle className="text-[15px]">
                            {position.title}
                          </CardTitle>
                          <CardDescription className="mt-0.5 text-xs">
                            {position.company} &middot;{" "}
                            <span className="capitalize">{position.location}</span> &middot;{" "}
                            {formatRate(position.rateMin)}–{formatRate(position.rateMax)}/月 &middot;{" "}
                            <span className="capitalize">{position.contractType}</span>
                          </CardDescription>
                        </div>
                      </div>

                      {/* Status badges */}
                      <div className="hidden shrink-0 items-center gap-2 sm:flex">
                        {pending > 0 && (
                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-[10px] px-2 py-0.5 shadow-none">
                            {pending} to review
                          </Badge>
                        )}
                        {accepted > 0 && (
                          <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100 text-[10px] px-2 py-0.5 shadow-none">
                            {accepted} accepted
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-0">
                    {/* Stack badges */}
                    <div className="flex flex-wrap gap-1">
                      {position.stack.slice(0, 5).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-[10px]">
                          {tech}
                        </Badge>
                      ))}
                      {position.stack.length > 5 && (
                        <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                          +{position.stack.length - 5}
                        </span>
                      )}
                    </div>

                    <Separator className="mt-4" />

                    {/* Bottom row: applicants + arrow */}
                    <div className="flex items-center justify-between py-3.5">
                      <div className="flex items-center gap-4">
                        {/* Avatar stack */}
                        {posApps.length > 0 && (
                          <div className="flex -space-x-2">
                            {posApps.slice(0, 4).map((app) => (
                              <div
                                key={app.id}
                                className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-zinc-100 text-[10px] font-semibold text-zinc-600 shadow-sm"
                              >
                                {app.engineer.name.charAt(0)}
                              </div>
                            ))}
                            {posApps.length > 4 && (
                              <div className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-zinc-200 text-[10px] font-semibold text-zinc-600 shadow-sm">
                                +{posApps.length - 4}
                              </div>
                            )}
                          </div>
                        )}
                        <span className={`text-sm font-medium ${posApps.length > 0 ? "text-foreground" : "text-zinc-400"}`}>
                          {posApps.length} applicant{posApps.length !== 1 && "s"}
                        </span>

                        {/* Mobile badges */}
                        <div className="flex items-center gap-1.5 sm:hidden">
                          {pending > 0 && (
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-[9px] px-1.5 py-0 shadow-none">
                              {pending} new
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="hidden sm:inline">View applicants</span>
                        <svg className="size-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </CardContent>

                  {/* Pipeline progress bar */}
                  {posApps.length > 0 && (
                    <div className="flex h-1.5 overflow-hidden">
                      {pending > 0 && (
                        <div
                          className="bg-amber-400 transition-all"
                          style={{ width: `${(pending / posApps.length) * 100}%` }}
                        />
                      )}
                      {accepted > 0 && (
                        <div
                          className="bg-teal-500 transition-all"
                          style={{ width: `${(accepted / posApps.length) * 100}%` }}
                        />
                      )}
                      {posApps.length - pending - accepted > 0 && (
                        <div
                          className="bg-zinc-200 transition-all"
                          style={{ width: `${((posApps.length - pending - accepted) / posApps.length) * 100}%` }}
                        />
                      )}
                    </div>
                  )}
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Pipeline legend */}
        <div className="mt-5 flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <div className="size-2.5 rounded-full bg-amber-400" />
            <span className="text-[11px] text-muted-foreground">Pending</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-2.5 rounded-full bg-teal-500" />
            <span className="text-[11px] text-muted-foreground">Accepted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-2.5 rounded-full bg-zinc-200" />
            <span className="text-[11px] text-muted-foreground">Passed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  suffix,
  accent,
  icon,
}: {
  label: string
  value: number | string
  suffix?: string
  accent?: boolean
  icon: React.ReactNode
}) {
  return (
    <Card className="animate-fade-in-up shadow-lg shadow-zinc-200/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className={`rounded-lg p-2 ${accent ? "bg-teal-50 text-teal-600" : "bg-zinc-100 text-zinc-500"}`}>
            {icon}
          </div>
        </div>
        <div className="mt-3">
          <p className={`text-2xl font-bold ${accent ? "text-teal-600" : "text-foreground"}`}>
            {value}
            {suffix && <span className="text-sm font-normal text-muted-foreground">{suffix}</span>}
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}
