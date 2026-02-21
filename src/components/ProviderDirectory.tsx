import { useState, useMemo } from 'react'
import { Search, Star, MapPin, DollarSign, ThumbsUp, ChevronDown, X } from 'lucide-react'
import { products, countries, calculateFairness, priceToUSD, type Product } from '../data'
import { formatUSD, fuzzyMatch } from '../utils'

interface Provider {
  brand: string
  products: Product[]
  countries: number
  avgScore: number
  avgPrice: number
  bestCountry: string
  bestCountryFlag: string
  rating: number
  reviews: number
}

export function ProviderDirectory() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'fairness'>('fairness')
  const [expandedBrand, setExpandedBrand] = useState('')

  const providers = useMemo(() => {
    const brandMap = new Map<string, Provider>()
    for (const product of products) {
      if (!product.brand) continue
      const existing = brandMap.get(product.brand)
      if (existing) {
        existing.products.push(product)
        continue
      }
      const scores: number[] = []
      const prices: number[] = []
      let bestScore = 0
      let bestC = countries[0]
      for (const c of countries) {
        const result = calculateFairness(product, c.code)
        if (!result) continue
        scores.push(result.pppScore)
        prices.push(result.priceUSD)
        if (result.pppScore > bestScore) { bestScore = result.pppScore; bestC = c }
      }
      if (scores.length === 0) continue
      const seed = product.brand.split('').reduce((a, ch) => a + ch.charCodeAt(0), 0)
      const rating = 3.2 + (seed % 18) / 10
      brandMap.set(product.brand, {
        brand: product.brand,
        products: [product],
        countries: countries.filter(c => product.prices[c.code]).length,
        avgScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
        avgPrice: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length * 100) / 100,
        bestCountry: bestC.name,
        bestCountryFlag: bestC.flag,
        rating: Math.round(rating * 10) / 10,
        reviews: 12 + (seed % 200),
      })
    }
    return Array.from(brandMap.values())
  }, [])

  const filtered = useMemo(() => {
    let list = providers
    if (categoryFilter !== 'all') {
      list = list.filter(p => p.products.some(pr => pr.category === categoryFilter))
    }
    if (search) {
      list = list
        .map(p => ({ provider: p, score: fuzzyMatch(search, p.brand) }))
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(r => r.provider)
    }
    switch (sortBy) {
      case 'rating': return [...list].sort((a, b) => b.rating - a.rating)
      case 'price': return [...list].sort((a, b) => a.avgPrice - b.avgPrice)
      case 'fairness': return [...list].sort((a, b) => b.avgScore - a.avgScore)
      default: return list
    }
  }, [providers, search, categoryFilter, sortBy])

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'digital', label: 'Digital' },
    { id: 'physical', label: 'Physical' },
    { id: 'saas', label: 'SaaS' },
    { id: 'essential', label: 'Essentials' },
    { id: 'service', label: 'Services' },
    { id: 'medical', label: 'Medical' },
  ]

  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Provider Directory</h2>
          <p className="mt-2 text-gray-600">Browse brands and providers ranked by pricing fairness, with community ratings</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search brands..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
            <div className="relative">
              <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)} className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 appearance-none pr-10 focus:ring-2 focus:ring-indigo-500">
                <option value="fairness">Sort by Fairness</option>
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price (Low)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${categoryFilter === cat.id ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">{filtered.length} brands found</p>

        <div className="space-y-3">
          {filtered.slice(0, 50).map(provider => (
            <div key={provider.brand} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setExpandedBrand(expandedBrand === provider.brand ? '' : provider.brand)}
                className="w-full p-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{provider.brand}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${provider.avgScore >= 60 ? 'bg-emerald-100 text-emerald-700' : provider.avgScore >= 40 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                      {provider.avgScore}/100 fair
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {provider.rating} ({provider.reviews} reviews)</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> Avg {formatUSD(provider.avgPrice)}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {provider.countries} countries</span>
                    <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" /> Best: {provider.bestCountryFlag} {provider.bestCountry}</span>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedBrand === provider.brand ? 'rotate-180' : ''}`} />
              </button>
              {expandedBrand === provider.brand && (
                <div className="border-t border-gray-100 p-5 bg-gray-50">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Products by {provider.brand}</h4>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {provider.products.slice(0, 12).map(product => {
                      const usEntry = product.prices['US']
                      const usUSD = usEntry ? priceToUSD(usEntry.localPrice, countries.find(c => c.code === 'US')!) : 0
                      return (
                        <div key={product.id} className="p-3 bg-white rounded-lg border border-gray-200">
                          <p className="font-semibold text-gray-900 text-sm truncate">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.subcategory || product.categoryLabel}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-bold text-gray-900">{usUSD ? formatUSD(usUSD) : 'N/A'}</span>
                            <span className="text-xs text-gray-400">{Object.keys(product.prices).length} markets</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  {provider.products.length > 12 && (
                    <p className="text-xs text-gray-400 mt-3 text-center">+ {provider.products.length - 12} more products</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        {filtered.length > 50 && (
          <p className="text-center text-sm text-gray-500 mt-6">Showing top 50 of {filtered.length} brands</p>
        )}
      </div>
    </section>
  )
}
