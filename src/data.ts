export interface Country {
  code: string
  name: string
  flag: string
  currency: string
  currencySymbol: string
  exchangeRate: number
  pppFactor: number
  medianIncome: number
  costOfLivingIndex: number
  vatRate: number
  importDutyAvg: number
  region: string
  incomeGroup: 'high' | 'upper-middle' | 'lower-middle' | 'low'
}

export interface ProductPrice {
  localPrice: number
  includesTax: boolean
  taxRate: number
  importDuty: number
  distributionMarkup: number
  reports: number
  notes?: string
}

export interface Product {
  id: string
  name: string
  category: 'digital' | 'physical' | 'saas' | 'essential' | 'service' | 'medical'
  categoryLabel: string
  subcategory: string
  brand: string
  categoryPath: string
  description: string
  unit: string
  prices: Record<string, ProductPrice>
}

export interface FairnessLens {
  id: string
  label: string
  description: string
  calculate: (priceUSD: number, country: Country, product: Product, usPrice: number, globalMedianUSD: number) => number
}

export interface FairnessResult {
  rawScore: number
  pppScore: number
  incomeScore: number
  colScore: number
  priceUSD: number
  usPrice: number
  globalMedianUSD: number
  pppAdjustedPrice: number
  incomePercentage: number
  usIncomePercentage: number
  factors: PriceFactor[]
  hoursOfWork: number
  usHoursOfWork: number
  confidenceScore: number
  confidenceLabel: string
  trendData: TrendPoint[]
  trendSignal: 'buy' | 'wait' | 'neutral'
  trendReason: string
}

export interface TrendPoint {
  month: string
  price: number
  avg: number
}

export interface BrandFairnessEntry {
  brand: string
  avgScore: number
  productCount: number
  worstCountry: string
  bestCountry: string
  category: string
}

export interface PriceFactor {
  label: string
  impact: 'increases' | 'decreases' | 'neutral'
  percentage: number
  description: string
}

export interface QuizQuestion {
  product: Product
  countryA: Country
  countryB: Country
  answer: 'A' | 'B'
  priceA_USD: number
  priceB_USD: number
}

export const countries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', currencySymbol: '$', exchangeRate: 1, pppFactor: 1, medianIncome: 45000, costOfLivingIndex: 100, vatRate: 0, importDutyAvg: 3, region: 'North America', incomeGroup: 'high' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', currencySymbol: '£', exchangeRate: 0.79, pppFactor: 0.9, medianIncome: 32000, costOfLivingIndex: 85, vatRate: 20, importDutyAvg: 4, region: 'Europe', incomeGroup: 'high' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', currencySymbol: '€', exchangeRate: 0.92, pppFactor: 0.85, medianIncome: 35000, costOfLivingIndex: 78, vatRate: 19, importDutyAvg: 4, region: 'Europe', incomeGroup: 'high' },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', currencySymbol: '€', exchangeRate: 0.92, pppFactor: 0.88, medianIncome: 32000, costOfLivingIndex: 82, vatRate: 20, importDutyAvg: 4, region: 'Europe', incomeGroup: 'high' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', currencySymbol: '¥', exchangeRate: 149, pppFactor: 0.75, medianIncome: 30000, costOfLivingIndex: 82, vatRate: 10, importDutyAvg: 4, region: 'Asia', incomeGroup: 'high' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', currencySymbol: 'A$', exchangeRate: 1.53, pppFactor: 0.88, medianIncome: 38000, costOfLivingIndex: 90, vatRate: 10, importDutyAvg: 5, region: 'Oceania', incomeGroup: 'high' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', currencySymbol: 'C$', exchangeRate: 1.36, pppFactor: 0.92, medianIncome: 36000, costOfLivingIndex: 80, vatRate: 13, importDutyAvg: 4, region: 'North America', incomeGroup: 'high' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', currency: 'CHF', currencySymbol: 'CHF', exchangeRate: 0.88, pppFactor: 0.6, medianIncome: 55000, costOfLivingIndex: 135, vatRate: 8, importDutyAvg: 2, region: 'Europe', incomeGroup: 'high' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', currency: 'SEK', currencySymbol: 'kr', exchangeRate: 10.4, pppFactor: 0.82, medianIncome: 38000, costOfLivingIndex: 95, vatRate: 25, importDutyAvg: 4, region: 'Europe', incomeGroup: 'high' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', currency: 'KRW', currencySymbol: '₩', exchangeRate: 1320, pppFactor: 0.78, medianIncome: 28000, costOfLivingIndex: 75, vatRate: 10, importDutyAvg: 8, region: 'Asia', incomeGroup: 'high' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪', currency: 'AED', currencySymbol: 'AED', exchangeRate: 3.67, pppFactor: 0.85, medianIncome: 40000, costOfLivingIndex: 70, vatRate: 5, importDutyAvg: 5, region: 'Middle East', incomeGroup: 'high' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', currency: 'PLN', currencySymbol: 'zł', exchangeRate: 4.03, pppFactor: 1.8, medianIncome: 16000, costOfLivingIndex: 50, vatRate: 23, importDutyAvg: 4, region: 'Europe', incomeGroup: 'high' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', currency: 'BRL', currencySymbol: 'R$', exchangeRate: 4.97, pppFactor: 2.2, medianIncome: 8000, costOfLivingIndex: 42, vatRate: 17, importDutyAvg: 14, region: 'South America', incomeGroup: 'upper-middle' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', currency: 'MXN', currencySymbol: 'MX$', exchangeRate: 17.1, pppFactor: 2.4, medianIncome: 6000, costOfLivingIndex: 38, vatRate: 16, importDutyAvg: 10, region: 'North America', incomeGroup: 'upper-middle' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', currency: 'TRY', currencySymbol: '₺', exchangeRate: 30.2, pppFactor: 2.8, medianIncome: 7500, costOfLivingIndex: 35, vatRate: 20, importDutyAvg: 12, region: 'Europe', incomeGroup: 'upper-middle' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', currency: 'ZAR', currencySymbol: 'R', exchangeRate: 18.7, pppFactor: 2.5, medianIncome: 5500, costOfLivingIndex: 38, vatRate: 15, importDutyAvg: 8, region: 'Africa', incomeGroup: 'upper-middle' },
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', currencySymbol: '₹', exchangeRate: 83.1, pppFactor: 3.5, medianIncome: 2500, costOfLivingIndex: 28, vatRate: 18, importDutyAvg: 15, region: 'Asia', incomeGroup: 'lower-middle' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', currency: 'IDR', currencySymbol: 'Rp', exchangeRate: 15600, pppFactor: 3.2, medianIncome: 4000, costOfLivingIndex: 32, vatRate: 11, importDutyAvg: 10, region: 'Asia', incomeGroup: 'lower-middle' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', currency: 'EGP', currencySymbol: 'E£', exchangeRate: 30.9, pppFactor: 3.8, medianIncome: 3000, costOfLivingIndex: 25, vatRate: 14, importDutyAvg: 20, region: 'Africa', incomeGroup: 'lower-middle' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', currency: 'NGN', currencySymbol: '₦', exchangeRate: 1500, pppFactor: 4.0, medianIncome: 2000, costOfLivingIndex: 22, vatRate: 8, importDutyAvg: 20, region: 'Africa', incomeGroup: 'lower-middle' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currency: 'EUR', currencySymbol: '€', exchangeRate: 0.92, pppFactor: 0.9, medianIncome: 28000, costOfLivingIndex: 75, vatRate: 22, importDutyAvg: 4, region: 'Europe', incomeGroup: 'high' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currency: 'EUR', currencySymbol: '€', exchangeRate: 0.92, pppFactor: 0.95, medianIncome: 24000, costOfLivingIndex: 65, vatRate: 21, importDutyAvg: 4, region: 'Europe', incomeGroup: 'high' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', currency: 'EUR', currencySymbol: '€', exchangeRate: 0.92, pppFactor: 0.82, medianIncome: 38000, costOfLivingIndex: 88, vatRate: 21, importDutyAvg: 4, region: 'Europe', incomeGroup: 'high' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', currency: 'NOK', currencySymbol: 'kr', exchangeRate: 10.5, pppFactor: 0.65, medianIncome: 50000, costOfLivingIndex: 130, vatRate: 25, importDutyAvg: 3, region: 'Europe', incomeGroup: 'high' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', currencySymbol: 'S$', exchangeRate: 1.34, pppFactor: 0.72, medianIncome: 42000, costOfLivingIndex: 105, vatRate: 9, importDutyAvg: 0, region: 'Asia', incomeGroup: 'high' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', currency: 'THB', currencySymbol: '฿', exchangeRate: 35.5, pppFactor: 2.8, medianIncome: 5000, costOfLivingIndex: 35, vatRate: 7, importDutyAvg: 10, region: 'Asia', incomeGroup: 'upper-middle' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', currency: 'PHP', currencySymbol: '₱', exchangeRate: 56, pppFactor: 3.3, medianIncome: 3500, costOfLivingIndex: 30, vatRate: 12, importDutyAvg: 10, region: 'Asia', incomeGroup: 'lower-middle' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', currency: 'COP', currencySymbol: 'COL$', exchangeRate: 3900, pppFactor: 2.5, medianIncome: 5500, costOfLivingIndex: 35, vatRate: 19, importDutyAvg: 12, region: 'South America', incomeGroup: 'upper-middle' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', currency: 'ARS', currencySymbol: 'AR$', exchangeRate: 870, pppFactor: 3.0, medianIncome: 5000, costOfLivingIndex: 32, vatRate: 21, importDutyAvg: 16, region: 'South America', incomeGroup: 'upper-middle' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', currency: 'KES', currencySymbol: 'KSh', exchangeRate: 155, pppFactor: 3.5, medianIncome: 2500, costOfLivingIndex: 28, vatRate: 16, importDutyAvg: 15, region: 'Africa', incomeGroup: 'lower-middle' },
]

function generatePrices(baseUSD: number, category: string, overrides?: Partial<Record<string, Partial<ProductPrice>>>): Record<string, ProductPrice> {
  const prices: Record<string, ProductPrice> = {}
  const categoryMultipliers: Record<string, Record<string, number>> = {
    digital: { US: 1, GB: 1.05, DE: 1.08, FR: 1.08, JP: 1.1, AU: 1.12, CA: 1.02, CH: 1.0, SE: 1.08, KR: 1.05, AE: 1.0, PL: 0.65, BR: 0.55, MX: 0.6, TR: 0.45, ZA: 0.55, IN: 0.35, ID: 0.4, EG: 0.35, NG: 0.4, IT: 1.08, ES: 1.05, NL: 1.05, NO: 1.08, SG: 1.0, TH: 0.45, PH: 0.4, CO: 0.5, AR: 0.45, KE: 0.4 },
    physical: { US: 1, GB: 1.1, DE: 1.15, FR: 1.12, JP: 1.2, AU: 1.18, CA: 1.05, CH: 1.35, SE: 1.15, KR: 1.1, AE: 0.95, PL: 0.75, BR: 1.4, MX: 0.9, TR: 1.1, ZA: 0.85, IN: 0.7, ID: 0.75, EG: 0.8, NG: 0.9, IT: 1.15, ES: 1.1, NL: 1.12, NO: 1.2, SG: 1.05, TH: 0.8, PH: 0.75, CO: 0.85, AR: 1.2, KE: 0.8 },
    saas: { US: 1, GB: 1.0, DE: 1.05, FR: 1.05, JP: 1.0, AU: 1.08, CA: 1.0, CH: 1.0, SE: 1.05, KR: 0.95, AE: 1.0, PL: 0.6, BR: 0.5, MX: 0.55, TR: 0.4, ZA: 0.5, IN: 0.3, ID: 0.35, EG: 0.3, NG: 0.35, IT: 1.05, ES: 1.0, NL: 1.0, NO: 1.05, SG: 1.0, TH: 0.4, PH: 0.35, CO: 0.45, AR: 0.4, KE: 0.35 },
    essential: { US: 1, GB: 0.9, DE: 0.85, FR: 0.88, JP: 1.1, AU: 1.05, CA: 0.95, CH: 1.5, SE: 1.0, KR: 0.85, AE: 0.8, PL: 0.45, BR: 0.5, MX: 0.4, TR: 0.35, ZA: 0.4, IN: 0.22, ID: 0.25, EG: 0.2, NG: 0.2, IT: 0.88, ES: 0.82, NL: 0.9, NO: 1.2, SG: 1.0, TH: 0.3, PH: 0.25, CO: 0.35, AR: 0.4, KE: 0.22 },
    service: { US: 1, GB: 0.85, DE: 0.8, FR: 0.82, JP: 0.9, AU: 0.95, CA: 0.88, CH: 1.4, SE: 0.9, KR: 0.7, AE: 0.75, PL: 0.4, BR: 0.35, MX: 0.3, TR: 0.25, ZA: 0.3, IN: 0.15, ID: 0.18, EG: 0.15, NG: 0.12, IT: 0.8, ES: 0.75, NL: 0.85, NO: 1.1, SG: 0.9, TH: 0.2, PH: 0.15, CO: 0.25, AR: 0.2, KE: 0.12 },
    medical: { US: 1, GB: 0.25, DE: 0.3, FR: 0.28, JP: 0.35, AU: 0.4, CA: 0.3, CH: 0.5, SE: 0.2, KR: 0.3, AE: 0.45, PL: 0.15, BR: 0.2, MX: 0.18, TR: 0.12, ZA: 0.15, IN: 0.08, ID: 0.1, EG: 0.08, NG: 0.06, IT: 0.28, ES: 0.25, NL: 0.3, NO: 0.2, SG: 0.4, TH: 0.1, PH: 0.08, CO: 0.12, AR: 0.1, KE: 0.06 },
  }
  const multipliers = categoryMultipliers[category] || categoryMultipliers.physical
  for (const c of countries) {
    const mult = multipliers[c.code] || 1
    const jitter = 0.95 + Math.sin(baseUSD * 7 + c.code.charCodeAt(0) * 13) * 0.05
    const priceUSD = baseUSD * mult * jitter
    const localPrice = Math.round(priceUSD * c.exchangeRate * 100) / 100
    const override = overrides?.[c.code]
    prices[c.code] = {
      localPrice: override?.localPrice ?? localPrice,
      includesTax: override?.includesTax ?? (c.vatRate > 0),
      taxRate: override?.taxRate ?? c.vatRate,
      importDuty: override?.importDuty ?? (category === 'digital' || category === 'saas' ? 0 : c.importDutyAvg),
      distributionMarkup: override?.distributionMarkup ?? (category === 'digital' || category === 'saas' ? 0 : Math.round(mult > 1.1 ? (mult - 1) * 30 : 5)),
      reports: override?.reports ?? Math.floor(500 + Math.random() * 8000),
      notes: override?.notes,
    }
  }
  return prices
}

export const products: Product[] = [
  {
    id: 'netflix-standard',
    name: 'Netflix Standard',
    category: 'digital',
    categoryLabel: 'Digital Goods',
    subcategory: 'Streaming Video',
    brand: 'Netflix',
    categoryPath: 'Digital Goods > Streaming Video',
    description: 'Monthly Netflix Standard subscription',
    unit: '/month',
    prices: generatePrices(15.49, 'digital', {
      US: { localPrice: 15.49 }, GB: { localPrice: 10.99 }, DE: { localPrice: 13.99 }, FR: { localPrice: 13.49 },
      JP: { localPrice: 1490 }, AU: { localPrice: 18.99 }, CA: { localPrice: 16.49 }, CH: { localPrice: 15.90 },
      IN: { localPrice: 649 }, BR: { localPrice: 44.90 }, TR: { localPrice: 99.99 }, NG: { localPrice: 5500 },
      KR: { localPrice: 17000 }, MX: { localPrice: 219 }, PL: { localPrice: 49.00 },
    }),
  },
  {
    id: 'spotify-premium',
    name: 'Spotify Premium',
    category: 'digital',
    categoryLabel: 'Digital Goods',
    subcategory: 'Streaming Music',
    brand: 'Spotify',
    categoryPath: 'Digital Goods > Streaming Music',
    description: 'Monthly Spotify Premium individual plan',
    unit: '/month',
    prices: generatePrices(11.99, 'digital', {
      US: { localPrice: 11.99 }, GB: { localPrice: 10.99 }, DE: { localPrice: 10.99 }, FR: { localPrice: 10.99 },
      JP: { localPrice: 980 }, AU: { localPrice: 13.99 }, CA: { localPrice: 11.99 }, CH: { localPrice: 13.99 },
      IN: { localPrice: 119 }, BR: { localPrice: 21.90 }, TR: { localPrice: 59.99 }, NG: { localPrice: 1800 },
      KR: { localPrice: 10900 }, MX: { localPrice: 139 }, PL: { localPrice: 23.99 },
    }),
  },
  {
    id: 'adobe-cc',
    name: 'Adobe Creative Cloud',
    category: 'digital',
    categoryLabel: 'Digital Goods',
    subcategory: 'Software',
    brand: 'Adobe',
    categoryPath: 'Digital Goods > Software',
    description: 'Monthly Adobe Creative Cloud all-apps subscription',
    unit: '/month',
    prices: generatePrices(59.99, 'digital', {
      US: { localPrice: 59.99 }, GB: { localPrice: 54.99 }, DE: { localPrice: 63.49 }, FR: { localPrice: 63.49 },
      JP: { localPrice: 7780 }, AU: { localPrice: 79.99 }, CA: { localPrice: 74.99 }, CH: { localPrice: 61.95 },
      IN: { localPrice: 5765 }, BR: { localPrice: 284.00 }, TR: { localPrice: 479.99 }, NG: { localPrice: 30000 },
    }),
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15 (128GB)',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Smartphones',
    brand: 'Apple',
    categoryPath: 'Physical Goods > Smartphones',
    description: 'Apple iPhone 15 base model',
    unit: '',
    prices: generatePrices(799, 'physical', {
      US: { localPrice: 799 }, GB: { localPrice: 799 }, DE: { localPrice: 949 }, FR: { localPrice: 969 },
      JP: { localPrice: 124800 }, AU: { localPrice: 1349 }, CA: { localPrice: 1129 }, CH: { localPrice: 849 },
      IN: { localPrice: 79900 }, BR: { localPrice: 7299, importDuty: 60 }, TR: { localPrice: 47999, importDuty: 25 },
      NG: { localPrice: 850000, importDuty: 20 }, KR: { localPrice: 1250000 }, MX: { localPrice: 21999 },
    }),
  },
  {
    id: 'big-mac',
    name: 'Big Mac',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Fast Food',
    brand: "McDonald's",
    categoryPath: 'Essentials > Fast Food',
    description: 'McDonald\'s Big Mac hamburger',
    unit: '',
    prices: generatePrices(5.69, 'essential', {
      US: { localPrice: 5.69, importDuty: 0 }, GB: { localPrice: 4.49, importDuty: 0 }, DE: { localPrice: 5.29, importDuty: 0 },
      JP: { localPrice: 480, importDuty: 0 }, AU: { localPrice: 7.45, importDuty: 0 }, CA: { localPrice: 7.47, importDuty: 0 },
      CH: { localPrice: 6.90, importDuty: 0 }, IN: { localPrice: 209, importDuty: 0 }, BR: { localPrice: 25.90, importDuty: 0 },
      TR: { localPrice: 110, importDuty: 0 }, KR: { localPrice: 6500, importDuty: 0 }, MX: { localPrice: 85, importDuty: 0 },
      EG: { localPrice: 120, importDuty: 0 }, NG: { localPrice: 3800, importDuty: 0 },
    }),
  },
  {
    id: 'nike-air-max',
    name: 'Nike Air Max 90',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Footwear',
    brand: 'Nike',
    categoryPath: 'Physical Goods > Footwear',
    description: 'Nike Air Max 90 sneakers',
    unit: '',
    prices: generatePrices(130, 'physical', {
      US: { localPrice: 130 }, GB: { localPrice: 125 }, DE: { localPrice: 145 }, FR: { localPrice: 145 },
      JP: { localPrice: 16500 }, AU: { localPrice: 190 }, CA: { localPrice: 170 }, CH: { localPrice: 170 },
      IN: { localPrice: 11495, importDuty: 20 }, BR: { localPrice: 899, importDuty: 35 },
      TR: { localPrice: 5299, importDuty: 18 }, KR: { localPrice: 159000 },
    }),
  },
  {
    id: 'levis-501',
    name: 'Levi\'s 501 Jeans',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Clothing',
    brand: "Levi's",
    categoryPath: 'Physical Goods > Clothing',
    description: 'Levi\'s 501 Original Fit Jeans',
    unit: '',
    prices: generatePrices(70, 'physical', {
      US: { localPrice: 69.50 }, GB: { localPrice: 85 }, DE: { localPrice: 99 }, FR: { localPrice: 99 },
      JP: { localPrice: 13200 }, AU: { localPrice: 119 }, CA: { localPrice: 89 }, CH: { localPrice: 115 },
      IN: { localPrice: 4999 }, BR: { localPrice: 399, importDuty: 25 },
    }),
  },
  {
    id: 'slack-business',
    name: 'Slack Business+',
    category: 'saas',
    categoryLabel: 'SaaS / B2B',
    subcategory: 'Communication',
    brand: 'Slack',
    categoryPath: 'SaaS > Communication',
    description: 'Slack Business+ per user per month',
    unit: '/user/month',
    prices: generatePrices(12.50, 'saas', {
      US: { localPrice: 12.50 }, GB: { localPrice: 10.06 }, DE: { localPrice: 11.75 }, FR: { localPrice: 11.75 },
      JP: { localPrice: 1800 }, AU: { localPrice: 18.00 }, CA: { localPrice: 17.25 },
      IN: { localPrice: 295 }, BR: { localPrice: 34.90 },
    }),
  },
  {
    id: 'zoom-pro',
    name: 'Zoom Workplace Pro',
    category: 'saas',
    categoryLabel: 'SaaS / B2B',
    subcategory: 'Communication',
    brand: 'Zoom',
    categoryPath: 'SaaS > Communication',
    description: 'Zoom Pro monthly subscription',
    unit: '/month',
    prices: generatePrices(13.33, 'saas', {
      US: { localPrice: 13.33 }, GB: { localPrice: 11.99 }, DE: { localPrice: 13.19 },
      JP: { localPrice: 2125 }, AU: { localPrice: 18.99 }, IN: { localPrice: 1100 },
    }),
  },
  {
    id: 'milk-1l',
    name: 'Milk (1 liter)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Dairy',
    brand: '',
    categoryPath: 'Essentials > Dairy',
    description: 'One liter of whole milk',
    unit: '',
    prices: generatePrices(1.10, 'essential', {
      US: { localPrice: 1.10, importDuty: 0 }, GB: { localPrice: 0.85, importDuty: 0 }, DE: { localPrice: 1.05, importDuty: 0 },
      JP: { localPrice: 198, importDuty: 0 }, AU: { localPrice: 1.65, importDuty: 0 }, CA: { localPrice: 1.80, importDuty: 0 },
      CH: { localPrice: 1.70, importDuty: 0 }, IN: { localPrice: 56, importDuty: 0 }, BR: { localPrice: 5.50, importDuty: 0 },
      EG: { localPrice: 22, importDuty: 0 }, NG: { localPrice: 1200, importDuty: 0 },
    }),
  },
  {
    id: 'gasoline-1l',
    name: 'Gasoline (1 liter)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Fuel',
    brand: '',
    categoryPath: 'Essentials > Fuel',
    description: 'One liter of regular gasoline',
    unit: '',
    prices: generatePrices(0.95, 'essential', {
      US: { localPrice: 0.95, importDuty: 0 }, GB: { localPrice: 1.45, importDuty: 0, notes: 'High fuel duty (~58p/litre)' },
      DE: { localPrice: 1.75, importDuty: 0, notes: 'Energy tax + CO2 surcharge' }, FR: { localPrice: 1.80, importDuty: 0 },
      JP: { localPrice: 170, importDuty: 0 }, AU: { localPrice: 1.85, importDuty: 0 }, CA: { localPrice: 1.65, importDuty: 0 },
      CH: { localPrice: 1.80, importDuty: 0 }, SE: { localPrice: 18.50, importDuty: 0, notes: 'Carbon tax among world\'s highest' },
      IN: { localPrice: 95, importDuty: 0 }, BR: { localPrice: 5.80, importDuty: 0 },
      AE: { localPrice: 3.03, importDuty: 0, notes: 'Oil-producing nation, subsidized fuel' },
      NG: { localPrice: 650, importDuty: 0 }, EG: { localPrice: 12.50, importDuty: 0, notes: 'Government-subsidized fuel price' },
    }),
  },
  {
    id: 'internet-100',
    name: 'Internet Plan (100 Mbps)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'General Services',
    brand: '',
    categoryPath: 'Services > General Services',
    description: 'Monthly broadband internet, ~100 Mbps',
    unit: '/month',
    prices: generatePrices(65, 'service', {
      US: { localPrice: 65 }, GB: { localPrice: 30, notes: 'Competitive market, Ofcom regulation' },
      DE: { localPrice: 35 }, FR: { localPrice: 30, notes: 'Free/Orange competition drives prices down' },
      JP: { localPrice: 4500 }, AU: { localPrice: 69, notes: 'NBN network limits competition' },
      CA: { localPrice: 75, notes: 'Oligopoly market (Bell, Rogers, Telus)' },
      CH: { localPrice: 49 }, SE: { localPrice: 349 }, KR: { localPrice: 22000, notes: 'Excellent infrastructure, very competitive' },
      IN: { localPrice: 499, notes: 'Jio disrupted market, very affordable' },
      BR: { localPrice: 99 }, MX: { localPrice: 399 }, NG: { localPrice: 15000 },
    }),
  },
  {
    id: 'plumber-hour',
    name: 'Plumber (per hour)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Home Services',
    brand: '',
    categoryPath: 'Services > Home Services',
    description: 'Licensed plumber hourly rate',
    unit: '/hour',
    prices: generatePrices(85, 'service', {
      US: { localPrice: 85 }, GB: { localPrice: 55 }, DE: { localPrice: 60 }, FR: { localPrice: 50 },
      JP: { localPrice: 8000 }, AU: { localPrice: 90 }, CA: { localPrice: 80 }, CH: { localPrice: 120 },
      IN: { localPrice: 400 }, BR: { localPrice: 80 }, MX: { localPrice: 350 },
    }),
  },
  {
    id: 'gym-membership',
    name: 'Gym Membership',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Fitness',
    brand: '',
    categoryPath: 'Services > Fitness',
    description: 'Monthly gym membership, mid-range',
    unit: '/month',
    prices: generatePrices(50, 'service', {
      US: { localPrice: 50 }, GB: { localPrice: 35 }, DE: { localPrice: 30 }, FR: { localPrice: 35 },
      JP: { localPrice: 8000 }, AU: { localPrice: 65 }, CA: { localPrice: 50 }, CH: { localPrice: 80 },
      IN: { localPrice: 1500 }, BR: { localPrice: 120 }, MX: { localPrice: 600 },
    }),
  },
  {
    id: 'haircut',
    name: 'Haircut',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Beauty',
    brand: '',
    categoryPath: 'Services > Beauty',
    description: 'Standard men\'s haircut at a mid-range salon',
    unit: '',
    prices: generatePrices(25, 'service', {
      US: { localPrice: 25 }, GB: { localPrice: 18 }, DE: { localPrice: 20 }, FR: { localPrice: 18 },
      JP: { localPrice: 3500 }, AU: { localPrice: 30 }, CA: { localPrice: 25 }, CH: { localPrice: 45 },
      IN: { localPrice: 200 }, BR: { localPrice: 40 }, EG: { localPrice: 100 }, NG: { localPrice: 2000 },
    }),
  },
  {
    id: 'mri-scan',
    name: 'MRI Scan',
    category: 'medical',
    categoryLabel: 'Medical',
    subcategory: 'Imaging',
    brand: '',
    categoryPath: 'Medical > Imaging',
    description: 'Brain MRI scan without contrast',
    unit: '',
    prices: generatePrices(2600, 'medical', {
      US: { localPrice: 2600, notes: 'No universal price controls; varies wildly by hospital' },
      GB: { localPrice: 500, notes: 'Private price; NHS provides free' },
      DE: { localPrice: 450, notes: 'Regulated fee schedule (GOÄ)' },
      FR: { localPrice: 380, notes: 'Sécurité sociale reimbursement system' },
      JP: { localPrice: 50000, notes: 'National Health Insurance covers 70%' },
      AU: { localPrice: 400, notes: 'Medicare rebate available' },
      CA: { localPrice: 700, notes: 'Covered by provincial health insurance; private price shown' },
      CH: { localPrice: 950, notes: 'Mandatory health insurance covers most' },
      IN: { localPrice: 8000, notes: 'Wide range: ₹3,000-15,000 depending on city' },
      BR: { localPrice: 800, notes: 'SUS provides free; private prices shown' },
      MX: { localPrice: 5000 }, TR: { localPrice: 3500 },
    }),
  },
  {
    id: 'dental-cleaning',
    name: 'Dental Cleaning',
    category: 'medical',
    categoryLabel: 'Medical',
    subcategory: 'Dental',
    brand: '',
    categoryPath: 'Medical > Dental',
    description: 'Professional dental cleaning (prophylaxis)',
    unit: '',
    prices: generatePrices(200, 'medical', {
      US: { localPrice: 200, notes: 'Insurance typically covers; out-of-pocket shown' },
      GB: { localPrice: 65, notes: 'NHS Band 1 treatment £25.80; private shown' },
      DE: { localPrice: 80 }, FR: { localPrice: 50 },
      JP: { localPrice: 8000 }, AU: { localPrice: 150 }, CA: { localPrice: 180 },
      IN: { localPrice: 1500 }, BR: { localPrice: 200 }, MX: { localPrice: 800 },
    }),
  },
  {
    id: 'doctor-visit',
    name: 'Doctor Visit (GP)',
    category: 'medical',
    categoryLabel: 'Medical',
    subcategory: 'Consultations',
    brand: '',
    categoryPath: 'Medical > Consultations',
    description: 'Standard general practitioner consultation',
    unit: '',
    prices: generatePrices(150, 'medical', {
      US: { localPrice: 150, notes: 'Without insurance; highly variable' },
      GB: { localPrice: 70, notes: 'Free via NHS; private price shown' },
      DE: { localPrice: 30, notes: 'Covered by Krankenkasse; co-pay shown' },
      FR: { localPrice: 26.50, notes: 'Tarif conventionné; 70% reimbursed' },
      JP: { localPrice: 3000, notes: 'NHI covers 70%; patient pays 30%' },
      AU: { localPrice: 80, notes: 'Medicare rebate ~$40' },
      CA: { localPrice: 0, notes: 'Covered by provincial health plan' },
      SE: { localPrice: 250, notes: 'Max 1,300 kr/year patient ceiling' },
      IN: { localPrice: 500 }, BR: { localPrice: 250, notes: 'SUS free; private shown' },
    }),
  },
  {
    id: 'university-annual',
    name: 'University Tuition (Annual)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Education',
    brand: '',
    categoryPath: 'Services > Education',
    description: 'Annual tuition at a public university (domestic students)',
    unit: '/year',
    prices: generatePrices(10000, 'service', {
      US: { localPrice: 10940, notes: 'Public in-state average; private can be $50k+' },
      GB: { localPrice: 9250, notes: 'Capped at £9,250; Scotland free for Scots' },
      DE: { localPrice: 300, notes: 'Most states charge only admin fees (~€150-350/semester)', importDuty: 0 },
      FR: { localPrice: 170, notes: 'Public university; grandes écoles may charge more', importDuty: 0 },
      JP: { localPrice: 535800, notes: 'National universities; private 2-3x more' },
      AU: { localPrice: 9000, notes: 'HECS-HELP deferred loan system' },
      CA: { localPrice: 6800 }, CH: { localPrice: 1500, notes: 'Very affordable; ETH Zurich ~CHF 730/semester' },
      SE: { localPrice: 0, notes: 'Free for EU/EEA citizens', importDuty: 0 },
      IN: { localPrice: 50000, notes: 'IITs ~₹2L/year; state universities much less' },
      BR: { localPrice: 0, notes: 'Federal universities are free', importDuty: 0 },
      MX: { localPrice: 4000, notes: 'UNAM charges ~MX$1/semester symbolically' },
      EG: { localPrice: 5000 }, NG: { localPrice: 250000 },
    }),
  },
  {
    id: 'rent-1br',
    name: '1-Bedroom Apartment (City Center)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Housing',
    brand: '',
    categoryPath: 'Services > Housing',
    description: 'Monthly rent for a 1-bedroom apartment in city center',
    unit: '/month',
    prices: generatePrices(1800, 'service', {
      US: { localPrice: 1800, notes: 'National average; NYC/SF much higher' },
      GB: { localPrice: 1200, notes: 'London average ~£1,800; UK average shown' },
      DE: { localPrice: 850, notes: 'Rent controls (Mietpreisbremse) in many cities' },
      FR: { localPrice: 900 }, JP: { localPrice: 85000 }, AU: { localPrice: 2200 },
      CA: { localPrice: 1800 }, CH: { localPrice: 1800, notes: 'Among world\'s highest rents' },
      SE: { localPrice: 11000, notes: 'Rent-controlled market; long queues' },
      IN: { localPrice: 18000 }, BR: { localPrice: 2500 }, MX: { localPrice: 12000 },
      TR: { localPrice: 15000 }, EG: { localPrice: 8000 }, NG: { localPrice: 400000 },
    }),
  },
  {
    id: 'rice-1kg',
    name: 'Rice (1 kg)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Grains',
    brand: '',
    categoryPath: 'Essentials > Grains',
    description: 'One kilogram of white rice',
    unit: '',
    prices: generatePrices(1.80, 'essential', {
      US: { localPrice: 1.80, importDuty: 0 }, GB: { localPrice: 1.20, importDuty: 0 }, DE: { localPrice: 1.50, importDuty: 0 },
      JP: { localPrice: 450, importDuty: 0 }, AU: { localPrice: 2.50, importDuty: 0 }, CA: { localPrice: 2.20, importDuty: 0 },
      IN: { localPrice: 45, importDuty: 0, notes: 'Staple food; prices regulated by government' },
      TH: { localPrice: 40, importDuty: 0, notes: 'Major rice exporter' },
      PH: { localPrice: 50, importDuty: 0 }, EG: { localPrice: 18, importDuty: 0 },
      NG: { localPrice: 1200, importDuty: 0 }, KE: { localPrice: 150, importDuty: 0 },
    }),
  },
  {
    id: 'eggs-dozen',
    name: 'Eggs (dozen)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Protein',
    brand: '',
    categoryPath: 'Essentials > Protein',
    description: 'One dozen large eggs',
    unit: '',
    prices: generatePrices(3.50, 'essential', {
      US: { localPrice: 3.50, importDuty: 0 }, GB: { localPrice: 2.80, importDuty: 0 }, DE: { localPrice: 2.50, importDuty: 0 },
      JP: { localPrice: 280, importDuty: 0 }, AU: { localPrice: 5.50, importDuty: 0 }, CA: { localPrice: 4.20, importDuty: 0 },
      CH: { localPrice: 6.90, importDuty: 0 }, IN: { localPrice: 80, importDuty: 0 }, BR: { localPrice: 12, importDuty: 0 },
      MX: { localPrice: 55, importDuty: 0 }, NG: { localPrice: 2500, importDuty: 0 }, KE: { localPrice: 300, importDuty: 0 },
    }),
  },
  {
    id: 'bread-loaf',
    name: 'Bread (loaf)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Grains',
    brand: '',
    categoryPath: 'Essentials > Grains',
    description: 'Standard white bread loaf (~500g)',
    unit: '',
    prices: generatePrices(3.00, 'essential', {
      US: { localPrice: 3.00, importDuty: 0 }, GB: { localPrice: 1.10, importDuty: 0 }, DE: { localPrice: 1.50, importDuty: 0 },
      FR: { localPrice: 1.30, importDuty: 0, notes: 'Baguette tradition; price informally regulated' },
      JP: { localPrice: 200, importDuty: 0 }, AU: { localPrice: 3.50, importDuty: 0 }, CA: { localPrice: 3.20, importDuty: 0 },
      CH: { localPrice: 3.80, importDuty: 0 }, IN: { localPrice: 40, importDuty: 0 }, EG: { localPrice: 5, importDuty: 0, notes: 'Government-subsidized bread (baladi)' },
    }),
  },
  {
    id: 'chicken-1kg',
    name: 'Chicken Breast (1 kg)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Protein',
    brand: '',
    categoryPath: 'Essentials > Protein',
    description: 'One kilogram of boneless chicken breast',
    unit: '',
    prices: generatePrices(8.50, 'essential', {
      US: { localPrice: 8.50, importDuty: 0 }, GB: { localPrice: 6.50, importDuty: 0 }, DE: { localPrice: 7.50, importDuty: 0 },
      JP: { localPrice: 800, importDuty: 0 }, AU: { localPrice: 12.00, importDuty: 0 }, CA: { localPrice: 11.00, importDuty: 0 },
      CH: { localPrice: 22, importDuty: 0 }, IN: { localPrice: 250, importDuty: 0 }, BR: { localPrice: 20, importDuty: 0, notes: 'Major poultry exporter' },
      TH: { localPrice: 120, importDuty: 0 }, PH: { localPrice: 220, importDuty: 0 }, KE: { localPrice: 600, importDuty: 0 },
    }),
  },
  {
    id: 'coffee-starbucks',
    name: 'Starbucks Latte (tall)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Beverages',
    brand: 'Starbucks',
    categoryPath: 'Essentials > Beverages',
    description: 'Tall latte at Starbucks',
    unit: '',
    prices: generatePrices(5.25, 'essential', {
      US: { localPrice: 5.25 }, GB: { localPrice: 3.85 }, DE: { localPrice: 4.55 }, FR: { localPrice: 4.90 },
      JP: { localPrice: 490 }, AU: { localPrice: 6.00 }, CA: { localPrice: 5.75 }, CH: { localPrice: 6.50 },
      KR: { localPrice: 5500 }, IT: { localPrice: 4.50 }, NO: { localPrice: 58 }, SG: { localPrice: 7.10 },
      IN: { localPrice: 320 }, BR: { localPrice: 18.50 }, TH: { localPrice: 135 }, PH: { localPrice: 185 },
      CO: { localPrice: 12000, notes: 'Major coffee producer; cheaper local brands' }, AR: { localPrice: 2500 },
    }),
  },
  {
    id: 'restaurant-meal',
    name: 'Restaurant Meal (mid-range)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Dining',
    brand: '',
    categoryPath: 'Services > Dining',
    description: 'Dinner for one at a mid-range restaurant with drink',
    unit: '',
    prices: generatePrices(25, 'service', {
      US: { localPrice: 25 }, GB: { localPrice: 20 }, DE: { localPrice: 18 }, FR: { localPrice: 22 },
      JP: { localPrice: 2000 }, AU: { localPrice: 30 }, CA: { localPrice: 28 }, CH: { localPrice: 45 },
      IT: { localPrice: 20 }, ES: { localPrice: 15 }, NO: { localPrice: 350 }, SG: { localPrice: 25 },
      IN: { localPrice: 500 }, BR: { localPrice: 60 }, TH: { localPrice: 250, notes: 'Incredible street food for a fraction' },
      PH: { localPrice: 400 }, CO: { localPrice: 35000 }, AR: { localPrice: 8000 }, KE: { localPrice: 1500 },
    }),
  },
  {
    id: 'samsung-galaxy',
    name: 'Samsung Galaxy S24',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Smartphones',
    brand: 'Samsung',
    categoryPath: 'Physical Goods > Smartphones',
    description: 'Samsung Galaxy S24 base model',
    unit: '',
    prices: generatePrices(799, 'physical', {
      US: { localPrice: 799 }, GB: { localPrice: 799 }, DE: { localPrice: 899 }, FR: { localPrice: 899 },
      JP: { localPrice: 124700 }, AU: { localPrice: 1299 }, CA: { localPrice: 1099 }, CH: { localPrice: 849 },
      KR: { localPrice: 1155000, notes: 'Samsung home market; competitive pricing' }, IN: { localPrice: 74999 },
      BR: { localPrice: 5999, importDuty: 50 }, TR: { localPrice: 42999, importDuty: 20 },
      IT: { localPrice: 899 }, ES: { localPrice: 879 }, SG: { localPrice: 1148 },
    }),
  },
  {
    id: 'playstation-5',
    name: 'PlayStation 5',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Gaming Consoles',
    brand: 'Sony',
    categoryPath: 'Physical Goods > Gaming Consoles',
    description: 'Sony PlayStation 5 disc edition',
    unit: '',
    prices: generatePrices(499, 'physical', {
      US: { localPrice: 499 }, GB: { localPrice: 479 }, DE: { localPrice: 549 }, FR: { localPrice: 549 },
      JP: { localPrice: 66980, notes: 'Sony home market' }, AU: { localPrice: 799 }, CA: { localPrice: 649 },
      CH: { localPrice: 529 }, IN: { localPrice: 49990 }, BR: { localPrice: 4499, importDuty: 60, notes: 'Extreme import taxes on electronics' },
      TR: { localPrice: 21999, importDuty: 20 }, IT: { localPrice: 549 }, ES: { localPrice: 549 },
      AR: { localPrice: 699999, importDuty: 35, notes: 'Import restrictions on electronics' },
    }),
  },
  {
    id: 'macbook-air',
    name: 'MacBook Air M3',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Laptops',
    brand: 'Apple',
    categoryPath: 'Physical Goods > Laptops',
    description: 'Apple MacBook Air M3 13-inch base model',
    unit: '',
    prices: generatePrices(1099, 'physical', {
      US: { localPrice: 1099 }, GB: { localPrice: 1099 }, DE: { localPrice: 1299 }, FR: { localPrice: 1299 },
      JP: { localPrice: 164800 }, AU: { localPrice: 1799 }, CA: { localPrice: 1549 }, CH: { localPrice: 1199 },
      IN: { localPrice: 114900 }, BR: { localPrice: 12999, importDuty: 60 },
      TR: { localPrice: 57999, importDuty: 25 }, SG: { localPrice: 1599 }, KR: { localPrice: 1590000 },
    }),
  },
  {
    id: 'electricity-100kwh',
    name: 'Electricity (100 kWh)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Utilities',
    brand: '',
    categoryPath: 'Essentials > Utilities',
    description: '100 kilowatt-hours of residential electricity',
    unit: '',
    prices: generatePrices(14, 'essential', {
      US: { localPrice: 14.00, importDuty: 0 }, GB: { localPrice: 28.00, importDuty: 0, notes: 'Energy crisis drove prices up significantly' },
      DE: { localPrice: 32.00, importDuty: 0, notes: 'Energiewende surcharges; among highest in EU' },
      FR: { localPrice: 18.50, importDuty: 0, notes: 'Nuclear power keeps prices relatively low' },
      JP: { localPrice: 3100, importDuty: 0 }, AU: { localPrice: 28, importDuty: 0 }, CA: { localPrice: 11, importDuty: 0 },
      NO: { localPrice: 100, importDuty: 0, notes: 'Hydroelectric; historically very cheap' },
      IN: { localPrice: 600, importDuty: 0, notes: 'Subsidized rates for residential use' },
      EG: { localPrice: 100, importDuty: 0, notes: 'Government-subsidized electricity' },
      NG: { localPrice: 5000, importDuty: 0, notes: 'Unreliable grid; many use generators' },
      KE: { localPrice: 2500, importDuty: 0 }, SG: { localPrice: 27, importDuty: 0 },
    }),
  },
  {
    id: 'water-monthly',
    name: 'Water Bill (monthly)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Beverages',
    brand: '',
    categoryPath: 'Essentials > Beverages',
    description: 'Monthly residential water bill for average household',
    unit: '/month',
    prices: generatePrices(35, 'essential', {
      US: { localPrice: 35, importDuty: 0 }, GB: { localPrice: 30, importDuty: 0 }, DE: { localPrice: 40, importDuty: 0 },
      AU: { localPrice: 55, importDuty: 0, notes: 'Water scarcity adds to costs' },
      CH: { localPrice: 30, importDuty: 0 }, SE: { localPrice: 200, importDuty: 0 },
      IN: { localPrice: 300, importDuty: 0, notes: 'Highly subsidized; varies by city' },
      EG: { localPrice: 50, importDuty: 0, notes: 'Heavily subsidized' }, NG: { localPrice: 3000, importDuty: 0 },
      KE: { localPrice: 1500, importDuty: 0 },
    }),
  },
  {
    id: 'oil-change',
    name: 'Car Oil Change',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Auto Services',
    brand: '',
    categoryPath: 'Services > Auto Services',
    description: 'Standard oil change at a mechanic',
    unit: '',
    prices: generatePrices(45, 'service', {
      US: { localPrice: 45 }, GB: { localPrice: 55 }, DE: { localPrice: 60 }, FR: { localPrice: 55 },
      JP: { localPrice: 5000 }, AU: { localPrice: 80 }, CA: { localPrice: 60 }, CH: { localPrice: 120 },
      IN: { localPrice: 800 }, BR: { localPrice: 80 }, MX: { localPrice: 400 },
      IT: { localPrice: 50 }, ES: { localPrice: 45 }, TH: { localPrice: 500 }, PH: { localPrice: 600 },
      CO: { localPrice: 60000 }, AR: { localPrice: 12000 }, KE: { localPrice: 3000 },
    }),
  },
  {
    id: 'tire-replacement',
    name: 'Tire Replacement (set of 4)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Auto Services',
    brand: '',
    categoryPath: 'Services > Auto Services',
    description: 'Four mid-range tires installed',
    unit: '',
    prices: generatePrices(600, 'service', {
      US: { localPrice: 600 }, GB: { localPrice: 500 }, DE: { localPrice: 480 }, FR: { localPrice: 500 },
      JP: { localPrice: 60000 }, AU: { localPrice: 800 }, CA: { localPrice: 700 }, CH: { localPrice: 1000 },
      IN: { localPrice: 16000 }, BR: { localPrice: 1600 }, MX: { localPrice: 6000 },
      IT: { localPrice: 450 }, ES: { localPrice: 400 }, NO: { localPrice: 8000 }, KE: { localPrice: 40000 },
    }),
  },
  {
    id: 'lawyer-hour',
    name: 'Lawyer Consultation (1 hr)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Professional',
    brand: '',
    categoryPath: 'Services > Professional',
    description: 'One hour consultation with a general practice attorney',
    unit: '/hour',
    prices: generatePrices(250, 'service', {
      US: { localPrice: 250, notes: 'Varies wildly: $150-$1000+/hr depending on specialty and city' },
      GB: { localPrice: 200 }, DE: { localPrice: 180, notes: 'Regulated fee schedule (RVG) for many services' },
      FR: { localPrice: 200 }, JP: { localPrice: 20000 }, AU: { localPrice: 300 }, CA: { localPrice: 250 },
      CH: { localPrice: 400 }, IN: { localPrice: 3000, notes: 'Wide range: advocates charge less than top firms' },
      BR: { localPrice: 400 }, SG: { localPrice: 350 }, NL: { localPrice: 200 }, NO: { localPrice: 2500 },
    }),
  },
  {
    id: 'spa-massage',
    name: 'Spa Massage (1 hr)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Beauty',
    brand: '',
    categoryPath: 'Services > Beauty',
    description: 'One-hour full body massage at a mid-range spa',
    unit: '',
    prices: generatePrices(80, 'service', {
      US: { localPrice: 80 }, GB: { localPrice: 65 }, DE: { localPrice: 60 }, FR: { localPrice: 70 },
      JP: { localPrice: 7000 }, AU: { localPrice: 90 }, CA: { localPrice: 85 }, CH: { localPrice: 130 },
      TH: { localPrice: 500, notes: 'World-famous Thai massage tradition; incredible value' },
      IN: { localPrice: 1500 }, BR: { localPrice: 150 }, PH: { localPrice: 600, notes: 'Spa tourism destination' },
      CO: { localPrice: 80000 }, AR: { localPrice: 15000 }, KE: { localPrice: 4000 },
      IT: { localPrice: 70 }, ES: { localPrice: 55 }, SG: { localPrice: 100 }, NO: { localPrice: 900 },
    }),
  },
  {
    id: 'car-insurance',
    name: 'Car Insurance (annual)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Insurance',
    brand: '',
    categoryPath: 'Services > Insurance',
    description: 'Annual comprehensive car insurance for average sedan',
    unit: '/year',
    prices: generatePrices(1500, 'service', {
      US: { localPrice: 1500, notes: 'National average; varies massively by state' },
      GB: { localPrice: 800 }, DE: { localPrice: 600, notes: 'Competitive market keeps prices down' },
      FR: { localPrice: 650 }, JP: { localPrice: 80000 }, AU: { localPrice: 1200 },
      CA: { localPrice: 1600, notes: 'Varies by province; BC most expensive' },
      CH: { localPrice: 900 }, IN: { localPrice: 15000 }, BR: { localPrice: 3000 },
      IT: { localPrice: 700, notes: 'Higher in south than north' },
      ES: { localPrice: 450 }, NL: { localPrice: 500 }, NO: { localPrice: 6000 },
      SG: { localPrice: 1800, notes: 'High due to Certificate of Entitlement system' },
      TH: { localPrice: 12000 }, MX: { localPrice: 8000 }, AR: { localPrice: 200000 },
    }),
  },
  {
    id: 'steam-game',
    name: 'AAA Game (Steam)',
    category: 'digital',
    categoryLabel: 'Digital Goods',
    subcategory: 'Gaming',
    brand: '',
    categoryPath: 'Digital Goods > Gaming',
    description: 'New AAA game on Steam at launch',
    unit: '',
    prices: generatePrices(69.99, 'digital', {
      US: { localPrice: 69.99 }, GB: { localPrice: 59.99 }, DE: { localPrice: 69.99 }, FR: { localPrice: 69.99 },
      JP: { localPrice: 8980 }, AU: { localPrice: 89.95 }, CA: { localPrice: 79.99 },
      IN: { localPrice: 3999, notes: 'Significant regional pricing discount on Steam' },
      BR: { localPrice: 279.90, notes: 'Steam regional pricing' }, TR: { localPrice: 599, notes: 'Among cheapest Steam regions' },
      AR: { localPrice: 19999, notes: 'Historically one of cheapest Steam regions; prices rising' },
      PL: { localPrice: 249.00 }, KR: { localPrice: 79000 }, CO: { localPrice: 189900, notes: 'Regional pricing available' },
    }),
  },

  {
    id: 'ipad-air',
    name: 'iPad Air',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Tablets',
    brand: 'Apple',
    categoryPath: 'Physical Goods > Tablets',
    description: 'Apple iPad Air M2 (256GB)',
    unit: '',
    prices: generatePrices(599, 'physical', {
      US: { localPrice: 599 }, GB: { localPrice: 599 }, DE: { localPrice: 699 }, JP: { localPrice: 98800 },
      IN: { localPrice: 59900 }, BR: { localPrice: 5999, importDuty: 55 },
    }),
  },
  {
    id: 'airpods-pro',
    name: 'AirPods Pro 2',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Audio',
    brand: 'Apple',
    categoryPath: 'Physical Goods > Audio',
    description: 'Apple AirPods Pro 2nd generation',
    unit: '',
    prices: generatePrices(249, 'physical', {
      US: { localPrice: 249 }, GB: { localPrice: 229 }, DE: { localPrice: 279 }, JP: { localPrice: 39800 },
      IN: { localPrice: 24900 }, BR: { localPrice: 2599, importDuty: 50 },
    }),
  },
  {
    id: 'nintendo-switch',
    name: 'Nintendo Switch OLED',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Gaming Consoles',
    brand: 'Nintendo',
    categoryPath: 'Physical Goods > Gaming Consoles',
    description: 'Nintendo Switch OLED model',
    unit: '',
    prices: generatePrices(349, 'physical', {
      US: { localPrice: 349 }, GB: { localPrice: 309 }, DE: { localPrice: 349 }, JP: { localPrice: 37980 },
      IN: { localPrice: 32999 }, BR: { localPrice: 2999, importDuty: 50 },
    }),
  },
  {
    id: 'smart-tv-55',
    name: '55" Smart TV (Samsung)',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'TVs & Displays',
    brand: 'Samsung',
    categoryPath: 'Physical Goods > TVs & Displays',
    description: 'Samsung 55-inch 4K Smart TV',
    unit: '',
    prices: generatePrices(450, 'physical', {
      US: { localPrice: 450 }, GB: { localPrice: 449 }, DE: { localPrice: 499 }, JP: { localPrice: 79800 },
      IN: { localPrice: 42990 }, BR: { localPrice: 3299, importDuty: 40 },
    }),
  },
  {
    id: 'budget-laptop',
    name: 'Budget Laptop (Chromebook)',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Laptops',
    brand: '',
    categoryPath: 'Physical Goods > Laptops',
    description: 'Entry-level Chromebook laptop',
    unit: '',
    prices: generatePrices(299, 'physical', {
      US: { localPrice: 299 }, GB: { localPrice: 279 }, DE: { localPrice: 329 }, JP: { localPrice: 44800 },
      IN: { localPrice: 24999 }, BR: { localPrice: 2499 },
    }),
  },
  {
    id: 'smartwatch',
    name: 'Apple Watch SE',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Wearables',
    brand: 'Apple',
    categoryPath: 'Physical Goods > Wearables',
    description: 'Apple Watch SE (2nd Gen)',
    unit: '',
    prices: generatePrices(249, 'physical', {
      US: { localPrice: 249 }, GB: { localPrice: 219 }, DE: { localPrice: 269 }, JP: { localPrice: 34800 },
      IN: { localPrice: 29900 }, BR: { localPrice: 2799, importDuty: 45 },
    }),
  },
  {
    id: 'wireless-earbuds',
    name: 'Samsung Galaxy Buds',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Audio',
    brand: 'Samsung',
    categoryPath: 'Physical Goods > Audio',
    description: 'Samsung Galaxy Buds3 wireless earbuds',
    unit: '',
    prices: generatePrices(179, 'physical', {
      US: { localPrice: 179 }, GB: { localPrice: 159 }, DE: { localPrice: 179 }, JP: { localPrice: 27500 },
      IN: { localPrice: 14999 }, BR: { localPrice: 1299 },
    }),
  },
  {
    id: 'banana-1kg',
    name: 'Bananas (1 kg)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Produce',
    brand: '',
    categoryPath: 'Essentials > Produce',
    description: 'Fresh bananas per kilogram',
    unit: '/kg',
    prices: generatePrices(1.30, 'essential', {
      US: { localPrice: 1.30 }, GB: { localPrice: 0.85 }, DE: { localPrice: 1.49 },
      IN: { localPrice: 40 }, BR: { localPrice: 4.50 }, PH: { localPrice: 60 }, CO: { localPrice: 2500 },
    }),
  },
  {
    id: 'tomatoes-1kg',
    name: 'Tomatoes (1 kg)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Produce',
    brand: '',
    categoryPath: 'Essentials > Produce',
    description: 'Fresh tomatoes per kilogram',
    unit: '/kg',
    prices: generatePrices(2.50, 'essential', {
      US: { localPrice: 2.50 }, GB: { localPrice: 1.80 }, DE: { localPrice: 2.99 },
      IN: { localPrice: 30 }, BR: { localPrice: 8.00 }, EG: { localPrice: 15 },
    }),
  },
  {
    id: 'cheese-1kg',
    name: 'Cheese (1 kg, local)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Dairy',
    brand: '',
    categoryPath: 'Essentials > Dairy',
    description: 'Local cheese per kilogram',
    unit: '/kg',
    prices: generatePrices(10.50, 'essential', {
      US: { localPrice: 10.50 }, GB: { localPrice: 6.50 }, DE: { localPrice: 8.99 }, FR: { localPrice: 14.00 },
      CH: { localPrice: 22.00 }, IN: { localPrice: 400 }, BR: { localPrice: 55.00 },
    }),
  },
  {
    id: 'pasta-500g',
    name: 'Pasta (500g)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Grains',
    brand: '',
    categoryPath: 'Essentials > Grains',
    description: 'Dry pasta, 500g package',
    unit: '',
    prices: generatePrices(1.50, 'essential', {
      US: { localPrice: 1.50 }, GB: { localPrice: 0.95 }, DE: { localPrice: 0.99 }, IT: { localPrice: 0.89 },
      IN: { localPrice: 50 }, BR: { localPrice: 4.50 },
    }),
  },
  {
    id: 'cooking-oil-1l',
    name: 'Cooking Oil (1 liter)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Cooking',
    brand: '',
    categoryPath: 'Essentials > Cooking',
    description: 'Vegetable or sunflower cooking oil',
    unit: '/L',
    prices: generatePrices(3.20, 'essential', {
      US: { localPrice: 3.20 }, GB: { localPrice: 1.85 }, DE: { localPrice: 2.49 },
      IN: { localPrice: 140 }, BR: { localPrice: 9.00 }, NG: { localPrice: 2500 },
    }),
  },
  {
    id: 'sugar-1kg',
    name: 'Sugar (1 kg)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Cooking',
    brand: '',
    categoryPath: 'Essentials > Cooking',
    description: 'White granulated sugar per kilogram',
    unit: '/kg',
    prices: generatePrices(1.80, 'essential', {
      US: { localPrice: 1.80 }, GB: { localPrice: 0.75 }, DE: { localPrice: 1.09 },
      IN: { localPrice: 45 }, BR: { localPrice: 5.50 }, TH: { localPrice: 25 },
    }),
  },
  {
    id: 'beef-1kg',
    name: 'Beef (1 kg)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Protein',
    brand: '',
    categoryPath: 'Essentials > Protein',
    description: 'Beef round or equivalent per kilogram',
    unit: '/kg',
    prices: generatePrices(12.00, 'essential', {
      US: { localPrice: 12.00 }, GB: { localPrice: 9.00 }, DE: { localPrice: 13.99 }, JP: { localPrice: 3200 },
      AU: { localPrice: 18.00 }, BR: { localPrice: 45.00 }, AR: { localPrice: 3500 },
    }),
  },
  {
    id: 'fish-1kg',
    name: 'Fish (1 kg, fresh)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Protein',
    brand: '',
    categoryPath: 'Essentials > Protein',
    description: 'Fresh fish fillet per kilogram',
    unit: '/kg',
    prices: generatePrices(14.00, 'essential', {
      US: { localPrice: 14.00 }, GB: { localPrice: 10.00 }, JP: { localPrice: 2000 },
      NO: { localPrice: 120 }, TH: { localPrice: 200 }, PH: { localPrice: 350 },
    }),
  },
  {
    id: 'bottled-water-1.5l',
    name: 'Bottled Water (1.5L)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Beverages',
    brand: '',
    categoryPath: 'Essentials > Beverages',
    description: '1.5 liter bottle of water',
    unit: '',
    prices: generatePrices(1.50, 'essential', {
      US: { localPrice: 1.50 }, GB: { localPrice: 0.65 }, DE: { localPrice: 0.49 }, FR: { localPrice: 0.60 },
      JP: { localPrice: 110 }, IN: { localPrice: 20 }, EG: { localPrice: 5 },
    }),
  },
  {
    id: 'beer-domestic',
    name: 'Beer (500ml, domestic)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Alcohol',
    brand: '',
    categoryPath: 'Essentials > Alcohol',
    description: 'Domestic beer, 500ml bottle or can',
    unit: '',
    prices: generatePrices(2.00, 'essential', {
      US: { localPrice: 2.00 }, GB: { localPrice: 1.70 }, DE: { localPrice: 0.89 }, CZ: { localPrice: 15 },
      JP: { localPrice: 250 }, AU: { localPrice: 4.50 }, BR: { localPrice: 6.00 }, MX: { localPrice: 25 },
    }),
  },
  {
    id: 'wine-bottle',
    name: 'Wine (750ml, mid-range)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Alcohol',
    brand: '',
    categoryPath: 'Essentials > Alcohol',
    description: 'Mid-range bottle of wine',
    unit: '',
    prices: generatePrices(12.00, 'essential', {
      US: { localPrice: 12.00 }, GB: { localPrice: 7.00 }, FR: { localPrice: 7.00 }, IT: { localPrice: 5.00 },
      AU: { localPrice: 15.00 }, AR: { localPrice: 2500 }, CH: { localPrice: 15.00 },
    }),
  },
  {
    id: 'zara-dress',
    name: 'Zara Summer Dress',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Clothing',
    brand: 'Zara',
    categoryPath: 'Physical Goods > Clothing',
    description: 'Mid-range summer dress from Zara',
    unit: '',
    prices: generatePrices(49.90, 'physical', {
      US: { localPrice: 49.90 }, GB: { localPrice: 35.99 }, DE: { localPrice: 39.95 }, ES: { localPrice: 35.95 },
      JP: { localPrice: 5990 }, IN: { localPrice: 2990 }, BR: { localPrice: 249 },
    }),
  },
  {
    id: 'hm-tshirt',
    name: 'H&M Basic T-Shirt',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Clothing',
    brand: 'H&M',
    categoryPath: 'Physical Goods > Clothing',
    description: 'Basic cotton t-shirt from H&M',
    unit: '',
    prices: generatePrices(12.99, 'physical', {
      US: { localPrice: 12.99 }, GB: { localPrice: 8.99 }, DE: { localPrice: 9.99 }, SE: { localPrice: 99 },
      JP: { localPrice: 1499 }, IN: { localPrice: 499 }, BR: { localPrice: 59.90 },
    }),
  },
  {
    id: 'running-shoes',
    name: 'Running Shoes (mid-range)',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Footwear',
    brand: '',
    categoryPath: 'Physical Goods > Footwear',
    description: 'Mid-range running shoes (Asics, New Balance, etc.)',
    unit: '',
    prices: generatePrices(120, 'physical', {
      US: { localPrice: 120 }, GB: { localPrice: 100 }, DE: { localPrice: 120 }, JP: { localPrice: 14000 },
      IN: { localPrice: 6999 }, BR: { localPrice: 599 },
    }),
  },
  {
    id: 'winter-jacket',
    name: 'Winter Jacket (branded)',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Clothing',
    brand: '',
    categoryPath: 'Physical Goods > Clothing',
    description: 'Mid-range branded winter jacket (North Face, Columbia, etc.)',
    unit: '',
    prices: generatePrices(180, 'physical', {
      US: { localPrice: 180 }, GB: { localPrice: 160 }, DE: { localPrice: 180 }, CA: { localPrice: 220 },
      NO: { localPrice: 2000 }, JP: { localPrice: 25000 }, BR: { localPrice: 899 },
    }),
  },
  {
    id: 'formal-suit',
    name: 'Men\'s Business Suit',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Clothing',
    brand: '',
    categoryPath: 'Physical Goods > Clothing',
    description: 'Mid-range men\'s business suit',
    unit: '',
    prices: generatePrices(400, 'physical', {
      US: { localPrice: 400 }, GB: { localPrice: 300 }, DE: { localPrice: 350 }, IT: { localPrice: 400 },
      JP: { localPrice: 50000 }, IN: { localPrice: 15000 }, TH: { localPrice: 6000 },
    }),
  },
  {
    id: 'transit-monthly',
    name: 'Monthly Transit Pass',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Transport',
    brand: '',
    categoryPath: 'Services > Transport',
    description: 'Monthly public transportation pass (bus/metro)',
    unit: '/month',
    prices: generatePrices(75, 'service', {
      US: { localPrice: 75 }, GB: { localPrice: 160 }, DE: { localPrice: 49 }, FR: { localPrice: 84.10 },
      JP: { localPrice: 10000 }, AU: { localPrice: 167 }, SG: { localPrice: 120 },
      IN: { localPrice: 1500 }, BR: { localPrice: 250 }, MX: { localPrice: 450 },
    }),
  },
  {
    id: 'uber-5km',
    name: 'Uber Ride (5 km)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Transport',
    brand: 'Uber',
    categoryPath: 'Services > Transport',
    description: 'Uber or equivalent ride-hail, 5 km trip',
    unit: '',
    prices: generatePrices(10, 'service', {
      US: { localPrice: 10 }, GB: { localPrice: 8 }, DE: { localPrice: 12 }, JP: { localPrice: 1500 },
      IN: { localPrice: 150 }, BR: { localPrice: 15 }, NG: { localPrice: 1500 },
    }),
  },
  {
    id: 'taxi-1km',
    name: 'Taxi (1 km)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Transport',
    brand: '',
    categoryPath: 'Services > Transport',
    description: 'Standard taxi fare for 1 kilometer',
    unit: '/km',
    prices: generatePrices(2.50, 'service', {
      US: { localPrice: 2.50 }, GB: { localPrice: 2.80 }, DE: { localPrice: 2.30 }, JP: { localPrice: 420 },
      CH: { localPrice: 3.80 }, IN: { localPrice: 15 }, TH: { localPrice: 6.50 }, EG: { localPrice: 5 },
    }),
  },
  {
    id: 'car-wash',
    name: 'Car Wash (basic)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Auto Services',
    brand: '',
    categoryPath: 'Services > Auto Services',
    description: 'Basic exterior car wash',
    unit: '',
    prices: generatePrices(15, 'service', {
      US: { localPrice: 15 }, GB: { localPrice: 10 }, DE: { localPrice: 12 }, JP: { localPrice: 1500 },
      AE: { localPrice: 30 }, IN: { localPrice: 300 }, BR: { localPrice: 40 },
    }),
  },
  {
    id: 'apartment-3br',
    name: '3-Bedroom Apartment (City)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Housing',
    brand: '',
    categoryPath: 'Services > Housing',
    description: '3-bedroom apartment monthly rent in city center',
    unit: '/month',
    prices: generatePrices(2500, 'service', {
      US: { localPrice: 2500 }, GB: { localPrice: 2200 }, DE: { localPrice: 1800 }, FR: { localPrice: 2000 },
      JP: { localPrice: 250000 }, AU: { localPrice: 3000 }, CH: { localPrice: 3500 },
      IN: { localPrice: 35000 }, BR: { localPrice: 4000 }, NG: { localPrice: 500000 },
    }),
  },
  {
    id: 'airbnb-1night',
    name: 'Airbnb (1 night, city)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Accommodation',
    brand: 'Airbnb',
    categoryPath: 'Services > Accommodation',
    description: 'Average Airbnb private room, 1 night in city center',
    unit: '/night',
    prices: generatePrices(80, 'service', {
      US: { localPrice: 80 }, GB: { localPrice: 70 }, DE: { localPrice: 60 }, FR: { localPrice: 75 },
      JP: { localPrice: 8000 }, AU: { localPrice: 100 }, TH: { localPrice: 800 },
      IN: { localPrice: 2000 }, BR: { localPrice: 200 }, MX: { localPrice: 800 },
    }),
  },
  {
    id: 'prescription-glasses',
    name: 'Prescription Glasses',
    category: 'medical',
    categoryLabel: 'Medical',
    subcategory: 'Vision',
    brand: '',
    categoryPath: 'Medical > Vision',
    description: 'Complete pair of prescription glasses (frames + lenses)',
    unit: '',
    prices: generatePrices(300, 'medical', {
      US: { localPrice: 300 }, GB: { localPrice: 150 }, DE: { localPrice: 200 }, FR: { localPrice: 250 },
      JP: { localPrice: 15000 }, IN: { localPrice: 3000 }, BR: { localPrice: 500 },
    }),
  },
  {
    id: 'paracetamol',
    name: 'Paracetamol / Tylenol (20 tablets)',
    category: 'medical',
    categoryLabel: 'Medical',
    subcategory: 'Medications',
    brand: '',
    categoryPath: 'Medical > Medications',
    description: '20 tablets of paracetamol/acetaminophen (500mg)',
    unit: '',
    prices: generatePrices(8, 'medical', {
      US: { localPrice: 8 }, GB: { localPrice: 0.65 }, DE: { localPrice: 2.50 }, FR: { localPrice: 2.00 },
      IN: { localPrice: 30 }, BR: { localPrice: 8 }, NG: { localPrice: 500 },
    }),
  },
  {
    id: 'health-insurance-monthly',
    name: 'Health Insurance (monthly)',
    category: 'medical',
    categoryLabel: 'Medical',
    subcategory: 'Insurance',
    brand: '',
    categoryPath: 'Medical > Insurance',
    description: 'Basic health insurance monthly premium (individual)',
    unit: '/month',
    prices: generatePrices(450, 'medical', {
      US: { localPrice: 450 }, GB: { localPrice: 0, notes: 'Free via NHS (tax-funded)' }, DE: { localPrice: 350 },
      FR: { localPrice: 250 }, JP: { localPrice: 30000 }, CA: { localPrice: 0, notes: 'Free via provincial healthcare' },
      IN: { localPrice: 1500 }, BR: { localPrice: 500 },
    }),
  },
  {
    id: 'therapy-session',
    name: 'Therapy Session (1 hr)',
    category: 'medical',
    categoryLabel: 'Medical',
    subcategory: 'Mental Health',
    brand: '',
    categoryPath: 'Medical > Mental Health',
    description: 'One-hour therapy/counseling session',
    unit: '/session',
    prices: generatePrices(150, 'medical', {
      US: { localPrice: 150 }, GB: { localPrice: 60 }, DE: { localPrice: 80 }, FR: { localPrice: 70 },
      AU: { localPrice: 180 }, CA: { localPrice: 150 }, IN: { localPrice: 2000 }, BR: { localPrice: 250 },
    }),
  },
  {
    id: 'hospital-night',
    name: 'Hospital Stay (1 night)',
    category: 'medical',
    categoryLabel: 'Medical',
    subcategory: 'Hospital',
    brand: '',
    categoryPath: 'Medical > Hospital',
    description: 'One night in a hospital (private room, no surgery)',
    unit: '/night',
    prices: generatePrices(3000, 'medical', {
      US: { localPrice: 3000 }, GB: { localPrice: 0, notes: 'Free via NHS' }, DE: { localPrice: 300 },
      JP: { localPrice: 30000 }, AU: { localPrice: 800 }, IN: { localPrice: 5000 }, TH: { localPrice: 5000 },
    }),
  },
  {
    id: 'private-school',
    name: 'Private School (annual)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Education',
    brand: '',
    categoryPath: 'Services > Education',
    description: 'Private K-12 school annual tuition',
    unit: '/year',
    prices: generatePrices(15000, 'service', {
      US: { localPrice: 15000 }, GB: { localPrice: 18000 }, DE: { localPrice: 8000 }, FR: { localPrice: 10000 },
      CH: { localPrice: 30000 }, JP: { localPrice: 1200000 }, AU: { localPrice: 15000 },
      IN: { localPrice: 200000 }, BR: { localPrice: 30000 }, SG: { localPrice: 20000 },
    }),
  },
  {
    id: 'online-course',
    name: 'Online Course (Udemy/Coursera)',
    category: 'digital',
    categoryLabel: 'Digital Goods',
    subcategory: 'Learning',
    brand: '',
    categoryPath: 'Digital Goods > Learning',
    description: 'Average online course on platforms like Udemy or Coursera',
    unit: '',
    prices: generatePrices(20, 'digital', {
      US: { localPrice: 20 }, GB: { localPrice: 16 }, DE: { localPrice: 18 },
      IN: { localPrice: 449 }, BR: { localPrice: 49.90 }, TR: { localPrice: 99 },
    }),
  },
  {
    id: 'textbook',
    name: 'University Textbook',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Books',
    brand: '',
    categoryPath: 'Physical Goods > Books',
    description: 'Average university textbook (new)',
    unit: '',
    prices: generatePrices(80, 'physical', {
      US: { localPrice: 80 }, GB: { localPrice: 50 }, DE: { localPrice: 40 }, JP: { localPrice: 3500 },
      IN: { localPrice: 800 }, BR: { localPrice: 150 },
    }),
  },
  {
    id: 'movie-ticket',
    name: 'Movie Ticket',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Entertainment',
    brand: '',
    categoryPath: 'Services > Entertainment',
    description: 'One cinema ticket for a new release',
    unit: '',
    prices: generatePrices(13, 'service', {
      US: { localPrice: 13 }, GB: { localPrice: 12 }, DE: { localPrice: 12 }, FR: { localPrice: 12 },
      JP: { localPrice: 1900 }, AU: { localPrice: 22 }, IN: { localPrice: 250 }, BR: { localPrice: 30 },
      MX: { localPrice: 85 }, PH: { localPrice: 300 }, EG: { localPrice: 100 },
    }),
  },
  {
    id: 'concert-ticket',
    name: 'Concert Ticket (popular artist)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Entertainment',
    brand: '',
    categoryPath: 'Services > Entertainment',
    description: 'Average ticket for a popular music concert',
    unit: '',
    prices: generatePrices(100, 'service', {
      US: { localPrice: 100 }, GB: { localPrice: 80 }, DE: { localPrice: 85 }, JP: { localPrice: 12000 },
      AU: { localPrice: 130 }, BR: { localPrice: 350 }, MX: { localPrice: 1200 },
    }),
  },
  {
    id: 'museum-entry',
    name: 'Museum Entry',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Entertainment',
    brand: '',
    categoryPath: 'Services > Entertainment',
    description: 'Admission to a major museum',
    unit: '',
    prices: generatePrices(20, 'service', {
      US: { localPrice: 20 }, GB: { localPrice: 0, notes: 'Many major museums are free' }, FR: { localPrice: 17 },
      DE: { localPrice: 14 }, JP: { localPrice: 1000 }, IN: { localPrice: 50 }, EG: { localPrice: 200 },
    }),
  },
  {
    id: 'theme-park',
    name: 'Theme Park Day Pass',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Entertainment',
    brand: '',
    categoryPath: 'Services > Entertainment',
    description: 'One-day admission to a major theme park',
    unit: '',
    prices: generatePrices(110, 'service', {
      US: { localPrice: 110 }, GB: { localPrice: 65 }, DE: { localPrice: 62 }, FR: { localPrice: 59 },
      JP: { localPrice: 8400 }, AU: { localPrice: 100 }, IN: { localPrice: 1500 }, BR: { localPrice: 300 },
    }),
  },
  {
    id: 'shampoo',
    name: 'Shampoo (400ml)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Personal Care',
    brand: '',
    categoryPath: 'Essentials > Personal Care',
    description: 'Brand-name shampoo, 400ml bottle',
    unit: '',
    prices: generatePrices(6.50, 'essential', {
      US: { localPrice: 6.50 }, GB: { localPrice: 4.00 }, DE: { localPrice: 3.50 },
      IN: { localPrice: 250 }, BR: { localPrice: 25 }, NG: { localPrice: 2500 },
    }),
  },
  {
    id: 'toothpaste',
    name: 'Toothpaste (Colgate, 100ml)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Personal Care',
    brand: 'Colgate',
    categoryPath: 'Essentials > Personal Care',
    description: 'Standard toothpaste tube, 100ml',
    unit: '',
    prices: generatePrices(3.50, 'essential', {
      US: { localPrice: 3.50 }, GB: { localPrice: 1.50 }, DE: { localPrice: 1.49 },
      IN: { localPrice: 80 }, BR: { localPrice: 10 }, PH: { localPrice: 80 },
    }),
  },
  {
    id: 'deodorant',
    name: 'Deodorant (roll-on)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Personal Care',
    brand: '',
    categoryPath: 'Essentials > Personal Care',
    description: 'Brand-name roll-on deodorant',
    unit: '',
    prices: generatePrices(5.00, 'essential', {
      US: { localPrice: 5.00 }, GB: { localPrice: 2.50 }, DE: { localPrice: 2.99 },
      IN: { localPrice: 180 }, BR: { localPrice: 15 },
    }),
  },
  {
    id: 'skincare-serum',
    name: 'Skincare Serum (30ml)',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Personal Care',
    brand: '',
    categoryPath: 'Physical Goods > Personal Care',
    description: 'Popular skincare serum (e.g., Vitamin C, hyaluronic acid)',
    unit: '',
    prices: generatePrices(25, 'physical', {
      US: { localPrice: 25 }, GB: { localPrice: 18 }, KR: { localPrice: 20000 }, JP: { localPrice: 3000 },
      IN: { localPrice: 1200 }, BR: { localPrice: 120 },
    }),
  },
  {
    id: 'ikea-bookshelf',
    name: 'IKEA BILLY Bookshelf',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Furniture',
    brand: 'IKEA',
    categoryPath: 'Physical Goods > Furniture',
    description: 'IKEA BILLY bookcase (standard)',
    unit: '',
    prices: generatePrices(69, 'physical', {
      US: { localPrice: 69 }, GB: { localPrice: 55 }, DE: { localPrice: 49 }, SE: { localPrice: 599 },
      JP: { localPrice: 7990 }, AU: { localPrice: 99 }, IN: { localPrice: 6990 },
    }),
  },
  {
    id: 'washing-machine',
    name: 'Washing Machine',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Home Appliances',
    brand: '',
    categoryPath: 'Physical Goods > Home Appliances',
    description: 'Mid-range front-loading washing machine',
    unit: '',
    prices: generatePrices(600, 'physical', {
      US: { localPrice: 600 }, GB: { localPrice: 450 }, DE: { localPrice: 500 }, JP: { localPrice: 80000 },
      IN: { localPrice: 30000 }, BR: { localPrice: 2500 },
    }),
  },
  {
    id: 'microwave',
    name: 'Microwave Oven',
    category: 'physical',
    categoryLabel: 'Physical Goods',
    subcategory: 'Home Appliances',
    brand: '',
    categoryPath: 'Physical Goods > Home Appliances',
    description: 'Standard countertop microwave',
    unit: '',
    prices: generatePrices(100, 'physical', {
      US: { localPrice: 100 }, GB: { localPrice: 70 }, DE: { localPrice: 80 }, JP: { localPrice: 12000 },
      IN: { localPrice: 6000 }, BR: { localPrice: 500 },
    }),
  },
  {
    id: 'mobile-data-1gb',
    name: 'Mobile Data (1 GB)',
    category: 'digital',
    categoryLabel: 'Digital Goods',
    subcategory: 'Mobile',
    brand: '',
    categoryPath: 'Digital Goods > Mobile',
    description: 'Price of 1 GB of mobile data',
    unit: '',
    prices: generatePrices(5, 'digital', {
      US: { localPrice: 5 }, GB: { localPrice: 2 }, DE: { localPrice: 3 }, FR: { localPrice: 1 },
      IN: { localPrice: 15 }, IL: { localPrice: 5 }, BR: { localPrice: 5 }, NG: { localPrice: 350 },
    }),
  },
  {
    id: 'phone-plan-unlimited',
    name: 'Phone Plan (unlimited)',
    category: 'digital',
    categoryLabel: 'Digital Goods',
    subcategory: 'Mobile',
    brand: '',
    categoryPath: 'Digital Goods > Mobile',
    description: 'Monthly unlimited calls + data phone plan',
    unit: '/month',
    prices: generatePrices(60, 'digital', {
      US: { localPrice: 60 }, GB: { localPrice: 20 }, DE: { localPrice: 30 }, FR: { localPrice: 20 },
      JP: { localPrice: 7000 }, IN: { localPrice: 599 }, BR: { localPrice: 100 },
    }),
  },
  {
    id: 'accountant-hour',
    name: 'Accountant (1 hr)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Professional',
    brand: '',
    categoryPath: 'Services > Professional',
    description: 'One hour of certified accountant services',
    unit: '/hr',
    prices: generatePrices(100, 'service', {
      US: { localPrice: 100 }, GB: { localPrice: 80 }, DE: { localPrice: 90 }, JP: { localPrice: 10000 },
      IN: { localPrice: 1500 }, BR: { localPrice: 200 },
    }),
  },
  {
    id: 'house-cleaning',
    name: 'House Cleaning (2 hrs)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Home Services',
    brand: '',
    categoryPath: 'Services > Home Services',
    description: 'Professional house cleaning service, 2 hours',
    unit: '',
    prices: generatePrices(80, 'service', {
      US: { localPrice: 80 }, GB: { localPrice: 50 }, DE: { localPrice: 60 }, AU: { localPrice: 100 },
      IN: { localPrice: 500 }, BR: { localPrice: 100 }, PH: { localPrice: 500 },
    }),
  },
  {
    id: 'dry-cleaning',
    name: 'Dry Cleaning (suit)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Home Services',
    brand: '',
    categoryPath: 'Services > Home Services',
    description: 'Dry cleaning one business suit',
    unit: '',
    prices: generatePrices(15, 'service', {
      US: { localPrice: 15 }, GB: { localPrice: 12 }, DE: { localPrice: 10 }, JP: { localPrice: 1500 },
      IN: { localPrice: 300 }, BR: { localPrice: 40 }, AE: { localPrice: 30 },
    }),
  },
  {
    id: 'fast-food-meal',
    name: 'Fast Food Combo Meal',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Fast Food',
    brand: '',
    categoryPath: 'Essentials > Fast Food',
    description: 'Standard fast food combo meal (burger + fries + drink)',
    unit: '',
    prices: generatePrices(9, 'essential', {
      US: { localPrice: 9 }, GB: { localPrice: 6.50 }, DE: { localPrice: 8.99 }, JP: { localPrice: 750 },
      AU: { localPrice: 13 }, IN: { localPrice: 250 }, BR: { localPrice: 35 }, PH: { localPrice: 200 },
    }),
  },
  {
    id: 'pizza-delivery',
    name: 'Pizza Delivery (large)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Fast Food',
    brand: '',
    categoryPath: 'Essentials > Fast Food',
    description: 'Large pizza delivered (e.g., Domino\'s, local equivalent)',
    unit: '',
    prices: generatePrices(15, 'essential', {
      US: { localPrice: 15 }, GB: { localPrice: 12 }, DE: { localPrice: 11 }, JP: { localPrice: 2500 },
      AU: { localPrice: 18 }, IN: { localPrice: 500 }, BR: { localPrice: 50 },
    }),
  },
  {
    id: 'yoga-class',
    name: 'Yoga Class (drop-in)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Fitness',
    brand: '',
    categoryPath: 'Services > Fitness',
    description: 'Single drop-in yoga class session',
    unit: '',
    prices: generatePrices(20, 'service', {
      US: { localPrice: 20 }, GB: { localPrice: 15 }, DE: { localPrice: 15 }, AU: { localPrice: 25 },
      IN: { localPrice: 500 }, TH: { localPrice: 300 }, BR: { localPrice: 50 },
    }),
  },
  {
    id: 'personal-trainer',
    name: 'Personal Trainer (1 hr)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Fitness',
    brand: '',
    categoryPath: 'Services > Fitness',
    description: 'One hour with a certified personal trainer',
    unit: '/hr',
    prices: generatePrices(60, 'service', {
      US: { localPrice: 60 }, GB: { localPrice: 45 }, DE: { localPrice: 50 }, AU: { localPrice: 80 },
      AE: { localPrice: 250 }, IN: { localPrice: 1500 }, BR: { localPrice: 100 },
    }),
  },
  {
    id: 'diapers-pack',
    name: 'Diapers (pack of 60)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Baby & Childcare',
    brand: '',
    categoryPath: 'Essentials > Baby & Childcare',
    description: 'Pack of 60 baby diapers (Pampers or equivalent)',
    unit: '',
    prices: generatePrices(25, 'essential', {
      US: { localPrice: 25 }, GB: { localPrice: 12 }, DE: { localPrice: 15 }, JP: { localPrice: 1800 },
      IN: { localPrice: 800 }, BR: { localPrice: 60 },
    }),
  },
  {
    id: 'baby-formula',
    name: 'Baby Formula (400g)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Baby & Childcare',
    brand: '',
    categoryPath: 'Essentials > Baby & Childcare',
    description: 'Infant formula, 400g tin',
    unit: '',
    prices: generatePrices(18, 'essential', {
      US: { localPrice: 18 }, GB: { localPrice: 11 }, DE: { localPrice: 12 }, JP: { localPrice: 2500 },
      AU: { localPrice: 22 }, IN: { localPrice: 600 }, BR: { localPrice: 45 },
    }),
  },
  {
    id: 'daycare-monthly',
    name: 'Daycare (monthly)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Childcare',
    brand: '',
    categoryPath: 'Services > Childcare',
    description: 'Full-time daycare / nursery for one child, per month',
    unit: '/month',
    prices: generatePrices(1200, 'service', {
      US: { localPrice: 1200 }, GB: { localPrice: 1300 }, DE: { localPrice: 400 }, FR: { localPrice: 600 },
      AU: { localPrice: 1800 }, CA: { localPrice: 1000 }, SE: { localPrice: 1500 },
      IN: { localPrice: 10000 }, BR: { localPrice: 1500 }, JP: { localPrice: 50000 },
    }),
  },
  {
    id: 'vet-visit',
    name: 'Vet Visit (checkup)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Pet Services',
    brand: '',
    categoryPath: 'Services > Pet Services',
    description: 'Standard veterinary checkup for a pet',
    unit: '',
    prices: generatePrices(55, 'service', {
      US: { localPrice: 55 }, GB: { localPrice: 35 }, DE: { localPrice: 30 }, AU: { localPrice: 80 },
      JP: { localPrice: 5000 }, IN: { localPrice: 500 }, BR: { localPrice: 150 },
    }),
  },
  {
    id: 'dog-food-monthly',
    name: 'Dog Food (monthly)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Pet Supplies',
    brand: '',
    categoryPath: 'Essentials > Pet Supplies',
    description: 'One month supply of mid-range dry dog food',
    unit: '/month',
    prices: generatePrices(45, 'essential', {
      US: { localPrice: 45 }, GB: { localPrice: 35 }, DE: { localPrice: 30 }, JP: { localPrice: 5000 },
      AU: { localPrice: 55 }, IN: { localPrice: 1500 }, BR: { localPrice: 120 },
    }),
  },
  {
    id: 'hotel-3star',
    name: 'Hotel Night (3-star)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Accommodation',
    brand: '',
    categoryPath: 'Services > Accommodation',
    description: 'One night in a 3-star hotel in city center',
    unit: '/night',
    prices: generatePrices(120, 'service', {
      US: { localPrice: 120 }, GB: { localPrice: 100 }, DE: { localPrice: 90 }, FR: { localPrice: 100 },
      JP: { localPrice: 12000 }, AU: { localPrice: 150 }, TH: { localPrice: 1500 },
      IN: { localPrice: 3000 }, BR: { localPrice: 300 }, EG: { localPrice: 1500 },
    }),
  },
  {
    id: 'domestic-flight',
    name: 'Domestic Flight (1 hr)',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Transport',
    brand: '',
    categoryPath: 'Services > Transport',
    description: 'One-way domestic flight, ~1 hour duration',
    unit: '',
    prices: generatePrices(150, 'service', {
      US: { localPrice: 150 }, GB: { localPrice: 80 }, DE: { localPrice: 70 }, FR: { localPrice: 80 },
      JP: { localPrice: 15000 }, AU: { localPrice: 150 }, IN: { localPrice: 4000 },
      BR: { localPrice: 500 }, MX: { localPrice: 1500 },
    }),
  },
  {
    id: 'passport-renewal',
    name: 'Passport Renewal',
    category: 'service',
    categoryLabel: 'Services',
    subcategory: 'Government',
    brand: '',
    categoryPath: 'Services > Government',
    description: 'Cost to renew an adult passport',
    unit: '',
    prices: generatePrices(130, 'service', {
      US: { localPrice: 130 }, GB: { localPrice: 82.50 }, DE: { localPrice: 70 }, FR: { localPrice: 86 },
      JP: { localPrice: 16000 }, AU: { localPrice: 325 }, CA: { localPrice: 160 },
      IN: { localPrice: 1500 }, BR: { localPrice: 257 },
    }),
  },
  {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus',
    category: 'digital',
    categoryLabel: 'Digital Goods',
    subcategory: 'AI Tools',
    brand: 'OpenAI',
    categoryPath: 'Digital Goods > AI Tools',
    description: 'Monthly ChatGPT Plus subscription',
    unit: '/month',
    prices: generatePrices(20, 'digital', {
      US: { localPrice: 20 }, GB: { localPrice: 20 }, DE: { localPrice: 24 },
      IN: { localPrice: 2000 }, BR: { localPrice: 110 }, JP: { localPrice: 3000 },
    }),
  },
  {
    id: 'youtube-premium',
    name: 'YouTube Premium',
    category: 'digital',
    categoryLabel: 'Digital Goods',
    subcategory: 'Streaming Video',
    brand: 'Google',
    categoryPath: 'Digital Goods > Streaming Video',
    description: 'Monthly YouTube Premium individual plan',
    unit: '/month',
    prices: generatePrices(13.99, 'digital', {
      US: { localPrice: 13.99 }, GB: { localPrice: 12.99 }, DE: { localPrice: 12.99 },
      IN: { localPrice: 149 }, BR: { localPrice: 28.99 }, TR: { localPrice: 57.99 }, AR: { localPrice: 1169 },
    }),
  },
  {
    id: 'disney-plus',
    name: 'Disney+ Standard',
    category: 'digital',
    categoryLabel: 'Digital Goods',
    subcategory: 'Streaming Video',
    brand: 'Disney',
    categoryPath: 'Digital Goods > Streaming Video',
    description: 'Monthly Disney+ Standard subscription',
    unit: '/month',
    prices: generatePrices(13.99, 'digital', {
      US: { localPrice: 13.99 }, GB: { localPrice: 7.99 }, DE: { localPrice: 8.99 },
      JP: { localPrice: 990 }, IN: { localPrice: 299 }, BR: { localPrice: 33.90 },
    }),
  },
  {
    id: 'amazon-prime',
    name: 'Amazon Prime (annual)',
    category: 'digital',
    categoryLabel: 'Digital Goods',
    subcategory: 'Streaming Video',
    brand: 'Amazon',
    categoryPath: 'Digital Goods > Streaming Video',
    description: 'Annual Amazon Prime membership',
    unit: '/year',
    prices: generatePrices(139, 'digital', {
      US: { localPrice: 139 }, GB: { localPrice: 95 }, DE: { localPrice: 89.90 }, FR: { localPrice: 69.90 },
      JP: { localPrice: 5900 }, IN: { localPrice: 1499 }, BR: { localPrice: 166.80 },
    }),
  },
  {
    id: 'gas-monthly',
    name: 'Natural Gas (monthly)',
    category: 'essential',
    categoryLabel: 'Essentials',
    subcategory: 'Utilities',
    brand: '',
    categoryPath: 'Essentials > Utilities',
    description: 'Average monthly natural gas bill for household',
    unit: '/month',
    prices: generatePrices(60, 'essential', {
      US: { localPrice: 60 }, GB: { localPrice: 80 }, DE: { localPrice: 100 }, FR: { localPrice: 70 },
      JP: { localPrice: 5000 }, AU: { localPrice: 80 }, IN: { localPrice: 500 }, BR: { localPrice: 50 },
    }),
  },
  { id: 'toyota-camry', name: 'Toyota Camry', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Toyota Camry', unit: '', prices: generatePrices(28855, 'physical') },
  { id: 'toyota-corolla', name: 'Toyota Corolla', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Toyota Corolla', unit: '', prices: generatePrices(22995, 'physical') },
  { id: 'toyota-avalon', name: 'Toyota Avalon', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Toyota Avalon', unit: '', prices: generatePrices(37070, 'physical') },
  { id: 'toyota-prius', name: 'Toyota Prius', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Toyota Prius', unit: '', prices: generatePrices(28075, 'physical') },
  { id: 'toyota-crown', name: 'Toyota Crown', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Toyota Crown', unit: '', prices: generatePrices(41955, 'physical') },
  { id: 'toyota-mirai', name: 'Toyota Mirai', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Toyota Mirai', unit: '', prices: generatePrices(50525, 'physical') },
  { id: 'toyota-rav4', name: 'Toyota RAV4', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Toyota RAV4', unit: '', prices: generatePrices(30090, 'physical') },
  { id: 'toyota-highlander', name: 'Toyota Highlander', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Toyota Highlander', unit: '', prices: generatePrices(39520, 'physical') },
  { id: 'toyota-4runner', name: 'Toyota 4Runner', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Toyota 4Runner', unit: '', prices: generatePrices(41290, 'physical') },
  { id: 'toyota-sequoia', name: 'Toyota Sequoia', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Toyota Sequoia', unit: '', prices: generatePrices(61275, 'physical') },
  { id: 'toyota-venza', name: 'Toyota Venza', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Toyota Venza', unit: '', prices: generatePrices(35070, 'physical') },
  { id: 'toyota-corolla-cross', name: 'Toyota Corolla Cross', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Toyota Corolla Cross', unit: '', prices: generatePrices(24410, 'physical') },
  { id: 'toyota-grand-highlander', name: 'Toyota Grand Highlander', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Toyota Grand Highlander', unit: '', prices: generatePrices(44405, 'physical') },
  { id: 'toyota-bz4x', name: 'Toyota bZ4X', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Toyota bZ4X', unit: '', prices: generatePrices(43070, 'physical') },
  { id: 'toyota-land-cruiser', name: 'Toyota Land Cruiser', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Toyota Land Cruiser', unit: '', prices: generatePrices(57345, 'physical') },
  { id: 'toyota-tacoma', name: 'Toyota Tacoma', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Toyota Tacoma', unit: '', prices: generatePrices(31990, 'physical') },
  { id: 'toyota-tundra', name: 'Toyota Tundra', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Toyota Tundra', unit: '', prices: generatePrices(39255, 'physical') },
  { id: 'toyota-gr86', name: 'Toyota GR86', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Toyota GR86', unit: '', prices: generatePrices(29495, 'physical') },
  { id: 'toyota-gr-supra', name: 'Toyota GR Supra', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Toyota GR Supra', unit: '', prices: generatePrices(44740, 'physical') },
  { id: 'toyota-gr-corolla', name: 'Toyota GR Corolla', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Toyota GR Corolla', unit: '', prices: generatePrices(36100, 'physical') },
  { id: 'toyota-sienna', name: 'Toyota Sienna', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Van', brand: 'Toyota', categoryPath: 'Physical Goods > Automobiles > Van', description: 'Toyota Sienna', unit: '', prices: generatePrices(37385, 'physical') },
  { id: 'honda-civic', name: 'Honda Civic', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Honda', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Honda Civic', unit: '', prices: generatePrices(24950, 'physical') },
  { id: 'honda-accord', name: 'Honda Accord', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Honda', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Honda Accord', unit: '', prices: generatePrices(29610, 'physical') },
  { id: 'honda-insight', name: 'Honda Insight', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Honda', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Honda Insight', unit: '', prices: generatePrices(26570, 'physical') },
  { id: 'honda-cr-v', name: 'Honda CR-V', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Honda', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Honda CR-V', unit: '', prices: generatePrices(31110, 'physical') },
  { id: 'honda-hr-v', name: 'Honda HR-V', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Honda', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Honda HR-V', unit: '', prices: generatePrices(24550, 'physical') },
  { id: 'honda-pilot', name: 'Honda Pilot', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Honda', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Honda Pilot', unit: '', prices: generatePrices(40170, 'physical') },
  { id: 'honda-passport', name: 'Honda Passport', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Honda', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Honda Passport', unit: '', prices: generatePrices(40895, 'physical') },
  { id: 'honda-prologue', name: 'Honda Prologue', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Honda', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Honda Prologue', unit: '', prices: generatePrices(48795, 'physical') },
  { id: 'honda-zr-v', name: 'Honda ZR-V', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Honda', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Honda ZR-V', unit: '', prices: generatePrices(32500, 'physical') },
  { id: 'honda-ridgeline', name: 'Honda Ridgeline', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Honda', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Honda Ridgeline', unit: '', prices: generatePrices(40250, 'physical') },
  { id: 'honda-odyssey', name: 'Honda Odyssey', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Van', brand: 'Honda', categoryPath: 'Physical Goods > Automobiles > Van', description: 'Honda Odyssey', unit: '', prices: generatePrices(39510, 'physical') },
  { id: 'honda-civic-type-r', name: 'Honda Civic Type R', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Honda', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Honda Civic Type R', unit: '', prices: generatePrices(44890, 'physical') },
  { id: 'honda-civic-si', name: 'Honda Civic Si', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Honda', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Honda Civic Si', unit: '', prices: generatePrices(29700, 'physical') },
  { id: 'ford-fusion', name: 'Ford Fusion', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Ford', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Ford Fusion', unit: '', prices: generatePrices(25185, 'physical') },
  { id: 'ford-explorer', name: 'Ford Explorer', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Ford', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Ford Explorer', unit: '', prices: generatePrices(38355, 'physical') },
  { id: 'ford-escape', name: 'Ford Escape', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Ford', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Ford Escape', unit: '', prices: generatePrices(30495, 'physical') },
  { id: 'ford-bronco', name: 'Ford Bronco', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Ford', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Ford Bronco', unit: '', prices: generatePrices(37495, 'physical') },
  { id: 'ford-bronco-sport', name: 'Ford Bronco Sport', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Ford', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Ford Bronco Sport', unit: '', prices: generatePrices(30695, 'physical') },
  { id: 'ford-expedition', name: 'Ford Expedition', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Ford', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Ford Expedition', unit: '', prices: generatePrices(58295, 'physical') },
  { id: 'ford-edge', name: 'Ford Edge', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Ford', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Ford Edge', unit: '', prices: generatePrices(37595, 'physical') },
  { id: 'ford-ecosport', name: 'Ford EcoSport', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Ford', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Ford EcoSport', unit: '', prices: generatePrices(22560, 'physical') },
  { id: 'ford-f-150', name: 'Ford F-150', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Ford', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Ford F-150', unit: '', prices: generatePrices(36965, 'physical') },
  { id: 'ford-f-250-super-duty', name: 'Ford F-250 Super Duty', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Ford', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Ford F-250 Super Duty', unit: '', prices: generatePrices(46065, 'physical') },
  { id: 'ford-f-350-super-duty', name: 'Ford F-350 Super Duty', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Ford', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Ford F-350 Super Duty', unit: '', prices: generatePrices(48075, 'physical') },
  { id: 'ford-ranger', name: 'Ford Ranger', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Ford', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Ford Ranger', unit: '', prices: generatePrices(34960, 'physical') },
  { id: 'ford-maverick', name: 'Ford Maverick', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Ford', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Ford Maverick', unit: '', prices: generatePrices(25515, 'physical') },
  { id: 'ford-mustang', name: 'Ford Mustang', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Ford', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Ford Mustang', unit: '', prices: generatePrices(32515, 'physical') },
  { id: 'ford-mustang-mach-e', name: 'Ford Mustang Mach-E', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Ford', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Ford Mustang Mach-E', unit: '', prices: generatePrices(45995, 'physical') },
  { id: 'ford-mustang-dark-horse', name: 'Ford Mustang Dark Horse', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Ford', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Ford Mustang Dark Horse', unit: '', prices: generatePrices(59565, 'physical') },
  { id: 'ford-transit', name: 'Ford Transit', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Van', brand: 'Ford', categoryPath: 'Physical Goods > Automobiles > Van', description: 'Ford Transit', unit: '', prices: generatePrices(42930, 'physical') },
  { id: 'ford-transit-connect', name: 'Ford Transit Connect', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Van', brand: 'Ford', categoryPath: 'Physical Goods > Automobiles > Van', description: 'Ford Transit Connect', unit: '', prices: generatePrices(30960, 'physical') },
  { id: 'ford-e-transit', name: 'Ford E-Transit', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Van', brand: 'Ford', categoryPath: 'Physical Goods > Automobiles > Van', description: 'Ford E-Transit', unit: '', prices: generatePrices(52690, 'physical') },
  { id: 'ford-f-150-lightning', name: 'Ford F-150 Lightning', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Ford', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Ford F-150 Lightning', unit: '', prices: generatePrices(54995, 'physical') },
  { id: 'chevrolet-malibu', name: 'Chevrolet Malibu', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Chevrolet', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Chevrolet Malibu', unit: '', prices: generatePrices(25100, 'physical') },
  { id: 'chevrolet-camaro', name: 'Chevrolet Camaro', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Chevrolet', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Chevrolet Camaro', unit: '', prices: generatePrices(29200, 'physical') },
  { id: 'chevrolet-equinox', name: 'Chevrolet Equinox', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Chevrolet', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Chevrolet Equinox', unit: '', prices: generatePrices(31295, 'physical') },
  { id: 'chevrolet-tahoe', name: 'Chevrolet Tahoe', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Chevrolet', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Chevrolet Tahoe', unit: '', prices: generatePrices(58295, 'physical') },
  { id: 'chevrolet-suburban', name: 'Chevrolet Suburban', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Chevrolet', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Chevrolet Suburban', unit: '', prices: generatePrices(62795, 'physical') },
  { id: 'chevrolet-traverse', name: 'Chevrolet Traverse', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Chevrolet', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Chevrolet Traverse', unit: '', prices: generatePrices(36490, 'physical') },
  { id: 'chevrolet-trailblazer', name: 'Chevrolet Trailblazer', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Chevrolet', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Chevrolet Trailblazer', unit: '', prices: generatePrices(24395, 'physical') },
  { id: 'chevrolet-blazer', name: 'Chevrolet Blazer', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Chevrolet', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Chevrolet Blazer', unit: '', prices: generatePrices(38295, 'physical') },
  { id: 'chevrolet-trax', name: 'Chevrolet Trax', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Chevrolet', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Chevrolet Trax', unit: '', prices: generatePrices(21495, 'physical') },
  { id: 'chevrolet-silverado-1500', name: 'Chevrolet Silverado 1500', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Chevrolet', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Chevrolet Silverado 1500', unit: '', prices: generatePrices(38495, 'physical') },
  { id: 'chevrolet-silverado-2500hd', name: 'Chevrolet Silverado 2500HD', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Chevrolet', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Chevrolet Silverado 2500HD', unit: '', prices: generatePrices(46195, 'physical') },
  { id: 'chevrolet-silverado-3500hd', name: 'Chevrolet Silverado 3500HD', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Chevrolet', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Chevrolet Silverado 3500HD', unit: '', prices: generatePrices(47395, 'physical') },
  { id: 'chevrolet-colorado', name: 'Chevrolet Colorado', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Chevrolet', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Chevrolet Colorado', unit: '', prices: generatePrices(31895, 'physical') },
  { id: 'chevrolet-corvette-stingray', name: 'Chevrolet Corvette Stingray', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Chevrolet', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Chevrolet Corvette Stingray', unit: '', prices: generatePrices(68300, 'physical') },
  { id: 'chevrolet-corvette-z06', name: 'Chevrolet Corvette Z06', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Chevrolet', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Chevrolet Corvette Z06', unit: '', prices: generatePrices(115300, 'physical') },
  { id: 'chevrolet-corvette-e-ray', name: 'Chevrolet Corvette E-Ray', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Chevrolet', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Chevrolet Corvette E-Ray', unit: '', prices: generatePrices(109300, 'physical') },
  { id: 'chevrolet-bolt-euv', name: 'Chevrolet Bolt EUV', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Chevrolet', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Chevrolet Bolt EUV', unit: '', prices: generatePrices(28795, 'physical') },
  { id: 'chevrolet-equinox-ev', name: 'Chevrolet Equinox EV', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Chevrolet', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Chevrolet Equinox EV', unit: '', prices: generatePrices(34995, 'physical') },
  { id: 'chevrolet-blazer-ev', name: 'Chevrolet Blazer EV', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Chevrolet', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Chevrolet Blazer EV', unit: '', prices: generatePrices(51995, 'physical') },
  { id: 'chevrolet-silverado-ev', name: 'Chevrolet Silverado EV', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Chevrolet', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Chevrolet Silverado EV', unit: '', prices: generatePrices(74800, 'physical') },
  { id: 'bmw-3-series', name: 'BMW 3 Series', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'BMW 3 Series', unit: '', prices: generatePrices(44450, 'physical') },
  { id: 'bmw-5-series', name: 'BMW 5 Series', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'BMW 5 Series', unit: '', prices: generatePrices(57195, 'physical') },
  { id: 'bmw-7-series', name: 'BMW 7 Series', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'BMW 7 Series', unit: '', prices: generatePrices(96295, 'physical') },
  { id: 'bmw-i4', name: 'BMW i4', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'BMW i4', unit: '', prices: generatePrices(53195, 'physical') },
  { id: 'bmw-i5', name: 'BMW i5', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'BMW i5', unit: '', prices: generatePrices(68195, 'physical') },
  { id: 'bmw-i7', name: 'BMW i7', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'BMW i7', unit: '', prices: generatePrices(109895, 'physical') },
  { id: 'bmw-2-series-gran-coupe', name: 'BMW 2 Series Gran Coupe', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'BMW 2 Series Gran Coupe', unit: '', prices: generatePrices(38800, 'physical') },
  { id: 'bmw-x1', name: 'BMW X1', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'BMW X1', unit: '', prices: generatePrices(40250, 'physical') },
  { id: 'bmw-x3', name: 'BMW X3', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'BMW X3', unit: '', prices: generatePrices(48150, 'physical') },
  { id: 'bmw-x5', name: 'BMW X5', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'BMW X5', unit: '', prices: generatePrices(65200, 'physical') },
  { id: 'bmw-x7', name: 'BMW X7', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'BMW X7', unit: '', prices: generatePrices(80600, 'physical') },
  { id: 'bmw-ix', name: 'BMW iX', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'BMW iX', unit: '', prices: generatePrices(87100, 'physical') },
  { id: 'bmw-xm', name: 'BMW XM', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'BMW XM', unit: '', prices: generatePrices(113100, 'physical') },
  { id: 'bmw-x2', name: 'BMW X2', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'BMW X2', unit: '', prices: generatePrices(39900, 'physical') },
  { id: 'bmw-x4', name: 'BMW X4', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'BMW X4', unit: '', prices: generatePrices(54300, 'physical') },
  { id: 'bmw-x6', name: 'BMW X6', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'BMW X6', unit: '', prices: generatePrices(72800, 'physical') },
  { id: 'bmw-m3', name: 'BMW M3', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'BMW M3', unit: '', prices: generatePrices(76900, 'physical') },
  { id: 'bmw-m4', name: 'BMW M4', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'BMW M4', unit: '', prices: generatePrices(79200, 'physical') },
  { id: 'bmw-m5', name: 'BMW M5', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'BMW M5', unit: '', prices: generatePrices(110895, 'physical') },
  { id: 'bmw-m8', name: 'BMW M8', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'BMW M8', unit: '', prices: generatePrices(134600, 'physical') },
  { id: 'bmw-z4', name: 'BMW Z4', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'BMW Z4', unit: '', prices: generatePrices(54700, 'physical') },
  { id: 'bmw-m2', name: 'BMW M2', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'BMW M2', unit: '', prices: generatePrices(64900, 'physical') },
  { id: 'bmw-ix1', name: 'BMW iX1', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'BMW iX1', unit: '', prices: generatePrices(48500, 'physical') },
  { id: 'bmw-ix3', name: 'BMW iX3', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'BMW', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'BMW iX3', unit: '', prices: generatePrices(67300, 'physical') },
  { id: 'mercedes-benz-c-class', name: 'Mercedes-Benz C-Class', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Mercedes-Benz C-Class', unit: '', prices: generatePrices(47850, 'physical') },
  { id: 'mercedes-benz-e-class', name: 'Mercedes-Benz E-Class', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Mercedes-Benz E-Class', unit: '', prices: generatePrices(58750, 'physical') },
  { id: 'mercedes-benz-s-class', name: 'Mercedes-Benz S-Class', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Mercedes-Benz S-Class', unit: '', prices: generatePrices(118300, 'physical') },
  { id: 'mercedes-benz-a-class', name: 'Mercedes-Benz A-Class', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Mercedes-Benz A-Class', unit: '', prices: generatePrices(36230, 'physical') },
  { id: 'mercedes-benz-cla', name: 'Mercedes-Benz CLA', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Mercedes-Benz CLA', unit: '', prices: generatePrices(40650, 'physical') },
  { id: 'mercedes-benz-glc', name: 'Mercedes-Benz GLC', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mercedes-Benz GLC', unit: '', prices: generatePrices(49950, 'physical') },
  { id: 'mercedes-benz-gle', name: 'Mercedes-Benz GLE', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mercedes-Benz GLE', unit: '', prices: generatePrices(63950, 'physical') },
  { id: 'mercedes-benz-gls', name: 'Mercedes-Benz GLS', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mercedes-Benz GLS', unit: '', prices: generatePrices(83850, 'physical') },
  { id: 'mercedes-benz-glb', name: 'Mercedes-Benz GLB', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mercedes-Benz GLB', unit: '', prices: generatePrices(44050, 'physical') },
  { id: 'mercedes-benz-gla', name: 'Mercedes-Benz GLA', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mercedes-Benz GLA', unit: '', prices: generatePrices(39650, 'physical') },
  { id: 'mercedes-benz-g-class', name: 'Mercedes-Benz G-Class', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mercedes-Benz G-Class', unit: '', prices: generatePrices(147500, 'physical') },
  { id: 'mercedes-benz-eqs-suv', name: 'Mercedes-Benz EQS SUV', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mercedes-Benz EQS SUV', unit: '', prices: generatePrices(110150, 'physical') },
  { id: 'mercedes-benz-eqe-suv', name: 'Mercedes-Benz EQE SUV', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mercedes-Benz EQE SUV', unit: '', prices: generatePrices(79050, 'physical') },
  { id: 'mercedes-benz-amg-gt', name: 'Mercedes-Benz AMG GT', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Mercedes-Benz AMG GT', unit: '', prices: generatePrices(135900, 'physical') },
  { id: 'mercedes-benz-amg-c-63', name: 'Mercedes-Benz AMG C 63', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Mercedes-Benz AMG C 63', unit: '', prices: generatePrices(83900, 'physical') },
  { id: 'mercedes-benz-amg-e-63', name: 'Mercedes-Benz AMG E 63', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Mercedes-Benz AMG E 63', unit: '', prices: generatePrices(112900, 'physical') },
  { id: 'mercedes-benz-cle-coupe', name: 'Mercedes-Benz CLE Coupe', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Mercedes-Benz CLE Coupe', unit: '', prices: generatePrices(54950, 'physical') },
  { id: 'mercedes-benz-sl', name: 'Mercedes-Benz SL', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Mercedes-Benz SL', unit: '', prices: generatePrices(115850, 'physical') },
  { id: 'mercedes-benz-eqs', name: 'Mercedes-Benz EQS', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Mercedes-Benz EQS', unit: '', prices: generatePrices(105550, 'physical') },
  { id: 'mercedes-benz-eqe', name: 'Mercedes-Benz EQE', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Mercedes-Benz EQE', unit: '', prices: generatePrices(75900, 'physical') },
  { id: 'mercedes-benz-eqb', name: 'Mercedes-Benz EQB', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Mercedes-Benz EQB', unit: '', prices: generatePrices(54500, 'physical') },
  { id: 'mercedes-benz-eqa', name: 'Mercedes-Benz EQA', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Mercedes-Benz EQA', unit: '', prices: generatePrices(50650, 'physical') },
  { id: 'mercedes-benz-sprinter', name: 'Mercedes-Benz Sprinter', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Van', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > Van', description: 'Mercedes-Benz Sprinter', unit: '', prices: generatePrices(42050, 'physical') },
  { id: 'mercedes-benz-metris', name: 'Mercedes-Benz Metris', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Van', brand: 'Mercedes-Benz', categoryPath: 'Physical Goods > Automobiles > Van', description: 'Mercedes-Benz Metris', unit: '', prices: generatePrices(37990, 'physical') },
  { id: 'audi-a3', name: 'Audi A3', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Audi A3', unit: '', prices: generatePrices(37400, 'physical') },
  { id: 'audi-a4', name: 'Audi A4', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Audi A4', unit: '', prices: generatePrices(42500, 'physical') },
  { id: 'audi-a5-sportback', name: 'Audi A5 Sportback', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Audi A5 Sportback', unit: '', prices: generatePrices(46600, 'physical') },
  { id: 'audi-a6', name: 'Audi A6', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Audi A6', unit: '', prices: generatePrices(60200, 'physical') },
  { id: 'audi-a7', name: 'Audi A7', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Audi A7', unit: '', prices: generatePrices(73500, 'physical') },
  { id: 'audi-a8', name: 'Audi A8', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Audi A8', unit: '', prices: generatePrices(90500, 'physical') },
  { id: 'audi-s3', name: 'Audi S3', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Audi S3', unit: '', prices: generatePrices(47200, 'physical') },
  { id: 'audi-s4', name: 'Audi S4', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Audi S4', unit: '', prices: generatePrices(55200, 'physical') },
  { id: 'audi-s5', name: 'Audi S5', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Audi S5', unit: '', prices: generatePrices(59100, 'physical') },
  { id: 'audi-s6', name: 'Audi S6', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Audi S6', unit: '', prices: generatePrices(76800, 'physical') },
  { id: 'audi-s7', name: 'Audi S7', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Audi S7', unit: '', prices: generatePrices(89600, 'physical') },
  { id: 'audi-rs5', name: 'Audi RS5', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Audi RS5', unit: '', prices: generatePrices(78200, 'physical') },
  { id: 'audi-rs7', name: 'Audi RS7', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Audi RS7', unit: '', prices: generatePrices(128900, 'physical') },
  { id: 'audi-q3', name: 'Audi Q3', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Audi Q3', unit: '', prices: generatePrices(40200, 'physical') },
  { id: 'audi-q5', name: 'Audi Q5', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Audi Q5', unit: '', prices: generatePrices(47200, 'physical') },
  { id: 'audi-q7', name: 'Audi Q7', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Audi Q7', unit: '', prices: generatePrices(60800, 'physical') },
  { id: 'audi-q8', name: 'Audi Q8', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Audi Q8', unit: '', prices: generatePrices(75800, 'physical') },
  { id: 'audi-sq5', name: 'Audi SQ5', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Audi SQ5', unit: '', prices: generatePrices(59200, 'physical') },
  { id: 'audi-sq7', name: 'Audi SQ7', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Audi SQ7', unit: '', prices: generatePrices(92400, 'physical') },
  { id: 'audi-sq8', name: 'Audi SQ8', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Audi SQ8', unit: '', prices: generatePrices(99200, 'physical') },
  { id: 'audi-rs-q8', name: 'Audi RS Q8', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Audi RS Q8', unit: '', prices: generatePrices(125800, 'physical') },
  { id: 'audi-e-tron-gt', name: 'Audi e-tron GT', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Audi e-tron GT', unit: '', prices: generatePrices(109900, 'physical') },
  { id: 'audi-rs-e-tron-gt', name: 'Audi RS e-tron GT', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Audi RS e-tron GT', unit: '', prices: generatePrices(149900, 'physical') },
  { id: 'audi-q4-e-tron', name: 'Audi Q4 e-tron', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Audi Q4 e-tron', unit: '', prices: generatePrices(52900, 'physical') },
  { id: 'audi-q8-e-tron', name: 'Audi Q8 e-tron', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Audi Q8 e-tron', unit: '', prices: generatePrices(74400, 'physical') },
  { id: 'audi-tt', name: 'Audi TT', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Audi TT', unit: '', prices: generatePrices(52100, 'physical') },
  { id: 'audi-r8', name: 'Audi R8', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Audi', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Audi R8', unit: '', prices: generatePrices(158600, 'physical') },
  { id: 'porsche-911-carrera', name: 'Porsche 911 Carrera', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Porsche', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Porsche 911 Carrera', unit: '', prices: generatePrices(115100, 'physical') },
  { id: 'porsche-911-turbo-s', name: 'Porsche 911 Turbo S', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Porsche', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Porsche 911 Turbo S', unit: '', prices: generatePrices(233800, 'physical') },
  { id: 'porsche-911-gt3', name: 'Porsche 911 GT3', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Porsche', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Porsche 911 GT3', unit: '', prices: generatePrices(194850, 'physical') },
  { id: 'porsche-911-gt3-rs', name: 'Porsche 911 GT3 RS', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Porsche', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Porsche 911 GT3 RS', unit: '', prices: generatePrices(241300, 'physical') },
  { id: 'porsche-718-cayman', name: 'Porsche 718 Cayman', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Porsche', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Porsche 718 Cayman', unit: '', prices: generatePrices(69100, 'physical') },
  { id: 'porsche-718-boxster', name: 'Porsche 718 Boxster', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Porsche', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Porsche 718 Boxster', unit: '', prices: generatePrices(67100, 'physical') },
  { id: 'porsche-718-spyder', name: 'Porsche 718 Spyder', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Porsche', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Porsche 718 Spyder', unit: '', prices: generatePrices(106600, 'physical') },
  { id: 'porsche-cayenne', name: 'Porsche Cayenne', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Porsche', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Porsche Cayenne', unit: '', prices: generatePrices(78800, 'physical') },
  { id: 'porsche-cayenne-turbo-gt', name: 'Porsche Cayenne Turbo GT', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Porsche', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Porsche Cayenne Turbo GT', unit: '', prices: generatePrices(201600, 'physical') },
  { id: 'porsche-macan', name: 'Porsche Macan', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Porsche', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Porsche Macan', unit: '', prices: generatePrices(62900, 'physical') },
  { id: 'porsche-macan-electric', name: 'Porsche Macan Electric', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Porsche', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Porsche Macan Electric', unit: '', prices: generatePrices(79900, 'physical') },
  { id: 'porsche-panamera', name: 'Porsche Panamera', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Porsche', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Porsche Panamera', unit: '', prices: generatePrices(99900, 'physical') },
  { id: 'porsche-panamera-turbo-s', name: 'Porsche Panamera Turbo S', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Porsche', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Porsche Panamera Turbo S', unit: '', prices: generatePrices(199800, 'physical') },
  { id: 'porsche-taycan', name: 'Porsche Taycan', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Porsche', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Porsche Taycan', unit: '', prices: generatePrices(92900, 'physical') },
  { id: 'porsche-taycan-turbo-s', name: 'Porsche Taycan Turbo S', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Porsche', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Porsche Taycan Turbo S', unit: '', prices: generatePrices(203800, 'physical') },
  { id: 'porsche-taycan-cross-turismo', name: 'Porsche Taycan Cross Turismo', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Porsche', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Porsche Taycan Cross Turismo', unit: '', prices: generatePrices(97800, 'physical') },
  { id: 'tesla-model-3', name: 'Tesla Model 3', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Tesla', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Tesla Model 3', unit: '', prices: generatePrices(40240, 'physical') },
  { id: 'tesla-model-3-long-range', name: 'Tesla Model 3 Long Range', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Tesla', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Tesla Model 3 Long Range', unit: '', prices: generatePrices(47240, 'physical') },
  { id: 'tesla-model-3-performance', name: 'Tesla Model 3 Performance', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Tesla', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Tesla Model 3 Performance', unit: '', prices: generatePrices(54240, 'physical') },
  { id: 'tesla-model-s', name: 'Tesla Model S', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Tesla', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Tesla Model S', unit: '', prices: generatePrices(74990, 'physical') },
  { id: 'tesla-model-s-plaid', name: 'Tesla Model S Plaid', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Tesla', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Tesla Model S Plaid', unit: '', prices: generatePrices(89990, 'physical') },
  { id: 'tesla-model-y', name: 'Tesla Model Y', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Tesla', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Tesla Model Y', unit: '', prices: generatePrices(44990, 'physical') },
  { id: 'tesla-model-y-long-range', name: 'Tesla Model Y Long Range', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Tesla', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Tesla Model Y Long Range', unit: '', prices: generatePrices(49990, 'physical') },
  { id: 'tesla-model-y-performance', name: 'Tesla Model Y Performance', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Tesla', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Tesla Model Y Performance', unit: '', prices: generatePrices(54990, 'physical') },
  { id: 'tesla-model-x', name: 'Tesla Model X', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Tesla', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Tesla Model X', unit: '', prices: generatePrices(79990, 'physical') },
  { id: 'tesla-model-x-plaid', name: 'Tesla Model X Plaid', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Tesla', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Tesla Model X Plaid', unit: '', prices: generatePrices(94990, 'physical') },
  { id: 'tesla-cybertruck', name: 'Tesla Cybertruck', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Tesla', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Tesla Cybertruck', unit: '', prices: generatePrices(60990, 'physical') },
  { id: 'tesla-cybertruck-awd', name: 'Tesla Cybertruck AWD', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Tesla', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Tesla Cybertruck AWD', unit: '', prices: generatePrices(79990, 'physical') },
  { id: 'tesla-cybertruck-cyberbeast', name: 'Tesla Cybertruck Cyberbeast', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Tesla', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Tesla Cybertruck Cyberbeast', unit: '', prices: generatePrices(99990, 'physical') },
  { id: 'hyundai-elantra', name: 'Hyundai Elantra', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Hyundai', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Hyundai Elantra', unit: '', prices: generatePrices(22865, 'physical') },
  { id: 'hyundai-sonata', name: 'Hyundai Sonata', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Hyundai', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Hyundai Sonata', unit: '', prices: generatePrices(29150, 'physical') },
  { id: 'hyundai-elantra-n', name: 'Hyundai Elantra N', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Hyundai', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Hyundai Elantra N', unit: '', prices: generatePrices(34415, 'physical') },
  { id: 'hyundai-accent', name: 'Hyundai Accent', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Hyundai', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Hyundai Accent', unit: '', prices: generatePrices(18765, 'physical') },
  { id: 'hyundai-tucson', name: 'Hyundai Tucson', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Hyundai', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Hyundai Tucson', unit: '', prices: generatePrices(31500, 'physical') },
  { id: 'hyundai-santa-fe', name: 'Hyundai Santa Fe', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Hyundai', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Hyundai Santa Fe', unit: '', prices: generatePrices(35790, 'physical') },
  { id: 'hyundai-palisade', name: 'Hyundai Palisade', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Hyundai', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Hyundai Palisade', unit: '', prices: generatePrices(40150, 'physical') },
  { id: 'hyundai-kona', name: 'Hyundai Kona', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Hyundai', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Hyundai Kona', unit: '', prices: generatePrices(26550, 'physical') },
  { id: 'hyundai-venue', name: 'Hyundai Venue', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Hyundai', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Hyundai Venue', unit: '', prices: generatePrices(20785, 'physical') },
  { id: 'hyundai-santa-cruz', name: 'Hyundai Santa Cruz', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Hyundai', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Hyundai Santa Cruz', unit: '', prices: generatePrices(29465, 'physical') },
  { id: 'hyundai-ioniq-5', name: 'Hyundai Ioniq 5', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Hyundai', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Hyundai Ioniq 5', unit: '', prices: generatePrices(42975, 'physical') },
  { id: 'hyundai-ioniq-6', name: 'Hyundai Ioniq 6', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Hyundai', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Hyundai Ioniq 6', unit: '', prices: generatePrices(43865, 'physical') },
  { id: 'hyundai-ioniq-5-n', name: 'Hyundai Ioniq 5 N', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Hyundai', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Hyundai Ioniq 5 N', unit: '', prices: generatePrices(67495, 'physical') },
  { id: 'hyundai-ioniq-9', name: 'Hyundai Ioniq 9', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Hyundai', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Hyundai Ioniq 9', unit: '', prices: generatePrices(56500, 'physical') },
  { id: 'kia-forte', name: 'Kia Forte', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Kia', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Kia Forte', unit: '', prices: generatePrices(20815, 'physical') },
  { id: 'kia-k5', name: 'Kia K5', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Kia', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Kia K5', unit: '', prices: generatePrices(28690, 'physical') },
  { id: 'kia-stinger', name: 'Kia Stinger', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Kia', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Kia Stinger', unit: '', prices: generatePrices(38390, 'physical') },
  { id: 'kia-sportage', name: 'Kia Sportage', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Kia', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Kia Sportage', unit: '', prices: generatePrices(31290, 'physical') },
  { id: 'kia-sorento', name: 'Kia Sorento', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Kia', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Kia Sorento', unit: '', prices: generatePrices(34490, 'physical') },
  { id: 'kia-telluride', name: 'Kia Telluride', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Kia', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Kia Telluride', unit: '', prices: generatePrices(37790, 'physical') },
  { id: 'kia-seltos', name: 'Kia Seltos', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Kia', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Kia Seltos', unit: '', prices: generatePrices(24890, 'physical') },
  { id: 'kia-niro', name: 'Kia Niro', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Kia', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Kia Niro', unit: '', prices: generatePrices(34290, 'physical') },
  { id: 'kia-soul', name: 'Kia Soul', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Kia', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Kia Soul', unit: '', prices: generatePrices(21890, 'physical') },
  { id: 'kia-carnival', name: 'Kia Carnival', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Kia', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Kia Carnival', unit: '', prices: generatePrices(37490, 'physical') },
  { id: 'kia-ev6', name: 'Kia EV6', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Kia', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Kia EV6', unit: '', prices: generatePrices(43975, 'physical') },
  { id: 'kia-ev9', name: 'Kia EV9', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Kia', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Kia EV9', unit: '', prices: generatePrices(56395, 'physical') },
  { id: 'kia-ev6-gt', name: 'Kia EV6 GT', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Kia', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Kia EV6 GT', unit: '', prices: generatePrices(56395, 'physical') },
  { id: 'kia-niro-ev', name: 'Kia Niro EV', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Kia', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Kia Niro EV', unit: '', prices: generatePrices(40925, 'physical') },
  { id: 'volkswagen-jetta', name: 'Volkswagen Jetta', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Volkswagen', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Volkswagen Jetta', unit: '', prices: generatePrices(22415, 'physical') },
  { id: 'volkswagen-passat', name: 'Volkswagen Passat', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Volkswagen', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Volkswagen Passat', unit: '', prices: generatePrices(30290, 'physical') },
  { id: 'volkswagen-arteon', name: 'Volkswagen Arteon', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Volkswagen', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Volkswagen Arteon', unit: '', prices: generatePrices(42990, 'physical') },
  { id: 'volkswagen-tiguan', name: 'Volkswagen Tiguan', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Volkswagen', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Volkswagen Tiguan', unit: '', prices: generatePrices(31290, 'physical') },
  { id: 'volkswagen-atlas', name: 'Volkswagen Atlas', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Volkswagen', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Volkswagen Atlas', unit: '', prices: generatePrices(37390, 'physical') },
  { id: 'volkswagen-atlas-cross-sport', name: 'Volkswagen Atlas Cross Sport', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Volkswagen', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Volkswagen Atlas Cross Sport', unit: '', prices: generatePrices(35690, 'physical') },
  { id: 'volkswagen-taos', name: 'Volkswagen Taos', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Volkswagen', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Volkswagen Taos', unit: '', prices: generatePrices(25190, 'physical') },
  { id: 'volkswagen-id-4', name: 'Volkswagen ID.4', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Volkswagen', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Volkswagen ID.4', unit: '', prices: generatePrices(41290, 'physical') },
  { id: 'volkswagen-golf-gti', name: 'Volkswagen Golf GTI', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Volkswagen', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Volkswagen Golf GTI', unit: '', prices: generatePrices(31690, 'physical') },
  { id: 'volkswagen-golf-r', name: 'Volkswagen Golf R', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Volkswagen', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Volkswagen Golf R', unit: '', prices: generatePrices(45490, 'physical') },
  { id: 'volkswagen-id-buzz', name: 'Volkswagen ID. Buzz', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Van', brand: 'Volkswagen', categoryPath: 'Physical Goods > Automobiles > Van', description: 'Volkswagen ID. Buzz', unit: '', prices: generatePrices(60995, 'physical') },
  { id: 'nissan-altima', name: 'Nissan Altima', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Nissan', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Nissan Altima', unit: '', prices: generatePrices(28990, 'physical') },
  { id: 'nissan-sentra', name: 'Nissan Sentra', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Nissan', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Nissan Sentra', unit: '', prices: generatePrices(21990, 'physical') },
  { id: 'nissan-versa', name: 'Nissan Versa', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Nissan', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Nissan Versa', unit: '', prices: generatePrices(17120, 'physical') },
  { id: 'nissan-maxima', name: 'Nissan Maxima', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Nissan', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Nissan Maxima', unit: '', prices: generatePrices(39590, 'physical') },
  { id: 'nissan-rogue', name: 'Nissan Rogue', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Nissan', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Nissan Rogue', unit: '', prices: generatePrices(31240, 'physical') },
  { id: 'nissan-pathfinder', name: 'Nissan Pathfinder', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Nissan', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Nissan Pathfinder', unit: '', prices: generatePrices(37240, 'physical') },
  { id: 'nissan-murano', name: 'Nissan Murano', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Nissan', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Nissan Murano', unit: '', prices: generatePrices(40340, 'physical') },
  { id: 'nissan-kicks', name: 'Nissan Kicks', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Nissan', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Nissan Kicks', unit: '', prices: generatePrices(22440, 'physical') },
  { id: 'nissan-armada', name: 'Nissan Armada', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Nissan', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Nissan Armada', unit: '', prices: generatePrices(56640, 'physical') },
  { id: 'nissan-ariya', name: 'Nissan Ariya', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Nissan', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Nissan Ariya', unit: '', prices: generatePrices(44740, 'physical') },
  { id: 'nissan-frontier', name: 'Nissan Frontier', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Nissan', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Nissan Frontier', unit: '', prices: generatePrices(32000, 'physical') },
  { id: 'nissan-titan', name: 'Nissan Titan', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Nissan', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Nissan Titan', unit: '', prices: generatePrices(44510, 'physical') },
  { id: 'nissan-titan-xd', name: 'Nissan Titan XD', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Nissan', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Nissan Titan XD', unit: '', prices: generatePrices(51820, 'physical') },
  { id: 'nissan-z', name: 'Nissan Z', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Nissan', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Nissan Z', unit: '', prices: generatePrices(43990, 'physical') },
  { id: 'nissan-gt-r', name: 'Nissan GT-R', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Nissan', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Nissan GT-R', unit: '', prices: generatePrices(121090, 'physical') },
  { id: 'nissan-gt-r-nismo', name: 'Nissan GT-R Nismo', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Nissan', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Nissan GT-R Nismo', unit: '', prices: generatePrices(222690, 'physical') },
  { id: 'nissan-leaf', name: 'Nissan Leaf', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Nissan', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Nissan Leaf', unit: '', prices: generatePrices(29135, 'physical') },
  { id: 'subaru-impreza', name: 'Subaru Impreza', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Subaru', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Subaru Impreza', unit: '', prices: generatePrices(24995, 'physical') },
  { id: 'subaru-legacy', name: 'Subaru Legacy', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Subaru', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Subaru Legacy', unit: '', prices: generatePrices(24895, 'physical') },
  { id: 'subaru-wrx', name: 'Subaru WRX', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Subaru', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Subaru WRX', unit: '', prices: generatePrices(32115, 'physical') },
  { id: 'subaru-outback', name: 'Subaru Outback', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Subaru', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Subaru Outback', unit: '', prices: generatePrices(30690, 'physical') },
  { id: 'subaru-forester', name: 'Subaru Forester', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Subaru', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Subaru Forester', unit: '', prices: generatePrices(33695, 'physical') },
  { id: 'subaru-crosstrek', name: 'Subaru Crosstrek', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Subaru', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Subaru Crosstrek', unit: '', prices: generatePrices(30590, 'physical') },
  { id: 'subaru-ascent', name: 'Subaru Ascent', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Subaru', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Subaru Ascent', unit: '', prices: generatePrices(37690, 'physical') },
  { id: 'subaru-solterra', name: 'Subaru Solterra', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Subaru', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Subaru Solterra', unit: '', prices: generatePrices(46220, 'physical') },
  { id: 'subaru-brz', name: 'Subaru BRZ', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Subaru', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Subaru BRZ', unit: '', prices: generatePrices(30595, 'physical') },
  { id: 'subaru-wrx-sti', name: 'Subaru WRX STI', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Subaru', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Subaru WRX STI', unit: '', prices: generatePrices(43395, 'physical') },
  { id: 'mazda-mazda3', name: 'Mazda Mazda3', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Mazda', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Mazda Mazda3', unit: '', prices: generatePrices(24370, 'physical') },
  { id: 'mazda-mazda3-turbo', name: 'Mazda Mazda3 Turbo', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Mazda', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Mazda Mazda3 Turbo', unit: '', prices: generatePrices(30690, 'physical') },
  { id: 'mazda-cx-5', name: 'Mazda CX-5', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mazda', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mazda CX-5', unit: '', prices: generatePrices(30650, 'physical') },
  { id: 'mazda-cx-50', name: 'Mazda CX-50', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mazda', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mazda CX-50', unit: '', prices: generatePrices(31500, 'physical') },
  { id: 'mazda-cx-70', name: 'Mazda CX-70', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mazda', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mazda CX-70', unit: '', prices: generatePrices(41900, 'physical') },
  { id: 'mazda-cx-90', name: 'Mazda CX-90', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mazda', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mazda CX-90', unit: '', prices: generatePrices(40970, 'physical') },
  { id: 'mazda-cx-30', name: 'Mazda CX-30', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mazda', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mazda CX-30', unit: '', prices: generatePrices(24920, 'physical') },
  { id: 'mazda-mx-30', name: 'Mazda MX-30', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mazda', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mazda MX-30', unit: '', prices: generatePrices(34990, 'physical') },
  { id: 'mazda-mx-5-miata', name: 'Mazda MX-5 Miata', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Mazda', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Mazda MX-5 Miata', unit: '', prices: generatePrices(29770, 'physical') },
  { id: 'mazda-mx-5-miata-rf', name: 'Mazda MX-5 Miata RF', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Mazda', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Mazda MX-5 Miata RF', unit: '', prices: generatePrices(34780, 'physical') },
  { id: 'lexus-is-300', name: 'Lexus IS 300', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Lexus', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Lexus IS 300', unit: '', prices: generatePrices(41025, 'physical') },
  { id: 'lexus-is-500', name: 'Lexus IS 500', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Lexus', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Lexus IS 500', unit: '', prices: generatePrices(60430, 'physical') },
  { id: 'lexus-es-250', name: 'Lexus ES 250', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Lexus', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Lexus ES 250', unit: '', prices: generatePrices(42990, 'physical') },
  { id: 'lexus-es-350', name: 'Lexus ES 350', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Lexus', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Lexus ES 350', unit: '', prices: generatePrices(44775, 'physical') },
  { id: 'lexus-ls-500', name: 'Lexus LS 500', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Lexus', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Lexus LS 500', unit: '', prices: generatePrices(81100, 'physical') },
  { id: 'lexus-nx-250', name: 'Lexus NX 250', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Lexus', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Lexus NX 250', unit: '', prices: generatePrices(41550, 'physical') },
  { id: 'lexus-nx-350h', name: 'Lexus NX 350h', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Lexus', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Lexus NX 350h', unit: '', prices: generatePrices(43840, 'physical') },
  { id: 'lexus-rx-350', name: 'Lexus RX 350', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Lexus', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Lexus RX 350', unit: '', prices: generatePrices(50570, 'physical') },
  { id: 'lexus-rx-500h', name: 'Lexus RX 500h', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Lexus', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Lexus RX 500h', unit: '', prices: generatePrices(59950, 'physical') },
  { id: 'lexus-gx-550', name: 'Lexus GX 550', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Lexus', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Lexus GX 550', unit: '', prices: generatePrices(65250, 'physical') },
  { id: 'lexus-lx-600', name: 'Lexus LX 600', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Lexus', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Lexus LX 600', unit: '', prices: generatePrices(92750, 'physical') },
  { id: 'lexus-ux-250h', name: 'Lexus UX 250h', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Lexus', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Lexus UX 250h', unit: '', prices: generatePrices(37840, 'physical') },
  { id: 'lexus-rz-450e', name: 'Lexus RZ 450e', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Lexus', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Lexus RZ 450e', unit: '', prices: generatePrices(59650, 'physical') },
  { id: 'lexus-lc-500', name: 'Lexus LC 500', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Lexus', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Lexus LC 500', unit: '', prices: generatePrices(98350, 'physical') },
  { id: 'lexus-lc-500h', name: 'Lexus LC 500h', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Lexus', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Lexus LC 500h', unit: '', prices: generatePrices(102350, 'physical') },
  { id: 'lexus-rc-f', name: 'Lexus RC F', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Lexus', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Lexus RC F', unit: '', prices: generatePrices(66850, 'physical') },
  { id: 'acura-integra', name: 'Acura Integra', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Acura', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Acura Integra', unit: '', prices: generatePrices(33500, 'physical') },
  { id: 'acura-tlx', name: 'Acura TLX', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Acura', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Acura TLX', unit: '', prices: generatePrices(40200, 'physical') },
  { id: 'acura-tlx-type-s', name: 'Acura TLX Type S', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Acura', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Acura TLX Type S', unit: '', prices: generatePrices(55800, 'physical') },
  { id: 'acura-rdx', name: 'Acura RDX', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Acura', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Acura RDX', unit: '', prices: generatePrices(42500, 'physical') },
  { id: 'acura-mdx', name: 'Acura MDX', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Acura', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Acura MDX', unit: '', prices: generatePrices(51700, 'physical') },
  { id: 'acura-mdx-type-s', name: 'Acura MDX Type S', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Acura', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Acura MDX Type S', unit: '', prices: generatePrices(72150, 'physical') },
  { id: 'acura-zdx', name: 'Acura ZDX', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Acura', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Acura ZDX', unit: '', prices: generatePrices(64500, 'physical') },
  { id: 'infiniti-q50', name: 'Infiniti Q50', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Infiniti', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Infiniti Q50', unit: '', prices: generatePrices(43850, 'physical') },
  { id: 'infiniti-q60', name: 'Infiniti Q60', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Infiniti', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Infiniti Q60', unit: '', prices: generatePrices(44250, 'physical') },
  { id: 'infiniti-qx50', name: 'Infiniti QX50', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Infiniti', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Infiniti QX50', unit: '', prices: generatePrices(41350, 'physical') },
  { id: 'infiniti-qx55', name: 'Infiniti QX55', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Infiniti', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Infiniti QX55', unit: '', prices: generatePrices(49350, 'physical') },
  { id: 'infiniti-qx60', name: 'Infiniti QX60', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Infiniti', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Infiniti QX60', unit: '', prices: generatePrices(50650, 'physical') },
  { id: 'infiniti-qx80', name: 'Infiniti QX80', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Infiniti', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Infiniti QX80', unit: '', prices: generatePrices(73050, 'physical') },
  { id: 'genesis-g70', name: 'Genesis G70', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Genesis', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Genesis G70', unit: '', prices: generatePrices(42000, 'physical') },
  { id: 'genesis-g80', name: 'Genesis G80', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Genesis', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Genesis G80', unit: '', prices: generatePrices(55750, 'physical') },
  { id: 'genesis-g90', name: 'Genesis G90', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Genesis', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Genesis G90', unit: '', prices: generatePrices(90950, 'physical') },
  { id: 'genesis-electrified-g80', name: 'Genesis Electrified G80', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Genesis', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Genesis Electrified G80', unit: '', prices: generatePrices(65050, 'physical') },
  { id: 'genesis-gv70', name: 'Genesis GV70', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Genesis', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Genesis GV70', unit: '', prices: generatePrices(44850, 'physical') },
  { id: 'genesis-gv80', name: 'Genesis GV80', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Genesis', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Genesis GV80', unit: '', prices: generatePrices(57850, 'physical') },
  { id: 'genesis-gv60', name: 'Genesis GV60', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Genesis', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Genesis GV60', unit: '', prices: generatePrices(53500, 'physical') },
  { id: 'genesis-gv80-coupe', name: 'Genesis GV80 Coupe', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Genesis', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Genesis GV80 Coupe', unit: '', prices: generatePrices(73550, 'physical') },
  { id: 'genesis-electrified-gv70', name: 'Genesis Electrified GV70', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Genesis', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Genesis Electrified GV70', unit: '', prices: generatePrices(66050, 'physical') },
  { id: 'volvo-s60', name: 'Volvo S60', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Volvo', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Volvo S60', unit: '', prices: generatePrices(42050, 'physical') },
  { id: 'volvo-s90', name: 'Volvo S90', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Volvo', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Volvo S90', unit: '', prices: generatePrices(58750, 'physical') },
  { id: 'volvo-xc40', name: 'Volvo XC40', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Volvo', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Volvo XC40', unit: '', prices: generatePrices(39350, 'physical') },
  { id: 'volvo-xc60', name: 'Volvo XC60', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Volvo', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Volvo XC60', unit: '', prices: generatePrices(45850, 'physical') },
  { id: 'volvo-xc90', name: 'Volvo XC90', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Volvo', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Volvo XC90', unit: '', prices: generatePrices(60850, 'physical') },
  { id: 'volvo-ex30', name: 'Volvo EX30', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Volvo', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Volvo EX30', unit: '', prices: generatePrices(36245, 'physical') },
  { id: 'volvo-ex40', name: 'Volvo EX40', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Volvo', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Volvo EX40', unit: '', prices: generatePrices(42550, 'physical') },
  { id: 'volvo-ex90', name: 'Volvo EX90', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Volvo', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Volvo EX90', unit: '', prices: generatePrices(80550, 'physical') },
  { id: 'volvo-c40-recharge', name: 'Volvo C40 Recharge', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Volvo', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Volvo C40 Recharge', unit: '', prices: generatePrices(55300, 'physical') },
  { id: 'land-rover-range-rover', name: 'Land Rover Range Rover', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Land Rover', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Land Rover Range Rover', unit: '', prices: generatePrices(105600, 'physical') },
  { id: 'land-rover-range-rover-sport', name: 'Land Rover Range Rover Sport', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Land Rover', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Land Rover Range Rover Sport', unit: '', prices: generatePrices(86200, 'physical') },
  { id: 'land-rover-range-rover-velar', name: 'Land Rover Range Rover Velar', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Land Rover', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Land Rover Range Rover Velar', unit: '', prices: generatePrices(62800, 'physical') },
  { id: 'land-rover-range-rover-evoque', name: 'Land Rover Range Rover Evoque', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Land Rover', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Land Rover Range Rover Evoque', unit: '', prices: generatePrices(50200, 'physical') },
  { id: 'land-rover-defender-90', name: 'Land Rover Defender 90', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Land Rover', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Land Rover Defender 90', unit: '', prices: generatePrices(57500, 'physical') },
  { id: 'land-rover-defender-110', name: 'Land Rover Defender 110', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Land Rover', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Land Rover Defender 110', unit: '', prices: generatePrices(59900, 'physical') },
  { id: 'land-rover-defender-130', name: 'Land Rover Defender 130', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Land Rover', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Land Rover Defender 130', unit: '', prices: generatePrices(73350, 'physical') },
  { id: 'land-rover-discovery', name: 'Land Rover Discovery', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Land Rover', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Land Rover Discovery', unit: '', prices: generatePrices(59350, 'physical') },
  { id: 'land-rover-discovery-sport', name: 'Land Rover Discovery Sport', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Land Rover', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Land Rover Discovery Sport', unit: '', prices: generatePrices(45950, 'physical') },
  { id: 'jaguar-xf', name: 'Jaguar XF', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Jaguar', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Jaguar XF', unit: '', prices: generatePrices(50100, 'physical') },
  { id: 'jaguar-xe', name: 'Jaguar XE', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Jaguar', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Jaguar XE', unit: '', prices: generatePrices(43050, 'physical') },
  { id: 'jaguar-f-pace', name: 'Jaguar F-PACE', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Jaguar', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Jaguar F-PACE', unit: '', prices: generatePrices(52850, 'physical') },
  { id: 'jaguar-e-pace', name: 'Jaguar E-PACE', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Jaguar', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Jaguar E-PACE', unit: '', prices: generatePrices(45200, 'physical') },
  { id: 'jaguar-i-pace', name: 'Jaguar I-PACE', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Jaguar', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Jaguar I-PACE', unit: '', prices: generatePrices(73450, 'physical') },
  { id: 'jaguar-f-type', name: 'Jaguar F-TYPE', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Jaguar', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Jaguar F-TYPE', unit: '', prices: generatePrices(79650, 'physical') },
  { id: 'jaguar-f-type-r', name: 'Jaguar F-TYPE R', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Jaguar', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Jaguar F-TYPE R', unit: '', prices: generatePrices(109900, 'physical') },
  { id: 'ferrari-296-gtb', name: 'Ferrari 296 GTB', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Ferrari', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Ferrari 296 GTB', unit: '', prices: generatePrices(365000, 'physical') },
  { id: 'ferrari-296-gts', name: 'Ferrari 296 GTS', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Ferrari', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Ferrari 296 GTS', unit: '', prices: generatePrices(395000, 'physical') },
  { id: 'ferrari-sf90-stradale', name: 'Ferrari SF90 Stradale', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Ferrari', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Ferrari SF90 Stradale', unit: '', prices: generatePrices(575000, 'physical') },
  { id: 'ferrari-sf90-spider', name: 'Ferrari SF90 Spider', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Ferrari', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Ferrari SF90 Spider', unit: '', prices: generatePrices(625000, 'physical') },
  { id: 'ferrari-roma', name: 'Ferrari Roma', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Ferrari', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Ferrari Roma', unit: '', prices: generatePrices(265000, 'physical') },
  { id: 'ferrari-roma-spider', name: 'Ferrari Roma Spider', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Ferrari', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Ferrari Roma Spider', unit: '', prices: generatePrices(295000, 'physical') },
  { id: 'ferrari-812-competizione', name: 'Ferrari 812 Competizione', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Ferrari', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Ferrari 812 Competizione', unit: '', prices: generatePrices(650000, 'physical') },
  { id: 'ferrari-f8-tributo', name: 'Ferrari F8 Tributo', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Ferrari', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Ferrari F8 Tributo', unit: '', prices: generatePrices(330000, 'physical') },
  { id: 'ferrari-f8-spider', name: 'Ferrari F8 Spider', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Ferrari', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Ferrari F8 Spider', unit: '', prices: generatePrices(365000, 'physical') },
  { id: 'ferrari-purosangue', name: 'Ferrari Purosangue', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Ferrari', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Ferrari Purosangue', unit: '', prices: generatePrices(400000, 'physical') },
  { id: 'ferrari-daytona-sp3', name: 'Ferrari Daytona SP3', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Ferrari', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Ferrari Daytona SP3', unit: '', prices: generatePrices(2250000, 'physical') },
  { id: 'lamborghini-huracan-tecnica', name: 'Lamborghini Huracan Tecnica', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Lamborghini', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Lamborghini Huracan Tecnica', unit: '', prices: generatePrices(252595, 'physical') },
  { id: 'lamborghini-huracan-sto', name: 'Lamborghini Huracan STO', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Lamborghini', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Lamborghini Huracan STO', unit: '', prices: generatePrices(327838, 'physical') },
  { id: 'lamborghini-huracan-sterrato', name: 'Lamborghini Huracan Sterrato', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Lamborghini', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Lamborghini Huracan Sterrato', unit: '', prices: generatePrices(269691, 'physical') },
  { id: 'lamborghini-revuelto', name: 'Lamborghini Revuelto', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Lamborghini', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Lamborghini Revuelto', unit: '', prices: generatePrices(608358, 'physical') },
  { id: 'lamborghini-urus', name: 'Lamborghini Urus', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Lamborghini', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Lamborghini Urus', unit: '', prices: generatePrices(239800, 'physical') },
  { id: 'lamborghini-urus-performante', name: 'Lamborghini Urus Performante', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Lamborghini', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Lamborghini Urus Performante', unit: '', prices: generatePrices(274000, 'physical') },
  { id: 'lamborghini-urus-se', name: 'Lamborghini Urus SE', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Lamborghini', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Lamborghini Urus SE', unit: '', prices: generatePrices(298000, 'physical') },
  { id: 'mclaren-artura', name: 'McLaren Artura', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'McLaren', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'McLaren Artura', unit: '', prices: generatePrices(237500, 'physical') },
  { id: 'mclaren-750s', name: 'McLaren 750S', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'McLaren', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'McLaren 750S', unit: '', prices: generatePrices(325500, 'physical') },
  { id: 'mclaren-750s-spider', name: 'McLaren 750S Spider', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'McLaren', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'McLaren 750S Spider', unit: '', prices: generatePrices(351500, 'physical') },
  { id: 'mclaren-765lt', name: 'McLaren 765LT', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'McLaren', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'McLaren 765LT', unit: '', prices: generatePrices(382500, 'physical') },
  { id: 'mclaren-720s', name: 'McLaren 720S', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'McLaren', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'McLaren 720S', unit: '', prices: generatePrices(310500, 'physical') },
  { id: 'aston-martin-vantage', name: 'Aston Martin Vantage', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Aston Martin', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Aston Martin Vantage', unit: '', prices: generatePrices(158900, 'physical') },
  { id: 'aston-martin-db12', name: 'Aston Martin DB12', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Aston Martin', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Aston Martin DB12', unit: '', prices: generatePrices(249900, 'physical') },
  { id: 'aston-martin-dbs', name: 'Aston Martin DBS', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Aston Martin', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Aston Martin DBS', unit: '', prices: generatePrices(331300, 'physical') },
  { id: 'aston-martin-valkyrie', name: 'Aston Martin Valkyrie', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Aston Martin', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Aston Martin Valkyrie', unit: '', prices: generatePrices(3000000, 'physical') },
  { id: 'aston-martin-dbx707', name: 'Aston Martin DBX707', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Aston Martin', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Aston Martin DBX707', unit: '', prices: generatePrices(239086, 'physical') },
  { id: 'bentley-flying-spur', name: 'Bentley Flying Spur', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Bentley', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Bentley Flying Spur', unit: '', prices: generatePrices(225900, 'physical') },
  { id: 'bentley-flying-spur-speed', name: 'Bentley Flying Spur Speed', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Bentley', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Bentley Flying Spur Speed', unit: '', prices: generatePrices(287900, 'physical') },
  { id: 'bentley-bentayga', name: 'Bentley Bentayga', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Bentley', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Bentley Bentayga', unit: '', prices: generatePrices(215000, 'physical') },
  { id: 'bentley-bentayga-ewb', name: 'Bentley Bentayga EWB', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Bentley', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Bentley Bentayga EWB', unit: '', prices: generatePrices(250800, 'physical') },
  { id: 'bentley-bentayga-s', name: 'Bentley Bentayga S', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Bentley', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Bentley Bentayga S', unit: '', prices: generatePrices(245700, 'physical') },
  { id: 'bentley-continental-gt', name: 'Bentley Continental GT', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Bentley', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Bentley Continental GT', unit: '', prices: generatePrices(239100, 'physical') },
  { id: 'bentley-continental-gt-speed', name: 'Bentley Continental GT Speed', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Bentley', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Bentley Continental GT Speed', unit: '', prices: generatePrices(301400, 'physical') },
  { id: 'bentley-continental-gtc', name: 'Bentley Continental GTC', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Bentley', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Bentley Continental GTC', unit: '', prices: generatePrices(269100, 'physical') },
  { id: 'rolls-royce-ghost', name: 'Rolls-Royce Ghost', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Rolls-Royce', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Rolls-Royce Ghost', unit: '', prices: generatePrices(351000, 'physical') },
  { id: 'rolls-royce-ghost-extended', name: 'Rolls-Royce Ghost Extended', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Rolls-Royce', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Rolls-Royce Ghost Extended', unit: '', prices: generatePrices(391250, 'physical') },
  { id: 'rolls-royce-phantom', name: 'Rolls-Royce Phantom', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Rolls-Royce', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Rolls-Royce Phantom', unit: '', prices: generatePrices(500000, 'physical') },
  { id: 'rolls-royce-phantom-extended', name: 'Rolls-Royce Phantom Extended', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Rolls-Royce', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Rolls-Royce Phantom Extended', unit: '', prices: generatePrices(550000, 'physical') },
  { id: 'rolls-royce-cullinan', name: 'Rolls-Royce Cullinan', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Rolls-Royce', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Rolls-Royce Cullinan', unit: '', prices: generatePrices(365000, 'physical') },
  { id: 'rolls-royce-cullinan-black-badge', name: 'Rolls-Royce Cullinan Black Badge', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Rolls-Royce', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Rolls-Royce Cullinan Black Badge', unit: '', prices: generatePrices(425000, 'physical') },
  { id: 'rolls-royce-spectre', name: 'Rolls-Royce Spectre', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Rolls-Royce', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Rolls-Royce Spectre', unit: '', prices: generatePrices(420000, 'physical') },
  { id: 'rolls-royce-wraith', name: 'Rolls-Royce Wraith', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Rolls-Royce', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Rolls-Royce Wraith', unit: '', prices: generatePrices(330000, 'physical') },
  { id: 'rolls-royce-dawn', name: 'Rolls-Royce Dawn', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Rolls-Royce', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Rolls-Royce Dawn', unit: '', prices: generatePrices(370000, 'physical') },
  { id: 'maserati-ghibli', name: 'Maserati Ghibli', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Maserati', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Maserati Ghibli', unit: '', prices: generatePrices(82150, 'physical') },
  { id: 'maserati-quattroporte', name: 'Maserati Quattroporte', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Maserati', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Maserati Quattroporte', unit: '', prices: generatePrices(105750, 'physical') },
  { id: 'maserati-grecale', name: 'Maserati Grecale', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Maserati', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Maserati Grecale', unit: '', prices: generatePrices(63750, 'physical') },
  { id: 'maserati-levante', name: 'Maserati Levante', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Maserati', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Maserati Levante', unit: '', prices: generatePrices(85450, 'physical') },
  { id: 'maserati-mc20', name: 'Maserati MC20', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Maserati', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Maserati MC20', unit: '', prices: generatePrices(220000, 'physical') },
  { id: 'maserati-mc20-cielo', name: 'Maserati MC20 Cielo', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Maserati', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Maserati MC20 Cielo', unit: '', prices: generatePrices(260000, 'physical') },
  { id: 'maserati-granturismo', name: 'Maserati GranTurismo', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Maserati', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Maserati GranTurismo', unit: '', prices: generatePrices(175000, 'physical') },
  { id: 'maserati-grancabrio', name: 'Maserati GranCabrio', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Maserati', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Maserati GranCabrio', unit: '', prices: generatePrices(195000, 'physical') },
  { id: 'bugatti-chiron', name: 'Bugatti Chiron', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Bugatti', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Bugatti Chiron', unit: '', prices: generatePrices(3300000, 'physical') },
  { id: 'bugatti-chiron-sport', name: 'Bugatti Chiron Sport', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Bugatti', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Bugatti Chiron Sport', unit: '', prices: generatePrices(3400000, 'physical') },
  { id: 'bugatti-chiron-super-sport', name: 'Bugatti Chiron Super Sport', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Bugatti', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Bugatti Chiron Super Sport', unit: '', prices: generatePrices(3900000, 'physical') },
  { id: 'bugatti-mistral', name: 'Bugatti Mistral', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Bugatti', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Bugatti Mistral', unit: '', prices: generatePrices(5000000, 'physical') },
  { id: 'bugatti-tourbillon', name: 'Bugatti Tourbillon', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Bugatti', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Bugatti Tourbillon', unit: '', prices: generatePrices(3800000, 'physical') },
  { id: 'pagani-huayra-roadster-bc', name: 'Pagani Huayra Roadster BC', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Pagani', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Pagani Huayra Roadster BC', unit: '', prices: generatePrices(3500000, 'physical') },
  { id: 'pagani-huayra-r', name: 'Pagani Huayra R', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Pagani', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Pagani Huayra R', unit: '', prices: generatePrices(3100000, 'physical') },
  { id: 'pagani-utopia', name: 'Pagani Utopia', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Pagani', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Pagani Utopia', unit: '', prices: generatePrices(2200000, 'physical') },
  { id: 'koenigsegg-jesko', name: 'Koenigsegg Jesko', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Koenigsegg', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Koenigsegg Jesko', unit: '', prices: generatePrices(3400000, 'physical') },
  { id: 'koenigsegg-jesko-absolut', name: 'Koenigsegg Jesko Absolut', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Koenigsegg', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Koenigsegg Jesko Absolut', unit: '', prices: generatePrices(3600000, 'physical') },
  { id: 'koenigsegg-gemera', name: 'Koenigsegg Gemera', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Koenigsegg', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Koenigsegg Gemera', unit: '', prices: generatePrices(1700000, 'physical') },
  { id: 'koenigsegg-cc850', name: 'Koenigsegg CC850', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Koenigsegg', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Koenigsegg CC850', unit: '', prices: generatePrices(3650000, 'physical') },
  { id: 'koenigsegg-regera', name: 'Koenigsegg Regera', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Koenigsegg', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Koenigsegg Regera', unit: '', prices: generatePrices(1900000, 'physical') },
  { id: 'dodge-charger', name: 'Dodge Charger', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Dodge', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Dodge Charger', unit: '', prices: generatePrices(34295, 'physical') },
  { id: 'dodge-charger-srt-hellcat', name: 'Dodge Charger SRT Hellcat', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Dodge', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Dodge Charger SRT Hellcat', unit: '', prices: generatePrices(81690, 'physical') },
  { id: 'dodge-durango', name: 'Dodge Durango', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Dodge', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Dodge Durango', unit: '', prices: generatePrices(42570, 'physical') },
  { id: 'dodge-durango-srt-hellcat', name: 'Dodge Durango SRT Hellcat', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Dodge', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Dodge Durango SRT Hellcat', unit: '', prices: generatePrices(97190, 'physical') },
  { id: 'dodge-hornet', name: 'Dodge Hornet', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Dodge', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Dodge Hornet', unit: '', prices: generatePrices(33395, 'physical') },
  { id: 'dodge-challenger', name: 'Dodge Challenger', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Dodge', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Dodge Challenger', unit: '', prices: generatePrices(33595, 'physical') },
  { id: 'dodge-challenger-srt-hellcat', name: 'Dodge Challenger SRT Hellcat', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Dodge', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Dodge Challenger SRT Hellcat', unit: '', prices: generatePrices(71395, 'physical') },
  { id: 'dodge-challenger-srt-demon-170', name: 'Dodge Challenger SRT Demon 170', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Dodge', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Dodge Challenger SRT Demon 170', unit: '', prices: generatePrices(96666, 'physical') },
  { id: 'jeep-wrangler', name: 'Jeep Wrangler', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Jeep', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Jeep Wrangler', unit: '', prices: generatePrices(33890, 'physical') },
  { id: 'jeep-grand-cherokee', name: 'Jeep Grand Cherokee', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Jeep', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Jeep Grand Cherokee', unit: '', prices: generatePrices(41075, 'physical') },
  { id: 'jeep-grand-cherokee-l', name: 'Jeep Grand Cherokee L', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Jeep', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Jeep Grand Cherokee L', unit: '', prices: generatePrices(42175, 'physical') },
  { id: 'jeep-cherokee', name: 'Jeep Cherokee', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Jeep', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Jeep Cherokee', unit: '', prices: generatePrices(37620, 'physical') },
  { id: 'jeep-compass', name: 'Jeep Compass', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Jeep', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Jeep Compass', unit: '', prices: generatePrices(32775, 'physical') },
  { id: 'jeep-renegade', name: 'Jeep Renegade', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Jeep', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Jeep Renegade', unit: '', prices: generatePrices(28775, 'physical') },
  { id: 'jeep-gladiator', name: 'Jeep Gladiator', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Jeep', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Jeep Gladiator', unit: '', prices: generatePrices(41185, 'physical') },
  { id: 'jeep-wagoneer', name: 'Jeep Wagoneer', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Jeep', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Jeep Wagoneer', unit: '', prices: generatePrices(62895, 'physical') },
  { id: 'jeep-grand-wagoneer', name: 'Jeep Grand Wagoneer', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Jeep', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Jeep Grand Wagoneer', unit: '', prices: generatePrices(92995, 'physical') },
  { id: 'jeep-avenger', name: 'Jeep Avenger', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Jeep', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Jeep Avenger', unit: '', prices: generatePrices(34695, 'physical') },
  { id: 'ram-1500', name: 'Ram 1500', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Ram', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Ram 1500', unit: '', prices: generatePrices(40200, 'physical') },
  { id: 'ram-1500-trx', name: 'Ram 1500 TRX', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Ram', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Ram 1500 TRX', unit: '', prices: generatePrices(81200, 'physical') },
  { id: 'ram-2500', name: 'Ram 2500', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Ram', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Ram 2500', unit: '', prices: generatePrices(45100, 'physical') },
  { id: 'ram-3500', name: 'Ram 3500', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Ram', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Ram 3500', unit: '', prices: generatePrices(46400, 'physical') },
  { id: 'ram-promaster', name: 'Ram ProMaster', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Ram', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Ram ProMaster', unit: '', prices: generatePrices(39895, 'physical') },
  { id: 'ram-promaster-city', name: 'Ram ProMaster City', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Ram', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Ram ProMaster City', unit: '', prices: generatePrices(32995, 'physical') },
  { id: 'gmc-terrain', name: 'GMC Terrain', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'GMC', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'GMC Terrain', unit: '', prices: generatePrices(33700, 'physical') },
  { id: 'gmc-acadia', name: 'GMC Acadia', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'GMC', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'GMC Acadia', unit: '', prices: generatePrices(39200, 'physical') },
  { id: 'gmc-yukon', name: 'GMC Yukon', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'GMC', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'GMC Yukon', unit: '', prices: generatePrices(61900, 'physical') },
  { id: 'gmc-yukon-xl', name: 'GMC Yukon XL', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'GMC', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'GMC Yukon XL', unit: '', prices: generatePrices(65400, 'physical') },
  { id: 'gmc-hummer-ev-suv', name: 'GMC Hummer EV SUV', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'GMC', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'GMC Hummer EV SUV', unit: '', prices: generatePrices(98845, 'physical') },
  { id: 'gmc-sierra-1500', name: 'GMC Sierra 1500', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'GMC', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'GMC Sierra 1500', unit: '', prices: generatePrices(41600, 'physical') },
  { id: 'gmc-sierra-2500hd', name: 'GMC Sierra 2500HD', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'GMC', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'GMC Sierra 2500HD', unit: '', prices: generatePrices(47400, 'physical') },
  { id: 'gmc-sierra-3500hd', name: 'GMC Sierra 3500HD', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'GMC', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'GMC Sierra 3500HD', unit: '', prices: generatePrices(48900, 'physical') },
  { id: 'gmc-canyon', name: 'GMC Canyon', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'GMC', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'GMC Canyon', unit: '', prices: generatePrices(33400, 'physical') },
  { id: 'gmc-hummer-ev', name: 'GMC Hummer EV', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'GMC', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'GMC Hummer EV', unit: '', prices: generatePrices(113845, 'physical') },
  { id: 'cadillac-ct4', name: 'Cadillac CT4', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Cadillac', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Cadillac CT4', unit: '', prices: generatePrices(36890, 'physical') },
  { id: 'cadillac-ct4-v-blackwing', name: 'Cadillac CT4-V Blackwing', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Cadillac', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Cadillac CT4-V Blackwing', unit: '', prices: generatePrices(65890, 'physical') },
  { id: 'cadillac-ct5', name: 'Cadillac CT5', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Cadillac', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Cadillac CT5', unit: '', prices: generatePrices(40790, 'physical') },
  { id: 'cadillac-ct5-v-blackwing', name: 'Cadillac CT5-V Blackwing', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Cadillac', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Cadillac CT5-V Blackwing', unit: '', prices: generatePrices(94890, 'physical') },
  { id: 'cadillac-xt4', name: 'Cadillac XT4', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Cadillac', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Cadillac XT4', unit: '', prices: generatePrices(38690, 'physical') },
  { id: 'cadillac-xt5', name: 'Cadillac XT5', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Cadillac', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Cadillac XT5', unit: '', prices: generatePrices(47190, 'physical') },
  { id: 'cadillac-xt6', name: 'Cadillac XT6', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Cadillac', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Cadillac XT6', unit: '', prices: generatePrices(52690, 'physical') },
  { id: 'cadillac-escalade', name: 'Cadillac Escalade', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Cadillac', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Cadillac Escalade', unit: '', prices: generatePrices(83490, 'physical') },
  { id: 'cadillac-escalade-v', name: 'Cadillac Escalade-V', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Cadillac', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Cadillac Escalade-V', unit: '', prices: generatePrices(155090, 'physical') },
  { id: 'cadillac-lyriq', name: 'Cadillac Lyriq', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Cadillac', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Cadillac Lyriq', unit: '', prices: generatePrices(58590, 'physical') },
  { id: 'cadillac-vistiq', name: 'Cadillac Vistiq', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Cadillac', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Cadillac Vistiq', unit: '', prices: generatePrices(69890, 'physical') },
  { id: 'lincoln-corsair', name: 'Lincoln Corsair', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Lincoln', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Lincoln Corsair', unit: '', prices: generatePrices(40140, 'physical') },
  { id: 'lincoln-nautilus', name: 'Lincoln Nautilus', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Lincoln', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Lincoln Nautilus', unit: '', prices: generatePrices(47100, 'physical') },
  { id: 'lincoln-aviator', name: 'Lincoln Aviator', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Lincoln', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Lincoln Aviator', unit: '', prices: generatePrices(58350, 'physical') },
  { id: 'lincoln-navigator', name: 'Lincoln Navigator', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Lincoln', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Lincoln Navigator', unit: '', prices: generatePrices(84350, 'physical') },
  { id: 'buick-encore-gx', name: 'Buick Encore GX', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Buick', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Buick Encore GX', unit: '', prices: generatePrices(27900, 'physical') },
  { id: 'buick-envision', name: 'Buick Envision', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Buick', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Buick Envision', unit: '', prices: generatePrices(36700, 'physical') },
  { id: 'buick-enclave', name: 'Buick Enclave', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Buick', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Buick Enclave', unit: '', prices: generatePrices(46300, 'physical') },
  { id: 'chrysler-pacifica', name: 'Chrysler Pacifica', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Van', brand: 'Chrysler', categoryPath: 'Physical Goods > Automobiles > Van', description: 'Chrysler Pacifica', unit: '', prices: generatePrices(39595, 'physical') },
  { id: 'chrysler-pacifica-hybrid', name: 'Chrysler Pacifica Hybrid', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Van', brand: 'Chrysler', categoryPath: 'Physical Goods > Automobiles > Van', description: 'Chrysler Pacifica Hybrid', unit: '', prices: generatePrices(50895, 'physical') },
  { id: 'chrysler-300', name: 'Chrysler 300', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Chrysler', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Chrysler 300', unit: '', prices: generatePrices(37745, 'physical') },
  { id: 'rivian-r1s', name: 'Rivian R1S', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Rivian', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Rivian R1S', unit: '', prices: generatePrices(78000, 'physical') },
  { id: 'rivian-r1s-performance', name: 'Rivian R1S Performance', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Rivian', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Rivian R1S Performance', unit: '', prices: generatePrices(88000, 'physical') },
  { id: 'rivian-r2', name: 'Rivian R2', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Rivian', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Rivian R2', unit: '', prices: generatePrices(45000, 'physical') },
  { id: 'rivian-r3', name: 'Rivian R3', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Rivian', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Rivian R3', unit: '', prices: generatePrices(37000, 'physical') },
  { id: 'rivian-r1t', name: 'Rivian R1T', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Rivian', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Rivian R1T', unit: '', prices: generatePrices(73000, 'physical') },
  { id: 'rivian-r1t-performance', name: 'Rivian R1T Performance', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Rivian', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Rivian R1T Performance', unit: '', prices: generatePrices(83000, 'physical') },
  { id: 'lucid-air-pure', name: 'Lucid Air Pure', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Lucid', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Lucid Air Pure', unit: '', prices: generatePrices(71400, 'physical') },
  { id: 'lucid-air-touring', name: 'Lucid Air Touring', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Lucid', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Lucid Air Touring', unit: '', prices: generatePrices(79800, 'physical') },
  { id: 'lucid-air-grand-touring', name: 'Lucid Air Grand Touring', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Lucid', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Lucid Air Grand Touring', unit: '', prices: generatePrices(110500, 'physical') },
  { id: 'lucid-air-sapphire', name: 'Lucid Air Sapphire', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Lucid', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Lucid Air Sapphire', unit: '', prices: generatePrices(249000, 'physical') },
  { id: 'lucid-gravity', name: 'Lucid Gravity', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Lucid', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Lucid Gravity', unit: '', prices: generatePrices(80950, 'physical') },
  { id: 'polestar-polestar-2', name: 'Polestar Polestar 2', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Polestar', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Polestar Polestar 2', unit: '', prices: generatePrices(49800, 'physical') },
  { id: 'polestar-polestar-4', name: 'Polestar Polestar 4', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Polestar', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Polestar Polestar 4', unit: '', prices: generatePrices(56300, 'physical') },
  { id: 'polestar-polestar-5', name: 'Polestar Polestar 5', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Polestar', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Polestar Polestar 5', unit: '', prices: generatePrices(89900, 'physical') },
  { id: 'polestar-polestar-3', name: 'Polestar Polestar 3', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Polestar', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Polestar Polestar 3', unit: '', prices: generatePrices(73400, 'physical') },
  { id: 'byd-seal', name: 'BYD Seal', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'BYD', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'BYD Seal', unit: '', prices: generatePrices(26900, 'physical') },
  { id: 'byd-han', name: 'BYD Han', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'BYD', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'BYD Han', unit: '', prices: generatePrices(32900, 'physical') },
  { id: 'byd-qin-plus', name: 'BYD Qin Plus', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'BYD', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'BYD Qin Plus', unit: '', prices: generatePrices(15900, 'physical') },
  { id: 'byd-atto-3', name: 'BYD Atto 3', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'BYD', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'BYD Atto 3', unit: '', prices: generatePrices(29900, 'physical') },
  { id: 'byd-tang', name: 'BYD Tang', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'BYD', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'BYD Tang', unit: '', prices: generatePrices(42900, 'physical') },
  { id: 'byd-song-plus', name: 'BYD Song Plus', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'BYD', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'BYD Song Plus', unit: '', prices: generatePrices(22900, 'physical') },
  { id: 'byd-yuan-plus', name: 'BYD Yuan Plus', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'BYD', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'BYD Yuan Plus', unit: '', prices: generatePrices(20900, 'physical') },
  { id: 'byd-dolphin', name: 'BYD Dolphin', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'BYD', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'BYD Dolphin', unit: '', prices: generatePrices(16900, 'physical') },
  { id: 'byd-seagull', name: 'BYD Seagull', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'BYD', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'BYD Seagull', unit: '', prices: generatePrices(10900, 'physical') },
  { id: 'nio-et5', name: 'NIO ET5', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'NIO', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'NIO ET5', unit: '', prices: generatePrices(47700, 'physical') },
  { id: 'nio-et7', name: 'NIO ET7', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'NIO', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'NIO ET7', unit: '', prices: generatePrices(69900, 'physical') },
  { id: 'nio-et5-touring', name: 'NIO ET5 Touring', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'NIO', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'NIO ET5 Touring', unit: '', prices: generatePrices(49900, 'physical') },
  { id: 'nio-es6', name: 'NIO ES6', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'NIO', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'NIO ES6', unit: '', prices: generatePrices(48800, 'physical') },
  { id: 'nio-es7', name: 'NIO ES7', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'NIO', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'NIO ES7', unit: '', prices: generatePrices(54800, 'physical') },
  { id: 'nio-es8', name: 'NIO ES8', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'NIO', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'NIO ES8', unit: '', prices: generatePrices(65800, 'physical') },
  { id: 'nio-ec6', name: 'NIO EC6', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'NIO', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'NIO EC6', unit: '', prices: generatePrices(52600, 'physical') },
  { id: 'nio-ec7', name: 'NIO EC7', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'NIO', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'NIO EC7', unit: '', prices: generatePrices(62600, 'physical') },
  { id: 'xpeng-p7', name: 'XPeng P7', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'XPeng', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'XPeng P7', unit: '', prices: generatePrices(37200, 'physical') },
  { id: 'xpeng-p5', name: 'XPeng P5', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'XPeng', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'XPeng P5', unit: '', prices: generatePrices(25600, 'physical') },
  { id: 'xpeng-g6', name: 'XPeng G6', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'XPeng', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'XPeng G6', unit: '', prices: generatePrices(33900, 'physical') },
  { id: 'xpeng-g9', name: 'XPeng G9', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'XPeng', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'XPeng G9', unit: '', prices: generatePrices(44600, 'physical') },
  { id: 'li-auto-l7', name: 'Li Auto L7', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Li Auto', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Li Auto L7', unit: '', prices: generatePrices(45900, 'physical') },
  { id: 'li-auto-l8', name: 'Li Auto L8', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Li Auto', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Li Auto L8', unit: '', prices: generatePrices(50900, 'physical') },
  { id: 'li-auto-l9', name: 'Li Auto L9', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Li Auto', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Li Auto L9', unit: '', prices: generatePrices(56900, 'physical') },
  { id: 'li-auto-mega', name: 'Li Auto MEGA', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Li Auto', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Li Auto MEGA', unit: '', prices: generatePrices(68900, 'physical') },
  { id: 'fiat-500', name: 'Fiat 500', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Fiat', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Fiat 500', unit: '', prices: generatePrices(18890, 'physical') },
  { id: 'fiat-500e', name: 'Fiat 500e', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Fiat', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Fiat 500e', unit: '', prices: generatePrices(34095, 'physical') },
  { id: 'fiat-500x', name: 'Fiat 500X', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Fiat', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Fiat 500X', unit: '', prices: generatePrices(29090, 'physical') },
  { id: 'alfa-romeo-giulia', name: 'Alfa Romeo Giulia', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Alfa Romeo', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Alfa Romeo Giulia', unit: '', prices: generatePrices(46150, 'physical') },
  { id: 'alfa-romeo-giulia-quadrifoglio', name: 'Alfa Romeo Giulia Quadrifoglio', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Alfa Romeo', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Alfa Romeo Giulia Quadrifoglio', unit: '', prices: generatePrices(84800, 'physical') },
  { id: 'alfa-romeo-stelvio', name: 'Alfa Romeo Stelvio', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Alfa Romeo', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Alfa Romeo Stelvio', unit: '', prices: generatePrices(50750, 'physical') },
  { id: 'alfa-romeo-stelvio-quadrifoglio', name: 'Alfa Romeo Stelvio Quadrifoglio', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Alfa Romeo', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Alfa Romeo Stelvio Quadrifoglio', unit: '', prices: generatePrices(88450, 'physical') },
  { id: 'alfa-romeo-tonale', name: 'Alfa Romeo Tonale', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Alfa Romeo', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Alfa Romeo Tonale', unit: '', prices: generatePrices(37890, 'physical') },
  { id: 'lotus-emira', name: 'Lotus Emira', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Lotus', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Lotus Emira', unit: '', prices: generatePrices(82900, 'physical') },
  { id: 'lotus-evija', name: 'Lotus Evija', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sports Car', brand: 'Lotus', categoryPath: 'Physical Goods > Automobiles > Sports Car', description: 'Lotus Evija', unit: '', prices: generatePrices(2100000, 'physical') },
  { id: 'lotus-eletre', name: 'Lotus Eletre', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Lotus', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Lotus Eletre', unit: '', prices: generatePrices(106800, 'physical') },
  { id: 'mitsubishi-outlander', name: 'Mitsubishi Outlander', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mitsubishi', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mitsubishi Outlander', unit: '', prices: generatePrices(32290, 'physical') },
  { id: 'mitsubishi-outlander-phev', name: 'Mitsubishi Outlander PHEV', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mitsubishi', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mitsubishi Outlander PHEV', unit: '', prices: generatePrices(41690, 'physical') },
  { id: 'mitsubishi-eclipse-cross', name: 'Mitsubishi Eclipse Cross', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mitsubishi', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mitsubishi Eclipse Cross', unit: '', prices: generatePrices(28990, 'physical') },
  { id: 'mitsubishi-mirage', name: 'Mitsubishi Mirage', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Mitsubishi', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Mitsubishi Mirage', unit: '', prices: generatePrices(17990, 'physical') },
  { id: 'suzuki-swift', name: 'Suzuki Swift', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Suzuki', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Suzuki Swift', unit: '', prices: generatePrices(16900, 'physical') },
  { id: 'suzuki-ignis', name: 'Suzuki Ignis', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Suzuki', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Suzuki Ignis', unit: '', prices: generatePrices(15600, 'physical') },
  { id: 'suzuki-baleno', name: 'Suzuki Baleno', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Suzuki', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Suzuki Baleno', unit: '', prices: generatePrices(14800, 'physical') },
  { id: 'suzuki-vitara', name: 'Suzuki Vitara', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Suzuki', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Suzuki Vitara', unit: '', prices: generatePrices(25900, 'physical') },
  { id: 'suzuki-s-cross', name: 'Suzuki S-Cross', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Suzuki', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Suzuki S-Cross', unit: '', prices: generatePrices(27900, 'physical') },
  { id: 'suzuki-jimny', name: 'Suzuki Jimny', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Suzuki', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Suzuki Jimny', unit: '', prices: generatePrices(26500, 'physical') },
  { id: 'mini-cooper', name: 'MINI Cooper', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'MINI', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'MINI Cooper', unit: '', prices: generatePrices(32900, 'physical') },
  { id: 'mini-cooper-s', name: 'MINI Cooper S', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'MINI', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'MINI Cooper S', unit: '', prices: generatePrices(37900, 'physical') },
  { id: 'mini-john-cooper-works', name: 'MINI John Cooper Works', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'MINI', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'MINI John Cooper Works', unit: '', prices: generatePrices(43900, 'physical') },
  { id: 'mini-countryman', name: 'MINI Countryman', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'MINI', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'MINI Countryman', unit: '', prices: generatePrices(38900, 'physical') },
  { id: 'mini-countryman-se', name: 'MINI Countryman SE', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'MINI', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'MINI Countryman SE', unit: '', prices: generatePrices(43900, 'physical') },
  { id: 'mini-cooper-se', name: 'MINI Cooper SE', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'MINI', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'MINI Cooper SE', unit: '', prices: generatePrices(36900, 'physical') },
  { id: 'peugeot-208', name: 'Peugeot 208', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Peugeot', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Peugeot 208', unit: '', prices: generatePrices(19900, 'physical') },
  { id: 'peugeot-308', name: 'Peugeot 308', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Peugeot', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Peugeot 308', unit: '', prices: generatePrices(28900, 'physical') },
  { id: 'peugeot-2008', name: 'Peugeot 2008', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Peugeot', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Peugeot 2008', unit: '', prices: generatePrices(24900, 'physical') },
  { id: 'peugeot-3008', name: 'Peugeot 3008', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Peugeot', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Peugeot 3008', unit: '', prices: generatePrices(33900, 'physical') },
  { id: 'peugeot-5008', name: 'Peugeot 5008', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Peugeot', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Peugeot 5008', unit: '', prices: generatePrices(38900, 'physical') },
  { id: 'peugeot-408', name: 'Peugeot 408', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Peugeot', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Peugeot 408', unit: '', prices: generatePrices(36900, 'physical') },
  { id: 'renault-clio', name: 'Renault Clio', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Renault', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Renault Clio', unit: '', prices: generatePrices(18900, 'physical') },
  { id: 'renault-megane-e-tech', name: 'Renault Megane E-Tech', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Renault', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Renault Megane E-Tech', unit: '', prices: generatePrices(37900, 'physical') },
  { id: 'renault-captur', name: 'Renault Captur', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Renault', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Renault Captur', unit: '', prices: generatePrices(23900, 'physical') },
  { id: 'renault-arkana', name: 'Renault Arkana', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Renault', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Renault Arkana', unit: '', prices: generatePrices(29900, 'physical') },
  { id: 'renault-austral', name: 'Renault Austral', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Renault', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Renault Austral', unit: '', prices: generatePrices(34900, 'physical') },
  { id: 'renault-espace', name: 'Renault Espace', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Renault', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Renault Espace', unit: '', prices: generatePrices(40900, 'physical') },
  { id: 'citroen-c3', name: 'Citroen C3', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Citroen', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Citroen C3', unit: '', prices: generatePrices(15900, 'physical') },
  { id: 'citroen-c4', name: 'Citroen C4', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Citroen', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Citroen C4', unit: '', prices: generatePrices(24900, 'physical') },
  { id: 'citroen-c3-aircross', name: 'Citroen C3 Aircross', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Citroen', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Citroen C3 Aircross', unit: '', prices: generatePrices(20900, 'physical') },
  { id: 'citroen-c5-aircross', name: 'Citroen C5 Aircross', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Citroen', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Citroen C5 Aircross', unit: '', prices: generatePrices(29900, 'physical') },
  { id: 'seat-ibiza', name: 'SEAT Ibiza', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'SEAT', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'SEAT Ibiza', unit: '', prices: generatePrices(18900, 'physical') },
  { id: 'seat-leon', name: 'SEAT Leon', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'SEAT', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'SEAT Leon', unit: '', prices: generatePrices(25900, 'physical') },
  { id: 'seat-arona', name: 'SEAT Arona', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'SEAT', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'SEAT Arona', unit: '', prices: generatePrices(22900, 'physical') },
  { id: 'seat-ateca', name: 'SEAT Ateca', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'SEAT', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'SEAT Ateca', unit: '', prices: generatePrices(28900, 'physical') },
  { id: 'seat-tarraco', name: 'SEAT Tarraco', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'SEAT', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'SEAT Tarraco', unit: '', prices: generatePrices(35900, 'physical') },
  { id: 'skoda-octavia', name: 'Skoda Octavia', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Skoda', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Skoda Octavia', unit: '', prices: generatePrices(26900, 'physical') },
  { id: 'skoda-superb', name: 'Skoda Superb', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Skoda', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Skoda Superb', unit: '', prices: generatePrices(36900, 'physical') },
  { id: 'skoda-kamiq', name: 'Skoda Kamiq', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Skoda', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Skoda Kamiq', unit: '', prices: generatePrices(23900, 'physical') },
  { id: 'skoda-karoq', name: 'Skoda Karoq', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Skoda', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Skoda Karoq', unit: '', prices: generatePrices(28900, 'physical') },
  { id: 'skoda-kodiaq', name: 'Skoda Kodiaq', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Skoda', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Skoda Kodiaq', unit: '', prices: generatePrices(34900, 'physical') },
  { id: 'skoda-enyaq', name: 'Skoda Enyaq', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Skoda', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Skoda Enyaq', unit: '', prices: generatePrices(42900, 'physical') },
  { id: 'skoda-fabia', name: 'Skoda Fabia', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Skoda', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Skoda Fabia', unit: '', prices: generatePrices(17900, 'physical') },
  { id: 'skoda-scala', name: 'Skoda Scala', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Skoda', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Skoda Scala', unit: '', prices: generatePrices(22900, 'physical') },
  { id: 'dacia-duster', name: 'Dacia Duster', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Dacia', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Dacia Duster', unit: '', prices: generatePrices(15900, 'physical') },
  { id: 'dacia-jogger', name: 'Dacia Jogger', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Dacia', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Dacia Jogger', unit: '', prices: generatePrices(16900, 'physical') },
  { id: 'dacia-sandero', name: 'Dacia Sandero', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Dacia', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Dacia Sandero', unit: '', prices: generatePrices(12900, 'physical') },
  { id: 'dacia-spring', name: 'Dacia Spring', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Dacia', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Dacia Spring', unit: '', prices: generatePrices(22000, 'physical') },
  { id: 'cupra-born', name: 'CUPRA Born', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'CUPRA', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'CUPRA Born', unit: '', prices: generatePrices(38900, 'physical') },
  { id: 'cupra-leon', name: 'CUPRA Leon', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'CUPRA', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'CUPRA Leon', unit: '', prices: generatePrices(35900, 'physical') },
  { id: 'cupra-formentor', name: 'CUPRA Formentor', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'CUPRA', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'CUPRA Formentor', unit: '', prices: generatePrices(37900, 'physical') },
  { id: 'cupra-tavascan', name: 'CUPRA Tavascan', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'CUPRA', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'CUPRA Tavascan', unit: '', prices: generatePrices(52900, 'physical') },
  { id: 'tata-nexon', name: 'Tata Nexon', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Tata', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Tata Nexon', unit: '', prices: generatePrices(10900, 'physical') },
  { id: 'tata-harrier', name: 'Tata Harrier', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Tata', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Tata Harrier', unit: '', prices: generatePrices(19900, 'physical') },
  { id: 'tata-safari', name: 'Tata Safari', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Tata', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Tata Safari', unit: '', prices: generatePrices(21900, 'physical') },
  { id: 'tata-punch', name: 'Tata Punch', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Tata', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Tata Punch', unit: '', prices: generatePrices(7900, 'physical') },
  { id: 'tata-tiago', name: 'Tata Tiago', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Tata', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Tata Tiago', unit: '', prices: generatePrices(6500, 'physical') },
  { id: 'tata-altroz', name: 'Tata Altroz', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Tata', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Tata Altroz', unit: '', prices: generatePrices(8500, 'physical') },
  { id: 'tata-nexon-ev', name: 'Tata Nexon EV', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Tata', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Tata Nexon EV', unit: '', prices: generatePrices(16900, 'physical') },
  { id: 'tata-tiago-ev', name: 'Tata Tiago EV', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Electric', brand: 'Tata', categoryPath: 'Physical Goods > Automobiles > Electric', description: 'Tata Tiago EV', unit: '', prices: generatePrices(11900, 'physical') },
  { id: 'mahindra-thar', name: 'Mahindra Thar', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mahindra', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mahindra Thar', unit: '', prices: generatePrices(15900, 'physical') },
  { id: 'mahindra-xuv700', name: 'Mahindra XUV700', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mahindra', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mahindra XUV700', unit: '', prices: generatePrices(17900, 'physical') },
  { id: 'mahindra-scorpio-n', name: 'Mahindra Scorpio N', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mahindra', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mahindra Scorpio N', unit: '', prices: generatePrices(14900, 'physical') },
  { id: 'mahindra-xuv400-ev', name: 'Mahindra XUV400 EV', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mahindra', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mahindra XUV400 EV', unit: '', prices: generatePrices(18900, 'physical') },
  { id: 'mahindra-bolero', name: 'Mahindra Bolero', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Mahindra', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Mahindra Bolero', unit: '', prices: generatePrices(11500, 'physical') },
  { id: 'maruti-suzuki-alto-k10', name: 'Maruti Suzuki Alto K10', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Maruti Suzuki', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Maruti Suzuki Alto K10', unit: '', prices: generatePrices(4500, 'physical') },
  { id: 'maruti-suzuki-wagonr', name: 'Maruti Suzuki WagonR', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Maruti Suzuki', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Maruti Suzuki WagonR', unit: '', prices: generatePrices(6200, 'physical') },
  { id: 'maruti-suzuki-swift', name: 'Maruti Suzuki Swift', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Maruti Suzuki', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Maruti Suzuki Swift', unit: '', prices: generatePrices(7500, 'physical') },
  { id: 'maruti-suzuki-baleno', name: 'Maruti Suzuki Baleno', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Maruti Suzuki', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Maruti Suzuki Baleno', unit: '', prices: generatePrices(7900, 'physical') },
  { id: 'maruti-suzuki-brezza', name: 'Maruti Suzuki Brezza', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Maruti Suzuki', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Maruti Suzuki Brezza', unit: '', prices: generatePrices(9800, 'physical') },
  { id: 'maruti-suzuki-grand-vitara', name: 'Maruti Suzuki Grand Vitara', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Maruti Suzuki', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Maruti Suzuki Grand Vitara', unit: '', prices: generatePrices(12900, 'physical') },
  { id: 'maruti-suzuki-jimny', name: 'Maruti Suzuki Jimny', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Maruti Suzuki', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Maruti Suzuki Jimny', unit: '', prices: generatePrices(14500, 'physical') },
  { id: 'maruti-suzuki-dzire', name: 'Maruti Suzuki Dzire', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Maruti Suzuki', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Maruti Suzuki Dzire', unit: '', prices: generatePrices(7200, 'physical') },
  { id: 'maruti-suzuki-ciaz', name: 'Maruti Suzuki Ciaz', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Maruti Suzuki', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Maruti Suzuki Ciaz', unit: '', prices: generatePrices(10200, 'physical') },
  { id: 'isuzu-d-max', name: 'Isuzu D-Max', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Isuzu', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Isuzu D-Max', unit: '', prices: generatePrices(28990, 'physical') },
  { id: 'isuzu-d-max-v-cross', name: 'Isuzu D-Max V-Cross', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'Isuzu', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'Isuzu D-Max V-Cross', unit: '', prices: generatePrices(34990, 'physical') },
  { id: 'isuzu-mu-x', name: 'Isuzu MU-X', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Isuzu', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Isuzu MU-X', unit: '', prices: generatePrices(38990, 'physical') },
  { id: 'gwm-haval-h6', name: 'GWM Haval H6', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'GWM', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'GWM Haval H6', unit: '', prices: generatePrices(26900, 'physical') },
  { id: 'gwm-haval-jolion', name: 'GWM Haval Jolion', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'GWM', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'GWM Haval Jolion', unit: '', prices: generatePrices(21900, 'physical') },
  { id: 'gwm-tank-300', name: 'GWM Tank 300', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'GWM', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'GWM Tank 300', unit: '', prices: generatePrices(35900, 'physical') },
  { id: 'gwm-tank-500', name: 'GWM Tank 500', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'GWM', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'GWM Tank 500', unit: '', prices: generatePrices(49900, 'physical') },
  { id: 'gwm-cannon', name: 'GWM Cannon', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Truck', brand: 'GWM', categoryPath: 'Physical Goods > Automobiles > Truck', description: 'GWM Cannon', unit: '', prices: generatePrices(29900, 'physical') },
  { id: 'geely-emgrand', name: 'Geely Emgrand', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Geely', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Geely Emgrand', unit: '', prices: generatePrices(12900, 'physical') },
  { id: 'geely-preface', name: 'Geely Preface', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Geely', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Geely Preface', unit: '', prices: generatePrices(16900, 'physical') },
  { id: 'geely-coolray', name: 'Geely Coolray', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Geely', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Geely Coolray', unit: '', prices: generatePrices(15900, 'physical') },
  { id: 'geely-monjaro', name: 'Geely Monjaro', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Geely', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Geely Monjaro', unit: '', prices: generatePrices(25900, 'physical') },
  { id: 'geely-atlas-pro', name: 'Geely Atlas Pro', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Geely', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Geely Atlas Pro', unit: '', prices: generatePrices(19900, 'physical') },
  { id: 'chery-tiggo-4-pro', name: 'Chery Tiggo 4 Pro', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Chery', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Chery Tiggo 4 Pro', unit: '', prices: generatePrices(18900, 'physical') },
  { id: 'chery-tiggo-7-pro', name: 'Chery Tiggo 7 Pro', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Chery', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Chery Tiggo 7 Pro', unit: '', prices: generatePrices(22900, 'physical') },
  { id: 'chery-tiggo-8-pro', name: 'Chery Tiggo 8 Pro', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Chery', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Chery Tiggo 8 Pro', unit: '', prices: generatePrices(27900, 'physical') },
  { id: 'chery-omoda-5', name: 'Chery Omoda 5', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Chery', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Chery Omoda 5', unit: '', prices: generatePrices(20900, 'physical') },
  { id: 'mg-mg4', name: 'MG MG4', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'MG', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'MG MG4', unit: '', prices: generatePrices(28900, 'physical') },
  { id: 'mg-mg3', name: 'MG MG3', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'MG', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'MG MG3', unit: '', prices: generatePrices(18900, 'physical') },
  { id: 'mg-zs', name: 'MG ZS', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'MG', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'MG ZS', unit: '', prices: generatePrices(22900, 'physical') },
  { id: 'mg-zs-ev', name: 'MG ZS EV', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'MG', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'MG ZS EV', unit: '', prices: generatePrices(31900, 'physical') },
  { id: 'mg-hs', name: 'MG HS', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'MG', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'MG HS', unit: '', prices: generatePrices(26900, 'physical') },
  { id: 'vinfast-vf-8', name: 'VinFast VF 8', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'VinFast', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'VinFast VF 8', unit: '', prices: generatePrices(46000, 'physical') },
  { id: 'vinfast-vf-9', name: 'VinFast VF 9', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'VinFast', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'VinFast VF 9', unit: '', prices: generatePrices(59000, 'physical') },
  { id: 'vinfast-vf-6', name: 'VinFast VF 6', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'VinFast', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'VinFast VF 6', unit: '', prices: generatePrices(30000, 'physical') },
  { id: 'vinfast-vf-7', name: 'VinFast VF 7', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'VinFast', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'VinFast VF 7', unit: '', prices: generatePrices(38000, 'physical') },
  { id: 'fisker-ocean', name: 'Fisker Ocean', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Fisker', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Fisker Ocean', unit: '', prices: generatePrices(37499, 'physical') },
  { id: 'fisker-ocean-extreme', name: 'Fisker Ocean Extreme', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Fisker', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Fisker Ocean Extreme', unit: '', prices: generatePrices(68999, 'physical') },
  { id: 'smart-fortwo', name: 'Smart fortwo', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Smart', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Smart fortwo', unit: '', prices: generatePrices(24950, 'physical') },
  { id: 'smart-smart-3', name: 'Smart Smart 3', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Smart', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Smart Smart 3', unit: '', prices: generatePrices(38990, 'physical') },
  { id: 'lancia-ypsilon', name: 'Lancia Ypsilon', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Lancia', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Lancia Ypsilon', unit: '', prices: generatePrices(24900, 'physical') },
  { id: 'ds-automobiles-ds-3', name: 'DS Automobiles DS 3', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'DS Automobiles', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'DS Automobiles DS 3', unit: '', prices: generatePrices(42900, 'physical') },
  { id: 'ds-automobiles-ds-7', name: 'DS Automobiles DS 7', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'DS Automobiles', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'DS Automobiles DS 7', unit: '', prices: generatePrices(49900, 'physical') },
  { id: 'ds-automobiles-ds-4', name: 'DS Automobiles DS 4', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'DS Automobiles', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'DS Automobiles DS 4', unit: '', prices: generatePrices(39900, 'physical') },
  { id: 'ds-automobiles-ds-9', name: 'DS Automobiles DS 9', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'DS Automobiles', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'DS Automobiles DS 9', unit: '', prices: generatePrices(56900, 'physical') },
  { id: 'opel-corsa', name: 'Opel Corsa', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Opel', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Opel Corsa', unit: '', prices: generatePrices(18900, 'physical') },
  { id: 'opel-astra', name: 'Opel Astra', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Opel', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Opel Astra', unit: '', prices: generatePrices(27900, 'physical') },
  { id: 'opel-mokka', name: 'Opel Mokka', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Opel', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Opel Mokka', unit: '', prices: generatePrices(24900, 'physical') },
  { id: 'opel-grandland', name: 'Opel Grandland', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Opel', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Opel Grandland', unit: '', prices: generatePrices(33900, 'physical') },
  { id: 'vauxhall-corsa', name: 'Vauxhall Corsa', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Vauxhall', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Vauxhall Corsa', unit: '', prices: generatePrices(19400, 'physical') },
  { id: 'vauxhall-astra', name: 'Vauxhall Astra', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Vauxhall', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Vauxhall Astra', unit: '', prices: generatePrices(28400, 'physical') },
  { id: 'vauxhall-mokka', name: 'Vauxhall Mokka', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Vauxhall', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Vauxhall Mokka', unit: '', prices: generatePrices(25400, 'physical') },
  { id: 'vauxhall-grandland', name: 'Vauxhall Grandland', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Vauxhall', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Vauxhall Grandland', unit: '', prices: generatePrices(34400, 'physical') },
  { id: 'ssangyong-tivoli', name: 'SsangYong Tivoli', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'SsangYong', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'SsangYong Tivoli', unit: '', prices: generatePrices(19900, 'physical') },
  { id: 'ssangyong-korando', name: 'SsangYong Korando', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'SsangYong', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'SsangYong Korando', unit: '', prices: generatePrices(26900, 'physical') },
  { id: 'ssangyong-rexton', name: 'SsangYong Rexton', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'SsangYong', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'SsangYong Rexton', unit: '', prices: generatePrices(36900, 'physical') },
  { id: 'ssangyong-torres', name: 'SsangYong Torres', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'SsangYong', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'SsangYong Torres', unit: '', prices: generatePrices(29900, 'physical') },
  { id: 'great-wall-ora-cat', name: 'Great Wall Ora Cat', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Great Wall', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Great Wall Ora Cat', unit: '', prices: generatePrices(28900, 'physical') },
  { id: 'great-wall-wey-coffee-01', name: 'Great Wall Wey Coffee 01', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Great Wall', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Great Wall Wey Coffee 01', unit: '', prices: generatePrices(42900, 'physical') },
  { id: 'togg-t10x', name: 'TOGG T10X', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'TOGG', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'TOGG T10X', unit: '', prices: generatePrices(40000, 'physical') },
  { id: 'proton-saga', name: 'Proton Saga', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Proton', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Proton Saga', unit: '', prices: generatePrices(9500, 'physical') },
  { id: 'proton-s70', name: 'Proton S70', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Sedan', brand: 'Proton', categoryPath: 'Physical Goods > Automobiles > Sedan', description: 'Proton S70', unit: '', prices: generatePrices(16900, 'physical') },
  { id: 'proton-x50', name: 'Proton X50', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Proton', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Proton X50', unit: '', prices: generatePrices(17900, 'physical') },
  { id: 'proton-x70', name: 'Proton X70', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Proton', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Proton X70', unit: '', prices: generatePrices(22900, 'physical') },
  { id: 'proton-x90', name: 'Proton X90', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Proton', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Proton X90', unit: '', prices: generatePrices(32900, 'physical') },
  { id: 'perodua-myvi', name: 'Perodua Myvi', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Perodua', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Perodua Myvi', unit: '', prices: generatePrices(10900, 'physical') },
  { id: 'perodua-axia', name: 'Perodua Axia', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - Hatchback', brand: 'Perodua', categoryPath: 'Physical Goods > Automobiles > Hatchback', description: 'Perodua Axia', unit: '', prices: generatePrices(7500, 'physical') },
  { id: 'perodua-ativa', name: 'Perodua Ativa', category: 'physical', categoryLabel: 'Physical Goods', subcategory: 'Automobiles - SUV', brand: 'Perodua', categoryPath: 'Physical Goods > Automobiles > SUV', description: 'Perodua Ativa', unit: '', prices: generatePrices(13900, 'physical') },
]

export function getCountryByCode(code: string): Country | undefined {
  return countries.find(c => c.code === code)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function priceToUSD(localPrice: number, country: Country): number {
  return localPrice / country.exchangeRate
}

export function pppAdjustedPrice(localPrice: number, country: Country): number {
  const usd = priceToUSD(localPrice, country)
  return usd * country.pppFactor
}

export function calculateFairness(product: Product, countryCode: string): FairnessResult | null {
  const country = getCountryByCode(countryCode)
  const priceEntry = product.prices[countryCode]
  const usPriceEntry = product.prices['US']
  if (!country || !priceEntry || !usPriceEntry) return null

  const usCountry = getCountryByCode('US')!
  const priceUSD = priceToUSD(priceEntry.localPrice, country)
  const usPrice = priceToUSD(usPriceEntry.localPrice, usCountry)

  const allPricesUSD = countries
    .filter(c => product.prices[c.code])
    .map(c => priceToUSD(product.prices[c.code].localPrice, c))
  const globalMedianUSD = allPricesUSD.sort((a, b) => a - b)[Math.floor(allPricesUSD.length / 2)]

  const pppPrice = pppAdjustedPrice(priceEntry.localPrice, country)
  const usPPP = pppAdjustedPrice(usPriceEntry.localPrice, usCountry)

  const incomePercentage = (priceUSD / country.medianIncome) * 100
  const usIncomePercentage = (usPrice / usCountry.medianIncome) * 100

  const rawRatio = priceUSD / usPrice
  const rawScore = Math.max(0, Math.min(100, 50 + (1 - rawRatio) * 50))

  const pppRatio = pppPrice / usPPP
  const pppScore = Math.max(0, Math.min(100, 50 + (1 - pppRatio) * 50))

  const incomeRatio = incomePercentage / usIncomePercentage
  const incomeScore = Math.max(0, Math.min(100, 50 + (1 - incomeRatio) * 50))

  const colRatio = (priceUSD / country.costOfLivingIndex) / (usPrice / usCountry.costOfLivingIndex)
  const colScore = Math.max(0, Math.min(100, 50 + (1 - colRatio) * 50))

  const factors: PriceFactor[] = []
  if (priceEntry.taxRate > 0) {
    factors.push({
      label: `VAT/GST (${priceEntry.taxRate}%)`,
      impact: 'increases',
      percentage: priceEntry.taxRate,
      description: priceEntry.includesTax
        ? `Price includes ${priceEntry.taxRate}% tax. Pre-tax price would be ${country.currencySymbol}${(priceEntry.localPrice / (1 + priceEntry.taxRate / 100)).toFixed(2)}`
        : `Additional ${priceEntry.taxRate}% tax applies on top of listed price`,
    })
  }
  if (priceEntry.importDuty > 0) {
    factors.push({
      label: `Import Duties (~${priceEntry.importDuty}%)`,
      impact: 'increases',
      percentage: priceEntry.importDuty,
      description: `Average import duty of ${priceEntry.importDuty}% adds to the cost of imported goods in ${country.name}`,
    })
  }
  if (priceEntry.distributionMarkup > 5) {
    factors.push({
      label: 'Distribution Costs',
      impact: 'increases',
      percentage: priceEntry.distributionMarkup,
      description: `Higher logistics and distribution costs contribute ~${priceEntry.distributionMarkup}% markup in ${country.name}`,
    })
  }
  if (country.pppFactor > 1.5) {
    factors.push({
      label: 'Lower Purchasing Power',
      impact: 'increases',
      percentage: Math.round((country.pppFactor - 1) * 100),
      description: `${country.name} has ${country.pppFactor.toFixed(1)}x purchasing power adjustment. Products feel ${Math.round((country.pppFactor - 1) * 100)}% more expensive relative to local wages.`,
    })
  }
  if (priceEntry.notes) {
    factors.push({
      label: 'Local Context',
      impact: 'neutral',
      percentage: 0,
      description: priceEntry.notes,
    })
  }

  const trendData = generateTrendData(product, countryCode)
  const { signal: trendSignal, reason: trendReason } = getTrendSignal(trendData)
  const hw = hoursOfWork(priceUSD, country)
  const usHw = hoursOfWork(usPrice, usCountry)
  const conf = getConfidence(product, countryCode)

  return {
    rawScore, pppScore, incomeScore, colScore,
    priceUSD, usPrice, globalMedianUSD,
    pppAdjustedPrice: pppPrice,
    incomePercentage, usIncomePercentage,
    factors,
    hoursOfWork: hw,
    usHoursOfWork: usHw,
    confidenceScore: conf.score,
    confidenceLabel: conf.label,
    trendData,
    trendSignal,
    trendReason,
  }
}

export function generateQuizQuestion(): QuizQuestion {
  const validProducts = products.filter(p => Object.keys(p.prices).length >= 5)
  const product = validProducts[Math.floor(Math.random() * validProducts.length)]
  const availableCountries = countries.filter(c => product.prices[c.code])
  const shuffled = [...availableCountries].sort(() => Math.random() - 0.5)
  const countryA = shuffled[0]
  const countryB = shuffled[1]
  const priceA = priceToUSD(product.prices[countryA.code].localPrice, countryA)
  const priceB = priceToUSD(product.prices[countryB.code].localPrice, countryB)
  return {
    product, countryA, countryB,
    answer: priceA >= priceB ? 'A' : 'B',
    priceA_USD: priceA, priceB_USD: priceB,
  }
}

export function getLeaderboard(): { country: Country; avgScore: number; productCount: number }[] {
  return countries.map(country => {
    const scores: number[] = []
    for (const product of products) {
      const result = calculateFairness(product, country.code)
      if (result) scores.push(result.pppScore)
    }
    return {
      country,
      avgScore: scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 50,
      productCount: scores.length,
    }
  }).sort((a, b) => b.avgScore - a.avgScore)
}

export const productCategories = [
  { id: 'all', label: 'All', icon: 'Globe' },
  { id: 'digital', label: 'Digital Goods', icon: 'Monitor' },
  { id: 'physical', label: 'Physical Goods', icon: 'Package' },
  { id: 'saas', label: 'SaaS / B2B', icon: 'Cloud' },
  { id: 'essential', label: 'Essentials', icon: 'ShoppingBasket' },
  { id: 'service', label: 'Services', icon: 'Wrench' },
  { id: 'medical', label: 'Medical', icon: 'Stethoscope' },
]

export function getCountryComparison(countryCode: string): { product: Product; score: number; priceUSD: number; usPrice: number; ratio: number }[] {
  return products
    .map(product => {
      const result = calculateFairness(product, countryCode)
      if (!result) return null
      return {
        product,
        score: result.pppScore,
        priceUSD: result.priceUSD,
        usPrice: result.usPrice,
        ratio: result.pppAdjustedPrice / (result.usPrice || 1),
      }
    })
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .sort((a, b) => a.score - b.score)
}

export function getGlobalStats(): { totalProducts: number; totalCountries: number; avgFairnessScore: number; mostExpensiveProduct: { product: Product; country: Country; ratio: number } | null } {
  let worstRatio = 0
  let worstProduct: Product | null = null
  let worstCountry: Country | null = null
  let totalScores = 0
  let scoreCount = 0

  for (const product of products) {
    for (const country of countries) {
      const result = calculateFairness(product, country.code)
      if (result) {
        totalScores += result.pppScore
        scoreCount++
        const ratio = result.pppAdjustedPrice / (result.usPrice || 1)
        if (ratio > worstRatio) {
          worstRatio = ratio
          worstProduct = product
          worstCountry = country
        }
      }
    }
  }

  return {
    totalProducts: products.length,
    totalCountries: countries.length,
    avgFairnessScore: scoreCount > 0 ? totalScores / scoreCount : 50,
    mostExpensiveProduct: worstProduct && worstCountry ? { product: worstProduct, country: worstCountry, ratio: worstRatio } : null,
  }
}

export const fairnessLenses: FairnessLens[] = [
  {
    id: 'raw',
    label: 'vs United States',
    description: 'Raw price comparison converted to USD against US prices',
    calculate: (priceUSD, _country, _product, usPrice) => {
      const ratio = priceUSD / usPrice
      return Math.max(0, Math.min(100, 50 + (1 - ratio) * 50))
    },
  },
  {
    id: 'ppp',
    label: 'PPP-Adjusted',
    description: 'Adjusted for Purchasing Power Parity — what your money actually buys locally',
    calculate: (priceUSD, country, _product, usPrice) => {
      const pppPrice = priceUSD * country.pppFactor
      const ratio = pppPrice / usPrice
      return Math.max(0, Math.min(100, 50 + (1 - ratio) * 50))
    },
  },
  {
    id: 'income',
    label: 'Income-Adjusted',
    description: 'Compared by percentage of median annual income spent on this item',
    calculate: (priceUSD, country, _product, usPrice) => {
      const localPct = priceUSD / country.medianIncome
      const usPct = usPrice / 45000
      const ratio = localPct / usPct
      return Math.max(0, Math.min(100, 50 + (1 - ratio) * 50))
    },
  },
  {
    id: 'col',
    label: 'Cost-of-Living Adjusted',
    description: 'Normalized by overall cost of living in each country (US = 100)',
    calculate: (priceUSD, country, _product, usPrice) => {
      const colRatio = (priceUSD / country.costOfLivingIndex) / (usPrice / 100)
      return Math.max(0, Math.min(100, 50 + (1 - colRatio) * 50))
    },
  },
]

function seededRandom(seed: number): () => number {
  let s = seed
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646 }
}

function hashStr(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) { h = ((h << 5) - h + str.charCodeAt(i)) | 0 }
  return Math.abs(h)
}

export function generateTrendData(product: Product, countryCode: string): TrendPoint[] {
  const country = getCountryByCode(countryCode)
  const entry = product.prices[countryCode]
  if (!country || !entry) return []
  const baseUSD = priceToUSD(entry.localPrice, country)
  const rand = seededRandom(hashStr(product.id + countryCode))
  const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb']
  const seasonalFactors: Record<string, number[]> = {
    digital: [1, 1, 0.98, 0.97, 0.96, 0.97, 0.98, 0.99, 0.92, 0.95, 1.02, 1],
    physical: [1.02, 1, 0.98, 0.96, 0.95, 0.97, 1, 1.03, 0.88, 0.93, 1.05, 1.02],
    saas: [1, 1, 1, 0.99, 0.99, 1, 1, 1, 0.95, 0.98, 1.02, 1],
    essential: [0.98, 0.97, 0.95, 0.96, 0.97, 0.99, 1.01, 1.02, 1, 1.01, 1.03, 1.02],
    service: [1, 0.98, 0.97, 0.99, 1.02, 1.05, 1.03, 1, 0.95, 0.98, 1, 1],
    medical: [1, 1.01, 1.02, 1.01, 1, 0.99, 1, 1.01, 1, 1.01, 1.02, 1.01],
  }
  const sf = seasonalFactors[product.category] || seasonalFactors.digital
  const drift = (rand() - 0.5) * 0.08
  const points: TrendPoint[] = []
  let cumDrift = 0
  for (let i = 0; i < 12; i++) {
    cumDrift += drift / 12
    const noise = (rand() - 0.5) * 0.06
    const price = baseUSD * sf[i] * (1 + cumDrift + noise)
    points.push({ month: months[i], price: Math.round(price * 100) / 100, avg: Math.round(baseUSD * 100) / 100 })
  }
  return points
}

export function getTrendSignal(trendData: TrendPoint[]): { signal: 'buy' | 'wait' | 'neutral'; reason: string } {
  if (trendData.length < 3) return { signal: 'neutral', reason: 'Insufficient data for trend analysis' }
  const recent = trendData.slice(-3)
  const older = trendData.slice(0, -3)
  const recentAvg = recent.reduce((s, p) => s + p.price, 0) / recent.length
  const olderAvg = older.reduce((s, p) => s + p.price, 0) / older.length
  const currentPrice = trendData[trendData.length - 1].price
  const avg12m = trendData.reduce((s, p) => s + p.price, 0) / trendData.length
  const pctChange = ((recentAvg - olderAvg) / olderAvg) * 100
  const vsAvg = ((currentPrice - avg12m) / avg12m) * 100
  if (pctChange < -3 && vsAvg < -2) return { signal: 'buy', reason: `Prices dropped ${Math.abs(Math.round(pctChange))}% recently and are ${Math.abs(Math.round(vsAvg))}% below the 12-month average` }
  if (pctChange > 3 && vsAvg > 2) return { signal: 'wait', reason: `Prices rose ${Math.round(pctChange)}% recently and are ${Math.round(vsAvg)}% above the 12-month average` }
  return { signal: 'neutral', reason: 'Prices are stable within normal range' }
}

export function hoursOfWork(priceUSD: number, country: Country): number {
  const hourlyWage = country.medianIncome / (52 * 40)
  return priceUSD / hourlyWage
}

export function getConfidence(product: Product, countryCode: string): { score: number; label: string } {
  const entry = product.prices[countryCode]
  if (!entry) return { score: 0, label: 'No data' }
  const countriesWithPrice = countries.filter(c => product.prices[c.code]).length
  const coverageScore = Math.min(40, (countriesWithPrice / countries.length) * 40)
  const reportsScore = Math.min(30, Math.min(entry.reports, 3000) / 100)
  const brandScore = product.brand ? 15 : 5
  const categoryScore = ['digital', 'saas'].includes(product.category) ? 15 : 10
  const total = Math.round(coverageScore + reportsScore + brandScore + categoryScore)
  const label = total >= 80 ? 'High' : total >= 55 ? 'Medium' : 'Low'
  return { score: total, label }
}

export function getBrandFairnessIndex(): BrandFairnessEntry[] {
  const brandMap = new Map<string, { scores: number[]; cats: Set<string>; bestScore: number; worstScore: number; bestCountry: string; worstCountry: string }>()
  for (const product of products) {
    if (!product.brand) continue
    for (const country of countries) {
      const result = calculateFairness(product, country.code)
      if (!result) continue
      const existing = brandMap.get(product.brand) || { scores: [], cats: new Set<string>(), bestScore: 0, worstScore: 100, bestCountry: '', worstCountry: '' }
      existing.scores.push(result.pppScore)
      existing.cats.add(product.categoryLabel)
      if (result.pppScore > existing.bestScore) { existing.bestScore = result.pppScore; existing.bestCountry = country.name }
      if (result.pppScore < existing.worstScore) { existing.worstScore = result.pppScore; existing.worstCountry = country.name }
      brandMap.set(product.brand, existing)
    }
  }
  const entries: BrandFairnessEntry[] = []
  brandMap.forEach((data, brand) => {
    if (data.scores.length < 5) return
    entries.push({
      brand,
      avgScore: Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length),
      productCount: Math.round(data.scores.length / countries.length),
      worstCountry: data.worstCountry,
      bestCountry: data.bestCountry,
      category: [...data.cats].join(', '),
    })
  })
  return entries.sort((a, b) => b.avgScore - a.avgScore)
}

export function applyScenario(result: FairnessResult, scenario: string, country: Country): { adjustedScore: number; explanation: string } {
  const baseScore = result.pppScore
  switch (scenario) {
    case 'my-income': {
      const ratio = result.incomePercentage / result.usIncomePercentage
      const adjusted = Math.max(0, Math.min(100, 50 + (1 - ratio) * 50))
      return { adjustedScore: Math.round(adjusted), explanation: `Adjusted for ${country.name}'s median income of $${country.medianIncome.toLocaleString()}/year. This item costs ${result.incomePercentage.toFixed(2)}% of annual income vs ${result.usIncomePercentage.toFixed(2)}% in the US.` }
    }
    case 'no-brand': {
      const brandPremium = 8
      const adjusted = Math.min(100, baseScore + brandPremium)
      return { adjustedScore: Math.round(adjusted), explanation: `Removing estimated brand premium (~${brandPremium}pts). Generic or unbranded alternatives would score ${Math.round(adjusted)}/100.` }
    }
    case 'crisis': {
      const crisisInflation = 15
      const adjusted = Math.max(0, baseScore - crisisInflation)
      return { adjustedScore: Math.round(adjusted), explanation: `During supply chain disruptions or economic crises, prices typically inflate 10-20%. Adjusted score accounts for ${crisisInflation}% crisis premium.` }
    }
    case 'sustainable': {
      const sustainabilityPremium = 12
      const adjusted = Math.min(100, baseScore + sustainabilityPremium)
      return { adjustedScore: Math.round(adjusted), explanation: `Sustainably produced goods typically cost 10-25% more. If this price includes ethical sourcing and fair labor, the fairness score improves to ${Math.round(adjusted)}/100.` }
    }
    default:
      return { adjustedScore: baseScore, explanation: 'Standard fairness score without adjustments.' }
  }
}
