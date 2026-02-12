const API_BASE = import.meta.env.VITE_API_URL || 'https://app-rcanrkba.fly.dev'

export interface ApiProduct {
  id: string
  name: string
  category: string
  category_label: string
  subcategory: string
  brand: string
  category_path: string
  description: string
  unit: string
  base_usd_price: number
  created_at: string
  updated_at: string
}

export interface ApiCategory {
  id: string
  label: string
  subcategories: string[]
  brands: string[]
}

export interface ApiCountry {
  code: string
  name: string
  flag: string
  currency: string
  currency_symbol: string
  exchange_rate: number
  ppp_factor: number
  median_income: number
  cost_of_living_index: number
  vat_rate: number
  import_duty_avg: number
  region: string
  income_group: string
}

export interface ApiFairnessResult {
  product: ApiProduct
  country: ApiCountry
  price: {
    local_price: number
    includes_tax: number
    tax_rate: number
    import_duty: number
    distribution_markup: number
    reports: number
    notes: string | null
    updated_at: string
  }
  scores: { raw: number; ppp: number; income: number; col: number }
  price_usd: number
  us_price: number
  global_median_usd: number
  ppp_adjusted_price: number
  income_percentage: number
  us_income_percentage: number
  percentile: number
  median_diff_percent: number
  factors: { label: string; impact: string; percentage: number; description: string }[]
  total_countries: number
}

export async function fetchProducts(category?: string, search?: string, subcategory?: string, brand?: string): Promise<{ products: ApiProduct[]; total: number }> {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (subcategory) params.set('subcategory', subcategory)
  if (brand) params.set('brand', brand)
  if (search) params.set('search', search)
  params.set('limit', '500')
  const res = await fetch(`${API_BASE}/api/products?${params}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function fetchCategories(): Promise<{ categories: ApiCategory[] }> {
  const res = await fetch(`${API_BASE}/api/categories`)
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

export async function fetchBrands(category?: string): Promise<{ brands: string[] }> {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  const res = await fetch(`${API_BASE}/api/brands?${params}`)
  if (!res.ok) throw new Error('Failed to fetch brands')
  return res.json()
}

export async function fetchSubcategories(category?: string): Promise<{ subcategories: string[] }> {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  const res = await fetch(`${API_BASE}/api/subcategories?${params}`)
  if (!res.ok) throw new Error('Failed to fetch subcategories')
  return res.json()
}

export async function fetchCountries(): Promise<{ countries: ApiCountry[] }> {
  const res = await fetch(`${API_BASE}/api/countries`)
  if (!res.ok) throw new Error('Failed to fetch countries')
  return res.json()
}

export async function fetchFairness(productId: string, countryCode: string): Promise<ApiFairnessResult> {
  const res = await fetch(`${API_BASE}/api/fairness/${productId}/${countryCode}`)
  if (!res.ok) throw new Error('Failed to fetch fairness data')
  return res.json()
}

export async function fetchStats(): Promise<{ total_products: number; total_countries: number; total_price_entries: number }> {
  const res = await fetch(`${API_BASE}/api/stats`)
  if (!res.ok) throw new Error('Failed to fetch stats')
  return res.json()
}

export async function createProduct(product: {
  id: string; name: string; category: string; category_label: string;
  description: string; unit: string; base_usd_price: number
}): Promise<{ id: string; message: string }> {
  const res = await fetch(`${API_BASE}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
  if (!res.ok) throw new Error('Failed to create product')
  return res.json()
}

export async function updateProduct(productId: string, update: {
  name?: string; category?: string; category_label?: string;
  description?: string; unit?: string; base_usd_price?: number
}): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/api/products/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update),
  })
  if (!res.ok) throw new Error('Failed to update product')
  return res.json()
}

export async function deleteProduct(productId: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/api/products/${productId}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete product')
  return res.json()
}

export async function updatePrice(productId: string, countryCode: string, localPrice: number, notes?: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/api/prices/${productId}/${countryCode}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ local_price: localPrice, notes }),
  })
  if (!res.ok) throw new Error('Failed to update price')
  return res.json()
}

export async function fetchCompare(productId: string): Promise<{
  product: ApiProduct
  comparisons: { country: ApiCountry; price_usd: number; local_price: number; scores: { raw: number; ppp: number; income: number; col: number }; percentile: number }[]
}> {
  const res = await fetch(`${API_BASE}/api/compare/${productId}`)
  if (!res.ok) throw new Error('Failed to fetch comparison')
  return res.json()
}

export interface PriceHistoryPoint {
  local_price: number
  price_usd: number
  date: string
}

export interface PriceHistoryResponse {
  history: PriceHistoryPoint[]
  trend: 'rising' | 'falling' | 'stable'
  change_pct: number
}

export interface AuthUser {
  id: number
  email: string
  display_name: string
}

export interface SavedProduct {
  id: number
  product_id: string
  country_code: string
  created_at: string
  product_name: string
  category: string
  brand: string
  country_name: string
  flag: string
}

export interface PriceAlert {
  id: number
  product_id: string
  country_code: string
  target_price: number
  alert_type: string
  triggered: number
  created_at: string
  product_name: string
  brand: string
  country_name: string
  flag: string
}

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('fairprice_token')
  if (!token) return {}
  return { Authorization: `Bearer ${token}` }
}

export async function fetchPriceHistory(productId: string, countryCode: string, months = 12): Promise<PriceHistoryResponse> {
  const res = await fetch(`${API_BASE}/api/price-history/${productId}/${countryCode}?months=${months}`)
  if (!res.ok) throw new Error('Failed to fetch price history')
  return res.json()
}

export async function registerUser(email: string, password: string, displayName?: string): Promise<{ token: string; user: AuthUser }> {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, display_name: displayName || '' }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Registration failed' }))
    throw new Error(err.detail || 'Registration failed')
  }
  return res.json()
}

export async function loginUser(email: string, password: string): Promise<{ token: string; user: AuthUser }> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Login failed' }))
    throw new Error(err.detail || 'Login failed')
  }
  return res.json()
}

export async function fetchMe(): Promise<AuthUser> {
  const res = await fetch(`${API_BASE}/api/auth/me`, { headers: getAuthHeaders() })
  if (!res.ok) throw new Error('Not authenticated')
  return res.json()
}

export async function fetchSavedProducts(): Promise<{ saved_products: SavedProduct[] }> {
  const res = await fetch(`${API_BASE}/api/saved-products`, { headers: getAuthHeaders() })
  if (!res.ok) throw new Error('Failed to fetch saved products')
  return res.json()
}

export async function saveProduct(productId: string, countryCode: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/api/saved-products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ product_id: productId, country_code: countryCode }),
  })
  if (!res.ok) throw new Error('Failed to save product')
  return res.json()
}

export async function unsaveProduct(productId: string, countryCode: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/api/saved-products/${productId}/${countryCode}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })
  if (!res.ok) throw new Error('Failed to unsave product')
  return res.json()
}

export async function fetchPriceAlerts(): Promise<{ alerts: PriceAlert[] }> {
  const res = await fetch(`${API_BASE}/api/price-alerts`, { headers: getAuthHeaders() })
  if (!res.ok) throw new Error('Failed to fetch alerts')
  return res.json()
}

export async function createPriceAlert(productId: string, countryCode: string, targetPrice: number, alertType = 'below'): Promise<{ id: number; message: string }> {
  const res = await fetch(`${API_BASE}/api/price-alerts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ product_id: productId, country_code: countryCode, target_price: targetPrice, alert_type: alertType }),
  })
  if (!res.ok) throw new Error('Failed to create alert')
  return res.json()
}

export async function deletePriceAlert(alertId: number): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/api/price-alerts/${alertId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })
  if (!res.ok) throw new Error('Failed to delete alert')
  return res.json()
}

export { API_BASE }
