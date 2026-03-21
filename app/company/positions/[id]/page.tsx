import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getPosition } from "@/lib/data/positions"
import { getApplicationsByPosition } from "@/lib/data/applications"
import { ApplicantList } from "./applicant-list"

function formatRate(rate: number) {
  return `¥${(rate / 10000).toFixed(0)}万`
}

export default async function CompanyPositionPage(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params
  const position = getPosition(id)
  if (!position) notFound()

  const apps = getApplicationsByPosition(id)
  const pending = apps.filter((a) => a.status === "pending").length
  const accepted = apps.filter((a) => a.status === "accepted").length
  const avgScore =
    apps.length > 0
      ? Math.round(apps.reduce((sum, a) => sum + a.matchScore, 0) / apps.length)
      : 0

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="mx-auto w-full max-w-5xl px-6 pb-14 pt-8">
          {/* Breadcrumb */}
          <nav className="animate-fade-in-up flex items-center gap-2 text-sm text-zinc-500">
            <Link href="/company" className="transition-colors hover:text-zinc-300">
              Dashboard
            </Link>
            <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="truncate text-zinc-400">{position.title}</span>
          </nav>

          {/* Position header */}
          <div className="animate-fade-in-up mt-5 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-xs font-bold text-white">
                  {position.companyLogo ?? position.company.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-zinc-400">{position.company}</p>
                  <h1 className="text-xl font-bold text-white sm:text-2xl">
                    {position.title}
                  </h1>
                </div>
              </div>

              {/* Meta row */}
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-400">
                <span className="inline-flex items-center gap-1.5 capitalize">
                  <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {position.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatRate(position.rateMin)}–{formatRate(position.rateMax)}/月
                </span>
                <span className="inline-flex items-center gap-1.5 capitalize">
                  <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {position.contractType}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Team of {position.teamSize}
                </span>
              </div>
            </div>

            <Badge variant="outline" className="hidden shrink-0 border-teal-500/50 text-teal-400 sm:inline-flex">
              Active
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats bar — overlapping header */}
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="-mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MiniStatCard label="Total Applicants" value={apps.length} />
          <MiniStatCard label="Pending Review" value={pending} color="amber" />
          <MiniStatCard label="Accepted" value={accepted} color="teal" />
          <MiniStatCard label="Avg Match" value={avgScore} suffix="/100" />
        </div>
      </div>

      {/* Main content: two columns on desktop */}
      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Left: Applicants */}
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-tight">Applicants</h2>
              <p className="text-xs text-muted-foreground">
                Sorted by match score
              </p>
            </div>

            <div className="mt-4">
              {apps.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center py-16 text-center">
                    <div className="flex size-14 items-center justify-center rounded-full bg-zinc-100">
                      <svg className="size-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="mt-4 text-sm font-medium">No applicants yet</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Applicants will appear here when engineers apply to this position.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <ApplicantList applications={apps} position={position} />
              )}
            </div>
          </div>

          {/* Right sidebar: Position details */}
          <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            {/* Stack */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tech Stack
                </h3>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {position.stack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Details */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Position Details
                </h3>
                <div className="mt-3 space-y-3">
                  <DetailRow label="Duration" value={position.duration} />
                  <DetailRow label="Start Date" value={position.startDate} />
                  <DetailRow label="Posted" value={position.createdAt} />
                  <DetailRow
                    label="Rate"
                    value={`${formatRate(position.rateMin)}–${formatRate(position.rateMax)}/月`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  About This Role
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {position.description}
                </p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Requirements
                </h3>
                <ul className="mt-2.5 space-y-2">
                  {position.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <svg className="mt-0.5 size-3.5 shrink-0 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Perks */}
            {position.perks.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Perks
                  </h3>
                  <ul className="mt-2.5 space-y-2">
                    {position.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <svg className="mt-0.5 size-3.5 shrink-0 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function MiniStatCard({
  label,
  value,
  suffix,
  color,
}: {
  label: string
  value: number | string
  suffix?: string
  color?: "teal" | "amber"
}) {
  const textColor =
    color === "teal"
      ? "text-teal-600"
      : color === "amber"
        ? "text-amber-600"
        : "text-foreground"

  return (
    <Card className="shadow-md shadow-zinc-200/50">
      <CardContent className="p-4 text-center">
        <p className={`text-2xl font-bold ${textColor}`}>
          {value}
          {suffix && (
            <span className="text-xs font-normal text-muted-foreground">{suffix}</span>
          )}
        </p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-medium">{value}</span>
    </div>
  )
}
