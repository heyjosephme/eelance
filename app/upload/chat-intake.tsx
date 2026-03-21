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
    question: "How many years of professional experience do you have?",
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
    question: "What's your expected monthly rate range (万円)?",
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
      text: "Hi! I'll help you find the best freelance positions. Let me ask a few quick questions.",
    },
  ])
  const [input, setInput] = useState("")
  const [thinking, setThinking] = useState(false)
  const [showQuestion, setShowQuestion] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Show first question after greeting
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

    // Store the answer keyed by step id
    const stepId = steps[currentStep].id
    const newAnswers = { ...answers, [stepId]: answer }
    setAnswers(newAnswers)

    // Add user message
    setMessages((prev) => [...prev, { from: "user", text: answer }])
    setInput("")
    setShowQuestion(false)

    const nextStep = currentStep + 1

    if (nextStep < steps.length) {
      setThinking(true)
      await new Promise((r) => setTimeout(r, 600))
      setThinking(false)
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: steps[nextStep].question },
      ])
      setCurrentStep(nextStep)
      setShowQuestion(true)
    } else {
      // All questions answered — build profile from answers
      setThinking(true)
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Great! Let me find the best positions for you..." },
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

  return (
    <div className="flex flex-col">
      {/* Chat messages */}
      <div className="space-y-3 pb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                msg.from === "user"
                  ? "bg-teal-600 text-white"
                  : "bg-zinc-100 text-zinc-900"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {thinking && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-2xl bg-zinc-100 px-4 py-3">
              <span className="size-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:0ms]" />
              <span className="size-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:150ms]" />
              <span className="size-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:300ms]" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick option buttons + text input */}
      {showQuestion && step && (
        <div className="border-t pt-4">
          {step.options && (
            <div className="mb-3 flex flex-wrap gap-2">
              {step.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleAnswer(option)}
                  className="rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700"
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
              className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              autoFocus
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-500 disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
