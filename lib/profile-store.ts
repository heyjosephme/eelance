import type { ExtractedProfile } from "./data/mock-resume-result"

export type SubscriptionTier = "free" | "pro"

export type SavedProfile = {
  profile: ExtractedProfile
  savedAt: string
  subscription: SubscriptionTier
}

const PROFILE_KEY = "eelance_profile"
const SUBSCRIPTION_KEY = "eelance_subscription"

export function getSavedProfile(): SavedProfile | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem(PROFILE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function saveProfile(profile: ExtractedProfile) {
  const saved: SavedProfile = {
    profile,
    savedAt: new Date().toISOString(),
    subscription: getSubscription(),
  }
  localStorage.setItem(PROFILE_KEY, JSON.stringify(saved))
}

export function getSubscription(): SubscriptionTier {
  if (typeof window === "undefined") return "free"
  return (localStorage.getItem(SUBSCRIPTION_KEY) as SubscriptionTier) || "free"
}

export function setSubscription(tier: SubscriptionTier) {
  localStorage.setItem(SUBSCRIPTION_KEY, tier)
  // Also update saved profile if exists
  const saved = getSavedProfile()
  if (saved) {
    saved.subscription = tier
    localStorage.setItem(PROFILE_KEY, JSON.stringify(saved))
  }
}

export function hasProfile(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem(PROFILE_KEY) !== null
}
