import Link from "next/link"
import { notFound } from "next/navigation"
import { getPosition } from "@/lib/data/positions"
import { getApplicationsByPosition } from "@/lib/data/applications"
import { ApplicantList } from "./applicant-list"

export default async function CompanyPositionPage(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params
  const position = getPosition(id)
  if (!position) notFound()

  const apps = getApplicationsByPosition(id)

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      <Link
        href="/company"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; Dashboard
      </Link>

      <div className="mt-4">
        <h1 className="text-xl font-semibold">{position.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {position.location} &middot; {position.contractType} &middot;{" "}
          {apps.length} applicant{apps.length !== 1 && "s"}
        </p>
      </div>

      <div className="mt-6">
        {apps.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">
            No applicants yet.
          </p>
        ) : (
          <ApplicantList applications={apps} position={position} />
        )}
      </div>
    </div>
  )
}
