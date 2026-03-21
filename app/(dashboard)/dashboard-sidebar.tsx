"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  type SavedProfile,
  getSavedProfile,
  getSubscription,
  type SubscriptionTier,
} from "@/lib/profile-store"
import {
  getTrackedApplications,
  type TrackedApplication,
} from "@/lib/application-store"

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    href: "/applications",
    label: "My Applications",
    icon: (
      <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    href: "/positions",
    label: "Browse Positions",
    icon: (
      <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    href: "/upload",
    label: "Update Profile",
    icon: (
      <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
]

function SidebarContent() {
  const pathname = usePathname()
  const [saved, setSaved] = useState<SavedProfile | null>(null)
  const [subscription, setSubscription] = useState<SubscriptionTier>("free")
  const [apps, setApps] = useState<TrackedApplication[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setSaved(getSavedProfile())
    setSubscription(getSubscription())
    setApps(getTrackedApplications())
    setLoaded(true)
  }, [])

  const profile = saved?.profile
  const activeApps = apps.filter((a) => a.status !== "not_selected").length
  const interviews = apps.filter((a) => a.status === "interview_scheduled").length

  // Profile completeness
  const fields = profile
    ? [
        profile.name,
        profile.title,
        profile.skills.length > 0,
        profile.yearsOfExperience > 0,
        profile.summary,
      ]
    : []
  const completeness = profile
    ? Math.round((fields.filter(Boolean).length / fields.length) * 100)
    : 0

  return (
    <div className="flex h-full flex-col">
      {/* Profile section */}
      <div className="p-4">
        {loaded && profile ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-100 to-emerald-50 text-sm font-bold text-teal-700">
                {profile.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{profile.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {profile.title}
                </p>
              </div>
            </div>

            {/* Subscription badge */}
            {subscription === "pro" ? (
              <div className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-400 px-3 py-1.5 text-xs font-bold text-white">
                <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Pro Member
              </div>
            ) : (
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-700 transition-all hover:bg-teal-100"
              >
                Upgrade to Pro
              </Link>
            )}

            {/* Profile completeness */}
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Profile</span>
                <span className="font-medium">{completeness}%</span>
              </div>
              <Progress value={completeness} className="mt-1.5 h-1.5" />
            </div>
          </div>
        ) : loaded ? (
          <Link
            href="/upload"
            className="flex items-center gap-3 rounded-lg border border-dashed border-teal-300 bg-teal-50/50 p-3 text-xs font-medium text-teal-700 transition-all hover:bg-teal-50"
          >
            <svg className="size-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Set up your profile
          </Link>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="size-10 animate-pulse rounded-full bg-muted" />
              <div className="space-y-1.5">
                <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                <div className="h-2.5 w-16 animate-pulse rounded bg-muted" />
              </div>
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <nav className="space-y-1 p-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                  isActive
                    ? "bg-teal-50 font-medium text-teal-700"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.icon}
                {item.label}
                {item.label === "My Applications" && activeApps > 0 && (
                  <span className="ml-auto rounded-full bg-teal-100 px-1.5 py-0.5 text-[10px] font-bold text-teal-700">
                    {activeApps}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Quick stats */}
        {loaded && profile && (
          <>
            <Separator className="mx-4" />
            <div className="space-y-2 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Quick Stats
              </p>
              <div className="grid grid-cols-2 gap-2">
                <StatBox label="Skills" value={profile.skills.length} />
                <StatBox label="Experience" value={`${profile.yearsOfExperience}yr`} />
                <StatBox label="Active" value={activeApps} accent />
                <StatBox label="Interviews" value={interviews} accent />
              </div>
            </div>

            <Separator className="mx-4" />

            {/* Skills */}
            <div className="p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Skills
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {profile.skills.slice(0, 8).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-[10px]">
                    {skill}
                  </Badge>
                ))}
                {profile.skills.length > 8 && (
                  <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                    +{profile.skills.length - 8}
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </ScrollArea>

      {/* Footer */}
      <Separator />
      <div className="p-3">
        <p className="text-center text-[10px] text-muted-foreground">
          Powered by{" "}
          <span className="font-semibold text-teal-600">eelance</span> AI
        </p>
      </div>
    </div>
  )
}

function StatBox({
  label,
  value,
  accent,
}: {
  label: string
  value: number | string
  accent?: boolean
}) {
  return (
    <div className="rounded-lg border bg-card p-2 text-center">
      <p className={`text-lg font-bold ${accent ? "text-teal-600" : "text-foreground"}`}>
        {value}
      </p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  )
}

// Desktop sidebar
export function DesktopSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-card lg:block">
      <SidebarContent />
    </aside>
  )
}

// Mobile sidebar (Sheet)
export function MobileSidebarTrigger() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-lg border bg-card shadow-sm transition-colors hover:bg-muted lg:hidden"
        >
          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  )
}
