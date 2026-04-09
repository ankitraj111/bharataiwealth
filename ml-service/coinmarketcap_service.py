"""
CoinMarketCap API Integration Service
Provides real-time crypto and fiat currency data
API Key: f6e1e9bc115d4f51a0050d1cf85bf8bf
"""

import requests
import os
from typing import Optional, Dict, List, Any
from datetime import datetime
from functools import lru_cache
import time

CMC_API_KEY = os.getenv("CMC_API_KEY", "f6e1e9bc115d4f51a0050d1cf85bf8bf")
CMC_BASE_URL = "https://pro-api.coinmarketcap.com/v1"
CMC_V2_URL  = "https://pro-api.coinmarketcap.com/v2"

# Cache TTL in seconds
PRICE_CACHE_TTL = 60        # 1 minute for prices
MARKET_CACHE_TTL = 120      # 2 minutes for market data
FOREX_CACHE_TTL  = 300      # 5 minutes for forex/fiat rates

_cache: Dict[str, Dict] = {}


def _cached(key: str, ttl: int, fetch_fn):
    """Simple in-memory cache helper."""
    now = time.time()
    if key in _cache and now - _cache[key]["ts"] < ttl:
        return _cache[key]["data"]
    data = fetch_fn()
    _cache[key] = {"ts": now, "data": data}
    return data


class CoinMarketCapService:
    """
    Service class for CoinMarketCap API.
    Handles crypto listings, quotes, global metrics, and fiat exchange rates.
    """

    def __init__(self, api_key: str = CMC_API_KEY):
        self.api_key = api_key
        self.headers = {
            "Accepts": "application/json",
            "X-CMC_PRO_API_KEY": self.api_key,
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)

    # ------------------------------------------------------------------
    # CRYPTO ENDPOINTS
    # ------------------------------------------------------------------

    def get_crypto_listings(
        self,
        limit: int = 20,
        convert: str = "USD",
        sort: str = "market_cap",
    ) -> List[Dict]:
        """
        Get latest crypto listings sorted by market cap (or other criteria).
        Returns a list of coin data dicts.
        """
        def fetch():
            try:
                url = f"{CMC_BASE_URL}/cryptocurrency/listings/latest"
                params = {
                    "limit": limit,
                    "convert": convert,
                    "sort": sort,
                    "sort_dir": "desc",
                }
                resp = self.session.get(url, params=params, timeout=10)
                resp.raise_for_status()
                data = resp.json()
                coins = []
                for coin in data.get("data", []):
                    q = coin["quote"][convert]
                    coins.append({
                        "id": coin["id"],
                        "name": coin["name"],
                        "symbol": coin["symbol"],
                        "rank": coin["cmc_rank"],
                        "price": q.get("price", 0),
                        "price_inr": round(q.get("price", 0) * 83.5, 2),
                        "change_1h": round(q.get("percent_change_1h", 0), 2),
                        "change_24h": round(q.get("percent_change_24h", 0), 2),
                        "change_7d": round(q.get("percent_change_7d", 0), 2),
                        "market_cap": q.get("market_cap", 0),
                        "volume_24h": q.get("volume_24h", 0),
                        "circulating_supply": coin.get("circulating_supply", 0),
                        "max_supply": coin.get("max_supply"),
                        "dominance": round(q.get("market_cap_dominance", 0), 2),
                        "last_updated": q.get("last_updated"),
                        "source": "coinmarketcap",
                    })
                return coins
            except Exception as e:
                print(f"[CMC] get_crypto_listings error: {e}")
                return []

        return _cached("crypto_listings", PRICE_CACHE_TTL, fetch)

    def get_crypto_quotes(self, symbols: List[str], convert: str = "USD") -> Dict[str, Dict]:
        """
        Get quote for specific symbols, e.g. ["BTC", "ETH", "SOL"].
        Returns dict keyed by symbol.
        """
        def fetch():
            try:
                url = f"{CMC_BASE_URL}/cryptocurrency/quotes/latest"
                params = {"symbol": ",".join(symbols), "convert": convert}
                resp = self.session.get(url, params=params, timeout=10)
                resp.raise_for_status()
                data = resp.json()
                result = {}
                for sym, entries in data.get("data", {}).items():
                    # CMC returns a list per symbol sometimes
                    coin = entries[0] if isinstance(entries, list) else entries
                    q = coin["quote"][convert]
                    result[sym] = {
                        "id": coin["id"],
                        "name": coin["name"],
                        "symbol": sym,
                        "price": round(q.get("price", 0), 4),
                        "price_inr": round(q.get("price", 0) * 83.5, 2),
                        "change_1h": round(q.get("percent_change_1h", 0), 2),
                        "change_24h": round(q.get("percent_change_24h", 0), 2),
                        "change_7d": round(q.get("percent_change_7d", 0), 2),
                        "market_cap": q.get("market_cap", 0),
                        "volume_24h": q.get("volume_24h", 0),
                        "last_updated": q.get("last_updated"),
                        "source": "coinmarketcap",
                    }
                return result
            except Exception as e:
                print(f"[CMC] get_crypto_quotes error: {e}")
                return {}

        cache_key = f"quotes_{'_'.join(sorted(symbols))}_{convert}"
        return _cached(cache_key, PRICE_CACHE_TTL, fetch)

    def get_global_metrics(self, convert: str = "USD") -> Dict:
        """
        Get global cryptocurrency market metrics:
        total market cap, volume, BTC dominance, Fear & Greed index (approx), etc.
        """
        def fetch():
            try:
                url = f"{CMC_BASE_URL}/global-metrics/quotes/latest"
                params = {"convert": convert}
                resp = self.session.get(url, params=params, timeout=10)
                resp.raise_for_status()
                data = resp.json().get("data", {})
                q = data.get("quote", {}).get(convert, {})
                return {
                    "total_market_cap": q.get("total_market_cap", 0),
                    "total_volume_24h": q.get("total_volume_24h", 0),
                    "btc_dominance": round(data.get("btc_dominance", 0), 2),
                    "eth_dominance": round(data.get("eth_dominance", 0), 2),
                    "active_cryptocurrencies": data.get("active_cryptocurrencies", 0),
                    "active_exchanges": data.get("active_exchanges", 0),
                    "market_cap_change_24h": round(q.get("total_market_cap_yesterday_percentage_change", 0), 2),
                    "last_updated": data.get("last_updated"),
                    "source": "coinmarketcap",
                }
            except Exception as e:
                print(f"[CMC] get_global_metrics error: {e}")
                return {}

        return _cached("global_metrics", MARKET_CACHE_TTL, fetch)

    def get_fear_greed_index(self) -> Dict:
        """
        CMC Pro provides a Fear & Greed index endpoint.
        Returns index value and classification.
        """
        def fetch():
            try:
                url = "https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest"
                resp = self.session.get(url, timeout=10)
                resp.raise_for_status()
                data = resp.json().get("data", {})
                return {
                    "value": data.get("value", 50),
                    "value_classification": data.get("value_classification", "Neutral"),
                    "timestamp": data.get("timestamp"),
                    "source": "coinmarketcap",
                }
            except Exception as e:
                print(f"[CMC] get_fear_greed_index error: {e}")
                # Fallback: approximate from market cap change
                return {
                    "value": 50,
                    "value_classification": "Neutral",
                    "source": "fallback",
                }

        return _cached("fear_greed", MARKET_CACHE_TTL, fetch)

    def get_trending_coins(self, limit: int = 10) -> List[Dict]:
        """
        Get trending/gainers coins from CMC.
        """
        listings = self.get_crypto_listings(limit=100)
        if not listings:
            return []
        # Sort by 24h change descending to find top movers
        sorted_coins = sorted(listings, key=lambda x: x.get("change_24h", 0), reverse=True)
        return sorted_coins[:limit]

    # ------------------------------------------------------------------
    # FIAT / CURRENCY ENDPOINTS
    # ------------------------------------------------------------------

    def get_fiat_exchange_rates(self, base: str = "USD", targets: List[str] = None) -> Dict:
        """
        Get fiat exchange rates relative to a base currency using CMC price conversion.
        Converts 1 unit of `base` into each target fiat currency.
        """
        if targets is None:
            targets = ["INR", "EUR", "GBP", "JPY", "AED", "SGD", "AUD", "CAD"]

        def fetch():
            try:
                url = f"{CMC_BASE_URL}/tools/price-conversion"
                results = {}
                # CMC supports fiat-to-fiat via cryptocurrency base
                for target in targets:
                    try:
                        params = {
                            "amount": 1,
                            "symbol": base,
                            "convert": target,
                        }
                        resp = self.session.get(url, params=params, timeout=10)
                        if resp.status_code == 200:
                            data = resp.json().get("data", {})
                            quote = data.get("quote", {}).get(target, {})
                            results[target] = {
                                "rate": round(quote.get("price", 0), 4),
                                "last_updated": quote.get("last_updated"),
                            }
                    except Exception as e:
                        print(f"[CMC] fiat conversion {base}->{target} failed: {e}")
                results["source"] = "coinmarketcap"
                results["base"] = base
                return results
            except Exception as e:
                print(f"[CMC] get_fiat_exchange_rates error: {e}")
                return {"source": "fallback", "base": base}

        cache_key = f"forex_{base}_{'_'.join(sorted(targets or []))}"
        return _cached(cache_key, FOREX_CACHE_TTL, fetch)

    def convert_currency(self, amount: float, from_symbol: str, to_symbol: str) -> Dict:
        """
        Convert any amount between crypto or fiat using CMC price conversion.
        """
        try:
            url = f"{CMC_BASE_URL}/tools/price-conversion"
            params = {"amount": amount, "symbol": from_symbol, "convert": to_symbol}
            resp = self.session.get(url, params=params, timeout=10)
            resp.raise_for_status()
            data = resp.json().get("data", {})
            quote = data.get("quote", {}).get(to_symbol, {})
            return {
                "amount": amount,
                "from": from_symbol,
                "to": to_symbol,
                "converted_amount": round(quote.get("price", 0), 6),
                "last_updated": quote.get("last_updated"),
                "source": "coinmarketcap",
            }
        except Exception as e:
            print(f"[CMC] convert_currency error: {e}")
            return {"error": str(e)}

    def get_crypto_info(self, symbols: List[str]) -> Dict:
        """
        Get detailed info (logo, description, website, category) for given symbols.
        """
        try:
            url = f"{CMC_BASE_URL}/cryptocurrency/info"
            params = {"symbol": ",".join(symbols)}
            resp = self.session.get(url, params=params, timeout=10)
            resp.raise_for_status()
            data = resp.json().get("data", {})
            result = {}
            for sym, info_list in data.items():
                coin = info_list[0] if isinstance(info_list, list) else info_list
                result[sym] = {
                    "name": coin.get("name"),
                    "symbol": sym,
                    "logo": coin.get("logo"),
                    "description": coin.get("description", "")[:300],
                    "category": coin.get("category"),
                    "website": (coin.get("urls", {}).get("website") or [""])[0],
                    "source": "coinmarketcap",
                }
            return result
        except Exception as e:
            print(f"[CMC] get_crypto_info error: {e}")
            return {}


# Singleton
_cmc_instance: Optional[CoinMarketCapService] = None


def get_cmc_service() -> CoinMarketCapService:
    """Return singleton CoinMarketCapService."""
    global _cmc_instance
    if _cmc_instance is None:
        _cmc_instance = CoinMarketCapService()
    return _cmc_instance


# Quick smoke-test
if __name__ == "__main__":
    import json
    svc = get_cmc_service()

    print("=== Global Metrics ===")
    print(json.dumps(svc.get_global_metrics(), indent=2))

    print("\n=== Top 5 Crypto ===")
    for c in svc.get_crypto_listings(limit=5):
        print(f"  {c['symbol']}: ${c['price']:,.4f} | 24h: {c['change_24h']:+.2f}%")

    print("\n=== BTC/ETH Quotes ===")
    quotes = svc.get_crypto_quotes(["BTC", "ETH", "SOL"])
    for sym, q in quotes.items():
        print(f"  {sym}: ${q['price']:,.2f} | ₹{q['price_inr']:,.2f}")

    print("\n=== Fear & Greed ===")
    print(json.dumps(svc.get_fear_greed_index(), indent=2))

    print("\n=== Forex Rates (1 USD) ===")
    forex = svc.get_fiat_exchange_rates("USD")
    for k, v in forex.items():
        if isinstance(v, dict):
            print(f"  1 USD = {v['rate']} {k}")
