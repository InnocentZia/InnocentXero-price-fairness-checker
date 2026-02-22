import { useState, useEffect } from 'react'
import { Search, X, Info } from 'lucide-react'
import { ScoreGauge } from './ScoreGauge'
import { countries, getBrandFairnessIndex, type BrandFairnessEntry } from '../data'

export function BrandIndex() {
  const [brandFilter, setBrandFilter] = useState('')
  const [brandIndex, setBrandIndex] = useState<BrandFairnessEntry[]>([])

  useEffect(() => {
    setBrandIndex(getBrandFairnessIndex())
  }, [])

  const filtered = brandIndex.filter(b => !brandFilter || b.brand.toLowerCase().includes(brandFilter.toLowerCase()))

  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Brand Fairness Index</h2>
          <p className="mt-2 text-gray-600">How fairly do major brands price their products across the globe?</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input type="text" value={brandFilter} onChange={e => setBrandFilter(e.target.value)} placeholder="Search brands..." className="flex-1 text-sm outline-none" />
            {brandFilter && <button onClick={() => setBrandFilter('')} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-12 gap-2 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Brand</div>
            <div className="col-span-2 text-center">Avg Score</div>
            <div className="col-span-2 text-center">Products</div>
            <div className="col-span-2 text-center">Best Market</div>
            <div className="col-span-2 text-center">Worst Market</div>
          </div>
          {filtered.map((entry, i) => {
            const bestCountry = countries.find(c => c.code === entry.bestCountry)
            const worstCountry = countries.find(c => c.code === entry.worstCountry)
            return (
              <div key={entry.brand} className={`grid grid-cols-12 gap-2 px-6 py-3 items-center ${i % 2 === 0 ? '' : 'bg-gray-50/50'} border-b border-gray-100 last:border-0 hover:bg-indigo-50/30`}>
                <div className="col-span-1 text-sm font-bold text-gray-400">#{i + 1}</div>
                <div className="col-span-3">
                  <p className="text-sm font-semibold text-gray-900 truncate">{entry.brand}</p>
                  <p className="text-xs text-gray-400">{entry.category}</p>
                </div>
                <div className="col-span-2 flex justify-center"><ScoreGauge score={entry.avgScore} size="sm" /></div>
                <div className="col-span-2 text-center text-sm text-gray-600">{entry.productCount}</div>
                <div className="col-span-2 text-center text-xs text-gray-600">{bestCountry ? `${bestCountry.flag} ${bestCountry.name}` : entry.bestCountry}</div>
                <div className="col-span-2 text-center text-xs text-gray-600">{worstCountry ? `${worstCountry.flag} ${worstCountry.name}` : entry.worstCountry}</div>
              </div>
            )
          })}
          {filtered.length === 0 && (
            <div className="px-6 py-10 text-center text-gray-400 text-sm">No brands match your search</div>
          )}
        </div>
        <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-indigo-700">The Brand Fairness Index measures how consistently a brand prices its products across different markets, adjusted for purchasing power parity. Higher scores indicate more equitable global pricing. This is not an accusation of unfairness &mdash; regional pricing differences are often driven by taxes, import duties, and distribution costs.</p>
        </div>
      </div>
    </section>
  )
}
