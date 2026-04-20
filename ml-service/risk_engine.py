import os
import json
import logging
import datetime
import redis
from pydantic import BaseModel, Field
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

# --- Input Models ---
class ProfileInput(BaseModel):
    user_id: str
    age: int = Field(..., ge=18, le=120)
    monthly_income: float = Field(..., ge=0)
    savings_rate: float = Field(..., ge=0, le=100, description="Percentage of income saved (0-100)")
    investment_experience_years: float = Field(..., ge=0)
    debt_burden_ratio: float = Field(..., ge=0, le=100, description="Debt payments as % of income (0-100)")
    dependents_count: int = Field(..., ge=0)

class BehavioralInput(BaseModel):
    expense_volatility: float = Field(..., description="Standard deviation of monthly expenses normalized (0-1 approx)")
    panic_sell_events: int = Field(..., ge=0, description="Number of times user panic sold during dips")
    time_horizon_years: float = Field(..., ge=0.5, description="Investment horizon in years")
    cash_maintained_percentage: float = Field(..., ge=0, le=100, description="Average % of portfolio kept as cash")

class PortfolioInput(BaseModel):
    current_risk_allocation: str = Field(..., pattern="^(low|medium|high)$")
    past_return_volatility: float = Field(..., ge=0, description="Annualized volatility of past portfolio")
    max_drawdown_percent: float = Field(..., ge=0, le=100, description="Max drawdown experienced in last 3-6 months")

class RiskInput(BaseModel):
    profile: ProfileInput
    behavior: BehavioralInput
    portfolio: PortfolioInput

# --- Risk Engine ---
class RiskEngine:
    def __init__(self):
        self.redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")
        self.postgres_url = os.getenv("POSTGRES_URL", "postgresql://user:password@localhost:5432/wealth_db")
        self.connect_storage()

    def connect_storage(self):
        try:
            self.redis_client = redis.from_url(self.redis_url)
        except Exception as e:
            print(f"Warning: Redis connection failed: {e}")
            self.redis_client = None

        # Postgres connection is usually created per request or via pool, 
        # for simplicity we'll just check if we can connect or store it for simple usage.
        # In production, use a connection pool (e.g., SQLAlchemy or psycopg2.pool).
        self.pg_conn = None # We will connect on demand to avoid stale connections

    def get_pg_connection(self):
        try:
            import psycopg2  # Optional dependency — only needed if POSTGRES_URL is configured
            if not self.pg_conn or self.pg_conn.closed:
                self.pg_conn = psycopg2.connect(self.postgres_url)
            return self.pg_conn
        except ImportError:
            logger.warning("psycopg2 not installed. Postgres persistence disabled.")
            return None
        except Exception as e:
            logger.warning(f"Postgres connection failed: {e}")
            return None

    def calculate_score(self, data: RiskInput) -> Dict[str, Any]:
        """
        Calculates the risk score (0-100) based on weighted factors.
        """
        # 1. Normalize Features (Score 0-10 where 10 is Highest Risk Tolerance/Capacity)
        
        # Age: Younger = Higher Risk Capacity
        # 20yo -> 10, 60yo -> 2
        age_score = max(0, 10 - ((data.profile.age - 20) / 4))
        
        # Savings Rate: Higher = Higher Capacity
        # 50% -> 10, 0% -> 0
        savings_score = min(10, data.profile.savings_rate / 5)
        
        # Debt Burden: Higher Debt = Lower Capacity
        # 0% -> 10, 50% -> 0
        debt_score = max(0, 10 - (data.profile.debt_burden_ratio / 5))
        
        # Experience: More Years = Higher Tolerance
        # 10y -> 10, 0y -> 2
        exp_score = min(10, 2 + data.profile.investment_experience_years)

        # Time Horizon: Longer = Higher Capacity
        # 20y -> 10, 1y -> 1
        time_score = min(10, data.behavior.time_horizon_years / 2)
        
        # Panic Sells: More = Lower Tolerance
        # 0 -> 10, 5 -> 0
        behavior_penalty = data.behavior.panic_sell_events * 2
        behavior_score = max(0, 10 - behavior_penalty)

        # Portfolio Volatility (Tolerance check)
        # If user holds volatile assets, they imply higher tolerance
        # But if max_drawdown is high and they panic, it matches.
        # Here we define Score as "Recommended Risk Level"
        # If they ALREADY have high volatility, it doesn't mean they SHOULD.
        # So we base the score heavily on capacity (Financials) + Psychology (Behavior).
        
        # Weights (Sum = 100)
        # Financial Capacity (50%)
        # Age: 10
        # Savings: 15
        # Debt: 15
        # Income/Dependents (simplified into Experience/Savings for now? Let's add Dep penalty)
        
        dep_penalty = data.profile.dependents_count * 1 # -1 per dependent from raw score?
        
        # Behavioral/Psychological Tolerance (50%)
        # Experience: 15
        # Time Horizon: 15
        # Past Behavior (Panic): 20
        
        # Weighted Sum calculation
        raw_score = (
            (age_score * 1.0) +          # 0-10 * 1.0 = 10
            (savings_score * 1.5) +      # 0-10 * 1.5 = 15
            (debt_score * 1.5) +         # 0-10 * 1.5 = 15
            (exp_score * 1.5) +          # 0-10 * 1.5 = 15
            (time_score * 1.5) +         # 0-10 * 1.5 = 15
            (behavior_score * 2.0)       # 0-10 * 2.0 = 20
        ) 
        # Total Max = 10 + 15 + 15 + 15 + 15 + 20 = 90. wait, let's adjust to 100.
        # Let's boost weights slightly.
        # Age: 1.0 -> 10
        # Savings: 2.0 -> 20
        # Debt: 1.0 -> 10
        # Exp: 1.5 -> 15
        # Time: 1.5 -> 15
        # Behavior: 2.0 -> 20
        # Sum = 90. Add 10 baseline? or Portfolio input?
        # Portfolio Max Drawdown tolerance implies ability to withstand.
        # Let's add "Drawdown Resilience"
        
        # If they have high drawdown and NO panic sells, that's +Risk Tolerance.
        # 0-10 score based on drawdown
        dd_resilience = 0
        if data.portfolio.max_drawdown_percent > 10 and data.behavior.panic_sell_events == 0:
            dd_resilience = 5
        elif data.portfolio.max_drawdown_percent > 20 and data.behavior.panic_sell_events == 0:
            dd_resilience = 10
            
        final_score = (
            (age_score * 1.0) +        # 10
            (savings_score * 2.0) +    # 20
            (debt_score * 1.0) +       # 10
            (exp_score * 1.5) +        # 15
            (time_score * 1.5) +       # 15
            (behavior_score * 2.0) +   # 20
            (dd_resilience * 1.0)      # 10
        )
        # Max possible = 100
        
        # Apply Dependent Penalty
        final_score -= (data.profile.dependents_count * 2)
        
        # Clip
        final_score = max(0, min(100, final_score))
        
        # Categorize
        if final_score < 40:
            category = "low"
        elif final_score < 70:
            category = "medium"
        else:
            category = "high"
            
        # Analysis strings
        analysis = self.generate_analysis(data, final_score, category)
        
        result = {
            "score": round(final_score, 1),
            "risk_category": category,
            "analysis": analysis,
            "timestamp": datetime.datetime.now().isoformat()
        }
        
        # Save asynchronously (fire and forget logic in main, or here)
        self.save_score(data.profile.user_id, result)
        
        return result

    def generate_analysis(self, data: RiskInput, score, category):
        strengths = []
        weaknesses = []
        
        if data.profile.savings_rate > 30:
            strengths.append("Strong savings rate")
        elif data.profile.savings_rate < 10:
            weaknesses.append("Low savings buffer")
            
        if data.behavior.time_horizon_years > 5:
            strengths.append("Long investment horizon")
        else:
            weaknesses.append("Short time horizon limits options")
            
        if data.behavior.panic_sell_events > 0:
            weaknesses.append("History of panic selling")
            
        return {
            "summary": f"User is suited for {category} risk portfolios.",
            "strengths": strengths,
            "weaknesses": weaknesses
        }

    def save_score(self, user_id, result):
        # Redis
        if self.redis_client:
            try:
                self.redis_client.set(f"user_risk:{user_id}", json.dumps(result))
            except Exception as e:
                print(f"Redis save error: {e}")

        # Postgres
        conn = self.get_pg_connection()
        if conn:
            try:
                with conn.cursor() as cur:
                    cur.execute("""
                        CREATE TABLE IF NOT EXISTS user_risk_scores (
                            id SERIAL PRIMARY KEY,
                            user_id VARCHAR(50),
                            score FLOAT,
                            category VARCHAR(20),
                            created_at TIMESTAMP
                        )
                    """)
                    cur.execute("""
                        INSERT INTO user_risk_scores (user_id, score, category, created_at)
                        VALUES (%s, %s, %s, %s)
                    """, (user_id, result["score"], result["risk_category"], result["timestamp"]))
                    conn.commit()
            except Exception as e:
                print(f"Postgres save error: {e}")
                if conn:
                    conn.rollback()

