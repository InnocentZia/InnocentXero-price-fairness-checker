export function FairnessBar({ score, label, description, active }: { score: number; label: string; description: string; active: boolean }) {
  const color = score >= 60 ? 'bg-emerald-500' : score >= 40 ? 'bg-amber-500' : 'bg-red-500'
  const textColor = score >= 60 ? 'text-emerald-700' : score >= 40 ? 'text-amber-700' : 'text-red-700'
  const verdict = score >= 60 ? 'Good value' : score >= 40 ? 'Market rate' : 'Overpriced'
  return (
    <div className={`p-4 rounded-xl border transition-all ${active ? 'border-indigo-300 bg-indigo-50/50 shadow-sm' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-900">{label}</span>
        <span className={`text-xs font-semibold ${textColor} px-2 py-0.5 rounded-full ${score >= 60 ? 'bg-emerald-100' : score >= 40 ? 'bg-amber-100' : 'bg-red-100'}`}>{verdict}</span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-2">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${score}%` }} />
      </div>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  )
}
