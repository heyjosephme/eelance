import { ApplicationTracker } from "./application-tracker"

export default function ApplicationsPage() {
  return (
    <div className="max-w-3xl px-6 py-8">
      <div className="animate-fade-in-up">
        <h1 className="text-xl font-bold tracking-tight">
          My Applications
        </h1>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Track the status of your job applications
        </p>
      </div>

      <ApplicationTracker />
    </div>
  )
}
