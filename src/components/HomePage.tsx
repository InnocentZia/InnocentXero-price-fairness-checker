import {
  Globe, ArrowRight, Gamepad2, Scale, Eye, FileText, Users,
  Monitor, Package, Cloud, ShoppingBasket, Wrench, Stethoscope,
} from 'lucide-react'
import type { TabId } from '../types'

export function HomePage({ setActiveTab }: { setActiveTab: (tab: TabId) => void }) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 sm:py-32">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-8">
            <Globe className="w-4 h-4" />
            30 countries &middot; 2,250 products &middot; Multiple fairness lenses
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
              { stat: '2,250', label: 'Products & Services' },
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
  )
}
