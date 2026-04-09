# 🚀 Crypto Hub Quick Start Guide

## 🎯 Overview

Crypto Hub ab CoinGecko API ke saath live data provide karta hai. Yeh guide aapko quickly setup aur test karne mein help karega.

## ⚡ Quick Setup (5 Minutes)

### Step 1: ML Service Start Karein

```bash
# ML service directory mein jaayein
cd ml-service

# Service start karein
python main.py
```

Service `http://localhost:8000` par run hogi.

### Step 2: Test Karein

Naye terminal mein test script run karein:

```bash
cd ml-service
python test_coingecko.py
```

Aapko yeh output dikhna chahiye:
```
✅ Successfully fetched 10 coins
✅ Successfully fetched 3 quotes
✅ Successfully fetched global metrics
✅ Successfully fetched Fear & Greed index
✅ ALL TESTS COMPLETED
```

### Step 3: Frontend Start Karein

```bash
# Frontend directory mein jaayein
cd frontend

# Development server start karein
npm run dev
```

Frontend `http://localhost:3000` par run hoga.

### Step 4: Crypto Hub Access Karein

Browser mein jaayein:
```
http://localhost:3000/crypto/dashboard
```

## 🎨 Crypto Hub Sections

Dashboard mein 9 sections hain:

1. **Crypto Summary** - 5 key metrics cards
   - Total Exposure
   - 24h Trajectory
   - Volatility Bias
   - Neural Sentiment
   - AI Reliability

2. **Market Overview** - Global crypto market data
   - BTC/ETH prices (INR)
   - Total market cap
   - 24h volume
   - BTC dominance
   - Fear & Greed index

3. **Holdings Table** - Live watchlist
   - BTC, ETH, SOL, MATIC, BNB, XRP
   - Real-time prices
   - 24h/7d changes
   - AI signals

4. **Performance Chart** - Price charts
   - BTC/ETH price trajectory
   - 7d/30d/90d timeframes

5. **ML Prediction** - AI predictions
   - Price predictions
   - Confidence scores

6. **Risk Panel** - Risk assessment
   - Volatility analysis
   - Risk scores

7. **Explainable AI** - AI insights
   - Why bullish/bearish
   - Model explanations

8. **Portfolio Simulator** - Impact simulation
   - What-if scenarios

9. **News Panel** - Latest crypto news
   - Market events
   - Impact analysis

## 🔧 API Endpoints Testing

### Test Listings
```bash
curl http://localhost:8000/crypto/listings?limit=10
```

### Test Quotes
```bash
curl http://localhost:8000/crypto/quotes?symbols=BTC,ETH,SOL
```

### Test Global Metrics
```bash
curl http://localhost:8000/crypto/global
```

### Test Fear & Greed
```bash
curl http://localhost:8000/crypto/fear-greed
```

### Test Trending
```bash
curl http://localhost:8000/crypto/trending?limit=5
```

## 📊 Live Data Features

### ✅ Real-time Updates
- Prices update every 60 seconds
- Global metrics update every 120 seconds
- Automatic refresh on page load

### ✅ INR Support
- All prices shown in both USD and INR
- Conversion rate: ₹83.5 per USD

### ✅ No API Key Required
- CoinGecko Free API works out of the box
- No registration needed
- No rate limit issues for normal usage

## 🎯 What You'll See

### Market Overview Section
```
BTC Dominance: 52.5%
BTC Price: ₹35.2L ($42,156)
ETH Price: ₹1.8L ($2,156)
Total Market Cap: $1.5T
24h Volume: $85B
Fear & Greed: 68 (Greed)
```

### Holdings Table
```
Asset    Price (INR)    24h %    7d %    AI Signal    Confidence
BTC      ₹35.2L        +2.5%    +8.2%   Bullish      78%
ETH      ₹1.8L         +3.1%    +12.5%  Bullish      82%
SOL      ₹8,350        -1.2%    +5.8%   Neutral      65%
```

## 🔍 Troubleshooting

### ML Service Not Starting?
```bash
# Check if port 8000 is free
netstat -ano | findstr :8000

# Install dependencies
pip install -r requirements.txt
```

### No Data Showing?
1. Check ML service is running: `http://localhost:8000/docs`
2. Check browser console for errors
3. Verify internet connection (CoinGecko API needs internet)

### Frontend Not Loading?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 📱 Mobile View

Crypto Hub is fully responsive:
- Works on mobile, tablet, desktop
- Touch-friendly interface
- Optimized for all screen sizes

## 🎨 UI Features

### Live Indicators
- 🟢 "Live · CoinGecko" badge when data is fresh
- 🔄 Spinner when loading
- ⚡ Real-time price updates

### Interactive Elements
- Click on any crypto to see detailed analysis
- Hover for tooltips and additional info
- Refresh button to manually update data

### Color Coding
- 🟢 Green: Positive changes
- 🔴 Red: Negative changes
- 🟡 Yellow: Neutral/Warning
- 🔵 Blue: Information

## 🚀 Next Steps

1. **Explore Dashboard** - Check all 9 sections
2. **Test API** - Run test_coingecko.py
3. **Customize** - Add more coins to watchlist
4. **Monitor** - Watch live price updates
5. **Analyze** - Use AI insights for decisions

## 📚 Documentation

- [Full Integration Guide](./COINGECKO_INTEGRATION.md)
- [Hindi Documentation](./COINGECKO_INTEGRATION_HINDI.md)
- [CoinGecko API Docs](https://www.coingecko.com/en/api/documentation)

## ✅ Checklist

- [ ] ML service running on port 8000
- [ ] Test script passed all tests
- [ ] Frontend running on port 3000
- [ ] Can access /crypto/dashboard
- [ ] Live data showing in all sections
- [ ] Prices updating automatically
- [ ] No console errors

## 🎉 Success!

Agar sab kuch working hai, toh aapka Crypto Hub ab live CoinGecko data ke saath ready hai! 🚀

---

**Need Help?** Check the troubleshooting section or documentation files.
