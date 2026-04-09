# 🦎 CoinGecko API Integration - Crypto Hub (हिंदी)

## ✅ Integration पूरा हो गया

Crypto Hub को successfully **CoinGecko API** के साथ update कर दिया गया है जो live cryptocurrency data provide करता है।

## 🔄 क्या बदला

### Backend (ML Service)
- ✅ `ml-service/coingecko_service.py` बनाया - नया CoinGecko API service
- ✅ `ml-service/main.py` update किया - CoinMarketCap को CoinGecko से replace किया
- ✅ सभी crypto endpoints अब CoinGecko Free API use करते हैं (API key की जरूरत नहीं)

### Frontend
- ✅ `frontend/lib/useCryptoData.ts` update किया - Comments और error messages
- ✅ `frontend/components/crypto/MarketOverview.tsx` update किया - CoinGecko branding
- ✅ `frontend/components/crypto/HoldingsTable.tsx` update किया - CoinGecko branding

## 📊 Available Endpoints

सभी endpoints same रहे, सिर्फ data source बदला:

### 1. Crypto Listings
```
GET /crypto/listings?limit=20&convert=USD&sort=market_cap_desc
```
Top cryptocurrencies के साथ live prices, market cap, volume, और 24h/7d changes return करता है।

### 2. Crypto Quotes
```
GET /crypto/quotes?symbols=BTC,ETH,SOL&convert=USD
```
Specific crypto symbols के लिए real-time quotes मिलते हैं।

### 3. Global Metrics
```
GET /crypto/global?convert=USD
```
Global market data return करता है:
- Total market cap
- 24h volume
- BTC/ETH dominance
- Active cryptocurrencies
- Market cap change 24h

### 4. Fear & Greed Index
```
GET /crypto/fear-greed
```
Alternative.me API से crypto Fear & Greed index return करता है।

### 5. Trending Coins
```
GET /crypto/trending?limit=10
```
CoinGecko से trending cryptocurrencies मिलती हैं।

### 6. Crypto Info
```
GET /crypto/info?symbols=BTC,ETH
```
Specific cryptocurrencies के बारे में detailed information मिलती है।

## 🎯 मुख्य Features

### ✅ API Key की जरूरत नहीं
CoinGecko Free API को basic endpoints के लिए authentication की जरूरत नहीं।

### ✅ Live Data
- Real-time price updates
- Market cap और volume data
- 1h, 24h, और 7d price changes
- Global market metrics

### ✅ Caching
API calls कम करने के लिए built-in caching system:
- Listings: 60 seconds
- Quotes: 60 seconds
- Global metrics: 120 seconds

### ✅ INR Support
Automatic USD to INR conversion (₹83.5 per USD)।

## 🔧 Supported Cryptocurrencies

Service में popular cryptocurrencies के लिए mapping है:
- BTC (Bitcoin)
- ETH (Ethereum)
- SOL (Solana)
- MATIC (Polygon)
- BNB (Binance Coin)
- XRP (Ripple)
- ADA (Cardano)
- DOGE (Dogecoin)
- DOT (Polkadot)
- AVAX (Avalanche)
- LINK (Chainlink)
- UNI (Uniswap)
- ATOM (Cosmos)
- LTC (Litecoin)
- BCH (Bitcoin Cash)

## 🚀 कैसे Use करें

### ML Service Start करें
```bash
cd ml-service
python main.py
```

Service `http://localhost:8000` पर run होगी।

### Frontend Integration
Frontend automatically ML service से data fetch करता है:

```typescript
import { useCryptoListings, useCryptoGlobal, useCryptoQuotes } from "@/lib/useCryptoData"

// Top 50 cryptocurrencies पाएं
const { coins, loading, refresh } = useCryptoListings(50)

// Global market metrics पाएं
const { market, fearGreed, loading } = useCryptoGlobal()

// Specific quotes पाएं
const { quotes, loading } = useCryptoQuotes(["BTC", "ETH", "SOL"])
```

## 📱 Updated Components

### 1. Market Overview
- INR में live BTC/ETH prices दिखाता है
- Global market cap और volume display करता है
- BTC dominance percentage दिखाता है
- Fear & Greed index
- AI-powered market insights

### 2. Holdings Table
- Watchlist coins के लिए live prices
- 24h और 7d price changes
- Market cap और volume
- AI signals और confidence scores
- Risk assessment

### 3. Crypto Summary
- Total exposure
- 24h trajectory
- Volatility index
- Neural sentiment
- AI reliability score

## 🔒 Rate Limits

CoinGecko Free API limits:
- 10-30 calls/minute (endpoint के हिसाब से vary करता है)
- Built-in caching API calls कम करती है
- Listings/quotes के लिए हर 60 seconds में auto-refresh
- Global metrics के लिए हर 120 seconds में auto-refresh

## 🎨 UI Updates

सभी components अब दिखाते हैं:
- ✅ "Live · CoinGecko" badge
- ✅ AI insights में "Powered by CoinGecko"
- ✅ Real-time data indicators
- ✅ Spinners के साथ loading states

## 🔄 Migration Notes

### CoinMarketCap से CoinGecko में:
1. ✅ API key की जरूरत नहीं (CMC_API_KEY remove किया)
2. ✅ सभी endpoints compatible रहे
3. ✅ Data structure unchanged
4. ✅ Frontend components बिना changes के काम करते हैं
5. ✅ Free tier पर better rate limits

## 🧪 Testing

Integration test करें:

```bash
# Listings endpoint test करें
curl http://localhost:8000/crypto/listings?limit=10

# Quotes endpoint test करें
curl http://localhost:8000/crypto/quotes?symbols=BTC,ETH

# Global metrics test करें
curl http://localhost:8000/crypto/global

# Fear & greed test करें
curl http://localhost:8000/crypto/fear-greed

# Trending test करें
curl http://localhost:8000/crypto/trending?limit=5
```

या Python test script चलाएं:
```bash
cd ml-service
python test_coingecko.py
```

## 📝 Environment Variables

कोई environment variables की जरूरत नहीं! CoinGecko Free API out of the box काम करता है।

Optional (future Pro API upgrade के लिए):
```bash
COINGECKO_API_KEY=your_api_key_here  # Pro tier के लिए
```

## 🎯 अगले Steps

Integration को और enhance करने के लिए:

1. **और coins add करें** - `coingecko_service.py` में symbol_to_id mapping extend करें
2. **Historical data** - Price history charts के लिए endpoints add करें
3. **Price alerts** - Price alert notifications implement करें
4. **Portfolio tracking** - User portfolio management add करें
5. **Advanced charts** - TradingView या custom charts integrate करें

## 🌟 CoinGecko के फायदे

✅ अच्छी rate limits के साथ free tier
✅ Basic features के लिए API key की जरूरत नहीं
✅ Comprehensive cryptocurrency data
✅ Active community और support
✅ Regular updates और new features
✅ Reliable uptime और performance

## 📚 Documentation

- [CoinGecko API Docs](https://www.coingecko.com/en/api/documentation)
- [Alternative.me Fear & Greed](https://alternative.me/crypto/fear-and-greed-index/)

## 🎉 Summary

Crypto Hub अब **CoinGecko API** के साथ fully integrated है और live cryptocurrency data provide करता है। सभी 9 sections (Summary, Market Overview, Holdings Table, Performance Chart, ML Prediction, Risk Panel, Explainable AI, Portfolio Simulator, News Panel) अब real-time data के साथ काम करते हैं।

### क्या मिला:
- ✅ Free API (no API key needed)
- ✅ Live prices और market data
- ✅ INR conversion support
- ✅ Fear & Greed index
- ✅ Trending coins
- ✅ Global market metrics
- ✅ Better rate limits
- ✅ Reliable और fast data

---

**Status**: ✅ Production Ready
**Last Updated**: January 2026
**API Provider**: CoinGecko Free API
**Language**: हिंदी + English
