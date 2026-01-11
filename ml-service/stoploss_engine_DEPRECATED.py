import json
import os
import datetime
from typing import Dict, List, Any, Optional
from pydantic import BaseModel, Field

# --- Models ---
class StopLossConfig(BaseModel):
    low_risk_sl: float = Field(default=5.0, description="Stop-loss % for low risk assets")
    medium_risk_sl: float = Field(default=8.0, description="Stop-loss % for medium risk assets")
    high_risk_sl: float = Field(default=12.0, description="Stop-loss % for high risk assets")
    confidence_tighten_threshold: float = Field(default=0.6, description="If confidence below this, tighten SL")
    confidence_loosen_threshold: float = Field(default=0.9, description="If confidence above this, loosen SL")
    tighten_adjustment: float = Field(default=2.0, description="% to tighten SL by")
    loosen_adjustment: float = Field(default=1.5, description="% to loosen SL by")
    cooldown_hours: int = Field(default=24, description="Hours to freeze symbol after SL trigger")

class StopLossEvent(BaseModel):
    symbol: str
    reason: str
    entry_price: float
    exit_price: float
    profit_pct: float
    sl_type: str  # static, dynamic, trailing
    triggered_at: str
    cooldown_until: str

# --- Stop-Loss Engine ---
class StopLossEngine:
    def __init__(self, data_file="stoploss_data.json"):
        self.data_file = data_file
        self.config = StopLossConfig()
        self.data = self.load_data()

    def load_data(self) -> Dict:
        if os.path.exists(self.data_file):
            try:
                with open(self.data_file, 'r') as f:
                    return json.load(f)
            except Exception as e:
                print(f"Error loading SL data: {e}")
        return {
            "peak_prices": {},      # symbol -> peak_price
            "cooldowns": {},        # symbol -> cooldown_until_iso
            "events": [],           # List of SL events
            "config": self.config.model_dump()
        }

    def save_data(self):
        try:
            with open(self.data_file, 'w') as f:
                json.dump(self.data, f, indent=4)
        except Exception as e:
            print(f"Error saving SL data: {e}")

    def update_config(self, new_config: StopLossConfig):
        self.config = new_config
        self.data["config"] = new_config.model_dump()
        self.save_data()

    def get_static_sl(self, risk_level: str) -> float:
        """Get base static SL based on risk level."""
        if risk_level == "low":
            return self.config.low_risk_sl
        elif risk_level == "medium":
            return self.config.medium_risk_sl
        else:
            return self.config.high_risk_sl

    def calculate_dynamic_sl(self, risk_level: str, confidence: float) -> float:
        """Calculate dynamic SL adjusted by ML confidence."""
        base_sl = self.get_static_sl(risk_level)
        
        if confidence < self.config.confidence_tighten_threshold:
            # Low confidence -> tighter SL (less loss allowed)
            adjusted_sl = base_sl - self.config.tighten_adjustment
        elif confidence > self.config.confidence_loosen_threshold:
            # High confidence -> looser SL (more room)
            adjusted_sl = base_sl + self.config.loosen_adjustment
        else:
            adjusted_sl = base_sl
        
        # Minimum SL is 2%
        return max(2.0, adjusted_sl)

    def update_peak_price(self, symbol: str, current_price: float):
        """Update peak price for trailing SL."""
        current_peak = self.data["peak_prices"].get(symbol, 0)
        if current_price > current_peak:
            self.data["peak_prices"][symbol] = current_price
            self.save_data()

    def get_peak_price(self, symbol: str, entry_price: float) -> float:
        """Get peak price, default to entry price if not tracked."""
        return self.data["peak_prices"].get(symbol, entry_price)

    def is_in_cooldown(self, symbol: str) -> bool:
        """Check if symbol is in cooldown period."""
        cooldown_until = self.data["cooldowns"].get(symbol)
        if cooldown_until:
            cooldown_dt = datetime.datetime.fromisoformat(cooldown_until)
            if datetime.datetime.now() < cooldown_dt:
                return True
            else:
                # Cooldown expired, remove it
                del self.data["cooldowns"][symbol]
                self.save_data()
        return False

    def get_cooldown_until(self, symbol: str) -> Optional[str]:
        """Get cooldown timestamp for a symbol."""
        return self.data["cooldowns"].get(symbol)

    def set_cooldown(self, symbol: str):
        """Set cooldown for a symbol after SL trigger."""
        cooldown_until = datetime.datetime.now() + datetime.timedelta(hours=self.config.cooldown_hours)
        self.data["cooldowns"][symbol] = cooldown_until.isoformat()
        self.save_data()

    def check_stop_loss(
        self,
        symbol: str,
        entry_price: float,
        current_price: float,
        risk_level: str,
        confidence: float
    ) -> Optional[Dict[str, Any]]:
        """
        Check if stop-loss should be triggered for a position.
        Returns event dict if triggered, None otherwise.
        """
        # Update peak price for trailing
        self.update_peak_price(symbol, current_price)
        peak_price = self.get_peak_price(symbol, entry_price)
        
        # Calculate thresholds
        dynamic_sl_pct = self.calculate_dynamic_sl(risk_level, confidence)
        
        # Check Static/Dynamic SL (from entry price)
        loss_from_entry = ((entry_price - current_price) / entry_price) * 100
        
        # Check Trailing SL (from peak price)
        loss_from_peak = ((peak_price - current_price) / peak_price) * 100
        
        triggered = False
        sl_type = None
        reason = None
        
        # Static/Dynamic SL Check
        if loss_from_entry >= dynamic_sl_pct:
            triggered = True
            sl_type = "dynamic" if confidence < 0.6 or confidence > 0.9 else "static"
            reason = f"Price dropped {loss_from_entry:.1f}% from entry (SL threshold: {dynamic_sl_pct:.1f}%)"
        
        # Trailing SL Check (using same threshold for simplicity)
        # Trailing is triggered if price drops significantly from peak
        elif loss_from_peak >= dynamic_sl_pct:
            triggered = True
            sl_type = "trailing"
            reason = f"Price dropped {loss_from_peak:.1f}% from peak ${peak_price:.2f} (SL threshold: {dynamic_sl_pct:.1f}%)"
        
        if triggered:
            profit_pct = ((current_price - entry_price) / entry_price) * 100
            cooldown_until = datetime.datetime.now() + datetime.timedelta(hours=self.config.cooldown_hours)
            
            event = {
                "symbol": symbol,
                "reason": reason,
                "entry_price": round(entry_price, 2),
                "exit_price": round(current_price, 2),
                "profit_pct": round(profit_pct, 2),
                "sl_type": sl_type,
                "triggered_at": datetime.datetime.now().isoformat(),
                "cooldown_until": cooldown_until.isoformat()
            }
            
            # Record event
            self.data["events"].insert(0, event)
            self.set_cooldown(symbol)
            
            # Clear peak price tracking
            if symbol in self.data["peak_prices"]:
                del self.data["peak_prices"][symbol]
            
            self.save_data()
            return event
        
        return None

    def check_all_positions(self, positions: Dict, ml_engine) -> List[Dict]:
        """
        Check SL for all positions. Returns list of triggered events.
        positions: {symbol: {qty, avg_price}}
        ml_engine: MLEngine instance for fetching current prices and predictions
        """
        import yfinance as yf
        
        triggered_events = []
        
        for symbol, pos_data in positions.items():
            if self.is_in_cooldown(symbol):
                continue
            
            entry_price = pos_data["avg_price"]
            
            try:
                # Get current price
                ticker = yf.Ticker(symbol)
                hist = ticker.history(period="1d")
                if hist.empty:
                    continue
                current_price = hist["Close"].iloc[-1]
                
                # Get prediction for risk/confidence
                pred = ml_engine.predict(symbol)
                risk_level = pred.get("risk", "medium")
                confidence = pred.get("confidence", 0.7)
                
                event = self.check_stop_loss(
                    symbol=symbol,
                    entry_price=entry_price,
                    current_price=current_price,
                    risk_level=risk_level,
                    confidence=confidence
                )
                
                if event:
                    triggered_events.append(event)
                    print(f"[SL TRIGGERED] {symbol}: {event['reason']}")
                    
            except Exception as e:
                print(f"Error checking SL for {symbol}: {e}")
        
        return triggered_events

    def get_status(self) -> Dict:
        """Get current SL engine status."""
        return {
            "config": self.data["config"],
            "active_cooldowns": self.data["cooldowns"],
            "peak_prices": self.data["peak_prices"],
            "recent_events": self.data["events"][:10]  # Last 10 events
        }

    def get_analytics(self) -> Dict:
        """Compute SL analytics (avg loss saved etc.)."""
        events = self.data["events"]
        if not events:
            return {"total_events": 0, "avg_loss": 0, "message": "No SL events recorded yet."}
        
        total_loss = sum(e["profit_pct"] for e in events)
        avg_loss = total_loss / len(events)
        
        return {
            "total_events": len(events),
            "avg_loss_pct": round(avg_loss, 2),
            "events_by_type": {
                "static": sum(1 for e in events if e["sl_type"] == "static"),
                "dynamic": sum(1 for e in events if e["sl_type"] == "dynamic"),
                "trailing": sum(1 for e in events if e["sl_type"] == "trailing"),
            }
        }
