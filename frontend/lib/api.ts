import config from './config';

export const ML_SERVICE_URL = config.ML_SERVICE_URL;
export const BACKEND_URL = `${config.API_BASE_URL}/api`;

// Enhanced fetcher with retry logic and better error handling
export const fetcher = async (url: string, retries = 2): Promise<any> => {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
            const headers: any = {
                'Content-Type': 'application/json',
            };

            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

            const response = await fetch(url, {
                headers,
                signal: controller.signal,
                cache: 'no-store'
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                // Handle specific HTTP errors
                if (response.status === 401) {
                    // Unauthorized - clear token and redirect to login
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('token');
                        window.location.href = '/auth/login';
                    }
                    return null;
                }

                if (response.status === 404) {
                    console.warn(`Resource not found: ${url}`);
                    return null;
                }

                if (response.status >= 500 && attempt < retries) {
                    // Server error - retry
                    console.warn(`Server error (${response.status}), retrying... (${attempt + 1}/${retries})`);
                    await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1))); // Exponential backoff
                    continue;
                }

                // Suppress error logging for 500 errors - just return null
                if (response.status >= 500) {
                    console.warn(`Backend unavailable: ${url}`);
                    return null;
                }

                console.warn(`API Error [${response.status}]: ${url}`);
                return null;
            }

            const data = await response.json();
            return data;

        } catch (error: any) {
            // Handle network errors
            if (error.name === 'AbortError') {
                console.warn(`Request timeout: ${url}`);
                if (attempt < retries) {
                    await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
                    continue;
                }
                return null;
            }

            if (error.message?.includes('fetch') ||
                error.message?.includes('Failed to fetch') ||
                error.message?.includes('NetworkError')) {
                console.warn(`Network error: ${url} (attempt ${attempt + 1}/${retries + 1})`);
                if (attempt < retries) {
                    await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
                    continue;
                }
                return null;
            }

            console.error(`Unexpected error: ${url}`, error);
            return null;
        }
    }

    return null;
};

// Safe fetch wrapper that handles errors gracefully with retry logic
export async function safeFetch(url: string, options?: RequestInit, retries = 2): Promise<any> {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers,
                }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                // Handle specific status codes
                if (response.status === 401) {
                    // Unauthorized
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('token');
                        window.location.href = '/auth/login';
                    }
                    return null;
                }

                if (response.status === 404) {
                    console.warn(`Resource not found: ${url}`);
                    return null;
                }

                if (response.status >= 500 && attempt < retries) {
                    console.warn(`Server error, retrying... (${attempt + 1}/${retries})`);
                    await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
                    continue;
                }

                console.warn(`API Error [${response.status}]: ${url}`);
                return null;
            }

            return await response.json();

        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.warn(`Request timeout: ${url}`);
                if (attempt < retries) {
                    await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
                    continue;
                }
                return null;
            }

            if (error.message?.includes('fetch') ||
                error.message?.includes('Failed to fetch') ||
                error.message?.includes('NetworkError')) {
                console.warn(`Network error: ${url} (attempt ${attempt + 1}/${retries + 1})`);
                if (attempt < retries) {
                    await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
                    continue;
                }
                return null;
            }

            console.error(`Fetch error: ${url}`, error);
            return null;
        }
    }

    return null;
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

export async function fetchPortfolioAnalysis(symbols: string[]) {
    return safeFetch(`${ML_SERVICE_URL}/analyze/portfolio?symbols=${symbols.join(',')}`);
}

export async function fetchMarketIndices() {
    return fetchWithCache(`${ML_SERVICE_URL}/market/indices`);
}

export async function fetchMutualFundNavBatch(schemes: string[]) {
    return safeFetch(`${ML_SERVICE_URL}/mutualfunds/nav/batch?schemes=${schemes.join(',')}`);
}

export async function fetchPortfolioItems() {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) return [];
    const data = await safeFetch(`${BACKEND_URL}/portfolio`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    return data || [];
}

