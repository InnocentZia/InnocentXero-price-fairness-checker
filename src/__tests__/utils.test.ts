import { describe, it, expect } from 'vitest'
import { formatUSD, fuzzyMatch, removeIQROutliers } from '../utils'

describe('formatUSD', () => {
  it('formats small values with 2 decimal places', () => {
    expect(formatUSD(0.5)).toBe('$0.50')
    expect(formatUSD(0.99)).toBe('$0.99')
  })

  it('formats large values without decimals', () => {
    expect(formatUSD(1000)).toBe('$1,000')
    expect(formatUSD(42)).toBe('$42')
  })

  it('formats edge case of exactly 1', () => {
    expect(formatUSD(1)).toBe('$1')
  })
})

describe('fuzzyMatch', () => {
  it('returns 100 for exact match', () => {
    expect(fuzzyMatch('iphone', 'iphone')).toBe(100)
  })

  it('returns 90 for prefix match', () => {
    expect(fuzzyMatch('iph', 'iphone 15')).toBe(90)
  })

  it('returns 80 for substring match', () => {
    expect(fuzzyMatch('phone', 'iphone 15')).toBe(80)
  })

  it('returns high score for multi-word match', () => {
    expect(fuzzyMatch('iphone 15', 'apple iphone 15 pro')).toBeGreaterThanOrEqual(70)
  })

  it('returns 1 for empty query', () => {
    expect(fuzzyMatch('', 'anything')).toBe(1)
  })

  it('returns 0 for no match', () => {
    expect(fuzzyMatch('xyz123', 'iphone')).toBe(0)
  })

  it('is case insensitive', () => {
    expect(fuzzyMatch('IPHONE', 'iphone')).toBe(100)
  })
})

describe('removeIQROutliers', () => {
  it('returns original array if fewer than 4 values', () => {
    expect(removeIQROutliers([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('removes extreme outliers', () => {
    const values = [10, 12, 11, 13, 12, 11, 10, 100]
    const result = removeIQROutliers(values)
    expect(result).not.toContain(100)
  })

  it('keeps values within IQR range', () => {
    const values = [10, 11, 12, 13, 14, 15]
    const result = removeIQROutliers(values)
    expect(result.length).toBe(6)
  })
})
