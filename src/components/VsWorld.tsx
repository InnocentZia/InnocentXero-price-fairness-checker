import { useState } from 'react'
import { ChevronDown, TrendingUp, TrendingDown, Shield } from 'lucide-react'
import { ScoreGauge } from './ScoreGauge'
import { formatUSD } from '../utils'
import { countries, getCountryComparison, getGlobalStats } from '../data'

export function VsWorld() {
  const [vsWorldCountry, setVsWorldCountry] = useState('')

  return (
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
  )
}
