"""
Advisory Engine - Recommendation Only Mode

This module replaces the paper trading system with a pure recommendation engine.
It generates trade suggestions without executing any trades or modifying holdings.
Integrated with RiskEngine for user-specific risk-aware recommendations.
"""

import datetime
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
from ml_engine import MLEngine
from risk_engine import RiskEngine, RiskInput
import yfinance as yf


class TradeRecommendation(BaseModel):
    symbol: str
    action: str  # "BUY", "SELL", "HOLD"
    reason: str
    confidence: float
    current_price: Optional[float] = None
    target_price: Optional[float] = None
    risk_level: Optional[str] = None
    user_risk_compatible: Optional[bool] = None  # Does recommendation match user risk profile?


class AdvisoryResponse(BaseModel):
    recommendations: List[TradeRecommendation]
    user_risk_score: Optional[float] = None
    user_risk_category: Optional[str] = None
    note: str = "No trades executed automatically. User action required."
    generated_at: str


class AdvisoryEngine:
    """
    Generates trade recommendations without executing any trades.
    All outputs are purely advisory.
    Integrates with RiskEngine for personalized recommendations.
    """

    def __init__(self):
        self.ml_engine = MLEngine()
        self.risk_engine = RiskEngine()
        self.user_risk_cache = {}  # Cache user risk scores

    def get_current_price(self, symbol: str) -> Optional[float]:

        """Fetch current price for a symbol."""
        try:
            ticker = yf.Ticker(symbol)
            hist = ticker.history(period="1d")
            if not hist.empty:
                return float(hist["Close"].iloc[-1])
        except Exception as e:
            print(f"Error fetching price for {symbol}: {e}")
        return None

    def generate_recommendation(self, symbol: str) -> TradeRecommendation:
        """Generate a single trade recommendation for a symbol."""
        try:
            prediction = self.ml_engine.predict(symbol)
            current_price = self.get_current_price(symbol)

            if not prediction or prediction.get("risk") == "unknown":
                return TradeRecommendation(
                    symbol=symbol,
                    action="HOLD",
                    reason="Insufficient data for recommendation",
                    confidence=0.0,
                    current_price=current_price
                )

            predicted_price = prediction.get("prediction", 0)
            risk_level = prediction.get("risk", "medium")
            confidence = prediction.get("confidence", 0.5)

            # Determine action based on prediction vs current
            if current_price and predicted_price:
                change_pct = ((predicted_price - current_price) / current_price) * 100

                # Thresholds based on risk
                if risk_level == "low":
                    threshold = 2.0
                elif risk_level == "medium":
                    threshold = 4.0
                else:
                    threshold = 8.0

                if change_pct > threshold:
                    action = "BUY"
                    reason = f"ML predicts {change_pct:.1f}% upside (threshold: {threshold}%)"
                elif change_pct < -threshold:
                    action = "SELL"
                    reason = f"ML predicts {abs(change_pct):.1f}% downside (threshold: {threshold}%)"
                else:
                    action = "HOLD"
                    reason = f"Price movement within neutral range ({change_pct:.1f}%)"
            else:
                action = "HOLD"
                reason = "Unable to compare prices"

            return TradeRecommendation(
                symbol=symbol,
                action=action,
                reason=reason,
                confidence=confidence,
                current_price=round(current_price, 2) if current_price else None,
                target_price=round(predicted_price, 2) if predicted_price else None,
                risk_level=risk_level
            )

        except Exception as e:
            return TradeRecommendation(
                symbol=symbol,
                action="HOLD",
                reason=f"Error generating recommendation: {str(e)}",
                confidence=0.0
            )

    def generate_rebalance_suggestions(
        self,
        symbols: List[str] = None,
        user_risk_data: Optional[RiskInput] = None
    ) -> AdvisoryResponse:
        """
        Generate rebalancing suggestions for a list of symbols.
        If user_risk_data is provided, filters recommendations by user risk compatibility.
        Does NOT execute any trades.
        """
        if symbols is None:
            symbols = ["RELIANCE.NS", "TCS.NS", "INFY.NS", "HDFCBANK.NS", "ICICIBANK.NS"]

        # Calculate user risk if provided
        user_risk_score = None
        user_risk_category = None
        if user_risk_data:
            try:
                risk_result = self.risk_engine.calculate_score(user_risk_data)
                user_risk_score = risk_result.get("score")
                user_risk_category = risk_result.get("risk_category")
                self.user_risk_cache[user_risk_data.profile.user_id] = risk_result
            except Exception as e:
                print(f"Error calculating user risk: {e}")

        recommendations = []

        for symbol in symbols:
            rec = self.generate_recommendation(symbol)
            
            # Check compatibility with user risk profile
            if user_risk_category and rec.risk_level:
                # High risk user can hold anything
                # Medium risk user should avoid high risk assets
                # Low risk user should only hold low risk assets
                risk_hierarchy = {"low": 1, "medium": 2, "high": 3}
                user_level = risk_hierarchy.get(user_risk_category, 2)
                asset_level = risk_hierarchy.get(rec.risk_level, 2)
                
                rec.user_risk_compatible = asset_level <= user_level
                
                # Modify recommendation if incompatible
                if not rec.user_risk_compatible and rec.action == "BUY":
                    rec.reason += f" [WARNING: Asset risk ({rec.risk_level}) exceeds your profile ({user_risk_category})]"
            
            # Only include actionable recommendations
            if rec.action != "HOLD" or rec.confidence > 0.7:
                recommendations.append(rec)

        return AdvisoryResponse(
            recommendations=[r.model_dump() for r in recommendations],
            user_risk_score=user_risk_score,
            user_risk_category=user_risk_category,
            note="No trades executed automatically. User action required.",
            generated_at=datetime.datetime.now().isoformat()
        )


    def check_stop_loss_alerts(
        self,
        positions: Dict[str, Dict[str, float]]
    ) -> AdvisoryResponse:
        """
        Check positions for stop-loss conditions and generate ALERTS (not sells).
        positions: {symbol: {qty, avg_price}}
        """
        recommendations = []

        for symbol, pos_data in positions.items():
            entry_price = pos_data.get("avg_price", 0)
            current_price = self.get_current_price(symbol)

            if not current_price or not entry_price:
                continue

            loss_pct = ((entry_price - current_price) / entry_price) * 100

            # Get risk level for threshold
            try:
                pred = self.ml_engine.predict(symbol)
                risk_level = pred.get("risk", "medium")
            except:
                risk_level = "medium"

            # SL thresholds
            if risk_level == "low":
                sl_threshold = 5.0
            elif risk_level == "medium":
                sl_threshold = 8.0
            else:
                sl_threshold = 12.0

            if loss_pct >= sl_threshold:
                recommendations.append(TradeRecommendation(
                    symbol=symbol,
                    action="SELL",
                    reason=f"ALERT: Stop-loss triggered ({loss_pct:.1f}% loss, threshold: {sl_threshold}%)",
                    confidence=0.95,
                    current_price=round(current_price, 2),
                    risk_level=risk_level
                ).model_dump())

        return AdvisoryResponse(
            recommendations=recommendations,
            note="Stop-loss ALERTS only. No automatic sells executed.",
            generated_at=datetime.datetime.now().isoformat()
        )
