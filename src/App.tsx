import { useState, useRef, useEffect } from 'react'
import './App.css'
import {
  Search, DollarSign, Shield, Globe, Users,
  BarChart3, ChevronDown, Wrench,
  Stethoscope, ArrowRight, CheckCircle, AlertTriangle, XCircle, Info, Share2,
  Flag, MessageSquare, Zap, Eye, HelpCircle, Monitor, Package, Cloud,
  ShoppingBasket, Gamepad2, Trophy,
  Scale, BookOpen, FileText, Home, X, TrendingUp, TrendingDown, MapPin,
} from 'lucide-react'
import {
  countries, products, productCategories, fairnessLenses,
  calculateFairness, generateQuizQuestion, getLeaderboard,
  priceToUSD, getCountryComparison, getGlobalStats,
  type FairnessResult, type QuizQuestion,
} from './data'

function ScoreGauge({ score, size = 'md', label }: { score: number; size?: 'sm' | 'md' | 'lg'; label?: string }) {
  const ariaLabel = label ? `${label}: ${Math.round(score)} out of 100` : `Score: ${Math.round(score)} out of 100`
  const color = score >= 60 ? 'text-emerald-500' : score >= 40 ? 'text-amber-500' : 'text-red-500'
  const dims = size === 'lg' ? 'w-28 h-28' : size === 'md' ? 'w-20 h-20' : 'w-14 h-14'
  const textSize = size === 'lg' ? 'text-3xl' : size === 'md' ? 'text-xl' : 'text-sm'
  const circumference = 2 * Math.PI * 40
  const offset = circumference - (score / 100) * circumference
  return (
    <div className="flex flex-col items-center gap-1" role="meter" aria-valuenow={Math.round(score)} aria-valuemin={0} aria-valuemax={100} aria-label={ariaLabel}>
      <div className={`${dims} relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle cx="50" cy="50" r="40" fill="none" stroke={score >= 60 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444'} strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-700" />
        </svg>
        <div className={`absolute inset-0 flex items-center justify-center ${textSize} font-bold ${color}`}>
          {Math.round(score)}
        </div>
      </div>
      {label && <span className="text-xs text-gray-500 text-center">{label}</span>}
    </div>
  )
}

function FairnessBar({ score, label, description, active }: { score: number; label: string; description: string; active: boolean }) {
  const color = score >= 60 ? 'bg-emerald-500' : score >= 40 ? 'bg-amber-500' : 'bg-red-500'
  const textColor = score >= 60 ? 'text-emerald-700' : score >= 40 ? 'text-amber-700' : 'text-red-700'
  const verdict = score >= 60 ? 'Good value' : score >= 40 ? 'Market rate' : 'Overpriced'
  return (
    <div className={`p-4 rounded-xl border transition-all ${active ? 'border-indigo-300 bg-indigo-50/50 shadow-sm' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-900">{label}</span>
        <span className={`text-xs font-semibold ${textColor} px-2 py-0.5 rounded-full ${score >= 60 ? 'bg-emerald-100' : score >= 40 ? 'bg-amber-100' : 'bg-red-100'}`}>{verdict}</span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-2">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${score}%` }} />
      </div>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  )
}

type TabId = 'home' | 'checker' | 'compare' | 'vsworld' | 'quiz' | 'leaderboard' | 'community' | 'methodology'

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home')
  const [selectedProduct, setSelectedProduct] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [activeLens, setActiveLens] = useState('ppp')
  const [fairnessResult, setFairnessResult] = useState<FairnessResult | null>(null)
  const [showMethodology, setShowMethodology] = useState(false)
  const [quizQuestion, setQuizQuestion] = useState<QuizQuestion | null>(null)
  const [quizAnswer, setQuizAnswer] = useState<'A' | 'B' | null>(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizTotal, setQuizTotal] = useState(0)
  const [compareProduct, setCompareProduct] = useState('')
  const [communityName, setCommunityName] = useState('')
  const [communityPrice, setCommunityPrice] = useState('')
  const [communityNotes, setCommunityNotes] = useState('')
  const [communitySubmitted, setCommunitySubmitted] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [vsWorldCountry, setVsWorldCountry] = useState('')
  const resultsRef = useRef<HTMLDivElement>(null)

  const filteredProducts = categoryFilter === 'all' ? products : products.filter(p => p.category === categoryFilter)
  const selectedProductData = products.find(p => p.id === selectedProduct)
  const selectedCountryData = countries.find(c => c.code === selectedCountry)

  const handleCheck = () => {
    if (!selectedProduct || !selectedCountry) return
    const product = products.find(p => p.id === selectedProduct)
    if (!product) return
    const result = calculateFairness(product, selectedCountry)
    setFairnessResult(result)
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const startQuiz = () => {
    setQuizQuestion(generateQuizQuestion())
    setQuizAnswer(null)
  }

  const answerQuiz = (answer: 'A' | 'B') => {
    if (!quizQuestion || quizAnswer) return
    setQuizAnswer(answer)
    setQuizTotal(t => t + 1)
    if (answer === quizQuestion.answer) setQuizScore(s => s + 1)
  }

  useEffect(() => {
    if (activeTab === 'quiz' && !quizQuestion) startQuiz()
  }, [activeTab])

  const leaderboard = activeTab === 'leaderboard' ? getLeaderboard() : []

  const getScoreForLens = (result: FairnessResult, lensId: string) => {
    switch (lensId) {
      case 'raw': return result.rawScore
      case 'ppp': return result.pppScore
      case 'income': return result.incomeScore
      case 'col': return result.colScore
      default: return result.pppScore
    }
  }

  const formatUSD = (n: number) => `$${n < 1 ? n.toFixed(2) : n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`

  const tabs: { id: TabId; label: string; icon: typeof Globe }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'checker', label: 'Price Checker', icon: Search },
    { id: 'compare', label: 'Global Compare', icon: Globe },
    { id: 'vsworld', label: 'Your Country vs World', icon: MapPin },
    { id: 'quiz', label: 'Quiz', icon: Gamepad2 },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'methodology', label: 'How We Score', icon: BookOpen },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg">Skip to main content</a>
      <nav role="navigation" aria-label="Main navigation" className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => setActiveTab('home')} className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">FairPrice</span>
            </button>
            <div className="hidden md:flex items-center gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false) }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none ${activeTab === tab.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <BarChart3 className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white p-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${activeTab === tab.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600'}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main id="main-content" role="main">
      {activeTab === 'home' && (
        <>
          <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 sm:py-32">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl" />
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-8">
                <Globe className="w-4 h-4" />
                30 countries &middot; 35+ products &middot; Multiple fairness lenses
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
                Is this price fair<br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">in your country?</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Same product. Wildly different prices. We show you if you are paying a fair price &mdash; adjusted for income, purchasing power, taxes, and cost of living.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => setActiveTab('checker')} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:shadow-xl transition-all">
                  Check a Price <ArrowRight className="w-5 h-5" />
                </button>
                <button onClick={() => setActiveTab('quiz')} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border-2 border-gray-200 text-gray-700 font-bold text-lg hover:border-indigo-300 hover:shadow-lg transition-all">
                  <Gamepad2 className="w-5 h-5" />
                  Guess the Price
                </button>
              </div>
              <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
                {[
                  { stat: '30', label: 'Countries' },
                  { stat: '35+', label: 'Products & Services' },
                  { stat: '4', label: 'Fairness Lenses' },
                  { stat: '100%', label: 'Transparent Scoring' },
                ].map(item => (
                  <div key={item.label} className="text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{item.stat}</div>
                    <div className="text-sm text-gray-500 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14">
                <h2 className="text-3xl font-bold text-gray-900">Not just numbers &mdash; context</h2>
                <p className="mt-3 text-gray-600 max-w-xl mx-auto">We don't just compare raw prices. We show you why prices differ and what "fair" actually means.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Scale, title: 'Multiple Fairness Lenses', desc: 'Compare by PPP, income, cost of living, or raw price. No single metric tells the full story.' },
                  { icon: Eye, title: 'Transparent Scoring', desc: 'Click any score to see exactly how it was calculated. No black boxes.' },
                  { icon: FileText, title: 'Context, Not Accusations', desc: 'We explain taxes, import duties, and local factors that cause price differences.' },
                  { icon: Users, title: 'Community Verified', desc: 'Crowdsourced data from real users. Flag outdated prices and add local notes.' },
                ].map(item => (
                  <div key={item.title} className="p-6 rounded-2xl border border-gray-200 hover:border-indigo-200 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14">
                <h2 className="text-3xl font-bold text-gray-900">Different rules for different categories</h2>
                <p className="mt-3 text-gray-600">We evaluate fairness differently based on what you are buying</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: Monitor, cat: 'Digital Goods', desc: 'Games, streaming, software. Regional pricing should reflect local purchasing power.', example: 'Netflix: $15.49 in US vs regional pricing in India' },
                  { icon: Package, cat: 'Physical Goods', desc: 'Import duties, shipping, and distribution costs legitimately raise prices.', example: 'iPhone 15: $799 in US, much higher in Brazil' },
                  { icon: Cloud, cat: 'SaaS / B2B Tools', desc: 'Cloud services have near-zero marginal cost. Regional pricing is a choice.', example: 'Slack: $12.50/user in US, lower in India' },
                  { icon: ShoppingBasket, cat: 'Essentials', desc: 'Food, fuel, utilities. Prices reflect local production and subsidies.', example: 'Gasoline: $0.95/L in US, subsidized in Egypt' },
                  { icon: Wrench, cat: 'Services', desc: 'Plumbers, internet, rent. Tied to local wages and regulations.', example: 'Plumber: $85/hr in US, much less in India' },
                  { icon: Stethoscope, cat: 'Medical', desc: 'Massive variation. Insurance systems, regulations, and market forces all play a role.', example: 'MRI: $2,600 in US, under $500 in UK' },
                ].map(item => (
                  <div key={item.cat} className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all">
                    <item.icon className="w-8 h-8 text-indigo-600 mb-3" />
                    <h3 className="font-bold text-gray-900 mb-2">{item.cat}</h3>
                    <p className="text-sm text-gray-600 mb-3">{item.desc}</p>
                    <div className="text-xs text-indigo-600 bg-indigo-50 rounded-lg px-3 py-2 font-medium">{item.example}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14">
                <h2 className="text-3xl font-bold text-gray-900">Why price transparency matters</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { stat: '$4,200', desc: 'Average annual savings when consumers know fair prices' },
                  { stat: '73%', desc: 'Of people have paid above market rate without knowing' },
                  { stat: '10x', desc: 'Price variation for the same medical procedure in the US' },
                  { stat: '0', desc: 'Industries that want you to have this information' },
                ].map(item => (
                  <div key={item.stat} className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 text-center">
                    <div className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">{item.stat}</div>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="relative max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Stop overpaying. Start understanding.</h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">We don't accuse. We inform. Understand the real reasons behind price differences worldwide.</p>
              <button onClick={() => setActiveTab('checker')} className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-indigo-600 font-bold text-lg hover:shadow-2xl transition-all">
                Check a Price Now <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </section>
        </>
      )}

      {activeTab === 'checker' && (
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
                      onClick={() => { setCategoryFilter(cat.id); setSelectedProduct('') }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${categoryFilter === cat.id ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Product / Service</label>
                  <div className="relative">
                    <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="">Select a product...</option>
                      {filteredProducts.map(p => (<option key={p.id} value={p.id}>{p.name} &mdash; {p.categoryLabel}</option>))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                  <div className="relative">
                    <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="">Select a country...</option>
                      {countries.filter(c => !selectedProduct || products.find(p => p.id === selectedProduct)?.prices[c.code]).map(c => (<option key={c.code} value={c.code}>{c.flag} {c.name}</option>))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <button onClick={handleCheck} disabled={!selectedProduct || !selectedCountry} aria-label="Analyze price fairness" className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                <Search className="w-5 h-5" /> Analyze Price Fairness
              </button>
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
                      <button onClick={() => setShareModalOpen(true)} className="px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-medium flex items-center gap-1.5 hover:bg-indigo-100 transition-all"><Share2 className="w-4 h-4" /> Share</button>
                      <button onClick={() => setShowMethodology(!showMethodology)} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium flex items-center gap-1.5 hover:bg-gray-200 transition-all"><HelpCircle className="w-4 h-4" /> How we score</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-gray-50 text-center">
                      <p className="text-xs text-gray-500 mb-1">Your Price (USD)</p>
                      <p className="text-xl font-bold text-gray-900">{formatUSD(fairnessResult.priceUSD)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 text-center">
                      <p className="text-xs text-gray-500 mb-1">US Price</p>
                      <p className="text-xl font-bold text-indigo-600">{formatUSD(fairnessResult.usPrice)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 text-center">
                      <p className="text-xs text-gray-500 mb-1">Global Median</p>
                      <p className="text-xl font-bold text-purple-600">{formatUSD(fairnessResult.globalMedianUSD)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 text-center">
                      <p className="text-xs text-gray-500 mb-1">% of Median Income</p>
                      <p className="text-xl font-bold text-gray-900">{fairnessResult.incomePercentage.toFixed(2)}%</p>
                      <p className="text-xs text-gray-400">(US: {fairnessResult.usIncomePercentage.toFixed(2)}%)</p>
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
                    <ScoreGauge score={getScoreForLens(fairnessResult, activeLens)} size="lg" label={`${fairnessLenses.find(l => l.id === activeLens)?.label || ''} Score`} />
                  </div>
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
                      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 text-white mb-6">
                        <div className="flex items-center gap-2 mb-3"><Shield className="w-5 h-5" /><span className="font-bold">FairPrice</span></div>
                        <p className="text-2xl font-bold mb-1">{selectedProductData.name}</p>
                        <p className="text-white/80 text-sm mb-4">{selectedCountryData.flag} {selectedCountryData.name}</p>
                        <div className="flex items-center gap-4">
                          <div><p className="text-xs text-white/60">Local Price</p><p className="font-bold">{selectedCountryData.currencySymbol}{selectedProductData.prices[selectedCountry].localPrice.toLocaleString()}</p></div>
                          <div><p className="text-xs text-white/60">US Price</p><p className="font-bold">{formatUSD(fairnessResult.usPrice)}</p></div>
                          <div><p className="text-xs text-white/60">Fairness</p><p className="font-bold text-xl">{Math.round(getScoreForLens(fairnessResult, activeLens))}/100</p></div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 text-center">Screenshot this card and share on social media</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === 'compare' && (
        <section className="py-12 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">Global Price Comparison</h2>
              <p className="mt-2 text-gray-600">See how one product is priced across 30 countries</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select a Product</label>
              <div className="relative">
                <select value={compareProduct} onChange={e => setCompareProduct(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 appearance-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Choose a product to compare globally...</option>
                  {products.map(p => <option key={p.id} value={p.id}>{p.name} &mdash; {p.categoryLabel}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            {compareProduct && (() => {
              const product = products.find(p => p.id === compareProduct)
              if (!product) return null
              const rows = countries.filter(c => product.prices[c.code]).map(c => {
                const entry = product.prices[c.code]
                const usd = priceToUSD(entry.localPrice, c)
                const result = calculateFairness(product, c.code)
                return { country: c, entry, usd, result }
              }).sort((a, b) => a.usd - b.usd)
              const maxUSD = Math.max(...rows.map(r => r.usd))
              return (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Country</th>
                          <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">Local Price</th>
                          <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">USD Equiv.</th>
                          <th className="text-center px-6 py-4 text-sm font-semibold text-gray-700">PPP Score</th>
                          <th className="px-6 py-4 text-sm font-semibold text-gray-700">Relative Price</th>
                          <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">% Income</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row) => (
                          <tr key={row.country.code} className={`border-b border-gray-100 ${row.country.code === 'US' ? 'bg-indigo-50/50' : ''} hover:bg-gray-50`}>
                            <td className="px-6 py-4"><div className="flex items-center gap-2"><span className="text-lg">{row.country.flag}</span><span className="font-medium text-gray-900 text-sm">{row.country.name}</span></div></td>
                            <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">{row.country.currencySymbol}{row.entry.localPrice.toLocaleString()}</td>
                            <td className="px-6 py-4 text-right text-sm text-gray-600">{formatUSD(row.usd)}</td>
                            <td className="px-6 py-4"><div className="flex justify-center"><ScoreGauge score={row.result?.pppScore || 50} size="sm" /></div></td>
                            <td className="px-6 py-4"><div className="h-3 bg-gray-100 rounded-full overflow-hidden w-full min-w-24"><div className={`h-full rounded-full ${row.result && row.result.pppScore >= 60 ? 'bg-emerald-400' : row.result && row.result.pppScore >= 40 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${(row.usd / maxUSD) * 100}%` }} /></div></td>
                            <td className="px-6 py-4 text-right text-sm text-gray-600">{row.result ? row.result.incomePercentage.toFixed(2) : '-'}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            })()}
          </div>
        </section>
      )}

      {activeTab === 'quiz' && (
        <section className="py-12 sm:py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">Guess Which Country Pays More</h2>
              <p className="mt-2 text-gray-600">Test your intuition about global pricing</p>
              {quizTotal > 0 && (
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full">
                  <Trophy className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-semibold text-indigo-700">{quizScore}/{quizTotal} correct</span>
                </div>
              )}
            </div>
            {quizQuestion && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                <div className="text-center mb-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-3">{quizQuestion.product.categoryLabel}</span>
                  <h3 className="text-xl font-bold text-gray-900">{quizQuestion.product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{quizQuestion.product.description}</p>
                </div>
                <p className="text-center text-sm font-semibold text-gray-700 mb-6">Which country pays more (in USD)?</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {(['A', 'B'] as const).map(choice => {
                    const country = choice === 'A' ? quizQuestion.countryA : quizQuestion.countryB
                    const isCorrect = quizAnswer !== null && quizQuestion.answer === choice
                    const isWrong = quizAnswer === choice && quizQuestion.answer !== choice
                    const priceUSD = choice === 'A' ? quizQuestion.priceA_USD : quizQuestion.priceB_USD
                    return (
                      <button key={choice} onClick={() => answerQuiz(choice)} disabled={!!quizAnswer} className={`p-6 rounded-2xl border-2 text-center transition-all ${isCorrect ? 'border-emerald-500 bg-emerald-50' : isWrong ? 'border-red-500 bg-red-50' : quizAnswer ? 'border-gray-200 bg-gray-50' : 'border-gray-200 hover:border-indigo-400 hover:shadow-lg'}`}>
                        <span className="text-4xl block mb-2">{country.flag}</span>
                        <span className="font-bold text-gray-900 block">{country.name}</span>
                        {quizAnswer && (<span className="text-sm font-semibold text-gray-600 mt-2 block">{formatUSD(priceUSD)}</span>)}
                        {isCorrect && <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto mt-2" />}
                        {isWrong && <XCircle className="w-5 h-5 text-red-500 mx-auto mt-2" />}
                      </button>
                    )
                  })}
                </div>
                {quizAnswer && (
                  <div className="text-center">
                    <p className={`font-bold mb-4 ${quizAnswer === quizQuestion.answer ? 'text-emerald-600' : 'text-red-600'}`}>
                      {quizAnswer === quizQuestion.answer ? 'Correct!' : 'Not quite!'} {quizQuestion.product.name} costs {formatUSD(Math.max(quizQuestion.priceA_USD, quizQuestion.priceB_USD))} in {quizQuestion.answer === 'A' ? quizQuestion.countryA.name : quizQuestion.countryB.name} vs {formatUSD(Math.min(quizQuestion.priceA_USD, quizQuestion.priceB_USD))} in {quizQuestion.answer === 'A' ? quizQuestion.countryB.name : quizQuestion.countryA.name}.
                    </p>
                    <button onClick={() => { setQuizQuestion(generateQuizQuestion()); setQuizAnswer(null) }} className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all">Next Question</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === 'leaderboard' && (
        <section className="py-12 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">Fairness Leaderboard</h2>
              <p className="mt-2 text-gray-600">Countries ranked by average PPP-adjusted price fairness across all products</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {leaderboard.map((entry, i) => {
                const medal = i === 0 ? '\u{1F947}' : i === 1 ? '\u{1F948}' : i === 2 ? '\u{1F949}' : null
                return (
                  <div key={entry.country.code} className={`flex items-center gap-4 px-6 py-4 ${i < leaderboard.length - 1 ? 'border-b border-gray-100' : ''} ${i < 3 ? 'bg-amber-50/30' : ''} hover:bg-gray-50`}>
                    <div className="w-8 text-center">
                      {medal ? <span className="text-xl">{medal}</span> : <span className="text-sm font-bold text-gray-400">#{i + 1}</span>}
                    </div>
                    <span className="text-2xl">{entry.country.flag}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{entry.country.name}</p>
                      <p className="text-xs text-gray-500">{entry.country.region} &middot; {entry.productCount} products</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                        <div className={`h-full rounded-full ${entry.avgScore >= 60 ? 'bg-emerald-400' : entry.avgScore >= 40 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${entry.avgScore}%` }} />
                      </div>
                      <ScoreGauge score={entry.avgScore} size="sm" />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-indigo-700">Higher scores indicate better value for consumers. Rankings use PPP-adjusted scores, which account for local purchasing power. A high score doesn't mean "cheap" &mdash; it means prices are fair relative to what locals earn and can buy.</p>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'vsworld' && (
        <section className="py-12 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">Your Country vs The World</h2>
              <p className="mt-2 text-gray-600">See how your country's prices stack up across every product we track</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2" id="vs-country-label">Select Your Country</label>
              <div className="relative">
                <select aria-labelledby="vs-country-label" value={vsWorldCountry} onChange={e => setVsWorldCountry(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none">
                  <option value="">Choose your country...</option>
                  {countries.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            {vsWorldCountry && (() => {
              const country = countries.find(c => c.code === vsWorldCountry)
              if (!country) return null
              const comparison = getCountryComparison(vsWorldCountry)
              const globalStats = getGlobalStats()
              const avgScore = comparison.length > 0 ? comparison.reduce((sum, c) => sum + c.score, 0) / comparison.length : 50
              const bestDeals = comparison.filter(c => c.score >= 60).sort((a, b) => b.score - a.score).slice(0, 5)
              const worstDeals = comparison.filter(c => c.score < 40).sort((a, b) => a.score - b.score).slice(0, 5)
              return (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="text-center sm:text-left flex-1">
                        <span className="text-5xl block mb-2">{country.flag}</span>
                        <h3 className="text-2xl font-bold">{country.name}</h3>
                        <p className="text-white/70 text-sm mt-1">{country.region} &middot; {country.incomeGroup.replace('-', ' ')} income</p>
                      </div>
                      <div className="flex gap-6 text-center">
                        <div>
                          <p className="text-3xl font-bold">{Math.round(avgScore)}</p>
                          <p className="text-xs text-white/70">Avg Fairness</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold">{comparison.length}</p>
                          <p className="text-xs text-white/70">Products Tracked</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold">{country.vatRate}%</p>
                          <p className="text-xs text-white/70">VAT Rate</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      <div className="bg-white/10 rounded-xl p-3">
                        <p className="text-xs text-white/60">Median Income</p>
                        <p className="font-bold">${country.medianIncome.toLocaleString()}</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3">
                        <p className="text-xs text-white/60">PPP Factor</p>
                        <p className="font-bold">{country.pppFactor}x</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3">
                        <p className="text-xs text-white/60">Cost of Living</p>
                        <p className="font-bold">{country.costOfLivingIndex}/100</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3">
                        <p className="text-xs text-white/60">Import Duty Avg</p>
                        <p className="font-bold">{country.importDutyAvg}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl border border-emerald-200 p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingDown className="w-5 h-5 text-emerald-600" />
                        <h3 className="font-bold text-gray-900">Best Value Products</h3>
                      </div>
                      {bestDeals.length > 0 ? (
                        <div className="space-y-3">
                          {bestDeals.map(deal => (
                            <div key={deal.product.id} className="flex items-center gap-3">
                              <ScoreGauge score={deal.score} size="sm" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{deal.product.name}</p>
                                <p className="text-xs text-gray-500">{formatUSD(deal.priceUSD)} &middot; {deal.ratio < 1 ? `${Math.round((1 - deal.ratio) * 100)}% cheaper` : 'At parity'}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No products scored above 60 (good value) for this country.</p>
                      )}
                    </div>
                    <div className="bg-white rounded-2xl border border-red-200 p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-red-600" />
                        <h3 className="font-bold text-gray-900">Most Overpriced Products</h3>
                      </div>
                      {worstDeals.length > 0 ? (
                        <div className="space-y-3">
                          {worstDeals.map(deal => (
                            <div key={deal.product.id} className="flex items-center gap-3">
                              <ScoreGauge score={deal.score} size="sm" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{deal.product.name}</p>
                                <p className="text-xs text-gray-500">{formatUSD(deal.priceUSD)} &middot; {Math.round((deal.ratio - 1) * 100)}% more expensive</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No products scored below 40 (overpriced) for this country.</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">All Products Breakdown</h3>
                    <div className="space-y-2">
                      {comparison.map(item => {
                        const pct = Math.round((item.ratio - 1) * 100)
                        return (
                          <div key={item.product.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                            <div className="w-40 sm:w-56 truncate text-sm font-medium text-gray-900">{item.product.name}</div>
                            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full transition-all ${item.score >= 60 ? 'bg-emerald-400' : item.score >= 40 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${Math.min(item.score, 100)}%` }} />
                            </div>
                            <div className="w-12 text-right"><span className={`text-sm font-bold ${item.score >= 60 ? 'text-emerald-600' : item.score >= 40 ? 'text-amber-600' : 'text-red-600'}`}>{Math.round(item.score)}</span></div>
                            <div className="w-28 text-right text-xs text-gray-500">{pct > 0 ? `+${pct}%` : pct === 0 ? 'At parity' : `${pct}%`} vs US</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6 text-center">
                    <p className="text-sm text-indigo-700 mb-3">Share this comparison with friends</p>
                    <div className="bg-white rounded-xl border border-indigo-200 p-5 max-w-sm mx-auto">
                      <div className="flex items-center gap-2 justify-center mb-2"><Shield className="w-4 h-4 text-indigo-600" /><span className="font-bold text-indigo-600 text-sm">FairPrice</span></div>
                      <span className="text-3xl">{country.flag}</span>
                      <p className="font-bold text-gray-900 mt-1">{country.name}</p>
                      <p className="text-2xl font-bold mt-2">{Math.round(avgScore)}<span className="text-sm font-normal text-gray-400">/100</span></p>
                      <p className="text-xs text-gray-500 mt-1">Average fairness score across {comparison.length} products</p>
                      <p className="text-xs text-gray-400 mt-2">Global avg: {Math.round(globalStats.avgFairnessScore)} &middot; {globalStats.totalCountries} countries &middot; {globalStats.totalProducts} products</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">Screenshot this card to share on social media</p>
                  </div>
                </div>
              )
            })()}
          </div>
        </section>
      )}

      {activeTab === 'community' && (
        <section className="py-12 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">Community Price Reports</h2>
              <p className="mt-2 text-gray-600">Help improve pricing data. Submit prices, flag outdated info, and share local tips.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                { icon: DollarSign, label: 'Submit a Price', desc: 'Share what you actually paid' },
                { icon: Flag, label: 'Flag Outdated Data', desc: 'Report incorrect prices' },
                { icon: MessageSquare, label: 'Add Local Notes', desc: 'Share tips like "student discount available"' },
              ].map(item => (
                <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-5 text-center">
                  <item.icon className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Submit a Price Report</h3>
              {communitySubmitted ? (
                <div className="text-center py-10">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Thank you!</h4>
                  <p className="text-gray-600 mb-6">Your price report has been submitted for review. Community verification helps keep our data accurate.</p>
                  <button onClick={() => { setCommunitySubmitted(false); setCommunityName(''); setCommunityPrice(''); setCommunityNotes('') }} className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold">Submit Another</button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Product / Service</label>
                      <input type="text" value={communityName} onChange={e => setCommunityName(e.target.value)} placeholder="e.g. Netflix Standard, MRI Scan" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Price You Paid (local currency)</label>
                      <input type="text" value={communityPrice} onChange={e => setCommunityPrice(e.target.value)} placeholder="e.g. $15.49, 649 INR" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Notes (optional)</label>
                    <textarea value={communityNotes} onChange={e => setCommunityNotes(e.target.value)} placeholder="e.g. Student discount available, Price includes tax, Hospital name..." rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none" />
                  </div>
                  <button onClick={() => communityName && communityPrice && setCommunitySubmitted(true)} disabled={!communityName || !communityPrice} className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    <Zap className="w-4 h-4" /> Submit Price Report
                  </button>
                  <p className="text-xs text-gray-400 text-center">All submissions are reviewed before being added to our database. No personal data is stored.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {activeTab === 'methodology' && (
        <section className="py-12 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">How We Score Fairness</h2>
              <p className="mt-2 text-gray-600">No black boxes. Here is exactly how everything works.</p>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Scale className="w-5 h-5 text-indigo-600" /> The Four Fairness Lenses</h3>
                <p className="text-sm text-gray-600 mb-6">We believe no single metric captures "fairness." That is why we show four different perspectives:</p>
                <div className="space-y-4">
                  {fairnessLenses.map(lens => (
                    <div key={lens.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{lens.label}</h4>
                      <p className="text-sm text-gray-600">{lens.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-indigo-600" /> Score Calculation</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>Each lens produces a score from 0 to 100:</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-center"><p className="font-bold text-emerald-700">60-100</p><p className="text-xs text-emerald-600">Good value</p></div>
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-center"><p className="font-bold text-amber-700">40-60</p><p className="text-xs text-amber-600">Market rate</p></div>
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-center"><p className="font-bold text-red-700">0-40</p><p className="text-xs text-red-600">Overpriced</p></div>
                  </div>
                  <p>A score of 50 means the price exactly matches the US baseline after adjustments. The formula compares the adjusted local price to the US price and maps the ratio to a 0-100 scale.</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-indigo-600" /> Price Context Factors</h3>
                <p className="text-sm text-gray-600 mb-4">We identify and explain factors that legitimately affect pricing:</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: 'VAT / GST', desc: 'Sales taxes that are often included in the listed price' },
                    { label: 'Import Duties', desc: 'Tariffs on imported goods that increase local prices' },
                    { label: 'Distribution Costs', desc: 'Logistics, warehousing, and retail markups' },
                    { label: 'Purchasing Power', desc: 'How far local currency goes in the local economy' },
                    { label: 'Regulations', desc: 'Price controls, licensing requirements, or subsidies' },
                    { label: 'Market Structure', desc: 'Competition levels, monopolies, or oligopolies' },
                  ].map(f => (
                    <div key={f.label} className="p-3 rounded-lg border border-gray-200">
                      <p className="font-semibold text-gray-900 text-sm">{f.label}</p>
                      <p className="text-xs text-gray-500">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-indigo-600" /> Data Sources & Assumptions</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p><strong>Price data:</strong> Official brand websites, government consumer price databases, community reports, and publicly available pricing APIs.</p>
                  <p><strong>Economic indicators:</strong> World Bank PPP data, IMF cost of living indices, OECD median income statistics.</p>
                  <p><strong>Exchange rates:</strong> Approximate 2024 market rates. Real-time rates may differ slightly.</p>
                  <p><strong>Tax rates:</strong> Standard national VAT/GST rates. Reduced rates may apply to certain categories (food, medicine, etc.).</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-indigo-600" /> Our Principles</h3>
                <div className="space-y-3">
                  {[
                    { title: "Inform, don't accuse", desc: 'We show price disparities with context. We say "price disparity" not "price abuse."' },
                    { title: 'Multiple perspectives', desc: 'Different fairness lenses avoid oversimplification. A "high" price may be fair when context is considered.' },
                    { title: 'Transparent methodology', desc: 'Every calculation is explained. Click any score to see how it was derived.' },
                    { title: 'Community-driven', desc: 'Users can submit prices, flag outdated data, and add local context notes.' },
                    { title: 'Brand-friendly', desc: 'We highlight companies that price fairly and explain legitimate reasons for price differences.' },
                  ].map(p => (
                    <div key={p.title} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div><p className="font-semibold text-gray-900 text-sm">{p.title}</p><p className="text-sm text-gray-600">{p.desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-amber-800 mb-1">Important Disclaimer</p>
                  <p className="text-xs text-amber-700">FairPrice provides price disparity analysis based on publicly available data and estimates. This is not financial or legal advice. Prices are approximate and may not reflect current market conditions. Regional factors including taxes, regulations, import restrictions, and distribution costs legitimately affect pricing. We encourage users to verify prices with local sources before making purchasing decisions. FairPrice does not accuse any company of unfair pricing &mdash; we provide data and context for consumers to make informed decisions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      </main>
      <footer role="contentinfo" aria-label="Site footer" className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">FairPrice</span>
              </div>
              <p className="text-sm leading-relaxed max-w-md mb-4">The global price fairness checker. We help people understand pricing reality &mdash; not to accuse, but to inform. Knowledge is your best negotiating tool.</p>
              <p className="text-xs text-gray-500">Prices are estimates. This tool provides analysis, not accusations. Always verify with local sources.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm">
                {tabs.map(tab => (<li key={tab.id}><button onClick={() => { setActiveTab(tab.id); window.scrollTo(0, 0) }} className="hover:text-indigo-400 transition-colors">{tab.label}</button></li>))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm">
                {productCategories.filter(c => c.id !== 'all').map(cat => (<li key={cat.id}><button onClick={() => { setActiveTab('checker'); setCategoryFilter(cat.id); window.scrollTo(0, 0) }} className="hover:text-indigo-400 transition-colors">{cat.label}</button></li>))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>FairPrice &mdash; Global Price Fairness Checker. Built for consumers, by consumers.</p>
            <p className="text-xs text-gray-600 mt-2">Prices are estimates based on publicly available data. Not financial advice. Use at your own discretion.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
