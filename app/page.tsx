import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[oklch(0.14_0.02_260)] text-white">
        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Gradient orb */}
        <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-24">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1">
              <span className="size-1.5 rounded-full bg-teal-400 animate-pulse-dot" />
              <span className="text-xs font-medium text-teal-300">
                AI-Powered Matching
              </span>
            </div>

            <h1 className="animate-fade-in-up stagger-1 mt-6 text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight">
              Drop your resume.
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent">
                We handle the rest.
              </span>
            </h1>

            <p className="animate-fade-in-up stagger-2 mt-5 max-w-lg text-base leading-relaxed text-zinc-400">
              Our AI reads your resume, finds the best freelance IT positions
              for you, and applies on your behalf. One click to your next role.
            </p>

            <div className="animate-fade-in-up stagger-3 mt-8 flex items-center gap-4">
              <Link
                href="/upload"
                className="group inline-flex h-11 items-center gap-2 rounded-lg bg-teal-500 px-5 text-sm font-medium text-white shadow-lg shadow-teal-500/25 transition-all hover:bg-teal-400 hover:shadow-xl hover:shadow-teal-500/30"
              >
                Upload Resume
                <svg
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href="/positions"
                className="inline-flex h-11 items-center rounded-lg border border-zinc-700 px-5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
              >
                Browse Positions
              </Link>
            </div>
          </div>

          {/* Steps */}
          <div className="animate-fade-in-up stagger-4 mt-20 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.04]">
            {[
              {
                step: "01",
                title: "Upload",
                desc: "Drop your resume or chat with our AI",
              },
              {
                step: "02",
                title: "Match",
                desc: "AI scores and ranks the best positions",
              },
              {
                step: "03",
                title: "Apply",
                desc: "One click — we arrange the interviews",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className={`px-6 py-5 ${i > 0 ? "border-l border-white/[0.06]" : ""}`}
              >
                <span className="font-mono text-xs text-teal-400">
                  {item.step}
                </span>
                <p className="mt-1 text-sm font-semibold">{item.title}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-8">
            <div>
              <p className="text-2xl font-bold text-foreground">150+</p>
              <p className="text-xs text-muted-foreground">Open positions</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="text-2xl font-bold text-foreground">50+</p>
              <p className="text-xs text-muted-foreground">Companies</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="text-2xl font-bold text-foreground">89%</p>
              <p className="text-xs text-muted-foreground">Match accuracy</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Trusted by engineers across Japan
          </p>
        </div>
      </section>
    </div>
  )
}
