# 🏗️ Crypto Hub Dashboard - Architecture Diagram

## 📐 Component Hierarchy

```
CryptoDashboardPage
│
├── ProtectedRoute (Auth Guard)
│   │
│   └── AppShell (Layout)
│       │
│       └── CryptoDashboardContent
│           │
│           ├── Header Section
│           │   ├── Icon + Title
│           │   └── Risk Warning Banner
│           │
│           ├── 1. CryptoSummary
│           │   └── 5 Stat Cards
│           │       ├── Total Exposure
│           │       ├── 24h Change
│           │       ├── Risk Level
│           │       ├── Market Sentiment
│           │       └── AI Confidence
│           │
│           ├── 2. MarketOverview
│           │   ├── 6 Market Metrics
│           │   └── AI Insight Box
│           │
│           ├── 3. HoldingsTable
│           │   └── Table (9 columns)
│           │       ├── Asset Info
│           │       ├── Price Data
│           │       ├── Change %
│           │       ├── Volatility Bar
│           │       ├── Risk Badge
│           │       ├── AI Signal Badge
│           │       ├── Confidence %
│           │       └── Action Buttons
│           │
│           ├── Grid (2 columns)
│           │   ├── 4. PerformanceChart
│           │   │   ├── Chart Header
│           │   │   ├── Timeframe Tabs
│           │   │   ├── AreaChart (Recharts)
│           │   │   └── Asset Toggle (BTC/ETH)
│           │   │
│           │   └── 5. MLPrediction
│           │       ├── Current Price
│           │       ├── 1-Day Forecast
│           │       ├── 7-Day Forecast
│           │       ├── Trend Indicator
│           │       ├── Model Info
│           │       └── Disclaimer
│           │
│           ├── Grid (2 columns)
│           │   ├── 6. RiskPanel
│           │   │   ├── 4 Risk Factors
│           │   │   │   ├── Regulatory
│           │   │   │   ├── Volatility
│           │   │   │   ├── Liquidity
│           │   │   │   └── Technology
│           │   │   └── Warning Banner
│           │   │
│           │   └── 7. ExplainableAI
│           │       ├── Prediction Summary
│           │       ├── 4 Influencing Factors
│           │       │   ├── Momentum
│           │       │   ├── Volume
│           │       │   ├── BTC Dominance
│           │       │   └── Sentiment
│           │       └── Plain English Box
│           │
│           ├── 8. PortfolioSimulator
│           │   ├── Input Section
│           │   │   ├── Amount Input
│           │   │   ├── Simulate Button
│           │   │   └── Disclaimer
│           │   └── Results Section
│           │       ├── Allocation Change
│           │       ├── Risk Change
│           │       └── Expected Return
│           │
│           └── 9. NewsPanel
│               └── 4 News Cards
│                   ├── Category Badge
│                   ├── Timestamp
│                   ├── Title
│                   └── Impact Badge
```

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                    USER BROWSER                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              NEXT.JS FRONTEND                            │
│  ┌───────────────────────────────────────────────────┐  │
│  │  /crypto/dashboard (Route)                        │  │
│  │  ├── ProtectedRoute (Auth Check)                  │  │
│  │  └── CryptoDashboardContent                       │  │
│  └───────────────────┬───────────────────────────────┘  │
│                      │                                   │
│  ┌───────────────────▼───────────────────────────────┐  │
│  │  Component State (useState)                       │  │
│  │  ├── timeframe                                    │  │
│  │  ├── selectedAsset                                │  │
│  │  ├── amount                                       │  │
│  │  └── simulated                                    │  │
│  └───────────────────┬───────────────────────────────┘  │
└────────────────────┬─┴───────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              BACKEND API (Spring Boot)                   │
│  ┌───────────────────────────────────────────────────┐  │
│  │  /api/crypto/holdings                             │  │
│  │  /api/crypto/market                               │  │
│  │  /api/ml/crypto/predict                           │  │
│  │  /api/crypto/news                                 │  │
│  │  /api/crypto/sentiment                            │  │
│  └───────────────────┬───────────────────────────────┘  │
└────────────────────┬─┴───────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              ML SERVICE (Python)                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │  LSTM Model                                       │  │
│  │  XGBoost Model                                    │  │
│  │  Ensemble Predictions                             │  │
│  │  Technical Analysis                               │  │
│  │  Sentiment Analysis                               │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## 🎨 Design System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  DESIGN TOKENS                           │
├─────────────────────────────────────────────────────────┤
│  Colors                                                  │
│  ├── Primary: Orange-500 → Rose-500                     │
│  ├── Success: Emerald-600                               │
│  ├── Warning: Amber-600                                 │
│  ├── Danger: Rose-600                                   │
│  ├── AI/ML: Purple-600                                  │
│  └── Info: Blue-600                                     │
│                                                          │
│  Typography                                              │
│  ├── Headings: Font-bold, tracking-tight               │
│  ├── Stats: Tabular-nums                                │
│  ├── Labels: Uppercase, tracking-wider                  │
│  └── Body: Font-medium                                  │
│                                                          │
│  Spacing                                                 │
│  ├── xs: 4px                                            │
│  ├── sm: 8px                                            │
│  ├── md: 16px                                           │
│  ├── lg: 24px                                           │
│  └── xl: 32px                                           │
│                                                          │
│  Effects                                                 │
│  ├── Glass-morphism: backdrop-blur + transparency       │
│  ├── Gradients: Linear gradients for backgrounds        │
│  ├── Shadows: Layered shadows for depth                 │
│  └── Animations: Framer Motion variants                 │
└─────────────────────────────────────────────────────────┘
```

## 📊 State Management

```
┌─────────────────────────────────────────────────────────┐
│              COMPONENT STATE                             │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  PerformanceChart                                        │
│  ├── timeframe: "7d" | "30d" | "90d"                   │
│  └── selectedAsset: "BTC" | "ETH"                       │
│                                                          │
│  PortfolioSimulator                                      │
│  ├── amount: string                                     │
│  └── simulated: boolean                                 │
│                                                          │
│  (Other components use static data for now)             │
│                                                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│              FUTURE STATE (SWR/React Query)              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  useCryptoHoldings()                                     │
│  ├── data: CryptoHolding[]                              │
│  ├── isLoading: boolean                                 │
│  └── error: Error | null                                │
│                                                          │
│  useMarketData()                                         │
│  ├── data: MarketOverview                               │
│  ├── isLoading: boolean                                 │
│  └── error: Error | null                                │
│                                                          │
│  usePredictions(symbol)                                  │
│  ├── data: PredictionData                               │
│  ├── isLoading: boolean                                 │
│  └── error: Error | null                                │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 🔐 Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│              SECURITY LAYERS                             │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. Authentication                                       │
│     └── ProtectedRoute wrapper                          │
│         ├── JWT token validation                        │
│         ├── Session check                               │
│         └── Redirect to login if unauthorized           │
│                                                          │
│  2. Authorization                                        │
│     └── Role-based access (future)                      │
│         ├── Premium features                            │
│         └── Data access levels                          │
│                                                          │
│  3. Data Protection                                      │
│     ├── HTTPS only                                      │
│     ├── No sensitive data in URLs                       │
│     ├── Encrypted API calls                             │
│     └── No PII exposure                                 │
│                                                          │
│  4. Compliance                                           │
│     ├── Risk warnings always visible                    │
│     ├── Disclaimers on predictions                      │
│     ├── No trading/execution language                   │
│     └── Educational purpose emphasis                    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 📱 Responsive Architecture

```