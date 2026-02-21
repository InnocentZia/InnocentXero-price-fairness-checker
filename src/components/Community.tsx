import { useState } from 'react'
import { DollarSign, Flag, MessageSquare, Zap, CheckCircle, Wifi, WifiOff, Database, Star, Award, Shield, Globe, Target, Flame, Crown, Trophy } from 'lucide-react'
import { contributorBadges, getContributorLevel } from '../data'

interface CommunityProps {
  apiConnected: boolean | null
}

const BADGE_ICONS: Record<string, typeof Star> = {
  star: Star, globe: Globe, award: Award, shield: Shield,
  crown: Crown, map: Globe, target: Target, flame: Flame,
}

const mockLeaderboard = [
  { name: 'PriceHunter42', submissions: 347, countries: 12, accuracy: 94, level: 4 },
  { name: 'FairDealFinder', submissions: 289, countries: 8, accuracy: 91, level: 3 },
  { name: 'GlobalShopper', submissions: 215, countries: 15, accuracy: 88, level: 3 },
  { name: 'MarketWatcher', submissions: 178, countries: 6, accuracy: 96, level: 3 },
  { name: 'DealSeeker_EU', submissions: 142, countries: 9, accuracy: 85, level: 3 },
  { name: 'PriceScout_Asia', submissions: 98, countries: 7, accuracy: 92, level: 2 },
  { name: 'ValueCheck', submissions: 76, countries: 4, accuracy: 89, level: 2 },
  { name: 'SmartBuyer', submissions: 54, countries: 3, accuracy: 87, level: 2 },
  { name: 'PennyWise', submissions: 31, countries: 2, accuracy: 90, level: 2 },
  { name: 'NewContrib', submissions: 8, countries: 1, accuracy: 100, level: 2 },
]

export function Community({ apiConnected }: CommunityProps) {
  const [communityName, setCommunityName] = useState('')
  const [communityPrice, setCommunityPrice] = useState('')
  const [communityNotes, setCommunityNotes] = useState('')
  const [communitySubmitted, setCommunitySubmitted] = useState(false)
  const [activeSection, setActiveSection] = useState<'submit' | 'badges' | 'leaderboard'>('submit')

  const userSubmissions = parseInt(localStorage.getItem('fairprice_submissions') || '0', 10)
  const userLevel = getContributorLevel(userSubmissions)

  const handleSubmit = () => {
    if (!communityName || !communityPrice) return
    const count = userSubmissions + 1
    localStorage.setItem('fairprice_submissions', String(count))
    setCommunitySubmitted(true)
  }

  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Community Price Reports</h2>
          <p className="mt-2 text-gray-600">Help improve pricing data. Earn badges and climb the contributor leaderboard.</p>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-lg">Level {userLevel.level}: {userLevel.title}</p>
                <p className="text-white/70 text-sm">{userSubmissions} submissions</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/60">Next: {userLevel.nextLevel} submissions</p>
              <p className="text-sm font-semibold">{userLevel.progress}%</p>
            </div>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white/80 rounded-full transition-all" style={{ width: `${userLevel.progress}%` }} />
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {([
            { id: 'submit' as const, label: 'Submit Prices', icon: DollarSign },
            { id: 'badges' as const, label: 'Badges', icon: Award },
            { id: 'leaderboard' as const, label: 'Top Contributors', icon: Trophy },
          ]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeSection === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {activeSection === 'submit' && (
          <>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                { icon: DollarSign, label: 'Submit a Price', desc: 'Share what you actually paid', points: '+10 pts' },
                { icon: Flag, label: 'Flag Outdated Data', desc: 'Report incorrect prices', points: '+5 pts' },
                { icon: MessageSquare, label: 'Add Local Notes', desc: 'Share tips like "student discount available"', points: '+3 pts' },
              ].map(item => (
                <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-5 text-center">
                  <item.icon className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">{item.points}</span>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Submit a Price Report</h3>
              {communitySubmitted ? (
                <div className="text-center py-10">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Thank you!</h4>
                  <p className="text-gray-600 mb-2">Your price report has been submitted for review.</p>
                  <p className="text-sm text-indigo-600 font-semibold mb-6">+10 points earned!</p>
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
                  <button onClick={handleSubmit} disabled={!communityName || !communityPrice} className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    <Zap className="w-4 h-4" /> Submit Price Report (+10 pts)
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
          </>
        )}

        {activeSection === 'badges' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Achievement Badges</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {contributorBadges.map(badge => {
                const IconComp = BADGE_ICONS[badge.icon] || Star
                const earned = badge.id === 'first-report' ? userSubmissions >= 1
                  : badge.id === 'explorer' ? userSubmissions >= 5
                  : badge.id === 'contributor' ? userSubmissions >= 25
                  : badge.id === 'expert' ? userSubmissions >= 100
                  : badge.id === 'legend' ? userSubmissions >= 500
                  : false
                return (
                  <div key={badge.id} className={`p-4 rounded-xl border ${earned ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200' : 'bg-gray-50 border-gray-200 opacity-60'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${earned ? 'bg-amber-100' : 'bg-gray-200'}`}>
                        <IconComp className={`w-5 h-5 ${earned ? 'text-amber-600' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{badge.label}</p>
                        <p className="text-xs text-gray-500">{badge.requirement}</p>
                      </div>
                      {earned && <span className="ml-auto text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Earned</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeSection === 'leaderboard' && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Top Contributors</h3>
              <p className="text-sm text-gray-500">Community members ranked by submissions and accuracy</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">#</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Contributor</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Submissions</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Countries</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Accuracy</th>
                    <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeaderboard.map((entry, i) => (
                    <tr key={entry.name} className={`border-b border-gray-100 ${i < 3 ? 'bg-amber-50/30' : ''} hover:bg-gray-50`}>
                      <td className="px-6 py-3">
                        <span className={`text-sm font-bold ${i === 0 ? 'text-amber-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-amber-700' : 'text-gray-500'}`}>
                          {i + 1}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{entry.name[0]}</span>
                          </div>
                          <span className="font-semibold text-gray-900 text-sm">{entry.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-right text-sm font-medium text-gray-900">{entry.submissions}</td>
                      <td className="px-6 py-3 text-right text-sm text-gray-600">{entry.countries}</td>
                      <td className="px-6 py-3 text-right">
                        <span className={`text-sm font-medium ${entry.accuracy >= 90 ? 'text-emerald-600' : 'text-gray-600'}`}>{entry.accuracy}%</span>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">Lv.{entry.level}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
