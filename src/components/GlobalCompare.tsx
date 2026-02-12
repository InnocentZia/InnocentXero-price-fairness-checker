import { ChevronDown } from 'lucide-react'
import { ScoreGauge } from './ScoreGauge'
import { formatUSD } from '../utils'
import {
  countries, products, calculateFairness, priceToUSD,
} from '../data'
import { useState } from 'react'

export function GlobalCompare() {
  const [compareProduct, setCompareProduct] = useState('')

  return (
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
  )
}
