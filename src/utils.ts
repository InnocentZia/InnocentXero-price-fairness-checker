import type { FairnessResult } from './data'

export function getScoreForLens(result: FairnessResult, lensId: string): number {
  switch (lensId) {
    case 'raw': return result.rawScore
    case 'ppp': return result.pppScore
    case 'income': return result.incomeScore
    case 'col': return result.colScore
    default: return result.pppScore
  }
}

export function formatUSD(n: number): string {
  return `$${n < 1 ? n.toFixed(2) : n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
}

export function fuzzyMatch(query: string, target: string): number {
  const q = query.toLowerCase().trim()
  const t = target.toLowerCase()
  if (!q) return 1
  if (t === q) return 100
  if (t.startsWith(q)) return 90
  if (t.includes(q)) return 80
  const words = q.split(/\s+/)
  const allWordsMatch = words.every(w => t.includes(w))
  if (allWordsMatch) return 70
  let qi = 0
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++
  }
  if (qi === q.length) return 50 + Math.round((q.length / t.length) * 20)
  const matchRatio = qi / q.length
  if (matchRatio >= 0.7) return Math.round(matchRatio * 40)
  return 0
}

const RECENT_SEARCHES_KEY = 'fairprice_recent_searches'
const MAX_RECENT = 8

interface RecentSearch {
  productId: string
  countryCode: string
  timestamp: number
}

export function getRecentSearches(): RecentSearch[] {
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY)
    if (!raw) return []
    return JSON.parse(raw) as RecentSearch[]
  } catch {
    return []
  }
}

export function saveRecentSearch(productId: string, countryCode: string): void {
  try {
    const searches = getRecentSearches().filter(
      s => !(s.productId === productId && s.countryCode === countryCode)
    )
    searches.unshift({ productId, countryCode, timestamp: Date.now() })
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches.slice(0, MAX_RECENT)))
  } catch {}
}

const SEARCH_COUNT_KEY = 'fairprice_search_count'
const SEARCH_DATE_KEY = 'fairprice_search_date'
const SUBSCRIPTION_KEY = 'fairprice_subscription'
const FREE_DAILY_LIMIT = 5

export function getSubscriptionTier(): 'free' | 'premium' | 'business' {
  try {
    const raw = localStorage.getItem(SUBSCRIPTION_KEY)
    if (!raw) return 'free'
    const sub = JSON.parse(raw)
    if (sub.expiresAt && new Date(sub.expiresAt) < new Date()) return 'free'
    return sub.tier || 'free'
  } catch {
    return 'free'
  }
}

export function setSubscriptionTier(tier: 'free' | 'premium' | 'business'): void {
  if (tier === 'free') {
    localStorage.removeItem(SUBSCRIPTION_KEY)
    return
  }
  const now = new Date()
  const expires = new Date(now)
  expires.setMonth(expires.getMonth() + 1)
  localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify({
    tier,
    startDate: now.toISOString(),
    expiresAt: expires.toISOString(),
  }))
}

export function getDailySearchCount(): number {
  const today = new Date().toISOString().slice(0, 10)
  const savedDate = localStorage.getItem(SEARCH_DATE_KEY)
  if (savedDate !== today) return 0
  return parseInt(localStorage.getItem(SEARCH_COUNT_KEY) || '0', 10)
}

export function incrementSearchCount(): void {
  const today = new Date().toISOString().slice(0, 10)
  const savedDate = localStorage.getItem(SEARCH_DATE_KEY)
  if (savedDate !== today) {
    localStorage.setItem(SEARCH_DATE_KEY, today)
    localStorage.setItem(SEARCH_COUNT_KEY, '1')
  } else {
    const count = parseInt(localStorage.getItem(SEARCH_COUNT_KEY) || '0', 10)
    localStorage.setItem(SEARCH_COUNT_KEY, String(count + 1))
  }
}

export function canSearch(): boolean {
  const tier = getSubscriptionTier()
  if (tier !== 'free') return true
  return getDailySearchCount() < FREE_DAILY_LIMIT
}

export function isPremium(): boolean {
  const tier = getSubscriptionTier()
  return tier === 'premium' || tier === 'business'
}

export function isBusiness(): boolean {
  return getSubscriptionTier() === 'business'
}

export function removeIQROutliers(values: number[]): number[] {
  if (values.length < 4) return values
  const sorted = [...values].sort((a, b) => a - b)
  const q1 = sorted[Math.floor(sorted.length * 0.25)]
  const q3 = sorted[Math.floor(sorted.length * 0.75)]
  const iqr = q3 - q1
  const lower = q1 - 1.5 * iqr
  const upper = q3 + 1.5 * iqr
  return sorted.filter(v => v >= lower && v <= upper)
}
