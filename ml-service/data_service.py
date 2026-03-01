"""
Unified Data Service - Manages NSE API + yfinance
Provides single interface for all data fetching needs
"""

from typing import Optional, Dict, List
import pandas as pd
from datetime import datetime
import yfinance as yf

class DataService:
    """
    Unified data service with intelligent source selection
    Priority: NSE API → yfinance
    """
    
    def __init__(self, prefer_nse: bool = True):
        self.prefer_nse = prefer_nse
        self.nse_fetcher = None
        
        if prefer_nse:
            try:
                from nse_integration import NSEDataFetcher
                self.nse_fetcher = NSEDataFetcher(use_yfinance_fallback=True)
                print("✓ Data Service initialized with NSE API + yfinance fallback")
            except Exception as e:
                print(f"NSE API unavailable: {e}")
                print("✓ Data Service initialized with yfinance only")
    
    def get_current_price(self, symbol: str) -> Optional[float]:
        """
        Get current price for a symbol
        Returns: float price or None
        """
        clean_symbol = symbol.replace(".NS", "")
        
        # Try NSE first
        if self.nse_fetcher:
            quote = self.nse_fetcher.get_quote(clean_symbol)
            if quote:
                return quote.get('lastPrice')
        
        # Fallback to yfinance
        return self._get_price_yfinance(symbol)
    
    def _get_price_yfinance(self, symbol: str) -> Optional[float]:
        """yfinance fallback for current price"""
        try:
            ticker_symbol = f"{symbol}.NS" if not symbol.endswith('.NS') else symbol
            ticker = yf.Ticker(ticker_symbol)
            hist = ticker.history(period="1d")
            if not hist.empty:
                return float(hist['Close'].iloc[-1])
        except Exception as e:
            print(f"yfinance price fetch failed for {symbol}: {e}")
        return None
    
    def get_quote(self, symbol: str) -> Optional[Dict]:
        """
        Get detailed quote with OHLCV data
        Returns: Dict with price, change, volume, etc.
        """
        clean_symbol = symbol.replace(".NS", "")
        
        # Try NSE first
        if self.nse_fetcher:
            quote = self.nse_fetcher.get_quote(clean_symbol)
            if quote:
                return quote
        
        # Fallback to yfinance
        return self._get_quote_yfinance(symbol)
    
    def _get_quote_yfinance(self, symbol: str) -> Optional[Dict]:
        """yfinance fallback for quote"""
        try:
            ticker_symbol = f"{symbol}.NS" if not symbol.endswith('.NS') else symbol
            ticker = yf.Ticker(ticker_symbol)
            info = ticker.info
            hist = ticker.history(period="2d")
            
            if not hist.empty:
                latest = hist.iloc[-1]
                prev_close = hist.iloc[-2]['Close'] if len(hist) > 1 else latest['Close']
                change = latest['Close'] - prev_close
                pchange = (change / prev_close * 100) if prev_close else 0
                
                return {
                    'symbol': symbol,
                    'lastPrice': float(latest['Close']),
                    'change': float(change),
                    'pChange': float(pchange),
                    'open': float(latest['Open']),
                    'high': float(latest['High']),
                    'low': float(latest['Low']),
                    'close': float(latest['Close']),
                    'volume': int(latest['Volume']),
                    'timestamp': datetime.now().isoformat(),
                    'source': 'yfinance'
                }
        except Exception as e:
            print(f"yfinance quote fetch failed for {symbol}: {e}")
        return None
    
    def get_historical_data(self, symbol: str, period: str = "5y") -> Optional[pd.DataFrame]:
        """
        Get historical OHLCV data
        Returns: DataFrame with Date, Open, High, Low, Close, Volume
        """
        clean_symbol = symbol.replace(".NS", "")
        
        # Try NSE first
        if self.nse_fetcher:
            df = self.nse_fetcher.get_historical_data(clean_symbol, period=period)
            if df is not None and not df.empty:
                return df
        
        # Fallback to yfinance
        return self._get_historical_yfinance(symbol, period)
    
    def _get_historical_yfinance(self, symbol: str, period: str = "5y") -> Optional[pd.DataFrame]:
        """yfinance fallback for historical data"""
        try:
            ticker_symbol = f"{symbol}.NS" if not symbol.endswith('.NS') else symbol
            df = yf.download(ticker_symbol, period=period, interval="1d", progress=False)
            
            if df.empty:
                return None
            
            # Handle MultiIndex columns
            if isinstance(df.columns, pd.MultiIndex):
                df.columns = df.columns.get_level_values(0)
            
            return df.sort_index()
        except Exception as e:
            print(f"yfinance historical fetch failed for {symbol}: {e}")
        return None
    
    def get_market_indices(self) -> List[Dict]:
        """
        Get major Indian market indices
        Returns: List of index data with name, value, change
        """
        indices_data = []
        
        # Try NSE API first
        if self.nse_fetcher:
            try:
                nifty50 = self.nse_fetcher.get_index_data("NIFTY 50")
                nifty_bank = self.nse_fetcher.get_index_data("NIFTY BANK")
                nifty_it = self.nse_fetcher.get_index_data("NIFTY IT")
                
                if nifty50:
                    indices_data.append({
                        'name': 'NIFTY 50',
                        'value': f"{nifty50['last']:,.2f}",
                        'change': round(nifty50['percentChange'], 2),
                        'trending': nifty50['percentChange'] >= 0,
                        'source': 'NSE_API'
                    })
                
                if nifty_bank:
                    indices_data.append({
                        'name': 'NIFTY BANK',
                        'value': f"{nifty_bank['last']:,.2f}",
                        'change': round(nifty_bank['percentChange'], 2),
                        'trending': nifty_bank['percentChange'] >= 0,
                        'source': 'NSE_API'
                    })
                
                if nifty_it:
                    indices_data.append({
                        'name': 'NIFTY IT',
                        'value': f"{nifty_it['last']:,.2f}",
                        'change': round(nifty_it['percentChange'], 2),
                        'trending': nifty_it['percentChange'] >= 0,
                        'source': 'NSE_API'
                    })
                
                if indices_data:
                    return indices_data
            except Exception as e:
                print(f"NSE indices fetch failed: {e}")
        
        # Fallback to yfinance
        return self._get_indices_yfinance()
    
    def _get_indices_yfinance(self) -> List[Dict]:
        """yfinance fallback for market indices"""
        indices = {
            "^NSEI": "NIFTY 50",
            "^NSEBANK": "NIFTY BANK",
            "^CNXIT": "NIFTY IT",
            "^BSESN": "SENSEX"
        }
        
        results = []
        for symbol, name in indices.items():
            try:
                ticker = yf.Ticker(symbol)
                hist = ticker.history(period="2d")
                
                if not hist.empty and len(hist) >= 2:
                    latest = hist.iloc[-1]
                    prev = hist.iloc[-2]
                    change_pct = ((latest['Close'] - prev['Close']) / prev['Close']) * 100
                    
                    results.append({
                        'name': name,
                        'value': f"{latest['Close']:,.2f}",
                        'change': round(change_pct, 2),
                        'trending': change_pct >= 0,
                        'source': 'yfinance'
                    })
            except Exception as e:
                print(f"Failed to fetch {name}: {e}")
        
        return results
    
    def get_data_source_status(self) -> Dict:
        """Get status of available data sources"""
        return {
            'nse_api_available': self.nse_fetcher is not None,
            'yfinance_available': True,  # Always available as fallback
            'preferred_source': 'NSE_API' if self.nse_fetcher else 'yfinance'
        }


# Singleton instance
_data_service_instance = None

def get_data_service(prefer_nse: bool = True) -> DataService:
    """Get or create singleton DataService instance"""
    global _data_service_instance
    if _data_service_instance is None:
        _data_service_instance = DataService(prefer_nse=prefer_nse)
    return _data_service_instance


# Test
if __name__ == "__main__":
    import json
    
    ds = get_data_service(prefer_nse=True)
    
    print("\n=== Data Source Status ===")
    print(json.dumps(ds.get_data_source_status(), indent=2))
    
    print("\n=== Testing Quote Fetch ===")
    quote = ds.get_quote("RELIANCE")
    if quote:
        print(json.dumps(quote, indent=2))
    
    print("\n=== Testing Current Price ===")
    price = ds.get_current_price("TCS")
    print(f"TCS Current Price: ₹{price}")
    
    print("\n=== Testing Market Indices ===")
    indices = ds.get_market_indices()
    for idx in indices:
        print(f"{idx['name']}: {idx['value']} ({idx['change']:+.2f}%) [{idx['source']}]")
