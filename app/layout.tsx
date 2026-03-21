import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Link from "next/link"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "eelance — Freelance IT Job Matching",
  description: "AI-powered freelance IT job matching platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[oklch(0.14_0.02_260)] backdrop-blur-xl">
          <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-teal-500 text-xs font-bold text-white">
                ee
              </div>
              <span className="text-[15px] font-semibold tracking-tight text-white">
                eelance
              </span>
            </Link>
            <div className="flex items-center gap-1">
              <Link
                href="/engineers"
                className="rounded-md px-3 py-1.5 text-[13px] text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                Engineers
              </Link>
              <Link
                href="/company"
                className="rounded-md px-3 py-1.5 text-[13px] text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                Companies
              </Link>
              <Link
                href="/positions"
                className="rounded-md px-3 py-1.5 text-[13px] text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                Positions
              </Link>
              <Link
                href="/applications"
                className="rounded-md px-3 py-1.5 text-[13px] text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                My Applications
              </Link>
              <Link
                href="/upload"
                className="ml-2 inline-flex h-8 items-center rounded-md bg-teal-500 px-3.5 text-[13px] font-medium text-white shadow-sm shadow-teal-500/25 transition-all hover:bg-teal-400 hover:shadow-md hover:shadow-teal-500/30"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  )
}
