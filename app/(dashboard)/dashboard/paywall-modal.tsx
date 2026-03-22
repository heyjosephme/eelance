"use client"

import { useEffect, useState } from "react"
import { getRevenueCat } from "@/lib/revenuecat"
import { setSubscription } from "@/lib/profile-store"

export function PaywallModal({
  onClose,
  onSubscribed,
}: {
  onClose: () => void
  onSubscribed: () => void
}) {
  const [mode, setMode] = useState<"loading" | "fallback">("loading")
  const [processing, setProcessing] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Always use our custom paywall UI — rc.purchase() handles real billing
    setMode("fallback")
  }, [])

  async function handleFallbackSubscribe() {
    setProcessing(true)

    // Try real purchase if RC is available
    const rc = getRevenueCat()
    if (rc) {
      try {
        const offerings = await rc.getOfferings()
        const pkg =
          offerings?.current?.monthly ??
          offerings?.current?.availablePackages?.[0]
        if (pkg) {
          await rc.purchase({ rcPackage: pkg })
          // Purchase succeeded
          setSubscription("pro")
          setDone(true)
          setTimeout(onSubscribed, 800)
          return
        }
      } catch (e: unknown) {
        const err = e as { errorCode?: number }
        if (err.errorCode === 1) {
          setProcessing(false)
          return // user cancelled
        }
        console.error("[RevenueCat] Purchase error:", e)
      }
    }

    // Demo fallback — simulate purchase
    await new Promise((r) => setTimeout(r, 1500))
    setSubscription("pro")
    setDone(true)
    setTimeout(onSubscribed, 800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="animate-fade-in absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={() => {}}
        role="presentation"
      />

      {/* Loading */}
      {mode === "loading" && (
        <div className="relative z-10 flex h-64 w-full max-w-md items-center justify-center rounded-2xl bg-white shadow-2xl">
          <div className="size-6 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
        </div>
      )}

      {/* Fallback UI (no RC API key) */}
      {mode === "fallback" && (
        <div className="animate-fade-in-up relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[oklch(0.14_0.02_260)] to-[oklch(0.22_0.03_260)] px-6 pb-8 pt-6">
            <div className="absolute -right-8 -top-8 size-32 rounded-full bg-teal-500/20 blur-2xl" />
            <div className="absolute -left-4 bottom-0 size-24 rounded-full bg-emerald-500/10 blur-xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/70">
                <svg className="size-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                Powered by RevenueCat
              </div>
              <h2 className="mt-4 text-xl font-bold text-white">
                Unlock AI Deep Match
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Get unlimited AI-powered position suggestions tailored to your
                unique profile
              </p>
            </div>
          </div>

          {/* Plans */}
          <div className="space-y-3 p-6">
            <button
              type="button"
              onClick={handleFallbackSubscribe}
              disabled={processing || done}
              className="group relative w-full overflow-hidden rounded-xl border-2 border-teal-500 p-4 text-left transition-all hover:shadow-lg hover:shadow-teal-500/10 disabled:opacity-70"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-emerald-50 opacity-50" />
              <div className="relative flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">Pro</span>
                    <span className="rounded-full bg-teal-500 px-2 py-0.5 text-[10px] font-bold text-white">
                      RECOMMENDED
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {[
                      "Unlimited AI suggestions",
                      "Priority matching with top companies",
                      "Weekly curated recommendations",
                      "Interview prep insights",
                    ].map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <svg
                          className="size-3.5 shrink-0 text-teal-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    $9
                    <span className="text-sm font-normal text-muted-foreground">
                      .99/mo
                    </span>
                  </p>
                </div>
              </div>

              {processing && !done && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <div className="size-5 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
                    <span className="text-sm font-medium text-teal-700">
                      Processing with RevenueCat...
                    </span>
                  </div>
                </div>
              )}

              {done && (
                <div className="absolute inset-0 flex items-center justify-center bg-teal-50/90 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <svg
                      className="size-5 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm font-bold text-teal-700">
                      Subscribed! Unlocking...
                    </span>
                  </div>
                </div>
              )}
            </button>

            <div className="rounded-xl border border-border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-sm font-bold">Free</span>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Top 5 matches &middot; Basic scoring &middot; Apply to
                    positions
                  </p>
                </div>
                <p className="text-lg font-bold text-muted-foreground">$0</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-center text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Maybe later
            </button>

            <div className="flex items-center justify-center gap-1 border-t pt-3 text-[10px] text-muted-foreground">
              <svg className="size-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" />
              </svg>
              Subscription managed by RevenueCat &middot; Cancel anytime
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
