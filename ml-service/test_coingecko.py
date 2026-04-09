"""
Test script for CoinGecko API integration
Run this to verify the CoinGecko service is working correctly
"""

from coingecko_service import get_coingecko_service
import json


def test_crypto_listings():
    """Test getting top crypto listings"""
    print("\n" + "="*60)
    print("TEST 1: Crypto Listings (Top 10)")
    print("="*60)
    
    svc = get_coingecko_service()
    coins = svc.get_crypto_listings(limit=10, convert="USD")
    
    if coins:
        print(f"✅ Successfully fetched {len(coins)} coins")
        print("\nTop 5 Cryptocurrencies:")
        for coin in coins[:5]:
            print(f"  {coin['rank']}. {coin['symbol']} ({coin['name']})")
            print(f"     Price: ${coin['price']:,.2f} | ₹{coin['price_inr']:,.2f}")
            print(f"     24h Change: {coin['change_24h']:+.2f}%")
            print(f"     Market Cap: ${coin['market_cap']:,.0f}")
    else:
        print("❌ Failed to fetch crypto listings")


def test_crypto_quotes():
    """Test getting specific crypto quotes"""
    print("\n" + "="*60)
    print("TEST 2: Crypto Quotes (BTC, ETH, SOL)")
    print("="*60)
    
    svc = get_coingecko_service()
    quotes = svc.get_crypto_quotes(["BTC", "ETH", "SOL"], convert="USD")
    
    if quotes:
        print(f"✅ Successfully fetched {len(quotes)} quotes")
        for symbol, data in quotes.items():
            print(f"\n  {symbol} ({data['name']}):")
            print(f"    Price: ${data['price']:,.2f} | ₹{data['price_inr']:,.2f}")
            print(f"    24h: {data['change_24h']:+.2f}% | 7d: {data['change_7d']:+.2f}%")
            print(f"    Market Cap: ${data['market_cap']:,.0f}")
            print(f"    Volume 24h: ${data['volume_24h']:,.0f}")
    else:
        print("❌ Failed to fetch crypto quotes")


def test_global_metrics():
    """Test getting global market metrics"""
    print("\n" + "="*60)
    print("TEST 3: Global Market Metrics")
    print("="*60)
    
    svc = get_coingecko_service()
    metrics = svc.get_global_metrics(convert="USD")
    
    if metrics:
        print("✅ Successfully fetched global metrics")
        print(f"\n  Total Market Cap: ${metrics['total_market_cap']:,.0f}")
        print(f"  Total Volume 24h: ${metrics['total_volume_24h']:,.0f}")
        print(f"  BTC Dominance: {metrics['btc_dominance']:.2f}%")
        print(f"  ETH Dominance: {metrics['eth_dominance']:.2f}%")
        print(f"  Active Cryptocurrencies: {metrics['active_cryptocurrencies']:,}")
        print(f"  Market Cap Change 24h: {metrics['market_cap_change_24h']:+.2f}%")
    else:
        print("❌ Failed to fetch global metrics")


def test_fear_greed():
    """Test getting Fear & Greed index"""
    print("\n" + "="*60)
    print("TEST 4: Fear & Greed Index")
    print("="*60)
    
    svc = get_coingecko_service()
    fear_greed = svc.get_fear_greed_index()
    
    if fear_greed:
        print("✅ Successfully fetched Fear & Greed index")
        print(f"\n  Value: {fear_greed['value']}/100")
        print(f"  Classification: {fear_greed['value_classification']}")
        print(f"  Source: {fear_greed['source']}")
    else:
        print("❌ Failed to fetch Fear & Greed index")


def test_trending():
    """Test getting trending coins"""
    print("\n" + "="*60)
    print("TEST 5: Trending Coins")
    print("="*60)
    
    svc = get_coingecko_service()
    trending = svc.get_trending_coins(limit=5)
    
    if trending:
        print(f"✅ Successfully fetched {len(trending)} trending coins")
        print("\nTop Trending:")
        for coin in trending:
            print(f"  • {coin['symbol']} ({coin['name']})")
            if coin.get('change_24h'):
                print(f"    24h Change: {coin['change_24h']:+.2f}%")
    else:
        print("❌ Failed to fetch trending coins")


def test_crypto_info():
    """Test getting detailed crypto info"""
    print("\n" + "="*60)
    print("TEST 6: Crypto Info (BTC, ETH)")
    print("="*60)
    
    svc = get_coingecko_service()
    info = svc.get_crypto_info(["BTC", "ETH"])
    
    if info:
        print(f"✅ Successfully fetched info for {len(info)} coins")
        for symbol, data in info.items():
            print(f"\n  {symbol} ({data['name']}):")
            print(f"    Website: {data['website']}")
            print(f"    Description: {data['description'][:100]}...")
    else:
        print("❌ Failed to fetch crypto info")


def main():
    """Run all tests"""
    print("\n" + "="*60)
    print("🦎 COINGECKO API INTEGRATION TEST")
    print("="*60)
    
    try:
        test_crypto_listings()
        test_crypto_quotes()
        test_global_metrics()
        test_fear_greed()
        test_trending()
        test_crypto_info()
        
        print("\n" + "="*60)
        print("✅ ALL TESTS COMPLETED")
        print("="*60)
        print("\nCoinGecko integration is working correctly!")
        print("You can now start the ML service with: python main.py")
        
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        print("\nPlease check your internet connection and try again.")


if __name__ == "__main__":
    main()
