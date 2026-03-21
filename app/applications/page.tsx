import { ApplicationTracker } from "./application-tracker"

export default function ApplicationsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="animate-fade-in-up">
        <span className="text-xs font-medium uppercase tracking-widest text-teal-600">
          Track
        </span>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          My Applications
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track the status of your job applications
        </p>
      </div>

      <ApplicationTracker />
    </div>
  )
}
