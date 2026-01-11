"""
Mutual Fund Engine - Advisory Mode Only

Handles mutual fund data, NAV fetching, ranking, SIP calculations,
and goal-based portfolio recommendations.
"""

import json
import os
import datetime
from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field
import requests

# --- Input/Output Models ---

class SIPInput(BaseModel):
    monthly_amount: float = Field(..., ge=500, description="Monthly SIP amount in INR")
    goal_years: int = Field(..., ge=1, le=40, description="Investment duration in years")
    risk: str = Field(..., pattern="^(low|medium|high)$", description="Risk preference")

class FundAllocation(BaseModel):
    scheme_code: str
    scheme_name: str
    category: str
    allocation_percent: float
    expected_cagr: float

class SIPProjection(BaseModel):
    recommended_funds: List[FundAllocation]
    monthly_amount: float
    total_months: int
    expected_corpus: float
    expected_cagr: float
    best_case_corpus: float
    worst_case_corpus: float
    best_case_cagr: float
    worst_case_cagr: float
    total_invested: float

class GoalPortfolio(BaseModel):
    goal_type: str
    description: str
    risk_level: str
    time_horizon_years: str
    funds: List[FundAllocation]
    expected_cagr: float

# --- NAV Cache ---

class NAVCache:
    """Simple in-memory NAV cache with daily expiry."""
    
    def __init__(self):
        self.cache: Dict[str, Dict] = {}
        self.cache_date: Optional[str] = None
    
    def get(self, scheme_code: str) -> Optional[Dict]:
        today = datetime.date.today().isoformat()
        if self.cache_date != today:
            self.cache = {}
            self.cache_date = today
        return self.cache.get(scheme_code)
    
    def set(self, scheme_code: str, data: Dict):
        today = datetime.date.today().isoformat()
        if self.cache_date != today:
            self.cache = {}
            self.cache_date = today
        self.cache[scheme_code] = data


# --- Main Engine ---

class MFEngine:
    """
    Mutual Fund Engine for advisory recommendations.
    No trades executed - advisory only.
    """
    
    AMFI_NAV_URL = "https://www.amfiindia.com/spages/NAVAll.txt"
    
    # Weight configuration for fund ranking
    RANKING_WEIGHTS = {
        "cagr_3yr": 0.40,
        "volatility": 0.25,  # Lower is better
        "rolling_score": 0.20,
        "expense_ratio": 0.10,  # Lower is better
        "aum": 0.05
    }
    
    # Goal portfolio configurations
    GOAL_CONFIGS = {
        "retirement": {
            "description": "Long-term wealth accumulation for retirement",
            "risk_level": "medium",
            "time_horizon": "15-30 years",
            "allocation": {
                "Large Cap": 30,
                "Flexi Cap": 25,
                "Mid Cap": 20,
                "Small Cap": 10,
                "Debt": 15
            }
        },
        "house": {
            "description": "Save for down payment on a house",
            "risk_level": "medium",
            "time_horizon": "5-10 years",
            "allocation": {
                "Large Cap": 35,
                "Flexi Cap": 25,
                "Hybrid": 25,
                "Debt": 15
            }
        },
        "education": {
            "description": "Fund children's higher education",
            "risk_level": "medium",
            "time_horizon": "10-15 years",
            "allocation": {
                "Large Cap": 30,
                "Flexi Cap": 30,
                "Mid Cap": 20,
                "ELSS": 10,
                "Debt": 10
            }
        },
        "vacation": {
            "description": "Save for a dream vacation",
            "risk_level": "low",
            "time_horizon": "1-3 years",
            "allocation": {
                "Liquid": 40,
                "Debt": 35,
                "Hybrid": 25
            }
        },
        "wedding": {
            "description": "Save for wedding expenses",
            "risk_level": "medium",
            "time_horizon": "3-5 years",
            "allocation": {
                "Hybrid": 35,
                "Large Cap": 25,
                "Debt": 25,
                "Liquid": 15
            }
        },
        "emergency": {
            "description": "Build emergency fund corpus",
            "risk_level": "low",
            "time_horizon": "1-2 years",
            "allocation": {
                "Liquid": 60,
                "Debt": 40
            }
        }
    }
    
    def __init__(self):
        self.nav_cache = NAVCache()
        self.funds_data: List[Dict] = []
        self._load_master_data()
    
    def _load_master_data(self):
        """Load mutual fund master data from JSON file."""
        data_path = os.path.join(os.path.dirname(__file__), "data", "mf", "mf_master.json")
        try:
            with open(data_path, "r") as f:
                self.funds_data = json.load(f)
            print(f"[MFEngine] Loaded {len(self.funds_data)} mutual funds from master data")
        except Exception as e:
            print(f"[MFEngine] Error loading master data: {e}")
            self.funds_data = []
    
    def get_fund_list(self, category: str = None, risk: str = None) -> List[Dict]:
        """
        Get list of mutual funds with optional filters.
        """
        result = self.funds_data.copy()
        
        if category:
            result = [f for f in result if f.get("category", "").lower() == category.lower()]
        
        if risk:
            result = [f for f in result if f.get("risk_level", "").lower() == risk.lower()]
        
        # Return essential fields only
        return [
            {
                "scheme_code": f["scheme_code"],
                "scheme_name": f["scheme_name"],
                "category": f["category"],
                "risk_level": f["risk_level"],
                "amc": f.get("amc", ""),
                "cagr_3yr": f.get("cagr_3yr", 0),
                "expense_ratio": f.get("expense_ratio", 0)
            }
            for f in result
        ]
    
    def fetch_nav(self, scheme_code: str) -> Dict:
        """
        Fetch current NAV for a scheme.
        Primary: AMFI API, Fallback: cached/estimated data
        """
        # Check cache first
        cached = self.nav_cache.get(scheme_code)
        if cached:
            return cached
        
        # Try to fetch from AMFI
        try:
            nav_data = self._fetch_amfi_nav(scheme_code)
            if nav_data:
                self.nav_cache.set(scheme_code, nav_data)
                return nav_data
        except Exception as e:
            print(f"[MFEngine] AMFI fetch error for {scheme_code}: {e}")
        
        # Fallback: Use master data estimate
        fund = next((f for f in self.funds_data if f["scheme_code"] == scheme_code), None)
        if fund:
            fallback_data = {
                "scheme_code": scheme_code,
                "scheme_name": fund["scheme_name"],
                "nav_value": self._estimate_nav(fund),
                "nav_date": datetime.date.today().isoformat(),
                "source": "estimated"
            }
            self.nav_cache.set(scheme_code, fallback_data)
            return fallback_data
        
        return {"error": f"Scheme {scheme_code} not found"}
    
    def _fetch_amfi_nav(self, scheme_code: str) -> Optional[Dict]:
        """Fetch NAV from AMFI text file."""
        try:
            response = requests.get(self.AMFI_NAV_URL, timeout=10)
            if response.status_code != 200:
                return None
            
            lines = response.text.strip().split("\n")
            for line in lines:
                if scheme_code in line:
                    parts = line.split(";")
                    if len(parts) >= 5:
                        return {
                            "scheme_code": parts[0].strip(),
                            "scheme_name": parts[3].strip() if len(parts) > 3 else "",
                            "nav_value": float(parts[4].strip()) if parts[4].strip() else 0,
                            "nav_date": parts[5].strip() if len(parts) > 5 else datetime.date.today().isoformat(),
                            "source": "amfi"
                        }
            return None
        except Exception as e:
            print(f"[MFEngine] AMFI API error: {e}")
            return None
    
    def _estimate_nav(self, fund: Dict) -> float:
        """Estimate NAV based on fund category (for fallback only)."""
        category_base = {
            "Large Cap": 85.0,
            "Mid Cap": 120.0,
            "Small Cap": 95.0,
            "Flexi Cap": 55.0,
            "ELSS": 110.0,
            "Liquid": 3500.0,
            "Debt": 45.0,
            "Hybrid": 75.0,
            "International": 35.0,
            "Commodities": 22.0
        }
        base = category_base.get(fund.get("category", ""), 50.0)
        # Add some variance based on scheme code
        variance = hash(fund["scheme_code"]) % 20 - 10
        return round(base + variance, 2)
    
    def rank_funds(self, risk_level: str, top_n: int = 10) -> List[Dict]:
        """
        Rank and return top N funds for a risk category.
        Uses weighted scoring based on multiple factors.
        """
        # Filter by risk level
        candidates = [f for f in self.funds_data if f.get("risk_level", "").lower() == risk_level.lower()]
        
        if not candidates:
            return []
        
        # Calculate composite scores
        scored_funds = []
        for fund in candidates:
            score = self._calculate_fund_score(fund, candidates)
            scored_funds.append({
                "scheme_code": fund["scheme_code"],
                "scheme_name": fund["scheme_name"],
                "category": fund["category"],
                "cagr_3yr": fund.get("cagr_3yr", 0),
                "volatility": fund.get("volatility", 0),
                "expense_ratio": fund.get("expense_ratio", 0),
                "aum_cr": fund.get("aum_cr", 0),
                "score": round(score, 2)
            })
        
        # Sort by score descending
        scored_funds.sort(key=lambda x: x["score"], reverse=True)
        
        return scored_funds[:top_n]
    
    def _calculate_fund_score(self, fund: Dict, all_funds: List[Dict]) -> float:
        """
        Calculate weighted score for fund ranking.
        Normalizes each metric relative to peers.
        """
        # Get max/min values for normalization
        max_cagr = max(f.get("cagr_3yr", 0) for f in all_funds) or 1
        max_volatility = max(f.get("volatility", 1) for f in all_funds) or 1
        max_rolling = max(f.get("rolling_score", 0) for f in all_funds) or 1
        max_expense = max(f.get("expense_ratio", 1) for f in all_funds) or 1
        max_aum = max(f.get("aum_cr", 0) for f in all_funds) or 1
        
        # Normalize scores (0-100 scale)
        cagr_score = (fund.get("cagr_3yr", 0) / max_cagr) * 100
        volatility_score = (1 - fund.get("volatility", max_volatility) / max_volatility) * 100  # Lower is better
        rolling_score = (fund.get("rolling_score", 0) / max_rolling) * 100
        expense_score = (1 - fund.get("expense_ratio", max_expense) / max_expense) * 100  # Lower is better
        aum_score = (fund.get("aum_cr", 0) / max_aum) * 100
        
        # Weighted composite
        weights = self.RANKING_WEIGHTS
        total_score = (
            cagr_score * weights["cagr_3yr"] +
            volatility_score * weights["volatility"] +
            rolling_score * weights["rolling_score"] +
            expense_score * weights["expense_ratio"] +
            aum_score * weights["aum"]
        )
        
        return total_score
    
    def calculate_sip_projection(self, input_data: SIPInput) -> SIPProjection:
        """
        Calculate SIP projection with fund allocation.
        Returns recommended funds and corpus projections.
        """
        monthly = input_data.monthly_amount
        years = input_data.goal_years
        risk = input_data.risk
        months = years * 12
        
        # Get recommended funds based on risk
        recommended_funds = self._get_sip_allocation(risk)
        
        # Calculate weighted average CAGR
        expected_cagr = sum(f.expected_cagr * f.allocation_percent / 100 for f in recommended_funds)
        
        # Calculate projections
        expected_corpus = self._calculate_sip_corpus(monthly, months, expected_cagr)
        
        # Best case: +3% CAGR
        best_cagr = expected_cagr + 3
        best_corpus = self._calculate_sip_corpus(monthly, months, best_cagr)
        
        # Worst case: -3% CAGR (but minimum 4%)
        worst_cagr = max(expected_cagr - 3, 4)
        worst_corpus = self._calculate_sip_corpus(monthly, months, worst_cagr)
        
        return SIPProjection(
            recommended_funds=recommended_funds,
            monthly_amount=monthly,
            total_months=months,
            expected_corpus=round(expected_corpus, 2),
            expected_cagr=round(expected_cagr, 2),
            best_case_corpus=round(best_corpus, 2),
            worst_case_corpus=round(worst_corpus, 2),
            best_case_cagr=round(best_cagr, 2),
            worst_case_cagr=round(worst_cagr, 2),
            total_invested=monthly * months
        )
    
    def _get_sip_allocation(self, risk: str) -> List[FundAllocation]:
        """Get recommended fund allocation based on risk level."""
        allocations = []
        
        if risk == "low":
            # Conservative: Mostly debt and large cap
            categories = [
                ("Large Cap", 35),
                ("Debt", 30),
                ("Hybrid", 20),
                ("Liquid", 15)
            ]
        elif risk == "medium":
            # Balanced: Mix of equity and debt
            categories = [
                ("Flexi Cap", 30),
                ("Large Cap", 25),
                ("Mid Cap", 20),
                ("Hybrid", 15),
                ("Debt", 10)
            ]
        else:  # high
            # Aggressive: Equity focused
            categories = [
                ("Flexi Cap", 25),
                ("Mid Cap", 30),
                ("Small Cap", 25),
                ("Large Cap", 20)
            ]
        
        for category, allocation in categories:
            # Get top fund from each category
            category_funds = [f for f in self.funds_data if f.get("category") == category]
            if category_funds:
                # Pick the one with highest rolling score
                best_fund = max(category_funds, key=lambda x: x.get("rolling_score", 0))
                allocations.append(FundAllocation(
                    scheme_code=best_fund["scheme_code"],
                    scheme_name=best_fund["scheme_name"],
                    category=category,
                    allocation_percent=allocation,
                    expected_cagr=best_fund.get("cagr_3yr", 10)
                ))
        
        return allocations
    
    def _calculate_sip_corpus(self, monthly: float, months: int, annual_return: float) -> float:
        """
        Calculate SIP future value using compound interest formula.
        FV = P × [{(1 + r)^n – 1} / r] × (1 + r)
        """
        if annual_return <= 0:
            return monthly * months
        
        monthly_rate = annual_return / 100 / 12
        fv = monthly * (((1 + monthly_rate) ** months - 1) / monthly_rate) * (1 + monthly_rate)
        return fv
    
    def get_goal_portfolio(self, goal_type: str) -> Optional[GoalPortfolio]:
        """
        Get predefined portfolio for a specific goal.
        """
        goal_config = self.GOAL_CONFIGS.get(goal_type.lower())
        if not goal_config:
            return None
        
        # Build fund allocations based on goal config
        allocations = []
        total_cagr = 0
        
        for category, percent in goal_config["allocation"].items():
            # Get best fund from category
            category_funds = [f for f in self.funds_data if f.get("category") == category]
            if category_funds:
                best_fund = max(category_funds, key=lambda x: x.get("rolling_score", 0))
                allocations.append(FundAllocation(
                    scheme_code=best_fund["scheme_code"],
                    scheme_name=best_fund["scheme_name"],
                    category=category,
                    allocation_percent=percent,
                    expected_cagr=best_fund.get("cagr_3yr", 8)
                ))
                total_cagr += best_fund.get("cagr_3yr", 8) * percent / 100
        
        return GoalPortfolio(
            goal_type=goal_type,
            description=goal_config["description"],
            risk_level=goal_config["risk_level"],
            time_horizon_years=goal_config["time_horizon"],
            funds=allocations,
            expected_cagr=round(total_cagr, 2)
        )
    
    def get_all_goals(self) -> List[Dict]:
        """Return list of all available goal types."""
        return [
            {
                "goal_type": key,
                "description": config["description"],
                "risk_level": config["risk_level"],
                "time_horizon": config["time_horizon"]
            }
            for key, config in self.GOAL_CONFIGS.items()
        ]
    
    def get_mf_recommendation_for_advisory(self, risk: str = "medium") -> Dict:
        """
        Get MF recommendations to include in /advisor/full response.
        """
        top_funds = self.rank_funds(risk, top_n=5)
        goal_options = self.get_all_goals()
        
        return {
            "mutual_funds": {
                "top_recommendations": top_funds,
                "goal_options": goal_options,
                "note": "Visit /mf for detailed fund explorer, /sip for SIP planner"
            }
        }
