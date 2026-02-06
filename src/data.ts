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
]

function generatePrices(baseUSD: number, category: string, overrides?: Partial<Record<string, Partial<ProductPrice>>>): Record<string, ProductPrice> {
  const prices: Record<string, ProductPrice> = {}
  const categoryMultipliers: Record<string, Record<string, number>> = {
    digital: { US: 1, GB: 1.05, DE: 1.08, FR: 1.08, JP: 1.1, AU: 1.12, CA: 1.02, CH: 1.0, SE: 1.08, KR: 1.05, AE: 1.0, PL: 0.65, BR: 0.55, MX: 0.6, TR: 0.45, ZA: 0.55, IN: 0.35, ID: 0.4, EG: 0.35, NG: 0.4 },
    physical: { US: 1, GB: 1.1, DE: 1.15, FR: 1.12, JP: 1.2, AU: 1.18, CA: 1.05, CH: 1.35, SE: 1.15, KR: 1.1, AE: 0.95, PL: 0.75, BR: 1.4, MX: 0.9, TR: 1.1, ZA: 0.85, IN: 0.7, ID: 0.75, EG: 0.8, NG: 0.9 },
    saas: { US: 1, GB: 1.0, DE: 1.05, FR: 1.05, JP: 1.0, AU: 1.08, CA: 1.0, CH: 1.0, SE: 1.05, KR: 0.95, AE: 1.0, PL: 0.6, BR: 0.5, MX: 0.55, TR: 0.4, ZA: 0.5, IN: 0.3, ID: 0.35, EG: 0.3, NG: 0.35 },
    essential: { US: 1, GB: 0.9, DE: 0.85, FR: 0.88, JP: 1.1, AU: 1.05, CA: 0.95, CH: 1.5, SE: 1.0, KR: 0.85, AE: 0.8, PL: 0.45, BR: 0.5, MX: 0.4, TR: 0.35, ZA: 0.4, IN: 0.22, ID: 0.25, EG: 0.2, NG: 0.2 },
    service: { US: 1, GB: 0.85, DE: 0.8, FR: 0.82, JP: 0.9, AU: 0.95, CA: 0.88, CH: 1.4, SE: 0.9, KR: 0.7, AE: 0.75, PL: 0.4, BR: 0.35, MX: 0.3, TR: 0.25, ZA: 0.3, IN: 0.15, ID: 0.18, EG: 0.15, NG: 0.12 },
    medical: { US: 1, GB: 0.25, DE: 0.3, FR: 0.28, JP: 0.35, AU: 0.4, CA: 0.3, CH: 0.5, SE: 0.2, KR: 0.3, AE: 0.45, PL: 0.15, BR: 0.2, MX: 0.18, TR: 0.12, ZA: 0.15, IN: 0.08, ID: 0.1, EG: 0.08, NG: 0.06 },
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
