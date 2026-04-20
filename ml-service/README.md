---
title: Bharat AI Wealth ML Service
emoji: 💰
colorFrom: indigo
colorTo: blue
sdk: docker
pinned: false
license: mit
---

# Bharat AI Wealth - Prediction Engine

This is the Python-based ML service for the Bharat AI Wealth platform. It provides financial predictions, sentiment analysis, and risk scoring for the Indian stock market and cryptocurrencies.

## 🚀 Features
- **Stock Predictions**: AI-powered price analysis for Indian stocks.
- **Sentiment Analysis**: FinBERT-based sentiment analysis for financial news.
- **Risk Assessment**: Personalized risk scoring for users.
- **Mutual Fund Advisory**: Intelligent mutual fund recommendations and SIP planning.
- **Crypto Analysis**: Integration with CoinGecko for real-time crypto metrics.

## 🛠️ Usage
The service exposes a FastAPI interface. Once deployed, you can access the Swagger documentation at `/docs`.

### Key Endpoints:
- `GET /health`: Service status and model check.
- `GET /predict?symbol=RELIANCE`: Get price prediction for a symbol.
- `POST /risk-score`: Calculate user risk profile.
- `GET /market/indices`: Fetch live market indices.

## 🔐 Security
This service requires an `API_KEY` for authentication. When deploying, ensure you set the `API_KEY` as a secret in your Hugging Face Space settings.

## 📦 Deployment
This Space is built using the `Dockerfile` in the repository. It runs on port `7860`.
