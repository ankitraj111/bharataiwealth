import yfinance as yf
import pandas as pd
import numpy as np
from typing import List, Dict, Any, Optional

class TechnicalAnalysisEngine:
    """
    Engine for technical analysis indicators: SMA, RSI, and MACD.
    """

    def analyze_symbol(self, symbol: str, period: str = "6mo") -> Dict[str, Any]:
        try:
            # Handle Indian stocks if suffix missing
            fetch_symbol = symbol if (".NS" in symbol or "-USD" in symbol) else f"{symbol}.NS"
            
            ticker = yf.Ticker(fetch_symbol)
            df = ticker.history(period=period)
            
            if df.empty:
                return {"symbol": symbol, "error": "No data found"}

            # Calculate Indicators
            df['SMA20'] = df['Close'].rolling(window=20).mean()
            df['SMA50'] = df['Close'].rolling(window=50).mean()
            
            # RSI
            delta = df['Close'].diff()
            gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
            loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
            rs = gain / loss
            df['RSI'] = 100 - (100 / (1 + rs))
            
            # MACD
            exp1 = df['Close'].ewm(span=12, adjust=False).mean()
            exp2 = df['Close'].ewm(span=26, adjust=False).mean()
            df['MACD'] = exp1 - exp2
            df['Signal_Line'] = df['MACD'].ewm(span=9, adjust=False).mean()
            
            latest = df.iloc[-1]
            
            # Signal Logic
            buy_cond = (latest['Close'] > latest['SMA20']) and \
                       (latest['MACD'] > latest['Signal_Line']) and \
                       (latest['RSI'] < 70)
                       
            sell_cond = (latest['Close'] < latest['SMA20']) or \
                        (latest['MACD'] < latest['Signal_Line']) or \
                        (latest['RSI'] > 70)
            
            signal = "HOLD"
            reason = "Market indices in neutral range"
            confidence = 65.0

            if buy_cond:
                signal = "BUY"
                reason = "Price > SMA20 and MACD bullish crossover detected"
                confidence = 85.0
            elif sell_cond:
                signal = "SELL"
                reason = "Price < SMA20 or MACD bearish crossover/RSI overbought"
                confidence = 75.0

            return {
                "symbol": symbol,
                "signal": signal,
                "reason": reason,
                "confidence": confidence,
                "current_price": round(float(latest['Close']), 2),
                "indicators": {
                    "rsi": round(float(latest['RSI']), 2) if not pd.isna(latest['RSI']) else None,
                    "sma20": round(float(latest['SMA20']), 2) if not pd.isna(latest['SMA20']) else None,
                    "sma50": round(float(latest['SMA50']), 2) if not pd.isna(latest['SMA50']) else None,
                    "macd": round(float(latest['MACD']), 2) if not pd.isna(latest['MACD']) else None
                }
            }
        except Exception as e:
            return {"symbol": symbol, "error": str(e)}

    def analyze_portfolio(self, symbols: List[str]) -> List[Dict[str, Any]]:
        results = []
        for symbol in symbols:
            results.append(self.analyze_symbol(symbol))
        return results
