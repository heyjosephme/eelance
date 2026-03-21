import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getPosition, positions } from "@/lib/data/positions"

function formatRate(rate: number) {
  return `¥${rate.toLocaleString()}`
}

function formatRateShort(rate: number) {
  return `¥${(rate / 10000).toFixed(0)}万`
}

function daysAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return "Today"
  if (days === 1) return "1 day ago"
  return `${days} days ago`
}

function locationIcon(location: string) {
  if (location === "remote") {
    return (
      <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
  return (
    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

export default async function PositionDetailPage(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params
  const position = getPosition(id)

  if (!position) {
    notFound()
  }

  // Get similar positions (same company or overlapping stack)
  const similar = positions
    .filter((p) => p.id !== position.id)
    .map((p) => {
      const overlap = p.stack.filter((t) =>
        position.stack.some(
          (s) => s.toLowerCase() === t.toLowerCase()
        )
      ).length
      return { position: p, overlap }
    })
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-[oklch(0.985_0.002_90)]">
      {/* Hero header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[oklch(0.14_0.02_260)] to-[oklch(0.20_0.03_260)]">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 h-64 w-96 rounded-full bg-teal-500/[0.07] blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-48 w-72 rounded-full bg-emerald-500/[0.05] blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 pb-12 pt-8">
          {/* Back link */}
          <Link
            href="/positions"
            className="inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All positions
          </Link>

          <div className="mt-6 flex items-start gap-5">
            {/* Company logo */}
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg font-bold text-white backdrop-blur-sm sm:size-16 sm:text-xl">
              {position.companyLogo ?? position.company.charAt(0)}
            </div>

            <div className="min-w-0 flex-1">
              {/* Company + meta */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                <span className="font-medium text-zinc-300">{position.company}</span>
                <span className="text-zinc-600">&middot;</span>
                <span className="inline-flex items-center gap-1 capitalize">
                  {locationIcon(position.location)}
                  {position.location}
                </span>
                <span className="text-zinc-600">&middot;</span>
                <span className="capitalize">{position.contractType}</span>
              </div>

              {/* Title */}
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {position.title}
              </h1>

              {/* Stack */}
              <div className="mt-4 flex flex-wrap gap-2">
                {position.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-white/[0.08] px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur-sm transition-colors hover:bg-white/[0.12]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Posted date */}
              <p className="mt-4 text-xs text-zinc-500">
                Posted {daysAgo(position.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Left column — details */}
          <div className="space-y-8">
            {/* Key info cards */}
            <div className="animate-fade-in-up grid grid-cols-2 gap-3 sm:grid-cols-4">
              <InfoCard
                icon={
                  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                label="Monthly Rate"
                value={`${formatRateShort(position.rateMin)}–${formatRateShort(position.rateMax)}`}
                accent
              />
              <InfoCard
                icon={
                  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
                label="Team Size"
                value={`${position.teamSize} people`}
              />
              <InfoCard
                icon={
                  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                label="Duration"
                value={position.duration}
              />
              <InfoCard
                icon={
                  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
                label="Start Date"
                value={position.startDate}
              />
            </div>

            {/* Description */}
            <section className="animate-fade-in-up stagger-1">
              <SectionTitle>About This Role</SectionTitle>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {position.description}
              </p>
            </section>

            <Separator />

            {/* Responsibilities */}
            <section className="animate-fade-in-up stagger-2">
              <SectionTitle>What You&apos;ll Do</SectionTitle>
              <ul className="mt-4 space-y-3">
                {position.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-[10px] font-bold text-teal-600">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <Separator />

            {/* Requirements */}
            <section className="animate-fade-in-up stagger-3">
              <SectionTitle>Requirements</SectionTitle>
              <ul className="mt-4 space-y-2.5">
                {position.requirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <svg className="mt-0.5 size-4 shrink-0 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Nice to have */}
            {position.niceToHave.length > 0 && (
              <section className="animate-fade-in-up stagger-4">
                <SectionTitle>Nice to Have</SectionTitle>
                <ul className="mt-4 space-y-2.5">
                  {position.niceToHave.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <svg className="mt-0.5 size-4 shrink-0 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <Separator />

            {/* Perks */}
            {position.perks.length > 0 && (
              <section className="animate-fade-in-up stagger-5">
                <SectionTitle>Perks &amp; Benefits</SectionTitle>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {position.perks.map((perk, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-lg border bg-card p-3.5 text-sm transition-colors hover:border-teal-200 hover:bg-teal-50/30"
                    >
                      <span className="mt-0.5 text-lg">
                        {perkEmoji(perk)}
                      </span>
                      <span className="text-muted-foreground">{perk}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            {/* Apply CTA card */}
            <Card className="animate-fade-in-up overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-teal-500 to-emerald-400" />
              <CardContent className="p-5">
                <p className="text-lg font-bold text-teal-600">
                  {formatRate(position.rateMin)} – {formatRate(position.rateMax)}
                </p>
                <p className="text-xs text-muted-foreground">per month</p>

                <Link
                  href="/upload"
                  className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-emerald-400 hover:shadow-lg hover:shadow-teal-500/25"
                >
                  Apply Now
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>

                <p className="mt-3 text-center text-[11px] text-muted-foreground">
                  Upload resume or chat with AI to apply
                </p>

                <Separator className="my-4" />

                {/* Quick facts */}
                <div className="space-y-3 text-sm">
                  <QuickFact label="Location" value={position.location} capitalize />
                  <QuickFact label="Type" value={position.contractType} capitalize />
                  <QuickFact label="Team" value={`${position.teamSize} people`} />
                  <QuickFact label="Duration" value={position.duration} />
                  <QuickFact label="Start" value={position.startDate} />
                </div>
              </CardContent>
            </Card>

            {/* Company card */}
            <Card className="animate-fade-in-up stagger-1">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-50 text-xs font-bold text-zinc-600">
                    {position.companyLogo ?? position.company.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{position.company}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {positions.filter((p) => p.company === position.company).length} open positions
                    </p>
                  </div>
                </div>
                <Link
                  href={`/positions?stack=&location=`}
                  className="mt-3 flex items-center gap-1 text-xs font-medium text-teal-600 transition-colors hover:text-teal-500"
                >
                  View all positions
                  <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </CardContent>
            </Card>

            {/* Share */}
            <Card className="animate-fade-in-up stagger-2">
              <CardContent className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Share this position
                </p>
                <div className="mt-3 flex gap-2">
                  {["Copy Link", "Twitter", "LinkedIn"].map((platform) => (
                    <button
                      key={platform}
                      type="button"
                      className="flex-1 rounded-lg border bg-card px-3 py-2 text-[11px] font-medium transition-all hover:border-teal-200 hover:bg-teal-50/50 hover:text-teal-700"
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar positions */}
        {similar.length > 0 && (
          <div className="mt-12">
            <Separator className="mb-8" />
            <h2 className="text-lg font-bold tracking-tight">
              Similar Positions
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Based on overlapping tech stack
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {similar.map(({ position: pos, overlap }, i) => (
                <Link
                  key={pos.id}
                  href={`/positions/${pos.id}`}
                  className="animate-fade-in-up group"
                  style={{ animationDelay: `${(i + 1) * 0.08}s` }}
                >
                  <Card className="h-full transition-all hover:border-teal-500/30 hover:shadow-md hover:shadow-zinc-200/50">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-md bg-zinc-100 text-[10px] font-bold text-zinc-500">
                          {pos.companyLogo ?? pos.company.charAt(0)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {pos.company}
                        </p>
                      </div>
                      <p className="mt-2.5 text-sm font-semibold leading-snug transition-colors group-hover:text-teal-600">
                        {pos.title}
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {pos.stack.slice(0, 3).map((tech) => {
                          const isShared = position.stack.some(
                            (s) => s.toLowerCase() === tech.toLowerCase()
                          )
                          return (
                            <Badge
                              key={tech}
                              variant={isShared ? "default" : "secondary"}
                              className="text-[10px]"
                            >
                              {tech}
                            </Badge>
                          )
                        })}
                        {pos.stack.length > 3 && (
                          <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                            +{pos.stack.length - 3}
                          </span>
                        )}
                      </div>
                      <p className="mt-2.5 font-mono text-xs text-muted-foreground">
                        {formatRateShort(pos.rateMin)}–{formatRateShort(pos.rateMax)}/月
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile sticky apply bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/80 p-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-teal-600">
              {formatRateShort(position.rateMin)}–{formatRateShort(position.rateMax)}
              <span className="text-xs font-normal text-muted-foreground">/月</span>
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              {position.company}
            </p>
          </div>
          <Link
            href="/upload"
            className="flex h-10 items-center gap-2 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 px-6 text-sm font-semibold text-white shadow-md shadow-teal-600/20"
          >
            Apply Now
          </Link>
        </div>
      </div>

      {/* Bottom padding for mobile sticky bar */}
      <div className="h-20 lg:hidden" />
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
      {children}
    </h2>
  )
}

function InfoCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="rounded-xl border bg-card p-4 transition-colors hover:border-teal-200/50">
      <div className={`${accent ? "text-teal-500" : "text-muted-foreground"}`}>
        {icon}
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">{label}</p>
      <p className={`mt-0.5 text-sm font-semibold ${accent ? "text-teal-600" : ""}`}>
        {value}
      </p>
    </div>
  )
}

function QuickFact({
  label,
  value,
  capitalize,
}: {
  label: string
  value: string
  capitalize?: boolean
}) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-medium ${capitalize ? "capitalize" : ""}`}>
        {value}
      </span>
    </div>
  )
}

function perkEmoji(perk: string): string {
  const p = perk.toLowerCase()
  if (p.includes("remote") || p.includes("home")) return "🏠"
  if (p.includes("macbook") || p.includes("hardware") || p.includes("apple")) return "💻"
  if (p.includes("learning") || p.includes("conference") || p.includes("certification")) return "📚"
  if (p.includes("health") || p.includes("insurance")) return "🏥"
  if (p.includes("lunch") || p.includes("dinner")) return "🍱"
  if (p.includes("flexible") || p.includes("async")) return "⏰"
  if (p.includes("equity") || p.includes("token")) return "📈"
  if (p.includes("office") || p.includes("wework") || p.includes("desk")) return "🏢"
  if (p.includes("mentor") || p.includes("team")) return "👥"
  if (p.includes("game") || p.includes("play")) return "🎮"
  if (p.includes("research") || p.includes("publication")) return "🔬"
  if (p.includes("retreat") || p.includes("offsite")) return "✈️"
  if (p.includes("on-call") || p.includes("compensation")) return "💰"
  if (p.includes("security") || p.includes("wallet")) return "🔒"
  if (p.includes("creative") || p.includes("shape") || p.includes("direct")) return "🎨"
  if (p.includes("life") || p.includes("saving")) return "❤️"
  return "✨"
}
