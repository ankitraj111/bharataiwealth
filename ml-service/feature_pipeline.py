import pandas as pd
import numpy as np
import yfinance as yf
from ta.trend import SMAIndicator, EMAIndicator, MACD
from ta.momentum import RSIIndicator
from ta.volatility import BollingerBands, AverageTrueRange
from sklearn.preprocessing import MinMaxScaler
import os
import datetime

class FeaturePipeline:
    def __init__(self, clean_data_dir="data/clean", use_nse_api: bool = False):
        self.clean_data_dir = clean_data_dir
        self.use_nse_api = use_nse_api
        
        if not os.path.exists(self.clean_data_dir):
            os.makedirs(self.clean_data_dir, exist_ok=True)
        
        self.scaler = MinMaxScaler(feature_range=(0, 1))
        
        # Initialize NSE fetcher if enabled
        if self.use_nse_api:
            try:
                from nse_integration import NSEDataFetcher
                self.nse_fetcher = NSEDataFetcher(use_yfinance_fallback=True)
                print("NSE API integration enabled with yfinance fallback")
            except Exception as e:
                print(f"NSE API initialization failed: {e}, using yfinance only")
                self.use_nse_api = False
                self.nse_fetcher = None
        else:
            self.nse_fetcher = None

    def fetch_data(self, symbol: str, period="5y") -> pd.DataFrame:
        """
        Fetch historical data using NSE API (if enabled) or yfinance
        Hybrid approach with automatic fallback
        """
        # Remove .NS suffix for NSE API
        clean_symbol = symbol.replace(".NS", "")
        
        # Try NSE API first if enabled
        if self.use_nse_api and self.nse_fetcher:
            try:
                print(f"Attempting NSE API for {clean_symbol}...")
                df = self.nse_fetcher.get_historical_data(clean_symbol, period=period)
                if df is not None and not df.empty:
                    print(f"✓ NSE API data fetched for {clean_symbol}")
                    return df
                else:
                    print(f"NSE API returned empty data, falling back to yfinance")
            except Exception as e:
                print(f"NSE API error for {clean_symbol}: {e}, falling back to yfinance")
        
        # Fallback to yfinance (or primary if NSE disabled)
        ticker = f"{clean_symbol}.NS" if clean_symbol.isupper() and "." not in clean_symbol else symbol
        try:
            print(f"Fetching data via yfinance for {ticker}...")
            df = yf.download(ticker, period=period, interval="1d", progress=False)
            if df.empty:
                return pd.DataFrame()
            
            # Handle MultiIndex columns if present
            if isinstance(df.columns, pd.MultiIndex):
                df.columns = df.columns.get_level_values(0)
            
            df = df.sort_index()
            print(f"✓ yfinance data fetched for {ticker}")
            return df
        except Exception as e:
            print(f"Error fetching data for {symbol}: {e}")
            return pd.DataFrame()

    def add_technical_indicators(self, df: pd.DataFrame) -> pd.DataFrame:
        """Add TA indicators: SMA, EMA, RSI, MACD, Bollinger Bands, ATR."""
        close = df['Close']
        high = df['High']
        low = df['Low']
        
        # SMA
        df['SMA_5'] = SMAIndicator(close, window=5).sma_indicator()
        df['SMA_10'] = SMAIndicator(close, window=10).sma_indicator()
        df['SMA_20'] = SMAIndicator(close, window=20).sma_indicator()
        
        # EMA
        df['EMA_10'] = EMAIndicator(close, window=10).ema_indicator()
        df['EMA_20'] = EMAIndicator(close, window=20).ema_indicator()
        
        # RSI
        df['RSI'] = RSIIndicator(close, window=14).rsi()
        
        # MACD
        macd = MACD(close)
        df['MACD'] = macd.macd()
        df['MACD_Signal'] = macd.macd_signal()
        
        # Bollinger Bands
        bb = BollingerBands(close)
        df['BB_Upper'] = bb.bollinger_hband()
        df['BB_Lower'] = bb.bollinger_lband()
        df['BB_Width'] = bb.bollinger_wband()
        
        # ATR
        df['ATR'] = AverageTrueRange(high, low, close).average_true_range()
        
        return df

    def add_custom_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Add custom features: Momentum, Returns, Lags, Volume Delta, Volatility."""
        # Daily Returns
        df['Returns'] = df['Close'].pct_change()
        
        # Momentum (Price Change over 10 days)
        df['Momentum'] = df['Close'] - df['Close'].shift(10)
        
        # Lag Features
        for lag in [1, 3, 7]:
            df[f'Close_Lag_{lag}'] = df['Close'].shift(lag)
            
        # Volume Delta
        df['Volume_Delta_Pct'] = df['Volume'].pct_change()
        
        # Volatility (Rolling Std Dev of Returns)
        for window in [7, 14, 30]:
            df[f'Volatility_{window}'] = df['Returns'].rolling(window=window).std()
            
        return df

    def add_target(self, df: pd.DataFrame, target_type="price") -> pd.DataFrame:
        """Define target variable: Next period price or direction."""
        if target_type == "price":
            df['Target'] = df['Close'].shift(-1)
        else: # direction
            df['Target'] = (df['Close'].shift(-1) > df['Close']).astype(int)
        
        # Replace infs with nan and drop all
        df = df.replace([np.inf, -np.inf], np.nan)
        return df.dropna()

    def split_data(self, df: pd.DataFrame, train_split=0.8):
        """Time-based split (no shuffling)."""
        split_idx = int(len(df) * train_split)
        train_df = df.iloc[:split_idx]
        val_df = df.iloc[split_idx:]
        
        # Separate features and target
        X_train = train_df.drop(columns=['Target'])
        y_train = train_df['Target']
        X_val = val_df.drop(columns=['Target'])
        y_val = val_df['Target']
        
        return X_train, X_val, y_train, y_val

    def scale_features(self, X_train, X_val):
        """Normalize inputs for deep learning."""
        # We only scale numerical columns, and keep track of them
        cols_to_scale = X_train.select_dtypes(include=[np.number]).columns
        
        X_train_scaled = X_train.copy()
        X_val_scaled = X_val.copy()
        
        X_train_scaled[cols_to_scale] = self.scaler.fit_transform(X_train[cols_to_scale])
        X_val_scaled[cols_to_scale] = self.scaler.transform(X_val[cols_to_scale])
        
        return X_train_scaled, X_val_scaled

    def process_symbol(self, symbol: str, target_type="price"):
        """Run full pipeline for a symbol."""
        print(f"Processing symbol: {symbol}")
        df = self.fetch_data(symbol)
        if df.empty:
            return None
            
        df = self.add_technical_indicators(df)
        df = self.add_custom_features(df)
        df = self.add_target(df, target_type=target_type)
        
        # Save to parquet
        save_path = os.path.join(self.clean_data_dir, f"{symbol}.parquet")
        df.to_parquet(save_path)
        print(f"Saved cleaned data to {save_path}")
        
        # Split and Scale
        X_train, X_val, y_train, y_val = self.split_data(df)
        X_train_scaled, X_val_scaled = self.scale_features(X_train, X_val)
        
        return {
            "X_train": X_train_scaled,
            "X_val": X_val_scaled,
            "y_train": y_train,
            "y_val": y_val,
            "full_df": df
        }

if __name__ == "__main__":
    # Test run
    pipeline = FeaturePipeline()
    result = pipeline.process_symbol("RELIANCE")
    if result:
        print("Pipeline processed successfully.")
        print("X_train shape:", result["X_train"].shape)
        print("Sample features:", result["X_train"].columns.tolist()[:10])
