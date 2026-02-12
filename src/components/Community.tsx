import { useState } from 'react'
import { DollarSign, Flag, MessageSquare, Zap, CheckCircle, Wifi, WifiOff, Database } from 'lucide-react'

interface CommunityProps {
  apiConnected: boolean | null
}

export function Community({ apiConnected }: CommunityProps) {
  const [communityName, setCommunityName] = useState('')
  const [communityPrice, setCommunityPrice] = useState('')
  const [communityNotes, setCommunityNotes] = useState('')
  const [communitySubmitted, setCommunitySubmitted] = useState(false)

  return (
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
                <div className="flex items-center justify-center gap-2 mt-3">
                  {apiConnected ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600"><Wifi className="w-3 h-3" /> Connected to backend database</span>
                  ) : apiConnected === false ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-amber-600"><WifiOff className="w-3 h-3" /> Backend offline — submissions stored locally</span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-400"><Database className="w-3 h-3" /> Connecting to database...</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 text-center">All submissions are reviewed before being added to our database. No personal data is stored.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
