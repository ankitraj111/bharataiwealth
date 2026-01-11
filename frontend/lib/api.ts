export const ML_SERVICE_URL = process.env.NEXT_PUBLIC_ML_SERVICE_URL || "http://localhost:8000";
const BACKEND_URL = "/api"; // Leverage Next.js rewrites for CORS-free backend calls

// Simple in-memory cache
const apiCache: { [key: string]: { data: any, timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchWithCache(url: string, options?: any) {
    const now = Date.now();
    if (apiCache[url] && (now - apiCache[url].timestamp < CACHE_DURATION)) {
        return apiCache[url].data;
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            // Only log non-404 errors to reduce console noise
            if (response.status !== 404) {
                console.warn(`API Error [${response.status}]: ${url}`);
            }
            return null;
        }
        const data = await response.json();
        apiCache[url] = { data, timestamp: now };
        return data;
    } catch (error: any) {
        // Silently handle network errors for external services (ML service, etc.)
        // These are expected when services are unavailable
        if (url.includes(':8000')) {
            // ML service not running - this is expected in some environments
            return null;
        }
        console.warn(`Network Error: ${url}`, error?.message || error);
        return null;
    }
}

export async function fetchPrediction(symbol: string) {
    return fetchWithCache(`${ML_SERVICE_URL}/predict?symbol=${symbol}`);
}

export async function fetchSentiment(symbol: string) {
    return fetchWithCache(`${ML_SERVICE_URL}/sentiment?symbol=${symbol}`);
}

export async function fetchRiskScore(payload: any) {
    try {
        const response = await fetch(`${ML_SERVICE_URL}/risk-score`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Risk API Error:", error);
        return null;
    }
}

export async function fetchPortfolioAssets(riskLevel: string) {
    return fetchWithCache(`${ML_SERVICE_URL}/portfolio/assets?risk_level=${riskLevel}`);
}

export async function fetchKiteStatus() {
    return fetchWithCache(`${ML_SERVICE_URL}/kite/status`);
}

export async function fetchKiteLoginUrl() {
    return fetchWithCache(`${ML_SERVICE_URL}/kite/login`);
}

export async function fetchDashboardSummary() {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) return getMockDashboardData();

    try {
        const response = await fetch(`${BACKEND_URL}/dashboard/summary`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!response.ok) {
            // Silently fallback to mock data for auth errors
            return getMockDashboardData();
        }
        return await response.json();
    } catch (error) {
        // Network error - return mock data
        return getMockDashboardData();
    }
}

function getMockDashboardData() {
    return {
        totalNetWorth: 1250000,
        monthlyExpense: 45000,
        portfolioGain: 12.5,
        aiConfidence: 87,
        userName: "Investor"
    };
}

export async function fetchRebalanceSuggestions() {
    return fetchWithCache(`${ML_SERVICE_URL}/rebalance/suggest`);
}

export async function fetchAdvisoryRecommend(symbol: string) {
    return fetchWithCache(`${ML_SERVICE_URL}/advisory/recommend?symbol=${symbol}`);
}

export async function fetchGoals() {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) return [];
    return fetchWithCache(`${BACKEND_URL}/goals`, {
        headers: { "Authorization": `Bearer ${token}` }
    }).then(data => data || []);
}

export async function addGoal(goal: any) {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) return null;
    try {
        const response = await fetch(`${BACKEND_URL}/goals`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(goal)
        });
        return response.ok ? await response.json() : null;
    } catch (error) {
        return null;
    }
}

export async function fetchTaxEstimate() {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) return null;
    return fetchWithCache(`${BACKEND_URL}/tax/estimate`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
}

export async function fetchEmergencyFund() {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) return null;
    return fetchWithCache(`${BACKEND_URL}/emergency-fund`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
}

export async function fetchFamily() {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) return [];
    return fetchWithCache(`${BACKEND_URL}/family`, {
        headers: { "Authorization": `Bearer ${token}` }
    }).then(data => data || []);
}

export async function fetchAlerts() {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) return [];
    return fetchWithCache(`${BACKEND_URL}/alerts`, {
        headers: { "Authorization": `Bearer ${token}` }
    }).then(data => data || []);
}

export async function updateEmergencyFund(fund: any) {
    try {
        const response = await fetch(`${BACKEND_URL}/emergency-fund`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(fund)
        });
        return response.ok ? await response.json() : null;
    } catch (error) {
        return null;
    }
}

export async function fetchMutualFundList(category?: string, risk?: string) {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (risk) params.append("risk", risk);
    const url = `${ML_SERVICE_URL}/mutualfunds/list${params.toString() ? '?' + params.toString() : ''}`;
    return fetchWithCache(url);
}

export async function fetchMutualFundNav(schemeCode: string) {
    return fetchWithCache(`${ML_SERVICE_URL}/mutualfunds/nav?scheme=${schemeCode}`);
}

export async function fetchMutualFundRanking(risk: string, topN: number = 10) {
    return fetchWithCache(`${ML_SERVICE_URL}/mutualfunds/rank?risk=${risk}&top_n=${topN}`);
}

export async function calculateSIPPlan(monthlyAmount: number, goalYears: number, risk: string) {
    try {
        const response = await fetch(`${ML_SERVICE_URL}/mutualfunds/sip-plan`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                monthly_amount: monthlyAmount,
                goal_years: goalYears,
                risk: risk
            })
        });
        return response.ok ? await response.json() : null;
    } catch (error) {
        return null;
    }
}

export async function fetchGoalBasedFunds(goal?: string) {
    const url = goal
        ? `${ML_SERVICE_URL}/mutualfunds/goal-based?goal=${goal}`
        : `${ML_SERVICE_URL}/mutualfunds/goal-based`;
    return fetchWithCache(url);
}

