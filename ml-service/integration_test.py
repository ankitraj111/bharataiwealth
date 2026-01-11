import requests
import json
import sys

BASE_URL = "http://localhost:8000"

def run_tests():
    print("Starting ML Service Integration Tests...")
    
    # 1. Health
    try:
        health = requests.get(f"{BASE_URL}/health").json()
        print("[PASS] Health check")
    except:
        print("[FAIL] Health check")
        return

    # 2. Risk Score
    risk_payload = {
        "profile": {"user_id": "u1", "age": 30, "monthly_income": 50000, "savings_rate": 20, "investment_experience_years": 3, "debt_burden_ratio": 20, "dependents_count": 1},
        "behavior": {"expense_volatility": 0.5, "panic_sell_events": 0, "time_horizon_years": 5, "cash_maintained_percentage": 10},
        "portfolio": {"current_risk_allocation": "medium", "past_return_volatility": 15, "max_drawdown_percent": 10}
    }
    risk_resp = requests.post(f"{BASE_URL}/risk-score", json=risk_payload).json()
    print(f"[PASS] Risk Score: {risk_resp['score']} ({risk_resp['risk_category']})")

    # 3. Unified Advisory
    print("Fetching personalized recommendations (Unified Endpoint)...")
    full_resp = requests.post(f"{BASE_URL}/advisor/full", json=risk_payload).json()
    print(f"[PASS] Unified Advisory: {len(full_resp['recommendations'])} items found")
    
    print("\nAdvisory Highlights:")
    for rec in full_resp['recommendations'][:2]:
        status = "COMPATIBLE" if rec.get('user_risk_compatible') else "INCOMPATIBLE"
        print(f"  - {rec['symbol']}: {rec['action']} [{status}] - {rec['reason']}")

if __name__ == "__main__":
    run_tests()
