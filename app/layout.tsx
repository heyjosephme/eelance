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
        <header className="border-b border-zinc-800 bg-zinc-900 text-white">
          <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
            <Link href="/" className="text-lg font-bold tracking-tight">
              eelance
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/company"
                className="text-sm text-zinc-400 transition-colors hover:text-white"
              >
                For Companies
              </Link>
              <Link
                href="/upload"
                className="inline-flex h-8 items-center rounded-md bg-teal-500 px-3 text-sm font-medium text-white transition-colors hover:bg-teal-400"
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
