import { useState, useEffect } from 'react'
import { Heart, Bell, Trash2, TrendingDown, TrendingUp, Minus, Plus } from 'lucide-react'
import {
  fetchSavedProducts, unsaveProduct, fetchPriceAlerts, deletePriceAlert,
  createPriceAlert,
  type SavedProduct, type PriceAlert, type AuthUser
} from '../api'
import { products, countries, calculateFairness } from '../data'

interface DashboardProps {
  user: AuthUser
}

export function Dashboard({ user }: DashboardProps) {
  const [tab, setTab] = useState<'saved' | 'alerts'>('saved')
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([])
  const [alerts, setAlerts] = useState<PriceAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [alertProductId, setAlertProductId] = useState('')
  const [alertCountry, setAlertCountry] = useState('')
  const [alertPrice, setAlertPrice] = useState('')
  const [alertType, setAlertType] = useState('below')
  const [showAlertForm, setShowAlertForm] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [sp, al] = await Promise.all([fetchSavedProducts(), fetchPriceAlerts()])
      setSavedProducts(sp.saved_products)
      setAlerts(al.alerts)
    } catch {
    } finally {
      setLoading(false)
    }
  }

  const handleUnsave = async (productId: string, countryCode: string) => {
    try {
      await unsaveProduct(productId, countryCode)
      setSavedProducts(prev => prev.filter(sp => !(sp.product_id === productId && sp.country_code === countryCode)))
    } catch {
    }
  }

  const handleDeleteAlert = async (alertId: number) => {
    try {
      await deletePriceAlert(alertId)
      setAlerts(prev => prev.filter(a => a.id !== alertId))
    } catch {
    }
  }

  const handleCreateAlert = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!alertProductId || !alertCountry || !alertPrice) return
    try {
      await createPriceAlert(alertProductId, alertCountry, parseFloat(alertPrice), alertType)
      setShowAlertForm(false)
      setAlertProductId('')
      setAlertCountry('')
      setAlertPrice('')
      loadData()
    } catch {
    }
  }

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.display_name || user.email.split('@')[0]}</h1>
          <p className="text-gray-500 mt-1">Track prices and get alerts for products you care about</p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab('saved')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'saved' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
          >
            <Heart className="w-4 h-4" /> Saved Products ({savedProducts.length})
          </button>
          <button
            onClick={() => setTab('alerts')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'alerts' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
          >
            <Bell className="w-4 h-4" /> Price Alerts ({alerts.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : tab === 'saved' ? (
          <div>
            {savedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">No saved products yet</h3>
                <p className="text-gray-500 mt-1">Save products from the Price Checker to track them here</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {savedProducts.map(sp => {
                  const product = products.find(p => p.id === sp.product_id)
                  const fairness = product ? calculateFairness(product, sp.country_code) : null
                  return (
                    <div key={sp.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{sp.flag}</span>
                          <h3 className="font-semibold text-gray-900 truncate">{sp.product_name}</h3>
                          {sp.brand && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{sp.brand}</span>}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{sp.country_name}</p>
                        {fairness && (
                          <div className="flex items-center gap-3 mt-2">
                            <span className={`text-sm font-semibold ${fairness.pppScore >= 60 ? 'text-emerald-600' : fairness.pppScore >= 40 ? 'text-amber-600' : 'text-red-600'}`}>
                              Score: {Math.round(fairness.pppScore)}/100
                            </span>
                            <span className="text-xs text-gray-400">
                              ${fairness.priceUSD.toFixed(2)} USD
                            </span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleUnsave(sp.product_id, sp.country_code)}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Price Alerts</h3>
              <button
                onClick={() => setShowAlertForm(!showAlertForm)}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-4 h-4" /> New Alert
              </button>
            </div>

            {showAlertForm && (
              <form onSubmit={handleCreateAlert} className="bg-white rounded-xl border border-gray-200 p-5 mb-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Product</label>
                    <select
                      value={alertProductId}
                      onChange={e => setAlertProductId(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      required
                    >
                      <option value="">Select product</option>
                      {products.slice(0, 50).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Country</label>
                    <select
                      value={alertCountry}
                      onChange={e => setAlertCountry(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      required
                    >
                      <option value="">Select country</option>
                      {countries.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Target Price (USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={alertPrice}
                      onChange={e => setAlertPrice(e.target.value)}
                      placeholder="e.g. 9.99"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Alert When</label>
                    <select
                      value={alertType}
                      onChange={e => setAlertType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    >
                      <option value="below">Price drops below</option>
                      <option value="above">Price rises above</option>
                      <option value="any">Any price change</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold">Create Alert</button>
                  <button type="button" onClick={() => setShowAlertForm(false)} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm">Cancel</button>
                </div>
              </form>
            )}

            {alerts.length === 0 && !showAlertForm ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">No price alerts</h3>
                <p className="text-gray-500 mt-1">Create alerts to get notified when prices change</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {alerts.map(alert => (
                  <div key={alert.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{alert.flag}</span>
                        <h3 className="font-semibold text-gray-900 truncate">{alert.product_name}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{alert.country_name}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                          {alert.alert_type === 'below' ? <TrendingDown className="w-3 h-3" /> : alert.alert_type === 'above' ? <TrendingUp className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                          {alert.alert_type === 'below' ? 'Below' : alert.alert_type === 'above' ? 'Above' : 'Any change'} ${alert.target_price}
                        </span>
                        {alert.triggered ? (
                          <span className="text-xs text-emerald-600 font-medium">Triggered</span>
                        ) : (
                          <span className="text-xs text-gray-400">Watching</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteAlert(alert.id)}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="Delete alert"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
