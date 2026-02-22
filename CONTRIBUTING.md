# Contributing to FairPrice

Thanks for your interest in contributing! This guide covers everything you need to get started.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/InnocentXero-price-fairness-checker.git`
3. Install dependencies: `npm install`
4. Start the dev server: `npm run dev`
5. Create a feature branch: `git checkout -b feature/your-feature`

## Development

### Prerequisites

- Node.js 20+
- npm 9+

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type check + production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run preview` | Preview production build |

### Project Structure

```
src/
  __tests__/       # Test files
  components/      # React components
  test/            # Test setup
  api.ts           # Backend API client
  data.ts          # Product data, countries, calculations
  types.ts         # TypeScript interfaces
  utils.ts         # Utility functions
  App.tsx          # Root component
  main.tsx         # Entry point
```

## Code Style

- TypeScript strict mode enabled
- ESLint with React Hooks and React Refresh plugins
- Tailwind CSS for styling
- Functional components with hooks
- Named exports for components

## Pull Request Process

1. Ensure your code passes all checks: `npm run lint && npm test && npm run build`
2. Write tests for new functionality
3. Keep PRs focused — one feature or fix per PR
4. Write a clear PR description explaining the change
5. Reference any related issues

## Testing

We use Vitest with React Testing Library. Tests live in `src/__tests__/`.

- Unit tests for utility functions and data logic
- Component tests for user interactions
- Run `npm test` before submitting a PR

### Writing Tests

```typescript
import { describe, it, expect } from 'vitest'

describe('myFunction', () => {
  it('does what it should', () => {
    expect(myFunction('input')).toBe('expected')
  })
})
```

## Reporting Issues

- Use GitHub Issues
- Include steps to reproduce
- Include browser and OS information
- Screenshots help for UI issues

## Adding Products

To add new products to the catalog, add entries to the products array in `src/data.ts` following the existing `Product` interface. Each product needs prices for all supported countries.

## License

By contributing, you agree that your contributions will be licensed under the project's license.
