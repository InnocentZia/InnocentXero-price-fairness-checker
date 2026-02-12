import { Scale, Shield, CheckCircle, AlertTriangle, BookOpen } from 'lucide-react'
import { fairnessLenses } from '../data'

export function Methodology() {
  return (
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
                <div key={lens.id} className="p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{lens.label}</h4>
                  <p className="text-sm text-gray-600">{lens.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-indigo-600" /> Scoring System</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>Each product gets a fairness score from 0 to 100 for each lens. Here is what the scores mean:</p>
              <div className="grid grid-cols-3 gap-3 my-4">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                  <p className="text-lg font-bold text-emerald-600">60-100</p>
                  <p className="text-xs text-emerald-700 font-medium">Good Value</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
                  <p className="text-lg font-bold text-amber-600">40-60</p>
                  <p className="text-xs text-amber-700 font-medium">Market Rate</p>
                </div>
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-center">
                  <p className="text-lg font-bold text-red-600">0-40</p>
                  <p className="text-xs text-red-700 font-medium">Overpriced</p>
                </div>
              </div>
              <p>A score of 50 is the baseline — it means the price is roughly equivalent to what someone with the median US income pays. Higher scores indicate better value relative to the baseline.</p>
              <p>The baseline is the US because it has the most transparent pricing data. This does not mean US prices are "fair" — it means they are the reference point.</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Scale className="w-5 h-5 text-indigo-600" /> Factors We Consider</h3>
            <div className="space-y-3 text-sm text-gray-600">
              {[
                { factor: 'VAT / Sales Tax', desc: 'We show whether local prices include tax and at what rate. This is the most common reason for price differences.' },
                { factor: 'Import Duties', desc: 'Physical goods often carry import tariffs that vary by country. We factor this into our fairness calculation.' },
                { factor: 'Purchasing Power Parity (PPP)', desc: 'A Big Mac costs different amounts worldwide because local purchasing power differs. We adjust for this.' },
                { factor: 'Median Income', desc: 'A $15/month subscription means different things in the US vs. India. We show income-relative pricing.' },
                { factor: 'Cost of Living', desc: 'We use a composite cost-of-living index to contextualize prices relative to everyday expenses.' },
                { factor: 'Distribution & Logistics', desc: 'Physical goods have real shipping and distribution costs. Digital goods typically don\'t.' },
              ].map(f => (
                <div key={f.factor} className="p-3 rounded-xl bg-gray-50">
                  <p className="font-semibold text-gray-900">{f.factor}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-indigo-600" /> Data Sources</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Product prices:</strong> Official brand websites, authorized retailer sites, and community-verified reports.</p>
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
  )
}
