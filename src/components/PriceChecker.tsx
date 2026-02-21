import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import {
  Search, DollarSign, Shield, ChevronDown, AlertTriangle, Info, Share2,
  Zap, Eye, HelpCircle, X, TrendingUp,
  Clock,  ShieldCheck, ShoppingCart, Leaf, AlertOctagon, Scale,
  Heart, History, BarChart3, Database, ArrowDown, ArrowUp, Minus, Target,
  Sun, Snowflake, CalendarDays, MapPin, Activity,
} from 'lucide-react'
import { ScoreGauge } from './ScoreGauge'
import { FairnessBar } from './FairnessBar'
import { getScoreForLens, formatUSD, fuzzyMatch, getRecentSearches, saveRecentSearch, canSearch, incrementSearchCount, isPremium, getDailySearchCount } from '../utils'
import {
  countries, products, productCategories, fairnessLenses,
  calculateFairness, applyScenario, getNearbyCountries, predictPrice,
  getVolatility, getConfidenceInterval,
  type FairnessResult, type Product, type Country,
} from '../data'
import { saveProduct, type AuthUser } from '../api'
import type { TabId } from '../types'

const DROPDOWN_PAGE_SIZE = 50

interface PriceCheckerProps {
  user?: AuthUser | null
  setActiveTab?: (tab: TabId) => void
}

export function PriceChecker({ user, setActiveTab }: PriceCheckerProps) {
  const [selectedProduct, setSelectedProduct] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [subcategoryFilter, setSubcategoryFilter] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [activeLens, setActiveLens] = useState('ppp')
  const [fairnessResult, setFairnessResult] = useState<FairnessResult | null>(null)
  const [showMethodology, setShowMethodology] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [activeScenario, setActiveScenario] = useState<string>('')
  const [saved, setSaved] = useState(false)
  const [userPrice, setUserPrice] = useState('')
  const [productSearch, setProductSearch] = useState('')
  const [countrySearch, setCountrySearch] = useState('')
  const [productDropdownOpen, setProductDropdownOpen] = useState(false)
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)
  const productDropdownRef = useRef<HTMLDivElement>(null)
  const countryDropdownRef = useRef<HTMLDivElement>(null)

  const [productPage, setProductPage] = useState(1)
  const [recentSearches] = useState(() => getRecentSearches())
  const [searchLimitHit, setSearchLimitHit] = useState(false)

  const categoryProducts = categoryFilter === 'all' ? products : products.filter(p => p.category === categoryFilter)
  const subcatProducts = subcategoryFilter ? categoryProducts.filter(p => p.subcategory === subcategoryFilter) : categoryProducts
  const brandProducts = brandFilter ? subcatProducts.filter(p => p.brand === brandFilter) : subcatProducts

  const fuzzyFilteredProducts = useMemo(() => {
    if (!productSearch) return brandProducts
    return brandProducts
      .map(p => {
        const nameScore = fuzzyMatch(productSearch, p.name)
        const brandScore = fuzzyMatch(productSearch, p.brand)
        const subcatScore = fuzzyMatch(productSearch, p.subcategory)
        const catScore = fuzzyMatch(productSearch, p.categoryLabel)
        const best = Math.max(nameScore, brandScore, subcatScore, catScore)
        return { product: p, score: best }
      })
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(r => r.product)
  }, [productSearch, brandProducts])

  const paginatedProducts = useMemo(() => {
    return fuzzyFilteredProducts.slice(0, productPage * DROPDOWN_PAGE_SIZE)
  }, [fuzzyFilteredProducts, productPage])

  const hasMoreProducts = paginatedProducts.length < fuzzyFilteredProducts.length

  const availableSubcategories = [...new Set(categoryProducts.map(p => p.subcategory).filter(Boolean))].sort()
  const availableBrands = [...new Set((subcategoryFilter ? subcatProducts : categoryProducts).map(p => p.brand).filter(Boolean))].sort()
  const filteredCountries = useMemo(() => {
    if (!countrySearch) return countries
    return countries
      .map(c => ({ country: c, score: fuzzyMatch(countrySearch, c.name) }))
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(r => r.country)
  }, [countrySearch])
  const selectedProductData = products.find(p => p.id === selectedProduct) as Product | undefined
  const selectedCountryData = countries.find(c => c.code === selectedCountry) as Country | undefined

  const recentProductSuggestions = useMemo(() => {
    if (productSearch || selectedProduct) return []
    return recentSearches
      .map(s => products.find(p => p.id === s.productId))
      .filter((p): p is Product => !!p)
      .slice(0, 5)
  }, [productSearch, selectedProduct, recentSearches])

  const handleCheck = useCallback(() => {
    if (!selectedProduct || !selectedCountry) return
    if (!canSearch()) {
      setSearchLimitHit(true)
      return
    }
    setSearchLimitHit(false)
    const product = products.find(p => p.id === selectedProduct)
    if (!product) return
    incrementSearchCount()
    const result = calculateFairness(product, selectedCountry)
    setFairnessResult(result)
    setSaved(false)
    saveRecentSearch(selectedProduct, selectedCountry)
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }, [selectedProduct, selectedCountry])

  const handleDropdownScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40 && hasMoreProducts) {
      setProductPage(prev => prev + 1)
    }
  }, [hasMoreProducts])

  const handleSave = async () => {
    if (!user || !selectedProduct || !selectedCountry) return
    try {
      await saveProduct(selectedProduct, selectedCountry)
      setSaved(true)
    } catch {
    }
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (productDropdownRef.current && !productDropdownRef.current.contains(e.target as Node)) setProductDropdownOpen(false)
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target as Node)) setCountryDropdownOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Check your price</h2>
          <p className="mt-2 text-gray-600">Select a product and country to see a multi-lens fairness analysis</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
            <div className="flex flex-wrap gap-2">
              {productCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setCategoryFilter(cat.id); setSubcategoryFilter(''); setBrandFilter(''); setSelectedProduct('') }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${categoryFilter === cat.id ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {categoryFilter !== 'all' && (availableSubcategories.length > 0 || availableBrands.length > 0) && (
            <div className="mb-6 flex flex-wrap gap-4">
              {availableSubcategories.length > 0 && (
                <div className="flex-1 min-w-48">
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Subcategory</label>
                  <select
                    value={subcategoryFilter}
                    onChange={e => { setSubcategoryFilter(e.target.value); setBrandFilter(''); setSelectedProduct('') }}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">All subcategories</option>
                    {availableSubcategories.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              )}
              {availableBrands.length > 0 && (
                <div className="flex-1 min-w-48">
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Brand</label>
                  <select
                    value={brandFilter}
                    onChange={e => { setBrandFilter(e.target.value); setSelectedProduct('') }}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">All brands</option>
                    {availableBrands.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              )}
            </div>
          )}

          {selectedProductData && selectedProductData.categoryPath && (
            <div className="mb-4 flex items-center gap-1.5 text-sm text-gray-500">
              {selectedProductData.categoryPath.split(' > ').map((part, i, arr) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className={i === arr.length - 1 ? 'font-medium text-indigo-600' : 'hover:text-gray-700'}>{part}</span>
                  {i < arr.length - 1 && <ChevronDown className="w-3 h-3 -rotate-90" />}
                </span>
              ))}
              {selectedProductData.brand && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-100 text-xs font-medium text-gray-600">{selectedProductData.brand}</span>
              )}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product / Service</label>
              <div className="relative" ref={productDropdownRef}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={selectedProductData ? selectedProductData.name : 'Search products...'}
                    value={productSearch}
                    onChange={e => { setProductSearch(e.target.value); setProductDropdownOpen(true) }}
                    onFocus={() => setProductDropdownOpen(true)}
                    className={`w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${selectedProductData && !productSearch ? 'text-gray-900' : ''}`}
                  />
                  {selectedProduct && !productSearch && (
                    <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-900 pointer-events-none">{selectedProductData?.name}</span>
                  )}
                  <button onClick={() => { if (selectedProduct) { setSelectedProduct(''); setProductSearch('') } else { setProductDropdownOpen(!productDropdownOpen) } }} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100">
                    {selectedProduct ? <X className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
                {productDropdownOpen && (
                  <div className="absolute z-50 mt-1 w-full bg-white rounded-xl border border-gray-200 shadow-lg max-h-64 overflow-y-auto" onScroll={handleDropdownScroll}>
                    {recentProductSuggestions.length > 0 && !productSearch && (
                      <>
                        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1.5 bg-gray-50"><History className="w-3 h-3" /> Recent</div>
                        {recentProductSuggestions.map(p => (
                          <button key={`recent-${p.id}`} onClick={() => { setSelectedProduct(p.id); setProductSearch(''); setProductDropdownOpen(false); setProductPage(1) }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 flex justify-between items-center text-gray-700">
                            <span className="flex items-center gap-2">
                              <span>{p.name}</span>
                              {p.brand && <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{p.brand}</span>}
                            </span>
                            <span className="text-xs text-gray-400 ml-2 shrink-0">{p.subcategory || p.categoryLabel}</span>
                          </button>
                        ))}
                        <div className="border-t border-gray-100" />
                      </>
                    )}
                    {productSearch && <div className="px-4 py-1.5 text-xs text-gray-400 bg-gray-50">{fuzzyFilteredProducts.length} result{fuzzyFilteredProducts.length !== 1 ? 's' : ''}</div>}
                    {paginatedProducts.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-500">No products found — try a different spelling</div>
                    ) : paginatedProducts.map(p => (
                      <button key={p.id} onClick={() => { setSelectedProduct(p.id); setProductSearch(''); setProductDropdownOpen(false); setProductPage(1) }} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 flex justify-between items-center ${selectedProduct === p.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'}`}>
                        <span className="flex items-center gap-2">
                          <span>{p.name}</span>
                          {p.brand && <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{p.brand}</span>}
                        </span>
                        <span className="text-xs text-gray-400 ml-2 shrink-0">{p.subcategory || p.categoryLabel}</span>
                      </button>
                    ))}
                    {hasMoreProducts && (
                      <button onClick={() => setProductPage(prev => prev + 1)} className="w-full py-2.5 text-sm text-indigo-600 font-medium hover:bg-indigo-50 text-center">
                        Show more ({fuzzyFilteredProducts.length - paginatedProducts.length} remaining)
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
              <div className="relative" ref={countryDropdownRef}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={selectedCountryData ? `${selectedCountryData.flag} ${selectedCountryData.name}` : 'Search countries...'}
                    value={countrySearch}
                    onChange={e => { setCountrySearch(e.target.value); setCountryDropdownOpen(true) }}
                    onFocus={() => setCountryDropdownOpen(true)}
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {selectedCountry && !countrySearch && (
                    <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-900 pointer-events-none">{selectedCountryData?.flag} {selectedCountryData?.name}</span>
                  )}
                  <button onClick={() => { if (selectedCountry) { setSelectedCountry(''); setCountrySearch('') } else { setCountryDropdownOpen(!countryDropdownOpen) } }} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100">
                    {selectedCountry ? <X className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
                {countryDropdownOpen && (
                  <div className="absolute z-50 mt-1 w-full bg-white rounded-xl border border-gray-200 shadow-lg max-h-64 overflow-y-auto">
                    {filteredCountries.filter(c => !selectedProduct || products.find(p => p.id === selectedProduct)?.prices[c.code]).length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-500">No countries found</div>
                    ) : filteredCountries.filter(c => !selectedProduct || products.find(p => p.id === selectedProduct)?.prices[c.code]).map(c => (
                      <button key={c.code} onClick={() => { setSelectedCountry(c.code); setCountrySearch(''); setCountryDropdownOpen(false) }} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 ${selectedCountry === c.code ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'}`}>
                        {c.flag} {c.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Price (optional)</label>
            <p className="text-xs text-gray-500 mb-2">Enter the price you were quoted or are paying to see how it compares</p>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder={selectedCountryData ? `Price in ${selectedCountryData.currency}` : 'Price in local currency'}
                value={userPrice}
                onChange={e => setUserPrice(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {userPrice && (
                <button onClick={() => setUserPrice('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          <button onClick={handleCheck} disabled={!selectedProduct || !selectedCountry} aria-label="Analyze price fairness" className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all">
            <Search className="w-5 h-5" /> Analyze Price Fairness
          </button>
          {!isPremium() && (
            <p className="text-xs text-gray-500 text-center mt-2">{25 - getDailySearchCount()} of 25 free searches remaining today</p>
          )}
          {searchLimitHit && (
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 text-center">
              <p className="text-sm font-semibold text-gray-900 mb-1">Daily search limit reached</p>
              <p className="text-xs text-gray-600 mb-3">Free accounts get 25 searches per day. Upgrade for unlimited access.</p>
              <button onClick={() => setActiveTab?.('pricing')} className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold hover:shadow-lg transition-all">View Plans</button>
            </div>
          )}
        </div>

        {fairnessResult && selectedProductData && selectedCountryData && (
          <div ref={resultsRef} className="mt-10 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedProductData.name}</h3>
                  <p className="text-gray-500">{selectedCountryData.flag} {selectedCountryData.name} &middot; {selectedCountryData.currencySymbol}{selectedProductData.prices[selectedCountry].localPrice.toLocaleString()}{selectedProductData.unit}</p>
                </div>
                <div className="flex gap-2 mt-3 sm:mt-0">
                  {user && (
                    <button onClick={handleSave} disabled={saved} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${saved ? 'bg-pink-100 text-pink-600' : 'bg-pink-50 text-pink-600 hover:bg-pink-100'}`}>
                      <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} /> {saved ? 'Saved' : 'Save'}
                    </button>
                  )}
                  <button onClick={() => setShareModalOpen(true)} className="px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-medium flex items-center gap-1.5 hover:bg-indigo-100 transition-all"><Share2 className="w-4 h-4" /> Share</button>
                  <button onClick={() => setShowMethodology(!showMethodology)} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium flex items-center gap-1.5 hover:bg-gray-200 transition-all"><HelpCircle className="w-4 h-4" /> How we score</button>
                </div>
              </div>
              {(() => {
                const refLocalPrice = selectedProductData.prices[selectedCountry].localPrice
                const userPriceNum = userPrice ? parseFloat(userPrice) : 0
                const hasUserPrice = userPrice && userPriceNum > 0
                const userPriceUSD = hasUserPrice ? userPriceNum / selectedCountryData.exchangeRate : fairnessResult.priceUSD
                const pctVsGlobal = Math.round(((userPriceUSD / fairnessResult.globalMedianUSD) - 1) * 100)
                const pctVsUS = Math.round(((userPriceUSD / fairnessResult.usPrice) - 1) * 100)
                const pctVsRef = hasUserPrice ? Math.round(((userPriceNum / refLocalPrice) - 1) * 100) : 0
                const countriesWithProduct = countries.filter(c => selectedProductData.prices[c.code])
                const cheaperCount = countriesWithProduct.filter(c => {
                  const p = selectedProductData.prices[c.code]
                  if (!p) return false
                  const usd = p.localPrice / c.exchangeRate
                  return usd < userPriceUSD
                }).length
                const percentile = Math.round((cheaperCount / countriesWithProduct.length) * 100)
                const isAboveGlobal = pctVsGlobal > 5
                const isBelowGlobal = pctVsGlobal < -5
                const cheapestCountry = countriesWithProduct.reduce((best, c) => {
                  const usd = selectedProductData.prices[c.code].localPrice / c.exchangeRate
                  const bestUsd = selectedProductData.prices[best.code].localPrice / best.exchangeRate
                  return usd < bestUsd ? c : best
                }, countriesWithProduct[0])
                const expensiveCountry = countriesWithProduct.reduce((worst, c) => {
                  const usd = selectedProductData.prices[c.code].localPrice / c.exchangeRate
                  const worstUsd = selectedProductData.prices[worst.code].localPrice / worst.exchangeRate
                  return usd > worstUsd ? c : worst
                }, countriesWithProduct[0])
                return (
                  <>
                    {hasUserPrice && (
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-6 text-white">
                        <div className="flex items-center gap-2 mb-3">
                          <Target className="w-5 h-5" />
                          <h4 className="font-bold text-lg">Your Price Comparison</h4>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                          <div className="bg-white/15 rounded-xl p-3 text-center">
                            <p className="text-xs text-white/70 mb-1">You Pay</p>
                            <p className="text-xl font-bold">{selectedCountryData.currencySymbol}{userPriceNum.toLocaleString()}</p>
                            <p className="text-xs text-white/60">{formatUSD(userPriceUSD)}</p>
                          </div>
                          <div className="bg-white/15 rounded-xl p-3 text-center">
                            <p className="text-xs text-white/70 mb-1">Reference Price</p>
                            <p className="text-xl font-bold">{selectedCountryData.currencySymbol}{refLocalPrice.toLocaleString()}</p>
                            <p className="text-xs text-white/60">{formatUSD(fairnessResult.priceUSD)}</p>
                          </div>
                          <div className="bg-white/15 rounded-xl p-3 text-center">
                            <p className="text-xs text-white/70 mb-1">Global Median</p>
                            <p className="text-xl font-bold">{formatUSD(fairnessResult.globalMedianUSD)}</p>
                          </div>
                          <div className="bg-white/15 rounded-xl p-3 text-center">
                            <p className="text-xs text-white/70 mb-1">vs Reference</p>
                            <p className={`text-xl font-bold flex items-center justify-center gap-1 ${pctVsRef > 5 ? 'text-red-300' : pctVsRef < -5 ? 'text-emerald-300' : 'text-white'}`}>
                              {pctVsRef > 0 ? <ArrowUp className="w-4 h-4" /> : pctVsRef < 0 ? <ArrowDown className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                              {Math.abs(pctVsRef)}%
                            </p>
                          </div>
                        </div>
                        <div className={`rounded-xl p-4 ${pctVsRef > 15 ? 'bg-red-500/30' : pctVsRef > 5 ? 'bg-amber-500/30' : pctVsRef < -5 ? 'bg-emerald-500/30' : 'bg-white/10'}`}>
                          <p className="font-bold text-lg">
                            {pctVsRef > 15
                              ? `You're overpaying by ${pctVsRef}%`
                              : pctVsRef > 5
                              ? `You're paying ${pctVsRef}% above the reference price`
                              : pctVsRef < -15
                              ? `Great deal! You're paying ${Math.abs(pctVsRef)}% less than reference`
                              : pctVsRef < -5
                              ? `Good price! ${Math.abs(pctVsRef)}% below reference`
                              : 'Your price is in line with the reference price'}
                          </p>
                          <p className="text-sm text-white/80 mt-1">
                            {pctVsRef > 15
                              ? `Consider negotiating or looking for alternatives. The typical price is ${selectedCountryData.currencySymbol}${refLocalPrice.toLocaleString()}.`
                              : pctVsRef > 5
                              ? `Slightly above average. You might save ${selectedCountryData.currencySymbol}${(userPriceNum - refLocalPrice).toLocaleString()} by shopping around.`
                              : pctVsRef < -5
                              ? `You're getting a better deal than most people in ${selectedCountryData.name}.`
                              : `This is a fair market price for ${selectedCountryData.name}.`}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          <div className="bg-white/10 rounded-lg p-2.5 text-center">
                            <p className="text-xs text-white/60">Cheapest in</p>
                            <p className="text-sm font-semibold">{cheapestCountry.flag} {cheapestCountry.name}</p>
                            <p className="text-xs text-white/60">{formatUSD(selectedProductData.prices[cheapestCountry.code].localPrice / cheapestCountry.exchangeRate)}</p>
                          </div>
                          <div className="bg-white/10 rounded-lg p-2.5 text-center">
                            <p className="text-xs text-white/60">Most expensive in</p>
                            <p className="text-sm font-semibold">{expensiveCountry.flag} {expensiveCountry.name}</p>
                            <p className="text-xs text-white/60">{formatUSD(selectedProductData.prices[expensiveCountry.code].localPrice / expensiveCountry.exchangeRate)}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className={`p-5 rounded-xl mb-6 ${isAboveGlobal ? 'bg-red-50 border border-red-200' : isBelowGlobal ? 'bg-emerald-50 border border-emerald-200' : 'bg-blue-50 border border-blue-200'}`}>
                      <p className={`text-lg sm:text-xl font-bold ${isAboveGlobal ? 'text-red-800' : isBelowGlobal ? 'text-emerald-800' : 'text-blue-800'}`}>
                        {hasUserPrice
                          ? (isAboveGlobal
                            ? `Your price is ${Math.abs(pctVsGlobal)}% higher than the global median`
                            : isBelowGlobal
                            ? `Your price is ${Math.abs(pctVsGlobal)}% lower than the global median`
                            : 'Your price is close to the global median')
                          : (isAboveGlobal
                            ? `This price is ${Math.abs(pctVsGlobal)}% higher than the global median`
                            : isBelowGlobal
                            ? `This price is ${Math.abs(pctVsGlobal)}% lower than the global median`
                            : 'This price is close to the global median')}
                      </p>
                      <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2">
                        <p className="text-sm text-gray-600">
                          {pctVsUS > 0 ? `${pctVsUS}% more` : pctVsUS < 0 ? `${Math.abs(pctVsUS)}% less` : 'Same'} than the US price
                        </p>
                        <p className="text-sm text-gray-600">
                          {hasUserPrice ? 'Your price is' : 'You pay'} more than {percentile}% of the world
                        </p>
                      </div>
                    </div>
                  </>
                )
              })()}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
                <div className="p-4 rounded-xl bg-gray-50 text-center">
                  <p className="text-xs text-gray-500 mb-1">Your Price (USD)</p>
                  <p className="text-xl font-bold text-gray-900">{formatUSD(fairnessResult.priceUSD)}</p>
                  <p className="text-xs text-gray-400 mt-1">{selectedCountryData.currencySymbol}{selectedProductData.prices[selectedCountry].localPrice.toLocaleString()} local</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 text-center">
                  <p className="text-xs text-gray-500 mb-1">US Price</p>
                  <p className="text-xl font-bold text-indigo-600">{formatUSD(fairnessResult.usPrice)}</p>
                  <p className="text-xs text-gray-400 mt-1">Baseline reference</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 text-center">
                  <p className="text-xs text-gray-500 mb-1">Global Median</p>
                  <p className="text-xl font-bold text-purple-600">{formatUSD(fairnessResult.globalMedianUSD)}</p>
                  <p className="text-xs text-gray-400 mt-1">Across {countries.filter(c => selectedProductData.prices[c.code]).length} countries</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
                <div className="p-4 rounded-xl bg-gray-50 text-center">
                  <p className="text-xs text-gray-500 mb-1">% of Median Income</p>
                  <p className="text-xl font-bold text-gray-900">{fairnessResult.incomePercentage.toFixed(2)}%</p>
                  <p className="text-xs text-gray-400 mt-1">(US: {fairnessResult.usIncomePercentage.toFixed(2)}%)</p>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-center">
                  <p className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1"><Clock className="w-3 h-3" /> Hours of Work</p>
                  <p className="text-xl font-bold text-amber-700">{fairnessResult.hoursOfWork.toFixed(1)}h</p>
                  <p className="text-xs text-gray-400 mt-1">US: {fairnessResult.usHoursOfWork.toFixed(1)}h ({fairnessResult.hoursOfWork > fairnessResult.usHoursOfWork ? `${(fairnessResult.hoursOfWork / fairnessResult.usHoursOfWork).toFixed(1)}x more` : fairnessResult.hoursOfWork < fairnessResult.usHoursOfWork ? `${(fairnessResult.usHoursOfWork / fairnessResult.hoursOfWork).toFixed(1)}x less` : 'Same'})</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 text-center">
                  <p className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1"><ShieldCheck className="w-3 h-3" /> Data Confidence</p>
                  <p className={`text-xl font-bold ${fairnessResult.confidenceScore >= 70 ? 'text-emerald-600' : fairnessResult.confidenceScore >= 40 ? 'text-amber-600' : 'text-red-600'}`}>{fairnessResult.confidenceScore}/100</p>
                  <p className="text-xs text-gray-400 mt-1">{fairnessResult.confidenceLabel}</p>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Scale className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-bold text-gray-900">Fairness Lenses</h4>
                  <button onClick={() => setShowMethodology(true)} className="text-xs text-indigo-500 hover:underline">(What are these?)</button>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {fairnessLenses.map(lens => (
                    <button key={lens.id} onClick={() => setActiveLens(lens.id)} className="text-left">
                      <FairnessBar score={getScoreForLens(fairnessResult, lens.id)} label={lens.label} description={lens.description} active={activeLens === lens.id} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center py-6">
                <ScoreGauge score={activeScenario ? (() => { const adj = applyScenario(fairnessResult, activeScenario, selectedCountryData); return adj.adjustedScore; })() : getScoreForLens(fairnessResult, activeLens)} size="lg" label={activeScenario ? 'Scenario Score' : `${fairnessLenses.find(l => l.id === activeLens)?.label || ''} Score`} />
              </div>
              {activeScenario && (() => {
                const adj = applyScenario(fairnessResult, activeScenario, selectedCountryData)
                return (
                  <div className="mt-3 p-3 rounded-xl bg-purple-50 border border-purple-200 text-center">
                    <p className="text-sm text-purple-800 font-medium">{adj.explanation}</p>
                    <p className="text-xs text-purple-600 mt-1">Base score: {Math.round(getScoreForLens(fairnessResult, activeLens))} &rarr; Adjusted: {Math.round(adj.adjustedScore)}</p>
                  </div>
                )
              })()}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Eye className="w-5 h-5 text-indigo-600" /> Scenario Analysis</h3>
              <p className="text-sm text-gray-500 mb-4">See how fairness changes under different assumptions</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                {[
                  { id: 'my-income', label: 'Fair for my income?', icon: DollarSign, color: 'indigo' },
                  { id: 'no-brand', label: 'Without brand premium?', icon: ShoppingCart, color: 'purple' },
                  { id: 'crisis', label: 'During a crisis?', icon: AlertOctagon, color: 'red' },
                  { id: 'sustainable', label: 'If ethically sourced?', icon: Leaf, color: 'emerald' },
                ].map(s => (
                  <button key={s.id} onClick={() => setActiveScenario(activeScenario === s.id ? '' : s.id)} className={`p-3 rounded-xl border text-center transition-all ${activeScenario === s.id ? `bg-${s.color === 'indigo' ? 'indigo' : s.color === 'purple' ? 'purple' : s.color === 'red' ? 'red' : 'emerald'}-50 border-${s.color === 'indigo' ? 'indigo' : s.color === 'purple' ? 'purple' : s.color === 'red' ? 'red' : 'emerald'}-300` : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}>
                    <s.icon className={`w-5 h-5 mx-auto mb-1.5 ${activeScenario === s.id ? `text-${s.color === 'indigo' ? 'indigo' : s.color === 'purple' ? 'purple' : s.color === 'red' ? 'red' : 'emerald'}-600` : 'text-gray-400'}`} />
                    <p className={`text-xs font-medium ${activeScenario === s.id ? 'text-gray-900' : 'text-gray-600'}`}>{s.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-indigo-600" /> 12-Month Price Trend</h3>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${fairnessResult.trendSignal === 'buy' ? 'bg-emerald-100 text-emerald-700' : fairnessResult.trendSignal === 'wait' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                  {fairnessResult.trendSignal === 'buy' ? 'Buy Now' : fairnessResult.trendSignal === 'wait' ? 'Consider Waiting' : 'Neutral'}
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4">{fairnessResult.trendReason}</p>
              <div className="relative h-40 sm:h-48 w-full overflow-x-auto">
                <svg viewBox="0 0 440 160" className="w-full h-full min-w-80" preserveAspectRatio="none">
                  {(() => {
                    const data = fairnessResult.trendData
                    if (data.length === 0) return null
                    const minP = Math.min(...data.map(d => Math.min(d.price, d.avg))) * 0.95
                    const maxP = Math.max(...data.map(d => Math.max(d.price, d.avg))) * 1.05
                    const range = maxP - minP || 1
                    const toX = (i: number) => 20 + (i / (data.length - 1)) * 400
                    const toY = (v: number) => 145 - ((v - minP) / range) * 130
                    const pricePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(d.price)}`).join(' ')
                    const avgPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(d.avg)}`).join(' ')
                    return (
                      <>
                        {[0, 0.25, 0.5, 0.75, 1].map(f => (
                          <line key={f} x1="20" y1={15 + f * 130} x2="420" y2={15 + f * 130} stroke="#f3f4f6" strokeWidth="1" />
                        ))}
                        {data.map((d, i) => (
                          <text key={i} x={toX(i)} y="158" textAnchor="middle" className="text-[8px] fill-gray-400">{d.month}</text>
                        ))}
                        <path d={avgPath} fill="none" stroke="#a5b4fc" strokeWidth="2" strokeDasharray="4 4" />
                        <path d={pricePath} fill="none" stroke="#6366f1" strokeWidth="2.5" />
                        {data.map((d, i) => (
                          <circle key={i} cx={toX(i)} cy={toY(d.price)} r="3" fill="#6366f1" />
                        ))}
                      </>
                    )
                  })()}
                </svg>
              </div>
              <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3 flex-wrap">
                <div className="flex items-center gap-1.5"><div className="w-4 h-0.5 bg-indigo-500 rounded" /><span className="text-xs text-gray-500">Price</span></div>
                <div className="flex items-center gap-1.5"><div className="w-4 h-0.5 bg-indigo-300 rounded" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #a5b4fc 0, #a5b4fc 4px, transparent 4px, transparent 8px)' }} /><span className="text-xs text-gray-500">12-mo avg</span></div>
              </div>
              {(() => {
                const data = fairnessResult.trendData
                if (data.length < 6) return null
                const prices = data.map(d => d.price)
                const minIdx = prices.indexOf(Math.min(...prices))
                const maxIdx = prices.indexOf(Math.max(...prices))
                const cheapestMonth = data[minIdx]
                const expensiveMonth = data[maxIdx]
                const q1Months = data.slice(0, 3)
                const q2Months = data.slice(3, 6)
                const q3Months = data.slice(6, 9)
                const q4Months = data.slice(9, 12)
                const qAvg = (arr: typeof data) => arr.reduce((s, d) => s + d.price, 0) / arr.length
                const quarters = [
                  { label: 'Spring', avg: qAvg(q1Months), icon: Sun },
                  { label: 'Summer', avg: qAvg(q2Months), icon: Sun },
                  { label: 'Fall', avg: qAvg(q3Months), icon: CalendarDays },
                  { label: 'Winter', avg: qAvg(q4Months), icon: Snowflake },
                ]
                const cheapestQ = quarters.reduce((best, q) => q.avg < best.avg ? q : best)
                const seasonalRange = Math.round(((Math.max(...quarters.map(q => q.avg)) / Math.min(...quarters.map(q => q.avg))) - 1) * 100)
                return (
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
                    <div className="flex items-center gap-2 mb-3">
                      <CalendarDays className="w-4 h-4 text-blue-600" />
                      <h4 className="font-semibold text-gray-900 text-sm">Seasonal Price Analysis</h4>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                      {quarters.map(q => (
                        <div key={q.label} className={`p-2 rounded-lg text-center ${q === cheapestQ ? 'bg-emerald-100 border border-emerald-200' : 'bg-white/70'}`}>
                          <q.icon className={`w-3.5 h-3.5 mx-auto mb-1 ${q === cheapestQ ? 'text-emerald-600' : 'text-gray-400'}`} />
                          <p className="text-xs text-gray-500">{q.label}</p>
                          <p className={`text-sm font-bold ${q === cheapestQ ? 'text-emerald-700' : 'text-gray-700'}`}>{formatUSD(q.avg)}</p>
                          {q === cheapestQ && <p className="text-xs text-emerald-600 font-medium">Best time</p>}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 text-xs text-gray-600">
                      <span className="flex items-center gap-1"><ArrowDown className="w-3 h-3 text-emerald-500" /> Cheapest: {cheapestMonth.month} ({formatUSD(cheapestMonth.price)})</span>
                      <span className="flex items-center gap-1"><ArrowUp className="w-3 h-3 text-red-500" /> Highest: {expensiveMonth.month} ({formatUSD(expensiveMonth.price)})</span>
                      <span className="text-gray-400">Seasonal range: {seasonalRange}%</span>
                    </div>
                  </div>
                )
              })()}
            </div>

            {fairnessResult.factors.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Why this price is different</h3>
                <p className="text-sm text-gray-500 mb-5">Context matters. Here is what contributes to the price in {selectedCountryData.name}.</p>
                <div className="space-y-3">
                  {fairnessResult.factors.map((factor, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${factor.impact === 'increases' ? 'border-red-200 bg-red-50/50' : factor.impact === 'decreases' ? 'border-emerald-200 bg-emerald-50/50' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-900 text-sm">{factor.label}</span>
                        {factor.percentage > 0 && (<span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${factor.impact === 'increases' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>{factor.impact === 'increases' ? '+' : '-'}{factor.percentage}%</span>)}
                      </div>
                      <p className="text-sm text-gray-600">{factor.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2"><Zap className="w-5 h-5 text-amber-500" /> How to Pay Less</h3>
              <p className="text-sm text-gray-500 mb-4">Actionable tips based on the product category and your country</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {selectedProductData.category === 'digital' && (
                  <>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Check regional pricing</p><p className="text-xs text-blue-700 mt-0.5">Many digital services offer different tiers or pricing by region. Check if a regional plan is available.</p></div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Annual vs monthly</p><p className="text-xs text-blue-700 mt-0.5">Annual plans typically save 15-30% vs monthly billing.</p></div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Student / education discounts</p><p className="text-xs text-blue-700 mt-0.5">Many digital services offer 40-70% off for students and educators.</p></div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Wait for sales events</p><p className="text-xs text-blue-700 mt-0.5">Black Friday, regional holidays, and launch promotions often have significant discounts.</p></div>
                  </>
                )}
                {selectedProductData.category === 'physical' && (
                  <>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Compare authorized retailers</p><p className="text-xs text-blue-700 mt-0.5">Prices can vary 5-15% between authorized retailers in the same country.</p></div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Consider previous models</p><p className="text-xs text-blue-700 mt-0.5">Last-generation products often offer 90% of the value at 60% of the price.</p></div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Tax-free shopping</p><p className="text-xs text-blue-700 mt-0.5">Travelers can often claim VAT refunds on purchases. Check local rules.</p></div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Seasonal sales</p><p className="text-xs text-blue-700 mt-0.5">Electronics drop 15-30% during launch cycles and holiday sales.</p></div>
                  </>
                )}
                {selectedProductData.category === 'saas' && (
                  <>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Negotiate enterprise pricing</p><p className="text-xs text-blue-700 mt-0.5">B2B tools often have unlisted pricing for larger teams. Always ask.</p></div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Open-source alternatives</p><p className="text-xs text-blue-700 mt-0.5">Many SaaS tools have capable free alternatives (e.g., Jitsi for Zoom).</p></div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Startup / nonprofit programs</p><p className="text-xs text-blue-700 mt-0.5">Many SaaS companies offer free or discounted tiers for startups and nonprofits.</p></div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Annual commitment</p><p className="text-xs text-blue-700 mt-0.5">Annual billing typically saves 20-40% over monthly plans.</p></div>
                  </>
                )}
                {selectedProductData.category === 'essential' && (
                  <>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Buy local / seasonal</p><p className="text-xs text-blue-700 mt-0.5">Locally produced essentials avoid import costs and are often fresher.</p></div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Buy in bulk</p><p className="text-xs text-blue-700 mt-0.5">Wholesale or bulk purchases often reduce per-unit cost by 15-30%.</p></div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Government subsidies</p><p className="text-xs text-blue-700 mt-0.5">Check if your country offers subsidies or price caps on essential goods.</p></div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Store brands</p><p className="text-xs text-blue-700 mt-0.5">Store-brand versions of essentials are typically 20-40% cheaper with comparable quality.</p></div>
                  </>
                )}
                {selectedProductData.category === 'service' && (
                  <>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Get multiple quotes</p><p className="text-xs text-blue-700 mt-0.5">Service prices vary enormously. Always get 3+ quotes before committing.</p></div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Off-peak timing</p><p className="text-xs text-blue-700 mt-0.5">Many services cost less during off-peak hours, weekdays, or slower seasons.</p></div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Bundle services</p><p className="text-xs text-blue-700 mt-0.5">Bundling multiple services with one provider often yields package discounts.</p></div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Negotiate</p><p className="text-xs text-blue-700 mt-0.5">Show competing quotes. Many service providers will match or beat competitors.</p></div>
                  </>
                )}
                {selectedProductData.category === 'medical' && (
                  <>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Check public healthcare</p><p className="text-xs text-blue-700 mt-0.5">Many countries offer subsidized or free medical services through public healthcare systems.</p></div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Compare facilities</p><p className="text-xs text-blue-700 mt-0.5">Prices for the same procedure can vary 3-5x between facilities in the same city.</p></div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Ask for cash prices</p><p className="text-xs text-blue-700 mt-0.5">Many providers offer 20-50% discounts for upfront cash payment.</p></div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100"><p className="text-sm font-medium text-blue-900">Medical tourism</p><p className="text-xs text-blue-700 mt-0.5">For major procedures, accredited hospitals abroad can save 50-80%.</p></div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Info className="w-5 h-5 text-indigo-600" /> Data Transparency</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-lg bg-gray-50">
                  <Database className="w-4 h-4 mx-auto mb-1 text-gray-400" />
                  <p className="text-xs text-gray-500">Countries Tracked</p>
                  <p className="font-bold text-gray-900">{countries.filter(c => selectedProductData.prices[c.code]).length}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <BarChart3 className="w-4 h-4 mx-auto mb-1 text-gray-400" />
                  <p className="text-xs text-gray-500">Sample Size</p>
                  <p className="font-bold text-gray-900">{countries.filter(c => selectedProductData.prices[c.code]).length * 47}+</p>
                  <p className="text-xs text-gray-400">price reports</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-gray-400" />
                  <p className="text-xs text-gray-500">Confidence</p>
                  <p className={`font-bold ${fairnessResult.confidenceScore >= 70 ? 'text-emerald-600' : fairnessResult.confidenceScore >= 40 ? 'text-amber-600' : 'text-red-600'}`}>{fairnessResult.confidenceLabel}</p>
                  <p className="text-xs text-gray-400">{fairnessResult.confidenceScore}/100</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <Clock className="w-4 h-4 mx-auto mb-1 text-gray-400" />
                  <p className="text-xs text-gray-500">Last Updated</p>
                  <p className="font-bold text-gray-900 text-sm">Feb 2026</p>
                  <p className="text-xs text-gray-400">Refreshed monthly</p>
                </div>
              </div>
              <div className="mt-3 p-2.5 rounded-lg bg-indigo-50 border border-indigo-100">
                <p className="text-xs text-indigo-700 text-center">Outlier-filtered statistical analysis using IQR method across {countries.filter(c => selectedProductData.prices[c.code]).length} markets. Sources: Brand websites, government price databases, consumer indices, community reports.</p>
              </div>
            </div>

            {(() => {
              const ci = getConfidenceInterval(selectedProductData, selectedCountry)
              const vol = getVolatility(fairnessResult.trendData)
              const pred3 = predictPrice(fairnessResult.trendData, 3)
              const pred6 = predictPrice(fairnessResult.trendData, 6)
              if (!ci.mean) return null
              if (!isPremium()) return (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6">
                    <Zap className="w-8 h-8 text-indigo-500 mb-2" />
                    <p className="text-lg font-bold text-gray-900 mb-1">Statistical Insights & Predictions</p>
                    <p className="text-sm text-gray-600 mb-3 text-center">Confidence intervals, volatility analysis, and price predictions are available on Premium and Business plans.</p>
                    <button onClick={() => setActiveTab?.('pricing')} className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold hover:shadow-lg transition-all">Upgrade Now</button>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 opacity-40"><Activity className="w-5 h-5 text-indigo-600" /> Statistical Insights</h3>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4 opacity-40">
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 h-24" />
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 h-24" />
                  </div>
                  <div className="p-4 rounded-xl bg-violet-50 border border-violet-100 h-20 opacity-40" />
                </div>
              )
              return (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-indigo-600" /> Statistical Insights</h3>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">95% Confidence Interval</p>
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-lg font-bold text-gray-900">{formatUSD(ci.lower)} &ndash; {formatUSD(ci.upper)}</p>
                      </div>
                      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="absolute h-full bg-indigo-200 rounded-full" style={{ left: `${Math.max(0, ((ci.lower - ci.lower * 0.8) / (ci.upper * 1.2 - ci.lower * 0.8)) * 100)}%`, width: `${Math.min(100, ((ci.upper - ci.lower) / (ci.upper * 1.2 - ci.lower * 0.8)) * 100)}%` }} />
                        <div className="absolute h-full w-0.5 bg-indigo-600" style={{ left: `${Math.min(100, Math.max(0, ((ci.mean - ci.lower * 0.8) / (ci.upper * 1.2 - ci.lower * 0.8)) * 100))}%` }} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5">Your price: {formatUSD(ci.mean)} &middot; Margin: &plusmn;{formatUSD(ci.margin)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Price Volatility</p>
                      <div className="flex items-center gap-3">
                        <p className={`text-lg font-bold ${vol.label === 'High' ? 'text-red-600' : vol.label === 'Moderate' ? 'text-amber-600' : 'text-emerald-600'}`}>{vol.label}</p>
                        <span className="text-sm text-gray-500">{vol.volatility}% CV</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{vol.label === 'High' ? 'Prices fluctuate significantly — wait for dips or set a price alert' : vol.label === 'Moderate' ? 'Some price variation — timing your purchase may save money' : 'Prices are stable — unlikely to change much'}</p>
                    </div>
                  </div>
                  {pred3.predicted > 0 && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Price Prediction (Linear Trend)</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">3 Months</p>
                          <p className="text-lg font-bold text-gray-900">{formatUSD(pred3.predicted)}</p>
                          <p className="text-xs text-gray-400">{formatUSD(pred3.lower)} &ndash; {formatUSD(pred3.upper)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">6 Months</p>
                          <p className="text-lg font-bold text-gray-900">{formatUSD(pred6.predicted)}</p>
                          <p className="text-xs text-gray-400">{formatUSD(pred6.lower)} &ndash; {formatUSD(pred6.upper)}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Based on 12-month linear regression. Ranges show 95% prediction intervals. Not financial advice.</p>
                    </div>
                  )}
                </div>
              )
            })()}

            {(() => {
              const nearby = getNearbyCountries(selectedCountry, selectedProduct)
              if (nearby.length === 0) return null
              return (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2"><MapPin className="w-5 h-5 text-indigo-600" /> Nearby &amp; Similar Markets</h3>
                  <p className="text-sm text-gray-500 mb-4">Countries in the same region or income group for quick comparison</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {nearby.map(c => {
                      const entry = selectedProductData.prices[c.code]
                      if (!entry) return null
                      const usd = entry.localPrice / c.exchangeRate
                      const diff = Math.round(((usd / fairnessResult.priceUSD) - 1) * 100)
                      return (
                        <button key={c.code} onClick={() => { setSelectedCountry(c.code); handleCheck() }} className="p-3 rounded-xl bg-gray-50 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{c.flag}</span>
                            <span className="text-sm font-semibold text-gray-900">{c.name}</span>
                          </div>
                          <p className="text-sm font-bold text-gray-700">{formatUSD(usd)}</p>
                          <p className={`text-xs font-medium ${diff > 0 ? 'text-red-500' : diff < 0 ? 'text-emerald-500' : 'text-gray-400'}`}>
                            {diff > 0 ? `+${diff}%` : diff < 0 ? `${diff}%` : 'Same'} vs {selectedCountryData.name}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })()}

            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-0.5">Disclaimer</p>
                <p className="text-xs text-amber-700">Prices shown are estimates based on publicly available data. This tool provides price disparity analysis, not price accusations. Actual prices vary by provider, timing, and specific product configuration. Regional factors like taxes, import duties, and distribution costs legitimately affect pricing. Always verify with local sources.</p>
              </div>
            </div>

            {showMethodology && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowMethodology(false)}>
                <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto p-8" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">How We Calculate Fairness</h3>
                    <button onClick={() => setShowMethodology(false)} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
                  </div>
                  <div className="space-y-6 text-sm text-gray-600">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Scoring System (0-100)</h4>
                      <p>A score of 50 means the price matches the US baseline. Higher scores mean better value. Lower scores mean overpriced relative to baseline.</p>
                      <ul className="mt-2 space-y-1 ml-4">
                        <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500" /> 60-100: Good value</li>
                        <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500" /> 40-60: Market rate</li>
                        <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500" /> 0-40: Overpriced relative to baseline</li>
                      </ul>
                    </div>
                    {fairnessLenses.map(lens => (<div key={lens.id}><h4 className="font-bold text-gray-900 mb-1">{lens.label}</h4><p>{lens.description}</p></div>))}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Data Sources</h4>
                      <p>Prices compiled from official brand websites, government statistics, consumer price indices, and community reports. Exchange rates reflect approximate 2024 market rates.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {shareModalOpen && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShareModalOpen(false)}>
                <div className="bg-white rounded-2xl max-w-md w-full p-8" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Share This Result</h3>
                    <button onClick={() => setShareModalOpen(false)} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 text-white mb-4">
                    <div className="flex items-center gap-2 mb-4"><Shield className="w-5 h-5" /><span className="font-bold">FairPrice</span></div>
                    <p className="text-xl font-bold">{selectedProductData.name}</p>
                    <p className="text-white/70 text-sm mb-4">{selectedCountryData.flag} {selectedCountryData.name}</p>
                    <div className="bg-white/15 rounded-lg p-4 mb-4 text-center">
                      <p className="text-3xl font-extrabold">{(() => { const pct = Math.round(((fairnessResult.priceUSD / fairnessResult.globalMedianUSD) - 1) * 100); return pct > 0 ? `${pct}% above` : pct < 0 ? `${Math.abs(pct)}% below` : 'At' })()}</p>
                      <p className="text-sm text-white/70">the global median price</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center mb-3">
                      <div className="bg-white/10 rounded-lg p-2"><p className="text-xs text-white/60">Local</p><p className="font-bold text-sm">{selectedCountryData.currencySymbol}{selectedProductData.prices[selectedCountry].localPrice.toLocaleString()}</p></div>
                      <div className="bg-white/10 rounded-lg p-2"><p className="text-xs text-white/60">US</p><p className="font-bold text-sm">{formatUSD(fairnessResult.usPrice)}</p></div>
                      <div className="bg-white/10 rounded-lg p-2"><p className="text-xs text-white/60">Score</p><p className="font-bold text-sm">{Math.round(getScoreForLens(fairnessResult, activeLens))}/100</p></div>
                      <div className="bg-white/10 rounded-lg p-2"><p className="text-xs text-white/60">Hours</p><p className="font-bold text-sm">{fairnessResult.hoursOfWork.toFixed(1)}h</p></div>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${fairnessResult.trendSignal === 'buy' ? 'bg-emerald-400/30 text-emerald-100' : fairnessResult.trendSignal === 'wait' ? 'bg-amber-400/30 text-amber-100' : 'bg-white/15 text-white/70'}`}>{fairnessResult.trendSignal === 'buy' ? 'Buy Now' : fairnessResult.trendSignal === 'wait' ? 'Wait' : 'Neutral'}</span>
                      <span className="text-xs text-white/50">Confidence: {fairnessResult.confidenceScore}/100</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 text-center">Screenshot this card and share on social media</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
