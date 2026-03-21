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
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Available Engineers</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {engineerListings.length} engineers looking for freelance/contract work
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {engineerListings.map((eng) => (
          <Link key={eng.id} href={`/engineers/${eng.id}`}>
            <Card className="h-full transition-colors hover:border-teal-500/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold text-zinc-600">
                    {eng.name.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-base">{eng.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {eng.title} &middot; {eng.yearsOfExperience}y exp
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {eng.skills.slice(0, 5).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {eng.skills.length > 5 && (
                    <Badge variant="secondary" className="text-xs">
                      +{eng.skills.length - 5}
                    </Badge>
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    {formatRate(eng.rateMin)}–{formatRate(eng.rateMax)}/月
                  </span>
                  <span
                    className={
                      eng.availability === "Immediately"
                        ? "font-medium text-teal-600"
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
  )
}
