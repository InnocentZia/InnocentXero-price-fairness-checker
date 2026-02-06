import { useState, useRef } from 'react'
import './App.css'
import {
  Search,
  MapPin,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Minus,
  Shield,
  Globe,
  Users,
  BarChart3,
  ChevronDown,
  Wrench,
  Wifi,
  Plane,
  Home,
  GraduationCap,
  Stethoscope,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
} from 'lucide-react'

interface PriceData {
  service: string
  category: string
  location: string
  avgPrice: number
  minPrice: number
  maxPrice: number
  currency: string
  reports: number
  recentPrices: number[]
}

const mockDatabase: PriceData[] = [
  { service: 'Plumber - Pipe Repair', category: 'plumber', location: 'New York, USA', avgPrice: 275, minPrice: 150, maxPrice: 450, currency: '$', reports: 1247, recentPrices: [200, 300, 250, 275, 310, 180, 350] },
  { service: 'Plumber - Pipe Repair', category: 'plumber', location: 'London, UK', avgPrice: 220, minPrice: 120, maxPrice: 380, currency: '£', reports: 892, recentPrices: [180, 250, 200, 220, 280, 160, 300] },
  { service: 'Plumber - Pipe Repair', category: 'plumber', location: 'Sydney, Australia', avgPrice: 310, minPrice: 180, maxPrice: 500, currency: 'A$', reports: 634, recentPrices: [250, 350, 280, 310, 400, 200, 380] },
  { service: 'Plumber - Pipe Repair', category: 'plumber', location: 'Toronto, Canada', avgPrice: 245, minPrice: 140, maxPrice: 400, currency: 'C$', reports: 756, recentPrices: [190, 280, 230, 245, 320, 170, 350] },
  { service: 'Plumber - Drain Cleaning', category: 'plumber', location: 'New York, USA', avgPrice: 185, minPrice: 100, maxPrice: 320, currency: '$', reports: 983, recentPrices: [150, 200, 170, 185, 250, 120, 280] },
  { service: 'Plumber - Drain Cleaning', category: 'plumber', location: 'London, UK', avgPrice: 150, minPrice: 80, maxPrice: 260, currency: '£', reports: 721, recentPrices: [120, 170, 140, 150, 210, 90, 230] },
  { service: 'Plumber - Water Heater Install', category: 'plumber', location: 'New York, USA', avgPrice: 1200, minPrice: 800, maxPrice: 2000, currency: '$', reports: 542, recentPrices: [950, 1300, 1100, 1200, 1500, 850, 1800] },
  { service: 'Internet Plan - 100 Mbps', category: 'internet', location: 'New York, USA', avgPrice: 65, minPrice: 40, maxPrice: 95, currency: '$', reports: 3421, recentPrices: [50, 70, 60, 65, 80, 45, 85] },
  { service: 'Internet Plan - 100 Mbps', category: 'internet', location: 'London, UK', avgPrice: 35, minPrice: 22, maxPrice: 55, currency: '£', reports: 2890, recentPrices: [28, 38, 32, 35, 45, 25, 50] },
  { service: 'Internet Plan - 100 Mbps', category: 'internet', location: 'Tokyo, Japan', avgPrice: 4500, minPrice: 3000, maxPrice: 6500, currency: '¥', reports: 1876, recentPrices: [3500, 5000, 4200, 4500, 5800, 3200, 6000] },
  { service: 'Internet Plan - 500 Mbps', category: 'internet', location: 'New York, USA', avgPrice: 85, minPrice: 55, maxPrice: 130, currency: '$', reports: 2156, recentPrices: [65, 90, 80, 85, 110, 60, 120] },
  { service: 'Internet Plan - 1 Gbps', category: 'internet', location: 'New York, USA', avgPrice: 110, minPrice: 70, maxPrice: 160, currency: '$', reports: 1543, recentPrices: [80, 120, 100, 110, 140, 75, 150] },
  { service: 'Internet Plan - 100 Mbps', category: 'internet', location: 'Mumbai, India', avgPrice: 700, minPrice: 400, maxPrice: 1200, currency: '₹', reports: 4532, recentPrices: [500, 800, 650, 700, 1000, 450, 1100] },
  { service: 'Flight - Economy Round Trip', category: 'flight', location: 'New York, USA', avgPrice: 450, minPrice: 220, maxPrice: 850, currency: '$', reports: 8932, recentPrices: [300, 500, 380, 450, 650, 250, 750] },
  { service: 'Flight - Economy Round Trip', category: 'flight', location: 'London, UK', avgPrice: 380, minPrice: 180, maxPrice: 720, currency: '£', reports: 7654, recentPrices: [250, 420, 320, 380, 550, 200, 650] },
  { service: 'Flight - Economy Round Trip', category: 'flight', location: 'Dubai, UAE', avgPrice: 1800, minPrice: 900, maxPrice: 3200, currency: 'AED', reports: 3421, recentPrices: [1200, 2000, 1600, 1800, 2600, 1000, 2900] },
  { service: 'Flight - Business Class', category: 'flight', location: 'New York, USA', avgPrice: 2800, minPrice: 1500, maxPrice: 5500, currency: '$', reports: 2341, recentPrices: [2000, 3200, 2500, 2800, 4200, 1800, 4800] },
  { service: '1-Bedroom Apartment Rent', category: 'rent', location: 'New York, USA', avgPrice: 3200, minPrice: 2000, maxPrice: 5000, currency: '$', reports: 12456, recentPrices: [2500, 3500, 2800, 3200, 4200, 2200, 4500] },
  { service: '1-Bedroom Apartment Rent', category: 'rent', location: 'London, UK', avgPrice: 1800, minPrice: 1200, maxPrice: 3000, currency: '£', reports: 9876, recentPrices: [1400, 2000, 1600, 1800, 2400, 1300, 2700] },
  { service: '1-Bedroom Apartment Rent', category: 'rent', location: 'Tokyo, Japan', avgPrice: 85000, minPrice: 55000, maxPrice: 150000, currency: '¥', reports: 7654, recentPrices: [65000, 95000, 78000, 85000, 120000, 60000, 135000] },
  { service: '1-Bedroom Apartment Rent', category: 'rent', location: 'Berlin, Germany', avgPrice: 950, minPrice: 600, maxPrice: 1500, currency: '€', reports: 6543, recentPrices: [750, 1050, 880, 950, 1250, 650, 1400] },
  { service: '2-Bedroom Apartment Rent', category: 'rent', location: 'New York, USA', avgPrice: 4500, minPrice: 3000, maxPrice: 7500, currency: '$', reports: 8765, recentPrices: [3500, 5000, 4000, 4500, 6000, 3200, 6800] },
  { service: 'University Tuition (Annual)', category: 'tuition', location: 'New York, USA', avgPrice: 45000, minPrice: 20000, maxPrice: 75000, currency: '$', reports: 5432, recentPrices: [30000, 50000, 40000, 45000, 60000, 25000, 70000] },
  { service: 'University Tuition (Annual)', category: 'tuition', location: 'London, UK', avgPrice: 15000, minPrice: 9000, maxPrice: 30000, currency: '£', reports: 4321, recentPrices: [11000, 17000, 13500, 15000, 22000, 10000, 27000] },
  { service: 'University Tuition (Annual)', category: 'tuition', location: 'Berlin, Germany', avgPrice: 500, minPrice: 0, maxPrice: 3000, currency: '€', reports: 3210, recentPrices: [100, 600, 350, 500, 1500, 0, 2500] },
  { service: 'University Tuition (Annual)', category: 'tuition', location: 'Sydney, Australia', avgPrice: 35000, minPrice: 18000, maxPrice: 55000, currency: 'A$', reports: 2876, recentPrices: [22000, 40000, 30000, 35000, 48000, 20000, 52000] },
  { service: 'Community College (Annual)', category: 'tuition', location: 'New York, USA', avgPrice: 5500, minPrice: 2500, maxPrice: 12000, currency: '$', reports: 3456, recentPrices: [3500, 6500, 5000, 5500, 8500, 3000, 10000] },
  { service: 'MRI Scan', category: 'medical', location: 'New York, USA', avgPrice: 2600, minPrice: 400, maxPrice: 7000, currency: '$', reports: 6789, recentPrices: [1200, 3200, 2000, 2600, 5000, 600, 6500] },
  { service: 'MRI Scan', category: 'medical', location: 'London, UK', avgPrice: 500, minPrice: 200, maxPrice: 900, currency: '£', reports: 4567, recentPrices: [300, 600, 400, 500, 750, 250, 850] },
  { service: 'MRI Scan', category: 'medical', location: 'Mumbai, India', avgPrice: 8000, minPrice: 3000, maxPrice: 15000, currency: '₹', reports: 5678, recentPrices: [5000, 10000, 7000, 8000, 12000, 4000, 14000] },
  { service: 'Dental Cleaning', category: 'medical', location: 'New York, USA', avgPrice: 200, minPrice: 75, maxPrice: 400, currency: '$', reports: 8901, recentPrices: [120, 250, 170, 200, 320, 90, 380] },
  { service: 'Dental Cleaning', category: 'medical', location: 'London, UK', avgPrice: 80, minPrice: 40, maxPrice: 150, currency: '£', reports: 6789, recentPrices: [55, 95, 70, 80, 120, 45, 140] },
  { service: 'Hip Replacement Surgery', category: 'medical', location: 'New York, USA', avgPrice: 40000, minPrice: 25000, maxPrice: 70000, currency: '$', reports: 1234, recentPrices: [30000, 45000, 35000, 40000, 55000, 28000, 65000] },
  { service: 'Hip Replacement Surgery', category: 'medical', location: 'London, UK', avgPrice: 12000, minPrice: 8000, maxPrice: 20000, currency: '£', reports: 987, recentPrices: [9000, 14000, 11000, 12000, 17000, 8500, 19000] },
]

const categories = [
  { id: 'plumber', label: 'Plumbing', icon: Wrench, color: 'from-blue-500 to-blue-600' },
  { id: 'internet', label: 'Internet Plans', icon: Wifi, color: 'from-purple-500 to-purple-600' },
  { id: 'flight', label: 'Flights', icon: Plane, color: 'from-sky-500 to-sky-600' },
  { id: 'rent', label: 'Rent', icon: Home, color: 'from-emerald-500 to-emerald-600' },
  { id: 'tuition', label: 'Tuition', icon: GraduationCap, color: 'from-amber-500 to-amber-600' },
  { id: 'medical', label: 'Medical', icon: Stethoscope, color: 'from-rose-500 to-rose-600' },
]

const useCases = [
  {
    icon: Wrench,
    title: 'Plumbers & Home Services',
    description: 'Know if that $500 pipe repair quote is fair before you sign.',
    image: '/images/plumber.jpg',
    fallback: 'https://placehold.co/600x400/png',
  },
  {
    icon: Wifi,
    title: 'Internet Plans',
    description: 'Compare ISP pricing across cities. Stop overpaying for bandwidth.',
    image: '/images/internet.jpg',
    fallback: 'https://placehold.co/600x400/png',
  },
  {
    icon: Plane,
    title: 'Flights',
    description: 'Check if that flight deal is actually a deal or just marketing.',
    image: '/images/flight.jpg',
    fallback: 'https://placehold.co/600x400/png',
  },
  {
    icon: Home,
    title: 'Rent',
    description: 'See what others actually pay for similar apartments in your area.',
    image: '/images/rent.jpg',
    fallback: 'https://placehold.co/600x400/png',
  },
  {
    icon: GraduationCap,
    title: 'Tuition',
    description: 'Compare university costs globally. Education pricing varies wildly.',
    image: '/images/tuition.jpg',
    fallback: 'https://placehold.co/600x400/png',
  },
  {
    icon: Stethoscope,
    title: 'Medical Procedures',
    description: 'An MRI can cost $400 or $7,000. Know the fair price before your appointment.',
    image: '/images/medical.jpg',
    fallback: 'https://placehold.co/600x400/png',
  },
]

function getVerdict(price: number, data: PriceData): { label: string; color: string; bgColor: string; icon: typeof TrendingUp; detail: string } {
  const range = data.maxPrice - data.minPrice
  const lowerThreshold = data.avgPrice - range * 0.15
  const upperThreshold = data.avgPrice + range * 0.15

  if (price < lowerThreshold) {
    return {
      label: 'Underpriced',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-200',
      icon: TrendingDown,
      detail: `This is below the typical range. Great deal — or double-check the quality.`,
    }
  } else if (price > upperThreshold) {
    return {
      label: 'Overpriced',
      color: 'text-red-600',
      bgColor: 'bg-red-50 border-red-200',
      icon: TrendingUp,
      detail: `You're being charged above the normal range. Consider negotiating or shopping around.`,
    }
  } else {
    return {
      label: 'Fair Price',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      icon: Minus,
      detail: `This price falls within the normal range for this service in this location.`,
    }
  }
}

function getPercentile(price: number, data: PriceData): number {
  const sorted = [...data.recentPrices].sort((a, b) => a - b)
  const below = sorted.filter((p) => p <= price).length
  return Math.round((below / sorted.length) * 100)
}

function formatPrice(price: number, currency: string): string {
  return `${currency}${price.toLocaleString()}`
}

function ImageWithFallback({ src, fallback, alt, className }: { src: string; fallback: string; alt: string; className?: string }) {
  const [error, setError] = useState(false)
  return <img src={error ? fallback : src} alt={alt} className={className} onError={() => setError(true)} />
}

function App() {
  const [service, setService] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [results, setResults] = useState<PriceData | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [searchError, setSearchError] = useState('')
  const resultsRef = useRef<HTMLDivElement>(null)

  const uniqueServices = [...new Set(mockDatabase.filter((d) => !selectedCategory || d.category === selectedCategory).map((d) => d.service))]
  const uniqueLocations = [...new Set(mockDatabase.filter((d) => !service || d.service === service).map((d) => d.location))]

  const handleSearch = () => {
    setSearchError('')
    setShowResults(false)

    if (!service || !location || !price) {
      setSearchError('Please fill in all fields to check your price.')
      return
    }

    const match = mockDatabase.find(
      (d) => d.service === service && d.location === location
    )

    if (match) {
      setResults(match)
      setShowResults(true)
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } else {
      setSearchError('No data found for this combination. Try a different service or location.')
    }
  }

  const priceNum = parseFloat(price) || 0
  const verdict = results ? getVerdict(priceNum, results) : null
  const percentile = results ? getPercentile(priceNum, results) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                FairPrice
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                How it Works
              </a>
              <a href="#use-cases" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                Use Cases
              </a>
              <a href="#checker" className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all">
                Check Price
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-8">
              <Globe className="w-4 h-4" />
              Trusted by users in 50+ countries
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Are you being{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                ripped off?
              </span>
            </h1>

            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Enter any service, your city, and the price you were quoted. We'll tell you if it's fair — backed by real data from thousands of people worldwide.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#checker"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg hover:shadow-xl hover:shadow-indigo-500/25 transition-all flex items-center gap-2"
              >
                Check Your Price
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#how-it-works"
                className="px-8 py-4 rounded-full border-2 border-gray-300 text-gray-700 font-semibold text-lg hover:border-indigo-400 hover:text-indigo-600 transition-all"
              >
                How it Works
              </a>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">2.4M+</div>
                <div className="text-sm text-gray-500 mt-1">Price Reports</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">185+</div>
                <div className="text-sm text-gray-500 mt-1">Cities Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-500 mt-1">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              How it works
            </h2>
            <p className="mt-4 text-lg text-gray-600">Three simple steps to price transparency</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: Search,
                title: 'Enter your details',
                description: 'Tell us the service or product, your city or country, and the price you were quoted.',
              },
              {
                step: '02',
                icon: BarChart3,
                title: 'We crunch the data',
                description: 'We compare your price against thousands of real reports from people in your area.',
              },
              {
                step: '03',
                icon: CheckCircle,
                title: 'Get your verdict',
                description: 'See if your price is fair, overpriced, or underpriced — with the full breakdown.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all group"
              >
                <div className="text-6xl font-black text-gray-100 absolute top-4 right-6 group-hover:text-indigo-100 transition-colors">
                  {item.step}
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="checker" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Check your price
            </h2>
            <p className="mt-4 text-lg text-gray-600">Fill in the details below to see if you're getting a fair deal</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 sm:p-10">
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id === selectedCategory ? '' : cat.id)
                      setService('')
                      setLocation('')
                      setShowResults(false)
                    }}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                      selectedCategory === cat.id
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <cat.icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Search className="w-4 h-4 inline mr-1" />
                  Service or Product
                </label>
                <div className="relative">
                  <select
                    value={service}
                    onChange={(e) => {
                      setService(e.target.value)
                      setShowResults(false)
                    }}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-0 outline-none transition-colors appearance-none bg-white text-gray-900"
                  >
                    <option value="">Select a service...</option>
                    {uniqueServices.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  City / Country
                </label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value)
                      setShowResults(false)
                    }}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-0 outline-none transition-colors appearance-none bg-white text-gray-900"
                  >
                    <option value="">Select a location...</option>
                    {uniqueLocations.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Price Quoted
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value)
                  setShowResults(false)
                }}
                placeholder="Enter the price you were quoted"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-0 outline-none transition-colors text-gray-900"
              />
            </div>

            {searchError && (
              <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-700">{searchError}</p>
              </div>
            )}

            <button
              onClick={handleSearch}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg hover:shadow-xl hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Check My Price
            </button>
          </div>

          {showResults && results && verdict && (
            <div ref={resultsRef} className="mt-10 space-y-6">
              <div className={`p-8 rounded-3xl border-2 ${verdict.bgColor}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    verdict.label === 'Fair Price' ? 'bg-blue-100' : verdict.label === 'Overpriced' ? 'bg-red-100' : 'bg-emerald-100'
                  }`}>
                    {verdict.label === 'Fair Price' && <CheckCircle className="w-8 h-8 text-blue-600" />}
                    {verdict.label === 'Overpriced' && <XCircle className="w-8 h-8 text-red-600" />}
                    {verdict.label === 'Underpriced' && <CheckCircle className="w-8 h-8 text-emerald-600" />}
                  </div>
                  <div className="flex-1">
                    <div className={`text-3xl font-extrabold ${verdict.color}`}>
                      {verdict.label}
                    </div>
                    <p className="text-gray-700 mt-2 text-lg">{verdict.detail}</p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                  <div className="text-sm text-gray-500 mb-1">Your Price</div>
                  <div className="text-2xl font-bold text-gray-900">{formatPrice(priceNum, results.currency)}</div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                  <div className="text-sm text-gray-500 mb-1">Average Price</div>
                  <div className="text-2xl font-bold text-indigo-600">{formatPrice(results.avgPrice, results.currency)}</div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                  <div className="text-sm text-gray-500 mb-1">Normal Range</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(results.minPrice, results.currency)} - {formatPrice(results.maxPrice, results.currency)}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Price Distribution</h3>
                <div className="relative">
                  <div className="flex items-end gap-2" style={{ height: 180 }}>
                    {[...results.recentPrices]
                      .sort((a, b) => a - b)
                      .map((p, i) => {
                        const maxP = Math.max(...results.recentPrices)
                        const barHeight = Math.max(8, Math.round((p / maxP) * 140))
                        const isClose = Math.abs(p - priceNum) < (results.maxPrice - results.minPrice) * 0.1
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                            <span className="text-xs text-gray-500 mb-1">{formatPrice(p, results.currency)}</span>
                            <div
                              className={`w-full rounded-t-lg ${
                                isClose ? 'bg-indigo-500' : 'bg-gray-200'
                              }`}
                              style={{ height: barHeight }}
                            />
                          </div>
                        )
                      })}
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-indigo-500" />
                      <span className="text-xs text-gray-600">Close to your price</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-gray-200" />
                      <span className="text-xs text-gray-600">Other reported prices</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Detailed Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Percentile</span>
                    <span className="font-semibold text-gray-900">
                      Your price is higher than {percentile}% of reports
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Total Reports</span>
                    <span className="font-semibold text-gray-900 flex items-center gap-1">
                      <Users className="w-4 h-4 text-indigo-500" />
                      {results.reports.toLocaleString()} people reported
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Location</span>
                    <span className="font-semibold text-gray-900 flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-indigo-500" />
                      {results.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-600">Difference from Average</span>
                    <span className={`font-semibold ${priceNum > results.avgPrice ? 'text-red-600' : priceNum < results.avgPrice ? 'text-emerald-600' : 'text-gray-900'}`}>
                      {priceNum > results.avgPrice ? '+' : ''}{formatPrice(Math.abs(priceNum - results.avgPrice), results.currency)}
                      {priceNum > results.avgPrice ? ' above average' : priceNum < results.avgPrice ? ' below average' : ' (exactly average)'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6 flex items-start gap-3">
                <Info className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-indigo-700">
                  Prices are based on crowdsourced data from real users. Actual prices may vary based on
                  specific requirements, timing, and provider. Always get multiple quotes for expensive services.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="use-cases" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Works for everything
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              From plumbers to plane tickets — check any price, anywhere
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="group rounded-2xl overflow-hidden border border-gray-200 hover:border-indigo-200 hover:shadow-xl transition-all"
              >
                <div className="h-48 overflow-hidden relative">
                  <ImageWithFallback
                    src={uc.image}
                    fallback={uc.fallback}
                    alt={uc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-10 h-10 rounded-lg bg-white/90 backdrop-blur flex items-center justify-center">
                      <uc.icon className="w-5 h-5 text-indigo-600" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{uc.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{uc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Why price transparency matters
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                stat: '$4,200',
                description: 'Average annual savings when consumers know fair prices',
              },
              {
                stat: '73%',
                description: 'Of people have paid above market rate without knowing',
              },
              {
                stat: '10x',
                description: 'Price variation for the same medical procedure in the US',
              },
              {
                stat: '0',
                description: 'Industries that want you to have this information',
              },
            ].map((item) => (
              <div
                key={item.stat}
                className="p-8 rounded-2xl bg-white border border-gray-200 text-center hover:shadow-lg transition-all"
              >
                <div className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  {item.stat}
                </div>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Stop overpaying. Start checking.
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join millions of smart consumers who check prices before they pay. Knowledge is your best negotiating tool.
          </p>
          <a
            href="#checker"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-indigo-600 font-bold text-lg hover:shadow-2xl transition-all"
          >
            Check a Price Now
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">FairPrice</span>
              </div>
              <p className="text-sm leading-relaxed max-w-md">
                The global price fairness checker. We believe everyone deserves to know
                if they're paying a fair price — no matter where they live or what they're buying.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <a href="#checker" className="hover:text-indigo-400 transition-colors">
                      {cat.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#how-it-works" className="hover:text-indigo-400 transition-colors">How it Works</a></li>
                <li><a href="#use-cases" className="hover:text-indigo-400 transition-colors">Use Cases</a></li>
                <li><a href="#checker" className="hover:text-indigo-400 transition-colors">Price Checker</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>FairPrice Global Price Checker. Built for consumers, by consumers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
