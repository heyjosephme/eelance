import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-900 text-white">
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-teal-400">
          AI-Powered Matching
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Drop your resume.
          <br />
          We handle the rest.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-zinc-400">
          Our AI reads your resume, finds the best freelance IT positions for
          you, and applies on your behalf. One click.
        </p>
        <Link
          href="/upload"
          className="mt-8 inline-flex h-11 items-center rounded-lg bg-teal-500 px-6 text-base font-medium text-white transition-colors hover:bg-teal-400"
        >
          Upload Resume
        </Link>
        <div className="mt-16 grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-teal-400">1</p>
            <p className="mt-1 text-sm text-zinc-400">Upload resume</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-teal-400">2</p>
            <p className="mt-1 text-sm text-zinc-400">Review AI matches</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-teal-400">3</p>
            <p className="mt-1 text-sm text-zinc-400">We arrange interviews</p>
          </div>
        </div>
      </div>
    </div>
  )
}
