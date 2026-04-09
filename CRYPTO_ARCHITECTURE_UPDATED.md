# 🏗️ Crypto Hub Architecture - CoinGecko Integration

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                    http://localhost:3000                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP Requests
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS FRONTEND                              │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  /crypto/dashboard (Route)                              │   │
│  │                                                           │   │
│  │  Components:                                             │   │
│  │  ├── CryptoDashboard.tsx (Main Container)               │   │
│  │  ├── CryptoSummary.tsx (5 Metrics)                      │   │
│  │  ├── MarketOverview.tsx (Global Data) 🆕 CoinGecko     │   │
│  │  ├── HoldingsTable.tsx (Watchlist) 🆕 CoinGecko        │   │
│  │  ├── PerformanceChart.tsx (Charts)                      │   │
│  │  ├── MLPrediction.tsx (AI Predictions)                  │   │
│  │  ├── RiskPanel.tsx (Risk Assessment)                    │   │
│  │  ├── ExplainableAI.tsx (AI Insights)                    │   │
│  │  ├── PortfolioSimulator.tsx (Simulator)                 │   │
│  │  └── NewsPanel.tsx (News Feed)                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Custom Hooks (lib/useCryptoData.ts) 🆕 Updated         │   │
│  │                                                           │   │
│  │  ├── useCryptoListings() - Top N coins                  │   │
│  │  ├── useCryptoQuotes() - Specific symbols               │   │
│  │  ├── useCryptoGlobal() - Global metrics                 │   │
│  │  ├── useCryptoTrending() - Trending coins               │   │
│  │  └── useForexRates() - Currency rates                   │   │
│  └─────────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ Fetch API Calls
                             │ http://localhost:8000
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ML SERVICE (FastAPI)                          │
│                    http://localhost:8000                         │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  API Endpoints (main.py) 🆕 Updated                     │   │
│  │                                                           │   │
│  │  ├── GET /crypto/listings                               │   │
│  │  ├── GET /crypto/quotes                                 │   │
│  │  ├── GET /crypto/global                                 │   │
│  │  ├── GET /crypto/fear-greed                             │   │
│  │  ├── GET /crypto/trending                               │   │
│  │  └── GET /crypto/info                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  CoinGecko Service 🆕 NEW                               │   │
│  │  (coingecko_service.py)                                  │   │
│  │                                                           │   │
│  │  Features:                                               │   │
│  │  ├── Built-in caching (60-120s TTL)                     │   │
│  │  ├── Symbol to ID mapping                               │   │
│  │  ├── USD to INR conversion                              │   │
│  │  ├── Error handling & retries                           │   │
│  │  └── No API key required                                │   │
│  └─────────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTPS Requests
                             │ (No API Key Required)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL APIs                                 │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  CoinGecko API 🆕 NEW                                    │  │
│  │  https://api.coingecko.com/api/v3                        │  │
│  │                                                            │  │
│  │  Endpoints Used:                                          │  │
│  │  ├── /coins/markets (Listings & Quotes)                  │  │
│  │  ├── /global (Global Metrics)                            │  │
│  │  ├── /search/trending (Trending Coins)                   │  │
│  │  └── /coins/{id} (Detailed Info)                         │  │
│  │                                                            │  │
│  │  Rate Limits: 10-30 calls/minute (Free tier)            │  │
│  │  API Key: Not required ✅                                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Alternative.me API                                       │  │
│  │  https://api.alternative.me/fng/                          │  │
│  │                                                            │  │
│  │  Used For:                                                │  │
│  │  └── Fear & Greed Index                                  │  │
│  │                                                            │  │
│  │  Rate Limits: Unlimited (Free)                           │  │
│  │  API Key: Not required ✅                                │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### 1. User Opens Dashboard
```
User → Browser → /crypto/dashboard → React Components Load
```

### 2. Components Fetch Data
```
Components → Custom Hooks → ML Service API → CoinGecko API
```

### 3. Data Processing
```
CoinGecko Response → ML Service Processing → Cache → Frontend
```

### 4. Display & Update
```
Frontend → Render Data → Auto-refresh (60s) → Repeat
```

## 📊 Data Flow Diagram

```
┌──────────────┐
│   Browser    │
│  Dashboard   │
└──────┬───────┘
       │
       │ 1. Component Mount
       ▼
┌──────────────────────┐
│  useCryptoListings() │
│  useCryptoGlobal()   │
│  useCryptoQuotes()   │
└──────┬───────────────┘
       │
       │ 2. Fetch Request
       ▼
┌──────────────────────┐
│   ML Service API     │
│  /crypto/listings    │
│  /crypto/global      │
│  /crypto/quotes      │
└──────┬───────────────┘
       │
       │ 3. Check Cache
       ▼
┌──────────────────────┐
│  CoinGecko Service   │
│  Cache (60-120s)     │
└──────┬───────────────┘
       │
       │ 4. If Cache Miss
       ▼
┌──────────────────────┐
│   CoinGecko API      │
│  api.coingecko.com   │
└──────┬───────────────┘
       │
       │ 5. Response
       ▼
┌──────────────────────┐
│  Process & Format    │
│  USD → INR           │
│  Symbol Mapping      │
└──────┬───────────────┘
       │
       │ 6. Return JSON
       ▼
┌──────────────────────┐
│  Frontend Display    │
│  Live Data Badge     │
│  Auto-refresh        │
└──────────────────────┘
```

## 🎯 Component Hierarchy

```
CryptoDashboardContent
│
├── CryptoSummary
│   ├── Exposure Alpha Card
│   ├── 24h Trajectory Card
│   ├── Volatility Bias Card
│   ├── Neural Sentiment Card
│   └── AI Reliability Card
│
├── MarketOverview 🆕 CoinGecko
│   ├── BTC Dominance
│   ├── BTC Price (INR)
│   ├── ETH Price (INR)
│   ├── Total Market Cap
│   ├── 24h Volume
│   ├── Fear & Greed Index
│   └── AI Market Intelligence
│
├── HoldingsTable 🆕 CoinGecko
│   ├── BTC Row (Live Price)
│   ├── ETH Row (Live Price)
│   ├── SOL Row (Live Price)
│   ├── MATIC Row (Live Price)
│   ├── BNB Row (Live Price)
│   └── XRP Row (Live Price)
│
├── PerformanceChart
│   ├── BTC Chart
│   ├── ETH Chart
│   └── Timeframe Selector
│
├── MLPrediction
│   ├── Price Predictions
│   └── Confidence Scores
│
├── RiskPanel
│   ├── Volatility Analysis
│   └── Risk Scores
│
├── ExplainableAI
│   ├── Bullish/Bearish Reasons
│   └── Model Explanations
│
├── PortfolioSimulator
│   ├── What-if Scenarios
│   └── Impact Analysis
│
└── NewsPanel
    ├── Latest News
    └── Impact Assessment
```

## 🔧 Technology Stack

### Frontend
- **Framework**: Next.js 14 (React)
- **UI Library**: shadcn/ui + Tailwind CSS
- **Charts**: Recharts
- **Animations**: Framer Motion
- **State**: React Hooks (useState, useEffect)

### Backend
- **Framework**: FastAPI (Python)
- **HTTP Client**: requests
- **Caching**: In-memory (dict)
- **API**: CoinGecko Free API

### External APIs
- **CoinGecko**: Cryptocurrency data
- **Alternative.me**: Fear & Greed index

## 📈 Performance Optimizations

### Caching Strategy
```
Listings Cache: 60 seconds
Quotes Cache: 60 seconds
Global Metrics Cache: 120 seconds
Fear & Greed Cache: 120 seconds
```

### Auto-refresh
```
Frontend Refresh: Every 60 seconds
Backend Cache: Reduces API calls
Rate Limit Safe: 10-30 calls/minute
```

### Data Processing
```
Symbol Mapping: Pre-defined dictionary
USD to INR: Constant conversion (₹83.5)
Error Handling: Graceful fallbacks
```

## 🔒 Security Features

- ✅ No API keys exposed to frontend
- ✅ CORS enabled for specific origins
- ✅ Rate limiting via caching
- ✅ Error handling and validation
- ✅ HTTPS for external API calls

## 🎨 UI/UX Features

- ✅ Real-time data indicators
- ✅ Loading states with spinners
- ✅ Error messages
- ✅ Auto-refresh
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Smooth animations
- ✅ Interactive charts

## 📊 Data Updates

### Automatic Updates
- Prices: Every 60 seconds
- Global metrics: Every 120 seconds
- On component mount
- On manual refresh

### Manual Updates
- Refresh button in Holdings Table
- Page reload
- Component remount

## 🚀 Deployment Ready

- ✅ Production-ready code
- ✅ Error handling
- ✅ Caching implemented
- ✅ No API key required
- ✅ Documentation complete
- ✅ Test script included

---

**Architecture Status**: ✅ Complete
**Last Updated**: January 2026
**API Provider**: CoinGecko Free API
