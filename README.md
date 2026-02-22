# FairPrice - Global Price Fairness Checker

A global price transparency platform that helps consumers understand if they're paying a fair price for products and services. Compare prices across 30+ countries with PPP adjustments, income-based analysis, and cost-of-living insights.

**Live site:** [https://price-fairness-checker-app-iqrmfu65.devinapps.com](https://price-fairness-checker-app-iqrmfu65.devinapps.com)

## Features

- **2,250+ products** across 6 categories (Digital, Physical, SaaS, Essentials, Services, Medical)
- **30 countries** with PPP factors, median incomes, and exchange rates
- **Multiple fairness lenses** — Raw price, PPP-adjusted, income-relative, cost-of-living
- **Your Price comparison** — Enter what you paid and see how it stacks up globally
- **Trend charts** — 12-month price trend visualization
- **Hours of work metric** — How long you'd work to afford each product
- **Confidence intervals** — Statistical range with volatility indicators
- **Nearby markets** — Compare with neighboring countries
- **Brand fairness index** — Rank brands by pricing fairness across markets
- **Global Compare** — Side-by-side country comparisons
- **Community submissions** — Crowdsourced price data with gamification
- **Provider directory** — Rate and review service providers
- **Quiz mode** — Test your pricing knowledge
- **User accounts** — Sign up, save products, set price alerts

## Tech Stack

### Frontend
- React 18 + TypeScript (strict mode)
- Vite 6 build tool
- Tailwind CSS for styling
- Recharts for data visualization
- Lucide React for icons

### Backend
- FastAPI (Python)
- SQLite database
- Deployed on Fly.io

### Testing
- Vitest test runner
- React Testing Library
- jest-dom matchers

### CI/CD
- GitHub Actions (build, lint, type check, test on every push/PR)

## Getting Started

### Prerequisites
- Node.js 20+
- npm 9+

### Installation

```bash
git clone https://github.com/InnocentZia/InnocentXero-price-fairness-checker.git
cd InnocentXero-price-fairness-checker
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type check + production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run preview` | Preview production build |

## Testing

Tests are in `src/__tests__/` and use Vitest with React Testing Library.

```bash
npm test            # Run all tests
npm run test:watch  # Watch mode
```

Current test coverage:
- Utility functions (formatUSD, fuzzyMatch, removeIQROutliers)
- Data integrity (countries, products, categories)
- Fairness calculation engine

## Project Structure

```
src/
  __tests__/              # Test files
    utils.test.ts         # Utility function tests
    data.test.ts          # Data integrity + calculation tests
  components/
    AuthModal.tsx         # Login/signup modal
    BrandIndex.tsx        # Brand fairness rankings
    Community.tsx         # Community submissions + gamification
    Dashboard.tsx         # User dashboard (saved products, alerts)
    FairnessBar.tsx       # Visual fairness score bar
    GlobalCompare.tsx     # Country comparison tool
    HomePage.tsx          # Landing page
    Leaderboard.tsx       # Contributor leaderboard
    Methodology.tsx       # Scoring methodology explanation
    PriceChecker.tsx      # Main price checking tool
    ProviderDirectory.tsx # Provider ratings/reviews
    Quiz.tsx              # Price guessing quiz
    ScoreGauge.tsx        # Circular score gauge
    VsWorld.tsx           # Your country vs world view
  test/
    setup.ts              # Test setup (jest-dom)
  api.ts                  # Backend API client
  data.ts                 # Products, countries, calculations
  types.ts                # TypeScript interfaces
  utils.ts                # Utility functions
  App.tsx                 # Root component with lazy loading
  main.tsx                # Entry point
.github/
  workflows/
    ci.yml                # GitHub Actions CI pipeline
```

## Accessibility

- Skip-to-content link for keyboard navigation
- ARIA labels on navigation, main content, and footer
- `aria-current="page"` on active nav items
- Focus-visible ring styles on all interactive elements
- Semantic HTML (nav, main, footer, headings)
- Color contrast compliant text

## Performance

- **Lazy loading** — Secondary tabs (Compare, Quiz, Leaderboard, etc.) are code-split with React.lazy
- **Suspense fallback** — Loading spinner while lazy components load
- **Memoized calculations** — useCallback/useMemo for expensive operations
- **Paginated dropdowns** — Product lists load 50 items at a time with infinite scroll
- **Fuzzy search** — Efficient client-side filtering with scored matching

## Security

- Input sanitization on all user inputs (price values, search queries)
- JWT-based authentication
- No secrets in client-side code
- API URL configured via environment variables
- Legal disclaimers on all price data

## Backend API

Base URL: `https://app-rcanrkba.fly.dev`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | List products (search, category, pagination) |
| `/api/products` | POST | Add a new product |
| `/api/countries` | GET | List all countries |
| `/api/fairness/{product_id}/{country_code}` | GET | Fairness calculation |
| `/api/stats` | GET | Database statistics |
| `/api/auth/register` | POST | Create account |
| `/api/auth/login` | POST | Login |
| `/api/auth/me` | GET | Current user info |
| `/api/saved-products` | GET/POST/DELETE | Manage saved products |
| `/api/price-alerts` | GET/POST/DELETE | Manage price alerts |

## Roadmap

### Near-term
- Real-time price data integrations (API feeds)
- Enhanced price submission verification
- PDF/CSV export for reports
- More countries and product categories

### Medium-term
- Mobile apps (iOS/Android)
- ML-powered price predictions
- Multi-language support (i18n)
- Advanced analytics dashboard

### Long-term
- Public API for third-party integrations
- Government/regulatory data partnerships
- Real-time price alerts via email/push
- Become the global standard for price transparency

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT
