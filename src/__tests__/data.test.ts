import { describe, it, expect } from 'vitest'
import { countries, products, productCategories, calculateFairness } from '../data'

describe('data integrity', () => {
  it('has at least 30 countries', () => {
    expect(countries.length).toBeGreaterThanOrEqual(30)
  })

  it('each country has required fields', () => {
    for (const c of countries) {
      expect(c.code).toBeTruthy()
      expect(c.name).toBeTruthy()
      expect(c.currency).toBeTruthy()
      expect(c.exchangeRate).toBeGreaterThan(0)
      expect(c.pppFactor).toBeGreaterThan(0)
      expect(c.medianIncome).toBeGreaterThan(0)
    }
  })

  it('has products across multiple categories', () => {
    const cats = new Set(products.map(p => p.category))
    expect(cats.size).toBeGreaterThanOrEqual(6)
  })

  it('each product has prices for at least one country', () => {
    for (const p of products) {
      expect(Object.keys(p.prices).length).toBeGreaterThan(0)
    }
  })

  it('product categories include an "all" option', () => {
    expect(productCategories.find(c => c.id === 'all')).toBeTruthy()
  })
})

describe('calculateFairness', () => {
  it('returns a valid result for a known product/country', () => {
    const product = products[0]
    const countryCode = Object.keys(product.prices)[0]
    const result = calculateFairness(product, countryCode)
    expect(result).not.toBeNull()
    if (!result) return
    expect(result.priceUSD).toBeGreaterThan(0)
    expect(result.rawScore).toBeGreaterThanOrEqual(0)
    expect(result.rawScore).toBeLessThanOrEqual(100)
    expect(result.pppScore).toBeGreaterThanOrEqual(0)
    expect(result.pppScore).toBeLessThanOrEqual(100)
    expect(result.globalMedianUSD).toBeGreaterThan(0)
  })

  it('includes trend data with 12 months', () => {
    const product = products[0]
    const countryCode = Object.keys(product.prices)[0]
    const result = calculateFairness(product, countryCode)
    if (!result) return
    expect(result.trendData.length).toBe(12)
  })

  it('includes hours of work calculation', () => {
    const product = products[0]
    const countryCode = Object.keys(product.prices)[0]
    const result = calculateFairness(product, countryCode)
    if (!result) return
    expect(result.hoursOfWork).toBeGreaterThan(0)
  })
})
