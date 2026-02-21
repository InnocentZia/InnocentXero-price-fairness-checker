export type TabId = 'home' | 'checker' | 'compare' | 'vsworld' | 'quiz' | 'leaderboard' | 'brands' | 'providers' | 'community' | 'methodology' | 'dashboard' | 'pricing'

export type SubscriptionTier = 'free' | 'premium' | 'business'

export interface Subscription {
  tier: SubscriptionTier
  startDate: string
  expiresAt: string | null
}

export interface ApiStats {
  total_products: number
  total_countries: number
  total_price_entries: number
}
