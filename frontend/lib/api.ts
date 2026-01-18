export const ML_SERVICE_URL = process.env.NEXT_PUBLIC_ML_SERVICE_URL || "http://localhost:8000";
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ||
    (typeof window !== 'undefined' && window.location.hostname !== 'localhost'
        ? "https://bharataiwealth-backend.onrender.com/api"
        : "http://localhost:8080/api");

export const fetcher = async (url: string) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    const headers: any = {};
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
};

// Safe fetch wrapper that handles errors gracefully
export async function safeFetch(url: string, options?: RequestInit): Promise<any> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            // Silently return null for non-critical errors
            if (response.status === 404 || response.status === 401) {
                return null;
            }
            console.warn(`API Error [${response.status}]: ${url}`);
            return null;
        }

        return await response.json();
    } catch (error: any) {
        // Silently handle network errors - backend might be unavailable
        if (error.name === 'AbortError' || 
            error.message?.includes('fetch') || 
            error.message?.includes('Failed to fetch') ||
            error.message?.includes('NetworkError')) {
            console.warn(`Backend unavailable: ${url}`);
            return null;
        }
        console.error(`Fetch error: ${url}`, error);
        return null;
    }
}

// Simple in-memory cache
const apiCache: { [key: string]: { data: any, timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchWithCache(url: string, options?: any) {
    const now = Date.now();
    if (apiCache[url] && (now - apiCache[url].timestamp < CACHE_DURATION)) {
        return apiCache[url].data;
    }

    const data = await safeFetch(url, options);
    if (data !== null) {
        apiCache[url] = { data, timestamp: now };
    }
    return data;
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

    const data = await safeFetch(`${BACKEND_URL}/dashboard/summary`, {
        headers: { "Authorization": `Bearer ${token}` }
    });

    // Fallback to mock data if backend unavailable
    return data || getMockDashboardData();
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
    const data = await fetchWithCache(`${BACKEND_URL}/goals`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    return data || [];
}

export async function addGoal(goal: any) {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) return null;
    return await safeFetch(`${BACKEND_URL}/goals`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(goal)
    });
}

export async function fetchTaxEstimate() {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) return null;
    return await fetchWithCache(`${BACKEND_URL}/tax/estimate`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
}

export async function fetchEmergencyFund() {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) return null;
    return await fetchWithCache(`${BACKEND_URL}/emergency-fund`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
}

export async function fetchFamily() {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) return [];
    const data = await fetchWithCache(`${BACKEND_URL}/family`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    return data || [];
}

export async function fetchAlerts() {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) return [];
    const data = await fetchWithCache(`${BACKEND_URL}/alerts`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    return data || [];
}

export async function updateEmergencyFund(fund: any) {
    return await safeFetch(`${BACKEND_URL}/emergency-fund`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(fund)
    });
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
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        // API unavailable - fall through to local calculation
    }

    // Fallback: Local SIP calculation when API is unavailable
    const riskReturns = { low: 8, medium: 12, high: 16 };
    const expectedCAGR = riskReturns[risk as keyof typeof riskReturns] || 12;
    const months = goalYears * 12;
    const monthlyRate = expectedCAGR / 12 / 100;

    // SIP Future Value formula: P × (((1 + r)^n - 1) / r) × (1 + r)
    const futureValue = monthlyAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const totalInvested = monthlyAmount * months;

    // Generate recommended funds based on risk
    const fundsByRisk = {
        low: [
            { scheme_code: "119597", scheme_name: "SBI Bluechip Fund - Direct", category: "Large Cap", allocation_percent: 40, expected_cagr: 10 },
            { scheme_code: "120503", scheme_name: "HDFC Corporate Bond Fund", category: "Debt", allocation_percent: 35, expected_cagr: 7 },
            { scheme_code: "118989", scheme_name: "Axis Liquid Fund - Direct", category: "Liquid", allocation_percent: 25, expected_cagr: 6 },
        ],
        medium: [
            { scheme_code: "120466", scheme_name: "Parag Parikh Flexi Cap Fund", category: "Flexi Cap", allocation_percent: 35, expected_cagr: 15 },
            { scheme_code: "118834", scheme_name: "Axis Midcap Fund - Direct", category: "Mid Cap", allocation_percent: 30, expected_cagr: 14 },
            { scheme_code: "119597", scheme_name: "SBI Bluechip Fund - Direct", category: "Large Cap", allocation_percent: 35, expected_cagr: 10 },
        ],
        high: [
            { scheme_code: "125354", scheme_name: "SBI Small Cap Fund - Direct", category: "Small Cap", allocation_percent: 40, expected_cagr: 18 },
            { scheme_code: "118834", scheme_name: "Axis Midcap Fund - Direct", category: "Mid Cap", allocation_percent: 35, expected_cagr: 14 },
            { scheme_code: "120466", scheme_name: "Parag Parikh Flexi Cap Fund", category: "Flexi Cap", allocation_percent: 25, expected_cagr: 15 },
        ]
    };

    return {
        sip_plan: {
            monthly_amount: monthlyAmount,
            duration_months: months,
            duration_years: goalYears,
            risk_level: risk,
            total_invested: totalInvested
        },
        recommended_funds: fundsByRisk[risk as keyof typeof fundsByRisk] || fundsByRisk.medium,
        projection: {
            expected: { corpus: Math.round(futureValue), cagr: expectedCAGR },
            best_case: { corpus: Math.round(futureValue * 1.25), cagr: expectedCAGR + 4 },
            worst_case: { corpus: Math.round(futureValue * 0.7), cagr: expectedCAGR - 5 }
        }
    };
}

export async function fetchGoalBasedFunds(goal?: string) {
    const url = goal
        ? `${ML_SERVICE_URL}/mutualfunds/goal-based?goal=${goal}`
        : `${ML_SERVICE_URL}/mutualfunds/goal-based`;
    return fetchWithCache(url);
}

