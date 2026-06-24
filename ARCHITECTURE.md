# Architecture

## Frontend Architecture

Alpha Radar is a Next.js 15 App Router application organized around route-level pages and reusable product components.

- `src/app` owns routing, layouts, metadata, and page composition.
- `src/components/cards` contains reusable intelligence widgets.
- `src/components/layout` contains the dashboard shell, topbar, sidebar, and section headings.
- `src/components/common` contains visualizations and state components.
- `src/components/ui` contains shadcn/ui-style primitives.
- `src/services` is the boundary between UI and data.
- `src/types` defines domain contracts.

The app is dark mode by default and optimized for mobile-first responsive layouts.

## Data Flow

The current build uses deterministic mock data:

1. Pages call hooks or service methods.
2. `src/services/alpha-service.ts` delegates to `src/services/mock-data.ts`.
3. React Query caches dashboard data on client routes.
4. Components receive typed props and render cards, tables, timelines, and chat messages.

Production integrations can replace the mock service without rewriting pages.

## State Management

State is intentionally split:

- React Query handles async server-style data and cache refresh.
- Zustand handles lightweight client UI state such as sidebar visibility and selected conversation.
- Local React state handles short-lived form and chat streaming simulation state.

## API Integration Strategy

The service layer should evolve into adapters for:

- Bitget market data
- Exchange order books and funding
- On-chain wallet and reserve tracking
- Token unlock calendars
- Sentiment and news clustering
- AI reasoning and response streaming

Each adapter should normalize data into the contracts in `src/types` before it reaches UI components.

## AI Reasoning Pipeline

The product model assumes this pipeline:

1. Ingest raw signals from market, on-chain, whale, unlock, sentiment, and news sources.
2. Normalize each signal into a shared event schema.
3. Cluster related signals by asset, catalyst, timing, and directional bias.
4. Score urgency, confidence, market relevance, and impact window.
5. Generate a concise explanation with supporting signals and invalidation criteria.
6. Store the result as a Radar Event for dashboards, alerts, detail pages, and Ask Alpha.

The frontend currently visualizes this pipeline with typed mock data.
