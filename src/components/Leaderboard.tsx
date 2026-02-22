import { Info } from 'lucide-react'
import { ScoreGauge } from './ScoreGauge'
import { getLeaderboard } from '../data'

export function Leaderboard() {
  const leaderboard = getLeaderboard()

  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Fairness Leaderboard</h2>
          <p className="mt-2 text-gray-600">Countries ranked by average PPP-adjusted price fairness across all products</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {leaderboard.map((entry, i) => {
            const medal = i === 0 ? '\u{1F947}' : i === 1 ? '\u{1F948}' : i === 2 ? '\u{1F949}' : null
            return (
              <div key={entry.country.code} className={`flex items-center gap-4 px-6 py-4 ${i < leaderboard.length - 1 ? 'border-b border-gray-100' : ''} ${i < 3 ? 'bg-amber-50/30' : ''} hover:bg-gray-50`}>
                <div className="w-8 text-center">
                  {medal ? <span className="text-xl">{medal}</span> : <span className="text-sm font-bold text-gray-400">#{i + 1}</span>}
                </div>
                <span className="text-2xl">{entry.country.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{entry.country.name}</p>
                  <p className="text-xs text-gray-500">{entry.country.region} &middot; {entry.productCount} products</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                    <div className={`h-full rounded-full ${entry.avgScore >= 60 ? 'bg-emerald-400' : entry.avgScore >= 40 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${entry.avgScore}%` }} />
                  </div>
                  <ScoreGauge score={entry.avgScore} size="sm" />
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-indigo-700">Higher scores indicate better value for consumers. Rankings use PPP-adjusted scores, which account for local purchasing power. A high score doesn't mean "cheap" &mdash; it means prices are fair relative to what locals earn and can buy.</p>
        </div>
      </div>
    </section>
  )
}
