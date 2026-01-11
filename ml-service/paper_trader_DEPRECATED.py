import json
import os
import datetime
from ml_engine import MLEngine

class PaperTrader:
    def __init__(self, data_file="paper_portfolio.json", initial_balance=100000.0):
        self.data_file = data_file
        self.initial_balance = initial_balance
        self.ml_engine = MLEngine()
        self.portfolio = self.load_portfolio()

    def load_portfolio(self):
        if os.path.exists(self.data_file):
            try:
                with open(self.data_file, 'r') as f:
                    return json.load(f)
            except Exception as e:
                print(f"Error loading portfolio: {e}")
        
        return {
            "balance": self.initial_balance,
            "positions": {},  # symbol -> {qty, avg_price}
            "history": [],
            "last_run": None,
            "performance": {"total_pnl": 0.0, "win_rate": 0.0}
        }

    def save_portfolio(self):
        try:
            with open(self.data_file, 'w') as f:
                json.dump(self.portfolio, f, indent=4)
        except Exception as e:
            print(f"Error saving portfolio: {e}")

    def reset_portfolio(self):
        self.portfolio = {
            "balance": self.initial_balance,
            "positions": {},
            "history": [],
            "last_run": None,
            "performance": {"total_pnl": 0.0, "win_rate": 0.0}
        }
        self.save_portfolio()
        return self.portfolio

    def get_portfolio_state(self):
        # Calculate current value based on latest prices
        total_value = self.portfolio["balance"]
        positions_value = 0.0
        
        current_positions = []
        for symbol, data in self.portfolio["positions"].items():
            qty = data["qty"]
            # Get real-time price for valuation
            try:
                # Optimized: We might want a lighter weight call just for price, 
                # but predict() gives us price too.
                pred = self.ml_engine.predict(symbol)
                # predict returns a dict with 'prediction' and we can assume 'last_price' logic
                # Actually ml_engine.predict calculates return based on last price in dataframe
                # Let's extract specific price from ml_engine if possible or use prediction base
                # For valuation, let's use the 'last_price' which ml_engine generally has internally
                # but doesn't expose directly in 'predict' response easily without modification.
                # However, the range 'low'/'high' is based on prediction. 
                # A better way: The predict result usually acts as a proxy.
                # Let's use the prediction itself as a rough proxy for current value if live price isn't separate,
                # OR better: use yfinance to get latest price.
                # For simulation speed, we might trust the 'last_price' that was used for prediction.
                # Let's inspect ml_engine logic again. 
                # It uses: last_price = float(full_df['Close'].iloc[-1])
                # We can't easily access that without calling predict again.
                # Let's assume prediction result has some current price info or we fetch it.
                # Response has: { "symbol", "risk", "prediction", "range", ... }
                # It doesn't yield current price explicitly. 
                # We will re-fetch simply or assume prediction ~ current price for paper valuation if lazy.
                # Correct approach: Fetch real price.
                import yfinance as yf
                ticker = yf.Ticker(symbol)
                # fast fetch
                hist = ticker.history(period="1d")
                if not hist.empty:
                    current_price = hist["Close"].iloc[-1]
                else:
                    current_price = data["avg_price"] # Fallback
            except:
                current_price = data["avg_price"]

            pos_val = qty * current_price
            positions_value += pos_val
            
            current_positions.append({
                "symbol": symbol,
                "qty": qty,
                "avg_price": data["avg_price"],
                "current_price": round(current_price, 2),
                "current_value": round(pos_val, 2),
                "pnl": round(pos_val - (qty * data["avg_price"]), 2),
                "pnl_pct": round(((current_price - data["avg_price"]) / data["avg_price"]) * 100, 2)
            })
            
        total_value += positions_value
        
        profit_pct = ((total_value - self.initial_balance) / self.initial_balance) * 100
        
        return {
            "balance": round(self.portfolio["balance"], 2),
            "positions_value": round(positions_value, 2),
            "total_portfolio_value": round(total_value, 2),
            "profit_pct": round(profit_pct, 2),
            "positions": current_positions,
            "last_run": self.portfolio["last_run"]
        }

    def execute_trade_cycle(self, symbols=["RELIANCE.NS", "TCS.NS", "INFY.NS", "HDFCBANK.NS", "ICICIBANK.NS"]):
        # Max 5 symbols per run
        symbols = symbols[:5]
        trades_executed = []
        
        print(f"Running paper trade cycle for: {symbols}")
        
        for symbol in symbols:
            try:
                # 1. Get Prediction
                result = self.ml_engine.predict(symbol)
                if not result or result.get("risk") == "unknown":
                    continue
                
                # We need current price. 
                # Since ml_engine.predict returns a prediction based on 'last_price' (implied),
                # but doesn't return Is. Let's fetch it for accuracy.
                # Optimization request: ml_engine could return last_price.
                import yfinance as yf
                ticker = yf.Ticker(symbol)
                hist = ticker.history(period="1d")
                if hist.empty:
                    continue
                current_price = hist["Close"].iloc[-1]
                
                predicted_price = result["prediction"]
                risk_level = result["risk"]
                
                # 2. Determine Thresholds
                # Low: 2%, Medium: 4%, High: 8%
                if risk_level == "low":
                    threshold = 0.02
                elif risk_level == "medium":
                    threshold = 0.04
                else:
                    threshold = 0.08
                
                # 3. Generate Signal
                signal = "HOLD"
                if predicted_price > current_price * (1 + threshold):
                    signal = "BUY"
                elif predicted_price < current_price * (1 - threshold):
                    signal = "SELL"
                
                if signal == "HOLD":
                    continue
                    
                # 4. Execute Logic
                trade_details = None
                
                if signal == "BUY":
                    # Check cash
                    available_cash = self.portfolio["balance"]
                    # Rule: Keep 20% buffer? Or just trade 10% of total portfolio?
                    # Rule: "Buy 10% of portfolio cash"
                    trade_amt = available_cash * 0.10
                    
                    # Minimum cash buffer check (20% of initial)
                    if available_cash - trade_amt < (self.initial_balance * 0.20):
                        print(f"Skipping BUY {symbol}: Insufficient cash buffer.")
                        continue
                        
                    qty = int(trade_amt / current_price)
                    if qty > 0:
                        cost = qty * current_price
                        self.portfolio["balance"] -= cost
                        
                        # Update position
                        if symbol in self.portfolio["positions"]:
                            old_qty = self.portfolio["positions"][symbol]["qty"]
                            old_avg = self.portfolio["positions"][symbol]["avg_price"]
                            new_qty = old_qty + qty
                            new_avg = ((old_qty * old_avg) + cost) / new_qty
                            self.portfolio["positions"][symbol] = {"qty": new_qty, "avg_price": new_avg}
                        else:
                            self.portfolio["positions"][symbol] = {"qty": qty, "avg_price": current_price}
                            
                        trade_details = {
                            "action": "BUY",
                            "qty": qty,
                            "price": current_price,
                            "total": cost
                        }
                        
                elif signal == "SELL":
                    if symbol in self.portfolio["positions"]:
                        current_qty = self.portfolio["positions"][symbol]["qty"]
                        # Rule: Liquidate 25% of holdings
                        sell_qty = int(current_qty * 0.25)
                        
                        if sell_qty > 0:
                            proceeds = sell_qty * current_price
                            self.portfolio["balance"] += proceeds
                            
                            remaining_qty = current_qty - sell_qty
                            if remaining_qty == 0:
                                del self.portfolio["positions"][symbol]
                            else:
                                self.portfolio["positions"][symbol]["qty"] = remaining_qty
                                # avg price doesn't change on sell
                            
                            trade_details = {
                                "action": "SELL",
                                "qty": sell_qty,
                                "price": current_price,
                                "total": proceeds
                            }
                
                if trade_details:
                    event = {
                        "timestamp": datetime.datetime.now().isoformat(),
                        "symbol": symbol,
                        "signal": signal,
                        "predicted": round(predicted_price, 2),
                        "actual": round(current_price, 2),
                        "risk": risk_level,
                        **trade_details
                    }
                    self.portfolio["history"].insert(0, event) # Newest first
                    trades_executed.append(event)
                    print(f"Executed {signal} for {symbol}")
                    
            except Exception as e:
                print(f"Error processing {symbol}: {e}")
                
        self.portfolio["last_run"] = datetime.datetime.now().isoformat()
        self.save_portfolio()
        return trades_executed
