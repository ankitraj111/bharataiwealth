import yfinance as yf
import pandas as pd
import numpy as np
from ta.volatility import AverageTrueRange, BollingerBands
from ta.volume import OnBalanceVolumeIndicator
from ta.trend import EMAIndicator, MACD
from ta.momentum import RSIIndicator
import os
from datetime import datetime

class CryptoPipeline:
    def __init__(self, data_dir="data/clean_crypto"):
        self.data_dir = data_dir
        os.makedirs(self.data_dir, exist_ok=True)

    def fetch_data(self, symbol: str, period="2y", interval="1d"):
        """Fetch crypto data from yfinance (Binance fallback)."""
        # Ensure symbol has -USD suffix if not present
        if not symbol.endswith("-USD"):
            symbol = f"{symbol}-USD"
            
        print(f"Fetching crypto data for {symbol}...")
        df = yf.download(symbol, period=period, interval=interval)
        
        if df.empty:
            return None
            
        if isinstance(df.columns, pd.MultiIndex):
            df.columns = df.columns.get_level_values(0)
            
        # Ensure we have required columns
        required = ['Open', 'High', 'Low', 'Close', 'Volume']
        if not all(col in df.columns for col in required):
            return None
            
        return df

    def add_indicators(self, df: pd.DataFrame):
        """Add crypto-specific technical indicators."""
        # 1. Volatility Measures
        bb = BollingerBands(close=df['Close'], window=20, window_dev=2)
        df['BB_Upper'] = bb.bollinger_hband()
        df['BB_Lower'] = bb.bollinger_lband()
        
        atr = AverageTrueRange(high=df['High'], low=df['Low'], close=df['Close'], window=14)
        df['ATR'] = atr.average_true_range()
        
        # 2. Momentum
        rsi = RSIIndicator(close=df['Close'], window=14)
        df['RSI'] = rsi.rsi()
        
        macd = MACD(close=df['Close'])
        df['MACD'] = macd.macd()
        df['MACD_Signal'] = macd.macd_signal()
        
        # 3. Volume
        obv = OnBalanceVolumeIndicator(close=df['Close'], volume=df['Volume'])
        df['OBV'] = obv.on_balance_volume()
        df['VWAP'] = (df['Volume'] * (df['High'] + df['Low'] + df['Close']) / 3).cumsum() / df['Volume'].cumsum()
        
        # 4. Moving Averages (Golden Cross)
        df['EMA_9'] = EMAIndicator(close=df['Close'], window=9).ema_indicator()
        df['EMA_21'] = EMAIndicator(close=df['Close'], window=21).ema_indicator()
        df['EMA_55'] = EMAIndicator(close=df['Close'], window=55).ema_indicator()
        
        return df

    def add_custom_features(self, df: pd.DataFrame):
        """Add custom crypto features."""
        # Returns
        df['Returns'] = df['Close'].pct_change()
        df['Log_Returns'] = np.log(df['Close'] / df['Close'].shift(1))
        
        # Volatility
        df['Vol_24h'] = df['Returns'].rolling(window=1).std() * 100 # Approx
        df['Vol_7d'] = df['Returns'].rolling(window=7).std() * 100
        
        # Funding rate proxy (using return difference vs BTC if available, else random noise wrapper for now)
        # Ideally, fetch from binance. Here we simulate 'Funding_Rate' as a feature placeholder
        df['Funding_Rate_Proxy'] = df['Returns'] * 0.1 # Placeholder
        
        # Time features
        df['Is_Weekend'] = df.index.dayofweek >= 5
        df['Day_Of_Week'] = df.index.dayofweek
        df['Month'] = df.index.month
        
        # Regime Detection
        # Simple rule: Price > EMA_55 = Uptrend (1), < EMA_55 = Downtrend (-1), else Sideways (0)
        conditions = [
            (df['Close'] > df['EMA_55']) & (df['EMA_21'] > df['EMA_55']),
            (df['Close'] < df['EMA_55']) & (df['EMA_21'] < df['EMA_55'])
        ]
        choices = [1, -1]
        df['Regime'] = np.select(conditions, choices, default=0)
        
        return df

    def process_symbol(self, symbol: str):
        """Full processing pipeline."""
        df = self.fetch_data(symbol)
        if df is None:
            print(f"No data found for {symbol}")
            return None
            
        df = self.add_indicators(df)
        df = self.add_custom_features(df)
        
        # Clean NaNs
        df = df.dropna()
        
        # Save
        filename = symbol.replace("-USD", "") + ".parquet"
        path = os.path.join(self.data_dir, filename)
        df.to_parquet(path)
        print(f"[Crypto] Processed and saved {symbol} to {path}")
        
        return df

if __name__ == "__main__":
    cp = CryptoPipeline()
    cp.process_symbol("BTC")
    cp.process_symbol("ETH")
