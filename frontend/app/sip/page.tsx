"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
    Calculator,
    TrendingUp,
    IndianRupee,
    Calendar,
    Sparkles,
    ArrowRight,
    PiggyBank,
    Target,
    BarChart3,
    Loader2,
    Info,
    ArrowUpRight,
    AlertTriangle,
    CheckCircle2,
} from "lucide-react"
import { calculateSIPPlan } from "@/lib/api"

interface FundAllocation {
    scheme_code: string
    scheme_name: string
    category: string
    allocation_percent: number
    expected_cagr: number
}

interface SIPResult {
    sip_plan: {
        monthly_amount: number
        duration_months: number
        duration_years: number
        risk_level: string
        total_invested: number
    }
    recommended_funds: FundAllocation[]
    projection: {
        expected: { corpus: number; cagr: number }
        best_case: { corpus: number; cagr: number }
        worst_case: { corpus: number; cagr: number }
    }
}

export default function SIPPlannerPage() {
    const [monthlyAmount, setMonthlyAmount] = useState(10000)
    const [goalYears, setGoalYears] = useState(10)
    const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">("medium")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<SIPResult | null>(null)

    const handleCalculate = async () => {
        setLoading(true)
        const data = await calculateSIPPlan(monthlyAmount, goalYears, riskLevel)
        if (data) {
            setResult(data)
        }
        setLoading(false)
    }

    const formatCurrency = (amount: number) => {
        if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
        if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`
        if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`
        return `₹${amount.toLocaleString("en-IN")}`
    }

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case "low":
                return "bg-success text-success-foreground"
            case "medium":
                return "bg-warning text-warning-foreground"
            case "high":
                return "bg-destructive text-destructive-foreground"
            default:
                return "bg-muted text-muted-foreground"
        }
    }

    return (
        <AppShell>
            <div className="space-y-8">
                {/* Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-primary/5 p-8 border border-border/50">
                    <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg">
                                    <Calculator className="h-7 w-7" />
                                </div>
                                <div className="space-y-1">
                                    <h1 className="text-3xl font-bold text-foreground">SIP Planner</h1>
                                    <p className="text-muted-foreground font-medium">
                                        Plan your SIP investments and project future wealth with AI-powered recommendations
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Form */}
                    <Card className="border-border/50 shadow-sm">
                        <CardHeader className="border-b border-border">
                            <CardTitle className="flex items-center gap-2 text-lg font-bold">
                                <PiggyBank className="h-5 w-5 text-primary" />
                                Investment Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-8">
                            {/* Monthly Amount */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        Monthly SIP Amount
                                    </Label>
                                    <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20">
                                        <IndianRupee className="h-4 w-4 text-primary" />
                                        <span className="font-bold font-mono text-primary">{monthlyAmount.toLocaleString("en-IN")}</span>
                                    </div>
                                </div>
                                <Slider
                                    value={[monthlyAmount]}
                                    onValueChange={(v) => setMonthlyAmount(v[0])}
                                    min={500}
                                    max={100000}
                                    step={500}
                                    className="py-2"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground font-mono">
                                    <span>₹500</span>
                                    <span>₹1,00,000</span>
                                </div>
                            </div>

                            {/* Duration */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        Investment Duration
                                    </Label>
                                    <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-accent/10 border border-accent/20">
                                        <Calendar className="h-4 w-4 text-accent" />
                                        <span className="font-bold font-mono text-accent">{goalYears} years</span>
                                    </div>
                                </div>
                                <Slider
                                    value={[goalYears]}
                                    onValueChange={(v) => setGoalYears(v[0])}
                                    min={1}
                                    max={30}
                                    step={1}
                                    className="py-2"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground font-mono">
                                    <span>1 year</span>
                                    <span>30 years</span>
                                </div>
                            </div>

                            {/* Risk Level */}
                            <div className="space-y-4">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                    Risk Preference
                                </Label>
                                <div className="grid grid-cols-3 gap-3">
                                    {(["low", "medium", "high"] as const).map((risk) => (
                                        <Button
                                            key={risk}
                                            variant={riskLevel === risk ? "default" : "outline"}
                                            onClick={() => setRiskLevel(risk)}
                                            className={`capitalize font-bold ${riskLevel === risk ? getRiskColor(risk) : ""}`}
                                        >
                                            {risk}
                                        </Button>
                                    ))}
                                </div>
                                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                                    <p className="text-sm text-muted-foreground">
                                        {riskLevel === "low" && (
                                            <>Conservative portfolio with focus on debt and large-cap funds. Lower volatility, stable returns.</>
                                        )}
                                        {riskLevel === "medium" && (
                                            <>Balanced portfolio mixing equity and debt. Moderate risk with good growth potential.</>
                                        )}
                                        {riskLevel === "high" && (
                                            <>Aggressive portfolio focused on mid/small-cap equity. Higher volatility, higher potential returns.</>
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* Calculate Button */}
                            <Button
                                onClick={handleCalculate}
                                disabled={loading}
                                className="w-full gap-2 h-12 text-base font-bold shadow-lg"
                            >
                                {loading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        <Sparkles className="h-5 w-5" />
                                        Calculate Projection
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <div className="space-y-6">
                        {result ? (
                            <>
                                {/* Projection Cards */}
                                <div className="grid grid-cols-1 gap-4">
                                    {/* Expected */}
                                    <Card className="border-primary/30 bg-primary/5">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-widest text-primary/70 mb-1">
                                                        Expected Corpus
                                                    </p>
                                                    <p className="font-black font-mono text-4xl text-primary">
                                                        {formatCurrency(result.projection.expected.corpus)}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <ArrowUpRight className="h-4 w-4 text-success" />
                                                        <span className="text-sm font-bold text-success">{result.projection.expected.cagr}% CAGR</span>
                                                    </div>
                                                </div>
                                                <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                                                    <Target className="h-8 w-8 text-primary" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Best Case */}
                                        <Card className="border-success/30 bg-success/5">
                                            <CardContent className="p-5">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <CheckCircle2 className="h-4 w-4 text-success" />
                                                    <p className="text-xs font-bold uppercase tracking-widest text-success/70">Best Case</p>
                                                </div>
                                                <p className="font-bold font-mono text-2xl text-success">
                                                    {formatCurrency(result.projection.best_case.corpus)}
                                                </p>
                                                <p className="text-xs text-success/70 font-mono mt-1">{result.projection.best_case.cagr}% CAGR</p>
                                            </CardContent>
                                        </Card>

                                        {/* Worst Case */}
                                        <Card className="border-warning/30 bg-warning/5">
                                            <CardContent className="p-5">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <AlertTriangle className="h-4 w-4 text-warning" />
                                                    <p className="text-xs font-bold uppercase tracking-widest text-warning/70">Worst Case</p>
                                                </div>
                                                <p className="font-bold font-mono text-2xl text-warning">
                                                    {formatCurrency(result.projection.worst_case.corpus)}
                                                </p>
                                                <p className="text-xs text-warning/70 font-mono mt-1">{result.projection.worst_case.cagr}% CAGR</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>

                                {/* Investment Summary */}
                                <Card className="border-border/50">
                                    <CardContent className="p-5">
                                        <div className="flex items-center justify-between py-3 border-b border-border/50">
                                            <span className="text-sm text-muted-foreground">Total Investment</span>
                                            <span className="font-bold font-mono">{formatCurrency(result.sip_plan.total_invested)}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-3 border-b border-border/50">
                                            <span className="text-sm text-muted-foreground">Wealth Gain</span>
                                            <span className="font-bold font-mono text-success">
                                                +{formatCurrency(result.projection.expected.corpus - result.sip_plan.total_invested)}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between py-3">
                                            <span className="text-sm text-muted-foreground">Duration</span>
                                            <span className="font-bold">{result.sip_plan.duration_years} years ({result.sip_plan.duration_months} months)</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Recommended Funds */}
                                <Card className="border-border/50">
                                    <CardHeader className="border-b border-border pb-4">
                                        <CardTitle className="flex items-center gap-2 text-base font-bold">
                                            <Sparkles className="h-4 w-4 text-primary" />
                                            Recommended Fund Allocation
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        {result.recommended_funds.map((fund, index) => (
                                            <div
                                                key={fund.scheme_code}
                                                className={`p-4 flex items-center justify-between ${index < result.recommended_funds.length - 1 ? "border-b border-border/50" : ""
                                                    }`}
                                            >
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-sm truncate">{fund.scheme_name}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="secondary" className="text-[10px]">{fund.category}</Badge>
                                                        <span className="text-xs text-success font-mono">{fund.expected_cagr}% CAGR</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-lg text-primary">{fund.allocation_percent}%</p>
                                                    <p className="text-xs text-muted-foreground font-mono">
                                                        {formatCurrency((monthlyAmount * fund.allocation_percent) / 100)}/mo
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                {/* Disclaimer */}
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/50">
                                    <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                                    <p className="text-xs text-muted-foreground">
                                        Advisory only. Mutual fund investments are subject to market risks. Past performance does not guarantee future returns. Please read scheme documents carefully before investing.
                                    </p>
                                </div>
                            </>
                        ) : (
                            <Card className="border-border/50 h-full min-h-[400px] flex items-center justify-center">
                                <CardContent className="text-center p-12">
                                    <div className="h-20 w-20 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-6">
                                        <BarChart3 className="h-10 w-10 text-muted-foreground/50" />
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-2">Plan Your Future</h3>
                                    <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                                        Enter your investment details and click calculate to see your projected wealth with AI-recommended fund allocation.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    )
}
