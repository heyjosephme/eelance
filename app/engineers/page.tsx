import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { engineerListings } from "@/lib/data/engineer-listings"

function formatRate(rate: number) {
  return `¥${(rate / 10000).toFixed(0)}万`
}

export default function EngineersPage() {
  return (
    <div>
      {/* Dark header */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="animate-fade-in-up mx-auto max-w-6xl px-6 pb-10 pt-8">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Available Engineers
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            {engineerListings.length} engineers ready for freelance/contract work
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 py-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {engineerListings.map((eng, i) => (
          <Link key={eng.id} href={`/engineers/${eng.id}`}>
            <Card
              className="animate-fade-in-up h-full transition-all hover:border-teal-500/30 hover:shadow-md hover:shadow-zinc-200/50"
              style={{ animationDelay: `${(i + 1) * 0.08}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-100 to-emerald-50 text-sm font-bold text-teal-700">
                    {eng.name.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-sm">{eng.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {eng.title} &middot; {eng.yearsOfExperience}y
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {eng.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-[11px]">
                      {skill}
                    </Badge>
                  ))}
                  {eng.skills.length > 4 && (
                    <Badge variant="secondary" className="text-[11px]">
                      +{eng.skills.length - 4}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-mono">
                    {formatRate(eng.rateMin)}–{formatRate(eng.rateMax)}
                  </span>
                  <span
                    className={
                      eng.availability === "Immediately"
                        ? "font-semibold text-teal-600"
                        : ""
                    }
                  >
                    {eng.availability}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      </div>
    </div>
  )
}
