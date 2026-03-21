import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[oklch(0.14_0.02_260)] text-white">
        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-emerald-500/8 blur-[100px]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20">
          {/* Badge */}
          <div className="animate-fade-in-up flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-1.5">
              <span className="size-1.5 rounded-full bg-teal-400 animate-pulse-dot" />
              <span className="text-xs font-medium text-teal-300">
                AI-Powered Freelance Matching
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up stagger-1 mx-auto mt-8 max-w-3xl text-center text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-tight">
            Connect talent with{" "}
            <span className="bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent">
              opportunity
            </span>
            . Instantly.
          </h1>

          <p className="animate-fade-in-up stagger-2 mx-auto mt-5 max-w-xl text-center text-base leading-relaxed text-zinc-400">
            AI scores and matches freelance IT engineers with open positions.
            Engineers find roles in seconds. Companies find vetted talent fast.
          </p>

          {/* Dual CTA cards */}
          <div className="animate-fade-in-up stagger-3 mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-2">
            {/* Engineer path */}
            <Link
              href="/upload"
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8 transition-all hover:border-teal-500/30 hover:bg-white/[0.07]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/[0.06] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="flex size-12 items-center justify-center rounded-xl bg-teal-500/15">
                  <svg className="size-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-semibold">I&apos;m an Engineer</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Upload your resume or chat with AI. Get matched with the best freelance positions in seconds.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal-400 transition-colors group-hover:text-teal-300">
                  Find positions
                  <svg className="size-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Company path */}
            <Link
              href="/company"
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8 transition-all hover:border-teal-500/30 hover:bg-white/[0.07]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.06] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/15">
                  <svg className="size-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-semibold">I&apos;m Hiring</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Post positions and review AI-scored applicants. Find the right freelance talent with confidence.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition-colors group-hover:text-emerald-300">
                  Company dashboard
                  <svg className="size-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* Steps */}
          <div className="animate-fade-in-up stagger-4 mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.04]">
            {[
              {
                step: "01",
                title: "Upload / Post",
                desc: "Engineers upload resumes. Companies post positions.",
              },
              {
                step: "02",
                title: "AI Match",
                desc: "Our engine scores every combination instantly.",
              },
              {
                step: "03",
                title: "Connect",
                desc: "Apply, review, and schedule interviews in one click.",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className={`px-6 py-6 ${i > 0 ? "border-l border-white/[0.06]" : ""}`}
              >
                <span className="font-mono text-xs font-semibold text-teal-400">
                  {item.step}
                </span>
                <p className="mt-1.5 font-semibold">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
          <div className="flex items-center gap-10">
            <div>
              <p className="text-3xl font-bold text-foreground">80+</p>
              <p className="mt-0.5 text-sm text-muted-foreground">Open positions</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="text-3xl font-bold text-foreground">50+</p>
              <p className="mt-0.5 text-sm text-muted-foreground">Companies</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="text-3xl font-bold text-teal-600">89%</p>
              <p className="mt-0.5 text-sm text-muted-foreground">Match accuracy</p>
            </div>
          </div>
          <p className="hidden text-sm text-muted-foreground sm:block">
            Trusted by engineers &amp; companies across Japan
          </p>
        </div>
      </section>
    </div>
  )
}
