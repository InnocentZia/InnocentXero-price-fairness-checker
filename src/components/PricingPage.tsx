import { useState } from 'react'
import { Check, X, Zap, Crown, Building2, ArrowRight, Shield } from 'lucide-react'
import { getSubscriptionTier, setSubscriptionTier, getDailySearchCount } from '../utils'
import type { SubscriptionTier } from '../types'

interface PricingPageProps {
  onSubscribe?: () => void
}

export function PricingPage({ onSubscribe }: PricingPageProps) {
  const [currentTier, setCurrentTier] = useState<SubscriptionTier>(getSubscriptionTier())
  const [showConfirm, setShowConfirm] = useState<SubscriptionTier | null>(null)
  const searchesUsed = getDailySearchCount()

  const handleSubscribe = (tier: SubscriptionTier) => {
    setSubscriptionTier(tier)
    setCurrentTier(tier)
    setShowConfirm(null)
    onSubscribe?.()
  }

  const tiers = [
    {
      id: 'free' as const,
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Basic price checking for casual users',
      icon: Shield,
      color: 'gray',
      features: [
        { label: '25 searches per day', included: true },
        { label: 'Basic fairness verdict', included: true },
        { label: 'Price distribution chart', included: true },
        { label: '30 countries', included: true },
        { label: 'Community submissions', included: true },
        { label: 'Historical price trends', included: false },
        { label: 'Price predictions', included: false },
        { label: 'Statistical insights', included: false },
        { label: 'Price alerts', included: false },
        { label: 'Export reports (PDF/CSV)', included: false },
        { label: 'API access', included: false },
      ],
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      price: '$9.99',
      period: '/month',
      description: 'Advanced analytics for smart shoppers',
      icon: Zap,
      color: 'indigo',
      popular: true,
      features: [
        { label: 'Unlimited searches', included: true },
        { label: 'All fairness lenses', included: true },
        { label: 'Price distribution chart', included: true },
        { label: '30 countries', included: true },
        { label: 'Community submissions', included: true },
        { label: 'Historical price trends', included: true },
        { label: 'Price predictions (3 & 6 mo)', included: true },
        { label: 'Statistical insights & CI', included: true },
        { label: 'Price alerts (unlimited)', included: true },
        { label: 'Export reports (PDF/CSV)', included: true },
        { label: 'API access', included: false },
      ],
    },
    {
      id: 'business' as const,
      name: 'Business',
      price: '$29.99',
      period: '/month',
      description: 'Market intelligence for professionals',
      icon: Crown,
      color: 'purple',
      features: [
        { label: 'Unlimited searches', included: true },
        { label: 'All fairness lenses', included: true },
        { label: 'Price distribution chart', included: true },
        { label: '30 countries', included: true },
        { label: 'Community submissions', included: true },
        { label: 'Historical price trends', included: true },
        { label: 'Price predictions (3 & 6 mo)', included: true },
        { label: 'Statistical insights & CI', included: true },
        { label: 'Price alerts (unlimited)', included: true },
        { label: 'Export reports (PDF/CSV)', included: true },
        { label: 'API access + bulk checking', included: true },
      ],
    },
  ]

  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Choose Your Plan</h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Get deeper insights into global pricing. Free users get {25 - searchesUsed} searches remaining today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map(tier => {
            const isActive = currentTier === tier.id
            const TierIcon = tier.icon
            return (
              <div
                key={tier.id}
                className={`relative rounded-2xl border-2 p-6 sm:p-8 transition-all ${
                  tier.popular
                    ? 'border-indigo-500 shadow-xl shadow-indigo-100 scale-105'
                    : isActive
                    ? 'border-emerald-400 shadow-lg'
                    : 'border-gray-200'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold uppercase tracking-wide">
                    Most Popular
                  </div>
                )}
                {isActive && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase tracking-wide">
                    Current Plan
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${
                    tier.color === 'indigo' ? 'bg-indigo-100' : tier.color === 'purple' ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    <TierIcon className={`w-6 h-6 ${
                      tier.color === 'indigo' ? 'text-indigo-600' : tier.color === 'purple' ? 'text-purple-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{tier.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-extrabold text-gray-900">{tier.price}</span>
                    <span className="text-gray-500 text-sm">{tier.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map(f => (
                    <li key={f.label} className={`flex items-start gap-2.5 text-sm ${f.included ? 'text-gray-700' : 'text-gray-400'}`}>
                      {f.included ? (
                        <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0" />
                      )}
                      {f.label}
                    </li>
                  ))}
                </ul>
                {isActive ? (
                  <button disabled className="w-full py-3 rounded-xl border-2 border-emerald-400 text-emerald-700 font-semibold bg-emerald-50 cursor-default">
                    Active Plan
                  </button>
                ) : (
                  <button
                    onClick={() => setShowConfirm(tier.id)}
                    className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                      tier.popular
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
                        : tier.color === 'purple'
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {tier.id === 'free' ? 'Downgrade' : 'Upgrade'} <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-8">Feature Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Feature</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-500">Free</th>
                  <th className="text-center py-3 px-4 font-semibold text-indigo-600">Premium</th>
                  <th className="text-center py-3 px-4 font-semibold text-purple-600">Business</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Daily searches', free: '25', premium: 'Unlimited', business: 'Unlimited' },
                  { feature: 'Countries', free: '30', premium: '30', business: '30' },
                  { feature: 'Products', free: '2,250+', premium: '2,250+', business: '2,250+' },
                  { feature: 'Fairness lenses', free: '4', premium: '4', business: '4' },
                  { feature: 'Price trends', free: 'Basic', premium: '12-month', business: '12-month' },
                  { feature: 'Price predictions', free: '-', premium: '3 & 6 month', business: '3 & 6 month' },
                  { feature: 'Confidence intervals', free: '-', premium: 'Yes', business: 'Yes' },
                  { feature: 'Price alerts', free: '-', premium: 'Unlimited', business: 'Unlimited' },
                  { feature: 'Export (PDF/CSV)', free: '-', premium: 'Yes', business: 'Yes' },
                  { feature: 'API access', free: '-', premium: '-', business: 'Full REST API' },
                  { feature: 'Bulk price checking', free: '-', premium: '-', business: 'Up to 1,000/day' },
                  { feature: 'Market reports', free: '-', premium: '-', business: 'Monthly' },
                  { feature: 'White-label reports', free: '-', premium: '-', business: 'Yes' },
                  { feature: 'Support', free: 'Community', premium: 'Email', business: 'Priority' },
                ].map(row => (
                  <tr key={row.feature} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900 font-medium">{row.feature}</td>
                    <td className="py-3 px-4 text-center text-gray-500">{row.free}</td>
                    <td className="py-3 px-4 text-center text-indigo-600 font-medium">{row.premium}</td>
                    <td className="py-3 px-4 text-center text-purple-600 font-medium">{row.business}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-center text-white">
          <Building2 className="w-10 h-10 mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-2">Need Enterprise Solutions?</h3>
          <p className="text-white/80 max-w-xl mx-auto mb-6">Custom pricing dashboards, competitive intelligence tools, procurement system integrations, and dedicated account management.</p>
          <button className="px-8 py-3 rounded-xl bg-white text-indigo-700 font-bold hover:bg-gray-100 transition-all">
            Contact Sales
          </button>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>All plans include a 14-day money-back guarantee. Cancel anytime.</p>
          <p className="mt-1">Prices may vary by region. Payment processing powered by Stripe.</p>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowConfirm(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {showConfirm === 'free' ? 'Downgrade to Free?' : `Upgrade to ${showConfirm === 'premium' ? 'Premium' : 'Business'}?`}
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              {showConfirm === 'free'
                ? 'You will lose access to premium features.'
                : `This is a demo — in production, you'd be redirected to Stripe checkout for ${showConfirm === 'premium' ? '$9.99' : '$29.99'}/month.`}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(null)} className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
              <button onClick={() => handleSubscribe(showConfirm)} className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">
                {showConfirm === 'free' ? 'Downgrade' : 'Activate (Demo)'}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-4">In production, this would connect to Stripe for secure payment processing.</p>
          </div>
        </div>
      )}
    </section>
  )
}
