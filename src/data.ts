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

  return {
    rawScore, pppScore, incomeScore, colScore,
    priceUSD, usPrice, globalMedianUSD,
    pppAdjustedPrice: pppPrice,
    incomePercentage, usIncomePercentage,
    factors,
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
