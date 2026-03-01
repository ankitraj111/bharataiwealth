# 🔄 NSE API + yfinance Hybrid Integration

## Overview

Aapke **Bharat AI Wealth** project mein ab **dual data source** system hai:
- **Primary**: NSE API (official Indian stock exchange data)
- **Fallback**: yfinance (reliable backup)

## Architecture

```
User Request
    ↓
DataService (Unified Interface)
    ↓
├─→ NSE API (Try First)
│   ├─ Success → Return NSE Data
│   └─ Fail → Fallback to yfinance
│
└─→ yfinance (Fallback/Primary)
    ├─ Success → Return yfinance Data
    └─ Fail → Return None/Error
```

## Files Created/Modified

### New Files
1. `ml-service/nse_integration.py` - NSE API wrapper
2. `ml-service/data_service.py` - Unified data interface
3. `NSE_YFINANCE_INTEGRATION.md` - This documentation

### Modified Files
1. `ml-service/feature_pipeline.py` - Added NSE support

## Usage Examples

### 1. Get Current Price
```python
from data_service import get_data_service

ds = get_data_service(prefer_nse=True)
price = ds.get_current_price("RELIANCE")
print(f"Price: ₹{price}")
```

### 2. Get Detailed Quote
```python
quote = ds.get_quote("TCS")
# Returns: lastPrice, change, pChange, open, high, low, volume
```

### 3. Get Historical Data
```python
df = ds.get_historical_data("INFY", period="5y")
# Returns: DataFrame with OHLCV data
```

### 4. Get Market Indices
```python
indices = ds.get_market_indices()
# Returns: NIFTY 50, NIFTY BANK, NIFTY IT, SENSEX
```


## Features

### ✅ Automatic Fallback
- NSE API fail hone pe automatically yfinance use hota hai
- No manual intervention needed
- Seamless user experience

### ✅ Source Tracking
- Har response mein `source` field hai
- Track karo data kahan se aaya: `NSE_API` ya `yfinance`

### ✅ Real-Time Data
- Live stock prices
- Intraday high/low
- Volume data
- Market indices

### ✅ Historical Data
- 5 years ka data (configurable)
- OHLCV format
- Technical analysis ready

## Configuration

### Enable NSE API
```python
# In feature_pipeline.py
fp = FeaturePipeline(use_nse_api=True)

# In data_service.py
ds = get_data_service(prefer_nse=True)
```

### Disable NSE API (yfinance only)
```python
fp = FeaturePipeline(use_nse_api=False)
ds = get_data_service(prefer_nse=False)
```

## Testing

```bash
# Test NSE integration
cd ml-service
python nse_integration.py

# Test unified data service
python data_service.py

# Test feature pipeline
python feature_pipeline.py
```

## Benefits

1. **Reliability**: Dual source = higher uptime
2. **Speed**: NSE API faster for Indian stocks
3. **Accuracy**: Official exchange data when available
4. **Flexibility**: Easy to switch sources
5. **Future-proof**: Can add more sources easily

## Current Status

✅ NSE API integration complete
✅ yfinance fallback working
✅ Unified DataService created
✅ Feature pipeline updated
✅ Automatic source selection
✅ Error handling implemented

## Next Steps (Optional)

- [ ] Add Redis caching for NSE API responses
- [ ] Implement rate limiting for API calls
- [ ] Add more NSE endpoints (FnO, derivatives)
- [ ] Create monitoring dashboard for data sources
- [ ] Add data quality checks

## Summary

Aapka model ab **high-level predictions** kar sakta hai with:
- Real-time NSE data (primary)
- yfinance backup (fallback)
- Automatic source switching
- No code changes needed in ML models
- Seamless integration

**Flow**: NSE API → Data → Model → Prediction ✅
