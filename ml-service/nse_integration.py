"""
NSE API Integration for Real-Time Indian Stock Data
Hybrid approach: NSE API (primary) + yfinance (fallback)
"""

import requests
import pandas as pd
from datetime import datetime, timedelta
from typing import Optional, Dict, List
import json
from functools import lru_cache
import yfinance as yf

class NSEDataFetcher:
    """
    Hybrid Data Fetcher: NSE API (primary) + yfinance (fallback)
    Automatically falls back to yfinance if NSE API fails
    """
    
    def __init__(self, use_yfinance_fallback: bool = True):
        self.base_url = "https://www.nseindia.com/api"
        self.use_fallback = use_yfinance_fallback
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.9',
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)
        
        # Initialize session with homepage visit
        try:
            self.session.get("https://www.nseindia.com", timeout=10)
        except:
            print("NSE session initialization failed, will use yfinance fallback")
    
    def get_quote(self, symbol: str) -> Optional[Dict]:
        """
        Get real-time quote for a symbol
        Primary: NSE API, Fallback: yfinance
        Example: symbol = "RELIANCE"
        """
        # Try NSE API first
        try:
            url = f"{self.base_url}/quote-equity?symbol={symbol}"
            response = self.session.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                return {
                    'symbol': symbol,
                    'lastPrice': data['priceInfo']['lastPrice'],
                    'change': data['priceInfo']['change'],
                    'pChange': data['priceInfo']['pChange'],
                    'open': data['priceInfo']['open'],
                    'high': data['priceInfo']['intraDayHighLow']['max'],
                    'low': data['priceInfo']['intraDayHighLow']['min'],
                    'close': data['priceInfo']['close'],
                    'volume': data['preOpenMarket']['totalTradedVolume'],
                    'timestamp': datetime.now().isoformat(),
                    'source': 'NSE_API'
                }
        except Exception as e:
            print(f"NSE API failed for {symbol}: {e}")
        
        # Fallback to yfinance
        if self.use_fallback:
            return self._get_quote_yfinance(symbol)
        
        return None
    
    def _get_quote_yfinance(self, symbol: str) -> Optional[Dict]:
        """Fallback method using yfinance"""
        try:
            ticker_symbol = f"{symbol}.NS" if not symbol.endswith('.NS') else symbol
            ticker = yf.Ticker(ticker_symbol)
            info = ticker.info
            hist = ticker.history(period="1d")
            
            if not hist.empty:
                latest = hist.iloc[-1]
                prev_close = info.get('previousClose', latest['Close'])
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
            print(f"yfinance fallback also failed for {symbol}: {e}")
        
        return None
    
    def get_historical_data(self, symbol: str, from_date: str = None, to_date: str = None, period: str = "5y") -> Optional[pd.DataFrame]:
        """
        Get historical data for a symbol
        Primary: NSE API, Fallback: yfinance
        Dates in format: "DD-MM-YYYY" for NSE API
        """
        # Try NSE API first (if dates provided)
        if from_date and to_date:
            try:
                url = f"{self.base_url}/historical/cm/equity"
                params = {
                    'symbol': symbol,
                    'series': '["EQ"]',
                    'from': from_date,
                    'to': to_date
                }
                
                response = self.session.get(url, params=params, timeout=15)
                
                if response.status_code == 200:
                    data = response.json()
                    df = pd.DataFrame(data['data'])
                    
                    # Convert to standard format
                    df['Date'] = pd.to_datetime(df['CH_TIMESTAMP'])
                    df['Open'] = df['CH_OPENING_PRICE']
                    df['High'] = df['CH_TRADE_HIGH_PRICE']
                    df['Low'] = df['CH_TRADE_LOW_PRICE']
                    df['Close'] = df['CH_CLOSING_PRICE']
                    df['Volume'] = df['CH_TOT_TRADED_QTY']
                    
                    df = df[['Date', 'Open', 'High', 'Low', 'Close', 'Volume']]
                    df.set_index('Date', inplace=True)
                    
                    return df
            except Exception as e:
                print(f"NSE API historical data failed for {symbol}: {e}")
        
        # Fallback to yfinance
        if self.use_fallback:
            return self._get_historical_yfinance(symbol, period)
        
        return None
    
    def _get_historical_yfinance(self, symbol: str, period: str = "5y") -> Optional[pd.DataFrame]:
        """Fallback method using yfinance for historical data"""
        try:
            ticker_symbol = f"{symbol}.NS" if not symbol.endswith('.NS') else symbol
            df = yf.download(ticker_symbol, period=period, interval="1d", progress=False)
            
            if df.empty:
                return None
            
            # Handle MultiIndex columns if present
            if isinstance(df.columns, pd.MultiIndex):
                df.columns = df.columns.get_level_values(0)
            
            df = df.sort_index()
            return df
        except Exception as e:
            print(f"yfinance historical fallback failed for {symbol}: {e}")
        
        return None
    
    @lru_cache(maxsize=100)
    def get_market_status(self) -> Dict:
        """Get current market status"""
        try:
            url = f"{self.base_url}/marketStatus"
            response = self.session.get(url, timeout=10)
            
            if response.status_code == 200:
                return response.json()
        except Exception as e:
            print(f"Error fetching market status: {e}")
        return {"marketState": "UNKNOWN"}
    
    def get_top_gainers(self, limit: int = 10) -> List[Dict]:
        """Get top gaining stocks"""
        try:
            url = f"{self.base_url}/live-analysis-variations?index=gainers"
            response = self.session.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                return data['NIFTY']['data'][:limit]
        except Exception as e:
            print(f"Error fetching top gainers: {e}")
        return []
    
    def get_top_losers(self, limit: int = 10) -> List[Dict]:
        """Get top losing stocks"""
        try:
            url = f"{self.base_url}/live-analysis-variations?index=losers"
            response = self.session.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                return data['NIFTY']['data'][:limit]
        except Exception as e:
            print(f"Error fetching top losers: {e}")
        return []
    
    def get_index_data(self, index: str = "NIFTY 50") -> Optional[Dict]:
        """
        Get index data
        Supported: NIFTY 50, NIFTY BANK, NIFTY IT, etc.
        """
        try:
            url = f"{self.base_url}/allIndices"
            response = self.session.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                for item in data['data']:
                    if item['index'] == index:
                        return {
                            'index': item['index'],
                            'last': item['last'],
                            'change': item['variation'],
                            'percentChange': item['percentChange'],
                            'timestamp': datetime.now().isoformat()
                        }
        except Exception as e:
            print(f"Error fetching index data: {e}")
        return None


# Test function
if __name__ == "__main__":
    nse = NSEDataFetcher()
    
    # Test quote
    print("Testing NSE Quote:")
    quote = nse.get_quote("RELIANCE")
    if quote:
        print(json.dumps(quote, indent=2))
    
    # Test market status
    print("\nTesting Market Status:")
    status = nse.get_market_status()
    print(json.dumps(status, indent=2))
    
    # Test index data
    print("\nTesting NIFTY 50:")
    nifty = nse.get_index_data("NIFTY 50")
    if nifty:
        print(json.dumps(nifty, indent=2))
