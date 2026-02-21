import { useState, useEffect } from 'react'
import './App.css'
import {
  Shield, Globe, BarChart3, Search, Users, Store,
  Gamepad2, Trophy, BookOpen, Home, X, MapPin, Building2,
  Database, WifiOff, User, LogOut, LayoutDashboard, CreditCard,
} from 'lucide-react'
import { fetchStats, fetchMe, type AuthUser } from './api'
import { productCategories } from './data'
import type { TabId, ApiStats } from './types'

import { HomePage } from './components/HomePage'
import { PriceChecker } from './components/PriceChecker'
import { GlobalCompare } from './components/GlobalCompare'
import { VsWorld } from './components/VsWorld'
import { Quiz } from './components/Quiz'
import { Leaderboard } from './components/Leaderboard'
import { BrandIndex } from './components/BrandIndex'
import { Community } from './components/Community'
import { ProviderDirectory } from './components/ProviderDirectory'
import { Methodology } from './components/Methodology'
import { Dashboard } from './components/Dashboard'
import { AuthModal } from './components/AuthModal'
import { PricingPage } from './components/PricingPage'

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [apiConnected, setApiConnected] = useState<boolean | null>(null)
  const [apiStats, setApiStats] = useState<ApiStats | null>(null)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    fetchStats()
      .then(stats => { setApiConnected(true); setApiStats(stats) })
      .catch(() => setApiConnected(false))
    const token = localStorage.getItem('fairprice_token')
    if (token) {
      fetchMe()
        .then(u => setUser(u))
        .catch(() => { localStorage.removeItem('fairprice_token'); localStorage.removeItem('fairprice_user') })
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('fairprice_token')
    localStorage.removeItem('fairprice_user')
    setUser(null)
    setShowUserMenu(false)
    if (activeTab === 'dashboard') setActiveTab('home')
  }

  const tabs: { id: TabId; label: string; icon: typeof Globe }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'checker', label: 'Price Checker', icon: Search },
    { id: 'compare', label: 'Global Compare', icon: Globe },
    { id: 'vsworld', label: 'Your Country vs World', icon: MapPin },
    { id: 'quiz', label: 'Quiz', icon: Gamepad2 },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'brands', label: 'Brand Index', icon: Building2 },
    { id: 'providers', label: 'Providers', icon: Store },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'methodology', label: 'How We Score', icon: BookOpen },
    { id: 'pricing', label: 'Pricing', icon: CreditCard },
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
            <div className="flex items-center gap-2">
              {user ? (
                <div className="relative">
                  <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{(user.display_name || user.email)[0].toUpperCase()}</span>
                    </div>
                    <span className="hidden sm:inline">{user.display_name || user.email.split('@')[0]}</span>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
                      <button onClick={() => { setActiveTab('dashboard'); setShowUserMenu(false); setMobileMenuOpen(false) }} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </button>
                      <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={() => setShowAuthModal(true)} className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg transition-all">
                  <User className="w-4 h-4" /> Sign In
                </button>
              )}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <BarChart3 className="w-5 h-5" />}
              </button>
            </div>
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

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onAuth={(u) => { setUser(u); setShowAuthModal(false) }} />}

      <main id="main-content" role="main">
        {activeTab === 'home' && <HomePage setActiveTab={setActiveTab} />}
        {activeTab === 'checker' && <PriceChecker user={user} setActiveTab={setActiveTab} />}
        {activeTab === 'compare' && <GlobalCompare />}
        {activeTab === 'vsworld' && <VsWorld />}
        {activeTab === 'quiz' && <Quiz />}
        {activeTab === 'leaderboard' && <Leaderboard />}
        {activeTab === 'brands' && <BrandIndex />}
        {activeTab === 'providers' && <ProviderDirectory />}
        {activeTab === 'community' && <Community apiConnected={apiConnected} />}
        {activeTab === 'methodology' && <Methodology />}
        {activeTab === 'dashboard' && user && <Dashboard user={user} />}
        {activeTab === 'pricing' && <PricingPage onSubscribe={() => setActiveTab('checker')} />}
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
                {productCategories.filter(c => c.id !== 'all').map(cat => (<li key={cat.id}><button onClick={() => { setActiveTab('checker'); window.scrollTo(0, 0) }} className="hover:text-indigo-400 transition-colors">{cat.label}</button></li>))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>FairPrice &mdash; Global Price Fairness Checker. Built for consumers, by consumers.</p>
            <p className="text-xs text-gray-600 mt-2">Prices are estimates based on publicly available data. Not financial advice. Use at your own discretion.</p>
            <div className="mt-4 flex items-center justify-center gap-2">
              {apiConnected ? (
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-500"><Database className="w-3 h-3" /> API Connected{apiStats ? ` \u2014 ${apiStats.total_price_entries.toLocaleString()} price entries` : ''}</span>
              ) : apiConnected === false ? (
                <span className="inline-flex items-center gap-1.5 text-xs text-amber-500"><WifiOff className="w-3 h-3" /> Running in offline mode</span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-600"><Database className="w-3 h-3" /> Connecting...</span>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
