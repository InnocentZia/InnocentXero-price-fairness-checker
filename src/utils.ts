import type { FairnessResult } from './data'

export function getScoreForLens(result: FairnessResult, lensId: string): number {
  switch (lensId) {
    case 'raw': return result.rawScore
    case 'ppp': return result.pppScore
    case 'income': return result.incomeScore
    case 'col': return result.colScore
    default: return result.pppScore
  }
}

export function formatUSD(n: number): string {
  return `$${n < 1 ? n.toFixed(2) : n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
}
