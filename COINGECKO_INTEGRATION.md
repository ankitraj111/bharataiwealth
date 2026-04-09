# 🦎 CoinGecko API Integration - Crypto Hub

## ✅ Integration Complete

The Crypto Hub has been successfully updated to use **CoinGecko API** for live cryptocurrency data.

## 🔄 What Changed

### Backend (ML Service)
- ✅ Created `ml-service/coingecko_service.py` - New CoinGecko API service
- ✅ Updated `ml-service/main.py` - Replaced CoinMarketCap with CoinGecko endpoints
- ✅ All crypto endpoints now use CoinGecko Free API (no API key required)

### Frontend
- ✅ Updated `frontend/lib/useCryptoData.ts` - Updated comments and error messages
- ✅ Updated `frontend/components/crypto/MarketOverview.tsx` - CoinGecko branding
- ✅ Updated `frontend/components/crypto/HoldingsTable.tsx` - CoinGecko branding

## 📊 Available Endpoints

All endpoints remain the same, only the data source changed:

### 1. Crypto Listings
```
GET /crypto/listings?limit=20&convert=USD&sort=market_cap_desc
```
Returns top cryptocurrencies with live prices, market cap, volume, and 24h/7d changes.

### 2. Crypto Quotes
```
GET /crypto/quotes?symbols=BTC,ETH,SOL&convert=USD
```
Get real-time quotes for specific crypto symbols.

### 3. Global Metrics
```
GET /crypto/global?convert=USD
```
Returns global market data including:
- Total market cap
- 24h volume
- BTC/ETH dominance
- Active cryptocurrencies
- Market cap change 24h

### 4. Fear & Greed Index
```
GET /crypto/fear-greed
```
Returns crypto Fear & Greed index from Alternative.me API.

### 5. Trending Coins
```
GET /crypto/trending?limit=10
```
Get trending cryptocurrencies from CoinGecko.

### 6. Crypto Info
```
GET /crypto/info?symbols=BTC,ETH
```
Get detailed information about specific cryptocurrencies.

## 🎯 Key Features

### ✅ No API Key Required
CoinGecko Free API doesn't require authentication for basic endpoints.

### ✅ Live Data
- Real-time price updates
- Market cap and volume data
- 1h, 24h, and 7d price changes
- Global market metrics

### ✅ Caching
Built-in caching system to reduce API calls:
- Listings: 60 seconds
- Quotes: 60 seconds
- Global metrics: 120 seconds

### ✅ INR Support
Automatic USD to INR conversion (₹83.5 per USD).

## 🔧 Supported Cryptocurrencies

The service includes mapping for popular cryptocurrencies:
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

## 🚀 How to Use

### Start ML Service
```bash
cd ml-service
python main.py
```

The service will run on `http://localhost:8000`

### Frontend Integration
The frontend automatically fetches data from the ML service:

```typescript
import { useCryptoListings, useCryptoGlobal, useCryptoQuotes } from "@/lib/useCryptoData"

// Get top 50 cryptocurrencies
const { coins, loading, refresh } = useCryptoListings(50)

// Get global market metrics
const { market, fearGreed, loading } = useCryptoGlobal()

// Get specific quotes
const { quotes, loading } = useCryptoQuotes(["BTC", "ETH", "SOL"])
```

## 📱 Updated Components

### 1. Market Overview
- Shows live BTC/ETH prices in INR
- Displays global market cap and volume
- Shows BTC dominance percentage
- Fear & Greed index
- AI-powered market insights

### 2. Holdings Table
- Live prices for watchlist coins
- 24h and 7d price changes
- Market cap and volume
- AI signals and confidence scores
- Risk assessment

### 3. Crypto Summary
- Total exposure
- 24h trajectory
- Volatility index
- Neural sentiment
- AI reliability score

## 🔒 Rate Limits

CoinGecko Free API limits:
- 10-30 calls/minute (varies by endpoint)
- Built-in caching reduces API calls
- Auto-refresh every 60 seconds for listings/quotes
- Auto-refresh every 120 seconds for global metrics

## 🎨 UI Updates

All components now show:
- ✅ "Live · CoinGecko" badge
- ✅ "Powered by CoinGecko" in AI insights
- ✅ Real-time data indicators
- ✅ Loading states with spinners

## 🔄 Migration Notes

### From CoinMarketCap to CoinGecko:
1. ✅ No API key required (removed CMC_API_KEY)
2. ✅ All endpoints remain compatible
3. ✅ Data structure unchanged
4. ✅ Frontend components work without changes
5. ✅ Better rate limits on free tier

## 🧪 Testing

Test the integration:

```bash
# Test listings endpoint
curl http://localhost:8000/crypto/listings?limit=10

# Test quotes endpoint
curl http://localhost:8000/crypto/quotes?symbols=BTC,ETH

# Test global metrics
curl http://localhost:8000/crypto/global

# Test fear & greed
curl http://localhost:8000/crypto/fear-greed

# Test trending
curl http://localhost:8000/crypto/trending?limit=5
```

## 📝 Environment Variables

No environment variables required! CoinGecko Free API works out of the box.

Optional (for future Pro API upgrade):
```bash
COINGECKO_API_KEY=your_api_key_here  # For Pro tier
```

## 🎯 Next Steps

To further enhance the integration:

1. **Add more coins** - Extend symbol_to_id mapping in `coingecko_service.py`
2. **Historical data** - Add endpoints for price history charts
3. **Price alerts** - Implement price alert notifications
4. **Portfolio tracking** - Add user portfolio management
5. **Advanced charts** - Integrate TradingView or custom charts

## 🌟 Benefits of CoinGecko

✅ Free tier with good rate limits
✅ No API key required for basic features
✅ Comprehensive cryptocurrency data
✅ Active community and support
✅ Regular updates and new features
✅ Reliable uptime and performance

## 📚 Documentation

- [CoinGecko API Docs](https://www.coingecko.com/en/api/documentation)
- [Alternative.me Fear & Greed](https://alternative.me/crypto/fear-and-greed-index/)

---

**Status**: ✅ Production Ready
**Last Updated**: January 2026
**API Provider**: CoinGecko Free API
