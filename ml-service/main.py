from fastapi import FastAPI, HTTPException, Query, Body
from typing import List, Dict, Optional
from ml_engine import MLEngine
from sentiment_engine import SentimentEngine
from risk_engine import RiskEngine, RiskInput
from advisory_engine import AdvisoryEngine
from kite_engine import KiteEngine
from mf_engine import MFEngine, SIPInput
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

app = FastAPI(title="Bharat AI Wealth Prediction Engine")

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = MLEngine()
sentiment_engine = SentimentEngine()
risk_engine = RiskEngine()
advisory_engine = AdvisoryEngine()
kite_engine = KiteEngine()
mf_engine = MFEngine()

@app.on_event("shutdown")
def shutdown_event():
    pass

# =====================
# KITE TRADING ENDPOINTS
# =====================

@app.get("/kite/login")
async def kite_login():
    """Returns the Kite login URL for authentication."""
    url = kite_engine.get_login_url()
    if not url:
        raise HTTPException(status_code=400, detail="KITE_API_KEY not configured in environment.")
    return {"login_url": url}

@app.get("/kite/callback")
async def kite_callback(request_token: str = Query(...)):
    """Handles Kite redirect, generates access token."""
    session = kite_engine.generate_session(request_token)
    if not session:
        raise HTTPException(status_code=500, detail="Failed to generate Kite session.")
    return {"status": "success", "user_name": session.get("user_name")}

@app.get("/kite/holdings")
async def get_kite_holdings():
    """Fetches real-time holdings from Zerodha."""
    if not kite_engine.is_active():
        raise HTTPException(status_code=401, detail="Kite session not active. Please login first.")
    return {"holdings": kite_engine.get_holdings()}

@app.get("/kite/status")
async def get_kite_status():
    """Returns the current connection status of Kite."""
    return {
        "is_active": kite_engine.is_active(),
        "api_key_configured": kite_engine.api_key is not None
    }

# =====================
# ADVISORY ENDPOINTS (Recommendation Only)
# =====================

@app.get("/rebalance/suggest")
async def get_rebalance_suggestions(
    symbols: Optional[str] = Query(None, description="Comma-separated symbols, e.g. RELIANCE.NS,TCS.NS")
):
    """
    Generate rebalancing suggestions. ADVISORY ONLY - no trades executed.
    """
    try:
        symbol_list = symbols.split(",") if symbols else None
        result = advisory_engine.generate_rebalance_suggestions(symbol_list)
        return result.model_dump()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/stoploss/check")
async def check_stoploss_alerts(positions: Dict[str, Dict[str, float]] = Body(...)):
    """
    Check positions for stop-loss conditions. Returns ALERTS only, no sells.
    Example body: {"RELIANCE.NS": {"qty": 10, "avg_price": 2500}}
    """
    try:
        result = advisory_engine.check_stop_loss_alerts(positions)
        return result.model_dump()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/advisory/recommend")
async def get_recommendation(symbol: str = Query(..., description="Symbol to get recommendation for")):
    """
    Get a single trade recommendation for a symbol. ADVISORY ONLY.
    """
    try:
        rec = advisory_engine.generate_recommendation(symbol)
        return {
            "recommendation": rec.model_dump(),
            "note": "User action required. No automatic trades."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/advisor/full")
async def get_full_advisory(
    risk_data: RiskInput,
    symbols: Optional[str] = Query(None, description="Comma-separated symbols")
):
    """
    UNIFIED ENDPOINT: Calculate user risk + Generate personalized recommendations.
    Combines risk scoring, stock advisory, and mutual fund recommendations.
    """
    try:
        symbol_list = symbols.split(",") if symbols else None
        result = advisory_engine.generate_rebalance_suggestions(
            symbols=symbol_list,
            user_risk_data=risk_data
        )
        
        # Add MF recommendations based on user risk category
        risk_category = result.user_risk_category or "medium"
        mf_recommendations = mf_engine.get_mf_recommendation_for_advisory(risk_category)
        
        response = result.model_dump()
        response.update(mf_recommendations)
        
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/risk-score")
async def calculate_risk_score(data: RiskInput):
    """
    Calculate user risk score based on profile, behavior, and portfolio inputs.
    """
    try:
        result = risk_engine.calculate_score(data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# =====================
# PORTFOLIO DATA ENDPOINTS
# =====================

PORTFOLIO_SYMBOLS = {
    "low": ["RELIANCE.NS", "HDFCBANK.NS", "SBI", "PPF.NS", "GILT.NS"],
    "medium": ["AXISBANK.NS", "INFY.NS", "TCS.NS", "HDFCLIFE.NS", "TATASTEEL.NS"],
    "high": ["BTC-USD", "ETH-USD", "SOL-USD", "DOGE-USD", "ADANIENSOL.NS"]
}

@app.get("/portfolio/assets")
async def get_portfolio_assets(risk_level: str = Query(..., description="Risk level: low, medium, high")):
    """
    Fetch assets for a specific risk-level portfolio.
    """
    try:
        symbols = PORTFOLIO_SYMBOLS.get(risk_level.lower(), [])
        
        async def fetch_asset_data(symbol):
            # Handle special cases for mock data if needed (some symbols might not be real)
            real_symbol = symbol if ".NS" in symbol or "-USD" in symbol else f"{symbol}.NS"
            try:
                # Mock async behavior for engine/advisory if they aren't async (for demonstration, keeping it simple)
                # In a real app, these should be async calls to DB/External APIs
                prediction = engine.predict(real_symbol)
                price = advisory_engine.get_current_price(real_symbol)
                
                if not price:
                    price = 1000.0
                    
                return {
                    "name": symbol.replace(".NS", "").replace("-USD", ""),
                    "type": "Stock" if ".NS" in real_symbol else "Cryptocurrency" if "-USD" in real_symbol else "Mixed",
                    "value": round(float(price) * 10, 2),
                    "return": round(((prediction.get("prediction", 0) - price) / price * 100), 1) if prediction.get("prediction") else 5.0,
                    "confidence": int(prediction.get("confidence", 0.7) * 100),
                    "risk": prediction.get("risk", "Medium").capitalize()
                }
            except:
                return {
                    "name": symbol,
                    "type": "Asset",
                    "value": 50000,
                    "return": 8.0,
                    "confidence": 75,
                    "risk": risk_level.capitalize()
                }

        import asyncio
        assets = await asyncio.gather(*[fetch_asset_data(s) for s in symbols])
        return {"assets": list(assets), "risk_level": risk_level}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/predict")
async def predict(symbol: str = Query(..., description="Stock symbol to predict")):
    """
    Fetch data, calculate risk, and return prediction.
    Example: /predict?symbol=RELIANCE
    """
    try:
        prediction_result = engine.predict(symbol)
        return prediction_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/sentiment")
async def get_sentiment(symbol: str = Query(..., description="Symbol to analyze sentiment for")):
    """
    Fetch news and perform sentiment analysis using FinBERT.
    Example: /sentiment?symbol=RELIANCE
    """
    try:
        result = sentiment_engine.analyze_symbol(symbol)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "models_loaded": {
            "low": os.path.exists("models/low.pkl"),
            "medium": os.path.exists("models/mid.pkl"),
            "high": os.path.exists("models/high_lstm.h5")
        },
        "mf_engine": {
            "funds_loaded": len(mf_engine.funds_data)
        }
    }

# =====================
# MUTUAL FUND ENDPOINTS
# =====================

@app.get("/mutualfunds/list")
async def get_mutual_fund_list(
    category: Optional[str] = Query(None, description="Filter by category: Large Cap, Mid Cap, Small Cap, etc."),
    risk: Optional[str] = Query(None, description="Filter by risk level: low, medium, high")
):
    """
    Returns list of all available Mutual Funds.
    Optional filters: category, risk_level
    """
    try:
        funds = mf_engine.get_fund_list(category=category, risk=risk)
        return {
            "funds": funds,
            "total": len(funds),
            "filters_applied": {
                "category": category,
                "risk": risk
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/mutualfunds/nav")
async def get_mutual_fund_nav(
    scheme: str = Query(..., description="Scheme code to fetch NAV for")
):
    """
    Fetch current NAV for a selected scheme.
    Primary: AMFI NAV endpoint, Fallback: internal cache
    """
    try:
        nav_data = mf_engine.fetch_nav(scheme)
        if "error" in nav_data:
            raise HTTPException(status_code=404, detail=nav_data["error"])
        return nav_data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/mutualfunds/rank")
async def get_mutual_fund_ranking(
    risk: str = Query(..., description="Risk level: low, medium, high"),
    top_n: int = Query(10, ge=1, le=20, description="Number of top funds to return")
):
    """
    Rank and return top N funds per risk category.
    Sorted by weighted score: CAGR 40%, Volatility 25%, Rolling Returns 20%, Expense 10%, AUM 5%
    """
    try:
        if risk.lower() not in ["low", "medium", "high"]:
            raise HTTPException(status_code=400, detail="Risk must be: low, medium, or high")
        
        ranked_funds = mf_engine.rank_funds(risk.lower(), top_n)
        return {
            "risk_level": risk,
            "top_funds": ranked_funds,
            "ranking_criteria": {
                "cagr_3yr": "40%",
                "volatility": "25%",
                "rolling_return_stability": "20%",
                "expense_ratio": "10%",
                "fund_size": "5%"
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/mutualfunds/sip-plan")
async def calculate_sip_plan(input_data: SIPInput):
    """
    Calculate SIP plan with recommended allocation and corpus projection.
    
    Input: monthly_amount, goal_years, risk (low|medium|high)
    Output: Recommended allocation, corpus projection with best/worst case
    """
    try:
        projection = mf_engine.calculate_sip_projection(input_data)
        return {
            "sip_plan": {
                "monthly_amount": projection.monthly_amount,
                "duration_months": projection.total_months,
                "duration_years": input_data.goal_years,
                "risk_level": input_data.risk,
                "total_invested": projection.total_invested
            },
            "recommended_funds": [fund.model_dump() for fund in projection.recommended_funds],
            "projection": {
                "expected": {
                    "corpus": projection.expected_corpus,
                    "cagr": projection.expected_cagr
                },
                "best_case": {
                    "corpus": projection.best_case_corpus,
                    "cagr": projection.best_case_cagr
                },
                "worst_case": {
                    "corpus": projection.worst_case_corpus,
                    "cagr": projection.worst_case_cagr
                }
            },
            "note": "Advisory only. Past performance does not guarantee future returns."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/mutualfunds/goal-based")
async def get_goal_based_portfolio(
    goal: Optional[str] = Query(None, description="Goal type: retirement, house, education, vacation, wedding, emergency")
):
    """
    Get predefined portfolios for goal-based investing.
    If no goal specified, returns list of all available goals.
    """
    try:
        if goal:
            portfolio = mf_engine.get_goal_portfolio(goal)
            if not portfolio:
                raise HTTPException(
                    status_code=404,
                    detail=f"Unknown goal type: {goal}. Available: retirement, house, education, vacation, wedding, emergency"
                )
            return {
                "portfolio": {
                    "goal_type": portfolio.goal_type,
                    "description": portfolio.description,
                    "risk_level": portfolio.risk_level,
                    "time_horizon": portfolio.time_horizon_years,
                    "expected_cagr": portfolio.expected_cagr,
                    "funds": [fund.model_dump() for fund in portfolio.funds]
                }
            }
        else:
            # Return all available goals
            return {
                "available_goals": mf_engine.get_all_goals(),
                "note": "Pass ?goal=<goal_type> to get detailed portfolio"
            }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
