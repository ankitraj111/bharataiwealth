# Neural News Hub - Setup Guide

## ✅ Kya Implement Hua

1. **Backend API** (`NewsController.java`)
   - CoinGecko API integration for real crypto news
   - Mock data fallback
   - Sentiment analysis (bullish/neutral/bearish)

2. **Frontend** (`frontend/app/crypto/news/page.tsx`)
   - Real-time news display
   - Auto-refresh every minute
   - Beautiful UI with sentiment indicators
   - Mock data support (backend nahi chale toh bhi kaam karega)

## 🚀 Kaise Chalaye

### Option 1: Mock Data (Backend ke bina)
Frontend already mock data show kar raha hai. Bas page refresh karo:
```
http://localhost:3000/crypto/news
```

### Option 2: Real Data (Backend ke saath)

1. **Backend Start Karo**:
```bash
cd bankend
./mvnw spring-boot:run
```

2. **Frontend Already Running Hai**:
```bash
cd frontend
npm run dev
```

3. **Page Open Karo**:
```
http://localhost:3000/crypto/news
```

## 🎨 Features

- ✅ Real-time crypto trending news
- ✅ Sentiment analysis with color coding:
  - 🟢 Green = Bullish
  - 🔴 Red = Bearish  
  - 🟡 Yellow = Neutral
- ✅ Auto-refresh every 60 seconds
- ✅ Fallback to mock data if API fails
- ✅ Beautiful animated UI

## 🔧 Troubleshooting

### Backend nahi chal raha?
Mock data automatically show hoga - no problem!

### CORS error?
Already configured in `application.properties`:
```
cors.allowed-origins=http://localhost:3000
```

### API rate limit?
CoinGecko free API use kar rahe hain - agar limit exceed ho toh mock data show hoga.

## 📝 API Endpoint

```
GET http://localhost:8080/api/news/crypto
```

Response:
```json
[
  {
    "id": "bitcoin",
    "title": "Bitcoin - Trending Now",
    "description": "Market Cap Rank: #1",
    "symbol": "BTC",
    "sentiment": "bullish",
    "timestamp": 1709740800000,
    "source": "CoinGecko"
  }
]
```

## 🎯 Next Steps

Abhi page refresh karo - mock data dikhega with beautiful UI!
Backend start karne ke baad real trending crypto data aayega.
