import { Purchases } from "@revenuecat/purchases-js"

const RC_API_KEY = process.env.NEXT_PUBLIC_REVENUECAT_API_KEY ?? ""
const ENTITLEMENT_ID = "pro" // must match your RevenueCat dashboard entitlement

let initialized = false

export function initRevenueCat(): Purchases | null {
  if (typeof window === "undefined") return null
  if (!RC_API_KEY) {
    console.warn("[RevenueCat] No API key set (NEXT_PUBLIC_REVENUECAT_API_KEY)")
    return null
  }

  if (initialized) {
    try {
      return Purchases.getSharedInstance()
    } catch {
      // Not configured yet, fall through
    }
  }

  // Use anonymous user ID — stored in localStorage for persistence
  const storageKey = "eelance_rc_user_id"
  let appUserId = localStorage.getItem(storageKey)
  if (!appUserId) {
    appUserId = Purchases.generateRevenueCatAnonymousAppUserId()
    localStorage.setItem(storageKey, appUserId)
  }

  const instance = Purchases.configure({
    apiKey: RC_API_KEY,
    appUserId,
  })
  initialized = true
  return instance
}

export function getRevenueCat(): Purchases | null {
  if (!RC_API_KEY) return null
  try {
    return Purchases.getSharedInstance()
  } catch {
    return initRevenueCat()
  }
}

export async function checkProEntitlement(): Promise<boolean> {
  const rc = getRevenueCat()
  if (!rc) return false
  try {
    const customerInfo = await rc.getCustomerInfo()
    return ENTITLEMENT_ID in customerInfo.entitlements.active
  } catch {
    return false
  }
}

export async function getOfferings() {
  const rc = getRevenueCat()
  if (!rc) return null
  try {
    return await rc.getOfferings()
  } catch (e) {
    console.error("[RevenueCat] Failed to fetch offerings:", e)
    return null
  }
}

export { ENTITLEMENT_ID }
