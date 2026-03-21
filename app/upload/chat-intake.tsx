"use client"

import { useEffect, useRef, useState } from "react"
import type { ExtractedProfile, MatchedPosition } from "@/lib/data/mock-resume-result"
import { type ChatAnswers, buildProfileFromChat } from "@/lib/data/build-profile"

type ChatStep = {
  id: string
  question: string
  placeholder: string
  options?: string[]
}

const steps: ChatStep[] = [
  {
    id: "name",
    question: "What's your name?",
    placeholder: "e.g. Yuki Tanaka",
  },
  {
    id: "stack",
    question: "What technologies do you work with?",
    placeholder: "e.g. React, TypeScript, Node.js",
  },
  {
    id: "experience",
    question: "How many years of professional experience?",
    placeholder: "e.g. 5",
    options: ["1-2", "3-5", "5-8", "8+"],
  },
  {
    id: "role",
    question: "What kind of role are you looking for?",
    placeholder: "e.g. Frontend, Backend",
    options: ["Frontend", "Backend", "Full-Stack", "DevOps/SRE", "Data/ML"],
  },
  {
    id: "location",
    question: "Work style preference?",
    placeholder: "",
    options: ["Remote", "Tokyo", "Osaka", "Anywhere"],
  },
  {
    id: "rate",
    question: "Expected monthly rate range (万円)?",
    placeholder: "e.g. 60-80",
    options: ["40-60", "60-80", "80-100", "100+"],
  },
]

type Message = {
  from: "ai" | "user"
  text: string
}

export function ChatIntake({
  onComplete,
}: {
  onComplete: (profile: ExtractedProfile, matches: MatchedPosition[]) => void
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "ai",
      text: "Hi! I'll help you find the best freelance positions. A few quick questions.",
    },
  ])
  const [input, setInput] = useState("")
  const [thinking, setThinking] = useState(false)
  const [showQuestion, setShowQuestion] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: steps[0].question },
      ])
      setShowQuestion(true)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, thinking])

  async function handleAnswer(answer: string) {
    if (!answer.trim()) return

    const stepId = steps[currentStep].id
    const newAnswers = { ...answers, [stepId]: answer }
    setAnswers(newAnswers)

    setMessages((prev) => [...prev, { from: "user", text: answer }])
    setInput("")
    setShowQuestion(false)

    const nextStep = currentStep + 1

    if (nextStep < steps.length) {
      setThinking(true)
      await new Promise((r) => setTimeout(r, 500))
      setThinking(false)
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: steps[nextStep].question },
      ])
      setCurrentStep(nextStep)
      setShowQuestion(true)
    } else {
      setThinking(true)
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Perfect — finding the best positions for you..." },
      ])
      await new Promise((r) => setTimeout(r, 2000))
      setThinking(false)

      const chatAnswers: ChatAnswers = {
        name: newAnswers.name ?? "",
        stack: newAnswers.stack ?? "",
        experience: newAnswers.experience ?? "",
        role: newAnswers.role ?? "",
        location: newAnswers.location ?? "",
        rate: newAnswers.rate ?? "",
      }
      const { profile, matches } = buildProfileFromChat(chatAnswers)
      onComplete(profile, matches)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    handleAnswer(input)
  }

  const step = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="flex flex-col">
      {/* Progress bar */}
      <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full bg-teal-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Chat messages */}
      <div className="min-h-[300px] space-y-3 pb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex animate-fade-in-up ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {msg.from === "ai" && (
              <div className="mr-2 flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-500 text-[10px] font-bold text-white">
                ee
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.from === "user"
                  ? "bg-[oklch(0.14_0.02_260)] text-white"
                  : "bg-zinc-100 text-zinc-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex animate-fade-in items-center gap-2">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-500 text-[10px] font-bold text-white">
              ee
            </div>
            <div className="flex gap-1.5 rounded-2xl bg-zinc-100 px-4 py-3">
              <span className="size-1.5 rounded-full bg-zinc-400 animate-pulse-dot" />
              <span className="size-1.5 rounded-full bg-zinc-400 animate-pulse-dot" style={{ animationDelay: "0.2s" }} />
              <span className="size-1.5 rounded-full bg-zinc-400 animate-pulse-dot" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      {showQuestion && step && (
        <div className="animate-fade-in-up border-t pt-4">
          {step.options && (
            <div className="mb-3 flex flex-wrap gap-2">
              {step.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleAnswer(option)}
                  className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium shadow-sm transition-all hover:border-teal-500/40 hover:bg-teal-50 hover:text-teal-700 hover:shadow-md hover:shadow-teal-500/5"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={step.placeholder || "Type your answer..."}
              className="flex-1 rounded-xl border border-border bg-card px-4 py-2.5 text-sm shadow-sm outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              autoFocus
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-teal-500 hover:shadow-md disabled:opacity-30"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
