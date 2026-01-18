"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
    TrendingUp, TrendingDown, ArrowLeft, Share2, Bell, Star,
    Shield, Zap, Activity, BarChart3
} from "lucide-react"
import {
    BusinessCycleCard,
    EarningsTrendCard,
    InsiderActivityCard,
    GlobalPeersCard,
    AIScoreCard,
    RiskMetricsCard,
    EventRadarCard,
    MacroEconomicCard,
    SectorAnalysisCard,
    CompanyDetailsCard,
    FinancialAnalysisCard,
    SmartMoneyCard,
    ValuationCard,
    TechnicalCard,
    DerivativesIntelligenceCard,
    MarketSentimentCard,
    RiskFactorsCard,
    FinalVerdictCard,
} from "@/components/analysis"
import { ANALYSIS_CONFIG, RISK_LABELS, type RiskLevel } from "@/lib/analysisConfig"

interface StockAnalysisClientProps {
    symbol: string
    initialRisk?: string
}

// Mock API function
async function fetchStockAnalysis(symbol: string, risk: RiskLevel) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
    try {
        const res = await fetch(`${API_URL}/api/stocks/${symbol}/analysis?risk=${risk}`)
        if (!res.ok) throw new Error("API error")
        return await res.json()
    } catch {
        return generateMockData(symbol, risk)
    }
}

function generateMockData(symbol: string, risk: RiskLevel) {
    const hash = symbol.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
    const rand = (min: number, max: number) => min + (hash % (max - min))

    return {
        symbol,
        name: `${symbol} Ltd`,
        sector: "Technology",
        currentPrice: 1500 + rand(0, 2000),
        changePercent: -5 + rand(0, 10),
        riskCategory: risk,
        businessCycle: {
            phase: ["EARLY_EXPANSION", "MID_EXPANSION", "LATE_CYCLE"][hash % 3],
            cyclePosition: 30 + rand(0, 50),
            description: "Company in stable growth phase",
            historicalCycles: [
                { period: "2021-22", phase: "MID_EXPANSION", returnPercent: 25 },
                { period: "2022-23", phase: "LATE_CYCLE", returnPercent: 8 },
                { period: "2023-24", phase: "EARLY_EXPANSION", returnPercent: 18 },
            ]
        },
        earningsTrend: {
            quarters: Array.from({ length: 8 }, (_, i) => ({
                quarter: `Q${(i % 4) + 1} FY${24 + Math.floor(i / 4)}`,
                revenue: 20000 + rand(0, 10000) + i * 500,
                eps: 15 + rand(0, 10) + i * 0.5,
                epsEstimate: 14 + rand(0, 8) + i * 0.4,
                beat: rand(0, 10) > 4,
                margin: 15 + rand(0, 10)
            })),
            epsBeatStreak: 5 + rand(0, 3),
            revenueGrowthYoY: 8 + rand(0, 12),
            marginTrend: rand(0, 10) > 5 ? 1.5 : -0.8,
            analystEstimate: "Above consensus"
        },
        insiderActivity: {
            promoterHolding: 45 + rand(0, 20),
            promoterChange: -1 + rand(0, 3),
            trend: ["INCREASING", "STABLE", "DECREASING"][hash % 3],
            recentTransactions: [
                { date: new Date().toISOString(), insiderName: "Promoter Group", role: "PROMOTER", type: "BUY", quantity: 100000, value: 15000000 },
                { date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), insiderName: "Key Mgmt", role: "KEY_MGMT", type: "SELL", quantity: 25000, value: 3750000 }
            ],
            isBullish: rand(0, 10) > 4
        },
        globalPeers: {
            peers: [
                { name: "Microsoft", country: "US", marketCap: 2800, peRatio: 35, revenueGrowth: 12, profitMargin: 35 },
                { name: "SAP", country: "Germany", marketCap: 180, peRatio: 28, revenueGrowth: 8, profitMargin: 22 }
            ],
            valuationGap: -15 + rand(0, 30),
            growthGap: -5 + rand(0, 15),
            insight: "Trading at discount vs global peers"
        },
        aiScore: {
            total: 60 + rand(0, 30),
            fundamentals: 65 + rand(0, 25),
            valuation: 55 + rand(0, 30),
            technicals: 60 + rand(0, 25),
            capitalFlow: 55 + rand(0, 30),
            sentiment: 60 + rand(0, 25),
            verdict: ["STRONG_BUY", "ACCUMULATE", "HOLD"][hash % 3],
            verdictReason: "Strong fundamentals with good momentum"
        },
        riskMetrics: {
            beta: 0.7 + rand(0, 60) / 100,
            sharpeRatio: 0.8 + rand(0, 120) / 100,
            sortinoRatio: 1.0 + rand(0, 100) / 100,
            maxDrawdown: -(10 + rand(0, 20)),
            volatility: 15 + rand(0, 15),
            riskLevel: ["LOW", "MODERATE", "HIGH"][hash % 3],
            drawdownHistory: [
                { period: "Mar 2020", drawdownPercent: -35, recoveryDays: 120 },
                { period: "Oct 2023", drawdownPercent: -12, recoveryDays: 45 }
            ]
        },
        eventRadar: {
            upcoming: [
                { date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(), event: "Q4 Results", type: "RESULTS", impact: "HIGH", potentialEffect: "Expected revenue beat" },
                { date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(), event: "RBI MPC Meeting", type: "RBI", impact: "MEDIUM", potentialEffect: "Rate decision impact" }
            ],
            overallRiskLevel: "MODERATE",
            weekOutlook: "Neutral with upside bias"
        },
        macroEconomic: {
            global: {
                gdpGrowth: 3.1,
                inflation: 3.4,
                centralBankPolicy: "HAWKISH",
                moneyFlow: "OUTFLOW",
                riskSentiment: "CAUTIOUS"
            },
            india: {
                gdpGrowth: 7.2,
                inflation: 4.8,
                interestRate: 6.5,
                forexReserves: 620,
                fiscalDeficit: 5.1
            },
            status: rand(0, 10) > 4 ? "STABLE" : "HEADWINDS"
        },
        sectorAnalysis: {
            phase: ["EXPANSION", "PEAK", "CONTRACTION", "TROUGH"][hash % 4],
            moneyFlowRank: rand(1, 20),
            valueChainPosition: "Upstream Infrastructure",
            correlations: { nifty: 0.85, usdInr: -0.4 },
            momentum: rand(0, 100)
        },
        companyAnalysis: {
            model: "D2C Multi-channel Ecosystem",
            moat: ["High Switching Costs", "Network Effects", "Cost Leadership", "Brand Intangibles"][hash % 4],
            moatStrength: rand(60, 95),
            promoterQuality: {
                score: rand(70, 98),
                pledgingPercentage: rand(0, 5),
                skinInTheGame: rand(40, 75)
            },
            businessModelResilience: "High"
        },
        financials10Year: {
            revenueCAGR: 12 + rand(0, 8),
            profitCAGR: 15 + rand(0, 10),
            avgROE: 18 + rand(0, 12),
            avgROCE: 20 + rand(0, 15),
            debtToEquity: 0.2 + rand(0, 50) / 100,
            freeCashflowYield: 3.5 + rand(0, 4)
        },
        smartMoney: {
            fiiHolding: 15 + rand(0, 15),
            diiHolding: 10 + rand(0, 10),
            mfCount: 25 + rand(0, 50),
            insiderTrend: rand(0, 10) > 5 ? "BUYING" : "STABLE",
            whaleActivity: "Increasing"
        },
        valuationDetailed: {
            intrinsicValue: 1650 + rand(0, 1500),
            marginOfSafety: 10 + rand(0, 25),
            scenarios: {
                bull: 2200 + rand(0, 1000),
                base: 1800 + rand(0, 500),
                bear: 1400 - rand(0, 300)
            },
            multiples: {
                pe: 25 + rand(0, 30),
                pb: 4 + rand(0, 10),
                evEbitda: 15 + rand(0, 15)
            }
        },
        technicalDetailed: {
            trend: rand(0, 10) > 4 ? "BULLISH" : "NEUTRAL",
            indicators: {
                rsi: 45 + rand(0, 30),
                macd: "Signal Crossover",
                vwap: 1480 + rand(0, 1000)
            },
            dmas: {
                d20: 1520 + rand(0, 500),
                d50: 1480 + rand(0, 400),
                d200: 1350 + rand(0, 300)
            },
            support: [1420, 1380],
            resistance: [1680, 1750]
        },
        fnoIntelligence: {
            openInterest: 1500000 + rand(0, 5000000),
            oiChange: -5 + rand(0, 15),
            putCallRatio: 0.5 + rand(0, 100) / 100,
            maxPain: 1550 + rand(0, 500),
            oiTrend: ["LONG_BUILDUP", "SHORT_COVERING", "LONG_UNWINDING", "SHORT_BUILDUP"][hash % 4]
        },
        riskFactors: [
            { category: "REGULATORY", impact: "MEDIUM", description: "Taxation changes in sector" },
            { category: "GOVERNANCE", impact: "LOW", description: "Independent director rotation" },
            { category: "COMPETITION", impact: "HIGH", description: "New VC-funded entrants" }
        ],
        finalVerdict: {
            action: ["STRONG_BUY", "ACCUMULATE", "HOLD", "REDUCE"][hash % 4],
            buyZone: "1450 - 1520",
            stopLoss: "1380",
            target: "1850",
            horizon: "12-18 Months"
        },
        marketSentiment: {
            vix: 12 + rand(0, 10),
            sentimentScore: 65 + rand(0, 30),
            news: [
                { title: "Quarterly earnings exceed expectations", impact: "HIGH" },
                { title: "New product launch in emerging markets", impact: "MEDIUM" },
                { title: "Institutional accumulation detected", impact: "HIGH" }
            ],
            socialActivity: ["HIGH", "MODERATE", "STABLE"][hash % 3]
        }
    }
}

export default function StockAnalysisClient({ symbol, initialRisk = "MEDIUM" }: StockAnalysisClientProps) {
    const [riskLevel, setRiskLevel] = useState<RiskLevel>(initialRisk.toUpperCase() as RiskLevel)
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    const config = ANALYSIS_CONFIG[riskLevel]
    const riskLabel = RISK_LABELS[riskLevel]

    const searchParams = useSearchParams()
    const urlRisk = searchParams.get('risk')

    useEffect(() => {
        if (urlRisk) {
            setRiskLevel(urlRisk.toUpperCase() as RiskLevel)
        }
    }, [urlRisk])

    useEffect(() => {
        setLoading(true)
        fetchStockAnalysis(symbol.toUpperCase(), riskLevel).then((res) => {
            setData(res)
            setLoading(false)
        })
    }, [symbol, riskLevel])

    if (loading) {
        return (
            <AppShell>
                <div className="space-y-6">
                    <Skeleton className="h-20 w-full" />
                    <div className="grid md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-48 w-full" />)}
                    </div>
                </div>
            </AppShell>
        )
    }

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" onClick={() => history.back()}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold">{data?.symbol}</h1>
                                <Badge variant="secondary">{data?.sector}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{data?.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm"><Star className="h-4 w-4 mr-1" />Watch</Button>
                        <Button variant="outline" size="sm"><Bell className="h-4 w-4 mr-1" />Alert</Button>
                        <Button variant="outline" size="sm"><Share2 className="h-4 w-4" /></Button>
                    </div>
                </div>

                {/* Price Card */}
                <Card className="border-2 border-border/50">
                    <CardContent className="p-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <p className="text-3xl font-bold">₹{data?.currentPrice?.toLocaleString()}</p>
                                <div className={`flex items-center gap-1 ${data?.changePercent >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {data?.changePercent >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                    <span className="font-bold">{data?.changePercent >= 0 ? '+' : ''}{data?.changePercent?.toFixed(2)}%</span>
                                    <span className="text-muted-foreground text-sm">Today</span>
                                </div>
                            </div>
                            {/* Risk Level Selector */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground uppercase">Analysis Mode:</span>
                                {(['LOW', 'MEDIUM', 'HIGH'] as RiskLevel[]).map((level) => (
                                    <Button
                                        key={level}
                                        size="sm"
                                        variant={riskLevel === level ? "default" : "outline"}
                                        onClick={() => setRiskLevel(level)}
                                        style={riskLevel === level ? { backgroundColor: RISK_LABELS[level].color } : {}}
                                    >
                                        {level === 'LOW' && <Shield className="h-3 w-3 mr-1" />}
                                        {level === 'MEDIUM' && <Activity className="h-3 w-3 mr-1" />}
                                        {level === 'HIGH' && <Zap className="h-3 w-3 mr-1" />}
                                        {level}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2" style={{ color: riskLabel.color }}>
                            {riskLabel.description}
                        </p>
                    </CardContent>
                </Card>

                {/* AI Score Card */}
                {config.aiScore.show && data?.aiScore && <AIScoreCard {...data.aiScore} />}

                {/* Analysis Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Level 1: Macro & Sector */}
                    {config.macroEconomic.show && data?.macroEconomic && <MacroEconomicCard {...data.macroEconomic} />}
                    {config.sectorAnalysis.show && data?.sectorAnalysis && (
                        <SectorAnalysisCard
                            {...data.sectorAnalysis}
                            mode={config.sectorAnalysis.mode as 'basic' | 'full'}
                        />
                    )}

                    {/* Level 2: Business & Financials */}
                    {config.companyAnalysis.show && data?.companyAnalysis && <CompanyDetailsCard {...data.companyAnalysis} />}
                    {config.financials10Year.show && data?.financials10Year && <FinancialAnalysisCard {...data.financials10Year} />}

                    {/* Level 3: Cycle & Growth */}
                    {config.businessCycle.show && data?.businessCycle && <BusinessCycleCard {...data.businessCycle} />}
                    {config.earningsTrend.show && data?.earningsTrend && <EarningsTrendCard {...data.earningsTrend} />}

                    {/* Level 4: Ownership & Peers */}
                    {config.smartMoney.show && data?.smartMoney && <SmartMoneyCard {...data.smartMoney} />}
                    {config.globalPeers.show && data?.globalPeers && <GlobalPeersCard {...data.globalPeers} />}

                    {/* Level 5: Valuation & Metrics */}
                    {config.valuationDetailed.show && data?.valuationDetailed && (
                        <ValuationCard
                            {...data.valuationDetailed}
                        />
                    )}
                    {config.riskMetrics.show && data?.riskMetrics && (
                        <RiskMetricsCard
                            {...data.riskMetrics}
                            focusMode={config.riskMetrics.focusMode as 'stability' | 'full'}
                        />
                    )}

                    {/* Level 6: Technicals & Sentiment */}
                    {config.technicalDetailed.show && data?.technicalDetailed && (
                        <TechnicalCard
                            {...data.technicalDetailed}
                            mode={config.technicalDetailed.mode as 'basic' | 'full' | 'full_intraday'}
                        />
                    )}
                    {config.sentiment.show && data?.sentiment && data?.marketSentiment && (
                        <MarketSentimentCard
                            {...data.marketSentiment}
                            vix={data.marketSentiment.vix}
                        />
                    )}

                    {/* Level 7: F&O (Specialized) */}
                    {config.fnoData.show && data?.fnoIntelligence && (
                        <div className="md:col-span-2">
                            <DerivativesIntelligenceCard
                                {...data.fnoIntelligence}
                                mode={config.fnoData.mode as 'basic' | 'full'}
                            />
                        </div>
                    )}

                    {/* Level 8: Risk & Radar */}
                    {config.riskFactors.show && data?.riskFactors && <RiskFactorsCard factors={data.riskFactors} />}
                    {config.eventRadar.show && data?.eventRadar && <EventRadarCard {...data.eventRadar} />}
                </div>

                {/* Final Verdict - Strategic Anchor */}
                {config.finalVerdict.show && data?.finalVerdict && (
                    <div className="mt-8">
                        <FinalVerdictCard {...data.finalVerdict} />
                    </div>
                )}

                {/* Action Buttons */}
                <div className="grid sm:grid-cols-3 gap-4">
                    <Button className="h-12 bg-emerald-600 hover:bg-emerald-700"><TrendingUp className="h-5 w-5 mr-2" />Buy Analysis</Button>
                    <Button variant="outline" className="h-12">Add to Portfolio</Button>
                    <Button variant="outline" className="h-12">Compare with Peers</Button>
                </div>
            </div>
        </AppShell>
    )
}
