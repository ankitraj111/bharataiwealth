"""
CoinGecko API Integration Service
Provides real-time crypto market data using CoinGecko Free API
No API key required for basic endpoints
"""

import os
import requests
from typing import Dict, List, Optional, Any
from functools import lru_cache
from datetime import datetime, timedelta

# CoinGecko API endpoints (Free tier)
COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3"

# Cache TTL in seconds
CACHE_TTL_LISTINGS = 60  # 1 minute
CACHE_TTL_GLOBAL = 120   # 2 minutes
CACHE_TTL_QUOTES = 60    # 1 minute

# INR conversion rate (approximate, can be updated)
USD_TO_INR = 83.5


class CoinGeckoService:
    """
    Service class for CoinGecko API.
    Handles crypto listings, quotes, global metrics, and market data.
    """

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            "Accept": "application/json",
            "User-Agent": "BharatAI-Wealth/1.0"
        })
        self._cache: Dict[str, tuple[Any, datetime]] = {}

    def _get_cached(self, key: str, ttl: int) -> Optional[Any]:
        """Get cached data if not expired."""
        if key in self._cache:
            data, timestamp = self._cache[key]
            if datetime.now() - timestamp < timedelta(seconds=ttl):
                return data
        return None

    def _set_cache(self, key: str, data: Any):
        """Set cache with current timestamp."""
        self._cache[key] = (data, datetime.now())

    def get_crypto_listings(
        self,
        limit: int = 20,
        convert: str = "USD",
        sort: str = "market_cap_desc"
    ) -> List[Dict]:
        """
        Get top cryptocurrency listings from CoinGecko.
        
        Args:
            limit: Number of coins to return (max 250)
            convert: Currency for prices (USD, INR, etc.)
            sort: Sort order (market_cap_desc, volume_desc, etc.)
        
        Returns:
            List of coin data dictionaries
        """
        cache_key = f"listings_{limit}_{convert}_{sort}"
        cached = self._get_cached(cache_key, CACHE_TTL_LISTINGS)
        if cached:
            return cached

        try:
            url = f"{COINGECKO_BASE_URL}/coins/markets"
            params = {
                "vs_currency": convert.lower(),
                "order": sort,
                "per_page": min(limit, 250),
                "page": 1,
                "sparkline": False,
                "price_change_percentage": "1h,24h,7d"
            }
            
            resp = self.session.get(url, params=params, timeout=10)
            resp.raise_for_status()
            data = resp.json()

            coins = []
            for idx, coin in enumerate(data, 1):
                price_usd = coin.get("current_price", 0)
                coins.append({
                    "id": coin.get("id", ""),
                    "name": coin.get("name", ""),
                    "symbol": coin.get("symbol", "").upper(),
                    "rank": coin.get("market_cap_rank", idx),
                    "price": price_usd,
                    "price_inr": price_usd * USD_TO_INR,
                    "change_1h": round(coin.get("price_change_percentage_1h_in_currency", 0), 2),
                    "change_24h": round(coin.get("price_change_percentage_24h", 0), 2),
                    "change_7d": round(coin.get("price_change_percentage_7d_in_currency", 0), 2),
                    "market_cap": coin.get("market_cap", 0),
                    "volume_24h": coin.get("total_volume", 0),
                    "circulating_supply": coin.get("circulating_supply", 0),
                    "max_supply": coin.get("max_supply"),
                    "dominance": 0,  # Will be calculated separately
                    "last_updated": coin.get("last_updated", ""),
                    "source": "coingecko",
                })

            self._set_cache(cache_key, coins)
            return coins

        except Exception as e:
            print(f"[CoinGecko] get_crypto_listings failed: {e}")
            return []

    def get_crypto_quotes(
        self,
        symbols: List[str],
        convert: str = "USD"
    ) -> Dict[str, Dict]:
        """
        Get real-time quotes for specific crypto symbols.
        
        Args:
            symbols: List of crypto symbols (e.g., ["BTC", "ETH"])
            convert: Currency for prices
        
        Returns:
            Dictionary mapping symbol to coin data
        """
        cache_key = f"quotes_{'_'.join(sorted(symbols))}_{convert}"
        cached = self._get_cached(cache_key, CACHE_TTL_QUOTES)
        if cached:
            return cached

        try:
            # Map common symbols to CoinGecko IDs
            symbol_to_id = {
                "BTC": "bitcoin",
                "ETH": "ethereum",
                "SOL": "solana",
                "MATIC": "matic-network",
                "BNB": "binancecoin",
                "XRP": "ripple",
                "ADA": "cardano",
                "DOGE": "dogecoin",
                "DOT": "polkadot",
                "AVAX": "avalanche-2",
                "LINK": "chainlink",
                "UNI": "uniswap",
                "ATOM": "cosmos",
                "LTC": "litecoin",
                "BCH": "bitcoin-cash",
            }

            ids = [symbol_to_id.get(sym, sym.lower()) for sym in symbols]
            
            url = f"{COINGECKO_BASE_URL}/coins/markets"
            params = {
                "vs_currency": convert.lower(),
                "ids": ",".join(ids),
                "order": "market_cap_desc",
                "sparkline": False,
                "price_change_percentage": "1h,24h,7d"
            }
            
            resp = self.session.get(url, params=params, timeout=10)
            resp.raise_for_status()
            data = resp.json()

            result = {}
            for coin in data:
                symbol = coin.get("symbol", "").upper()
                price_usd = coin.get("current_price", 0)
                result[symbol] = {
                    "id": coin.get("id", ""),
                    "name": coin.get("name", ""),
                    "symbol": symbol,
                    "rank": coin.get("market_cap_rank", 0),
                    "price": price_usd,
                    "price_inr": price_usd * USD_TO_INR,
                    "change_1h": round(coin.get("price_change_percentage_1h_in_currency", 0), 2),
                    "change_24h": round(coin.get("price_change_percentage_24h", 0), 2),
                    "change_7d": round(coin.get("price_change_percentage_7d_in_currency", 0), 2),
                    "market_cap": coin.get("market_cap", 0),
                    "volume_24h": coin.get("total_volume", 0),
                    "last_updated": coin.get("last_updated", ""),
                    "source": "coingecko",
                }

            self._set_cache(cache_key, result)
            return result

        except Exception as e:
            print(f"[CoinGecko] get_crypto_quotes failed: {e}")
            return {}

    def get_global_metrics(self, convert: str = "USD") -> Optional[Dict]:
        """
        Get global cryptocurrency market metrics.
        
        Returns:
            Dictionary with global market data
        """
        cache_key = f"global_{convert}"
        cached = self._get_cached(cache_key, CACHE_TTL_GLOBAL)
        if cached:
            return cached

        try:
            url = f"{COINGECKO_BASE_URL}/global"
            resp = self.session.get(url, timeout=10)
            resp.raise_for_status()
            data = resp.json().get("data", {})

            metrics = {
                "total_market_cap": data.get("total_market_cap", {}).get(convert.lower(), 0),
                "total_volume_24h": data.get("total_volume", {}).get(convert.lower(), 0),
                "btc_dominance": round(data.get("market_cap_percentage", {}).get("btc", 0), 2),
                "eth_dominance": round(data.get("market_cap_percentage", {}).get("eth", 0), 2),
                "active_cryptocurrencies": data.get("active_cryptocurrencies", 0),
                "market_cap_change_24h": round(data.get("market_cap_change_percentage_24h_usd", 0), 2),
                "last_updated": datetime.now().isoformat(),
                "source": "coingecko",
            }

            self._set_cache(cache_key, metrics)
            return metrics

        except Exception as e:
            print(f"[CoinGecko] get_global_metrics failed: {e}")
            return None

    def get_fear_greed_index(self) -> Optional[Dict]:
        """
        Get Crypto Fear & Greed Index from Alternative.me API.
        CoinGecko doesn't provide this, so we use Alternative.me
        
        Returns:
            Dictionary with fear & greed data
        """
        cache_key = "fear_greed"
        cached = self._get_cached(cache_key, CACHE_TTL_GLOBAL)
        if cached:
            return cached

        try:
            url = "https://api.alternative.me/fng/"
            resp = self.session.get(url, timeout=10)
            resp.raise_for_status()
            data = resp.json().get("data", [{}])[0]

            result = {
                "value": int(data.get("value", 50)),
                "value_classification": data.get("value_classification", "Neutral"),
                "timestamp": data.get("timestamp"),
                "source": "alternative.me",
            }

            self._set_cache(cache_key, result)
            return result

        except Exception as e:
            print(f"[CoinGecko] get_fear_greed_index failed: {e}")
            return None

    def get_trending_coins(self, limit: int = 10) -> List[Dict]:
        """
        Get trending coins from CoinGecko.
        
        Returns:
            List of trending coin data
        """
        cache_key = f"trending_{limit}"
        cached = self._get_cached(cache_key, CACHE_TTL_LISTINGS)
        if cached:
            return cached

        try:
            url = f"{COINGECKO_BASE_URL}/search/trending"
            resp = self.session.get(url, timeout=10)
            resp.raise_for_status()
            data = resp.json()

            trending = []
            for item in data.get("coins", [])[:limit]:
                coin = item.get("item", {})
                trending.append({
                    "id": coin.get("id", ""),
                    "name": coin.get("name", ""),
                    "symbol": coin.get("symbol", "").upper(),
                    "rank": coin.get("market_cap_rank", 0),
                    "price": coin.get("data", {}).get("price", 0),
                    "change_24h": round(coin.get("data", {}).get("price_change_percentage_24h", {}).get("usd", 0), 2),
                    "market_cap": coin.get("data", {}).get("market_cap", 0),
                    "volume_24h": coin.get("data", {}).get("total_volume", 0),
                    "source": "coingecko",
                })

            self._set_cache(cache_key, trending)
            return trending

        except Exception as e:
            print(f"[CoinGecko] get_trending_coins failed: {e}")
            return []

    def get_crypto_info(self, symbols: List[str]) -> Dict[str, Dict]:
        """
        Get detailed information about specific cryptocurrencies.
        
        Args:
            symbols: List of crypto symbols
        
        Returns:
            Dictionary mapping symbol to detailed info
        """
        try:
            symbol_to_id = {
                "BTC": "bitcoin",
                "ETH": "ethereum",
                "SOL": "solana",
                "MATIC": "matic-network",
                "BNB": "binancecoin",
                "XRP": "ripple",
            }

            result = {}
            for symbol in symbols:
                coin_id = symbol_to_id.get(symbol, symbol.lower())
                url = f"{COINGECKO_BASE_URL}/coins/{coin_id}"
                params = {"localization": False, "tickers": False, "community_data": False, "developer_data": False}
                
                resp = self.session.get(url, params=params, timeout=10)
                if resp.status_code == 200:
                    data = resp.json()
                    result[symbol] = {
                        "id": data.get("id", ""),
                        "name": data.get("name", ""),
                        "symbol": symbol,
                        "description": data.get("description", {}).get("en", "")[:500],
                        "website": data.get("links", {}).get("homepage", [""])[0],
                        "source": "coingecko",
                    }

            return result

        except Exception as e:
            print(f"[CoinGecko] get_crypto_info failed: {e}")
            return {}


# Singleton instance
_coingecko_instance: Optional[CoinGeckoService] = None


def get_coingecko_service() -> CoinGeckoService:
    """Return singleton CoinGeckoService."""
    global _coingecko_instance
    if _coingecko_instance is None:
        _coingecko_instance = CoinGeckoService()
    return _coingecko_instance
